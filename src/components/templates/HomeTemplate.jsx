import React from 'react';
      import Header from '../organisms/Header';
      import Sidebar from '../organisms/Sidebar';

      const HomeTemplate = ({
        children,
        projects,
        selectedProject,
        onProjectSelect,
        sidebarOpen,
        setSidebarOpen,
        darkMode,
        toggleDarkMode,
        loading,
        error
      }) => {
        if (loading) {
          return (
            <div className="min-h-screen flex items-center justify-center">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
            </div>
          );
        }

        if (error) {
          return (
            <div className="min-h-screen flex items-center justify-center">
              <div className="text-center">
                <img src="/path/to/AlertTriangle.svg" alt="Error" className="h-12 w-12 text-red-500 mx-auto mb-4" /> {/* Replace with actual icon if ApperIcon is available */}
                <p className="text-gray-600">Failed to load application</p>
              </div>
            </div>
          );
        }

        return (
          <div className={`min-h-screen ${darkMode ? 'dark' : ''} bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900`}>
            <Header
              onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
              onThemeToggle={toggleDarkMode}
              isDarkMode={darkMode}
            />

            <div className="flex h-[calc(100vh-4rem)]">
              <Sidebar
                projects={projects}
                selectedProjectId={selectedProject?.id}
                onProjectSelect={onProjectSelect}
                sidebarOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
              />

              <main className="flex-1 overflow-hidden">
                {children}
              </main>
            </div>
          </div>
        );
      };

      export default HomeTemplate;