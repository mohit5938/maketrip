import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Users,
  UserCheck,
  Compass,
  CalendarDays,
  IndianRupee,
  AlertCircle,
  ArrowRight,
  TrendingUp,
  Clock,
  CheckCircle2,
  XCircle,
  Loader2,
  MapPin
} from "lucide-react";
import { getAdminStatsApi } from "../../services/adminService.js";

const Dashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    stats: {
      totalUsers: 0,
      totalHosts: 0,
      pendingHosts: 0,
      totalTrips: 0,
      pendingTrips: 0,
      publishedTrips: 0,
      completedTrips: 0,
      totalBookings: 0,
      totalRevenue: 0,
    },
    recentBookings: [],
    recentHosts: [],
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const res = await getAdminStatsApi();
      if (res.success) {
        setData({
          stats: res.stats,
          recentBookings: res.recentBookings || [],
          recentHosts: res.recentHosts || [],
        });
      }
    } catch (error) {
      toast.error(error.message || "Failed to load admin statistics");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatDestination = (dest) => {
    if (!dest) return "Destination";
    if (typeof dest === "object") return dest.name || dest.city || "Destination";
    return dest;
  };

  if (loading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center text-slate-500">
        <Loader2 className="w-10 h-10 animate-spin text-purple-600 mb-3" />
        <p className="font-semibold text-sm">Loading admin dashboard statistics...</p>
      </div>
    );
  }

  const { stats, recentBookings, recentHosts } = data;

  return (
    <div className="space-y-8">
      {/* Hero Welcome Banner */}
      <div className="bg-gradient-to-r from-purple-700 via-indigo-600 to-pink-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/20 text-xs font-semibold backdrop-blur-md mb-3">
              <TrendingUp className="w-3.5 h-3.5" /> JoinTrip Executive Overview
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Admin Control Center
            </h1>
            <p className="mt-2 text-purple-100 text-sm sm:text-base max-w-xl">
              Monitor real-time platform revenue, host approvals, expedition moderation, and traveler bookings.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {stats.pendingHosts > 0 && (
              <button
                onClick={() => navigate("/admin/pending-hosts")}
                className="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-2xl text-xs sm:text-sm shadow-md transition flex items-center gap-2 cursor-pointer"
              >
                <AlertCircle className="w-4 h-4" /> {stats.pendingHosts} Host Applications Pending
              </button>
            )}
            {stats.pendingTrips > 0 && (
              <button
                onClick={() => navigate("/admin/pending-trips")}
                className="px-4 py-2.5 bg-white text-purple-700 hover:bg-purple-50 font-bold rounded-2xl text-xs sm:text-sm shadow-md transition flex items-center gap-2 cursor-pointer"
              >
                <Clock className="w-4 h-4" /> {stats.pendingTrips} Trips Awaiting Approval
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Metric 1: Total Revenue */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Platform Revenue</span>
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <IndianRupee className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-4">
            ₹{stats.totalRevenue.toLocaleString()}
          </p>
          <p className="text-xs text-emerald-600 font-semibold mt-2 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> Platform Confirmed Payments
          </p>
        </div>

        {/* Metric 2: Total Users */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Users</span>
            <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-4">
            {stats.totalUsers.toLocaleString()}
          </p>
          <p className="text-xs text-slate-500 font-medium mt-2">
            {stats.totalHosts} Verified Hosts
          </p>
        </div>

        {/* Metric 3: Total Expeditions */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Expeditions / Trips</span>
            <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Compass className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-4">
            {stats.totalTrips.toLocaleString()}
          </p>
          <p className="text-xs text-purple-600 font-semibold mt-2">
            {stats.publishedTrips} Active Live Trips
          </p>
        </div>

        {/* Metric 4: Bookings Count */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Bookings</span>
            <div className="w-10 h-10 rounded-2xl bg-pink-50 text-pink-600 flex items-center justify-center">
              <CalendarDays className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-4">
            {stats.totalBookings.toLocaleString()}
          </p>
          <p className="text-xs text-pink-600 font-semibold mt-2">
            Traveler Expeditions Joined
          </p>
        </div>
      </div>

      {/* Two Column Layout for Recent Data */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Recent Bookings */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <CalendarDays className="w-5 h-5 text-purple-600" /> Recent Bookings
              </h2>
              <button
                onClick={() => navigate("/admin/bookings")}
                className="text-xs font-bold text-purple-600 hover:text-purple-700 flex items-center gap-1 cursor-pointer"
              >
                View All <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {recentBookings.length === 0 ? (
              <p className="text-slate-400 text-sm py-8 text-center">No bookings recorded yet.</p>
            ) : (
              <div className="space-y-3">
                {recentBookings.map((b) => (
                  <div
                    key={b.booking_id}
                    className="p-3.5 rounded-2xl border border-slate-100 bg-slate-50/60 flex items-center justify-between gap-3 text-sm"
                  >
                    <div>
                      <p className="font-bold text-slate-900">{b.traveler_name}</p>
                      <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
                        <Compass className="w-3.5 h-3.5 text-pink-500 shrink-0" />
                        <span className="truncate max-w-[180px]">{b.trip_name}</span>
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="font-extrabold text-slate-900">₹{Number(b.amount || 0).toLocaleString()}</p>
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase mt-0.5 ${
                          b.payment_status === "paid"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {b.payment_status || "Pending"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right: Pending Host Submissions */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-amber-500" /> Pending Host Applications
              </h2>
              <button
                onClick={() => navigate("/admin/pending-hosts")}
                className="text-xs font-bold text-purple-600 hover:text-purple-700 flex items-center gap-1 cursor-pointer"
              >
                Review All ({stats.pendingHosts}) <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {recentHosts.length === 0 ? (
              <div className="py-8 text-center text-slate-400 text-sm">
                <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2 opacity-80" />
                All host applications have been reviewed!
              </div>
            ) : (
              <div className="space-y-3">
                {recentHosts.map((h) => (
                  <div
                    key={h.user_id}
                    className="p-3.5 rounded-2xl border border-slate-100 bg-slate-50/60 flex items-center justify-between gap-3 text-sm"
                  >
                    <div>
                      <p className="font-bold text-slate-900">{h.full_name}</p>
                      <p className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-purple-500 shrink-0" />
                        <span>{h.city || "Location N/A"}</span>
                        <span>•</span>
                        <span>Exp: {h.experience || "N/A"}</span>
                      </p>
                    </div>

                    <button
                      onClick={() => navigate("/admin/pending-hosts")}
                      className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-xl transition cursor-pointer shrink-0"
                    >
                      Review
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
