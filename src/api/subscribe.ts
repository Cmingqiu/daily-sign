import http from '.';
import { getUnionId } from '@/utils/login';

/**
 * 取消当次订阅
 */
export async function cancelOneSubscribeAPI() {
  const unionId = await getUnionId();
  return http<any>({
    url: `/cancel/warning/${unionId}`,
    method: 'GET'
  });
}
