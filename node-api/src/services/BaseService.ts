import HttpClient, { HttpClientConfig, HttpResponse, HttpError } from '@/lib/httpClient';

export abstract class BaseService {
  protected httpClient: HttpClient;
  protected serviceName: string;

  constructor(serviceName: string, config: HttpClientConfig = {}) {
    this.serviceName = serviceName;
    this.httpClient = new HttpClient(config);
  }

  /**
   * 设置认证token
   */
  setAuthToken(token: string): void {
    this.httpClient.setBearerToken(token);
  }

  /**
   * 移除认证token
   */
  removeAuthToken(): void {
    this.httpClient.removeBearerToken();
  }

  /**
   * 设置自定义请求头
   */
  setHeader(key: string, value: string): void {
    this.httpClient.setDefaultHeader(key, value);
  }

  /**
   * 通用错误处理
   */
  protected handleError(error: HttpError, operation: string): never {
    const errorMessage = `${this.serviceName} - ${operation} 失败: ${error.message}`;
    
    // 这里可以添加更多的错误处理逻辑，比如错误上报、告警等
    console.error(errorMessage, {
      service: this.serviceName,
      operation,
      error,
    });

    throw new Error(errorMessage);
  }

  /**
   * 包装API调用，统一错误处理
   */
  protected async apiCall<T>(
    operation: string,
    apiCall: () => Promise<HttpResponse<T>>
  ): Promise<T> {
    try {
      const response = await apiCall();
      return response.data;
    } catch (error) {
      this.handleError(error as HttpError, operation);
    }
  }
}

export default BaseService;