import Logo from '../../assets/images/logo.png';
import UploadBox from './components/UploadBox';

const StartPage = () => {
  return (
    <div className='w-[100vw] h-[100vh] p-12 box-border flex flex-col justify-center items-center gap-7 text-center'>
      <div className='w-[400px] h-[40%] min-w-[200px] min-h-[250px]'>
        <img src={Logo} alt='로고' />
        <p>Embracing a New Horizon in Finance!</p>
      </div>
      <UploadBox />
    </div>
  );
};

export default StartPage;
