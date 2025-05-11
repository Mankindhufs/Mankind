// label + input 묶음 컴포넌트


// src/pages/VerifyPage/components/InfoRow.tsx
import React from 'react';

interface Props {
  label: string;
  value?: string;
  readOnly?: boolean;
  suffix?: string; // 뒤에 % 같은 단위 붙이고 싶을 때
}

const InfoRow: React.FC<Props> = ({ label, value = '', readOnly = false, suffix }) => (
  <div className="flex flex-col mb-4">
    <label className="text-sm font-medium mb-1">{label}</label>
    <div className="flex items-center">
      <input
        className="flex-1 p-2 border rounded bg-white text-right"
        value={value}
        readOnly={readOnly}
      />
      {suffix && <span className="ml-2">{suffix}</span>}
    </div>
  </div>
);

export default InfoRow;
