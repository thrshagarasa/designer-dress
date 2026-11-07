
"use client";

import { useState } from "react";

import AdminLogin from "./admin-portal/login";
import AdminDashboard from "./admin-portal/dashboard";
import AddOrder from "./admin-portal/add-order";
import AllOrders from "./admin-portal/all-orders";
import CustomerPortal from "./customer-portal/portal";
import MyOrder from "./customer-portal/my-order";
import AlterationFeedback from "./customer-portal/alteration-feedback";

// Initial customer orders
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

// Initial alteration requests
const initialAlterations = [
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

// Initial customer feedback
const initialFeedback = [
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

export default function Home() {
  const [screen, setScreen] = useState("welcome");
  const [dashboardFilter, setDashboardFilter] = useState(null);

  const [orders, setOrders] = useState(initialOrders);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const [alterations, setAlterations] = useState(initialAlterations);
  const [feedback, setFeedback] = useState(initialFeedback);

  const [nextOrderNumber, setNextOrderNumber] = useState(4);

  // Select which customer form to open
  const [formTab, setFormTab] = useState("alteration");

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

  // Update alteration status from Admin Dashboard
  const updateAlterationStatus = (id, newStatus) => {
    setAlterations((previous) =>
      previous.map((alt) =>
        alt.id === id ? { ...alt, status: newStatus } : alt
      )
    );
  };

  // Welcome Page
  if (screen === "welcome") {
    return (
      <main className="min-h-screen bg-white text-gray-800">

        <section className="flex min-h-screen flex-col items-center justify-center px-5 text-center">

          {/* Boutique Logo */}
          <div className="mb-5">
            <img
              src="/designer-logo.png"
              alt="Designer Boutique Logo"
              className="h-72 w-72 object-contain"
            />
          </div>

          {/* Heading */}
          <h1 className="mb-8 font-serif text-4xl font-semibold italic tracking-wider text-[#333333] md:text-5xl">
            Designer Boutique
          </h1>

          {/* Admin and Customer Options */}
          <div className="flex flex-col gap-6 sm:flex-row sm:gap-10">

            {/* Admin Login Button */}
            <div className="w-72">
              <button
                onClick={() => setScreen("login")}
                className="w-full rounded-full bg-[#333333] px-8 py-4 text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-black"
              >
                Admin 
              </button>
            </div>

            {/* Customer Portal Button */}
            <div className="w-72">
              <button
                onClick={() => setScreen("customer")}
                className="w-full rounded-full bg-[#333333] px-8 py-4 text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-black"
              >
                Customer 
              </button>
            </div>

          </div>

        </section>
      </main>
    );
  }

  const goToDashboard = (filter = null) => {
    setDashboardFilter(filter);
    setScreen("dashboard");
  };

  // Admin Login
  if (screen === "login") {
    return (
      <AdminLogin
        onBack={() => setScreen("welcome")}
        onSignIn={() => goToDashboard()}
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
        initialFilter={dashboardFilter}
        onUpdateAlterationStatus={updateAlterationStatus}
        onAddOrder={() => setScreen("add-order")}
        onAllOrders={() => setScreen("all-orders")}
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
          goToDashboard();
        }}
        onDashboard={() => goToDashboard()}
        onAllOrders={() => setScreen("all-orders")}
        onAlterations={() => goToDashboard("alterations")}
        onFeedback={() => goToDashboard("feedback")}
        onLogout={() => setScreen("welcome")}
        onBack={() => goToDashboard()}
      />
    );
  }

  // All Orders
  if (screen === "all-orders") {
    return (
      <AllOrders
        orders={orders}
        onUpdate={updateOrder}
        onDashboard={() => goToDashboard()}
        onAddOrder={() => setScreen("add-order")}
        onAlterations={() => goToDashboard("alterations")}
        onFeedback={() => goToDashboard("feedback")}
        onLogout={() => setScreen("welcome")}
        onBack={() => goToDashboard()}
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
        order={
          orders.find((item) => item.id === selectedOrder?.id) ||
          selectedOrder
        }
        onAlteration={() => {
          setFormTab("alteration");
          setScreen("alteration-feedback");
        }}
        onFeedback={() => {
          setFormTab("feedback");
          setScreen("alteration-feedback");
        }}
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
        initialTab={formTab}
        onSubmitAlteration={submitAlteration}
        onSubmitFeedback={submitFeedback}
        onBack={() => setScreen("my-order")}
      />
    );
  }

  return null;
}
