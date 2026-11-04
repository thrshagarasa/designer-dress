
"use client";

export default function MyOrder({
  order,
  onAlteration,
  onFeedback,
  onBack,
  onHome,
}) {
  if (!order) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-100 p-5">
        <div className="w-full max-w-md border border-gray-300 bg-white p-8 text-center">
          <h2 className="text-xl font-bold text-black">
            Order Not Found
          </h2>

          <p className="mt-3 text-sm text-gray-500">
            Please check your customer details and Order ID.
          </p>

          <button
            type="button"
            onClick={onBack}
            className="mt-6 bg-black px-5 py-3 text-sm text-white"
          >
            Back to Customer Portal
          </button>
        </div>
      </main>
    );
  }

  const steps = ["Pending", "In Progress", "Completed"];
  const currentStep = steps.indexOf(order.status);

  const statusColors = {
    Pending: "bg-yellow-100 text-yellow-800",
    "In Progress": "bg-blue-100 text-blue-800",
    Completed: "bg-green-100 text-green-800",
  };

  return (
    <main className="min-h-screen bg-gray-100 text-gray-800">

      {/* HEADER */}
      <header className="flex flex-wrap items-center justify-between gap-4 border-b bg-white px-6 py-5">
        <div>
        </div>

        <button
          type="button"
          onClick={onHome}
          className="border border-gray-400 px-4 py-2 text-sm hover:bg-gray-100"
        >
          Back to Welcome
        </button>
      </header>

      <section className="mx-auto max-w-5xl px-5 py-8">

        {/* WELCOME */}
        <div className="mb-7">
          <h2 className="text-2xl font-bold text-black">
            Welcome, {order.customer}
          </h2>
        </div>

        {/* ORDER SUMMARY */}
        <div className="mb-6 grid gap-5 md:grid-cols-2">

          <div className="border border-gray-200 bg-white p-6">
            <p className="text-xs text-gray-500">ORDER ID</p>

            <h3 className="mt-2 text-lg font-bold">
              {order.id || order.orderId}
            </h3>

            <p className="mt-5 text-xs text-gray-500">
              CUSTOMER NAME
            </p>

            <p className="mt-2 font-semibold">
              {order.customer}
            </p>

            <p className="mt-5 text-xs text-gray-500">
              DELIVERY DATE
            </p>

            <p className="mt-2 font-semibold">
              {order.delivery || "Not specified"}
            </p>
          </div>

          <div className="border border-gray-200 bg-white p-6">
            <p className="text-xs text-gray-500">
              CURRENT ORDER STATUS
            </p>

            <span
              className={`mt-3 inline-block px-4 py-2 text-sm font-semibold ${
                statusColors[order.status] ||
                "bg-gray-100 text-gray-700"
              }`}
            >
              {order.status || "Not specified"}
            </span>

            <p className="mt-5 text-xs text-gray-500">
              PROGRESS UPDATE
            </p>

            <p className="mt-2 text-sm leading-6">
              {order.progressNote ||
                "No progress update available yet."}
            </p>
          </div>

        </div>

        {/* DRESS DETAILS */}
        <div className="mb-6 border border-gray-200 bg-white p-6">

          <h3 className="mb-5 text-lg font-bold">
            Dress Details
          </h3>

          <div className="grid gap-6 md:grid-cols-2">

            <div>
              {order.photo ? (
                <img
                  src={order.photo}
                  alt={order.dress || "Customer dress reference"}
                  className="max-h-80 w-full border object-contain"
                />
              ) : (
                <div className="flex h-64 items-center justify-center border bg-gray-50 text-sm text-gray-500">
                  No reference image available
                </div>
              )}
            </div>

            <div className="space-y-4 text-sm">

              <div>
                <p className="text-xs text-gray-500">DRESS TYPE</p>
                <p className="mt-1 font-semibold">
                  {order.dress || "Not specified"}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500">COLOR</p>
                <p className="mt-1 font-semibold">
                  {order.color || "Not specified"}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500">FABRIC</p>
                <p className="mt-1 font-semibold">
                  {order.fabric || "Not specified"}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500">
                  DESIGN DESCRIPTION
                </p>
                <p className="mt-1 leading-6">
                  {order.description || "No description available."}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500">
                  EMBROIDERY
                </p>
                <p className="mt-1">
                  {order.embroidery || "Not specified"}
                </p>
              </div>

            </div>
          </div>
        </div>

        {/* PRODUCTION PROGRESS */}
        <div className="mb-6 border border-gray-200 bg-white p-6">

          <h3 className="mb-6 text-lg font-bold">
            Production Progress
          </h3>

          <div className="space-y-5">

            {steps.map((step, index) => {
              const completed = currentStep >= index;
              const current = currentStep === index;

              return (
                <div key={step} className="flex items-start gap-4">

                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                      completed
                        ? "bg-black text-white"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {completed ? "✓" : index + 1}
                  </div>

                  <div>
                    <p className="font-semibold">
                      {step}
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      {current
                        ? "Current stage"
                        : completed
                        ? "Stage completed"
                        : "Waiting for previous stage"}
                    </p>
                  </div>

                </div>
              );
            })}

          </div>
        </div>

        {/* CUSTOMER ACTIONS */}
        <div className="border border-gray-200 bg-white p-6">

          <h3 className="mb-2 text-lg font-bold">
            Customer Actions
          </h3>

          <p className="mb-5 text-sm text-gray-500">
            Share your feedback or request changes to your dress.
          </p>

          <div className="flex flex-wrap gap-3">

            <button
              type="button"
              onClick={onFeedback}
              className="bg-black px-5 py-3 text-sm font-semibold text-white hover:bg-gray-800"
            >
              Submit
            </button>

            <button
              type="button"
              onClick={onAlteration}
              className="border border-gray-400 px-5 py-3 text-sm font-semibold hover:bg-gray-100"
            >
              Alteration Request
            </button>

            <button
              type="button"
              onClick={onBack}
              className="border border-gray-400 px-5 py-3 text-sm font-semibold hover:bg-gray-100"
            >
              Back
            </button>

          </div>
        </div>

        {/* COMPLETED MESSAGE */}
        {order.status === "Completed" && (
          <p className="mt-5 border border-green-200 bg-green-50 p-4 text-sm text-green-800">
            Your order has been completed. Thank you for choosing our designer studio!
          </p>
        )}

      </section>
    </main>
  );
}
