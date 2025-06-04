import React from 'react';
      import { motion, AnimatePresence } from 'framer-motion';
      import Text from '../atoms/Text';
      import SidebarItem from '../molecules/SidebarItem';

      const Sidebar = ({ projects, selectedProjectId, onProjectSelect, sidebarOpen, onClose }) => {
        const quickFilters = [
          { name: 'My Tasks', icon: 'User', count: 8 },
          { name: 'Due Today', icon: 'Calendar', count: 3 },
          { name: 'High Priority', icon: 'AlertCircle', count: 5 },
          { name: 'Completed', icon: 'CheckCircle', count: 12 }
        ];

        return (
          <AnimatePresence>
            {(sidebarOpen || window.innerWidth >= 1024) && (
              <motion.aside
                initial={{ x: -240, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -240, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="fixed lg:static inset-y-16 left-0 z-40 w-60 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-r border-gray-200/50 dark:border-gray-700/50 lg:border-0"
              >
                <div className="p-4 space-y-6">
                  <div>
                    <Text as="h2" className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                      Projects
                    </Text>
                    <div className="space-y-1">
                      {projects?.map((project) => (
                        <SidebarItem
                          key={project.id}
                          name={project.name}
                          icon={project.icon}
                          count={project.taskCount}
                          color={project.color}
                          onClick={() => onProjectSelect(project)}
                          isActive={selectedProjectId === project.id}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <Text as="h2" className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                      Quick Filters
                    </Text>
                    <div className="space-y-1">
                      {quickFilters.map((filter) => (
                        <SidebarItem
                          key={filter.name}
                          name={filter.name}
                          icon={filter.icon}
                          count={filter.count}
                          onClick={() => { /* Handle filter click */ }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.aside>
            )}
            {sidebarOpen && (
              <div
                className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 lg:hidden"
                onClick={onClose}
              />
            )}
          </AnimatePresence>
        );
      };

      export default Sidebar;