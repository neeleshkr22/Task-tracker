
import { useState, useEffect } from "react"
import { X } from "lucide-react"

export default function TaskForm({ task, onSubmit, onCancel }) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    if (task) {
      setTitle(task.title)
      setDescription(task.description)
    }
  }, [task])

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!title.trim()) {
      setError("Task title is required")
      return
    }

    onSubmit({
      title: title.trim(),
      description: description.trim(),
    })

    if (!task) {
      setTitle("")
      setDescription("")
    }

    setError("")
  }

  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          {task ? "Edit Task" : "Add New Task"}
        </h2>
        <button
          onClick={onCancel}
          className="text-gray-500 hover:text-red-500 transition rounded-full p-1"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
            Title *
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value)
              setError("")
            }}
            placeholder="Enter task title"
            className={`w-full rounded-md px-3 py-2 border text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white ${
              error ? "border-red-500" : "border-gray-300"
            }`}
          />
          {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            placeholder="Enter task description (optional)"
            className="w-full rounded-md px-3 py-2 border border-gray-300 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div className="flex space-x-3 pt-2">
          <button
            type="submit"
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition"
          >
            {task ? "Update Task" : "Add Task"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="border border-gray-300 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-md transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
