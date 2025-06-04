import React from 'react';
      import Button from '../atoms/Button';
      import Icon from '../atoms/Icon';
      import Logo from '../molecules/Logo';
      import SearchInput from '../molecules/SearchInput';
      import UserAvatar from '../molecules/UserAvatar';

      const Header = ({ onMenuToggle, onThemeToggle, isDarkMode }) => {
        return (
          <header className="h-16 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-700/50 sticky top-0 z-50">
            <div className="h-full px-4 lg:px-6 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button
                  onClick={onMenuToggle}
                  variant="icon"
                  className="lg:hidden"
                >
                  <Icon name="Menu" className="h-5 w-5" />
                </Button>
                <Logo />
              </div>

              <div className="flex items-center space-x-3">
                <div className="hidden md:block">
                  <SearchInput placeholder="Search tasks..." className="min-w-64" />
                </div>
                
                <Button
                  onClick={onThemeToggle}
                  variant="icon"
                >
                  <Icon name={isDarkMode ? "Sun" : "Moon"} className="h-5 w-5" />
                </Button>
                <UserAvatar initial="U" />
              </div>
            </div>
          </header>
        );
      };

      export default Header;