
"use client";

import { useState } from "react";

export const defaultAlterations = [
  {
    id: 1,
    orderId: "DRS-2026-001",
    customer: "Ananya Rao",
    dress: "Anarkali",
    delivery: "2026-11-04",
    issueType: "Fit",
    description: "Waist fitting is slightly snug, needs to be loosened by 0.5 inch.",
    preferredDate: "2026-11-05",
    status: "Reviewed",
    createdAt: "2026-10-31T11:30:00.000Z",
  },
  {
    id: 2,
    orderId: "DRS-2026-003",
    customer: "Kavya N.",
    dress: "Lehenga",
    delivery: "2026-11-08",
    issueType: "Length",
    description: "Skirt hemline touches the floor when walking, needs 1.5 inch reduction in length.",
    preferredDate: "2026-11-09",
    status: "Submitted",
    createdAt: "2026-11-01T14:15:00.000Z",
  },
  {
    id: 3,
    orderId: "DRS-2026-002",
    customer: "Meera Shetty",
    dress: "Party gown",
    delivery: "2026-11-06",
    issueType: "Design",
    description: "Requesting to add delicate pearl tassels to the back tie ribbons.",
    preferredDate: "2026-11-07",
    status: "Resolved",
    createdAt: "2026-10-30T09:45:00.000Z",
  },
];

export const defaultFeedback = [
  {
    id: 1,
    orderId: "DRS-2026-001",
    customer: "Ananya Rao",
    rating: 5,
    comments: "Exquisite golden threadwork and premium silk fabric! The outfit exceeded my expectations for the reception.",
    createdAt: "2026-10-31T17:20:00.000Z",
  },
  {
    id: 2,
    orderId: "DRS-2026-002",
    customer: "Meera Shetty",
    rating: 4,
    comments: "Beautiful georgette drape and stunning pink shade. The studio team was very patient during measurement sessions.",
    createdAt: "2026-11-01T16:00:00.000Z",
  },
  {
    id: 3,
    orderId: "DRS-2026-003",
    customer: "Kavya N.",
    rating: 5,
    comments: "The royal red velvet lehenga feels luxurious. Outstanding craftsmanship by the tailoring team!",
    createdAt: "2026-11-02T10:30:00.000Z",
  },
];

export default function AdminDashboard({
  orders = [],
  alterations = defaultAlterations,
  feedback = defaultFeedback,
  onUpdateAlterationStatus,
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

  const matchesAlterationSearch = (alt) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      alt.orderId?.toLowerCase().includes(q) ||
      alt.customer?.toLowerCase().includes(q) ||
      alt.dress?.toLowerCase().includes(q) ||
      alt.issueType?.toLowerCase().includes(q) ||
      alt.description?.toLowerCase().includes(q) ||
      alt.status?.toLowerCase().includes(q)
    );
  };

  const matchesFeedbackSearch = (fb) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      fb.orderId?.toLowerCase().includes(q) ||
      fb.customer?.toLowerCase().includes(q) ||
      fb.comments?.toLowerCase().includes(q) ||
      String(fb.rating).includes(q)
    );
  };

  const filteredOrders = activeFilter && activeFilter !== "alterations" && activeFilter !== "feedback"
    ? orders
        .filter((order) => order.status === activeFilter)
        .filter(matchesSearch)
    : [];

  const filteredAlterations = activeFilter === "alterations"
    ? alterations.filter(matchesAlterationSearch)
    : [];

  const filteredFeedback = activeFilter === "feedback"
    ? feedback.filter(matchesFeedbackSearch)
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
    { name: "Alteration Requests", action: () => handleCardClick("alterations") },
    { name: "Customer Feedback", action: () => handleCardClick("feedback") },
  ];

  const formatDate = (dateStr) => {
    if (!dateStr) return "—";
    try {
      return new Date(dateStr).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

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
              placeholder={
                activeFilter === "alterations"
                  ? "Search alteration requests..."
                  : activeFilter === "feedback"
                  ? "Search customer feedback..."
                  : "Search by order ID, customer name, dress type, date..."
              }
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
          {activeFilter && activeFilter !== "alterations" && activeFilter !== "feedback" && (
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

          {/* Alteration Requests List — shown when alterations card is active */}
          {activeFilter === "alterations" && (
            <div className="mb-8">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-base font-bold">
                  Alteration Requests ({filteredAlterations.length})
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
                      <th className="border-b px-4 py-3">Customer</th>
                      <th className="border-b px-4 py-3">Dress</th>
                      <th className="border-b px-4 py-3">Issue Type</th>
                      <th className="border-b px-4 py-3">Description</th>
                      <th className="border-b px-4 py-3">Preferred Date</th>
                      <th className="border-b px-4 py-3">Status</th>
                      <th className="border-b px-4 py-3">Submitted</th>
                      <th className="border-b px-4 py-3">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredAlterations.map((alt) => (
                      <tr key={alt.id} className="hover:bg-gray-50">

                        <td className="border-b px-4 py-4">
                          {alt.orderId}
                        </td>

                        <td className="border-b px-4 py-4">
                          {alt.customer}
                        </td>

                        <td className="border-b px-4 py-4">
                          {alt.dress}
                        </td>

                        <td className="border-b px-4 py-4">
                          <span className="rounded bg-orange-100 px-2 py-1 text-xs font-semibold text-orange-800">
                            {alt.issueType}
                          </span>
                        </td>

                        <td className="border-b px-4 py-4 max-w-[200px] truncate" title={alt.description}>
                          {alt.description}
                        </td>

                        <td className="border-b px-4 py-4">
                          {alt.preferredDate}
                        </td>

                        <td className="border-b px-4 py-4">
                          <span
                            className={`rounded px-2 py-1 text-xs font-semibold ${
                              alt.status === "Submitted"
                                ? "bg-yellow-100 text-yellow-800"
                                : alt.status === "Reviewed"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-green-100 text-green-800"
                            }`}
                          >
                            {alt.status}
                          </span>
                        </td>

                        <td className="border-b px-4 py-4 text-xs text-gray-500">
                          {formatDate(alt.createdAt)}
                        </td>

                        <td className="border-b px-4 py-4">
                          <select
                            value={alt.status}
                            onChange={(e) => onUpdateAlterationStatus?.(alt.id, e.target.value)}
                            className="rounded border border-gray-300 bg-white px-2 py-1 text-xs font-semibold outline-none focus:border-black cursor-pointer"
                          >
                            <option value="Submitted">Submitted</option>
                            <option value="Reviewed">Reviewed</option>
                            <option value="Resolved">Resolved</option>
                          </select>
                        </td>

                      </tr>
                    ))}

                    {filteredAlterations.length === 0 && (
                      <tr>
                        <td colSpan="9" className="px-4 py-8 text-center text-gray-500">
                          No alteration requests found.
                        </td>
                      </tr>
                    )}

                  </tbody>

                </table>

              </div>
            </div>
          )}

          {/* Customer Feedback List — shown when feedback card is active */}
          {activeFilter === "feedback" && (
            <div className="mb-8">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-base font-bold">
                  Customer Feedback ({filteredFeedback.length})
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
                      <th className="border-b px-4 py-3">Customer</th>
                      <th className="border-b px-4 py-3">Rating</th>
                      <th className="border-b px-4 py-3">Comments</th>
                      <th className="border-b px-4 py-3">Submitted</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredFeedback.map((fb) => (
                      <tr key={fb.id} className="hover:bg-gray-50">

                        <td className="border-b px-4 py-4">
                          {fb.orderId}
                        </td>

                        <td className="border-b px-4 py-4">
                          {fb.customer}
                        </td>

                        <td className="border-b px-4 py-4">
                          <span className="text-yellow-500">
                            {"★".repeat(fb.rating)}
                          </span>
                          <span className="text-gray-300">
                            {"★".repeat(5 - fb.rating)}
                          </span>
                          <span className="ml-2 text-xs text-gray-500">
                            {fb.rating}/5
                          </span>
                        </td>

                        <td className="border-b px-4 py-4 max-w-[300px] truncate" title={fb.comments}>
                          {fb.comments}
                        </td>

                        <td className="border-b px-4 py-4 text-xs text-gray-500">
                          {formatDate(fb.createdAt)}
                        </td>

                      </tr>
                    ))}

                    {filteredFeedback.length === 0 && (
                      <tr>
                        <td colSpan="5" className="px-4 py-8 text-center text-gray-500">
                          No customer feedback found.
                        </td>
                      </tr>
                    )}

                  </tbody>

                </table>

              </div>
            </div>
          )}

          {/* Recent Orders — hidden when any filter is active */}
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

          {/* Summary cards — Alteration Requests & Customer Feedback */}
          <div className="mt-5 grid gap-4 sm:grid-cols-2">

            <div
              onClick={() => handleCardClick("alterations")}
              className={`cursor-pointer border p-4 transition-all hover:shadow-md ${
                activeFilter === "alterations"
                  ? "border-orange-500 bg-orange-50 ring-2 ring-orange-300"
                  : "border-gray-300 hover:border-gray-400"
              }`}
            >
              <p className="text-sm font-semibold">
                Alteration Requests
              </p>
              <p className="mt-2 text-2xl font-bold">
                {String(alterations.length).padStart(2, "0")}
              </p>
              <p className="mt-2 text-xs text-gray-500">
                Click to view
              </p>
            </div>

            <div
              onClick={() => handleCardClick("feedback")}
              className={`cursor-pointer border p-4 transition-all hover:shadow-md ${
                activeFilter === "feedback"
                  ? "border-purple-500 bg-purple-50 ring-2 ring-purple-300"
                  : "border-gray-300 hover:border-gray-400"
              }`}
            >
              <p className="text-sm font-semibold">
                Customer Feedback
              </p>
              <p className="mt-2 text-2xl font-bold">
                {String(feedback.length).padStart(2, "0")}
              </p>
              <p className="mt-2 text-xs text-gray-500">
                Click to view
              </p>
            </div>

          </div>

        </section>
      </div>

    </main>
  );
}
