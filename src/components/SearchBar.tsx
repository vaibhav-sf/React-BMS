interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const SearchBar = ({
  searchQuery,
  onSearchChange,
}: SearchBarProps) => {
  return (
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
        🔍
      </span>
      <input
        type="text"
        placeholder="Search by title or author"
        value={searchQuery}
        onChange={(e) =>
          onSearchChange(e.target.value)
        }
        className="w-full rounded-lg border border-slate-700 bg-white text-slate-900 pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
      />
    </div>
  );
};

export default SearchBar;
