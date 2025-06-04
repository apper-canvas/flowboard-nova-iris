import React from 'react';
      import { AnimatePresence } from 'framer-motion';
      import Icon from '../atoms/Icon';
      import Text from '../atoms/Text';
      import Card from '../molecules/Card';

      const KanbanBoard = ({
        tasks,
        onUpdateTask,
        onDeleteTask,
        setEditingTask,
        handleDragStart,
        handleDragOver,
        handleDrop,
        formatDueDate,
        isOverdue,
        priorityColors,
        priorityBadges,
        columns
      }) => {
        const getColumnTasks = (status) => {
          return tasks.filter(task => task.status === status);
        };

        return (
          <div className="flex-1 p-4 lg:p-6 overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
              {columns.map((column) => (
                <div
                  key={column.id}
                  className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-4 border border-gray-200/50 dark:border-gray-700/50 flex flex-col"
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, column.id)}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`h-3 w-3 rounded-full ${column.color.replace('bg-', 'bg-').replace('-100', '-500')}`}></div>
                      <Text as="h2" className="font-semibold text-gray-900 dark:text-white">{column.title}</Text>
                      <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-1 rounded-full text-xs font-medium">
                        {getColumnTasks(column.id).length}
                      </span>
                    </div>
                    <Icon name={column.icon} className="h-5 w-5 text-gray-400" />
                  </div>

                  <div className="flex-1 space-y-3 overflow-y-auto scrollbar-hide">
                    <AnimatePresence>
                      {getColumnTasks(column.id).map((task) => (
                        <Card
                          key={task.id}
                          {...task}
                          onEdit={() => setEditingTask(task)}
                          onDelete={onDeleteTask}
                          onComplete={(id) => onUpdateTask(id, { status: 'done' })}
                          isOverdue={isOverdue(task.dueDate)}
                          priorityColors={priorityColors}
                          priorityBadges={priorityBadges}
                          formatDueDate={formatDueDate}
                          draggable
                          onDragStart={() => handleDragStart(task)}
                        />
                      ))}
                    </AnimatePresence>

                    {getColumnTasks(column.id).length === 0 && (
                      <div className="flex-1 flex items-center justify-center py-8">
                        <div className="text-center">
                          <Icon name="Package" className="h-12 w-12 text-gray-300 mx-auto mb-2" />
                          <Text as="p" className="text-sm text-gray-500 dark:text-gray-400">No tasks yet</Text>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      };

      export default KanbanBoard;