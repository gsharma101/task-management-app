"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import api from "@/services/api";

import Navbar from "@/app/components/Navbar";
import TaskGrid from "@/app/components/TaskGrid";
import CreateTaskModal from "@/app/components/CreateTaskModal";

type Task = {
  id: number;
  title: string;
  description: string;
  status: string;
  priority: string;
  dueDate: string;
};

export default function DashboardPage() {
  const router = useRouter();

  const [tasks, setTasks] = useState<Task[]>([]);

  const [search, setSearch] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [userName, setUserName] = useState("");

  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const [sortBy, setSortBy] = useState("createdAt");

  const [page, setPage] = useState(0);

  const [totalPages, setTotalPages] = useState(0);

  const [loading, setLoading] = useState(false);

  const fetchCurrentUser = async () => {
    try {
      const response = await api.get("/auth/me");

      setUserName(response.data.name);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await api.get(
        `/tasks?page=${page}&size=6&search=${search}&sortBy=${sortBy}`,
      );

      setTasks(response.data.content);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");

      return;
    }

    fetchTasks();

    fetchCurrentUser();
  }, [router]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    setPage(0);

    fetchTasks();
  }, [search, sortBy]);

  useEffect(() => {
    fetchTasks();
  }, [search, sortBy, page]);

  const handleDeleteTask = async (id: number) => {
    try {
      await api.delete(`/tasks/${id}`);

      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);

    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-zinc-950 p-6 transition">
      <Navbar
        search={search}
        setSearch={setSearch}
        sortBy={sortBy}
        setSortBy={setSortBy}
        onCreateTaskClick={() => {
          setEditingTask(null);

          setIsModalOpen(true);
        }}
        userName={userName}
      />

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <p className="text-2xl font-semibold text-gray-600">
            Loading tasks...
          </p>
        </div>
      ) : (
        <TaskGrid
          tasks={tasks}
          onDelete={handleDeleteTask}
          onEdit={handleEditTask}
        />
      )}

      <div className="flex justify-center items-center gap-4 mt-8">
        <button
          onClick={() => setPage((prev) => prev - 1)}
          disabled={page === 0}
          className="px-4 py-2 bg-black text-white rounded disabled:bg-gray-400"
        >
          Previous
        </button>

        <span className="text-black dark:text-white">
          Page {page + 1} of {totalPages}
        </span>

        <button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={page + 1 >= totalPages}
          className="px-4 py-2 bg-black text-white rounded disabled:bg-gray-400"
        >
          Next
        </button>
      </div>

      <CreateTaskModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);

          setEditingTask(null);
        }}
        onTaskCreated={fetchTasks}
        editingTask={editingTask}
      />
    </div>
  );
}
