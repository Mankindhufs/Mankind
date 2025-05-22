const Alert = ({
  alertMessage,
  errorMessage,
  animation,
  hideAlertFunction,
}: {
  alertMessage: string;
  errorMessage: string;
  animation: string;
  hideAlertFunction: () => void;
}) => {
  const splitedErrorMessage = errorMessage.split('/');
  return (
    <div
      className={`fixed top-4 left-[50%] translate-x-[-50%] bg-white w-[30%] max-w-96 h-auto z-[1000] box-border p-5 rounded-2xl shadow-xl ${animation}`}
    >
      <div className='flex flex-col gap-5 justify-between'>
        <div className='flex flex-col gap-3'>
          <p className='font-bold'>{alertMessage}</p>
          <div className='flex flex-col gap-0'>
            {splitedErrorMessage.map((item, index) => (
              <span className='text-black' key={index}>
                {item}
              </span>
            ))}
          </div>
        </div>

        <button
          className='bg-red text-sm text-white w-20 h-9 rounded-md p-1 self-end hover:bg-[#D61414]'
          onClick={hideAlertFunction}
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default Alert;
