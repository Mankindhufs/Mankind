import { useQuery } from '@tanstack/react-query';
import { getWord } from '../../../apis/getWord';

export const useGetWord = (word: string) => {
  const { data, isPending } = useQuery({
    queryKey: ['word', word],
    queryFn: () => getWord(word),
    enabled: !!word,
  });

  if (data?.error) {
    return { result: false, isPending };
  }

  return { result: data, isPending };
};
