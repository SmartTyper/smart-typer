import * as queryString from 'query-string';
import EventEmitter from 'events';
import { HttpError } from 'exceptions/exceptions';
import {
  RequestContentType,
  HttpHeader,
  HttpMethod,
  StorageKey,
  HttpCode,
  EmitterEvent,
  AppRoute,
} from 'common/enums/enums';
import { HttpOptions, TokensResponseDto } from 'common/types/types';
import {
  localStorage as localStorageService,
  navigation as navigationService,
} from 'services/services';

type Constructor = {
  localStorageService: typeof localStorageService;
  navigationService: typeof navigationService;
};

class Http {
  private _localStorageService: typeof localStorageService;
  private _navigationService: typeof navigationService;
  private _areTokensRefreshing: boolean;
  private _emitter: EventEmitter;

  constructor(params: Constructor) {
    this._areTokensRefreshing = false;
    this._emitter = new EventEmitter();
    this._localStorageService = params.localStorageService;
    this._navigationService = params.navigationService;
  }

  public async load<T = unknown>(
    url: string,
    options: Partial<HttpOptions> = {},
  ): Promise<T> {
    try {
      return this._sendRequest(url, options);
    } catch (error) {
      if (
        error instanceof HttpError &&
        error.status === HttpCode.UNAUTHORIZED
      ) {
        if (this._areTokensRefreshing) {
          return this._sendRequestAfterGetToken(url, options);
        } else {
          this._areTokensRefreshing = true;
          const { accessToken } = await this._refreshTokens(error);
          const { queryParams, ...restOptions } = options;

          return this._sendRequest(
            this._getFetchUrl(url, queryParams),
            restOptions,
            accessToken,
          );
        }
      } else {
        throw error;
      }
    }
  }

  private async _sendRequest<T = unknown>(
    url: string,
    options: Partial<HttpOptions> = {},
    accessToken?: string,
  ): Promise<T> {
    const { method = HttpMethod.GET, payload = null, contentType } = options;
    const token = accessToken || localStorage.getItem(StorageKey.ACCESS_TOKEN);
    const headers = this._getHeaders(contentType, token);

    const response = await fetch(url, {
      method,
      headers,
      body: payload,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new HttpError({
        status: response.status,
        message: error.msg || error.error,
      });
    }

    if (response.status === HttpCode.NO_CONTENT) {
      return null as unknown as T;
    }

    const resContentType = response.headers.get(HttpHeader.CONTENT_TYPE);
    if (resContentType && resContentType.includes(RequestContentType.TEXT)) {
      return response.text() as unknown as T;
    }

    if (resContentType && resContentType.includes(RequestContentType.BLOB)) {
      return response.blob() as unknown as T;
    }

    return response.json();
  }

  public async _sendRequestAfterGetToken<T = unknown>(
    url: string,
    options: Partial<HttpOptions> = {},
  ): Promise<T> {
    return new Promise((resolve, reject) => {
      this._emitter.on(EmitterEvent.GET_ACCESS_TOKEN, async (accessToken) => {
        try {
          const data: T = await this._sendRequest(url, options, accessToken);
          resolve(data);
        } catch (error) {
          reject(error);
        }
      });
    });
  }

  private _refreshTokens = async (
    requestError: HttpError,
  ): Promise<TokensResponseDto> => {
    const refreshToken = localStorage.getItem(StorageKey.REFRESH_TOKEN);
    if (refreshToken) {
      try {
        const tokens: TokensResponseDto = await this._sendRequest(
          '/api/auth/refresh',
          {
            method: HttpMethod.POST,
            payload: JSON.stringify({ refreshToken }),
            contentType: RequestContentType.JSON,
          },
        );

        const { accessToken, refreshToken: newRefreshToken } = tokens;
        this._emitter.emit(EmitterEvent.GET_ACCESS_TOKEN, accessToken);
        this._localStorageService.setItem(StorageKey.ACCESS_TOKEN, accessToken);
        this._localStorageService.setItem(
          StorageKey.REFRESH_TOKEN,
          newRefreshToken,
        );
        this._areTokensRefreshing = false;
        return tokens;
      } catch (refreshTokensError) {
        if (
          refreshTokensError instanceof HttpError &&
          refreshTokensError.status === HttpCode.UNAUTHORIZED
        ) {
          this._localStorageService.removeItem(StorageKey.ACCESS_TOKEN);
          this._localStorageService.removeItem(StorageKey.REFRESH_TOKEN);
          this._navigationService.setPath(AppRoute.ROOT);
        }
        throw refreshTokensError;
      }
    } else {
      throw requestError;
    }
  };

  private _getFetchUrl(
    endpoint: string,
    queryParams?: Record<string, unknown>,
  ): string {
    const fetchUrl = `${endpoint}${
      queryParams ? `?${queryString.stringify(queryParams)}` : ''
    }`;

    return fetchUrl;
  }

  private _getHeaders(
    contentType?: RequestContentType,
    token?: string | null,
  ): Headers {
    const headers = new Headers();

    if (contentType) {
      headers.append(HttpHeader.CONTENT_TYPE, contentType);
    }

    if (token) {
      headers.append(HttpHeader.AUTHORIZATION, `Bearer ${token}`);
    }

    return headers;
  }
}
export { Http };
