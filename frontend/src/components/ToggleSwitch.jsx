const ToggleSwitch = ({ onToggle, disabled = false, active = false }) => {
  return (
    <button
      disabled={disabled}
      onClick={onToggle}
      className={`relative w-10 h-5 rounded-full transition-colors duration-300 focus:outline-none ${
        active || disabled ? 'bg-indigo-600' : 'bg-gray-200'
      }`}
    >
      <span
        className={`absolute left-0 top-0 w-5 h-5 bg-white rounded-full shadow transform transition-transform duration-300 ${
          active || disabled ? 'translate-x-5' : 'translate-x-0'
        }`}
      ></span>
    </button>
  );
};

export default ToggleSwitch;
