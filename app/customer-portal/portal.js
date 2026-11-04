
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

      <div className="w-full max-w-md border border-gray-500 bg-white p-8 shadow-md">

        {/* Logo and Heading */}
        <div className="mb-8 text-center">

          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center">
            <img
              src="/designer-logo.png"
              alt="Designer Dress Logo"
              className="h-full w-full object-contain"
            />
          </div>

          <h1 className="mb-2 font-serif text-4xl font-semibold italic tracking-wider text-[#333333] md:text-2xl">
            Designer Boutique
          </h1>

          <p className="mt-2 text-sm text-black">
            Customer Details
          </p>

        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Customer Name */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-black">
              Customer Full Name *
            </label>

            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Enter your registered full name"
              required
              className="w-full border border-gray-300 px-4 py-3 text-sm text-black placeholder:text-gray-500 outline-none focus:border-black"
            />
          </div>

          {/* Order ID */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-black">
              Order ID *
            </label>

            <input
              type="text"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              placeholder="e.g. DRS-2026-001"
              required
              className="w-full border border-gray-300 px-4 py-3 text-sm text-black uppercase placeholder:text-gray-500 outline-none focus:border-black"
            />
          </div>

          {/* Error Message */}
          {error && (
            <p className="border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              {error}
            </p>
          )}

          {/* Submit Button */}
          <button
  type="submit"
  className="w-full bg-black px-5 py-3 text-sm font-semibold text-white no-underline hover:bg-gray-800"
>
  View My Order
</button>

        </form>

        {/* Footer */}
<div className="mt-7 border-t border-gray-300 pt-5 text-left">
          <button
            type="button"
            onClick={onBack}
            className="mt-5 text-sm font-semibold text-black underline"
          >
            ← Back to Welcome Page
          </button>

        </div>

      </div>

    </main>
  );
}
