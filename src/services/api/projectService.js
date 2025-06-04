import projectsData from '../mockData/projects.json'

// Simulate network delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

let projects = [...projectsData]

export const getAll = async () => {
  await delay(300)
  return [...projects]
}

export const getById = async (id) => {
  await delay(200)
  const project = projects.find(p => p.id === id)
  return project ? { ...project } : null
}

export const create = async (projectData) => {
  await delay(400)
  const newProject = {
    ...projectData,
    id: Date.now().toString(),
    taskCount: 0
  }
  projects.push(newProject)
  return { ...newProject }
}

export const update = async (id, updates) => {
  await delay(300)
  const index = projects.findIndex(p => p.id === id)
  if (index === -1) throw new Error('Project not found')
  
  projects[index] = {
    ...projects[index],
    ...updates
  }
  return { ...projects[index] }
}

export const remove = async (id) => {
  await delay(250)
  const index = projects.findIndex(p => p.id === id)
  if (index === -1) throw new Error('Project not found')
  
  const deletedProject = projects.splice(index, 1)[0]
  return { ...deletedProject }
}

// Alternative export for delete (reserved keyword)
export { remove as delete }