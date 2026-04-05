// STARTUP-LEVEL Scheduling App UI (Polished SaaS Style)

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function App() {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [slots, setSlots] = useState([]);
  const [time, setTime] = useState("");
  const [rate, setRate] = useState("");
  const [error, setError] = useState("");

  const API = "https://your-backend-url";

  const fetchSlots = async () => {
    try {
      const res = await fetch(`${API}/slots`);
      if (!res.ok) throw new Error("Failed to fetch slots");
      const data = await res.json();
      setSlots(data || []);
    } catch (err) {
      setError(err.message);
      console.error("Fetch slots error:", err);
    }
  };

  useEffect(() => {
    fetchSlots();
  }, []);

  const login = async () => {
    if (!name.trim()) {
      setError("Please enter your name");
      return;
    }

    try {
      const res = await fetch(`${API}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name })
      });

      if (!res.ok) throw new Error("Login failed");
      
      const data = await res.json();
      
      // FIX: Check if data exists before setting user
      if (data && data._id) {
        setUser(data);
        setError("");
      } else {
        setError("Invalid login response");
      }
    } catch (err) {
      setError(err.message || "Login error");
      console.error("Login error:", err);
    }
  };

  const addSlot = async () => {
    // FIX: Check if user and user._id exist before proceeding
    if (!user || !user._id) {
      setError("User not properly logged in");
      return;
    }

    if (!time || !rate) {
      setError("Please fill in all fields");
      return;
    }

    try {
      const res = await fetch(`${API}/slots`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ time, rate, userId: user._id })
      });

      if (!res.ok) throw new Error("Failed to add slot");
      
      fetchSlots();
      setTime("");
      setRate("");
      setError("");
    } catch (err) {
      setError(err.message || "Error adding slot");
      console.error("Add slot error:", err);
    }
  };

  const bookSlot = async (id) => {
    if (!name.trim()) {
      setError("Please enter your name");
      return;
    }

    try {
      const res = await fetch(`${API}/book`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slotId: id, name })
      });

      if (!res.ok) throw new Error("Failed to book slot");
      
      fetchSlots();
      setError("");
    } catch (err) {
      setError(err.message || "Error booking slot");
      console.error("Book slot error:", err);
    }
  };

  // -------- LOGIN SCREEN --------
  if (!user) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="w-96 bg-white shadow-xl rounded-2xl p-6">
            <h1 className="text-2xl font-bold mb-4 text-center">DahyTime</h1>
            
            {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}
            
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={login}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-semibold"
            >
              Get Started
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // -------- DASHBOARD --------
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <div className="bg-white shadow-sm p-4 flex justify-between items-center">
        <h1 className="font-bold text-xl">DahyTime</h1>
        <span className="text-gray-500">{user?.name || "User"}</span>
      </div>

      <div className="p-6 max-w-4xl mx-auto">
        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {/* Provider Panel */}
        {user.role === "provider" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="mb-6 bg-white rounded-2xl shadow-md p-4">
              <h2 className="text-lg font-semibold mb-3">Add Availability</h2>
              <div className="flex gap-2 flex-wrap">
                <input
                  type="datetime-local"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="number"
                  placeholder="Rate ($)"
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                  className="w-32 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={addSlot}
                  className="px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 font-semibold"
                >
                  Add Slot
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Slots List */}
        <div className="grid md:grid-cols-2 gap-4">
          {slots && slots.length > 0 ? (
            slots.map((slot) => (
              <motion.div key={slot._id} whileHover={{ scale: 1.02 }}>
                <div className="bg-white rounded-2xl shadow-md p-4 flex justify-between items-center">
                  <div>
                    <p className="font-medium">
                      {new Date(slot.time).toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-500">${slot.rate}</p>
                    {slot.booked && (
                      <p className="text-red-500 text-sm">Booked</p>
                    )}
                  </div>

                  {!slot.booked && user.role === "customer" && (
                    <button
                      className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-semibold"
                      onClick={() => bookSlot(slot._id)}
                    >
                      Book
                    </button>
                  )}
                </div>
              </motion.div>
            ))
          ) : (
            <p className="text-gray-500">No slots available</p>
          )}
        </div>
      </div>
    </div>
  );
}

// ================= WHAT MAKES THIS "STARTUP LEVEL" =================
// - Clean branding (DahyTime)
// - Card-based UI with spacing + shadows
// - Smooth animations (Framer Motion)
// - Responsive grid layout
// - Clear UX separation (login / dashboard)
// - Error handling for null values

// ================= NEXT ELITE FEATURES =================
// - Public booking pages (DahyTime.com/username)
// - Stripe payments
// - Email reminders
// - Real authentication (JWT)
// - Calendar drag-and-drop UI
