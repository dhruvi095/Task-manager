import StatusFilter from "./StatusFilter";
import PriorityFilter from "./PriorityFilter";
import SortByDueDate from "./SortByDueDate";
import DateRangeFilter from "./DateRangeFilter";
import SearchBar from "./Searchbar";

const FiltersBar = ({
  search, setSearch,
  statusFilter, setStatusFilter,
  priorityFilter, setPriorityFilter,
  sort, setSort,
  fromDate, toDate,
  setFromDate, setToDate,
  setPage
}) => {
  return (
    <div className="bg-white border p-3 mb-4 flex gap-2 flex-wrap">
      <SearchBar search={search} setSearch={setSearch} setPage={setPage} />
      <StatusFilter statusFilter={statusFilter} setStatusFilter={setStatusFilter} setPage={setPage} />
      <PriorityFilter priorityFilter={priorityFilter} setPriorityFilter={setPriorityFilter} setPage={setPage} />
      <SortByDueDate sort={sort} setSort={setSort} setPage={setPage} />
      <DateRangeFilter
        fromDate={fromDate}
        toDate={toDate}
        setFromDate={setFromDate}
        setToDate={setToDate}
      />
    </div>
  );
};

export default FiltersBar;
