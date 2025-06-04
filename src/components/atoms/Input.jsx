import React from 'react';

      const Input = ({ type = 'text', value, onChange, placeholder, className = '', ...props }) => {
        return (
          <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${className}`}
            {...props}
          />
        );
      };

      export default Input;