"use client";

import { useEffect } from "react";

import { useForm } from "react-hook-form";

import api from "@/services/api";

import toast from "react-hot-toast";

type Task = {
  id: number;
  title: string;
  description: string;
  status: string;
  priority: string;
  dueDate: string;
};

type TaskFormData = {
  title: string;
  description: string;
  status: string;
  priority: string;
  dueDate: string;
};

type CreateTaskModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onTaskCreated: () => void;
  editingTask: Task | null;
};

export default function CreateTaskModal({
  isOpen,
  onClose,
  onTaskCreated,
  editingTask,
}: CreateTaskModalProps) {

  const {
    register,
    handleSubmit,
    reset,
  } = useForm<TaskFormData>();

  useEffect(() => {

    if (editingTask) {

      reset({
        title: editingTask.title,
        description: editingTask.description,
        status: editingTask.status,
        priority: editingTask.priority,
        dueDate: editingTask.dueDate,
      });

    } else {

      reset({
        title: "",
        description: "",
        status: "PENDING",
        priority: "LOW",
        dueDate: "",
      });
    }

  }, [editingTask, reset]);

  const onSubmit = async (data: TaskFormData) => {

    try {

      if (editingTask) {

        await api.patch(
          `/tasks/${editingTask.id}`,
          data
        );

        toast.success("Task updated successfully");

      } else {

        await api.post("/tasks", data);

        toast.success("Task created successfully");
      }

      reset();

      onTaskCreated();

      onClose();

    } catch (error: any) {

      toast.error(
        error.response?.data?.error ||
        "Failed to save task"
      );
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">

      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-8">

        <div className="flex items-center justify-between mb-6">

          <h2 className="text-3xl font-bold text-black">

            {editingTask
              ? "Update Task"
              : "Create Task"}

          </h2>

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black text-2xl"
          >
            ×
          </button>

        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >

          <input
            type="text"
            placeholder="Task title"
            {...register("title")}
            className="w-full border border-gray-300 rounded-xl p-4 text-black"
          />

          <textarea
            placeholder="Task description"
            {...register("description")}
            className="w-full border border-gray-300 rounded-xl p-4 text-black h-32"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            <select
              {...register("status")}
              className="border border-gray-300 rounded-xl p-4 text-black"
            >
              <option value="PENDING">PENDING</option>
              <option value="IN_PROGRESS">IN_PROGRESS</option>
              <option value="COMPLETED">COMPLETED</option>
            </select>

            <select
              {...register("priority")}
              className="border border-gray-300 rounded-xl p-4 text-black"
            >
              <option value="LOW">LOW</option>
              <option value="MEDIUM">MEDIUM</option>
              <option value="HIGH">HIGH</option>
            </select>

            <input
              type="date"
              {...register("dueDate")}
              className="border border-gray-300 rounded-xl p-4 text-black"
            />

          </div>

          <div className="flex justify-end gap-4 pt-4">

            <button
              type="button"
              onClick={onClose}
              className="border border-gray-400 px-6 py-3 rounded-xl text-black hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800"
            >

              {editingTask
                ? "Update Task"
                : "Create Task"}

            </button>

          </div>

        </form>

      </div>

    </div>
  );
}