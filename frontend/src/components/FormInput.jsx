// components/FormInput.js
import React from 'react';
import { FaExclamationCircle } from 'react-icons/fa';

const FormInput = ({
  id,
  label,
  type = 'text',
  name,
  placeholder,
  value,
  icon,
  onChange,
  onBlur,
  error,
  touched,
}) => {
  return (
    <div className="relative">
      {label && <label htmlFor={id}>{label}</label>}
      {icon && (
        <div className="absolute left-3 top-10 text-gray-400">{icon}</div>
      )}
      <input
        className={`mt-1 block w-full rounded-md border ${
          error && touched
            ? 'border-red-500 focus:border-red-500'
            : 'border-gray-300 focus:border-indigo-600'
        } focus:outline-none p-2 ${icon ? 'pl-10' : 'pl-3'}`}
        id={id}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      {error && touched && (
        <div className="flex items-center mt-1 text-red-500 text-xs">
          <FaExclamationCircle className="mr-1" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

export default FormInput;
