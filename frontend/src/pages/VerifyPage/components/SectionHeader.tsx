// src/pages/VerifyPage/components/SectionHeader.tsx
import React from 'react';

interface Props {
  title: string;
}
// 이 컴포넌트에는 반드시 (문자열 형식의) title  을 전달해야함

/**
 화면의 각 섹션(예: 기초 지수, 최대손실 성립 조건 %) 제목 + 녹색 밑줄을 그리는 컴포넌트
 */
const SectionHeader: React.FC<Props> = ({ title }) => (
  <div className='w-full min-w-64 mb-4 flex flex-col'>
    <h2 className='text-[18px] font-bold px-1 py-2'>{title}</h2>

    <div className='h-[2px] bg-mainGreen mt-1' />
  </div>
);

export default SectionHeader;
