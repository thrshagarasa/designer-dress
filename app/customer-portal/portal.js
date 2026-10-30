
"use client";

import { useState } from "react";

export default function CustomerPortal({ onBack, onSearch }) {
  const [customerName, setCustomerName] = useState("");
  const [orderId, setOrderId] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!customerName.trim() || !orderId.trim()) {
      setError("Please enter your name and Order ID.");
      return;
    }

    const result = onSearch(customerName.trim(), orderId.trim());

    if (result === false) {
      setError("Check your name and Order ID.");
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 px-5 py-10">

      <div className="w-full max-w-md border border-gray-300 bg-white p-8 shadow-sm">

        {/* Logo and Heading */}
        <div className="mb-8 text-center">

          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center border border-gray-300 text-xs text-gray-500">
            LOGO
          </div>

          <h1 className="text-2xl font-bold text-gray-800">
            Customer Portal
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Custom Made Designer Dress
          </p>

        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="mb-2 block text-sm font-semibold">
              Customer Full Name *
            </label>

            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Enter your registered full name"
              required
              className="w-full border border-gray-300 px-4 py-3 text-sm outline-none focus:border-black"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold">
              Order ID *
            </label>

            <input
              type="text"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              placeholder="e.g. DRS-2026-001"
              required
              className="w-full border border-gray-300 px-4 py-3 text-sm uppercase outline-none focus:border-black"
            />
          </div>

          {error && (
            <p className="border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-black px-5 py-3 text-sm font-semibold text-white hover:bg-gray-800"
          >
            View My Order
          </button>

        </form>

        {/* Footer */}
        <div className="mt-7 border-t pt-5 text-center">

          <p className="text-xs text-gray-500">
            Enter the name and Order ID provided by the designer studio.
          </p>

          <button
            onClick={onBack}
            className="mt-5 text-sm font-semibold text-gray-700 underline"
          >
            ← Back to Welcome Page
          </button>

        </div>

      </div>

    </main>
  );
}
