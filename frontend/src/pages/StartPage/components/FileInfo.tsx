import { FileInfoProps } from './UploadBox';

const FileInfo = ({ uploadedInfo }: { uploadedInfo: FileInfoProps }) => {
  const { name } = uploadedInfo;
  return <div className='text-black w-[80%] text-center'>{name}</div>;
};

export default FileInfo;
