import { useState } from "react"
import { CheckSquare } from "lucide-react"

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!username.trim()) {
      setError("Username is required")
      return
    }

    if (username.trim().length < 2) {
      setError("Username must be at least 2 characters")
      return
    }

    localStorage.setItem("username", username.trim())
    onLogin(username.trim())
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="text-center mb-6">
          <div className="flex justify-center mb-4">
            <CheckSquare className="h-12 w-12 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Task Tracker</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Enter your username to access your personal task manager
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Username
            </label>
            <input
              id="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value)
                setError("")
              }}
              className={`mt-1 block w-full rounded-md border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white ${
                error ? "border-red-500" : "border-gray-300"
              }`}
            />
            {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}
