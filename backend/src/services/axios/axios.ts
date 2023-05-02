import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

class Axios {
  public async makeGetRequest<ResponseType>(
    requestUrl: string,
    requestConfig?: AxiosRequestConfig,
  ): Promise<AxiosResponse<ResponseType>> {
    const response: AxiosResponse<ResponseType> = await axios.get(
      requestUrl,
      requestConfig,
    );

    return response;
  }
}

export { Axios };
