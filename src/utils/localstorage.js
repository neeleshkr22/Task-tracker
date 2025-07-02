const USER_KEY = "taskTracker_user"
const TASKS_KEY = "taskTracker_tasks"



export const storeUser = (username) => {
  try {
    localStorage.setItem(USER_KEY, username)
  } catch (error) {
    console.error("Failed to store user:", error)
  }
}

export const getStoredUser = () => {
  try {
    return localStorage.getItem(USER_KEY)
  } catch (error) {
    console.error("Failed to get stored user:", error)
    return null
  }
}

export const clearStoredUser = () => {
  try {
    localStorage.removeItem(USER_KEY)
  } catch (error) {
    console.error("Failed to clear stored user:", error)
  }
}


export const storeTasks = (tasks) => {
  try {
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks))
  } catch (error) {
    console.error("Failed to store tasks:", error)
  }
}

export const getTasks = () => {
  try {
    const stored = localStorage.getItem(TASKS_KEY)
    return stored ? JSON.parse(stored) : []
  } catch (error) {
    console.error("Failed to get stored tasks:", error)
    return []
  }
}

export const clearTasks = () => {
  try {
    localStorage.removeItem(TASKS_KEY)
  } catch (error) {
    console.error("Failed to clear tasks:", error)
  }
}
