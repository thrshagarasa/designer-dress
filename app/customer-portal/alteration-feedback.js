
"use client";

import { useState } from "react";

export default function AlterationFeedback({
  order,
  initialTab = "alteration",
  onSubmitAlteration,
  onSubmitFeedback,
  onBack,
}) {
  const [activeForm, setActiveForm] = useState(initialTab);

  const [alteration, setAlteration] = useState({
    issueType: "",
    description: "",
    preferredDate: "",
  });

  const [feedback, setFeedback] = useState({
    rating: 0,
    resolution: "",
    comments: "",
  });

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [alterationSubmitted, setAlterationSubmitted] = useState(false);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  // UPDATE ALTERATION FIELDS
  const updateAlteration = (e) => {
    const { name, value } = e.target;

    setAlteration((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // UPDATE FEEDBACK FIELDS
  const updateFeedback = (e) => {
    const { name, value } = e.target;

    setFeedback((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // SUBMIT ALTERATION
  const handleAlterationSubmit = (e) => {
    e.preventDefault();

    setError("");
    setSuccessMessage("");

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

    const alterationData = {
      orderId: order.id || order.orderId,
      customer: order.customer,
      dress: order.dress,
      delivery: order.delivery,
      issueType: alteration.issueType,
      description: alteration.description.trim(),
      preferredDate: alteration.preferredDate,
      status: "Submitted",
      createdAt: new Date().toISOString(),
    };

    onSubmitAlteration?.(alterationData);

    setAlterationSubmitted(true);

    setSuccessMessage(
      "Your alteration request has been submitted successfully."
    );

    // AUTOMATICALLY OPEN FEEDBACK FORM
    setActiveForm("feedback");
    setError("");
  };

  // SUBMIT FEEDBACK
  const handleFeedbackSubmit = (e) => {
    e.preventDefault();

    setError("");
    setSuccessMessage("");

    if (!order) {
      setError("Order information is unavailable.");
      return;
    }

    if (feedback.rating < 1 || feedback.rating > 5) {
      setError("Please select a rating between 1 and 5 stars.");
      return;
    }

    if (!feedback.resolution) {
      setError("Please tell us whether your problem has been solved.");
      return;
    }

    if (!feedback.comments.trim()) {
      setError("Please enter your feedback comments.");
      return;
    }

    const feedbackData = {
      orderId: order.id || order.orderId,
      customer: order.customer,
      rating: feedback.rating,
      resolution: feedback.resolution,
      comments: feedback.comments.trim(),
      createdAt: new Date().toISOString(),
    };

    onSubmitFeedback?.(feedbackData);

    setFeedbackSubmitted(true);

    setSuccessMessage(
      "Thank you! Your feedback has been submitted successfully."
    );
  };

  // ORDER NOT FOUND
  if (!order) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-100 p-5">
        <div className="max-w-md border border-gray-300 bg-white p-8 text-center">

          <h2 className="text-xl font-bold">
            Order Not Found
          </h2>

          <p className="mt-3 text-sm text-gray-500">
            Please return to the customer portal and search for your order again.
          </p>

          <button
            type="button"
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

      {/* HEADER */}
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-300 bg-white px-6 py-5">

        <div>
          <h1 className="text-xl font-bold text-black">
            {activeForm === "alteration"
              ? "Alteration Request"
              : "Customer Feedback"}
          </h1>
        </div>

        <button
          type="button"
          onClick={onBack}
          className="border border-gray-400 px-4 py-2 text-sm hover:bg-gray-100"
        >
          Back to My Order
        </button>

      </header>

      <section className="mx-auto max-w-3xl px-5 py-8">

        {/* ORDER INFORMATION */}
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

        {/* SUCCESS MESSAGE */}
        {successMessage && (
          <div className="mb-5 border border-green-200 bg-green-50 p-4 text-sm text-green-800">
            {successMessage}
          </div>
        )}

        {/* ALTERATION FORM */}
        {activeForm === "alteration" && (

          <form
            onSubmit={handleAlterationSubmit}
            className="space-y-5 border border-gray-200 bg-white p-6"
          >

            <h2 className="text-lg font-bold text-black">
              Submit Alteration Request
            </h2>

            {/* ORDER ID */}
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

            {/* ISSUE TYPE */}
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

            {/* DESCRIPTION */}
            <div>
              <label className="mb-2 block text-sm font-semibold">
                Describe the Issue *
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

            {/* PREFERRED DATE */}
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

            {error && (
              <p className="border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={alterationSubmitted}
              className="bg-black px-6 py-3 text-sm font-semibold text-white hover:bg-gray-800 disabled:opacity-50"
            >
              Submit Request
            </button>

          </form>
        )}

        {/* FEEDBACK FORM */}
        {activeForm === "feedback" && (

          <form
            onSubmit={handleFeedbackSubmit}
            className="space-y-5 border border-gray-200 bg-white p-6"
          >

            <h2 className="text-lg font-bold text-black">
              Share Your Feedback
            </h2>

            <p className="text-sm text-gray-500">
              Has your problem been solved? Please share your experience with us.
            </p>

            {/* RATING */}
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

            {/* PROBLEM RESOLUTION */}
            <div>
              <label className="mb-2 block text-sm font-semibold">
                Has Your Problem Been Solved? *
              </label>

              <select
                name="resolution"
                value={feedback.resolution}
                onChange={updateFeedback}
                required
                className="w-full border border-gray-300 px-4 py-3 text-sm"
              >
                <option value="">Select your response</option>

                <option value="Yes, my problem has been solved.">
                  Yes, my problem has been solved.
                </option>

                <option value="My problem has been partially solved.">
                  My problem has been partially solved.
                </option>

                <option value="No, my problem has not been solved.">
                  No, my problem has not been solved.
                </option>

              </select>
            </div>

            {/* COMMENTS */}
            <div>
              <label className="mb-2 block text-sm font-semibold">
                Additional Comments *
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

            {error && (
              <p className="border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={feedbackSubmitted}
              className="bg-black px-6 py-3 text-sm font-semibold text-white hover:bg-gray-800 disabled:opacity-50"
            >
              Submit Feedback
            </button>

          </form>
        )}

      </section>
    </main>
  );
}
