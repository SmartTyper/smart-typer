import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

class Axios {
  private _axios: typeof axios;

  public constructor() {
    this._axios = axios;
  }

  public async makeGetRequest<ResponseType>(
    requestUrl: string,
    requestConfig?: AxiosRequestConfig,
  ): Promise<AxiosResponse<ResponseType>> {
    const response: AxiosResponse<ResponseType> = await this._axios.get(
      requestUrl,
      requestConfig,
    );

    return response;
  }
}

export { Axios };
