import React from 'react';
      import { format, isToday, isTomorrow, isPast } from 'date-fns';
      import ProjectHeader from '../organisms/ProjectHeader';
      import KanbanBoard from '../organisms/KanbanBoard';
      import ProjectAddEditTaskModal from '../organisms/ProjectAddEditTaskModal';
      import Icon from '../atoms/Icon';
      import Text from '../atoms/Text';

      const ProjectBoardTemplate = ({
        project,
        tasks,
        loading,
        searchTerm,
        filterPriority,
        setSearchTerm,
        setFilterPriority,
        showAddModal,
        setShowAddModal,
        newTask,
        setNewTask,
        handleCreateTask,
        handleUpdateTask,
        handleDeleteTask,
        draggedTask,
        setDraggedTask,
        setEditingTask,
        editingTask,
        handleEditSubmit,
        setEditedTaskData
      }) => {
        const columns = [
          { id: 'todo', title: 'To Do', color: 'bg-gray-100', icon: 'Circle' },
          { id: 'in-progress', title: 'In Progress', color: 'bg-blue-100', icon: 'Clock' },
          { id: 'done', title: 'Done', color: 'bg-green-100', icon: 'CheckCircle' }
        ];

        const priorityColors = {
          urgent: 'border-l-red-500 bg-red-50',
          high: 'border-l-orange-500 bg-orange-50',
          medium: 'border-l-blue-500 bg-blue-50',
          low: 'border-l-gray-500 bg-gray-50'
        };

        const priorityBadges = {
          urgent: 'bg-red-100 text-red-800',
          high: 'bg-orange-100 text-orange-800',
          medium: 'bg-blue-100 text-blue-800',
          low: 'bg-gray-100 text-gray-800'
        };

        const formatDueDate = (dateString) => {
          if (!dateString) return null;
          const date = new Date(dateString);
          if (isToday(date)) return 'Today';
          if (isTomorrow(date)) return 'Tomorrow';
          return format(date, 'MMM dd');
        };

        const isOverdue = (dateString) => {
          if (!dateString) return false;
          return isPast(new Date(dateString)) && !isToday(new Date(dateString));
        };

        const filteredTasks = tasks.filter(task => {
          const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase());
          const matchesPriority = filterPriority === 'all' || task.priority === filterPriority;
          return matchesSearch && matchesPriority;
        });

        const handleDragStart = (task) => {
          setDraggedTask(task);
        };

        const handleDragOver = (e) => {
          e.preventDefault();
        };

        const handleDrop = (e, status) => {
          e.preventDefault();
          if (draggedTask && draggedTask.status !== status) {
            handleUpdateTask(draggedTask.id, { status });
          }
          setDraggedTask(null);
        };

        if (loading) {
          return (
            <div className="h-full flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          );
        }

        if (!project) {
          return (
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <Icon name="FolderOpen" className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <Text as="h3" className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
                  No Project Selected
                </Text>
                <Text as="p" className="text-gray-500 dark:text-gray-500">
                  Choose a project from the sidebar to start managing tasks
                </Text>
              </div>
            </div>
          );
        }

        return (
          <div className="h-full flex flex-col bg-gradient-to-br from-slate-50 to-white dark:from-gray-900 dark:to-gray-800">
            <ProjectHeader
              project={project}
              taskCount={filteredTasks.length}
              completedTaskCount={filteredTasks.filter(t => t.status === 'done').length}
              searchTerm={searchTerm}
              onSearchChange={(e) => setSearchTerm(e.target.value)}
              filterPriority={filterPriority}
              onFilterPriorityChange={(e) => setFilterPriority(e.target.value)}
              onAddTask={() => setShowAddModal(true)}
            />

            <KanbanBoard
              tasks={filteredTasks}
              onUpdateTask={handleUpdateTask}
              onDeleteTask={handleDeleteTask}
              setEditingTask={setEditingTask}
              handleDragStart={handleDragStart}
              handleDragOver={handleDragOver}
              handleDrop={handleDrop}
              formatDueDate={formatDueDate}
              isOverdue={isOverdue}
              priorityColors={priorityColors}
              priorityBadges={priorityBadges}
              columns={columns}
            />

            <ProjectAddEditTaskModal
              showModal={showAddModal}
              onClose={() => setShowAddModal(false)}
              taskData={newTask}
              onTaskDataChange={(field, value) => setNewTask(prev => ({ ...prev, [field]: value }))}
              onSubmit={handleCreateTask}
              title="Create New Task"
              submitButtonText="Create Task"
            />

            {editingTask && (
              <ProjectAddEditTaskModal
                showModal={!!editingTask}
                onClose={() => setEditingTask(null)}
                taskData={editingTask}
                onTaskDataChange={(field, value) => setEditedTaskData(prev => ({ ...prev, [field]: value }))}
                onSubmit={handleEditSubmit}
                title="Edit Task"
                submitButtonText="Save Changes"
              />
            )}
          </div>
        );
      };

      export default ProjectBoardTemplate;