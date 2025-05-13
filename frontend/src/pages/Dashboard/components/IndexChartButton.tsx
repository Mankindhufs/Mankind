const IndexChartButton = ({
  value,
  onClickFunction,
  active,
}: {
  value: string;
  onClickFunction: (e: React.MouseEvent<HTMLButtonElement>) => void;
  active?: string;
}) => {
  return (
    <button
      className={`text-xs bg-grayBackground px-2 py-1 rounded-[5px] cursor-pointer ${active === value ? 'bg-mainGreen' : ''}`}
      name={value}
      onClick={onClickFunction}
    >
      {value}
    </button>
  );
};

export default IndexChartButton;
