type RequestMethod = 'GET' | 'POST' | 'DELETE' | 'PUT';
type ResponseDataType = string | AnyObject | ArrayBuffer;
// 请求参数
interface RequestConfig {
  url: string;
  method: RequestMethod;
  data?: Record<string, any> | string | ArrayBuffer;
  header?: Record<string, any>;
}

const baseURL = 'http://150.158.44.227:7435';

export default function http<T extends ResponseDataType>(
  config: RequestConfig
) {
  return new Promise<T>((resolve, reject) => {
    uni.request({
      ...config,
      url: baseURL + config.url,
      header: {
        Authorization: 'Bearer 4e6e6192-2559-4220-a0e2-5e2ee0222ac1'
      },
      success(res) {
        resolve(res.data as T);
      },
      fail(error) {
        reject(error);
      },
      complete() {}
    });
  });
}
