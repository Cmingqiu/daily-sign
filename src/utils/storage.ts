/* 
可设置过期时间的缓存
单位：秒；默认1个月
缺点：必须调用getStorageSync才能判断是否过期，无法像cookie一样自动过期
*/
const DEFAULT_EXPIRES = 60 * 60 * 24 * 30 * 1000;
export function setStorageSync(
  key: string,
  value: any,
  expires: number = DEFAULT_EXPIRES
) {
  const startTime = new Date().getTime();
  uni.setStorageSync(key, JSON.stringify(value) + `__${expires}__${startTime}`);
}

export function getStorageSync(key: string): any {
  const now = new Date().getTime();
  const value: string = uni.getStorageSync(key);
  let [realValue, expires, startTime] = value.split('__');
  realValue = realValue !== '' ? JSON.parse(realValue) : realValue;
  if (expires !== undefined) {
    if (now - +startTime < +expires) {
      return realValue;
    } else {
      // 过期了
      uni.removeStorageSync(key);
      return '';
    }
  } else {
    // 没有设置过期时间，正常取值
    return realValue;
  }
}
