import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

const API = import.meta.env.VITE_API_URL || "https://jaidenmoves-production.up.railway.app";

const brand = {
  name: "DahyTime",
  tagline: "Simple booking for people who sell their time.",
};

const card =
  "bg-white/90 backdrop-blur rounded-3xl border border-slate-200 shadow-[0_10px_40px_rgba(15,23,42,0.08)]";
const input =
  "w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100";
const buttonPrimary =
  "rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50";
const buttonSecondary =
  "rounded-2xl bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-200";

function formatTime(value) {
  try {
    return new Date(value).toLocaleString();
  } catch {
    return value;
  }
}

function Landing({ onStart }) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#e2e8f0,white_35%)] text-slate-900">
      <div className="mx-auto max-w-6xl px-6 py-6">
        <nav className="flex items-center justify-between">
          <div className="text-xl font-bold tracking-tight">{brand.name}</div>
          <button className={buttonSecondary} onClick={onStart}>Open app</button>
        </nav>

        <section className="grid gap-10 py-20 md:grid-cols-2 md:items-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
            <div className="mb-4 inline-flex rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Booking, payments, scheduling
            </div>
            <h1 className="max-w-xl text-5xl font-bold tracking-tight sm:text-6xl">
              Turn your availability into a real business.
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-8 text-slate-600">
              {brand.tagline} Create bookable slots, set your rate, and let customers reserve time in minutes.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button className={buttonPrimary} onClick={onStart}>Launch dashboard</button>
              <button className={buttonSecondary}>View demo</button>
            </div>
            <div className="mt-10 grid max-w-xl grid-cols-3 gap-4 text-sm text-slate-600">
              <div className={`${card} p-4`}>
                <div className="text-2xl font-bold text-slate-900">24/7</div>
                <div>Bookings while you sleep</div>
              </div>
              <div className={`${card} p-4`}>
                <div className="text-2xl font-bold text-slate-900">1 link</div>
                <div>Shareable booking page</div>
              </div>
              <div className={`${card} p-4`}>
                <div className="text-2xl font-bold text-slate-900">$</div>
                <div>Set your own rate</div>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <div className={`${card} overflow-hidden p-5`}>
              <div className="rounded-3xl bg-slate-950 p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-slate-300">Provider dashboard</div>
                    <div className="text-2xl font-semibold">This week</div>
                  </div>
                  <div className="rounded-2xl bg-white/10 px-3 py-2 text-sm">Live</div>
                </div>
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="rounded-2xl bg-white/10 p-4">
                    <div className="text-sm text-slate-300">Bookings</div>
                    <div className="mt-1 text-3xl font-bold">18</div>
                  </div>
                  <div className="rounded-2xl bg-white/10 p-4">
                    <div className="text-sm text-slate-300">Revenue</div>
                    <div className="mt-1 text-3xl font-bold">$960</div>
                  </div>
                </div>
              </div>
              <div className="grid gap-3 p-4 sm:grid-cols-2">
                {[
                  ["Custom rates", "Charge per session, call, or lesson."],
                  ["Public page", "Give customers one easy link."],
                  ["Cleaner UX", "Fast booking from any device."],
                  ["Real growth", "Good enough to actually launch."],
                ].map(([title, copy]) => (
                  <div key={title} className="rounded-2xl border border-slate-200 p-4">
                    <div className="font-semibold">{title}</div>
                    <div className="mt-1 text-sm text-slate-600">{copy}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
}

function AuthScreen({ onLogin, loading, error }) {
  const [name, setName] = useState("");
  const [role, setRole] = useState("customer");
  const [handle, setHandle] = useState("");

  const submit = () => {
    onLogin({ name, role, handle });
  };

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-[1.15fr,0.85fr] md:items-center">
        <div>
          <div className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Welcome to {brand.name}</div>
          <h2 className="text-4xl font-bold tracking-tight text-slate-900">Set up your booking space.</h2>
          <p className="mt-4 max-w-xl text-lg text-slate-600">
            Start as a provider to publish bookable availability, or log in as a customer to reserve time.
          </p>
        </div>

        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className={`${card} p-6`}>
          <div className="mb-5 text-2xl font-bold">Get started</div>
          {error && <div className="mb-4 rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</div>}
          <div className="space-y-4">
            <input className={input} placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
            <div className="grid grid-cols-2 gap-3">
              <button className={role === "customer" ? buttonPrimary : buttonSecondary} onClick={() => setRole("customer")}>Customer</button>
              <button className={role === "provider" ? buttonPrimary : buttonSecondary} onClick={() => setRole("provider")}>Provider</button>
            </div>
            {role === "provider" && (
              <input
                className={input}
                placeholder="Public handle, like jaiden"
                value={handle}
                onChange={(e) => setHandle(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))}
              />
            )}
            <button className={`${buttonPrimary} w-full`} onClick={submit} disabled={loading}>
              {loading ? "Loading..." : "Continue"}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function ProviderDashboard({ user, slots, onCreateSlot, creating, refresh }) {
  const [time, setTime] = useState("");
  const [rate, setRate] = useState("");
  const [duration, setDuration] = useState("60");
  const [status, setStatus] = useState("");

  const bookedCount = useMemo(() => slots.filter((slot) => slot.booked).length, [slots]);
  const openCount = useMemo(() => slots.filter((slot) => !slot.booked).length, [slots]);

  const submit = async () => {
    setStatus("");
    const result = await onCreateSlot({ time, rate, duration });
    if (result.ok) {
      setTime("");
      setRate("");
      setDuration("60");
      setStatus("Availability added.");
    } else {
      setStatus(result.error || "Could not create slot.");
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Provider dashboard</div>
          <h1 className="mt-2 text-4xl font-bold tracking-tight">Welcome back, {user.name}</h1>
          <p className="mt-2 text-slate-600">Public page: dahytime.com/{user.handle || "your-name"}</p>
        </div>
        <button className={buttonSecondary} onClick={refresh}>Refresh data</button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {[
          ["Open slots", openCount],
          ["Booked slots", bookedCount],
          ["Starting rate", slots[0]?.rate ? `$${slots[0].rate}` : "$0"],
        ].map(([label, value]) => (
          <div key={label} className={`${card} p-5`}>
            <div className="text-sm text-slate-500">{label}</div>
            <div className="mt-2 text-3xl font-bold">{value}</div>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[0.95fr,1.05fr]">
        <div className={`${card} p-6`}>
          <div className="mb-4 text-xl font-bold">Create availability</div>
          <div className="space-y-4">
            <input className={input} type="datetime-local" value={time} onChange={(e) => setTime(e.target.value)} />
            <div className="grid grid-cols-2 gap-4">
              <input className={input} type="number" placeholder="Rate ($)" value={rate} onChange={(e) => setRate(e.target.value)} />
              <select className={input} value={duration} onChange={(e) => setDuration(e.target.value)}>
                <option value="30">30 min</option>
                <option value="45">45 min</option>
                <option value="60">60 min</option>
                <option value="90">90 min</option>
              </select>
            </div>
            <button className={`${buttonPrimary} w-full`} onClick={submit} disabled={creating}>
              {creating ? "Saving..." : "Add slot"}
            </button>
            {status && <div className="rounded-2xl bg-slate-100 px-4 py-3 text-sm text-slate-700">{status}</div>}
          </div>
        </div>

        <div className={`${card} p-6`}>
          <div className="mb-4 flex items-center justify-between">
            <div className="text-xl font-bold">Upcoming availability</div>
            <div className="text-sm text-slate-500">{slots.length} total</div>
          </div>
          <div className="space-y-3">
            {slots.length ? (
              slots.map((slot) => (
                <div key={slot._id} className="flex items-center justify-between rounded-2xl border border-slate-200 p-4">
                  <div>
                    <div className="font-semibold">{formatTime(slot.time)}</div>
                    <div className="mt-1 text-sm text-slate-500">${slot.rate} · {slot.duration || 60} min</div>
                  </div>
                  <div className={`rounded-full px-3 py-1 text-xs font-semibold ${slot.booked ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-700"}`}>
                    {slot.booked ? "Booked" : "Open"}
                  </div>
                </div>
              ))
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-300 p-8 text-center text-slate-500">
                No availability yet. Add your first slot.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function CustomerDashboard({ user, slots, onBook, bookingId }) {
  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      <div className="mb-8">
        <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Customer view</div>
        <h1 className="mt-2 text-4xl font-bold tracking-tight">Book time with a provider.</h1>
        <p className="mt-2 text-slate-600">Logged in as {user.name}. Choose an available slot below.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {slots.filter((slot) => !slot.booked).length ? (
          slots
            .filter((slot) => !slot.booked)
            .map((slot) => (
              <div key={slot._id} className={`${card} p-5`}>
                <div className="text-lg font-bold">{formatTime(slot.time)}</div>
                <div className="mt-1 text-slate-500">{slot.duration || 60} minutes</div>
                <div className="mt-4 text-3xl font-bold">${slot.rate}</div>
                <button className={`${buttonPrimary} mt-5 w-full`} onClick={() => onBook(slot._id)} disabled={bookingId === slot._id}>
                  {bookingId === slot._id ? "Booking..." : "Book now"}
                </button>
              </div>
            ))
        ) : (
          <div className={`${card} col-span-full p-10 text-center text-slate-500`}>
            No open slots right now.
          </div>
        )}
      </div>
    </div>
  );
}

export default function App() {
  const [screen, setScreen] = useState("landing");
  const [user, setUser] = useState(null);
  const [slots, setSlots] = useState([]);
  const [error, setError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [creating, setCreating] = useState(false);
  const [bookingId, setBookingId] = useState("");

  const fetchSlots = async () => {
    try {
      const res = await fetch(`${API}/slots`);
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Could not load slots");
      setSlots(Array.isArray(data) ? data : []);
      setError("");
    } catch (err) {
      setError(err.message || "Failed to fetch slots");
    }
  };

  useEffect(() => {
    if (screen !== "landing") fetchSlots();
  }, [screen]);

  const handleLogin = async ({ name, role, handle }) => {
    if (!name.trim()) return setError("Please enter your name.");
    if (role === "provider" && !handle.trim()) return setError("Choose a public handle.");

    setAuthLoading(true);
    setError("");
    try {
      const res = await fetch(`${API}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, role, handle }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Login failed");
      setUser({ ...data, role: data.role || role, handle: data.handle || handle });
      setScreen("app");
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setAuthLoading(false);
    }
  };

  const handleCreateSlot = async ({ time, rate, duration }) => {
    if (!user?._id) return { ok: false, error: "You need to log in again." };
    if (!time || !rate) return { ok: false, error: "Add a time and rate." };

    setCreating(true);
    try {
      const res = await fetch(`${API}/slots`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ time, rate: Number(rate), duration: Number(duration), userId: user._id }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Could not create slot");
      await fetchSlots();
      return { ok: true, data };
    } catch (err) {
      return { ok: false, error: err.message || "Could not create slot" };
    } finally {
      setCreating(false);
    }
  };

  const handleBook = async (slotId) => {
    setBookingId(slotId);
    setError("");
    try {
      const res = await fetch(`${API}/book`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slotId, name: user?.name || "Customer" }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Booking failed");
      await fetchSlots();
    } catch (err) {
      setError(err.message || "Booking failed");
    } finally {
      setBookingId("");
    }
  };

  if (screen === "landing") {
    return <Landing onStart={() => setScreen("auth")} />;
  }

  if (!user) {
    return <AuthScreen onLogin={handleLogin} loading={authLoading} error={error} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="border-b border-slate-200 bg-white/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div>
            <div className="text-xl font-bold">{brand.name}</div>
            <div className="text-sm text-slate-500">{user.role === "provider" ? "Provider workspace" : "Customer booking"}</div>
          </div>
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-700">{user.name}</div>
            <button className={buttonSecondary} onClick={() => { setUser(null); setScreen("auth"); }}>Sign out</button>
          </div>
        </div>
      </div>

      {error && <div className="mx-auto mt-6 max-w-6xl rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</div>}

      {user.role === "provider" ? (
        <ProviderDashboard user={user} slots={slots} onCreateSlot={handleCreateSlot} creating={creating} refresh={fetchSlots} />
      ) : (
        <CustomerDashboard user={user} slots={slots} onBook={handleBook} bookingId={bookingId} />
      )}
    </div>
  );
}
