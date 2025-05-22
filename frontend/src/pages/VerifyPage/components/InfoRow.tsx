// label + input 묶음 컴포넌트
// lael은 위에 작은(4px)글씨, input은 네모 안에 있는 중간(8px)글씨
// 예. 만기일 가격(label)
//            75% (input)

// src/pages/VerifyPage/components/InfoRow.tsx
import React, { ChangeEvent, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { InputProps } from '../../../typings/types';

const InfoRow: React.FC<InputProps> = ({
  name,
  label,
  value = '',
  readOnly = false,
  suffix,
  hideLabel = false,
  inputClassName = '',
  //  input 박스별로 디자인 다르게 하려고 만듦
  plainText = false,
  prefix,
  isEditing,
  datetype,
  onChangeFunction,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    new Date(value),
  );

  // 선택 가능한 날짜를 입력된 날짜의 1년 전후로 설정
  const minYear = selectedDate
    ? new Date(
        selectedDate.getFullYear() - 1,
        selectedDate.getMonth(),
        selectedDate.getDate(),
      )
    : undefined;
  const maxYear = selectedDate
    ? new Date(
        selectedDate.getFullYear() + 1,
        selectedDate.getMonth(),
        selectedDate.getDate(),
      )
    : undefined;

  // datepicker 수정값 반영
  const onChangeDate = (
    e?: ChangeEvent<HTMLInputElement>,
    name?: string,
    date?: Date | null,
  ) => {
    if (!e && date) {
      setSelectedDate(date);
      onChangeFunction?.(undefined, name, date);
    }
  };

  return (
    <div className='flex items-center justify-between w-[95%] mb-4 gap-5'>
      {/* <label className="text-sm font-medium mb-1">{label}</label> */}
      {!hideLabel && (
        <label className='text-sm font-medium mb-1 min-w-12 max-w-20 break-keep'>
          {label}
        </label>
      )}

      <div className='flex items-center'>
        {/* prefix가 있으면 인풋 앞에 렌더 */}
        {prefix && (
          <span className='mr-2 text-sm font-normal min-w-16'>{prefix}</span>
        )}

        {/* 인풋 + 접미사*/}

        {plainText ? (
          // 플레인 텍스트 모드
          <span className='text-base break-keep text-end '>{value}</span>
        ) : datetype ? (
          <>
            <DatePicker
              name={name}
              className={`p-2 border rounded-lg bg-white text-left text-base max-w-64 min-w-24`}
              dateFormat='yyyy-MM-dd' // 날짜 형태
              shouldCloseOnSelect // 날짜를 선택하면 datepicker가 자동으로 닫힘
              selected={selectedDate}
              minDate={minYear}
              maxDate={maxYear}
              readOnly={isEditing ? false : readOnly}
              onChange={(date) => {
                onChangeDate(undefined, name, date);
              }}
            />
          </>
        ) : (
          // 기본: 인풋 박스 + 접미사
          <>
            <input
              name={name}
              className={`p-2 border rounded-lg bg-white text-left text-base ${inputClassName} max-w-64 min-w-24 focus:outline-none`}
              defaultValue={value}
              readOnly={isEditing ? false : readOnly}
              onChange={onChangeFunction}
            />
            {suffix && <span className='ml-2'>{suffix}</span>}
          </>
        )}
      </div>
    </div>
  );
};

export default InfoRow;
