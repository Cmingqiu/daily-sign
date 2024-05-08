import http from '.';
import { isForenoon } from '@/utils/isForenoon';
import { getUnionId } from '@/utils/login';

export interface RecordList {
  date: string;
  clock_in: boolean;
  clock_out: boolean;
  detail: Array<RecordDetail>;
}
interface RecordDetail {
  id: string;
  user_id: string;
  work_date: string;
  timestamp: number;
  record_type: number;
}

/**
 * 获取1个月的打卡记录
 * @param yearMonth 例如2024-04
 * @returns Promise<RecordList>
 */
export async function getRecordList(yearMonth: string) {
  const unionId = await getUnionId();
  return http<RecordList[]>({
    url: `/records/list/${unionId}/${yearMonth}`,
    method: 'GET'
  });
}

/**
 * 设置打卡记录
 * @param data Record
 * @returns
 */
export async function setRecords(timestamp: number) {
  const user_id = await getUnionId();
  const forenoon = isForenoon(timestamp);
  return http({
    url: '/records',
    method: 'POST',
    data: {
      user_id,
      timestamp,
      record_type: forenoon ? 1 : 2 // 1上班  2 下班
    }
  });
}

/**
 * 更新打卡记录
 * @param data Record
 * @returns
 */
export async function updateRecords(id: number, timestamp: number) {
  const user_id = await getUnionId();
  const forenoon = isForenoon(timestamp);
  return http({
    url: '/records',
    method: 'PUT',
    data: {
      id,
      user_id,
      timestamp,
      record_type: forenoon ? 1 : 2 // 1上班  2 下班
    }
  });
}
