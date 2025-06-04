import React from 'react';
      import Icon from '../atoms/Icon';
      import Input from '../atoms/Input';

      const SearchInput = ({ value, onChange, placeholder = 'Search...', className = '' }) => {
        return (
          <div className={`flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg px-3 py-2 ${className}`}>
            <Icon name="Search" className="h-4 w-4 text-gray-400 mr-2" />
            <Input
              type="text"
              placeholder={placeholder}
              value={value}
              onChange={onChange}
              className="bg-transparent border-none outline-none text-sm flex-1 text-gray-600 dark:text-gray-300"
            />
          </div>
        );
      };

      export default SearchInput;