import { useNavigate } from 'react-router-dom';
import { postFile } from './../../../apis/postFile';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const usePostFile = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (file: File) => postFile(file),
    onSuccess: (data) => {
      console.log(data);
      queryClient.setQueryData(['pdfResult'], data);
      navigate('/verify');
    },
    onError: (err) => {
      console.log('업로드 실패: ', err);
    },
  });

  return mutation;
};

export default usePostFile;
