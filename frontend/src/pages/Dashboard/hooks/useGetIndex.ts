import { useQuery } from '@tanstack/react-query';
import { getIndex } from '../../../apis/getIndex';

export const useGetIndex = () => {
  const { data, isPending, isError } = useQuery({
    queryKey: ['index'],
    queryFn: () => getIndex(),
  });

  const kospi = data?.find((item) => item.name === 'KOSPI 200');
  const sp = data?.find((item) => item.name === 'S&P 500');
  const euro = data?.find((item) => item.name === 'EURO STOXX 50');

  return { kospi, sp, euro, isPending, isError };
};
