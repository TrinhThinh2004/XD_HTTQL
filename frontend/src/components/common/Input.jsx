import React from 'react';

const Input = ({ 
  label, 
  error, 
  icon, 
  className = '', 
  wrapperClassName = '', 
  ...props 
}) => {
  return (
    <div className={`flex flex-col space-y-1 ${wrapperClassName}`}>
      {label && (
        <label className="text-sm font-semibold text-textPrimary">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-textSecondary">
            {icon}
          </div>
        )}
        <input
          className={`
            w-full rounded-lg border border-border bg-white py-2 transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary
            disabled:bg-gray-50 disabled:cursor-not-allowed
            ${icon ? 'pl-10 pr-4' : 'px-4'}
            ${error ? 'border-red-500 focus:ring-red-500/30 focus:border-red-500' : ''}
            ${className}
          `}
          {...props}
        />
      </div>
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
};

export default Input;
