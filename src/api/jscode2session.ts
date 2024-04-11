import http from '.';
const appid = 'wxc9b235b0270b2c52';
const secret = '1b2bd46f0317cf956e2fd1ec7f202823';

interface WxSession {
  openid: string;
  session_key: string;
  unionid: string;
}
export function jscode2session(code: string) {
  return http<WxSession>({
    url: `https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${secret}&js_code=${code}&grant_type=authorization_code`
  });
}
