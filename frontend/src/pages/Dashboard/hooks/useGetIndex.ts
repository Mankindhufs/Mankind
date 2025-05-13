import { useQuery } from '@tanstack/react-query';
import { getIndex } from '../../../apis/getIndex';

export const useGetIndex = () => {
  const { data, isPending, isError } = useQuery({
    queryKey: ['index'],
    queryFn: () => getIndex(),
  });

  return { data, isPending, isError };
};
