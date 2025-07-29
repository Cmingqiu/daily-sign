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
  id: number;
  user_id: string;
  work_date: string;
  timestamp: number;
  record_type: number;
}

export interface RecordParams {
  id?: number;
  timestamp: number;
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
    method: 'GET',
    showLoading: true
  });
}

/**
 * 新增或更新打卡记录
 * @param data Record 无id是新增，传入id就是更新
 * @returns
 */
export async function setOrUpdateRecord({ id, timestamp }: RecordParams) {
  const user_id = await getUnionId();
  const forenoon = isForenoon(timestamp);
  const method = id === undefined ? 'POST' : 'PUT';
  return http({
    url: '/records',
    method,
    data: {
      id,
      user_id,
      timestamp,
      record_type: forenoon ? 1 : 2 // 1上班  2 下班
    },
    showLoading: true
  });
}
