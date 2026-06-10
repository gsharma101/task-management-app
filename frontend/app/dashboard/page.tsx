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

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    fetchTasks();
  }, [router]);

  const fetchTasks = async () => {
    try {
      const response = await api.get(`/tasks?page=0&size=10&search=${search}`);

      setTasks(response.data.content);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [search]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Navbar
        search={search}
        setSearch={setSearch}
        onCreateTaskClick={() => setIsModalOpen(true)}
      />

      <TaskGrid tasks={tasks} />

      <CreateTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onTaskCreated={fetchTasks}
      />
    </div>
  );
}
