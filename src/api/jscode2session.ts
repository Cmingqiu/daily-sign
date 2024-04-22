import http from '.';

interface WxSession {
  openid: string;
  session_key: string;
  unionid: string;
}
export function jscode2session(code: string) {
  return http<WxSession>({
    url: `/auth/${code}`,
    method: 'GET'
  });
}
