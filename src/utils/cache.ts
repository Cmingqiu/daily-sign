/**
 * 统一读取缓存
 */

import { CACHE_KEYS } from '@/config/enums';

/**
 * 订阅消息弹框
 */
export const subscribeCache = {
  set() {
    cacheHandle(CACHE_KEYS.SUBSCRIBE, true);
  },
  get() {
    return cacheHandle(CACHE_KEYS.SUBSCRIBE);
  }
};

function cacheHandle(key: string, value?: any) {
  if (value) {
    uni.setStorageSync(key, value);
    return true;
  } else {
    return uni.getStorageSync(key);
  }
}
