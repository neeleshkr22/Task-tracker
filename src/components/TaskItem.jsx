
import { useState } from "react"
import { Edit2, Trash2, Calendar } from "lucide-react"

export default function TaskItem({ task, onToggleComplete, onEdit, onDelete }) {
    const [showDeleteDialog, setShowDeleteDialog] = useState(false)

    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        })
    }

    return (
        <div
            className={`rounded-xl p-4 mb-4 transition-all duration-200 border backdrop-blur-lg ${task.completed
                    ? "bg-white/10 dark:bg-white/5 border-gray-200 dark:border-gray-700 opacity-70"
                    : "bg-white/20 dark:bg-white/10 border-white/30 hover:shadow-lg"
                }`}
        >

            <div className="flex items-start space-x-3">
                {/* Checkbox */}
                <div className="flex-shrink-0 pt-1">
                    <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => onToggleComplete(task.id)}
                        className="h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    />
                </div>

                
                
                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                        <div className="flex-1">
                            <h3
                                className={`font-medium text-gray-900 break-words ${task.completed ? "line-through text-gray-500" : ""
                                    }`}
                            >
                                {task.title}
                            </h3>
                            {task.description && (
                                <p
                                    className={`mt-1 text-sm break-words ${task.completed ? "text-gray-400" : "text-gray-600"
                                        }`}
                                >
                                    {task.description}
                                </p>
                            )}
                            <div className="flex items-center mt-2 text-xs text-gray-500">
                                <Calendar className="h-3 w-3 mr-1" />
                                <span>Created {formatDate(task.createdAt)}</span>
                                {task.completed && (
                                    <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                                        Completed
                                    </span>
                                )}
                            </div>
                        </div>

                       
                       
                        <div className="flex items-center space-x-1 ml-4">
                            <button
                                onClick={() => onEdit(task)}
                                className="h-8 w-8 p-1 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition"
                            >
                                <Edit2 className="h-4 w-4" />
                            </button>

                            <button
                                onClick={() => setShowDeleteDialog(true)}
                                className="h-8 w-8 p-1 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded transition"
                            >
                                <Trash2 className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

         
         
            {showDeleteDialog && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-md p-6 space-y-4">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Delete Task</h2>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                            Are you sure you want to delete <strong>{task.title}</strong>? This action cannot be undone.
                        </p>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setShowDeleteDialog(false)}
                                className="px-4 py-2 rounded-md text-gray-700 dark:text-white border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    onDelete(task.id)
                                    setShowDeleteDialog(false)
                                }}
                                className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
