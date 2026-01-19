import type { AxiosError } from 'axios';

/**
 * 简单的 GET 请求自动重试
 * 控制重试次数与间隔，避免短时网络抖动引发失败
 */
export class AxiosRetry {
  retry(axiosInstance: any, error: AxiosError) {
    const { config }: any = error.response ?? {};
    const { waitTime = 100, count = 3 } =
      config?.requestOptions?.retryRequest ?? {};
    config.__retryCount = config.__retryCount || 0;
    if (config.__retryCount >= count) {
      return Promise.reject(error);
    }
    config.__retryCount += 1;
    delete config.headers;
    return new Promise((resolve) =>
      setTimeout(resolve, waitTime)
    ).then(() => axiosInstance(config));
  }
}
