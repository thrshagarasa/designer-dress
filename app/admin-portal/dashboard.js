
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
  initialFilter = null,
  onUpdateAlterationStatus,
  onAddOrder,
  onAllOrders,
  onLogout,
}) {
  const [activeFilter, setActiveFilter] = useState(initialFilter);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAlteration, setSelectedAlteration] = useState(null);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);

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

  const filteredAlterations =
    activeFilter === "alterations"
      ? alterations.filter(matchesAlterationSearch)
      : [];

  const filteredFeedback =
    activeFilter === "feedback"
      ? feedback.filter(matchesFeedbackSearch)
      : [];

  const recentOrders = [...orders]
    .filter(matchesSearch)
    .slice(-3)
    .reverse();

  const menuItems = [
    {
      name: "Dashboard",
      action: () => {
        setActiveFilter(null);
        setSearchQuery("");
        setSelectedAlteration(null);
        setSelectedFeedback(null);
        setSelectedOrder(null);
      },
    },
    { name: "Add Customer/Order", action: onAddOrder },
    { name: "All Orders", action: onAllOrders },
    {
      name: "Alteration Requests",
      action: () => {
        setActiveFilter("alterations");
        setSearchQuery("");
        setSelectedAlteration(null);
        setSelectedFeedback(null);
        setSelectedOrder(null);
      },
    },
    {
      name: "Customer Feedback",
      action: () => {
        setActiveFilter("feedback");
        setSearchQuery("");
        setSelectedAlteration(null);
        setSelectedFeedback(null);
        setSelectedOrder(null);
      },
    },
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

        {/* SIDEBAR */}

        <aside className="w-56 shrink-0 border-r border-gray-300 bg-gray-100 p-4">

          <h3 className="mb-4 text-xs font-bold uppercase tracking-wide text-gray-500">
            ADMIN MENU
          </h3>

          <nav className="space-y-2">

            {menuItems.map((item) => {
              const isActive =
                (item.name === "Dashboard" && !activeFilter) ||
                (item.name === "Alteration Requests" && activeFilter === "alterations") ||
                (item.name === "Customer Feedback" && activeFilter === "feedback");

              return (
                <button
                  key={item.name}
                  onClick={item.action || undefined}
                  className={`block w-full px-3 py-3 text-left text-sm ${
                    isActive
                      ? "border-l-4 border-black bg-white font-bold"
                      : "hover:bg-white"
                  }`}
                >
                  {item.name}
                </button>
              );
            })}

            <button
              onClick={onLogout}
              className="block w-full px-3 py-3 text-left text-sm hover:bg-white"
            >
              Logout
            </button>

          </nav>

        </aside>

        {/* MAIN CONTENT */}

        <section className="min-w-0 flex-1 p-6">

          {/* VIEW 1: ALTERATION REQUESTS */}

          {activeFilter === "alterations" && (
            <div>

              <div className="mb-6 flex flex-wrap items-center justify-between gap-4">

                <div>
                  <h1 className="text-2xl font-bold">
                    Alteration Requests
                  </h1>

                  <p className="mt-1 text-sm text-gray-500">
                    Showing all customer alteration requests ({filteredAlterations.length}). Click any row to view full description.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setActiveFilter(null);
                    setSearchQuery("");
                    setSelectedAlteration(null);
                  }}
                  className="rounded border border-gray-300 px-3 py-1.5 text-xs font-semibold hover:bg-gray-100"
                >
                  ← Back to Dashboard
                </button>

              </div>

              {/* SEARCH BAR */}

              <div className="mb-6">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search alteration requests by Order ID, customer, dress, issue, status..."
                  className="w-full border border-gray-300 px-4 py-3 text-sm outline-none focus:border-black"
                />
              </div>

              {/* ALTERATION TABLE */}

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
                      <tr
                        key={alt.id}
                        onClick={() => setSelectedAlteration(alt)}
                        className="cursor-pointer transition-colors hover:bg-gray-50"
                      >

                        <td className="border-b px-4 py-4 font-semibold">
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

                        <td className="max-w-[220px] border-b px-4 py-4" title="Click to view full description">
                          <div className="truncate font-medium text-gray-700">
                            {alt.description}
                          </div>
                          <span className="text-[11px] text-blue-600 underline">
                            View description
                          </span>
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

                        <td
                          className="border-b px-4 py-4"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="flex items-center gap-2">

                            <button
                              type="button"
                              onClick={() => setSelectedAlteration(alt)}
                              className="whitespace-nowrap rounded border border-gray-300 px-2.5 py-1 text-xs font-semibold hover:bg-gray-100"
                            >
                              View
                            </button>

                            <select
                              value={alt.status}
                              onChange={(e) =>
                                onUpdateAlterationStatus?.(alt.id, e.target.value)
                              }
                              className="cursor-pointer rounded border border-gray-300 bg-white px-2 py-1 text-xs font-semibold outline-none focus:border-black"
                            >
                              <option value="Submitted">Submitted</option>
                              <option value="Reviewed">Reviewed</option>
                              <option value="Resolved">Resolved</option>
                            </select>

                          </div>
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

          {/* VIEW 2: CUSTOMER FEEDBACK */}

          {activeFilter === "feedback" && (
            <div>

              <div className="mb-6 flex flex-wrap items-center justify-between gap-4">

                <div>
                  <h1 className="text-2xl font-bold">
                    Customer Feedback
                  </h1>

                  <p className="mt-1 text-sm text-gray-500">
                    Showing all customer ratings and feedback reviews ({filteredFeedback.length}). Click any row to view full feedback.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setActiveFilter(null);
                    setSearchQuery("");
                    setSelectedFeedback(null);
                  }}
                  className="rounded border border-gray-300 px-3 py-1.5 text-xs font-semibold hover:bg-gray-100"
                >
                  ← Back to Dashboard
                </button>

              </div>

              {/* SEARCH BAR */}

              <div className="mb-6">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search customer feedback by Order ID, customer, rating, comments..."
                  className="w-full border border-gray-300 px-4 py-3 text-sm outline-none focus:border-black"
                />
              </div>

              {/* FEEDBACK TABLE */}

              <div className="overflow-x-auto border border-gray-300">

                <table className="w-full min-w-[750px] text-left text-sm">

                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border-b px-4 py-3">Order ID</th>
                      <th className="border-b px-4 py-3">Customer</th>
                      <th className="border-b px-4 py-3">Rating</th>
                      <th className="border-b px-4 py-3">Comments / Review</th>
                      <th className="border-b px-4 py-3">Submitted</th>
                      <th className="border-b px-4 py-3">Action</th>
                    </tr>
                  </thead>

                  <tbody>

                    {filteredFeedback.map((fb) => (
                      <tr
                        key={fb.id}
                        onClick={() => setSelectedFeedback(fb)}
                        className="cursor-pointer transition-colors hover:bg-gray-50"
                      >

                        <td className="border-b px-4 py-4 font-semibold">
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

                        <td className="max-w-[300px] border-b px-4 py-4" title="Click to read full feedback">
                          <div className="truncate font-medium text-gray-700">
                            {fb.comments}
                          </div>
                          <span className="text-[11px] text-blue-600 underline">
                            Read full feedback
                          </span>
                        </td>

                        <td className="border-b px-4 py-4 text-xs text-gray-500">
                          {formatDate(fb.createdAt)}
                        </td>

                        <td
                          className="border-b px-4 py-4"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button
                            type="button"
                            onClick={() => setSelectedFeedback(fb)}
                            className="whitespace-nowrap rounded border border-gray-300 px-3 py-1 text-xs font-semibold hover:bg-gray-100"
                          >
                            View Details
                          </button>
                        </td>

                      </tr>
                    ))}

                    {filteredFeedback.length === 0 && (
                      <tr>
                        <td colSpan="6" className="px-4 py-8 text-center text-gray-500">
                          No customer feedback found.
                        </td>
                      </tr>
                    )}

                  </tbody>

                </table>

              </div>

            </div>
          )}

          {/* VIEW 3: STANDARD DASHBOARD */}

          {activeFilter !== "alterations" && activeFilter !== "feedback" && (
            <div>

              {/* HEADING */}

              <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold">
                    Admin Dashboard
                  </h1>
                </div>
              </div>

              {/* SEARCH BAR */}

              <div className="mb-6">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by order ID, customer name, dress type, date..."
                  className="w-full border border-gray-300 px-4 py-3 text-sm outline-none focus:border-black"
                />
              </div>

              {/* ORDER OVERVIEW */}

              <h2 className="mb-3 text-base font-bold">
                Order overview
              </h2>

              <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div
                  className="border border-gray-300 p-5 transition-all hover:border-gray-400 hover:shadow-md"
                >
                  <p className="text-sm font-semibold">
                    Pending
                  </p>

                  <h3 className="mt-2 text-3xl font-bold">
                    {String(pending).padStart(2, "0")}
                  </h3>
                </div>

                <div
                  className="border border-gray-300 p-5 transition-all hover:border-gray-400 hover:shadow-md"
                >
                  <p className="text-sm font-semibold">
                    In Progress
                  </p>

                  <h3 className="mt-2 text-3xl font-bold">
                    {String(inProgress).padStart(2, "0")}
                  </h3>
                </div>

                <div
                  className="border border-gray-300 p-5 transition-all hover:border-gray-400 hover:shadow-md"
                >
                  <p className="text-sm font-semibold">
                    Completed
                  </p>

                  <h3 className="mt-2 text-3xl font-bold">
                    {String(completed).padStart(2, "0")}
                  </h3>
                </div>
              </div>

              {/* Recent Orders */}
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
                        <td className="border-b px-4 py-4">{order.id}</td>
                        <td className="border-b px-4 py-4">{order.customer}</td>
                        <td className="border-b px-4 py-4">{order.dress}</td>
                        <td className="border-b px-4 py-4">{order.delivery}</td>
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
                            type="button"
                            onClick={() => setSelectedOrder(order)}
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
            </div>
          )}

          {/* MODAL 1: ALTERATION DETAILS */}

          {selectedAlteration && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

              <div className="w-full max-w-lg border border-gray-300 bg-white p-6 shadow-2xl">

                <div className="mb-4 flex items-center justify-between border-b pb-3">

                  <h3 className="text-lg font-bold">
                    Alteration Request Details
                  </h3>

                  <button
                    type="button"
                    onClick={() => setSelectedAlteration(null)}
                    className="text-2xl font-bold leading-none text-gray-400 hover:text-black"
                    aria-label="Close"
                  >
                    ×
                  </button>

                </div>

                <div className="space-y-4 text-sm">

                  <div className="grid grid-cols-2 gap-3 border border-gray-200 bg-gray-50 p-3.5">

                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500">
                        Order ID
                      </span>
                      <p className="font-semibold text-gray-900">
                        {selectedAlteration.orderId}
                      </p>
                    </div>

                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500">
                        Customer
                      </span>
                      <p className="font-semibold text-gray-900">
                        {selectedAlteration.customer}
                      </p>
                    </div>

                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500">
                        Dress Type
                      </span>
                      <p className="text-gray-800">
                        {selectedAlteration.dress || "—"}
                      </p>
                    </div>

                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500">
                        Issue Type
                      </span>
                      <p className="font-semibold text-orange-700">
                        {selectedAlteration.issueType}
                      </p>
                    </div>

                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500">
                        Preferred Date
                      </span>
                      <p className="text-gray-800">
                        {selectedAlteration.preferredDate || "—"}
                      </p>
                    </div>

                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500">
                        Submitted Date
                      </span>
                      <p className="text-gray-800">
                        {formatDate(selectedAlteration.createdAt)}
                      </p>
                    </div>

                  </div>

                  <div>
                    <span className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-gray-600">
                      Customer Description / What they have requested:
                    </span>

                    <div className="whitespace-pre-wrap rounded border border-gray-300 bg-gray-50 p-4 text-sm font-medium leading-relaxed text-gray-800">
                      {selectedAlteration.description}
                    </div>
                  </div>

                  <div>

                    <span className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-gray-600">
                      Update Request Status:
                    </span>

                    <select
                      value={selectedAlteration.status}
                      onChange={(e) => {
                        const newStatus = e.target.value;

                        onUpdateAlterationStatus?.(
                          selectedAlteration.id,
                          newStatus
                        );

                        setSelectedAlteration((prev) => ({
                          ...prev,
                          status: newStatus,
                        }));
                      }}
                      className="w-full cursor-pointer rounded border border-gray-300 bg-white px-3 py-2 text-sm font-semibold outline-none focus:border-black"
                    >
                      <option value="Submitted">Submitted</option>
                      <option value="Reviewed">Reviewed</option>
                      <option value="Resolved">Resolved</option>
                    </select>

                  </div>

                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setSelectedAlteration(null)}
                    className="bg-black px-6 py-2.5 text-xs font-semibold text-white hover:bg-gray-800"
                  >
                    Close
                  </button>
                </div>

              </div>

            </div>
          )}

          {/* MODAL 2: CUSTOMER FEEDBACK DETAILS */}

          {selectedFeedback && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

              <div className="w-full max-w-lg border border-gray-300 bg-white p-6 shadow-2xl">

                <div className="mb-4 flex items-center justify-between border-b pb-3">

                  <h3 className="text-lg font-bold">
                    Customer Feedback Review
                  </h3>

                  <button
                    type="button"
                    onClick={() => setSelectedFeedback(null)}
                    className="text-2xl font-bold leading-none text-gray-400 hover:text-black"
                    aria-label="Close"
                  >
                    ×
                  </button>

                </div>

                <div className="space-y-4 text-sm">

                  <div className="grid grid-cols-2 gap-3 border border-gray-200 bg-gray-50 p-3.5">

                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500">
                        Order ID
                      </span>
                      <p className="font-semibold text-gray-900">
                        {selectedFeedback.orderId}
                      </p>
                    </div>

                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500">
                        Customer Name
                      </span>
                      <p className="font-semibold text-gray-900">
                        {selectedFeedback.customer}
                      </p>
                    </div>

                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500">
                        Rating Given
                      </span>

                      <div className="mt-1 flex items-center gap-1">

                        <span className="text-base text-yellow-500">
                          {"★".repeat(selectedFeedback.rating)}
                        </span>

                        <span className="text-base text-gray-300">
                          {"★".repeat(5 - selectedFeedback.rating)}
                        </span>

                        <span className="ml-1 text-xs font-semibold text-gray-600">
                          ({selectedFeedback.rating} / 5)
                        </span>

                      </div>
                    </div>

                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500">
                        Submitted Date
                      </span>
                      <p className="text-gray-800">
                        {formatDate(selectedFeedback.createdAt)}
                      </p>
                    </div>

                  </div>

                  <div>

                    <span className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-gray-600">
                      Feedback Description / Customer Comments:
                    </span>

                    <div className="whitespace-pre-wrap rounded border border-gray-300 bg-gray-50 p-4 text-sm font-medium leading-relaxed text-gray-800">
                      "{selectedFeedback.comments}"
                    </div>

                  </div>

                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setSelectedFeedback(null)}
                    className="bg-black px-6 py-2.5 text-xs font-semibold text-white hover:bg-gray-800"
                  >
                    Close
                  </button>
                </div>

              </div>

            </div>
          )}

          {/* MODAL 3: CUSTOMER ORDER DETAILS */}

          {selectedOrder && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

              <div className="w-full max-w-lg border border-gray-300 bg-white p-6 shadow-xl">

                <div className="mb-5 flex items-center justify-between border-b pb-3">

                  <h2 className="text-xl font-bold">
                    Customer Details
                  </h2>

                  <button
                    type="button"
                    onClick={() => setSelectedOrder(null)}
                    className="text-2xl font-bold text-gray-500 hover:text-black"
                    aria-label="Close"
                  >
                    ×
                  </button>

                </div>

                <div className="space-y-4 text-sm">

                  <p>
                    <strong>Customer Name:</strong>{" "}
                    {selectedOrder.customer}
                  </p>

                  <p>
                    <strong>Order ID:</strong>{" "}
                    {selectedOrder.id}
                  </p>

                  <p>
                    <strong>Dress Type:</strong>{" "}
                    {selectedOrder.dress}
                  </p>

                  <p>
                    <strong>Delivery Date:</strong>{" "}
                    {selectedOrder.delivery}
                  </p>

                  <p>
                    <strong>Order Status:</strong>{" "}
                    {selectedOrder.status}
                  </p>

                </div>

                <div className="mt-6 flex justify-end">

                  <button
                    type="button"
                    onClick={() => setSelectedOrder(null)}
                    className="bg-black px-5 py-2 text-white hover:bg-gray-800"
                  >
                    Close
                  </button>

                </div>

              </div>

            </div>
          )}

        </section>

      </div>

    </main>
  );
}
