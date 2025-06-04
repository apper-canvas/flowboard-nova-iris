import React from 'react';
      import { motion, AnimatePresence } from 'framer-motion';
      import FormField from '../molecules/FormField';
      import Button from '../atoms/Button';
      import Text from '../atoms/Text';

      const ProjectAddEditTaskModal = ({
        showModal,
        onClose,
        taskData,
        onTaskDataChange,
        onSubmit,
        title,
        submitButtonText
      }) => {
        const priorityOptions = [
          { value: 'low', label: 'Low' },
          { value: 'medium', label: 'Medium' },
          { value: 'high', label: 'High' },
          { value: 'urgent', label: 'Urgent' },
        ];

        return (
          <AnimatePresence>
            {showModal && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
                onClick={onClose}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="glass-morphism rounded-2xl p-6 w-full max-w-md"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Text as="h2" className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    {title}
                  </Text>
                  
                  <form onSubmit={onSubmit} className="space-y-4">
                    <FormField
                      label="Title"
                      value={taskData.title}
                      onChange={(e) => onTaskDataChange('title', e.target.value)}
                      placeholder="Enter task title..."
                      required
                    />

                    <FormField
                      label="Description"
                      as="textarea"
                      value={taskData.description}
                      onChange={(e) => onTaskDataChange('description', e.target.value)}
                      placeholder="Add description..."
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        label="Priority"
                        as="select"
                        value={taskData.priority}
                        onChange={(e) => onTaskDataChange('priority', e.target.value)}
                        options={priorityOptions}
                      />

                      <FormField
                        label="Due Date"
                        type="date"
                        value={taskData.dueDate}
                        onChange={(e) => onTaskDataChange('dueDate', e.target.value)}
                      />
                    </div>

                    <div className="flex items-center justify-end space-x-3 pt-4">
                      <Button
                        type="button"
                        onClick={onClose}
                        variant="ghost"
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        variant="primary"
                      >
                        {submitButtonText}
                      </Button>
                    </div>
                  </form>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        );
      };

      export default ProjectAddEditTaskModal;