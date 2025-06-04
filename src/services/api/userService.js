import usersData from '../mockData/users.json'

// Simulate network delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

let users = [...usersData]

export const getAll = async () => {
  await delay(300)
  return [...users]
}

export const getById = async (id) => {
  await delay(200)
  const user = users.find(u => u.id === id)
  return user ? { ...user } : null
}

export const create = async (userData) => {
  await delay(400)
  const newUser = {
    ...userData,
    id: Date.now().toString()
  }
  users.push(newUser)
  return { ...newUser }
}

export const update = async (id, updates) => {
  await delay(300)
  const index = users.findIndex(u => u.id === id)
  if (index === -1) throw new Error('User not found')
  
  users[index] = {
    ...users[index],
    ...updates
  }
  return { ...users[index] }
}

export const remove = async (id) => {
  await delay(250)
  const index = users.findIndex(u => u.id === id)
  if (index === -1) throw new Error('User not found')
  
  const deletedUser = users.splice(index, 1)[0]
  return { ...deletedUser }
}

// Alternative export for delete (reserved keyword)
export { remove as delete }