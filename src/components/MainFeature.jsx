import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import { format, isToday, isTomorrow, isPast } from 'date-fns'
import ApperIcon from './ApperIcon'
import * as taskService from '../services/api/taskService'

function MainFeature({ project }) {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingTask, setEditingTask] = useState(null)
  const [draggedTask, setDraggedTask] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterPriority, setFilterPriority] = useState('all')

  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: '',
    tags: [],
    status: 'todo'
  })

  const columns = [
    { id: 'todo', title: 'To Do', color: 'bg-gray-100', icon: 'Circle' },
    { id: 'in-progress', title: 'In Progress', color: 'bg-blue-100', icon: 'Clock' },
    { id: 'done', title: 'Done', color: 'bg-green-100', icon: 'CheckCircle' }
  ]

  const priorityColors = {
    urgent: 'border-l-red-500 bg-red-50',
    high: 'border-l-orange-500 bg-orange-50',
    medium: 'border-l-blue-500 bg-blue-50',
    low: 'border-l-gray-500 bg-gray-50'
  }

  const priorityBadges = {
    urgent: 'bg-red-100 text-red-800',
    high: 'bg-orange-100 text-orange-800',
    medium: 'bg-blue-100 text-blue-800',
    low: 'bg-gray-100 text-gray-800'
  }

  useEffect(() => {
    if (project) {
      loadTasks()
    }
  }, [project])

  const loadTasks = async () => {
    setLoading(true)
    try {
      const result = await taskService.getAll()
      const projectTasks = result?.filter(task => task.projectId === project.id) || []
      setTasks(projectTasks)
    } catch (err) {
      setError(err.message)
      toast.error("Failed to load tasks")
    } finally {
      setLoading(false)
    }
  }

  const handleCreateTask = async (e) => {
    e.preventDefault()
    if (!newTask.title.trim()) return

    try {
      const taskData = {
        ...newTask,
        projectId: project.id,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
      
      const createdTask = await taskService.create(taskData)
      setTasks(prev => [...prev, createdTask])
      setNewTask({
        title: '',
        description: '',
        priority: 'medium',
        dueDate: '',
        tags: [],
        status: 'todo'
      })
      setShowAddModal(false)
      toast.success("Task created successfully!")
    } catch (err) {
      toast.error("Failed to create task")
    }
  }

  const handleUpdateTask = async (taskId, updates) => {
    try {
      const updatedTask = await taskService.update(taskId, {
        ...updates,
        updatedAt: new Date().toISOString()
      })
      setTasks(prev => prev.map(task => 
        task.id === taskId ? updatedTask : task
      ))
      
      if (updates.status === 'done') {
        toast.success("Task completed! 🎉")
      }
    } catch (err) {
      toast.error("Failed to update task")
    }
  }

  const handleDeleteTask = async (taskId) => {
    try {
      await taskService.delete(taskId)
      setTasks(prev => prev.filter(task => task.id !== taskId))
      toast.success("Task deleted")
    } catch (err) {
      toast.error("Failed to delete task")
    }
  }

  const handleDragStart = (task) => {
    setDraggedTask(task)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleDrop = (e, status) => {
    e.preventDefault()
    if (draggedTask && draggedTask.status !== status) {
      handleUpdateTask(draggedTask.id, { status })
    }
    setDraggedTask(null)
  }

  const formatDueDate = (dateString) => {
    if (!dateString) return null
    const date = new Date(dateString)
    if (isToday(date)) return 'Today'
    if (isTomorrow(date)) return 'Tomorrow'
    return format(date, 'MMM dd')
  }

  const isOverdue = (dateString) => {
    if (!dateString) return false
    return isPast(new Date(dateString)) && !isToday(new Date(dateString))
  }

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesPriority = filterPriority === 'all' || task.priority === filterPriority
    return matchesSearch && matchesPriority
  })

  const getColumnTasks = (status) => {
    return filteredTasks.filter(task => task.status === status)
  }

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-slate-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Project Header */}
      <div className="p-4 lg:p-6 border-b border-gray-200/50 dark:border-gray-700/50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <div className={`h-12 w-12 rounded-xl flex items-center justify-center`} style={{ backgroundColor: project.color }}>
              <ApperIcon name={project.icon} className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{project.name}</h1>
              <p className="text-gray-600 dark:text-gray-400">
                {filteredTasks.length} tasks • {filteredTasks.filter(t => t.status === 'done').length} completed
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="flex items-center bg-white dark:bg-gray-700 rounded-lg px-3 py-2 shadow-sm border border-gray-200 dark:border-gray-600">
              <ApperIcon name="Search" className="h-4 w-4 text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-transparent border-none outline-none text-sm flex-1 text-gray-600 dark:text-gray-300 min-w-0 w-32 md:w-48"
              />
            </div>

            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 text-sm text-gray-600 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">All Priorities</option>
              <option value="urgent">Urgent</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAddModal(true)}
              className="bg-gradient-to-r from-primary to-secondary text-white px-4 py-2 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
            >
              <ApperIcon name="Plus" className="h-4 w-4" />
              <span className="hidden sm:inline">Add Task</span>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Kanban Board */}
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
                  <h2 className="font-semibold text-gray-900 dark:text-white">{column.title}</h2>
                  <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-1 rounded-full text-xs font-medium">
                    {getColumnTasks(column.id).length}
                  </span>
                </div>
                <ApperIcon name={column.icon} className="h-5 w-5 text-gray-400" />
              </div>

              <div className="flex-1 space-y-3 overflow-y-auto scrollbar-hide">
                <AnimatePresence>
                  {getColumnTasks(column.id).map((task) => (
                    <motion.div
                      key={task.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      whileHover={{ scale: 1.02 }}
                      draggable
                      onDragStart={() => handleDragStart(task)}
                      className={`p-4 rounded-xl border-l-4 shadow-sm hover:shadow-md transition-all duration-200 cursor-move ${
                        priorityColors[task.priority]
                      } ${
                        isOverdue(task.dueDate) && task.status !== 'done' ? 'overdue-pulse' : ''
                      } ${
                        task.status === 'done' ? 'opacity-75' : ''
                      } bg-white dark:bg-gray-700`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h3 className={`font-medium text-gray-900 dark:text-white text-sm leading-tight ${
                          task.status === 'done' ? 'line-through' : ''
                        }`}>
                          {task.title}
                        </h3>
                        <div className="flex items-center space-x-1 ml-2">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setEditingTask(task)}
                            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-600 rounded"
                          >
                            <ApperIcon name="Edit2" className="h-3 w-3 text-gray-400" />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleDeleteTask(task.id)}
                            className="p-1 hover:bg-red-100 dark:hover:bg-red-900 rounded"
                          >
                            <ApperIcon name="Trash2" className="h-3 w-3 text-red-400" />
                          </motion.button>
                        </div>
                      </div>

                      {task.description && (
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                          {task.description}
                        </p>
                      )}

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityBadges[task.priority]}`}>
                            {task.priority}
                          </span>
                          {task.dueDate && (
                            <div className={`flex items-center space-x-1 text-xs ${
                              isOverdue(task.dueDate) && task.status !== 'done' ? 'text-red-600' : 'text-gray-500'
                            }`}>
                              <ApperIcon name="Calendar" className="h-3 w-3" />
                              <span>{formatDueDate(task.dueDate)}</span>
                            </div>
                          )}
                        </div>

                        {task.status !== 'done' && (
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleUpdateTask(task.id, { status: 'done' })}
                            className="p-1 hover:bg-green-100 dark:hover:bg-green-900 rounded"
                          >
                            <ApperIcon name="Check" className="h-4 w-4 text-green-600" />
                          </motion.button>
                        )}
                      </div>

                      {task.tags && task.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {task.tags.slice(0, 3).map((tag, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded text-xs"
                            >
                              {tag}
                            </span>
                          ))}
                          {task.tags.length > 3 && (
                            <span className="px-2 py-1 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-400 rounded text-xs">
                              +{task.tags.length - 3}
                            </span>
                          )}
                        </div>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>

                {getColumnTasks(column.id).length === 0 && (
                  <div className="flex-1 flex items-center justify-center py-8">
                    <div className="text-center">
                      <ApperIcon name="Package" className="h-12 w-12 text-gray-300 mx-auto mb-2" />
                      <p className="text-sm text-gray-500 dark:text-gray-400">No tasks yet</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Task Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={() => setShowAddModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-morphism rounded-2xl p-6 w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Create New Task</h2>
              
              <form onSubmit={handleCreateTask} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Title *
                  </label>
                  <input
                    type="text"
                    value={newTask.title}
                    onChange={(e) => setNewTask(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Enter task title..."
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Description
                  </label>
                  <textarea
                    value={newTask.description}
                    onChange={(e) => setNewTask(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Add description..."
                    rows="3"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Priority
                    </label>
                    <select
                      value={newTask.priority}
                      onChange={(e) => setNewTask(prev => ({ ...prev, priority: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Due Date
                    </label>
                    <input
                      type="date"
                      value={newTask.dueDate}
                      onChange={(e) => setNewTask(prev => ({ ...prev, dueDate: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="bg-gradient-to-r from-primary to-secondary text-white px-6 py-2 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Create Task
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default MainFeature