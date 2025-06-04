import React from 'react';
      import { motion } from 'framer-motion';
      import Icon from '../atoms/Icon';
      import Button from '../atoms/Button';
      import Badge from '../atoms/Badge';
      import Text from '../atoms/Text';

      const Card = ({
        id,
        title,
        description,
        priority,
        dueDate,
        status,
        tags,
        onEdit,
        onDelete,
        onComplete,
        isOverdue,
        priorityColors,
        priorityBadges,
        formatDueDate,
        draggable,
        onDragStart,
        className = ''
      }) => {
        return (
          <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            whileHover={{ scale: 1.02 }}
            draggable={draggable}
            onDragStart={onDragStart}
            className={`p-4 rounded-xl border-l-4 shadow-sm hover:shadow-md transition-all duration-200 cursor-move 
            ${priorityColors[priority]} 
            ${isOverdue && status !== 'done' ? 'overdue-pulse' : ''} 
            ${status === 'done' ? 'opacity-75' : ''} 
            bg-white dark:bg-gray-700 ${className}`}
          >
            <div className="flex items-start justify-between mb-2">
              <Text as="h3" className={`font-medium text-gray-900 dark:text-white text-sm leading-tight ${status === 'done' ? 'line-through' : ''}`}>
                {title}
              </Text>
              <div className="flex items-center space-x-1 ml-2">
                <Button variant="icon" onClick={() => onEdit(id)} className="p-1">
                  <Icon name="Edit2" className="h-3 w-3 text-gray-400" />
                </Button>
                <Button variant="danger-icon" onClick={() => onDelete(id)} className="p-1">
                  <Icon name="Trash2" className="h-3 w-3 text-red-400" />
                </Button>
              </div>
            </div>

            {description && (
              <Text as="p" className="text-xs text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                {description}
              </Text>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Badge className={priorityBadges[priority]}>
                  {priority}
                </Badge>
                {dueDate && (
                  <div className={`flex items-center space-x-1 text-xs ${isOverdue && status !== 'done' ? 'text-red-600' : 'text-gray-500'}`}>
                    <Icon name="Calendar" className="h-3 w-3" />
                    <Text>{formatDueDate(dueDate)}</Text>
                  </div>
                )}
              </div>

              {status !== 'done' && (
                <Button variant="success-icon" onClick={() => onComplete(id)}>
                  <Icon name="Check" className="h-4 w-4 text-green-600" />
                </Button>
              )}
            </div>

            {tags && tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {tags.slice(0, 3).map((tag, index) => (
                  <Badge key={index} className="bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300">
                    {tag}
                  </Badge>
                ))}
                {tags.length > 3 && (
                  <Badge className="bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-400">
                    +{tags.length - 3}
                  </Badge>
                )}
              </div>
            )}
          </motion.div>
        );
      };

      export default Card;