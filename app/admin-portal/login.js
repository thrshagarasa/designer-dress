
"use client";

import { useState } from "react";

export default function AdminLogin({ onBack, onSignIn }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      setError("Please enter both username and password.");
      return;
    }

    setError("");
    onSignIn();
  };

  return (
    <main className="min-h-screen bg-white text-gray-800">

      {/* Header */}
      <header className="flex items-center gap-4 border-b px-8 py-4">
        <div className="flex h-12 w-12 items-center justify-center border text-xs text-gray-500">
          LOGO
        </div>

        <div>
          <h2 className="text-lg font-bold">
            Custom Made Designer Dress
          </h2>
          <p className="text-xs text-gray-500">
            Designer Studio Management System
          </p>
        </div>

        <span className="ml-auto text-sm text-gray-500">
          Studio Access
        </span>
      </header>

      {/* Admin Login */}
      <section className="flex min-h-[80vh] items-center justify-center px-5 py-8">

        <div className="w-full max-w-md border border-gray-300 p-8">

          <p className="mb-3 text-xs font-semibold text-gray-500">
            ADMIN ACCESS
          </p>

          <h1 className="mb-2 text-2xl font-bold">
            Admin Login
          </h1>

          <p className="mb-7 text-sm text-gray-500">
            For the studio owner and authorized staff only.
          </p>

          <form onSubmit={handleLogin}>

            <label className="mb-2 block text-sm font-semibold">
              Email / Username *
            </label>

            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter email or username"
              required
              className="mb-5 w-full border border-gray-300 px-4 py-3 text-sm outline-none focus:border-black"
            />

            <label className="mb-2 block text-sm font-semibold">
              Password *
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
              className="mb-6 w-full border border-gray-300 px-4 py-3 text-sm outline-none focus:border-black"
            />

            {error && (
              <p className="mb-4 text-sm text-red-600">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-[#333333] py-3 text-sm font-semibold text-white hover:bg-black"
            >
              Sign In
            </button>

          </form>

          <div className="mt-5 text-sm">
            <button
              type="button"
              onClick={() =>
                setError("Please contact the studio administrator to reset your password.")
              }
              className="underline"
            >
              Forgot Password?
            </button>
          </div>

          <div className="mt-6 border bg-gray-50 p-4 text-xs leading-5 text-gray-600">
            Both fields are required. Only authorized studio administrators can access the dashboard.
          </div>

          <button
            onClick={onBack}
            className="mt-6 text-sm text-gray-600 underline hover:text-black"
          >
            ← Back to Welcome Page
          </button>

        </div>
      </section>
    </main>
  );
}
