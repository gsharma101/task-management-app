"use client";

import { useForm } from "react-hook-form";
import api from "@/services/api";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

type LoginFormData = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const router = useRouter();

  const { register, handleSubmit } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await api.post("/auth/login", data);

      localStorage.setItem("token", response.data.token);

      toast.success(response.data.message);

      router.push("/dashboard");
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md space-y-4 text-black"
      >
        <h1 className="text-2xl font-bold text-center">Login</h1>

        <input
          type="email"
          placeholder="Email"
          {...register("email")}
          className="w-full border p-3 rounded"
        />

        <input
          type="password"
          placeholder="Password"
          {...register("password")}
          className="w-full border p-3 rounded"
        />

        <button
          type="submit"
          className="w-full bg-black text-white py-3 rounded hover:bg-gray-800 transition"
        >
          Login
        </button>

        <p className="text-center text-gray-600 text-sm">
          Don&apos;t have an account?{" "}
          <span
            onClick={() => router.push("/signup")}
            className="text-black font-semibold cursor-pointer hover:underline"
          >
            Sign Up
          </span>
        </p>
      </form>
    </div>
  );
}
