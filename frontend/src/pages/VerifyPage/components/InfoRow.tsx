// label + input 묶음 컴포넌트
  // lael은 위에 작은(4px)글씨, input은 네모 안에 있는 중간(8px)글씨
  // 예. 만기일 가격(label)
    //            75% (input)

// src/pages/VerifyPage/components/InfoRow.tsx
import React from 'react';

interface Props {
  label: string;
  value?: string;
  readOnly?: boolean;
  suffix?: string; // 뒤에 % 같은 단위 붙이고 싶을 때
  hideLabel? : boolean; // '기초지수' 섹션에서는 라벨 가리기
  inputClassName? : string;
  plainText?: boolean; //만기일은 박스 없이 텍스트만 렌더링
  prefix?: string; // 액면금액 텍스트 추가
}

const InfoRow: React.FC<Props> = ({
   label, 
   value = '', 
   readOnly = false, 
   suffix, 
   hideLabel = false,
   inputClassName ='',
  //  input 박스별로 디자인 다르게 하려고 만들음
  plainText = false,
  prefix
  }) => (
  <div className="flex items-center w-full mb-4 gap-10">
    {/* <label className="text-sm font-medium mb-1">{label}</label> */}
    {!hideLabel && (
      <label className="text-sm font-medium mb-1">{label}</label>
    )}

    <div className="flex items-center">
     {/* prefix가 있으면 인풋 앞에 렌더 */}
     {prefix && (
       <span className="mr-2 text-base font-normal">{prefix}</span>
     )}

      {/* 인풋 + 접미사*/}
    
      {plainText ? (
       // 플레인 텍스트 모드
       <span className="text-base">{value}</span>
     ) : (
      // 기본: 인풋 박스 + 접미사
      <>
      <input
        className={`
          w-42
          p-2 
          border rounded-lg bg-white text-left text-base
        ${inputClassName} 
        `}
        value={value}
        readOnly={readOnly}
      />
      {suffix && <span className="ml-2">{suffix}</span>}
      </>
      )}
    </div>
  </div>
);

export default InfoRow;
