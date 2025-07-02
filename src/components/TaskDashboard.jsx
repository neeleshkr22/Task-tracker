
import { useState, useEffect } from "react"
import { Plus, LogOut, CheckSquare } from "lucide-react"
import TaskForm from "./TaskForm"
import TaskFilter from "./TaskFilter"
import TaskList from "./TaskList"
import { getTasks, storeTasks } from "../utils/localstorage"

export default function TaskDashboard({ user, onLogout }) {
    const [tasks, setTasks] = useState([])
    const [filter, setFilter] = useState("all")
    const [showTaskForm, setShowTaskForm] = useState(false)
    const [editingTask, setEditingTask] = useState(null)
    const [search, setSearch] = useState("")

    useEffect(() => {
        const storedTasks = getTasks()
        setTasks(storedTasks)
    }, [])

    useEffect(() => {
        storeTasks(tasks)
    }, [tasks])

    const addTask = ({ title, description }) => {
        const newTask = {
            id: Date.now().toString(),
            title,
            description,
            completed: false,
            createdAt: new Date().toISOString(),
        }
        setTasks(prev => [newTask, ...prev])
        setShowTaskForm(false)
    }

    const updateTask = (taskId, updates) => {
        setTasks(prev => prev.map(task => (task.id === taskId ? { ...task, ...updates } : task)))
        setEditingTask(null)
    }

    const deleteTask = (taskId) => {
        setTasks(prev => prev.filter(task => task.id !== taskId))
    }

    const toggleTaskComplete = (taskId) => {
        setTasks(prev => prev.map(task => task.id === taskId ? { ...task, completed: !task.completed } : task))
    }

    const filteredTasks = tasks.filter(task => {
        const matchesFilter =
            filter === "completed" ? task.completed :
                filter === "pending" ? !task.completed : true

        const matchesSearch = task.title.toLowerCase().includes(search.toLowerCase())

        return matchesFilter && matchesSearch
    })


    const taskCounts = {
        all: tasks.length,
        completed: tasks.filter(t => t.completed).length,
        pending: tasks.filter(t => !t.completed).length,
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Header */}
            <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
                <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <CheckSquare className="h-8 w-8 text-blue-600" />
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Task Tracker</h1>
                            <p className="text-sm text-gray-600 dark:text-gray-300">Welcome back, {user}!</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-3">
                        <button
                            onClick={() => setShowTaskForm(true)}
                            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-3 rounded-md transition"
                        >
                            <Plus className="h-4 w-4" />
                            <span className="hidden sm:inline">Add Task</span>
                        </button>
                        <button
                            onClick={onLogout}
                            className="flex items-center gap-2 border border-gray-300 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700 text-gray-800 dark:text-white py-2 px-3 rounded-md transition"
                        >
                            <LogOut className="h-4 w-4" />
                            <span className="hidden sm:inline">Logout</span>
                        </button>
                    </div>
                </div>
            </header>

           
            <main className="max-w-4xl mx-auto px-4 py-8">

                <div className="space-y-6">
                    <input
                        type="text"
                        placeholder="Search tasks..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full mb-4 px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white/20 dark:bg-white/10 text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 backdrop-blur-md"
                    />

                   
                   
                    <TaskFilter currentFilter={filter} onFilterChange={setFilter} taskCounts={taskCounts} />

                    
                    
                    {(showTaskForm || editingTask) && (
                        <TaskForm
                            task={editingTask}
                            onSubmit={editingTask ? (data) => updateTask(editingTask.id, data) : addTask}
                            onCancel={() => {
                                setShowTaskForm(false)
                                setEditingTask(null)
                            }}
                        />
                    )}

                   
                   
                    <TaskList
                        tasks={filteredTasks}
                        onToggleComplete={toggleTaskComplete}
                        onEdit={setEditingTask}
                        onDelete={deleteTask}
                    />

                   
                   
                    {filteredTasks.length === 0 && (
                        <div className="text-center py-12">
                            <CheckSquare className="h-12 w-12 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                                {filter === "all"
                                    ? "No tasks yet"
                                    : filter === "completed"
                                        ? "No completed tasks"
                                        : "No pending tasks"}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-4">
                                {filter === "all"
                                    ? "Create your first task to get started!"
                                    : filter === "completed"
                                        ? "Complete some tasks to see them here."
                                        : "All tasks are completed! Great job!"}
                            </p>
                            {filter === "all" && (
                                <button
                                    onClick={() => setShowTaskForm(true)}
                                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md"
                                >
                                    <Plus className="h-4 w-4 mr-2 inline-block" />
                                    Add Your First Task
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </main>
        </div>
    )
}
