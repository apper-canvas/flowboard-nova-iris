import React from 'react';
      import Text from '../atoms/Text';

      const UserAvatar = ({ initial, className = '' }) => {
        return (
          <div className={`h-8 w-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center ${className}`}>
            <Text as="span" className="text-white text-sm font-medium">{initial}</Text>
          </div>
        );
      };

      export default UserAvatar;