"use client";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");

    toast.success("Logged out successfully");

    router.push("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="border border-black text-black px-5 py-2 rounded-lg hover:bg-black hover:text-white transition dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-black
      "
    >
      Logout
    </button>
  );
}
