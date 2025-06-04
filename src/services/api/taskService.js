import tasksData from '../mockData/tasks.json'

// Simulate network delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

let tasks = [...tasksData]

export const getAll = async () => {
  await delay(300)
  return [...tasks]
}

export const getById = async (id) => {
  await delay(200)
  const task = tasks.find(t => t.id === id)
  return task ? { ...task } : null
}

export const create = async (taskData) => {
  await delay(400)
  const newTask = {
    ...taskData,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
  tasks.push(newTask)
  return { ...newTask }
}

export const update = async (id, updates) => {
  await delay(300)
  const index = tasks.findIndex(t => t.id === id)
  if (index === -1) throw new Error('Task not found')
  
  tasks[index] = {
    ...tasks[index],
    ...updates,
    updatedAt: new Date().toISOString()
  }
  return { ...tasks[index] }
}

export const remove = async (id) => {
  await delay(250)
  const index = tasks.findIndex(t => t.id === id)
  if (index === -1) throw new Error('Task not found')
  
  const deletedTask = tasks.splice(index, 1)[0]
  return { ...deletedTask }
}

// Alternative export for delete (reserved keyword)
export { remove as delete }

export const getByProject = async (projectId) => {
  await delay(300)
  return tasks.filter(t => t.projectId === projectId).map(t => ({ ...t }))
}

export const getByStatus = async (status) => {
  await delay(250)
  return tasks.filter(t => t.status === status).map(t => ({ ...t }))
}

export const getByPriority = async (priority) => {
  await delay(250)
  return tasks.filter(t => t.priority === priority).map(t => ({ ...t }))
}