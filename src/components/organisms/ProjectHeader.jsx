import React from 'react';
      import Button from '../atoms/Button';
      import Icon from '../atoms/Icon';
      import Text from '../atoms/Text';
      import SearchInput from '../molecules/SearchInput';
      import FilterDropdown from '../molecules/FilterDropdown';

      const ProjectHeader = ({
        project,
        taskCount,
        completedTaskCount,
        searchTerm,
        onSearchChange,
        filterPriority,
        onFilterPriorityChange,
        onAddTask
      }) => {
        const priorityFilterOptions = [
          { value: 'all', label: 'All Priorities' },
          { value: 'urgent', label: 'Urgent' },
          { value: 'high', label: 'High' },
          { value: 'medium', label: 'Medium' },
          { value: 'low', label: 'Low' },
        ];

        return (
          <div className="p-4 lg:p-6 border-b border-gray-200/50 dark:border-gray-700/50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md">
            <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
              <div className="flex items-center space-x-4">
                <div className={`h-12 w-12 rounded-xl flex items-center justify-center`} style={{ backgroundColor: project.color }}>
                  <Icon name={project.icon} className="h-6 w-6 text-white" />
                </div>
                <div>
                  <Text as="h1" className="text-2xl font-bold text-gray-900 dark:text-white">{project.name}</Text>
                  <Text as="p" className="text-gray-600 dark:text-gray-400">
                    {taskCount} tasks • {completedTaskCount} completed
                  </Text>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <SearchInput
                  placeholder="Search tasks..."
                  value={searchTerm}
                  onChange={onSearchChange}
                  className="min-w-0 w-32 md:w-48 bg-white dark:bg-gray-700 rounded-lg px-3 py-2 shadow-sm border border-gray-200 dark:border-gray-600"
                />

                <FilterDropdown
                  value={filterPriority}
                  onChange={onFilterPriorityChange}
                  options={priorityFilterOptions}
                />

                <Button
                  onClick={onAddTask}
                  variant="primary"
                  className="px-4 py-2"
                >
                  <Icon name="Plus" className="h-4 w-4" />
                  <span className="hidden sm:inline">Add Task</span>
                </Button>
              </div>
            </div>
          </div>
        );
      };

      export default ProjectHeader;