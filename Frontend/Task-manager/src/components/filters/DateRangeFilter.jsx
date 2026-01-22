const DateRangeFilter = ({ fromDate, toDate, setFromDate, setToDate }) => {
  return (
    <>
      <div className="flex items-center gap-1">
        <label>From:</label>
        <input
          type="date"
          className="border bg-teal-950 px-3 py-1 text-white"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
        />
      </div>

      <div className="flex items-center gap-1">
        <label>To:</label>
        <input
          type="date"
          className="border bg-teal-950 px-3 py-1 text-white"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
        />
      </div>
    </>
  );
};

export default DateRangeFilter;
