// components/Modal.jsx
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center z-50"
    >
      {children}
    </div>
  );
};

export default Modal;
