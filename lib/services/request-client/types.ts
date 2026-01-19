import type { AxiosRequestConfig, AxiosResponse, AxiosProgressEvent } from 'axios';
/**
 * 类型与选项定义
 * 为请求客户端提供统一的类型约束与可配置项
 */

export type ErrorMessageMode = 'message' | 'modal' | 'none' | undefined;

export interface RetryRequest {
  /** 是否开启自动重试 */
  isOpenRetry: boolean;
  /** 重试次数 */
  count?: number;
  /** 重试的等待时间（毫秒） */
  waitTime?: number;
}

export interface RequestOptions {
  /** 是否将参数拼接到 URL 上 */
  joinParamsToUrl?: boolean;
  /** 是否格式化提交数据中的时间字段 */
  formatDate?: boolean;
  /** 是否对响应数据进行业务解包 */
  isTransformResponse?: boolean;
  /** 是否返回原生响应对象（包含 headers 等） */
  isReturnNativeResponse?: boolean;
  /** 是否在路径前拼接前缀（urlPrefix） */
  joinPrefix?: boolean;
  /** 接口基础地址（优先级高于默认 baseURL） */
  apiUrl?: string;
  /** 自定义路径前缀 */
  urlPrefix?: string;
  /** 错误提示模式：消息、模态或不提示 */
  errorMessageMode?: ErrorMessageMode;
  /** GET 请求是否追加时间戳以避免缓存 */
  joinTime?: boolean;
  /** 是否忽略重复请求的取消令牌 */
  ignoreCancelToken?: boolean;
  /** 是否自动携带 Token */
  withToken?: boolean;
  /** 自动重试相关配置 */
  retryRequest?: RetryRequest;
}

export interface Result<T = any> {
  /** 业务状态码（可选，兼容后端返回） */
  code?: number;
  /** 业务消息（可选） */
  msg?: string;
  /** 业务成功标记（可选） */
  success?: boolean;
  /** 有效数据 */
  data: T;
}

export interface CreateAxiosOptions extends AxiosRequestConfig {
  /** 认证前缀方案，如 Bearer */
  authenticationScheme?: string;
  /** 拦截器与钩子配置 */
  transform?: AxiosTransform;
  /** 请求行为选项 */
  requestOptions?: RequestOptions;
  /** Token 提供函数（SSR/RSC 安全获取） */
  tokenProvider?: () => string | null | undefined;
}

export type TOnUploadProgress = (progressEvent: AxiosProgressEvent) => void;

export abstract class AxiosTransform {
  /** 请求前置处理：拼接地址、处理参数等 */
  beforeRequestHook?: (
    config: AxiosRequestConfig,
    options: RequestOptions
  ) => AxiosRequestConfig;

  /** 请求失败统一捕获（如上报、二次包装） */
  requestCatchHook?: (e: Error, options: RequestOptions) => Promise<any>;

  /** 请求拦截器：注入 Token、Header 等 */
  requestInterceptors?: (
    config: AxiosRequestConfig,
    options: CreateAxiosOptions
  ) => AxiosRequestConfig;

  /** 请求拦截器错误处理 */
  requestInterceptorsCatch?: (error: Error) => void;

  /** 响应拦截器：可进行二次处理 */
  responseInterceptors?: (res: AxiosResponse<any>) => AxiosResponse<any>;

  /** 响应错误统一捕获：如自动重试、统一错误提示 */
  responseInterceptorsCatch?: (
    axiosInstance: AxiosResponse,
    error: Error
  ) => void;

  /** 响应成功钩子：进行业务数据解包 */
  transformRequestHook?: (
    res: AxiosResponse<Result>,
    options: RequestOptions
  ) => any;
}
