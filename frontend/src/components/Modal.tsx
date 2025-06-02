// 📁 src/components/Modal.tsx
import React, { ReactNode, useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
  // ESC 키로도 모달 닫기
  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) { //모달열린 상태에서 스크롤 쓸 때, 뒤에 깔린 페이지 스크롤 되는 거 막아줌ㅇㅇ
      document.body.style.overflow = 'hidden'; 
      document.addEventListener('keydown', handleKeydown);
    }
    return () => {
      document.body.style.overflow = ''; //모달 닫히면 기본값으로 다시 복귀
      document.removeEventListener('keydown', handleKeydown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-lg w-11/12 max-w-3xl mx-auto p-6 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">{title}</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
              aria-label="Close Modal"
            >
              ✕
            </button>
          </div>
        )}
        <div className="overflow-auto max-h-[75vh]">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
