type SearchBarProps = {
  search: string;
  setSearch: (value: string) => void;
};

export default function SearchBar({
  search,
  setSearch,
}: SearchBarProps) {

  return (
    <input
      type="text"
      placeholder="Search tasks..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="w-full border border-gray-400 rounded-lg px-4 py-2 text-black bg-white focus:outline-none focus:ring-2 focus:ring-green-400"
    />
  );
}