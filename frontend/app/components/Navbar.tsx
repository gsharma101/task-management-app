"use client";

import SearchBar from "./SearchBar";
import LogoutButton from "./LogoutButton";

type NavbarProps = {
  search: string;
  setSearch: (value: string) => void;
  onCreateTaskClick: () => void;
  userName: string;
  sortBy: string;
  setSortBy: (value: string) => void;
};

export default function Navbar({
  search,
  setSearch,
  onCreateTaskClick,
  userName,
  setSortBy,
  sortBy
}: NavbarProps) {
  return (
    <nav className="bg-green-100 border border-green-300 rounded-xl px-6 py-4 mb-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left Side */}
        <div>
          <h1 className="text-2xl font-bold text-black">
            {userName}'s Dashboard
          </h1>
        </div>

        {/* Middle */}
        <div className="w-full md:w-1/2 flex gap-3">
          <SearchBar search={search} setSearch={setSearch} />

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-gray-400 rounded-lg px-4 py-2 bg-white text-black"
          >
            <option value="createdAt">Latest</option>

            <option value="dueDate">Due Date</option>

            <option value="priority">Priority</option>
          </select>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          <button
            onClick={onCreateTaskClick}
            className="bg-black text-white px-5 py-2 rounded-lg hover:bg-gray-800 transition cursor-pointer"
          >
            Create Task
          </button>

          <LogoutButton />
        </div>
      </div>
    </nav>
  );
}
