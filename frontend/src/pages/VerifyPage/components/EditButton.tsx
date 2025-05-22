const EditButton = ({
  value,
  onClickFunction,
  textColor,
  backgroundColor,
}: {
  value: string;
  onClickFunction?: () => void;
  backgroundColor?: string;
  textColor?: string;
  isEditing?: boolean;
}) => {
  return (
    <button
      className={`w-48 h-14 rounded-[50px] border-[1px] border-solid ${backgroundColor} ${textColor}`}
      onClick={onClickFunction}
    >
      {value}
    </button>
  );
};

export default EditButton;
