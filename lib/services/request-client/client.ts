import type {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import axios from 'axios';
import qs from 'qs';
import JSONBig from 'json-bigint';
import { API_BASE_URL, API_TIMEOUT } from '@/constants';
import { AxiosCanceler } from '@/lib/services/request-client/axiosCancel';
import { AxiosRetry } from '@/lib/services/request-client/axiosRetry';
import type {
  CreateAxiosOptions,
  RequestOptions,
  Result,
  TOnUploadProgress,
  AxiosTransform,
} from '@/lib/services/request-client/types';
import { ContentTypeEnum } from '@/lib/services/request-client/enum';
import { checkStatus } from '@/lib/services/request-client/checkStatus';

/**
 * 核心请求类：对 axios 进行统一封装
 * - 支持请求/响应拦截
 * - 支持业务数据解包
 * - 支持 Token 注入与重复请求取消
 */
export class VAxios {
  private axiosInstance: AxiosInstance;
  private readonly options: CreateAxiosOptions;

  /** 创建实例时传入默认配置 */
  constructor(options: CreateAxiosOptions) {
    this.options = options;
    this.axiosInstance = axios.create(options);
    this.setupInterceptors();
  }

  /** 重新配置 axios 实例 */
  configAxios(config: CreateAxiosOptions) {
    if (!this.axiosInstance) {
      return;
    }
    this.createAxios(config);
  }

  /** 发送 DELETE 请求 */
  delete<T = any>(
    config: AxiosRequestConfig,
    options?: RequestOptions
  ): Promise<T> {
    return this.request({ ...config, method: 'DELETE' }, options);
  }

  /** 发送 GET 请求 */
  get<T = any>(
    config: AxiosRequestConfig,
    options?: RequestOptions
  ): Promise<T> {
    return this.request({ ...config, method: 'GET' }, options);
  }

  /** 获取底层 axios 实例 */
  getAxios(): AxiosInstance {
    return this.axiosInstance;
  }

  /** 发送 POST 请求 */
  post<T = any>(
    config: AxiosRequestConfig,
    options?: RequestOptions
  ): Promise<T> {
    return this.request({ ...config, method: 'POST' }, options);
  }

  /** 发送 PUT 请求 */
  put<T = any>(
    config: AxiosRequestConfig,
    options?: RequestOptions
  ): Promise<T> {
    return this.request({ ...config, method: 'PUT' }, options);
  }

  /**
   * 核心请求方法
   * 统一处理请求前置钩子、错误捕获与响应解包
   */
  request<T = any>(
    config: AxiosRequestConfig,
    options?: RequestOptions
  ): Promise<T> {
    let conf: AxiosRequestConfig = { ...config };
    const transform = this.getTransform();
    const { requestOptions } = this.options;
    const opt: RequestOptions = Object.assign({}, requestOptions, options);

    const { beforeRequestHook, requestCatchHook, transformRequestHook } =
      transform || {};
    if (beforeRequestHook && typeof beforeRequestHook === 'function') {
      conf = beforeRequestHook(conf, opt);
    }
    (conf as any).requestOptions = opt;
    conf = this.supportFormUrlEncoded(conf);
    conf = this.cleanNullValues(conf);

    return new Promise((resolve, reject) => {
      this.axiosInstance
        .request<any, AxiosResponse<Result>>(conf)
        .then((res: AxiosResponse<Result>) => {
          if (transformRequestHook && typeof transformRequestHook === 'function') {
            try {
              const ret = transformRequestHook(res, opt);
              resolve(ret);
            } catch (error) {
              reject(error || new Error('request error'));
            }
            return;
          }
          resolve(res as unknown as Promise<T>);
        })
        .catch((error: AxiosError | Error) => {
          if (requestCatchHook && typeof requestCatchHook === 'function') {
            reject(requestCatchHook(error as Error, opt));
            return;
          }
          reject(error);
        });
    });
  }

  private cleanNullValues(config: AxiosRequestConfig) {
    const params = config.params as Record<string, any> | undefined;
    const data = config.data as Record<string, any> | undefined;
    if (params && typeof params === 'object') {
      Object.keys(params).forEach((k) => {
        const v = params[k];
        if (v === null || v === undefined) params[k] = '';
      });
    }
    if (data && typeof data === 'object') {
      Object.keys(data).forEach((k) => {
        const v = (data as any)[k];
        if (v === null || v === undefined) (data as any)[k] = '';
      });
    }
    return config;
  }

  /**
   * 当 Content-Type 为 application/x-www-form-urlencoded 时，
   * 使用 qs 将 data 序列化为表单编码
   */
  private supportFormUrlEncoded(config: AxiosRequestConfig) {
    const headers = config.headers || this.options.headers;
    const contentType = headers?.['Content-Type'] || headers?.['content-type'];
    if (
      contentType !== ContentTypeEnum.FORM_URLENCODED ||
      !Reflect.has(config, 'data') ||
      config.method?.toUpperCase() === 'GET'
    ) {
      return config;
    }
    return {
      ...config,
      data: qs.stringify(config.data as any, { arrayFormat: 'brackets' }),
    };
  }

  /** 设置通用 Header */
  setHeader(headers: any): void {
    if (!this.axiosInstance) {
      return;
    }
    Object.assign(this.axiosInstance.defaults.headers, headers);
  }

  /**
   * 文件上传封装
   * 支持附加自定义数据与进度回调
   */
  uploadFile<T = any>(
    config: AxiosRequestConfig,
    params: {
      /** 额外表单字段 */
      data?: Record<string, any>;
      /** 字段名（默认 file） */
      name?: string;
      /** 文件对象 */
      file: Blob | File;
      /** 自定义文件名 */
      filename?: string;
      /** 上传进度回调 */
      onUploadProgress?: TOnUploadProgress;
    }
  ) {
    const formData = new window.FormData();
    const customFilename = params.name || 'file';

    if (params.filename) {
      formData.append(customFilename, params.file, params.filename);
    } else {
      formData.append(customFilename, params.file);
    }

    if (params.data) {
      Object.keys(params.data).forEach((key) => {
        const value = params.data?.[key];
        if (Array.isArray(value)) {
          value.forEach((item) => {
            formData.append(`${key}[]`, item);
          });
          return;
        }
        formData.append(key, params.data?.[key]);
      });
    }

    return this.axiosInstance.request<T>({
      ...config,
      method: 'POST',
      data: formData,
      onUploadProgress: params.onUploadProgress,
      headers: {
        'Content-type': 'multipart/form-data;charset=UTF-8',
        ignoreCancelToken: true,
      } as any,
    });
  }

  /** 内部：重新创建 axios 实例 */
  private createAxios(config: CreateAxiosOptions): void {
    this.axiosInstance = axios.create(config);
  }

  /** 获取拦截器/钩子配置 */
  private getTransform() {
    const { transform } = this.options;
    return transform;
  }

  /**
   * 注册请求与响应拦截器
   * - 支持取消重复请求
   * - 支持请求前注入 Header/Token
   * - 支持响应错误统一处理（含自动重试）
   */
  private setupInterceptors() {
    const transform = this.getTransform();
    if (!transform) {
      return;
    }
    const {
      requestInterceptors,
      requestInterceptorsCatch,
      responseInterceptors,
      responseInterceptorsCatch,
    } = transform;

    const axiosCanceler = new AxiosCanceler();

    this.axiosInstance.interceptors.request.use((config: any): any => {
      const { ignoreCancelToken } = config.requestOptions || {};
      const ignoreCancel =
        ignoreCancelToken === undefined
          ? this.options.requestOptions?.ignoreCancelToken
          : ignoreCancelToken;

      !ignoreCancel && axiosCanceler.addPending(config);
      if (requestInterceptors && typeof requestInterceptors === 'function') {
        config = requestInterceptors(config, this.options);
      }
      return config;
    }, undefined);

    requestInterceptorsCatch &&
      typeof requestInterceptorsCatch === 'function' &&
      this.axiosInstance.interceptors.request.use(
        undefined,
        requestInterceptorsCatch
      );

    this.axiosInstance.interceptors.response.use((res: AxiosResponse<any>) => {
      res && axiosCanceler.removePending(res.config);
      if (responseInterceptors && typeof responseInterceptors === 'function') {
        res = responseInterceptors(res);
      }
      return res;
    }, undefined);

    responseInterceptorsCatch &&
      typeof responseInterceptorsCatch === 'function' &&
      this.axiosInstance.interceptors.response.use(undefined, (error) => {
        responseInterceptorsCatch(this.axiosInstance as any, error);
      });
  }
}

/**
 * 创建默认配置（适配本项目）
 * - 基础地址与超时来源于 constants
 * - 默认开启业务数据解包与 GET 时间戳
 * - 提供 tokenProvider 用于灵活获取令牌
 */
export function createDefaultOptions(
  opt?: Partial<CreateAxiosOptions>
): CreateAxiosOptions {
  const tokenProvider =
    opt?.tokenProvider ||
    (() => {
      if (typeof window !== 'undefined') {
        return localStorage.getItem('auth_token') || localStorage.getItem('token');
      }
      return undefined;
    });

  const transform: AxiosTransform = {
    /** 对响应进行业务层解包 */
    transformRequestHook: (res: AxiosResponse<Result>, options: RequestOptions) => {
      const { isTransformResponse, isReturnNativeResponse } = options;
      if (isReturnNativeResponse) {
        return res;
      }
      if (!isTransformResponse) {
        return res.data;
      }
      const payload = res.data;
      if (!payload) {
        throw new Error('Empty response');
      }
      if (typeof payload === 'object') {
        if (payload.success === true && 'data' in payload) {
          return payload.data;
        }
        if ('code' in payload && payload.code === 200 && 'data' in payload) {
          return payload.data;
        }
      }
      return payload as any;
    },
    /** 请求前置处理：拼接路径与参数 */
    beforeRequestHook: (config, options) => {
      const {
        apiUrl,
        joinPrefix,
        joinParamsToUrl,
        formatDate,
        joinTime = true,
        urlPrefix,
      } = options;

      if (joinPrefix && urlPrefix) {
        config.url = `${urlPrefix}${config.url}`;
      }
      if (apiUrl) {
        config.url = `${apiUrl}${config.url}`;
      }

      const params = config.params || {};
      const data = config.data || undefined;

      if (config.method?.toUpperCase() === 'GET') {
        const searchParams = new URLSearchParams();
        Object.entries(params as Record<string, any>).forEach(([k, v]) => {
          if (v === null || v === undefined) return;
          searchParams.append(k, String(v));
        });
        if (joinTime) {
          searchParams.append('_t', String(Date.now()));
        }
        config.params = Object.fromEntries(searchParams.entries());
      } else {
        if (data === undefined && params && Object.keys(params).length > 0) {
          config.data = params;
          config.params = undefined;
        }
        if (joinParamsToUrl) {
          const u = new URL(config.url as string, 'http://local');
          const merged = { ...(config.params || {}), ...(config.data || {}) };
          Object.entries(merged).forEach(([k, v]) => {
            if (v === null || v === undefined) return;
            u.searchParams.append(k, String(v));
          });
          config.url = u.pathname + (u.search ? u.search : '');
        }
      }
      return config;
    },
    /** 请求拦截：注入 Token 等通用 Header */
    requestInterceptors: (config, options) => {
      const token =
        options.tokenProvider?.() ??
        (typeof window !== 'undefined'
          ? localStorage.getItem('auth_token') || localStorage.getItem('token')
          : undefined);
      if (
        token &&
        (config as any)?.requestOptions?.withToken !== false
      ) {
        (config as any).headers = {
          ...(config.headers || {}),
          Authorization: options.authenticationScheme
            ? `${options.authenticationScheme} ${token}`
            : `Bearer ${token}`,
          'Time-Zone':
            Intl.DateTimeFormat().resolvedOptions().timeZone,
          ...(typeof navigator !== 'undefined' && navigator.language
            ? { 'Accept-Language': navigator.language }
            : {}),
        };
      }
      return config;
    },
    /** 响应拦截：原样返回（可扩展统一处理） */
    responseInterceptors: (res: AxiosResponse<any>) => res,
    /** 响应错误捕获：支持 GET 自动重试 */
    responseInterceptorsCatch: (axiosInstance: AxiosResponse, error: any) => {
      const { config } = error || {};
      const status = error?.response?.status;
      const text = error?.toString?.() ?? '';
      checkStatus(status ?? 500, text, config?.requestOptions?.errorMessageMode);
      const isOpenRetry = config?.requestOptions?.retryRequest?.isOpenRetry;
      if (config?.method?.toUpperCase() === 'GET' && isOpenRetry) {
        const retryRequest = new AxiosRetry();
        retryRequest.retry(axiosInstance, error);
      }
      return Promise.reject(error);
    },
  };

  return {
    baseURL: API_BASE_URL,
    timeout: API_TIMEOUT,
    headers: {
      'Content-Type': ContentTypeEnum.JSON,
      Accept: 'application/json',
    },
    // 使用 qs 进行参数序列化，避免索引拼接
    paramsSerializer: (params: any) => qs.stringify(params, { indices: false }),
    transformResponse: (data: any) => {
      try {
        return JSONBig({ storeAsString: true }).parse(data);
      } catch {
        try {
          return typeof data === 'string' ? JSON.parse(data) : data;
        } catch {
          return data;
        }
      }
    },
    transform,
    tokenProvider,
    requestOptions: {
      /** 关闭路径前缀拼接，默认走 baseURL */
      joinPrefix: false,
      /** 返回解包后的数据结构 */
      isReturnNativeResponse: false,
      isTransformResponse: true,
      /** 关闭参数拼接到 URL，按需开启 */
      joinParamsToUrl: false,
      formatDate: false,
      /** 默认不弹错误提示，交由调用方处理 */
      errorMessageMode: 'none',
      apiUrl: API_BASE_URL,
      urlPrefix: '',
      /** GET 请求追加时间戳 */
      joinTime: true,
      /** 默认启用重复请求取消 */
      ignoreCancelToken: false,
      /** 默认携带 Token */
      withToken: true,
      /** GET 自动重试配置 */
      retryRequest: {
        isOpenRetry: true,
        count: 3,
        waitTime: 100,
      },
    },
    ...opt,
  };
}
