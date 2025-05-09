import { FileInfoProps } from './UploadBox';

const ConfirmButton = ({
  data,
  uploadFile,
}: {
  data: FileInfoProps;
  uploadFile: (file: File) => void;
}) => {
  const file = data.file;

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
