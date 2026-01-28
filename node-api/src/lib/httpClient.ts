import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';

// 扩展AxiosRequestConfig类型以支持重试计数
interface RetryAxiosRequestConfig extends InternalAxiosRequestConfig {
  __retryCount?: number;
}

export interface HttpClientConfig {
  baseURL?: string;
  timeout?: number;
  headers?: Record<string, string>;
  retries?: number;
  retryDelay?: number;
}

export interface HttpResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: any;
}

export interface HttpError {
  message: string;
  status?: number;
  code?: string;
  response?: any;
}

class HttpClient {
  private instance: AxiosInstance;
  private config: HttpClientConfig;

  constructor(config: HttpClientConfig = {}) {
    this.config = {
      timeout: 10000,
      retries: 3,
      retryDelay: 1000,
      ...config,
    };



    this.instance = axios.create({
      baseURL: this.config.baseURL,
      timeout: this.config.timeout,
      headers: {
        'Content-Type': 'application/json',
        ...this.config.headers,
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    // 请求拦截器
    this.instance.interceptors.request.use(
      (config) => {
        const { method, url, data, params } = config;
        console.log(`[HTTP Request] ${method?.toUpperCase()} ${url}`, {
          data,
          params,
          headers: config.headers,
        });
        return config;
      },
      (error) => {
        console.error('[HTTP Request Error]', error);
        return Promise.reject(error);
      }
    );

    // 响应拦截器
    this.instance.interceptors.response.use(
      (response: AxiosResponse) => {
        const { status, data, config } = response;
        console.log(`[HTTP Response] ${config.method?.toUpperCase()} ${config.url} - ${status}`, {
          data,
        });
        return response;
      },
      async (error: AxiosError) => {
        const { config, response } = error;
        const retryConfig = config as RetryAxiosRequestConfig;
        
        console.error(`[HTTP Response Error] ${retryConfig?.method?.toUpperCase()} ${retryConfig?.url}`, {
          status: response?.status,
          data: response?.data,
          message: error.message,
        });

        // 重试逻辑
        if (this.shouldRetry(error) && retryConfig && !retryConfig.__retryCount) {
          retryConfig.__retryCount = 0;
        }

        if (retryConfig && retryConfig.__retryCount! < this.config.retries!) {
          retryConfig.__retryCount!++;
          
          await this.delay(this.config.retryDelay! * retryConfig.__retryCount!);
          
          console.log(`[HTTP Retry] Attempt ${retryConfig.__retryCount}/${this.config.retries} for ${retryConfig.method?.toUpperCase()} ${retryConfig.url}`);
          
          return this.instance(retryConfig);
        }

        return Promise.reject(this.formatError(error));
      }
    );
  }

  private shouldRetry(error: AxiosError): boolean {
    // 只对网络错误、超时和5xx错误进行重试
    return (
      !error.response ||
      error.code === 'ECONNABORTED' ||
      (error.response.status >= 500 && error.response.status < 600)
    );
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private formatError(error: AxiosError): HttpError {
    const { response, message, code } = error;
    const responseData = response?.data as any;
    
    return {
      message: responseData?.message || message || '请求失败',
      status: response?.status,
      code: code,
      response: responseData,
    };
  }

  // GET 请求
  async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<HttpResponse<T>> {
    const response = await this.instance.get<T>(url, config);
    return {
      data: response.data,
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    };
  }

  // POST 请求
  async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<HttpResponse<T>> {
    const response = await this.instance.post<T>(url, data, config);
    return {
      data: response.data,
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    };
  }

  // PUT 请求
  async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<HttpResponse<T>> {
    const response = await this.instance.put<T>(url, data, config);
    return {
      data: response.data,
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    };
  }

  // DELETE 请求
  async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<HttpResponse<T>> {
    const response = await this.instance.delete<T>(url, config);
    return {
      data: response.data,
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    };
  }

  // PATCH 请求
  async patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<HttpResponse<T>> {
    const response = await this.instance.patch<T>(url, data, config);
    return {
      data: response.data,
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    };
  }

  // 设置默认请求头
  setDefaultHeader(key: string, value: string): void {
    this.instance.defaults.headers.common[key] = value;
  }

  // 移除默认请求头
  removeDefaultHeader(key: string): void {
    delete this.instance.defaults.headers.common[key];
  }

  // 设置Bearer Token
  setBearerToken(token: string): void {
    this.setDefaultHeader('Authorization', `Bearer ${token}`);
  }

  // 移除Bearer Token
  removeBearerToken(): void {
    this.removeDefaultHeader('Authorization');
  }

  // 获取axios实例，用于更复杂的操作
  getInstance(): AxiosInstance {
    return this.instance;
  }
}

export default HttpClient;