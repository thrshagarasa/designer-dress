
"use client";

import { useState } from "react";

export default function StyleGallery({
  styles = [],
  setStyles,
  onBack,
}) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");

  const emptyForm = {
    name: "",
    type: "",
    description: "",
    image: "",
  };

  const [formData, setFormData] = useState(emptyForm);

  const dressTypes = [
    "All",
    "Anarkali",
    "Party gown",
    "Lehenga",
    "Kurta set",
  ];

  const filteredStyles = styles.filter((style) => {
    const matchesSearch =
      style.name.toLowerCase().includes(search.toLowerCase()) ||
      style.description.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filter === "All" || style.type === filter;

    return matchesSearch && matchesFilter;
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleImage = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!["image/jpeg", "image/png"].includes(file.type)) {
      setError("Please select a JPG or PNG image.");
      e.target.value = "";
      return;
    }

    if (file.size > 1 * 1024 * 1024) {
      setError("Style reference image must be less than 1 MB.");
      e.target.value = "";
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setFormData((previous) => ({
        ...previous,
        image: reader.result,
      }));
    };

    reader.readAsDataURL(file);
    setError("");
  };

  const handleSave = (e) => {
    e.preventDefault();
    setError("");

    if (!formData.name.trim() || !formData.type || !formData.description.trim()) {
      setError("Please complete all required fields.");
      return;
    }

    if (!formData.image) {
      setError("Please upload a reference image.");
      return;
    }

    if (editingId !== null) {
      setStyles((previous) =>
        previous.map((style) =>
          style.id === editingId
            ? { ...formData, id: editingId }
            : style
        )
      );
    } else {
      const newStyle = {
        ...formData,
        id: Date.now(),
      };

      setStyles((previous) => [...previous, newStyle]);
    }

    setFormData(emptyForm);
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (style) => {
    setFormData({
      name: style.name,
      type: style.type,
      description: style.description,
      image: style.image || "",
    });

    setEditingId(style.id);
    setShowForm(true);
    setError("");
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this style?"
    );

    if (!confirmed) return;

    setStyles((previous) =>
      previous.filter((style) => style.id !== id)
    );
  };

  const handleCancel = () => {
    setFormData(emptyForm);
    setEditingId(null);
    setShowForm(false);
    setError("");
  };

  return (
    <main className="min-h-screen bg-white text-gray-800">

      {/* Header */}
      <header className="flex items-center justify-between border-b px-6 py-4">
        <div>
          <h1 className="text-xl font-bold">
            Custom Made Designer Dress
          </h1>
          <p className="text-xs text-gray-500">
            Designer Studio Management System
          </p>
        </div>

        <span className="text-sm text-gray-500">
          Admin Portal
        </span>
      </header>

      <div className="flex">

        {/* Sidebar */}
        <aside className="hidden w-56 shrink-0 border-r bg-gray-100 p-4 md:block">
          <h3 className="mb-5 text-xs font-bold text-gray-500">
            ADMIN MENU
          </h3>

          <div className="space-y-4 text-sm">
            <p>Dashboard</p>
            <p>Add Customer/Order</p>
            <p>All Orders</p>
            <p>Update Status</p>
            <p className="border-l-4 border-black bg-white p-2 font-bold">
              Style Gallery
            </p>
            <p>Alteration Requests</p>
            <p>Customer Feedback</p>
          </div>

          <button
            onClick={onBack}
            className="mt-8 text-sm text-gray-600 underline"
          >
            Back to Dashboard
          </button>
        </aside>

        {/* Main Content */}
        <section className="min-w-0 flex-1 px-5 py-8 md:px-8">

          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold">
                Style Gallery
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Manage your studio's dress designs and reference styles.
              </p>
            </div>

            <button
              onClick={() => {
                setFormData(emptyForm);
                setEditingId(null);
                setShowForm(true);
                setError("");
              }}
              className="bg-black px-5 py-3 text-sm font-semibold text-white hover:bg-gray-800"
            >
              + Add Style
            </button>
          </div>

          {/* Search and Filter */}
          <div className="my-7 grid gap-4 md:grid-cols-2">

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search style name or details..."
              className="border border-gray-300 px-4 py-3 text-sm outline-none focus:border-black"
            />

            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border border-gray-300 px-4 py-3 text-sm outline-none focus:border-black"
            >
              {dressTypes.map((type) => (
                <option key={type} value={type}>
                  {type === "All" ? "All dress types" : type}
                </option>
              ))}
            </select>

          </div>

          {/* Add / Edit Form */}
          {showForm && (
            <div className="mb-8 border border-gray-300 bg-gray-50 p-6">

              <h3 className="mb-5 text-lg font-bold">
                {editingId !== null ? "Edit Style" : "Add New Style"}
              </h3>

              <form onSubmit={handleSave} className="space-y-5">

                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Style name *
                  </label>

                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter style name"
                    required
                    className="w-full border border-gray-300 bg-white px-4 py-3 text-sm"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Dress type *
                  </label>

                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 bg-white px-4 py-3 text-sm"
                  >
                    <option value="">Select dress type</option>
                    {dressTypes.slice(1).map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Description *
                  </label>

                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Describe the dress design and details"
                    required
                    className="w-full border border-gray-300 bg-white px-4 py-3 text-sm"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Reference image *
                  </label>

                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png,image/jpeg,image/png"
                    onChange={handleImage}
                    className="w-full text-sm"
                  />

                  <p className="mt-2 text-xs text-gray-500">
                    JPG or PNG image, maximum size 1 MB.
                  </p>

                  {formData.image && (
                    <img
                      src={formData.image}
                      alt="Style reference preview"
                      className="mt-4 h-40 w-32 border object-cover"
                    />
                  )}
                </div>

                {error && (
                  <p className="bg-red-50 p-3 text-sm text-red-700">
                    {error}
                  </p>
                )}

                <div className="flex flex-wrap gap-3">
                  <button
                    type="submit"
                    className="bg-black px-6 py-3 text-sm font-semibold text-white"
                  >
                    Save Style
                  </button>

                  <button
                    type="button"
                    onClick={handleCancel}
                    className="border border-gray-400 px-6 py-3 text-sm font-semibold"
                  >
                    Cancel
                  </button>
                </div>

              </form>
            </div>
          )}

          {/* Style Cards */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

            {filteredStyles.map((style) => (
              <article
                key={style.id}
                className="border border-gray-300 bg-white"
              >

                {style.image ? (
                  <img
                    src={style.image}
                    alt={style.name}
                    className="h-56 w-full object-cover"
                  />
                ) : (
                  <div className="flex h-56 items-center justify-center bg-gray-100 text-sm text-gray-400">
                    No reference image
                  </div>
                )}

                <div className="p-5">

                  <h3 className="font-bold">
                    {style.name}
                  </h3>

                  <p className="mt-1 text-xs text-gray-500">
                    {style.type}
                  </p>

                  <p className="mt-3 min-h-12 text-sm text-gray-600">
                    {style.description}
                  </p>

                  <div className="mt-5 flex gap-3 border-t pt-4">

                    <button
                      onClick={() => handleEdit(style)}
                      className="border border-gray-400 px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(style.id)}
                      className="border border-red-300 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      Delete
                    </button>

                  </div>
                </div>

              </article>
            ))}

          </div>

          {filteredStyles.length === 0 && (
            <p className="mt-8 text-center text-sm text-gray-500">
              No styles found. Try another search or add a new style.
            </p>
          )}

        </section>
      </div>
    </main>
  );
}
