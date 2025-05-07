import usePostFile from '../hooks/usePostFile';
import { FileInfoProps } from './UploadBox';

const ConfirmButton = ({ data }: { data: FileInfoProps }) => {
  const file = data.file;
  const { mutate: uploadFile } = usePostFile();

  const handleUploadFile = (file: File | null) => {
    if (file) {
      uploadFile(file);
    }
  };

  return (
    <button
      className='bg-mainGreen w-48 h-14 rounded-[50px]'
      onClick={() => handleUploadFile(file)}
    >
      다음
    </button>
  );
};

export default ConfirmButton;
