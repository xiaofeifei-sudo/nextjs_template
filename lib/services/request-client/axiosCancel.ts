import type { AxiosRequestConfig, Canceler } from 'axios';
import axios from 'axios';

/**
 * 取消重复请求管理器
 * 基于 method + url 生成唯一键，防止并发时的重复请求
 */
let pendingMap = new Map<string, Canceler>();

/**
 * 获取请求唯一标识
 */
export const getPendingUrl = (config: AxiosRequestConfig) =>
  [config.method, config.url].join('&');

export class AxiosCanceler {
  /**
   * 添加当前请求到待取消映射
   * 若已存在相同键则先移除
   */
  addPending(config: AxiosRequestConfig) {
    this.removePending(config);
    const url = getPendingUrl(config);
    config.cancelToken =
      config.cancelToken ||
      new axios.CancelToken((cancel) => {
        if (!pendingMap.has(url)) {
          pendingMap.set(url, cancel);
        }
      });
  }

  /**
   * 取消所有挂起请求
   */
  removeAllPending() {
    pendingMap.forEach((cancel) => {
      cancel && cancel();
    });
    pendingMap.clear();
  }

  /**
   * 取消并移除特定请求
   */
  removePending(config: AxiosRequestConfig) {
    const url = getPendingUrl(config);
    if (pendingMap.has(url)) {
      const cancel = pendingMap.get(url);
      cancel && cancel(url);
      pendingMap.delete(url);
    }
  }

  /**
   * 重置映射
   */
  reset(): void {
    pendingMap = new Map<string, Canceler>();
  }
}
