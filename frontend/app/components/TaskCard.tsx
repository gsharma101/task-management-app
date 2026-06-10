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
};

export default function TaskCard({
  task,
}: TaskCardProps) {

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-200 hover:shadow-xl transition">

      <div className="flex items-start justify-between">

        <h2 className="text-2xl font-bold text-black">
          {task.title}
        </h2>

        <span className="text-sm text-gray-500">
          {task.dueDate}
        </span>

      </div>

      <p className="text-gray-600 mt-4 line-clamp-3">
        {task.description}
      </p>

      <div className="flex items-center gap-3 mt-6">

        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
          {task.status}
        </span>

        <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
          {task.priority}
        </span>

      </div>

    </div>
  );
}