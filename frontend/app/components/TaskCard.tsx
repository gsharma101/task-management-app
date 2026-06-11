import { Pencil, Trash2 } from "lucide-react";

type Task = {
  id: number;
  title: string;
  description: string;
  status: string;
  priority: string;
  dueDate: string;
};

type TaskCardProps = {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
};

export default function TaskCard({ task, onEdit, onDelete }: TaskCardProps) {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-md p-6 border border-gray-200 dark:border-zinc-700 hover:shadow-xl transition hover:-translate-y-1">
      <div className="flex items-start justify-between">
        <h2 className="text-2xl font-bold text-black dark:text-white">{task.title}</h2>

        <span className="text-sm text-gray-500">{task.dueDate}</span>
      </div>

      <p className="text-gray-600 dark:text-gray-300 mt-4 line-clamp-3">{task.description}</p>

      <div className="flex items-center gap-3 mt-6">
        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
          {task.status}
        </span>

        <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
          {task.priority}
        </span>
      </div>

      <div className="flex justify-end gap-3 mt-6">
        <button
          onClick={() => onEdit(task)}
          className="text-blue-600 hover:text-blue-800 transition cursor-pointer"
        >
          <Pencil size={20} />
        </button>

        <button
          onClick={() => {
            const confirmed = window.confirm(
              "Are you sure you want to delete this task?",
            );

            if (confirmed) {
              onDelete(task.id);
            }
          }}
          className="text-red-600 hover:text-red-800 transition cursor-pointer"
        >
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  );
}
