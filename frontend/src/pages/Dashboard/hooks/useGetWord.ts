import { useQuery } from '@tanstack/react-query';
import { getWord } from '../../../apis/searchWord';

export const useGetWord = (word: string) => {
  const { data, isPending, isError } = useQuery({
    queryKey: ['word'],
    queryFn: () => getWord(word),
    select: (data) => data,
  });

  return { data, isPending, isError };
};
