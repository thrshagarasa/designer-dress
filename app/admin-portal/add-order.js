
"use client";

import { useState } from "react";

export default function AddOrder({ onCreateOrder, onBack }) {
  const [formData, setFormData] = useState({
    customer: "",
    phone: "",
    email: "",
    bust: "",
    waist: "",
    hip: "",
    shoulder: "",
    sleeve: "",
    otherMeasurements: "",
    dress: "",
    color: "",
    fabric: "",
    description: "",
    material: "",
    embroidery: "",
    delivery: "",
    price: "",
    photo: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [photoName, setPhotoName] = useState("");

  const today = new Date().toISOString().split("T")[0];

  const updateField = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handlePhoto = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png"];

    if (!allowedTypes.includes(file.type)) {
      setError("Please upload a JPG or PNG image.");
      e.target.value = "";
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError("Reference photo must be less than 10 MB.");
      e.target.value = "";
      return;
    }

    setError("");
    setPhotoName(file.name);

    const reader = new FileReader();

    reader.onload = () => {
      setFormData((previous) => ({
        ...previous,
        photo: reader.result,
      }));
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const requiredMeasurements = [
      "bust",
      "waist",
      "hip",
      "shoulder",
      "sleeve",
    ];

    for (const field of requiredMeasurements) {
      if (Number(formData[field]) <= 0) {
        setError("All required measurements must be positive values.");
        return;
      }
    }

    if (!/^[0-9]{10}$/.test(formData.phone)) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }

    if (formData.delivery <= today) {
      setError("Please select a future delivery date.");
      return;
    }

    if (formData.price && Number(formData.price) <= 0) {
      setError("Estimated price must be a positive amount.");
      return;
    }

    onCreateOrder({
      ...formData,
      createdAt: new Date().toISOString(),
    });

    setSuccess("Order created successfully!");
  };

  const handleDraft = () => {
    const draft = {
      ...formData,
      draft: true,
    };

    try {
      localStorage.setItem("dressOrderDraft", JSON.stringify(draft));
      setSuccess("Draft saved successfully in this browser.");
      setError("");
    } catch {
      setError("Unable to save the draft. The reference photo may be too large.");
    }
  };

  const handleCancel = () => {
    onBack();
  };

  const inputClass =
    "w-full border border-gray-300 px-4 py-3 text-sm outline-none focus:border-black";

  const labelClass =
    "mb-2 block text-sm font-semibold";

  return (
    <main className="min-h-screen bg-white text-gray-800">

      {/* Header */}
      <header className="flex items-center justify-between border-b border-gray-300 px-6 py-4">

        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center border text-xs text-gray-500">
            LOGO
          </div>

          <div>
            <h2 className="text-lg font-bold">
              Custom Made Designer Dress
            </h2>
            <p className="text-xs text-gray-500">
              Designer Studio Management System
            </p>
          </div>
        </div>

        <span className="text-sm text-gray-500">
          Admin Portal / Studio administrator
        </span>

      </header>

      <div className="flex">

        {/* Sidebar */}
        <aside className="hidden w-56 shrink-0 border-r border-gray-300 bg-gray-100 p-4 md:block">

          <h3 className="mb-5 text-xs font-bold text-gray-500">
            ADMIN MENU
          </h3>

          <div className="space-y-4 text-sm">
            <p>Dashboard → Screen 3</p>
            <p className="border-l-4 border-black bg-white p-2 font-bold">
              Add Customer/Order → Screen 4
            </p>
            <p>All Orders</p>
            <p>Update Status</p>
            <p>Style Gallery → Screen 5</p>
            <p>Alteration Requests</p>
            <p>Customer Feedback</p>
          </div>

          <button
            onClick={onBack}
            className="mt-8 text-sm text-gray-600 underline"
          >
            Logout → Screen 1
          </button>

        </aside>

        {/* Form */}
        <section className="min-w-0 flex-1 px-5 py-8 md:px-8">

          <h1 className="text-2xl font-bold">
            Add Customer and Dress Order
          </h1>

          <p className="mb-8 mt-2 text-sm text-gray-500">
            Record customer details, measurements, and design requirements. * Required fields.
          </p>

          <form onSubmit={handleSubmit}>

            {/* Customer Information */}
            <h2 className="mb-4 border-b pb-2 text-lg font-bold">
              Customer information
            </h2>

            <div className="mb-8 grid gap-5 md:grid-cols-3">

              <div>
                <label className={labelClass}>Full name *</label>
                <input
                  name="customer"
                  value={formData.customer}
                  onChange={updateField}
                  placeholder="Enter customer's full name"
                  required
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Phone number *</label>
                <input
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={updateField}
                  placeholder="10-digit mobile number"
                  maxLength={10}
                  required
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Email *</label>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={updateField}
                  placeholder="name@example.com"
                  required
                  className={inputClass}
                />
              </div>

            </div>

            {/* Body Measurements */}
            <h2 className="mb-3 border-b pb-2 text-lg font-bold">
              Body measurements
            </h2>

            <p className="mb-5 text-xs text-gray-500">
              Measurement unit: centimeters (cm). Record body measurements before adding fitting allowances.
            </p>

            <div className="mb-8 grid gap-5 md:grid-cols-3">

              {[
                ["bust", "Bust / chest (cm) *"],
                ["waist", "Waist (cm) *"],
                ["hip", "Hip (cm) *"],
                ["shoulder", "Shoulder (cm) *"],
                ["sleeve", "Sleeve (cm) *"],
              ].map(([name, label]) => (
                <div key={name}>
                  <label className={labelClass}>{label}</label>
                  <input
                    name={name}
                    type="number"
                    min="0.1"
                    step="0.1"
                    value={formData[name]}
                    onChange={updateField}
                    placeholder="Enter value"
                    required
                    className={inputClass}
                  />
                </div>
              ))}

              <div>
                <label className={labelClass}>
                  Other measurements (cm)
                </label>
                <input
                  name="otherMeasurements"
                  value={formData.otherMeasurements}
                  onChange={updateField}
                  placeholder="e.g., neck, armhole, dress length"
                  className={inputClass}
                />
              </div>

            </div>

            {/* Dress Details */}
            <h2 className="mb-4 border-b pb-2 text-lg font-bold">
              Dress details
            </h2>

            <div className="mb-5 grid gap-5 md:grid-cols-3">

              <div>
                <label className={labelClass}>Dress type *</label>
                <select
                  name="dress"
                  value={formData.dress}
                  onChange={updateField}
                  required
                  className={inputClass}
                >
                  <option value="">Select dress type</option>
                  <option>Anarkali</option>
                  <option>Party gown</option>
                  <option>Lehenga</option>
                  <option>Kurta set</option>
                  <option>Saree blouse</option>
                  <option>Custom design</option>
                </select>
              </div>

              <div>
                <label className={labelClass}>Color *</label>
                <input
                  name="color"
                  value={formData.color}
                  onChange={updateField}
                  placeholder="e.g., navy blue"
                  required
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Fabric *</label>
                <input
                  name="fabric"
                  value={formData.fabric}
                  onChange={updateField}
                  placeholder="e.g., silk, cotton, georgette"
                  required
                  className={inputClass}
                />
              </div>

            </div>

            <div className="mb-5">
              <label className={labelClass}>
                Design description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={updateField}
                placeholder="Describe the silhouette, neckline, cut, length, and preferred design details."
                rows={4}
                required
                className={inputClass}
              />
            </div>

            <div className="mb-8 grid gap-5 md:grid-cols-2">

              <div>
                <label className={labelClass}>
                  Material requirements
                </label>
                <textarea
                  name="material"
                  value={formData.material}
                  onChange={updateField}
                  placeholder="Fabric quantity, lining, trims, and customer-supplied materials"
                  rows={3}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>
                  Embroidery
                </label>
                <textarea
                  name="embroidery"
                  value={formData.embroidery}
                  onChange={updateField}
                  placeholder="Placement, pattern, threadwork, or None"
                  rows={3}
                  className={inputClass}
                />
              </div>

            </div>

            {/* Reference Photo */}
            <h2 className="mb-4 border-b pb-2 text-lg font-bold">
              Reference photo upload
            </h2>

            <div className="mb-8 border border-gray-300 p-5">

              <label className={labelClass}>
                REFERENCE PHOTO
              </label>

              <input
                type="file"
                accept=".jpg,.jpeg,.png,image/jpeg,image/png"
                onChange={handlePhoto}
                className="w-full text-sm"
              />

              <p className="mt-2 text-xs text-gray-500">
                Optional · JPG or PNG, up to 10 MB. Attach a sketch or customer reference.
              </p>

              {photoName && (
                <p className="mt-2 text-xs text-green-700">
                  Selected: {photoName}
                </p>
              )}

            </div>

            {/* Order Information */}
            <h2 className="mb-4 border-b pb-2 text-lg font-bold">
              Order information
            </h2>

            <div className="mb-8 grid gap-5 md:grid-cols-3">

              <div>
                <label className={labelClass}>
                  Delivery date *
                </label>
                <input
                  name="delivery"
                  type="date"
                  min={today}
                  value={formData.delivery}
                  onChange={updateField}
                  required
                  className={inputClass}
                />
                <p className="mt-2 text-xs text-gray-500">
                  Select a future delivery date.
                </p>
              </div>

              <div>
                <label className={labelClass}>
                  Estimated price (optional)
                </label>
                <input
                  name="price"
                  type="number"
                  min="1"
                  value={formData.price}
                  onChange={updateField}
                  placeholder="₹ Enter amount"
                  className={inputClass}
                />
                <p className="mt-2 text-xs text-gray-500">
                  Estimate only; final price may change.
                </p>
              </div>

              <div>
                <label className={labelClass}>
                  Order ID automatically generated
                </label>
                <div className={`${inputClass} bg-gray-50 text-gray-500`}>
                  Assigned after creation
                </div>
                <p className="mt-2 text-xs text-gray-500">
                  A unique ID is assigned when the order is created.
                </p>
              </div>

            </div>

            {/* Error and Success */}
            {error && (
              <p className="mb-4 border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                {error}
              </p>
            )}

            {success && (
              <p className="mb-4 border border-green-200 bg-green-50 p-3 text-sm text-green-700">
                {success}
              </p>
            )}

            {/* Buttons */}
            <div className="flex flex-wrap gap-3 border-t pt-5">

              <button
                type="submit"
                className="bg-[#333333] px-6 py-3 text-sm font-semibold text-white hover:bg-black"
              >
                Create Order
              </button>

              <button
                type="button"
                onClick={handleDraft}
                className="border border-gray-400 px-6 py-3 text-sm font-semibold hover:bg-gray-100"
              >
                Save as Draft
              </button>

              <button
                type="button"
                onClick={handleCancel}
                className="border border-gray-400 px-6 py-3 text-sm font-semibold hover:bg-gray-100"
              >
                Cancel
              </button>

            </div>

            <p className="mt-4 text-xs text-gray-500">
              Create Order → Confirmation on this screen, then return to Screen 3.
              Save as Draft → Retain incomplete details here; do not issue a customer Order ID until creation.
            </p>

          </form>

        </section>
      </div>

    </main>
  );
}
