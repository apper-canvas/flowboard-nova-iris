import React from 'react';
      import Select from '../atoms/Select';

      const FilterDropdown = ({ value, onChange, options, placeholder = 'Select filter', className = '' }) => {
        return (
          <Select
            value={value}
            onChange={onChange}
            options={options}
            className={className}
          />
        );
      };

      export default FilterDropdown;