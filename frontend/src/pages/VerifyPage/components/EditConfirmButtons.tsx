import React from "react";
import {Edit, FileCheck} from 'lucide-react'; 

 interface Props {
   onEdit: () => void;
   onConfirm: () => void;
   confirmDisabled: boolean; // ‘확인’ 버튼의 활성/비활성 여부
   className?: string;
 }

 const EditConfirmButtons: React.FC<Props> = ({
   onEdit,
   onConfirm,
   confirmDisabled,
 }) => (
   <div className="fixed bottom-[17rem] right-[14rem] flex flex-col gap-4">
     <button
       onClick={onEdit}
       className="w-12 h-12 rounded-full bg-mainGreen text-white flex items-center justify-center"
     >
       <Edit />    {/* 수정 아이콘 */}
     </button>
     <button
        onClick={onConfirm}
        disabled={confirmDisabled}
        className="w-12 h-12 rounded-full bg-mainGreen text-white flex items-center justify-center disabled:opacity-50"
     >
       <FileCheck />  {/* 확인 아이콘 */}
     </button>
   </div>
 );
 export default EditConfirmButtons;
