import ApplicationService from './ApplicationService';
import HttpClient, { HttpClientConfig } from '@/lib/httpClient';
import { consoleDomain, vaultDomain } from '@/config/config.json';
import FinanceService from './FinanceService';

// 服务实例缓存
const serviceInstances = new Map<string, any>();

/**
 * 创建或获取服务实例
 */
function createService<T>(
  ServiceClass: new (config?: HttpClientConfig) => T,
  serviceName: string,
  config?: HttpClientConfig
): T {
  const key = `${serviceName}-${JSON.stringify(config || {})}`;

  if (!serviceInstances.has(key)) {
    serviceInstances.set(key, new ServiceClass(config));
  }

  return serviceInstances.get(key);
}

/**
 * 服务工厂类
 */
class ServiceFactory {
  /**
   * 获取应用服务实例
   */
  static getApplicationService(config?: HttpClientConfig): ApplicationService {
    return createService(ApplicationService, 'ApplicationService', config);
  }

  /**
   * 获取财务服务实例
   */
  static getFinanceService(config?: HttpClientConfig): FinanceService {
    return createService(FinanceService, 'FinanceService', config);
  }

  /**
   * 创建自定义HTTP客户端
   */
  static createHttpClient(config?: HttpClientConfig): HttpClient {
    return new HttpClient(config);
  }

  /**
   * 清除服务实例缓存
   */
  static clearCache(): void {
    serviceInstances.clear();
  }

  /**
   * 清除指定服务的缓存
   */
  static clearServiceCache(serviceName: string): void {
    for (const [key] of serviceInstances) {
      if (key.startsWith(serviceName)) {
        serviceInstances.delete(key);
      }
    }
  }
}

// 应用服务实例
export const applicationService = ServiceFactory.getApplicationService({
  baseURL: consoleDomain || '',
  timeout: 15000,
});

// 财务服务实例
export const financeService = ServiceFactory.getFinanceService({
  baseURL: vaultDomain || '',
  timeout: 15000,
});

// 导出服务类和工厂
export { ApplicationService, ServiceFactory, HttpClient, FinanceService };

// 导出类型
export type { HttpClientConfig } from '@/lib/httpClient';
export type * from './ApplicationService';

export default ServiceFactory;
