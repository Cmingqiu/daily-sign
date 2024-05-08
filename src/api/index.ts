type RequestMethod = 'GET' | 'POST' | 'DELETE' | 'PUT';
// 请求参数
interface RequestConfig {
  url: string;
  method?: RequestMethod;
  data?: Record<string, any> | string | ArrayBuffer;
  header?: Record<string, any>;
}

interface UniResponse<T> {
  statusCode: number;
  errMsg: string;
  data: Response<T>;
}
// 服务端响应参数
interface Response<T> {
  data: T;
  msg: string;
  status: 0;
}

const baseURL = 'https://worktime.icu/worktime';

function formatURL(url: string) {
  return url.startsWith('http') ? url : baseURL + url;
}

export default function http<T>(config: RequestConfig) {
  return new Promise<T>(async (resolve, reject) => {
    uni.request({
      ...config,
      url: formatURL(config.url),
      header: {
        Authorization: 'Bearer 4e6e6192-2559-4220-a0e2-5e2ee0222ac1'
      },
      success(res) {
        const { statusCode, errMsg, data } = res as any as UniResponse<T>;
        if (statusCode === 200) {
          if (
            !config.url.startsWith('http') &&
            !config.url.startsWith('/auth')
          ) {
            // 本业务逻辑
            data.status === 0
              ? resolve(data.data)
              : uni.showToast({ title: data.msg, icon: 'error' });
          } else resolve(data as T);
        } else {
          uni.showToast({ title: errMsg, icon: 'error' });
        }
      },
      fail(error) {
        uni.showToast({ title: '请求失败！', icon: 'error' });
        reject(error);
      },
      complete({ data }: any) {
        console.info('请求log====> ', formatURL(config.url));
        console.log(data);
        console.info('======');
      }
    });
  });
}
