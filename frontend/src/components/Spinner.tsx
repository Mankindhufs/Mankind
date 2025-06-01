import { SyncLoader } from 'react-spinners';

const Spinner = ({ size }: { size?: number }) => {
  return (
    <div>
      <SyncLoader size={size} />
    </div>
  );
};

export default Spinner;
