import Logo from '../../assets/images/logo.png';
import UploadBox from './components/UploadBox';

const StartPage = () => {
  return (
    <div className='w-[100%] flex items-center justify-center h-[100%] px-10 box-border'>
      <div className='w-[100%] h-[700px] box-border flex gap-[10em] justify-center items-start'>
        <div className='w-[400px] h-[220px] min-w-[200px]'>
          <img src={Logo} alt='로고' />
          Embracing a New Horizon in Finance!
        </div>
        <UploadBox />
      </div>
    </div>
  );
};

export default StartPage;
