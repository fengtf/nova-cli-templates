import { getToken } from './oneDriveAuth';
import { envConfig } from '@/utils/utils';

const baseUrl = 'https://onedrive.live.com/picker';

// OneDrive Picker 参数类型定义
interface PickerParams {
  sdk: string;
  entry: {
    oneDrive: {
      files: Record<string, unknown>;
    };
  };
  authentication: Record<string, unknown>;
  messaging: {
    origin: string;
    channelId: string;
  };
  typesAndSources: {
    mode: string;
    pivots: {
      oneDrive: boolean;
      recent: boolean;
    };
  };
}

// 消息类型定义
interface PickerMessage {
  type: string;
  data?: {
    type?: string;
    id?: string;
    data?: {
      command?: string;
      [key: string]: unknown;
    };
    [key: string]: unknown;
  };
  channelId?: string;
}

// the options we pass to the picker page through the querystring
const params: PickerParams = {
  sdk: '8.0',
  entry: {
    oneDrive: {
      files: {},
    },
  },
  authentication: {},
  messaging: {
    origin: window.location.origin,
    channelId: '27',
  },
  typesAndSources: {
    mode: 'folders',
    pivots: {
      oneDrive: true,
      recent: true,
    },
  },
};

let pickerContainer: HTMLElement | null = null;
let pickerIframe: HTMLIFrameElement | null = null;
let port: MessagePort | null = null;
// 事件处理器引用，用于清理
let windowMessageHandler: ((event: MessageEvent) => void) | null = null;
let portMessageHandler: ((message: MessageEvent) => void) | null = null;
let containerClickHandler: ((e: MouseEvent) => void) | null = null;

async function messageListener(message: MessageEvent, callback: (data:any) => void): Promise<void> {
  switch (message.data.type) {
    case 'notification':
      console.log(`notification: ${message.data}`);
      break;

    case 'command':
      if (!port) return;
      
      port.postMessage({
        type: 'acknowledge',
        id: message.data.id,
      });

      const command = message.data.data;

      switch (command.command) {
        case 'authenticate':
          // getToken is from scripts/auth.js
          const token = await getToken();

          if (typeof token !== 'undefined' && token !== null) {
            port?.postMessage({
              type: 'result',
              id: message.data.id,
              data: {
                result: 'token',
                token,
              },
            });
          } else {
            console.error(
              `Could not get auth token for command: ${JSON.stringify(command)}`
            );
          }

          break;

        case 'close':
          closePicker();
          break;

        case 'pick':
          callback(command);
          port?.postMessage({
            type: 'result',
            id: message.data.id,
            data: {
              result: 'success',
            },
          });

          closePicker();

          break;

        default:
          console.warn(`Unsupported command: ${JSON.stringify(command)}`, 2);

          port?.postMessage({
            result: 'error',
            error: {
              code: 'unsupportedCommand',
              message: command.command,
            },
            isExpected: true,
          });
          break;
      }

      break;
  }
}

function closePicker(): void {
  // 清理 port 监听器
  if (port && portMessageHandler) {
    port.removeEventListener('message', portMessageHandler);
    portMessageHandler = null;
  }
  
  // 清理 window 监听器
  if (windowMessageHandler) {
    window.removeEventListener('message', windowMessageHandler);
    windowMessageHandler = null;
  }
  
  // 清理容器点击监听器
  if (pickerContainer && containerClickHandler) {
    pickerContainer.removeEventListener('click', containerClickHandler);
    containerClickHandler = null;
  }
  
  if (pickerContainer) {
    // 安全地移除 DOM 元素，检查父节点是否存在
    if (pickerContainer.parentNode) {
      try {
        pickerContainer.parentNode.removeChild(pickerContainer);
      } catch (error) {
        console.warn('Failed to remove picker container from DOM:', error);
      }
    }
    pickerContainer = null;
  }
  pickerIframe = null;
  port = null;
}

export async function launchPicker(e: Event | undefined, callback: (data:any) => void): Promise<void> {
  e?.preventDefault();

  const authToken = await getToken();

  // 创建遮罩层和容器
  pickerContainer = document.createElement('div');
  pickerContainer.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1050;
    padding: 40px;
    box-sizing: border-box;
  `;

  // 创建对话框容器
  const dialogContainer = document.createElement('div');
  dialogContainer.style.cssText = `
    position: relative;
    width: 100%;
    height: 100%;
    max-width: 1200px;
    max-height: 800px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    display: flex;
    flex-direction: column;
  `;

  // 创建 iframe
  pickerIframe = document.createElement('iframe');
  pickerIframe.style.cssText = `
    width: 100%;
    height: 100%;
    border: none;
    flex: 1;
  `;

  // 组装 DOM 结构
  dialogContainer.appendChild(pickerIframe);
  pickerContainer.appendChild(dialogContainer);
  document.body.appendChild(pickerContainer);

  // 点击遮罩层关闭
  containerClickHandler = (e: MouseEvent) => {
    if (e.target === pickerContainer) {
      closePicker();
    }
  };
  pickerContainer.addEventListener('click', containerClickHandler);

  // 在 iframe 加载后提交表单
  pickerIframe.onload = () => {
    if (!pickerIframe || !pickerIframe.contentWindow) return;

    const iframeDoc = pickerIframe.contentDocument || pickerIframe.contentWindow.document;
    
    // 检查 iframeDoc 是否存在，防止跨域或加载问题导致的运行时错误
    if (!iframeDoc) {
      console.error('无法访问 iframe 文档，可能是跨域限制或加载问题');
      closePicker();
      return;
    }
    
    const queryString = new URLSearchParams({
      filePicker: JSON.stringify(params),
    });

    const url = `${baseUrl}?${queryString}`;

    const form = iframeDoc.createElement('form');
    form.setAttribute('action', url);
    form.setAttribute('method', 'POST');
    iframeDoc.body.append(form);

    const input = iframeDoc.createElement('input');
    input.setAttribute('type', 'hidden');
    input.setAttribute('name', 'access_token');
    input.setAttribute('value', authToken);
    form.appendChild(input);

    form.submit();
  };

  // 触发 iframe 加载
  pickerIframe.srcdoc = '<!DOCTYPE html><html><head></head><body></body></html>';

  // 监听来自 iframe 的消息
  windowMessageHandler = (event: MessageEvent) => {
    if (event.source && pickerIframe && event.source === pickerIframe.contentWindow) {
      const message = event.data;

      if (
        message.type === 'initialize' &&
        message.channelId === params.messaging.channelId
      ) {
        port = event.ports[0];

        portMessageHandler = (message: MessageEvent) => messageListener(message, callback);
        port.addEventListener('message', portMessageHandler);

        port.start();

        port.postMessage({
          type: 'activate',
        });
      }
    }
  };
  window.addEventListener('message', windowMessageHandler);
}
