"use client";

import { useState, useCallback, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export function SignInForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { signIn } = useAuth();
  const router = useRouter();

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      setError("");

      if (!username.trim()) {
        setError("Username is required");
        return;
      }
      if (!password.trim()) {
        setError("Password is required");
        return;
      }

      const success = signIn(username, password);
      if (success) {
        router.push("/photos");
      } else {
        setError("Invalid credentials");
      }
    },
    [username, password, signIn, router],
  );

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-[319px]">
      <div className="mb-6">
        <label
          htmlFor="username"
          className="block text-[14px] font-semibold text-[#111827] mb-1.5"
        >
          Username
        </label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
          className="w-full h-[44px] px-3 text-[14px] text-[#111827] placeholder-[#9CA3AF] border border-[#D1D5DB] rounded-lg outline-none focus:ring-2 focus:ring-[#0075EB] focus:border-[#0075EB] transition-colors"
        />
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-1.5">
          <label
            htmlFor="password"
            className="block text-[14px] font-semibold text-[#111827]"
          >
            Password
          </label>
          <button
            type="button"
            className="text-[14px] font-medium text-[#0075EB] hover:text-[#0060C0] transition-colors"
          >
            Forgot password?
          </button>
        </div>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          className="w-full h-[44px] px-3 text-[14px] text-[#111827] placeholder-[#9CA3AF] border border-[#D1D5DB] rounded-lg outline-none focus:ring-2 focus:ring-[#0075EB] focus:border-[#0075EB] transition-colors"
        />
      </div>

      {error && (
        <p className="text-[14px] text-red-600 mb-4" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        className="w-full h-[44px] bg-[#0075EB] hover:bg-[#0060C0] text-white text-[16px] font-semibold rounded-lg transition-colors cursor-pointer"
      >
        Sign in
      </button>
    </form>
  );
}
