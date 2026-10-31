
"use client";

import { useState } from "react";

export default function AdminLogin({ onBack, onSignIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (email.trim().toLowerCase() === "admin@gmail.com" && password === "admin") {
      setError("");
      onSignIn?.();
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f4f5f7] px-5 py-10">
      <div className="w-full max-w-[500px] rounded-xl border bg-white p-8 shadow-lg sm:p-10">

        <h1 className="mb-8 text-3xl font-bold text-black">
          Admin Login
        </h1>

        <form onSubmit={handleLogin}>
          <label className="mb-2 block text-sm font-semibold text-black">
            Email *
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            required
            className="mb-6 w-full rounded-lg border bg-[#eef3fc] px-4 py-4 text-sm text-black outline-none focus:border-gray-700"
          />

          <label className="mb-2 block text-sm font-semibold text-black">
            Password *
          </label>

          <div className="relative mb-4">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="w-full rounded-lg border bg-[#eef3fc] px-4 py-4 pr-16 text-sm text-black outline-none focus:border-gray-700"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-700"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <div className="mb-7 flex justify-end">
            <button
              type="button"
              onClick={() => setError("Contact the administrator to reset your password.")}
              className="text-sm text-gray-700 hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          {error && (
            <p className="mb-5 rounded-lg bg-red-50 p-3 text-sm text-red-600">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full rounded-lg bg-[#333333] py-4 text-sm font-semibold text-white hover:bg-black"
          >
            Sign In
          </button>
        </form>

        <div className="mt-9 border-t pt-7">
          <button
            type="button"
            onClick={onBack}
            className="text-sm text-gray-700 hover:text-black"
          >
            ← Back to Welcome Page
          </button>
        </div>

      </div>

      <p className="fixed bottom-4 text-xs text-gray-400">
        © {new Date().getFullYear()} Admin Portal. All rights reserved.
      </p>
    </main>
  );
}
