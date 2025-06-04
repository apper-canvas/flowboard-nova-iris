import React from 'react';
      import { motion } from 'framer-motion';

      const Button = ({ children, onClick, className = '', variant = 'default', ...props }) => {
        const baseClasses = "rounded-lg font-medium transition-all duration-300 flex items-center justify-center";
        let variantClasses = "";

        switch (variant) {
          case 'primary':
            variantClasses = "bg-gradient-to-r from-primary to-secondary text-white shadow-lg hover:shadow-xl";
            break;
          case 'secondary':
            variantClasses = "bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 shadow-sm hover:shadow-md";
            break;
          case 'ghost':
            variantClasses = "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-600";
            break;
          case 'icon':
            variantClasses = "p-2 hover:bg-gray-100 dark:hover:bg-gray-700";
            break;
          case 'danger-icon':
            variantClasses = "p-1 hover:bg-red-100 dark:hover:bg-red-900";
            break;
          case 'success-icon':
            variantClasses = "p-1 hover:bg-green-100 dark:hover:bg-green-900";
            break;
          case 'sidebar-item':
            variantClasses = "text-left transition-all px-3 py-2"; // Handled by molecule
            break;
          default:
            variantClasses = "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600";
        }

        return (
          <motion.button
            whileHover={{ scale: (variant === 'icon' || variant === 'danger-icon' || variant === 'success-icon' || variant === 'sidebar-item') ? 1.1 : 1.05 }}
            whileTap={{ scale: (variant === 'icon' || variant === 'danger-icon' || variant === 'success-icon' || variant === 'sidebar-item') ? 0.9 : 0.95 }}
            onClick={onClick}
            className={`${baseClasses} ${variantClasses} ${className}`}
            {...props}
          >
            {children}
          </motion.button>
        );
      };

      export default Button;