import { axiosInstance } from './instance';

export const getWord = async (word: string) => {
  const res = await axiosInstance.get('/getFinancialTermMeaning', {
    params: {
      term: word,
    },
  });

  return res;
};
