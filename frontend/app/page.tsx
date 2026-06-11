import Link from "next/link";

export default function HomePage() {

  return (

    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-green-100 flex items-center justify-center px-6">

      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

        {/* Left Section */}
        <div>

          <div className="inline-block bg-black text-white px-4 py-2 rounded-full text-sm mb-6 mt-6">
            Productivity Simplified
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-black leading-tight">

            Manage Your Tasks
            <span className="text-green-600"> Smarter</span>

          </h1>

          <p className="text-gray-600 text-lg mt-6 leading-relaxed">

            Organize your work, track priorities, and stay productive
            with a secure full-stack task management platform built
            for modern workflows.

          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-8">

            <Link
              href="/signup"
              className="bg-black text-white px-7 py-3 rounded-xl hover:bg-gray-800 transition text-center"
            >
              Get Started
            </Link>

            <Link
              href="/login"
              className="border border-black text-black px-7 py-3 rounded-xl hover:bg-black hover:text-white transition text-center"
            >
              Login
            </Link>

          </div>

        </div>

        {/* Right Section */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-200">

          <div className="space-y-5">

            <div className="bg-green-50 border border-green-200 rounded-2xl p-5">

              <h3 className="text-xl font-semibold text-black">
                Secure Authentication
              </h3>

              <p className="text-gray-600 mt-2">
                JWT-based login system with protected routes
                and persistent sessions.
              </p>

            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5">

              <h3 className="text-xl font-semibold text-black">
                Smart Task Management
              </h3>

              <p className="text-gray-600 mt-2">
                Create, update, search, and organize tasks
                with priorities and deadlines.
              </p>

            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-2xl p-5">

              <h3 className="text-xl font-semibold text-black">
                Responsive Dashboard
              </h3>

              <p className="text-gray-600 mt-2">
                Optimized for desktop and mobile devices
                with a clean modern UI.
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}