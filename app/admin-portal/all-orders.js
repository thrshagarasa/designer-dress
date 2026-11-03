"use client";

import { useState } from "react";

export default function AllOrders({
  orders = [],
  onUpdate,
  onDashboard,
  onAddOrder,
  onAlterations,
  onFeedback,
  onLogout,
  onBack,
}) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [editingOrderId, setEditingOrderId] = useState(null);
  const [editForm, setEditForm] = useState({
    status: "",
    progressNote: "",
  });

  const statuses = ["All", "Pending", "In Progress", "Completed"];

  const filteredOrders = orders.filter((order) => {
    const matchesFilter =
      statusFilter === "All" || order.status === statusFilter;

    const q = search.toLowerCase().trim();
    const matchesSearch =
      !q ||
      order.id?.toLowerCase().includes(q) ||
      order.customer?.toLowerCase().includes(q) ||
      order.phone?.toLowerCase().includes(q) ||
      order.dress?.toLowerCase().includes(q) ||
      order.status?.toLowerCase().includes(q) ||
      order.delivery?.toLowerCase().includes(q);

    return matchesFilter && matchesSearch;
  });

  const handleStartEdit = (order) => {
    setEditingOrderId(order.id);
    setEditForm({
      status: order.status,
      progressNote: order.progressNote || "",
    });
  };

  const handleSaveEdit = (order) => {
    onUpdate?.({
      ...order,
      status: editForm.status,
      progressNote: editForm.progressNote,
    });
    setEditingOrderId(null);
  };

  const handleQuickStatusChange = (order, newStatus) => {
    onUpdate?.({
      ...order,
      status: newStatus,
    });
  };

  return (
    <main className="min-h-screen bg-white text-gray-800">

      {/* Header */}
      

      <div className="flex min-h-[calc(100vh-65px)]">

        {/* Sidebar */}
        <aside className="w-56 shrink-0 border-r border-gray-300 bg-gray-100 p-4">
          <h3 className="mb-4 text-xs font-bold uppercase tracking-wide text-gray-500">
            ADMIN MENU
          </h3>

          <nav className="space-y-2">
            <button
              type="button"
              onClick={onDashboard || onBack}
              className="block w-full px-3 py-3 text-left text-sm hover:bg-white"
            >
              Dashboard
            </button>

            <button
              type="button"
              onClick={onAddOrder}
              className="block w-full px-3 py-3 text-left text-sm hover:bg-white"
            >
              Add Customer/Order
            </button>

            <button
              type="button"
              onClick={() => {
                setStatusFilter("All");
                setSearch("");
              }}
              className="block w-full border-l-4 border-black bg-white px-3 py-3 text-left text-sm font-bold"
            >
              All Orders
            </button>

            <button
              type="button"
              onClick={onAlterations || onDashboard || onBack}
              className="block w-full px-3 py-3 text-left text-sm hover:bg-white"
            >
              Alteration Requests
            </button>

            <button
              type="button"
              onClick={onFeedback || onDashboard || onBack}
              className="block w-full px-3 py-3 text-left text-sm hover:bg-white"
            >
              Customer Feedback
            </button>

            <button
              type="button"
              onClick={onLogout || onBack}
              className="block w-full px-3 py-3 text-left text-sm hover:bg-white"
            >
              Logout
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <section className="min-w-0 flex-1 px-5 py-8 md:px-8">

          {/* Heading */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold">
                All Orders
              </h2>
              <p className="mt-1 text-sm text-gray-500">
        
              </p>
            </div>

            
          </div>

          {/* Search and Status Filters */}
          <div className="mb-6 space-y-4">

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by order ID, customer name, phone, dress type..."
              className="w-full border border-gray-300 px-4 py-3 text-sm outline-none focus:border-black"
            />

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-3">
              {statuses.map((status) => {
                const count =
                  status === "All"
                    ? orders.length
                    : orders.filter((o) => o.status === status).length;

                return (
                  <button
                    key={status}
                    type="button"
                    onClick={() => setStatusFilter(status)}
                    className={`rounded px-4 py-2 text-xs font-semibold transition-all ${
                      statusFilter === status
                        ? "bg-black text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {status} ({count})
                  </button>
                );
              })}
            </div>

          </div>

          {/* Edit Order Modal / Inline Form */}
          {editingOrderId && (
            <div className="mb-6 border border-gray-300 bg-gray-50 p-5">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="font-bold">
                  Update Status for Order #{editingOrderId}
                </h3>
                <button
                  type="button"
                  onClick={() => setEditingOrderId(null)}
                  className="text-xs text-gray-500 underline hover:text-gray-800"
                >
                  Cancel
                </button>
              </div>

              {(() => {
                const editingOrder = orders.find((o) => o.id === editingOrderId);
                if (!editingOrder) return null;

                return (
                  <div className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="mb-1 block text-xs font-semibold text-gray-600">
                          Production Status
                        </label>
                        <select
                          value={editForm.status}
                          onChange={(e) =>
                            setEditForm((prev) => ({
                              ...prev,
                              status: e.target.value,
                            }))
                          }
                          className="w-full border border-gray-300 bg-white px-3 py-2 text-sm"
                        >
                          <option value="Pending">Pending</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Completed">Completed</option>
                        </select>
                      </div>

                      <div>
                        <label className="mb-1 block text-xs font-semibold text-gray-600">
                          Customer
                        </label>
                        <p className="border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700">
                          {editingOrder.customer} ({editingOrder.phone || "No phone"})
                        </p>
                      </div>
                    </div>

                    <div>
                      <label className="mb-1 block text-xs font-semibold text-gray-600">
                        Progress Note (Visible to Customer in Portal)
                      </label>
                      <textarea
                        rows={3}
                        value={editForm.progressNote}
                        onChange={(e) =>
                          setEditForm((prev) => ({
                            ...prev,
                            progressNote: e.target.value,
                          }))
                        }
                        placeholder="e.g. Fabric cut. Stitching begins tomorrow."
                        className="w-full border border-gray-300 bg-white p-3 text-sm"
                      />
                    </div>

                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => handleSaveEdit(editingOrder)}
                        className="bg-black px-5 py-2 text-xs font-semibold text-white hover:bg-gray-800"
                      >
                        Save Updates
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingOrderId(null)}
                        className="border border-gray-300 px-4 py-2 text-xs font-semibold hover:bg-white"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {/* Orders Table */}
          <div className="overflow-x-auto border border-gray-300">
            <table className="w-full min-w-[850px] text-left text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border-b px-4 py-3">Order ID</th>
                  <th className="border-b px-4 py-3">Customer</th>
                  <th className="border-b px-4 py-3">Dress Type</th>
                  <th className="border-b px-4 py-3">Delivery Date</th>
                  <th className="border-b px-4 py-3">Price</th>
                  <th className="border-b px-4 py-3">Status</th>
                  <th className="border-b px-4 py-3">Quick Change</th>
                  <th className="border-b px-4 py-3">Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="border-b px-4 py-4 font-semibold">
                      {order.id}
                    </td>

                    <td className="border-b px-4 py-4">
                      <div>{order.customer}</div>
                      {order.phone && (
                        <div className="text-xs text-gray-500">{order.phone}</div>
                      )}
                    </td>

                    <td className="border-b px-4 py-4">
                      <div>{order.dress}</div>
                      {order.fabric && (
                        <div className="text-xs text-gray-500">{order.fabric}</div>
                      )}
                    </td>

                    <td className="border-b px-4 py-4">
                      {order.delivery || "—"}
                    </td>

                    <td className="border-b px-4 py-4 font-medium">
                      {order.price ? `₹${order.price}` : "—"}
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
                      <select
                        value={order.status}
                        onChange={(e) =>
                          handleQuickStatusChange(order, e.target.value)
                        }
                        className="rounded border border-gray-300 bg-white px-2 py-1 text-xs font-semibold outline-none focus:border-black cursor-pointer"
                      >
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </td>

                    <td className="border-b px-4 py-4">
                      <button
                        type="button"
                        onClick={() => handleStartEdit(order)}
                        className="rounded border border-gray-300 px-3 py-1 text-xs font-medium hover:bg-gray-100"
                      >
                        Edit Details
                      </button>
                    </td>
                  </tr>
                ))}

                {filteredOrders.length === 0 && (
                  <tr>
                    <td
                      colSpan="8"
                      className="px-4 py-10 text-center text-gray-500"
                    >
                      No orders found matching the filter.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

        </section>

      </div>

    </main>
  );
}
