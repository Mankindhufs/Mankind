const duedate = {
  maturityDate: '2028년 03월 24일',
  expirationDate: '만기평가일(불포함) 이후 3영업일',
};

const DueDate = () => {
  return (
    <div className='w-full flex flex-col p-3 shadow-md rounded-[10px] gap-6'>
      {/* 만기평가일 */}
      <div className='flex flex-col gap-2'>
        <p className='font-semibold text-sm'>만기평가일</p>
        <p className='text-end text-xl p-3 border-4 border-solid border-mainGreen'>
          {duedate.maturityDate}
        </p>
      </div>

      {/* 만기일 */}
      <p className='text-sm'>
        <span className='font-semibold '>* 만기일:</span>{' '}
        {duedate.expirationDate}
      </p>
    </div>
  );
};

export default DueDate;
