import { RequestContentType, HttpMethod } from 'common/enums/enums';

type HttpOptions = {
  method: HttpMethod;
  contentType: RequestContentType;
  payload: BodyInit | null;
  queryParams: Record<string, unknown>;
};

export type { HttpOptions };
