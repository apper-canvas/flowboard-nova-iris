import React from 'react';

      const Select = ({ value, onChange, options, className = '', ...props }) => {
        return (
          <select
            value={value}
            onChange={onChange}
            className={`bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 text-sm text-gray-600 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary ${className}`}
            {...props}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      };

      export default Select;