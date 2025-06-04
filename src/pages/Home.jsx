import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import MainFeature from '../components/MainFeature'
import ApperIcon from '../components/ApperIcon'
import * as projectService from '../services/api/projectService'

function Home() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [selectedProject, setSelectedProject] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const loadProjects = async () => {
      setLoading(true)
      try {
        const result = await projectService.getAll()
        setProjects(result || [])
        if (result?.length > 0) {
          setSelectedProject(result[0])
        }
      } catch (err) {
        setError(err.message)
        toast.error("Failed to load projects")
      } finally {
        setLoading(false)
      }
    }
    loadProjects()
  }, [])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle('dark')
  }

  const handleProjectSelect = (project) => {
    setSelectedProject(project)
    setSidebarOpen(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <ApperIcon name="AlertTriangle" className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <p className="text-gray-600">Failed to load application</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''} bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900`}>
      {/* Header */}
      <header className="h-16 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-700/50 sticky top-0 z-50">
        <div className="h-full px-4 lg:px-6 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <ApperIcon name="Menu" className="h-5 w-5" />
            </button>
            
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <ApperIcon name="Kanban" className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                FlowBoard
              </h1>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="hidden md:flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg px-3 py-2 min-w-64">
              <ApperIcon name="Search" className="h-4 w-4 text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Search tasks..."
                className="bg-transparent border-none outline-none text-sm flex-1 text-gray-600 dark:text-gray-300"
              />
            </div>
            
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <ApperIcon name={darkMode ? "Sun" : "Moon"} className="h-5 w-5" />
            </button>
            
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <span className="text-white text-sm font-medium">U</span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-4rem)]">
        {/* Sidebar */}
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
                  <h2 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                    Projects
                  </h2>
                  <div className="space-y-1">
                    {projects?.map((project) => (
                      <motion.button
                        key={project.id}
                        onClick={() => handleProjectSelect(project)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-all ${
                          selectedProject?.id === project.id
                            ? 'bg-primary/10 text-primary border border-primary/20'
                            : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        <div className={`h-3 w-3 rounded-full`} style={{ backgroundColor: project.color }}></div>
                        <ApperIcon name={project.icon} className="h-4 w-4" />
                        <span className="text-sm font-medium flex-1">{project.name}</span>
                        <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                          {project.taskCount || 0}
                        </span>
                      </motion.button>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                    Quick Filters
                  </h2>
                  <div className="space-y-1">
                    {[
                      { name: 'My Tasks', icon: 'User', count: 8 },
                      { name: 'Due Today', icon: 'Calendar', count: 3 },
                      { name: 'High Priority', icon: 'AlertCircle', count: 5 },
                      { name: 'Completed', icon: 'CheckCircle', count: 12 }
                    ].map((filter) => (
                      <button
                        key={filter.name}
                        className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors"
                      >
                        <ApperIcon name={filter.icon} className="h-4 w-4" />
                        <span className="text-sm font-medium flex-1">{filter.name}</span>
                        <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                          {filter.count}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-hidden">
          {selectedProject ? (
            <MainFeature project={selectedProject} />
          ) : (
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <ApperIcon name="FolderOpen" className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
                  No Project Selected
                </h3>
                <p className="text-gray-500 dark:text-gray-500">
                  Choose a project from the sidebar to start managing tasks
                </p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default Home