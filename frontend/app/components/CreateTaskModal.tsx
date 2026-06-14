"use client";

import { useEffect, useState } from "react";

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
  attachmentUrl?: string;
  attachmentName?: string;
};

type TaskFormData = {
  title: string;
  description: string;
  status: string;
  priority: string;
  dueDate: string;
  attachmentUrl?: string;
  attachmentName?: string;
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
    formState: { errors },
  } = useForm<TaskFormData>();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (editingTask) {
      reset({
        title: editingTask.title,
        description: editingTask.description,
        status: editingTask.status,
        priority: editingTask.priority,
        dueDate: editingTask.dueDate,
        attachmentUrl: editingTask.attachmentUrl,
        attachmentName: editingTask.attachmentName,
      });
    } else {
      reset({
        title: "",
        description: "",
        status: "PENDING",
        priority: "LOW",
        dueDate: "",
        attachmentUrl: "",
        attachmentName: "",
      });
    }
  }, [editingTask, reset]);

  const onSubmit = async (data: TaskFormData) => {
    try {
      let attachmentUrl = editingTask?.attachmentUrl || "";

      let attachmentName = editingTask?.attachmentName || "";

      if (selectedFile) {
        setUploading(true);

        const formData = new FormData();

        formData.append("file", selectedFile);

        const uploadResponse = await api.post("/api/files/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        attachmentUrl = uploadResponse.data;

        attachmentName = selectedFile.name;

        setUploading(false);
      }

      const payload = {
        ...data,
        attachmentUrl,
        attachmentName,
      };

      if (editingTask) {
        await api.patch(`/tasks/${editingTask.id}`, payload);

        toast.success("Task updated successfully");
      } else {
        await api.post("/tasks", payload);

        toast.success("Task created successfully");
      }

      reset();

      setSelectedFile(null);

      onTaskCreated();

      onClose();
    } catch (error: any) {
      setUploading(false);

      toast.error(error.response?.data?.error || "Failed to save task");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl w-[50vw] h-[80vh] overflow-hidden">
        <div className="h-full overflow-y-auto p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold border border-gray-300 dark:border-zinc-700 rounded-xl p-4 text-black dark:text-white bg-white dark:bg-zinc-800">
              {editingTask ? "Update Task" : "Create Task"}
            </h2>

            <button
              onClick={onClose}
              className="text-gray-500 hover:text-black text-2xl"
            >
              ×
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <input
              type="text"
              placeholder="Task title"
              {...register("title", {
                required: "Title is required",
              })}
              className="w-full border border-gray-300 rounded-xl p-4 text-black"
            />

            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title.message}
              </p>
            )}

            <textarea
              placeholder="Task description"
              {...register("description", {
                required: "Description is required",
              })}
              className="w-full border border-gray-300 rounded-xl p-4 text-black h-32"
            />

            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {errors.description.message}
              </p>
            )}

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

            <input
              type="file"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setSelectedFile(e.target.files[0]);
                }
              }}
              className="w-full border border-gray-300 rounded-xl p-4 text-black bg-white"
            />

            {editingTask?.attachmentName && (
              <div className="text-sm text-gray-600 dark:text-gray-300">
                Current Attachment: {editingTask.attachmentName}
              </div>
            )}

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
                disabled={uploading}
                className="bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 disabled:opacity-50"
              >
                {uploading
                  ? "Uploading..."
                  : editingTask
                    ? "Update Task"
                    : "Create Task"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
