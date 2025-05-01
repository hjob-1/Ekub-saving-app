import { FiTrash2, FiX } from 'react-icons/fi';

const DeleteConfirmationDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Delete Item',
  description = 'Are you sure you want to delete this item? This action cannot be undone.',
  confirmText = 'Delete',
  itemName = '',
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-[2px] bg-black/20">
      <div
        className="relative w-full max-w-md p-6 space-y-4 bg-white rounded-xl shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute p-1 rounded-full top-4 right-4 hover:bg-gray-100"
          aria-label="Close"
        >
          <FiX className="w-5 h-5 text-gray-500" />
        </button>

        {/* Icon and Title */}
        <div className="flex items-center gap-3">
          <div className="p-2 text-red-500 bg-red-100 rounded-lg">
            <FiTrash2 className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
        </div>

        {/* Description */}
        <p className="text-gray-600">
          {description}{' '}
          {itemName && (
            <span className="font-medium text-gray-900">"{itemName}"</span>
          )}
        </p>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 transition-colors duration-200 rounded-lg hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-white transition-colors duration-200 bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationDialog;
