import React from 'react';
      import Icon from '../atoms/Icon';
      import Text from '../atoms/Text';

      const Logo = ({ className = '' }) => {
        return (
          <div className={`flex items-center space-x-3 ${className}`}>
            <div className="h-8 w-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <Icon name="Kanban" className="h-5 w-5 text-white" />
            </div>
            <Text as="h1" className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              FlowBoard
            </Text>
          </div>
        );
      };

      export default Logo;