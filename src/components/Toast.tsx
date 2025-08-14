import React from 'react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  onClose: () => void;
}

const toastColors = {
  success: 'bg-green-500',
  error: 'bg-red-500',
  info: 'bg-blue-500',
};

const Toast: React.FC<ToastProps> = ({ message, type = 'info', onClose }) => (
  <div className={`fixed bottom-6 right-6 z-50 px-6 py-4 rounded-lg shadow-lg text-white flex items-center space-x-4 ${toastColors[type]}`}> 
    <span>{message}</span>
    <button onClick={onClose} className="ml-4 text-white font-bold">×</button>
  </div>
);

export default Toast;
