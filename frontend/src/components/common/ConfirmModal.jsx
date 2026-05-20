import React from 'react';
import Modal from './Modal';
import Button from './Button';

const ConfirmModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = 'Xác nhận xóa', 
  message = 'Bạn có chắc chắn muốn xóa mục này? Hành động này không thể hoàn tác.',
  confirmText = 'Xóa',
  cancelText = 'Hủy',
  variant = 'danger'
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="sm"
      footer={
        <div className="flex justify-end space-x-3 w-full">
          <Button 
            variant="ghost" 
            onClick={onClose}
            className="flex-1 sm:flex-none justify-center border border-gray-200 hover:bg-gray-50 text-gray-700"
          >
            {cancelText}
          </Button>
          <Button 
            variant={variant === 'danger' ? 'danger' : 'gradient'} 
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="flex-1 sm:flex-none justify-center bg-rose-600 hover:bg-rose-700 shadow-lg shadow-rose-200"
          >
            {confirmText}
          </Button>
        </div>
      }
    >
      <div className="flex flex-col items-center text-center py-4">
        {variant === 'danger' && (
          <div className="w-20 h-20 rounded-full bg-rose-100 flex items-center justify-center mb-6 animate-pulse">
            <div className="w-16 h-16 rounded-full bg-rose-200 flex items-center justify-center">
              <svg className="w-10 h-10 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>
          </div>
        )}
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-textSecondary leading-relaxed px-4">
          {message}
        </p>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
