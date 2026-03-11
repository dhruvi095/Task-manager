const TaskFilters = ({
  filters,
  onFilterChange,
  statusOptions,
  priorityOptions,
}) => {
  return (
    <div className="bg-white border p-3 mb-4 flex gap-2 justify-between flex-wrap">
      <input
        type="text"
        placeholder="Search by title..."
        className="flex-1 border px-3 py-2"
        value={filters.search}
        onChange={(event) => onFilterChange("search", event.target.value)}
      />
      <select
        className="border px-3 py-2"
        value={filters.status}
        onChange={(event) => onFilterChange("status", event.target.value)}
      >
        <option value="">All Status</option>
        {statusOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <select
        className="border px-3 py-2"
        value={filters.priority}
        onChange={(event) => onFilterChange("priority", event.target.value)}
      >
        <option value="">All Priority</option>
        {priorityOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <select
        className="border bg-teal-950 px-3 py-1 text-white"
        value={filters.sort}
        onChange={(event) => onFilterChange("sort", event.target.value)}
      >
        <option value="asc">Due Date asc</option>
        <option value="desc">Due Date desc</option>
      </select>
      <div className="flex items-center gap-0.5">
        <label htmlFor="fromDate">From :</label>
        <input
          id="fromDate"
          type="date"
          className="border bg-teal-950 px-3 py-1 text-white"
          value={filters.fromDate}
          onChange={(event) => onFilterChange("fromDate", event.target.value)}
        />
      </div>
      <div className="flex items-center gap-0.5">
        <label htmlFor="toDate">To :</label>
        <input
          id="toDate"
          type="date"
          className="border bg-teal-950 px-3 py-1 text-white"
          value={filters.toDate}
          onChange={(event) => onFilterChange("toDate", event.target.value)}
        />
      </div>
    </div>
  );
};

export default TaskFilters;
