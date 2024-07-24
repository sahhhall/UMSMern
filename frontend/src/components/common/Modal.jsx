import React from "react";
import Button from "./Button";

const Modal = ({ onClose, onConfirm, isLoading }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-black bg-opacity-50 absolute inset-0" onClick={onClose}></div>
      <div className="w-[310px] bg-white p-6 rounded-lg relative z-10 flex flex-col items-end">
        <h2 className="mb-4 tracking-wide font-semibold">Are you sure you want to delete this user?</h2>
        <div className="flex space-x-2">
          <Button 
            text="Yes" 
            bgColor="bg-red-700" 
            textColor="text-white" 
            onClick={onConfirm} 
            disabled={isLoading}
          />
          <Button 
            text="No" 
            bgColor="bg-gray-700" 
            textColor="text-white" 
            onClick={onClose} 
          />
        </div>
      </div>
    </div>
  );
};

export default Modal;
