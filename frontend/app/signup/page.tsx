"use client";

import { useForm } from "react-hook-form";
import api from "@/services/api";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

type SignupFormData = {
  name: string;
  email: string;
  password: string;
};

export default function SignupPage() {
  const { register, handleSubmit, reset } = useForm<SignupFormData>();
  const router = useRouter();

  const onSubmit = async (data: SignupFormData) => {
    try {
      const response = await api.post("/auth/signup", data);

      toast.success(response.data.message);

      reset();
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md space-y-4 text-black"
      >
        <h1 className="text-2xl font-bold text-center">Signup</h1>

        <input
          type="text"
          placeholder="Name"
          {...register("name")}
          className="w-full border p-3 rounded"
        />

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
          className="w-full bg-black text-white py-3 rounded"
        >
          Signup
        </button>
        <p className="text-center text-gray-600 text-sm">
          Already have an account?{" "}
          <span
            onClick={() => router.push("/login")}
            className="text-black font-semibold cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
}
