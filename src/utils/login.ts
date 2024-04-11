import { jscode2session } from '@/api/jscode2session';
const UNION_ID = 'UNION_ID';

export function login() {
  return new Promise((resolve, reject) => {
    uni.login({
      provider: 'weixin',
      success: async res => {
        if (res.code) {
          const result = await jscode2session(res.code);
          uni.setStorageSync(UNION_ID, result.unionid);
          resolve(result.unionid);
        } else {
          reject('登录失败');
        }
      },
      fail: error => {
        reject(error);
      }
    });
  });
}

export function getUnionId() {
  return new Promise(async (resolve, reject) => {
    const unionId = uni.getStorageSync(UNION_ID);
    if (unionId) resolve(unionId);
    try {
      const unionId = await login();
      resolve(unionId);
    } catch (error) {
      reject(error);
    }
  });
}
