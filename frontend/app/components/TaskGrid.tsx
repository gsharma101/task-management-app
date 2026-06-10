import TaskCard from "./TaskCard";

type Task = {
  id: number;
  title: string;
  description: string;
  status: string;
  priority: string;
  dueDate: string;
};

type TaskGridProps = {
  tasks: Task[];
};

export default function TaskGrid({
  tasks,
}: TaskGridProps) {

  if (tasks.length === 0) {

    return (
      <div className="bg-white rounded-xl p-10 text-center shadow">

        <h2 className="text-2xl font-semibold text-gray-700">
          No tasks found
        </h2>

        <p className="text-gray-500 mt-2">
          Create your first task to get started.
        </p>

      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

      {tasks.map((task) => (

        <TaskCard
          key={task.id}
          task={task}
        />

      ))}

    </div>
  );
}