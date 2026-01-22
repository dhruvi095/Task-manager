const SearchBar = ({ search, setSearch, setPage }) => {
  return (
    <input
      type="text"
      placeholder="Search by title..."
      className="flex-1 border px-3 py-2"
      value={search}
      onChange={(e) => {
        setSearch(e.target.value.trimStart());
        setPage(1);
      }}
    />
  );
};

export default SearchBar;
