import type { AxiosRequestConfig } from 'axios';
import { VAxios, createDefaultOptions } from '@/lib/services/request-client/client';
import type { CreateAxiosOptions, RequestOptions } from '@/lib/services/request-client/types';

/** 创建一个带默认配置的请求客户端，可传入覆盖项 */
export function createRequestClient(opt?: Partial<CreateAxiosOptions>) {
  return new VAxios(createDefaultOptions(opt));
}

/** 默认导出实例，满足多数场景的直接调用 */
export const defHttp = createRequestClient();

/** 通用请求方法（支持任意 HTTP 动词） */
export const httpRequest = <T>(
  config: AxiosRequestConfig,
  options?: RequestOptions,
): Promise<T> => {
  return defHttp.request(config, options);
};

/** 便捷 GET 方法 */
export const httpGet = <T>(
  config: AxiosRequestConfig,
  options?: RequestOptions,
): Promise<T> => {
  return defHttp.get(config, options);
};

/** 便捷 POST 方法 */
export const httpPost = <T>(
  config: AxiosRequestConfig,
  options?: RequestOptions,
): Promise<T> => {
  return defHttp.post(config, options);
};

/** 便捷 PUT 方法 */
export const httpPut = <T>(
  config: AxiosRequestConfig,
  options?: RequestOptions,
): Promise<T> => {
  return defHttp.put(config, options);
};

/** 便捷 DELETE 方法 */
export const httpDelete = <T>(
  config: AxiosRequestConfig,
  options?: RequestOptions,
): Promise<T> => {
  return defHttp.delete(config, options);
};
