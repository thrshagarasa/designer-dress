
"use client";

import { useState } from "react";

import AdminLogin from "./admin-portal/login";
import AdminDashboard from "./admin-portal/dashboard";
import AddOrder from "./admin-portal/add-order";
import UpdateStatus from "./admin-portal/update-status";
import StyleGallery from "./admin-portal/style-gallery";

import CustomerPortal from "./customer-portal/portal";
import MyOrder from "./customer-portal/my-order";
import AlterationFeedback from "./customer-portal/alteration-feedback";

const initialOrders = [
  {
    id: "DRS-2026-001",
    customer: "Ananya Rao",
    phone: "9876543210",
    email: "ananya@example.com",
    bust: "34",
    waist: "28",
    hip: "36",
    shoulder: "14",
    sleeve: "22",
    otherMeasurements: "",
    dress: "Anarkali",
    color: "Navy blue",
    fabric: "Silk",
    description: "Navy blue Anarkali suit",
    material: "Silk fabric with lining",
    embroidery: "Golden threadwork",
    delivery: "2026-11-04",
    price: "5000",
    status: "Completed",
    progressNote:
      "Final finishing and quality check complete. Your dress is ready for collection.",
    photo: "",
  },
  {
    id: "DRS-2026-002",
    customer: "Meera Shetty",
    phone: "9876543211",
    email: "meera@example.com",
    dress: "Party gown",
    color: "Pink",
    fabric: "Georgette",
    delivery: "2026-11-06",
    price: "6500",
    status: "Pending",
    progressNote: "Your order is waiting to be started.",
    photo: "",
  },
  {
    id: "DRS-2026-003",
    customer: "Kavya N.",
    phone: "9876543212",
    email: "kavya@example.com",
    dress: "Lehenga",
    color: "Red",
    fabric: "Velvet",
    delivery: "2026-11-08",
    price: "8500",
    status: "In Progress",
    progressNote: "Your dress is currently in production.",
    photo: "",
  },
];

export default function Home() {
  const [screen, setScreen] = useState("welcome");

  const [orders, setOrders] = useState(initialOrders);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const [styles, setStyles] = useState([
    {
      id: 1,
      name: "Classic Anarkali",
      type: "Anarkali",
      description:
        "Full-length flare, fitted bodice, and a simple round neckline.",
      image: "",
    },
    {
      id: 2,
      name: "Evening Gown",
      type: "Party gown",
      description:
        "Floor-length A-line silhouette with a fitted waist and soft sleeves.",
      image: "",
    },
    {
      id: 3,
      name: "Festive Lehenga",
      type: "Lehenga",
      description:
        "Panelled skirt, matching blouse, and embroidery at the hem.",
      image: "",
    },
    {
      id: 4,
      name: "Straight Kurta Set",
      type: "Kurta set",
      description:
        "Straight-cut kurta with side slits and coordinated trousers.",
      image: "",
    },
  ]);

  const [alterations, setAlterations] = useState([]);
  const [feedback, setFeedback] = useState([]);

  const [nextOrderNumber, setNextOrderNumber] = useState(4);

  // Create a new customer order
  const createOrder = (orderData) => {
    const newOrder = {
      ...orderData,
      id: `DRS-2026-${String(nextOrderNumber).padStart(3, "0")}`,
      status: "Pending",
      progressNote: "Your order has been received and is awaiting work.",
    };

    setOrders((previous) => [...previous, newOrder]);
    setNextOrderNumber((previous) => previous + 1);

    return newOrder;
  };

  // Update an existing order
  const updateOrder = (updatedOrder) => {
    setOrders((previous) =>
      previous.map((order) =>
        order.id === updatedOrder.id ? updatedOrder : order
      )
    );

    setSelectedOrder(updatedOrder);
  };

  // Customer order lookup
  const findCustomerOrder = (name, id) => {
    const found = orders.find(
      (order) =>
        order.customer.trim().toLowerCase() === name.trim().toLowerCase() &&
        order.id.trim().toLowerCase() === id.trim().toLowerCase()
    );

    if (found) {
      setSelectedOrder(found);
      setScreen("my-order");
      return true;
    }

    return false;
  };

  // Save alteration request
  const submitAlteration = (data) => {
    setAlterations((previous) => [
      ...previous,
      {
        ...data,
        id: Date.now(),
        status: "Submitted",
      },
    ]);
  };

  // Save customer feedback
  const submitFeedback = (data) => {
    setFeedback((previous) => [
      ...previous,
      {
        ...data,
        id: Date.now(),
      },
    ]);
  };

  // Welcome page
  if (screen === "welcome") {
    return (
      <main className="min-h-screen bg-white text-gray-800">

        <header className="flex items-center gap-4 border-b px-8 py-4">
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

          <span className="ml-auto text-sm text-gray-500">
            Studio Access
          </span>
        </header>

        <section className="flex min-h-[85vh] flex-col items-center justify-center px-5 text-center">

          <div className="mb-7 flex h-20 w-24 items-center justify-center border text-sm text-gray-500">
            LOGO
          </div>

          <h1 className="mb-4 text-3xl font-bold md:text-4xl">
            Custom Made Designer Dress
          </h1>

          <p className="text-base text-gray-500">
            Designer Studio Management System
          </p>

          <h2 className="mt-5 text-xl">
            Your design. Your measurements. Your style.
          </h2>

          <p className="mb-8 mt-12 text-sm text-gray-500">
            Choose how you want to continue
          </p>

          <div className="flex flex-col gap-8 sm:flex-row">

            <div className="w-80">
              <button
                onClick={() => setScreen("login")}
                className="w-full bg-[#333333] px-8 py-4 text-sm font-semibold text-white hover:bg-black"
              >
                Admin Login
              </button>

              <p className="mt-3 text-sm text-gray-500">
                → Screen 2A · Admin Login
              </p>

              <p className="mt-2 text-xs text-gray-500">
                For the studio owner and authorized staff
              </p>
            </div>

            <div className="w-80">
              <button
                onClick={() => setScreen("customer")}
                className="w-full bg-[#333333] px-8 py-4 text-sm font-semibold text-white hover:bg-black"
              >
                Customer Portal
              </button>

              <p className="mt-3 text-sm text-gray-500">
                → Screen 2B · Customer Portal
              </p>

              <p className="mt-2 text-xs text-gray-500">
                Use your name and studio-provided Order ID
              </p>
            </div>

          </div>
        </section>

        <footer className="border-t px-6 py-5 text-center text-xs text-gray-500">
          Custom Made Designer Dress | Designer Studio Management System
        </footer>

      </main>
    );
  }

  // Admin Login
  if (screen === "login") {
    return (
      <AdminLogin
        onBack={() => setScreen("welcome")}
        onSignIn={() => setScreen("dashboard")}
      />
    );
  }

  // Admin Dashboard
  if (screen === "dashboard") {
    return (
      <AdminDashboard
        orders={orders}
        alterations={alterations}
        feedback={feedback}
        onAddOrder={() => setScreen("add-order")}
        onUpdateStatus={() => setScreen("update-status")}
        onStyleGallery={() => setScreen("style-gallery")}
        onLogout={() => setScreen("welcome")}
      />
    );
  }

  // Add Customer and Dress Order
  if (screen === "add-order") {
    return (
      <AddOrder
        onCreateOrder={(data) => {
          const newOrder = createOrder(data);
          setSelectedOrder(newOrder);
          setScreen("dashboard");
        }}
        onBack={() => setScreen("dashboard")}
      />
    );
  }

  // Update Order Status
  if (screen === "update-status") {
    return (
      <UpdateStatus
        orders={orders}
        onUpdate={updateOrder}
        onBack={() => setScreen("dashboard")}
      />
    );
  }

  // Style Gallery
  if (screen === "style-gallery") {
    return (
      <StyleGallery
        styles={styles}
        setStyles={setStyles}
        onBack={() => setScreen("dashboard")}
      />
    );
  }

  // Customer Order Lookup
  if (screen === "customer") {
    return (
      <CustomerPortal
        onBack={() => setScreen("welcome")}
        onSearch={findCustomerOrder}
      />
    );
  }

  // Customer My Order
  if (screen === "my-order") {
    return (
      <MyOrder
        order={orders.find((item) => item.id === selectedOrder?.id) || selectedOrder}
        onAlteration={() => setScreen("alteration-feedback")}
        onFeedback={() => setScreen("alteration-feedback")}
        onBack={() => setScreen("customer")}
        onHome={() => setScreen("welcome")}
      />
    );
  }

  // Alteration and Feedback
  if (screen === "alteration-feedback") {
    return (
      <AlterationFeedback
        order={selectedOrder}
        onSubmitAlteration={submitAlteration}
        onSubmitFeedback={submitFeedback}
        onBack={() => setScreen("my-order")}
      />
    );
  }

  return null;
}
