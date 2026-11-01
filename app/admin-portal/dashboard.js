
"use client";

import { useState } from "react";

export default function AdminDashboard({
  orders,
  alterations = [],
  feedback = [],
  onAddOrder,
  onUpdateStatus,
  onStyleGallery,
  onLogout,
}) {
  const [activeFilter, setActiveFilter] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const pending = orders.filter(
    (order) => order.status === "Pending"
  ).length;

  const inProgress = orders.filter(
    (order) => order.status === "In Progress"
  ).length;

  const completed = orders.filter(
    (order) => order.status === "Completed"
  ).length;

  const matchesSearch = (order) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      order.id?.toLowerCase().includes(q) ||
      order.customer?.toLowerCase().includes(q) ||
      order.dress?.toLowerCase().includes(q) ||
      order.delivery?.toLowerCase().includes(q) ||
      order.status?.toLowerCase().includes(q)
    );
  };

  const filteredOrders = activeFilter
    ? orders
        .filter((order) => order.status === activeFilter)
        .filter(matchesSearch)
    : [];

  const recentOrders = [...orders]
    .filter(matchesSearch)
    .slice(-3)
    .reverse();

  const handleCardClick = (status) => {
    setActiveFilter((prev) => (prev === status ? null : status));
    setSearchQuery("");
  };

  const menuItems = [
    { name: "Dashboard", action: null },
    { name: "Add Customer/Order", action: onAddOrder },
    { name: "All Orders", action: onUpdateStatus },
    { name: "Update Status", action: onUpdateStatus },
    { name: "Style Gallery", action: onStyleGallery },
    { name: "Alteration Requests", action: null },
    { name: "Customer Feedback", action: null },
  ];

  return (
    <main className="min-h-screen bg-white text-gray-800">

      <div className="flex min-h-[calc(100vh-65px)]">

        {/* Sidebar */}
        <aside className="w-56 shrink-0 border-r border-gray-300 bg-gray-100 p-4">

          <h3 className="mb-4 text-xs font-bold uppercase tracking-wide text-gray-500">
            ADMIN MENU
          </h3>

          <nav className="space-y-2">

            {menuItems.map((item) => (
              <button
                key={item.name}
                onClick={item.action || undefined}
                className={`block w-full px-3 py-3 text-left text-sm ${
                  item.name === "Dashboard"
                    ? "border-l-4 border-black bg-white font-bold"
                    : "hover:bg-white"
                }`}
              >
                {item.name}

                {item.name === "Dashboard" && (
                  <span className="block text-xs text-gray-500">
                  </span>
                )}

                {item.name === "Add Customer/Order" && (
                  <span className="block text-xs text-gray-500">
                  </span>
                )}

                {item.name === "Style Gallery" && (
                  <span className="block text-xs text-gray-500">
                  </span>
                )}
              </button>
            ))}

            <button
              onClick={onLogout}
              className="block w-full px-3 py-3 text-left text-sm hover:bg-white"
            >
              Logout
              <span className="block text-xs text-gray-500">
              </span>
            </button>

          </nav>

        </aside>

        {/* Main Dashboard */}
        <section className="min-w-0 flex-1 p-6">

          {/* Heading */}
          <div className="mb-7 flex flex-wrap items-center justify-between gap-4">

            <div>
              <h1 className="text-2xl font-bold">
                Admin Dashboard
              </h1>
            </div>

          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by order ID, customer name, dress type, date..."
              className="w-full border border-gray-300 px-4 py-3 text-sm outline-none focus:border-black"
            />
          </div>

          {/* Order Overview */}
          <h2 className="mb-3 text-base font-bold">
            Order overview
          </h2>

          <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">

            <div
              onClick={() => handleCardClick("Pending")}
              className={`cursor-pointer border p-5 transition-all hover:shadow-md ${
                activeFilter === "Pending"
                  ? "border-yellow-500 bg-yellow-50 ring-2 ring-yellow-300"
                  : "border-gray-300 hover:border-gray-400"
              }`}
            >
              <p className="text-sm font-semibold">
                Pending
              </p>

              <h3 className="mt-2 text-3xl font-bold">
                {String(pending).padStart(2, "0")}
              </h3>

              <p className="mt-2 text-xs text-gray-500">
                Click to view
              </p>
            </div>

            <div
              onClick={() => handleCardClick("In Progress")}
              className={`cursor-pointer border p-5 transition-all hover:shadow-md ${
                activeFilter === "In Progress"
                  ? "border-blue-500 bg-blue-50 ring-2 ring-blue-300"
                  : "border-gray-300 hover:border-gray-400"
              }`}
            >
              <p className="text-sm font-semibold">
                In Progress
              </p>

              <h3 className="mt-2 text-3xl font-bold">
                {String(inProgress).padStart(2, "0")}
              </h3>

              <p className="mt-2 text-xs text-gray-500">
                Click to view
              </p>
            </div>

            <div
              onClick={() => handleCardClick("Completed")}
              className={`cursor-pointer border p-5 transition-all hover:shadow-md ${
                activeFilter === "Completed"
                  ? "border-green-500 bg-green-50 ring-2 ring-green-300"
                  : "border-gray-300 hover:border-gray-400"
              }`}
            >
              <p className="text-sm font-semibold">
                Completed
              </p>

              <h3 className="mt-2 text-3xl font-bold">
                {String(completed).padStart(2, "0")}
              </h3>

              <p className="mt-2 text-xs text-gray-500">
                Click to view
              </p>
            </div>

          </div>

          {/* Filtered Orders List — shown when a status card is active */}
          {activeFilter && (
            <div className="mb-8">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-base font-bold">
                  {activeFilter} Orders ({filteredOrders.length})
                </h2>

                <button
                  onClick={() => setActiveFilter(null)}
                  className="text-xs text-gray-500 underline hover:text-gray-800"
                >
                  Close
                </button>
              </div>

              <div className="overflow-x-auto border border-gray-300">

                <table className="w-full min-w-[750px] text-left text-sm">

                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border-b px-4 py-3">Order ID</th>
                      <th className="border-b px-4 py-3">Customer name</th>
                      <th className="border-b px-4 py-3">Dress type</th>
                      <th className="border-b px-4 py-3">Delivery date</th>
                      <th className="border-b px-4 py-3">Status</th>
                      <th className="border-b px-4 py-3">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50">

                        <td className="border-b px-4 py-4">
                          {order.id}
                        </td>

                        <td className="border-b px-4 py-4">
                          {order.customer}
                        </td>

                        <td className="border-b px-4 py-4">
                          {order.dress}
                        </td>

                        <td className="border-b px-4 py-4">
                          {order.delivery}
                        </td>

                        <td className="border-b px-4 py-4">
                          <span
                            className={`rounded px-2 py-1 text-xs font-semibold ${
                              order.status === "Pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : order.status === "In Progress"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-green-100 text-green-800"
                            }`}
                          >
                            {order.status}
                          </span>
                        </td>

                        <td className="border-b px-4 py-4">
                          <button
                            onClick={onUpdateStatus}
                            className="underline hover:text-blue-700"
                          >
                            Open
                          </button>
                        </td>

                      </tr>
                    ))}

                    {filteredOrders.length === 0 && (
                      <tr>
                        <td colSpan="6" className="px-4 py-8 text-center text-gray-500">
                          No {activeFilter.toLowerCase()} orders found.
                        </td>
                      </tr>
                    )}

                  </tbody>

                </table>

              </div>
            </div>
          )}

          {/* Recent Orders — hidden when a status filter is active */}
          {!activeFilter && (
            <>
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-base font-bold">
                  Recent orders
                </h2>

                <span className="text-xs text-gray-500">
                  {recentOrders.length} recent orders
                </span>
              </div>

              <div className="overflow-x-auto border border-gray-300">

                <table className="w-full min-w-[750px] text-left text-sm">

                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border-b px-4 py-3">Order ID</th>
                      <th className="border-b px-4 py-3">Customer name</th>
                      <th className="border-b px-4 py-3">Dress type</th>
                      <th className="border-b px-4 py-3">Delivery date</th>
                      <th className="border-b px-4 py-3">Status</th>
                      <th className="border-b px-4 py-3">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {recentOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50">

                        <td className="border-b px-4 py-4">
                          {order.id}
                        </td>

                        <td className="border-b px-4 py-4">
                          {order.customer}
                        </td>

                        <td className="border-b px-4 py-4">
                          {order.dress}
                        </td>

                        <td className="border-b px-4 py-4">
                          {order.delivery}
                        </td>

                        <td className="border-b px-4 py-4">
                          <span
                            className={`rounded px-2 py-1 text-xs font-semibold ${
                              order.status === "Pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : order.status === "In Progress"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-green-100 text-green-800"
                            }`}
                          >
                            {order.status}
                          </span>
                        </td>

                        <td className="border-b px-4 py-4">
                          <button
                            onClick={onUpdateStatus}
                            className="underline hover:text-blue-700"
                          >
                            Open
                          </button>
                        </td>

                      </tr>
                    ))}

                    {recentOrders.length === 0 && (
                      <tr>
                        <td colSpan="6" className="px-4 py-8 text-center text-gray-500">
                          No orders available.
                        </td>
                      </tr>
                    )}

                  </tbody>

                </table>

              </div>
            </>
          )}

          {/* Summary of other dashboard records */}
          <div className="mt-5 grid gap-4 sm:grid-cols-2">

            <div className="border border-gray-300 p-4">
              <p className="text-sm font-semibold">
                Alteration Requests
              </p>
              <p className="mt-2 text-2xl font-bold">
                {alterations.length}
              </p>
            </div>

            <div className="border border-gray-300 p-4">
              <p className="text-sm font-semibold">
                Customer Feedback
              </p>
              <p className="mt-2 text-2xl font-bold">
                {feedback.length}
              </p>
            </div>

          </div>

        </section>
      </div>

    </main>
  );
}
