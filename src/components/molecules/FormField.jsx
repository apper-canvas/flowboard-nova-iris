import React from 'react';
      import Label from '../atoms/Label';
      import Input from '../atoms/Input';
      import Select from '../atoms/Select';

      const FormField = ({ label, type = 'text', value, onChange, placeholder, required, options, className = '', as = 'input' }) => {
        return (
          <div className={className}>
            <Label>
              {label} {required && '*'}
            </Label>
            {as === 'input' && (
              <Input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
              />
            )}
            {as === 'textarea' && (
              <textarea
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            )}
            {as === 'select' && (
              <Select
                value={value}
                onChange={onChange}
                options={options}
              />
            )}
          </div>
        );
      };

      export default FormField;