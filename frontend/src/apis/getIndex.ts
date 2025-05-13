import { IndexProp } from '../typings/types';
import { axiosInstance } from './instance';

// 기초 자산 그래프
export const getIndex = async (): Promise<IndexProp[]> => {
  const res = await axiosInstance.get(
    '/api/index?symbols=^GSPC,^KS200,^STOXX50E',
  );

  return res.data.results;
};
