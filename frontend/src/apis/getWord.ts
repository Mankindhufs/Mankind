import { axiosInstance } from './instance';

export const getWord = async (word: string) => {
  const res = await axiosInstance.get('/api/dictionary', {
    params: {
      keyword: word,
    },
  });

  return res.data;
};
