import { useNavigate } from 'react-router-dom';
import { postFile } from './../../../apis/postFile';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { setFileValue } from '../../../utils/savedFile';
import { defaultFileValue } from '../../../constants/defaultFileValue';

const usePostFile = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (file: File) => postFile(file),
    onSuccess: (data) => {
      // 추출값 제대로 가져올 때만 localStorage에 데이터 저장
      if (JSON.stringify(data) !== JSON.stringify(defaultFileValue)) {
        queryClient.setQueryData(['pdfResult'], data);

        // localStorage에 추출값 저장
        setFileValue(data);
      } else {
        setFileValue(null);
      }
      navigate('/verify');
    },
    onError: (err) => {
      console.log('업로드 실패: ', err);
    },
  });

  return mutation;
};

export default usePostFile;
