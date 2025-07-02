import { useEffect, useState } from "react"
import Login from "./components/Login"
import TaskDashboard from "./components/TaskDashboard"
import { getStoredUser, clearStoredUser } from "./utils/localstorage"

function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const storedUser = getStoredUser()
    if (storedUser) setUser(storedUser)
  }, [])

  const handleLogin = (username) => {
    setUser(username)
  }

  const handleLogout = () => {
    clearStoredUser()
    setUser(null)
  }

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 dark:bg-black dark:text-white">
      {user ? (
        <TaskDashboard user={user} onLogout={handleLogout} />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  )
}

export default App
