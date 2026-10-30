
"use client";

export default function AdminDashboard({
  orders,
  alterations = [],
  feedback = [],
  onAddOrder,
  onUpdateStatus,
  onStyleGallery,
  onLogout,
}) {
  const pending = orders.filter(
    (order) => order.status === "Pending"
  ).length;

  const inProgress = orders.filter(
    (order) => order.status === "In Progress"
  ).length;

  const completed = orders.filter(
    (order) => order.status === "Completed"
  ).length;

  const recentOrders = [...orders].slice(-3).reverse();

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

          <p className="mt-8 text-xs leading-5 text-gray-500">
            Numbered destinations are shown in this set. Other menu items are outside these five screens.
          </p>

        </aside>

        {/* Main Dashboard */}
        <section className="min-w-0 flex-1 p-6">

          {/* Heading */}
          <div className="mb-7 flex flex-wrap items-center justify-between gap-4">

            <div>
              <h1 className="text-2xl font-bold">
                Admin Dashboard
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                Manage customers, create dress orders, and monitor the studio's work.
              </p>
            </div>

            <button
              onClick={onAddOrder}
              className="bg-[#333333] px-5 py-3 text-sm font-semibold text-white hover:bg-black"
            >
              + Add Customer/Order
            </button>

          </div>

          {/* Order Overview */}
          <h2 className="mb-3 text-base font-bold">
            Order overview
          </h2>

          <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">

            <div className="border border-gray-300 p-5">
              <p className="text-sm font-semibold">
                Pending
              </p>

              <h3 className="mt-2 text-3xl font-bold">
                {String(pending).padStart(2, "0")}
              </h3>

              <p className="mt-2 text-xs text-gray-500">
                Orders awaiting work
              </p>
            </div>

            <div className="border border-gray-300 p-5">
              <p className="text-sm font-semibold">
                In Progress
              </p>

              <h3 className="mt-2 text-3xl font-bold">
                {String(inProgress).padStart(2, "0")}
              </h3>

              <p className="mt-2 text-xs text-gray-500">
                Orders in production or fitting
              </p>
            </div>

            <div className="border border-gray-300 p-5">
              <p className="text-sm font-semibold">
                Completed
              </p>

              <h3 className="mt-2 text-3xl font-bold">
                {String(completed).padStart(2, "0")}
              </h3>

              <p className="mt-2 text-xs text-gray-500">
                Finished dress orders
              </p>
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
