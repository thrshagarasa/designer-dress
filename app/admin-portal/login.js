
"use client";

import { useState } from "react";

const ADMIN_EMAIL = "admin@gmail.com";
const ADMIN_PASSWORD = "admin";

export default function AdminLogin({ onBack, onSignIn }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      setError("Please enter both email and password.");
      return;
    }

    if (
      username.trim().toLowerCase() === ADMIN_EMAIL &&
      password === ADMIN_PASSWORD
    ) {
      setError("");
      onSignIn();
    } else {
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <main className="min-h-screen bg-white text-gray-800">
      <section className="flex min-h-[80vh] items-center justify-center px-5 py-8">
        <div className="w-full max-w-md border border-gray-300 p-8">

          <h1 className="mb-2 text-2xl font-bold">
            Admin Login
          </h1>

          <form onSubmit={handleLogin}>
            <label className="mb-2 block text-sm font-semibold">
              Email *
            </label>

            <input
              type="email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter admin email"
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
              placeholder="Enter admin password"
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
                setError(
                  "Please contact the studio administrator to reset your password."
                )
              }
              className="underline"
            >
              Forgot Password?
            </button>
          </div>

          <button
            type="button"
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
