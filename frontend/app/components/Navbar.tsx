"use client";

import SearchBar from "./SearchBar";
import LogoutButton from "./LogoutButton";

type NavbarProps = {
  search: string;
  setSearch: (value: string) => void;
  onCreateTaskClick: () => void;
  userName: string;
};

export default function Navbar({
  search,
  setSearch,
  onCreateTaskClick,
  userName,
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
        <div className="w-full md:w-1/3">

          <SearchBar
            search={search}
            setSearch={setSearch}
          />

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