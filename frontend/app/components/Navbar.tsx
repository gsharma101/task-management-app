"use client";

import { useEffect, useState } from "react";

import SearchBar from "./SearchBar";
import LogoutButton from "./LogoutButton";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

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
  sortBy,
}: NavbarProps) {

  const { theme, setTheme } = useTheme();

  const [mounted, setMounted] =
    useState(false);

  useEffect(() => {

    setMounted(true);

  }, []);

  if (!mounted) {
    return null;
  }

  return (

    <nav className="bg-green-100 dark:bg-zinc-900 border border-green-300 dark:border-zinc-700 rounded-xl px-6 py-4 mb-8 transition">

      <div className="flex flex-col md:flex-row items-center justify-between gap-4">

        {/* Left Side */}
        <div>

          <h1 className="text-2xl font-bold text-black dark:text-white">
            {userName}'s Dashboard
          </h1>

        </div>

        {/* Middle */}
        <div className="w-full md:w-1/2 flex gap-3">

          <SearchBar
            search={search}
            setSearch={setSearch}
          />

          <select
            value={sortBy}
            onChange={(e) =>
              setSortBy(e.target.value)
            }
            className="border border-gray-400 dark:border-zinc-600 rounded-lg px-4 py-2 bg-white dark:bg-zinc-800 text-black dark:text-white transition"
          >

            <option value="createdAt">
              Latest
            </option>

            <option value="dueDate">
              Due Date
            </option>

            <option value="priority">
              Priority
            </option>

          </select>

        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">

          <button
            onClick={() =>
              setTheme(
                theme === "dark"
                  ? "light"
                  : "dark"
              )
            }
            className="border border-black dark:border-white px-4 py-2 rounded-lg bg-transparent text-black dark:text-white hover:bg-gray-200 dark:hover:bg-zinc-800 transition"
          >

            {theme === "dark"
              ? <Sun size={18} />
              : <Moon size={18} />
            }

          </button>

          <button
            onClick={onCreateTaskClick}
            className="bg-black dark:bg-white text-white dark:text-black px-5 py-2 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition cursor-pointer"
          >
            Create Task
          </button>

          <LogoutButton />

        </div>

      </div>

    </nav>
  );
}