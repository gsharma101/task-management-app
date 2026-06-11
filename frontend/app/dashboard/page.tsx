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

  const [editingTask, setEditingTask] =
    useState<Task | null>(null);

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

      const response = await api.get(
        `/tasks?page=0&size=10&search=${search}`
      );

      setTasks(response.data.content);

    } catch (error) {

      console.error(error);
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

    fetchTasks();

  }, [search]);

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

    <div className="min-h-screen bg-gray-100 p-6">

      <Navbar
        search={search}
        setSearch={setSearch}
        onCreateTaskClick={() => {

          setEditingTask(null);

          setIsModalOpen(true);
        }}
        userName={userName}
      />

      <TaskGrid
        tasks={tasks}
        onDelete={handleDeleteTask}
        onEdit={handleEditTask}
      />

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