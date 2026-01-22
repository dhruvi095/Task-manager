const PriorityFilter = ({ priorityFilter, setPriorityFilter, setPage }) => {
  return (
    <select
      className="border px-3 py-2"
      value={priorityFilter}
      onChange={(e) => {
        setPriorityFilter(e.target.value);
        setPage(1);
      }}
    >
      <option value="">All Priority</option>
      <option value="Low">Low</option>
      <option value="Medium">Medium</option>
      <option value="High">High</option>
    </select>
  );
};

export default PriorityFilter;
