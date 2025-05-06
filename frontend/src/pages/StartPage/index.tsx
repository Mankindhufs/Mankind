import Logo from '../../assets/images/logo.png';
import UploadBox from './components/UploadBox';

const StartPage = () => {
  return (
    <div className='w-[100%] flex items-center justify-center h-[100%] px-12 box-border'>
      <div className='w-[100%] h-[100%] box-border flex flex-col gap-[4em] justify-center items-center text-center'>
        <div className='w-[400px] h-[220px] min-w-[200px]'>
          <img src={Logo} alt='로고' />
          <p>Embracing a New Horizon in Finance!</p>
        </div>
        <UploadBox />
      </div>
    </div>
  );
};

export default StartPage;
