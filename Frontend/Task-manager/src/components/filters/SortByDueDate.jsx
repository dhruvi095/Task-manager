const SortByDueDate = ({ sort, setSort, setPage }) => {
  return (
    <select
      className="border bg-teal-950 px-3 py-1 text-white"
      value={sort}
      onChange={(e) => {
        setSort(e.target.value);
        setPage(1);
      }}
    >
      <option value="asc">Due Date asc</option>
      <option value="desc">Due Date desc</option>
    </select>
  );
};

export default SortByDueDate;
