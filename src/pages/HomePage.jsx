import { useState, useEffect } from 'react';
      import { toast } from 'react-toastify';
      import HomeTemplate from '../components/templates/HomeTemplate';
      import ProjectBoardTemplate from '../components/templates/ProjectBoardTemplate';
      import * as projectService from '../services/api/projectService';
      import * as taskService from '../services/api/taskService';
      import { format, isToday, isTomorrow, isPast } from 'date-fns';

      function HomePage() {
        const [projects, setProjects] = useState([]);
        const [loading, setLoading] = useState(false);
        const [error, setError] = useState(null);
        const [selectedProject, setSelectedProject] = useState(null);
        const [sidebarOpen, setSidebarOpen] = useState(false);
        const [darkMode, setDarkMode] = useState(false);

        // Project tasks state
        const [tasks, setTasks] = useState([]);
        const [taskLoading, setTaskLoading] = useState(false);
        const [showAddModal, setShowAddModal] = useState(false);
        const [editingTask, setEditingTask] = useState(null);
        const [editedTaskData, setEditedTaskData] = useState(null);
        const [draggedTask, setDraggedTask] = useState(null);
        const [searchTerm, setSearchTerm] = useState('');
        const [filterPriority, setFilterPriority] = useState('all');

        const [newTask, setNewTask] = useState({
          title: '',
          description: '',
          priority: 'medium',
          dueDate: '',
          tags: [],
          status: 'todo'
        });

        useEffect(() => {
          const loadProjects = async () => {
            setLoading(true);
            try {
              const result = await projectService.getAll();
              setProjects(result || []);
              if (result?.length > 0) {
                setSelectedProject(result[0]);
              }
            } catch (err) {
              setError(err.message);
              toast.error("Failed to load projects");
            } finally {
              setLoading(false);
            }
          };
          loadProjects();
        }, []);

        useEffect(() => {
          if (selectedProject) {
            loadTasks(selectedProject.id);
          } else {
            setTasks([]);
          }
        }, [selectedProject]);

        const loadTasks = async (projectId) => {
          setTaskLoading(true);
          try {
            const result = await taskService.getAll();
            const projectTasks = result?.filter(task => task.projectId === projectId) || [];
            setTasks(projectTasks);
          } catch (err) {
            toast.error("Failed to load tasks");
          } finally {
            setTaskLoading(false);
          }
        };

        const toggleDarkMode = () => {
          setDarkMode(!darkMode);
          document.documentElement.classList.toggle('dark');
        };

        const handleProjectSelect = (project) => {
          setSelectedProject(project);
          setSidebarOpen(false);
          // Reset task filters when project changes
          setSearchTerm('');
          setFilterPriority('all');
        };

        const handleCreateTask = async (e) => {
          e.preventDefault();
          if (!newTask.title.trim() || !selectedProject) return;

          try {
            const taskData = {
              ...newTask,
              projectId: selectedProject.id,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString()
            };
            
            const createdTask = await taskService.create(taskData);
            setTasks(prev => [...prev, createdTask]);
            setNewTask({
              title: '',
              description: '',
              priority: 'medium',
              dueDate: '',
              tags: [],
              status: 'todo'
            });
            setShowAddModal(false);
            toast.success("Task created successfully!");
          } catch (err) {
            toast.error("Failed to create task");
          }
        };

        const handleUpdateTask = async (taskId, updates) => {
          try {
            const updatedTask = await taskService.update(taskId, {
              ...updates,
              updatedAt: new Date().toISOString()
            });
            setTasks(prev => prev.map(task => 
              task.id === taskId ? updatedTask : task
            ));
            
            if (updates.status === 'done') {
              toast.success("Task completed! 🎉");
            }
          } catch (err) {
            toast.error("Failed to update task");
          }
        };

        const handleDeleteTask = async (taskId) => {
          try {
            await taskService.delete(taskId);
            setTasks(prev => prev.filter(task => task.id !== taskId));
            toast.success("Task deleted");
          } catch (err) {
            toast.error("Failed to delete task");
          }
        };

        const handleEditSubmit = async (e) => {
          e.preventDefault();
          if (!editingTask || !editedTaskData) return;

          try {
            await handleUpdateTask(editingTask.id, editedTaskData);
            setEditingTask(null);
            setEditedTaskData(null);
            toast.success("Task updated successfully!");
          } catch (err) {
            toast.error("Failed to update task");
          }
        };

        useEffect(() => {
          if (editingTask) {
            setEditedTaskData(editingTask);
          } else {
            setEditedTaskData(null);
          }
        }, [editingTask]);

        return (
          <HomeTemplate
            projects={projects}
            selectedProject={selectedProject}
            onProjectSelect={handleProjectSelect}
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            darkMode={darkMode}
            toggleDarkMode={toggleDarkMode}
            loading={loading}
            error={error}
          >
            <ProjectBoardTemplate
              project={selectedProject}
              tasks={tasks}
              loading={taskLoading}
              searchTerm={searchTerm}
              filterPriority={filterPriority}
              setSearchTerm={setSearchTerm}
              setFilterPriority={setFilterPriority}
              showAddModal={showAddModal}
              setShowAddModal={setShowAddModal}
              newTask={newTask}
              setNewTask={setNewTask}
              handleCreateTask={handleCreateTask}
              handleUpdateTask={handleUpdateTask}
              handleDeleteTask={handleDeleteTask}
              draggedTask={draggedTask}
              setDraggedTask={setDraggedTask}
              setEditingTask={setEditingTask}
              editingTask={editingTask}
              handleEditSubmit={handleEditSubmit}
              setEditedTaskData={setEditedTaskData}
            />
          </HomeTemplate>
        );
      }

      export default HomePage;