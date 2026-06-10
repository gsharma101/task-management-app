import Link from "next/link";

export default function HomePage() {

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-6">

      <div className="bg-white shadow-xl rounded-2xl p-10 max-w-2xl w-full text-center">

        <h1 className="text-5xl font-bold text-black mb-6">
          Task Management App
        </h1>

        <p className="text-gray-600 text-lg mb-10">
          Organize your tasks, manage priorities, and stay productive with a
          secure full-stack task management system.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">

          <Link
            href="/login"
            className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
          >
            Login
          </Link>

          <Link
            href="/signup"
            className="border border-black text-black px-6 py-3 rounded-lg hover:bg-black hover:text-white transition"
          >
            Create Account
          </Link>

        </div>

      </div>
    </div>
  );
}