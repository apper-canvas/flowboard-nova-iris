import React from 'react';
      import { motion } from 'framer-motion';
      import Icon from '../atoms/Icon';
      import Button from '../atoms/Button';
      import Text from '../atoms/Text';
      import Badge from '../atoms/Badge';

      const SidebarItem = ({
        name,
        icon,
        count,
        onClick,
        isActive,
        color, // For project specific items
        className = ''
      }) => {
        return (
          <Button
            onClick={onClick}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            variant="sidebar-item"
            className={`w-full flex items-center space-x-3 ${className} ${
              isActive
                ? 'bg-primary/10 text-primary border border-primary/20'
                : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            {color && <div className={`h-3 w-3 rounded-full`} style={{ backgroundColor: color }}></div>}
            <Icon name={icon} className="h-4 w-4" />
            <Text as="span" className="text-sm font-medium flex-1">{name}</Text>
            {count !== undefined && (
              <Badge className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400">
                {count}
              </Badge>
            )}
          </Button>
        );
      };

      export default SidebarItem;