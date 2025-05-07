import { postFile } from './../../../apis/postFile';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const usePostFile = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (file: File) => postFile(file),
    onSuccess: (data) => {
      console.log(data);
      queryClient.setQueryData(['pdfResult'], data);
      console.log('post 성공');
    },
  });

  return mutation;
};

export default usePostFile;
