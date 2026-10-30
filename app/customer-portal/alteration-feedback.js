
"use client";

import { useState } from "react";

export default function AlterationFeedback({
  order,
  onSubmitAlteration,
  onSubmitFeedback,
  onBack,
}) {
  const [activeTab, setActiveTab] = useState("alteration");

  const [alteration, setAlteration] = useState({
    issueType: "",
    description: "",
    preferredDate: "",
  });

  const [feedback, setFeedback] = useState({
    rating: 0,
    comments: "",
  });

  const [alterationMessage, setAlterationMessage] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [error, setError] = useState("");

  const today = new Date().toISOString().split("T")[0];

  const updateAlteration = (e) => {
    const { name, value } = e.target;

    setAlteration((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const updateFeedback = (e) => {
    const { name, value } = e.target;

    setFeedback((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleAlterationSubmit = (e) => {
    e.preventDefault();
    setError("");
    setAlterationMessage("");

    if (!order) {
      setError("Order information is unavailable.");
      return;
    }

    if (
      !alteration.issueType ||
      !alteration.description.trim() ||
      !alteration.preferredDate
    ) {
      setError("Please complete all alteration request fields.");
      return;
    }

    if (alteration.preferredDate < today) {
      setError("Please select today or a future preferred date.");
      return;
    }

    onSubmitAlteration({
      orderId: order.id || order.orderId,
      customer: order.customer,
      dress: order.dress,
      delivery: order.delivery,
      issueType: alteration.issueType,
      description: alteration.description.trim(),
      preferredDate: alteration.preferredDate,
      status: "Submitted",
      createdAt: new Date().toISOString(),
    });

    setAlteration({
      issueType: "",
      description: "",
      preferredDate: "",
    });

    setAlterationMessage(
      "Your alteration request has been submitted successfully."
    );
  };

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    setError("");
    setFeedbackMessage("");

    if (!order) {
      setError("Order information is unavailable.");
      return;
    }

    if (feedback.rating < 1 || feedback.rating > 5) {
      setError("Please select a rating between 1 and 5 stars.");
      return;
    }

    if (!feedback.comments.trim()) {
      setError("Please enter your feedback comments.");
      return;
    }

    onSubmitFeedback({
      orderId: order.id || order.orderId,
      customer: order.customer,
      rating: feedback.rating,
      comments: feedback.comments.trim(),
      createdAt: new Date().toISOString(),
    });

    setFeedback({
      rating: 0,
      comments: "",
    });

    setFeedbackMessage(
      "Thank you! Your feedback has been submitted successfully."
    );
  };

  if (!order) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-100 p-5">
        <div className="max-w-md border bg-white p-8 text-center">
          <h2 className="text-xl font-bold">Order Not Found</h2>
          <p className="mt-3 text-sm text-gray-500">
            Please return to the customer portal and search for your order again.
          </p>
          <button
            onClick={onBack}
            className="mt-5 bg-black px-5 py-3 text-sm text-white"
          >
            Back
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 text-gray-800">

      {/* Header */}
      <header className="flex flex-wrap items-center justify-between gap-4 border-b bg-white px-6 py-5">
        <div>
          <h1 className="text-xl font-bold">
            Custom Made Designer Dress
          </h1>
          <p className="text-xs text-gray-500">
            Customer Portal
          </p>
        </div>

        <button
          onClick={onBack}
          className="border border-gray-400 px-4 py-2 text-sm hover:bg-gray-100"
        >
          Back to My Order
        </button>
      </header>

      <section className="mx-auto max-w-3xl px-5 py-8">

        <h2 className="text-2xl font-bold">
          Alteration Request and Feedback
        </h2>

        <p className="mb-6 mt-2 text-sm text-gray-500">
          Submit an alteration request or share your experience with our studio.
        </p>

        {/* Order Information */}
        <div className="mb-6 grid gap-4 border border-gray-200 bg-white p-5 sm:grid-cols-3">
          <div>
            <p className="text-xs text-gray-500">ORDER ID</p>
            <p className="mt-1 font-semibold">
              {order.id || order.orderId}
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-500">CUSTOMER</p>
            <p className="mt-1 font-semibold">
              {order.customer}
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-500">DRESS</p>
            <p className="mt-1 font-semibold">
              {order.dress}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6 flex border-b border-gray-300">
          <button
            type="button"
            onClick={() => {
              setActiveTab("alteration");
              setError("");
            }}
            className={`px-5 py-3 text-sm font-semibold ${
              activeTab === "alteration"
                ? "border-b-2 border-black text-black"
                : "text-gray-500"
            }`}
          >
            Alteration Request
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab("feedback");
              setError("");
            }}
            className={`px-5 py-3 text-sm font-semibold ${
              activeTab === "feedback"
                ? "border-b-2 border-black text-black"
                : "text-gray-500"
            }`}
          >
            Customer Feedback
          </button>
        </div>

        {/* Alteration Form */}
        {activeTab === "alteration" && (
          <form
            onSubmit={handleAlterationSubmit}
            className="space-y-5 border border-gray-200 bg-white p-6"
          >
            <h3 className="text-lg font-bold">
              Submit Alteration Request
            </h3>

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Order ID
              </label>
              <input
                value={order.id || order.orderId}
                readOnly
                className="w-full border border-gray-300 bg-gray-100 px-4 py-3 text-sm"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Issue Type *
              </label>
              <select
                name="issueType"
                value={alteration.issueType}
                onChange={updateAlteration}
                required
                className="w-full border border-gray-300 px-4 py-3 text-sm"
              >
                <option value="">Select issue type</option>
                <option value="Fit">Fit</option>
                <option value="Length">Length</option>
                <option value="Design">Design</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Describe the issue *
              </label>
              <textarea
                name="description"
                value={alteration.description}
                onChange={updateAlteration}
                rows={4}
                required
                placeholder="Explain what needs to be altered..."
                className="w-full border border-gray-300 px-4 py-3 text-sm"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Preferred Visit / Pickup Date *
              </label>
              <input
                type="date"
                name="preferredDate"
                min={today}
                value={alteration.preferredDate}
                onChange={updateAlteration}
                required
                className="w-full border border-gray-300 px-4 py-3 text-sm"
              />
            </div>

            {alterationMessage && (
              <p className="bg-green-50 p-3 text-sm text-green-700">
                {alterationMessage}
              </p>
            )}

            <button
              type="submit"
              className="bg-black px-6 py-3 text-sm font-semibold text-white hover:bg-gray-800"
            >
              Submit Request
            </button>
          </form>
        )}

        {/* Feedback Form */}
        {activeTab === "feedback" && (
          <form
            onSubmit={handleFeedbackSubmit}
            className="space-y-5 border border-gray-200 bg-white p-6"
          >
            <h3 className="text-lg font-bold">
              Share Your Feedback
            </h3>

            <div>
              <label className="mb-3 block text-sm font-semibold">
                Rate Your Experience *
              </label>

              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() =>
                      setFeedback((previous) => ({
                        ...previous,
                        rating: star,
                      }))
                    }
                    aria-label={`Rate ${star} out of 5 stars`}
                    className={`text-3xl ${
                      feedback.rating >= star
                        ? "text-yellow-500"
                        : "text-gray-300"
                    }`}
                  >
                    ★
                  </button>
                ))}
              </div>

              <p className="mt-2 text-xs text-gray-500">
                {feedback.rating
                  ? `${feedback.rating} out of 5 stars selected`
                  : "Select a rating"}
              </p>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Comments *
              </label>

              <textarea
                name="comments"
                value={feedback.comments}
                onChange={updateFeedback}
                rows={5}
                required
                placeholder="Tell us about your experience..."
                className="w-full border border-gray-300 px-4 py-3 text-sm"
              />
            </div>

            {feedbackMessage && (
              <p className="bg-green-50 p-3 text-sm text-green-700">
                {feedbackMessage}
              </p>
            )}

            <button
              type="submit"
              className="bg-black px-6 py-3 text-sm font-semibold text-white hover:bg-gray-800"
            >
              Submit Feedback
            </button>
          </form>
        )}

        {error && (
          <p className="mt-4 border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {error}
          </p>
        )}

        {/* Alteration Status Information */}
        {activeTab === "alteration" && (
          <div className="mt-6 border border-gray-200 bg-white p-5">
            <h3 className="mb-3 font-bold">
              Alteration Request Status
            </h3>

            <div className="flex flex-wrap gap-3 text-sm">
              <span className="bg-yellow-100 px-3 py-2 text-yellow-800">
                Submitted
              </span>
              <span className="bg-gray-100 px-3 py-2 text-gray-500">
                Reviewed
              </span>
              <span className="bg-gray-100 px-3 py-2 text-gray-500">
                Resolved
              </span>
            </div>

            <p className="mt-3 text-xs text-gray-500">
              Your request will initially appear as Submitted. The studio can review it and update its progress.
            </p>
          </div>
        )}

      </section>
    </main>
  );
}
