const StatusFilter = ({ statusFilter, setStatusFilter, setPage }) => {
  return (
    <select
      className="border px-3 py-2"
      value={statusFilter}
      onChange={(e) => {
        setStatusFilter(e.target.value);
        setPage(1);
      }}
    >
      <option value="">All Status</option>
      <option value="Pending">Pending</option>
      <option value="in_progress">In Progress</option>
      <option value="Completed">Completed</option>
    </select>
  );
};

export default StatusFilter;
