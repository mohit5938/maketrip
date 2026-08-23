import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  CalendarDays,
  Search,
  Mail,
  Phone,
  Compass,
  MapPin,
  IndianRupee,
  Loader2,
  X,
  Filter
} from "lucide-react";
import { getAllBookingsApi } from "../../services/adminService.js";

const Booking = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalBookings, setTotalBookings] = useState(0);

  useEffect(() => {
    fetchBookings();
  }, [page, search, statusFilter]);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const res = await getAllBookingsApi(page, 10, search, statusFilter);
      if (res.success) {
        setBookings(res.bookings || []);
        setTotalPages(res.totalPages || 1);
        setTotalBookings(res.totalBookings || 0);
      }
    } catch (error) {
      toast.error(error.message || "Failed to load bookings.");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const formatDestination = (dest) => {
    if (!dest) return "Destination N/A";
    if (typeof dest === "object") return dest.name || dest.city || dest.country || "Destination";
    return dest;
  };

  return (
    <div className="space-y-6">
      {/* Header & Filter Bar */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-pink-600 uppercase tracking-wider">Booking Oversight</span>
          <h1 className="text-2xl font-bold text-slate-900 mt-1">
            Platform Bookings ({totalBookings})
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Track all joined traveler reservations, seat counts, payment status, and contact logs.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(1);
            }}
            className="w-full sm:w-44 px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition cursor-pointer font-medium"
          >
            <option value="">All Statuses</option>
            <option value="confirmed">Confirmed</option>
            <option value="pending">Pending Payment</option>
            <option value="cancelled">Cancelled</option>
          </select>

          {/* Search Bar */}
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search traveler, trip..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Bookings Table */}
      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center text-slate-500">
          <Loader2 className="w-10 h-10 animate-spin text-purple-600 mb-3" />
          <p className="font-semibold text-sm">Loading bookings log...</p>
        </div>
      ) : bookings.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-12 text-center shadow-xs">
          <CalendarDays className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-900">No Bookings Found</h3>
          <p className="text-slate-500 text-sm mt-1">
            {search || statusFilter ? "No bookings match the selected filters." : "No bookings recorded yet."}
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-700">
              <thead className="bg-slate-50 text-xs uppercase font-bold text-slate-500 border-b border-slate-100">
                <tr>
                  <th className="py-4 px-6">Booking ID</th>
                  <th className="py-4 px-6">Traveler</th>
                  <th className="py-4 px-6">Expedition / Trip</th>
                  <th className="py-4 px-6">Seats & Amount</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6">Date Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {bookings.map((b) => (
                  <tr key={b.booking_id} className="hover:bg-slate-50/80 transition">
                    <td className="py-4 px-6 font-bold text-purple-700">
                      #{b.booking_id}
                    </td>

                    <td className="py-4 px-6">
                      <div>
                        <p className="font-bold text-slate-900">{b.traveler_name}</p>
                        <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
                          <Mail className="w-3.5 h-3.5 text-slate-400" /> {b.traveler_email}
                        </p>
                        {b.phone && (
                          <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
                            <Phone className="w-3.5 h-3.5 text-purple-500" /> {b.phone}
                          </p>
                        )}
                      </div>
                    </td>

                    <td className="py-4 px-6">
                      <div>
                        <p className="font-bold text-slate-900">{b.trip_name}</p>
                        <p className="text-xs text-purple-600 flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3.5 h-3.5 shrink-0" /> {formatDestination(b.destination)}
                        </p>
                      </div>
                    </td>

                    <td className="py-4 px-6">
                      <div>
                        <p className="font-extrabold text-slate-900 text-base">₹{Number(b.amount || 0).toLocaleString()}</p>
                        <p className="text-xs text-slate-500">{b.seats_booked} Seat(s)</p>
                      </div>
                    </td>

                    <td className="py-4 px-6">
                      <div className="flex flex-col gap-1">
                        <span
                          className={`inline-self-start px-3 py-1 rounded-full text-xs font-bold capitalize ${
                            b.booking_status === "confirmed" || b.booking_status === "approved"
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : b.booking_status === "pending"
                              ? "bg-amber-50 text-amber-700 border border-amber-200"
                              : "bg-rose-50 text-rose-700 border border-rose-200"
                          }`}
                        >
                          {b.booking_status}
                        </span>

                        <span
                          className={`inline-self-start px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                            b.payment_status === "paid"
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          Payment: {b.payment_status || "Pending"}
                        </span>
                      </div>
                    </td>

                    <td className="py-4 px-6 text-xs text-slate-500">
                      {formatDate(b.joined_at)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Booking;
