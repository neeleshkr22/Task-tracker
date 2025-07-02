
export default function TaskFilter({ currentFilter, onFilterChange, taskCounts }) {
  const filters = [
    { key: "all", label: "All Tasks", count: taskCounts.all },
    { key: "pending", label: "Pending", count: taskCounts.pending },
    { key: "completed", label: "Completed", count: taskCounts.completed },
  ]

  return (
    <div className="flex flex-wrap gap-2 p-2 rounded-xl backdrop-blur-md bg-white/10 dark:bg-white/5 border border-white/20 shadow">

      {filters.map((filter) => {
        const isActive = currentFilter === filter.key

        return (
          <button
            key={filter.key}
            onClick={() => onFilterChange(filter.key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition
              ${isActive
                ? "bg-white dark:bg-gray-700 shadow text-gray-900 dark:text-white"
                : "bg-transparent hover:bg-white/70 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 border border-transparent"
              }`}
          >
            <span>{filter.label}</span>
            <span className={`text-xs px-2 py-0.5 rounded-full
              ${isActive
                ? "bg-gray-200 dark:bg-gray-600 text-gray-900 dark:text-white"
                : "bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              }`}
            >
              {filter.count}
            </span>
          </button>
        )
      })}
    </div>
  )
}
