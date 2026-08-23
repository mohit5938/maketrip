import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Calendar,
  MapPin,
  User,
  Clock,
  CreditCard,
  AlertCircle,
  X,
  Search,
  Compass,
  CheckCircle2,
  XCircle,
  Eye,
  RefreshCw,
  AlertTriangle,
  Star
} from "lucide-react";
import Navbar from "../components/Navbar.jsx";
import { getMyBookings, cancelBookingApi } from "../services/bookingService.js";
import ReviewModal from "../components/review/ReviewModal.jsx";

const MyTrip = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Modals state
  const [selectedBookingForCancel, setSelectedBookingForCancel] = useState(null);
  const [cancellationReason, setCancellationReason] = useState("");
  const [cancelLoading, setCancelLoading] = useState(false);
  const [selectedBookingDetails, setSelectedBookingDetails] = useState(null);
  const [reviewModalTrip, setReviewModalTrip] = useState(null);

  // Timers trigger for countdowns
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    fetchBookings();
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const res = await getMyBookings();
      if (res.success) {
        setBookings(res.bookings || []);
      }
    } catch (error) {
      console.error("Fetch Bookings Error:", error);
      toast.error(error?.message || "Failed to load your bookings");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async () => {
    if (!selectedBookingForCancel) return;
    try {
      setCancelLoading(true);
      const res = await cancelBookingApi(
        selectedBookingForCancel.id,
        cancellationReason
      );
      if (res.success) {
        toast.success("Booking cancelled successfully.");
        setSelectedBookingForCancel(null);
        setCancellationReason("");
        fetchBookings();
      }
    } catch (error) {
      toast.error(error.message || "Failed to cancel booking.");
    } finally {
      setCancelLoading(false);
    }
  };

  // Helper formatting functions
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const formatDestination = (dest) => {
    if (!dest) return "Destination N/A";
    if (typeof dest === "object") {
      return dest.name || dest.city || dest.country || "Destination";
    }
    return dest;
  };

  const getTimeLeft = (expiresAt) => {
    if (!expiresAt) return null;
    const diff = new Date(expiresAt).getTime() - now;
    if (diff <= 0) return "Expired";
    const minutes = Math.floor(diff / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    return `${minutes}m ${seconds < 10 ? "0" : ""}${seconds}s`;
  };

  // Filter bookings based on activeTab & searchQuery
  const filteredBookings = bookings.filter((b) => {
    const isPending = b.bookingStatus === "pending";
    const isConfirmed = b.bookingStatus === "confirmed" || b.bookingStatus === "approved";
    const isCancelled = b.bookingStatus === "cancelled";
    const isCompleted = b.bookingStatus === "completed";

    let matchTab = true;
    if (activeTab === "confirmed") matchTab = isConfirmed;
    else if (activeTab === "pending") matchTab = isPending;
    else if (activeTab === "completed") matchTab = isCompleted;
    else if (activeTab === "cancelled") matchTab = isCancelled;

    const query = searchQuery.toLowerCase().trim();
    const tripName = (b.trip?.name || "").toLowerCase();
    const destName = formatDestination(b.trip?.destination).toLowerCase();

    const matchSearch = tripName.includes(query) || destName.includes(query);

    return matchTab && matchSearch;
  });

  // Calculate statistics
  const stats = {
    total: bookings.length,
    confirmed: bookings.filter((b) => b.bookingStatus === "confirmed" || b.bookingStatus === "approved").length,
    pending: bookings.filter((b) => b.bookingStatus === "pending").length,
    cancelled: bookings.filter((b) => b.bookingStatus === "cancelled").length,
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col">
      <Navbar />

      {/* Main Container */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Header */}
        <div className="bg-gradient-to-r from-pink-600 via-rose-500 to-indigo-600 rounded-3xl p-6 sm:p-10 text-white shadow-xl mb-8 relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/20 text-xs font-semibold tracking-wide backdrop-blur-md mb-3">
                <Compass className="w-3.5 h-3.5" /> Traveler Dashboard
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                My Bookings & Expeditions
              </h1>
              <p className="mt-2 text-pink-100 text-sm sm:text-base max-w-xl">
                Manage your upcoming trips, check booking status, complete pending payments, and view your travel itineraries all in one place.
              </p>
            </div>
            <button
              onClick={() => navigate("/trips")}
              className="self-start md:self-auto px-6 py-3 bg-white text-pink-600 hover:bg-pink-50 font-semibold rounded-2xl shadow-lg hover:shadow-xl transition transform active:scale-95 flex items-center gap-2 cursor-pointer"
            >
              <Compass className="w-5 h-5" /> Explore New Trips
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-pink-50 text-pink-600 flex items-center justify-center font-bold text-lg">
              {stats.total}
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Total Bookings</p>
              <p className="text-xl font-bold text-slate-900">{stats.total}</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-lg">
              {stats.confirmed}
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Confirmed Trips</p>
              <p className="text-xl font-bold text-slate-900">{stats.confirmed}</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-lg">
              {stats.pending}
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Pending Payment</p>
              <p className="text-xl font-bold text-slate-900">{stats.pending}</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold text-lg">
              {stats.cancelled}
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Cancelled</p>
              <p className="text-xl font-bold text-slate-900">{stats.cancelled}</p>
            </div>
          </div>
        </div>

        {/* Filter Bar & Search */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {[
              { id: "all", label: "All Bookings" },
              { id: "confirmed", label: "Confirmed" },
              { id: "pending", label: "Pending Payment" },
              { id: "completed", label: "Completed" },
              { id: "cancelled", label: "Cancelled" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-slate-900 text-white shadow-md"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search box */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by trip or destination..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:bg-white transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Content Area */}
        {loading ? (
          /* Loading Skeletons */
          <div className="grid grid-cols-1 gap-6">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="bg-white rounded-2xl border border-slate-200/80 p-6 animate-pulse flex flex-col md:flex-row gap-6"
              >
                <div className="w-full md:w-64 h-48 bg-slate-200 rounded-xl shrink-0" />
                <div className="flex-1 space-y-4 py-2">
                  <div className="h-6 bg-slate-200 rounded w-3/4" />
                  <div className="h-4 bg-slate-200 rounded w-1/2" />
                  <div className="h-10 bg-slate-200 rounded w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredBookings.length === 0 ? (
          /* Empty State */
          <div className="bg-white rounded-3xl border border-slate-200/80 p-12 text-center shadow-sm my-6">
            <div className="w-20 h-20 bg-pink-50 rounded-full flex items-center justify-center mx-auto mb-4 text-pink-500">
              <Compass className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">No Bookings Found</h3>
            <p className="text-slate-500 text-sm mt-1 max-w-md mx-auto">
              {searchQuery
                ? `No bookings match your search "${searchQuery}".`
                : activeTab === "all"
                ? "You haven't booked any trips yet. Explore exciting destinations and join a journey today!"
                : `You don't have any ${activeTab} bookings.`}
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveTab("all");
                if (bookings.length === 0) navigate("/trips");
              }}
              className="mt-6 px-6 py-3 bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded-xl transition shadow-md hover:shadow-lg inline-flex items-center gap-2 cursor-pointer"
            >
              <Compass className="w-4 h-4" /> Discover Trips
            </button>
          </div>
        ) : (
          /* Bookings List */
          <div className="grid grid-cols-1 gap-6">
            {filteredBookings.map((booking) => {
              const isPending = booking.bookingStatus === "pending";
              const isConfirmed =
                booking.bookingStatus === "confirmed" || booking.bookingStatus === "approved";
              const isCancelled = booking.bookingStatus === "cancelled";
              const isCompleted = booking.bookingStatus === "completed";
              const timeLeft = isPending ? getTimeLeft(booking.expiresAt) : null;
              const isTimerExpired = timeLeft === "Expired";

              return (
                <div
                  key={booking.id}
                  className="bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-md transition overflow-hidden flex flex-col md:flex-row group"
                >
                  {/* Image Banner / Thumbnail */}
                  <div className="relative w-full md:w-72 h-56 md:h-auto shrink-0 bg-slate-100 overflow-hidden">
                    <img
                      src={
                        booking.trip?.coverImage ||
                        "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80"
                      }
                      alt={booking.trip?.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent md:hidden" />

                    {/* Category Badge */}
                    <span className="absolute top-3 left-3 px-3 py-1 bg-black/60 backdrop-blur-md text-white text-xs font-semibold rounded-full uppercase tracking-wider">
                      {booking.trip?.category || "Travel"}
                    </span>
                  </div>

                  {/* Booking Content Details */}
                  <div className="flex-1 p-6 flex flex-col justify-between">
                    <div>
                      {/* Status Badges Row */}
                      <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                        <div className="flex flex-wrap items-center gap-2">
                          {/* Booking Status Badge */}
                          {isConfirmed && (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold">
                              <CheckCircle2 className="w-3.5 h-3.5" /> Confirmed
                            </span>
                          )}
                          {isPending && (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-xs font-semibold">
                              <Clock className="w-3.5 h-3.5" /> Pending Payment
                            </span>
                          )}
                          {isCancelled && (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-200 text-xs font-semibold">
                              <XCircle className="w-3.5 h-3.5" /> Cancelled
                            </span>
                          )}
                          {isCompleted && (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-xs font-semibold">
                              <CheckCircle2 className="w-3.5 h-3.5" /> Completed
                            </span>
                          )}

                          {/* Payment Status Pill */}
                          <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
                            booking.paymentStatus === "paid"
                              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                              : booking.paymentStatus === "pending"
                              ? "bg-amber-50 text-amber-700 border-amber-200"
                              : "bg-slate-100 text-slate-600 border-slate-200"
                          }`}>
                            Payment: {booking.paymentStatus?.toUpperCase() || "PENDING"}
                          </span>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <span className="text-xs text-slate-400 block font-medium">Total Amount</span>
                          <span className="text-xl font-extrabold text-slate-900">
                            ₹{Number(booking.amount || 0).toLocaleString()}
                          </span>
                        </div>
                      </div>

                      {/* Trip Title */}
                      <h2
                        className="text-xl font-bold text-slate-900 hover:text-pink-600 transition cursor-pointer"
                        onClick={() => navigate(`/trip/${booking.trip?.id}`)}
                      >
                        {booking.trip?.name || "Trip"}
                      </h2>

                      {/* Location & Dates Info */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 text-sm text-slate-600">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-pink-500 shrink-0" />
                          <span className="font-medium">{formatDestination(booking.trip?.destination)}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-pink-500 shrink-0" />
                          <span>
                            {formatDate(booking.trip?.startDate)} - {formatDate(booking.trip?.endDate)}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-slate-400 shrink-0" />
                          <span>Host: <strong className="text-slate-800">{booking.host?.name || "Verified Host"}</strong></span>
                        </div>

                        <div className="flex items-center gap-2">
                          <CreditCard className="w-4 h-4 text-slate-400 shrink-0" />
                          <span>Seats: <strong className="text-slate-800">{booking.seatsBooked || 1} Seat</strong></span>
                        </div>
                      </div>

                      {/* Pending Timer Alert */}
                      {isPending && (
                        <div className={`mt-4 p-3.5 rounded-xl border flex items-center justify-between text-xs sm:text-sm font-medium ${
                          isTimerExpired
                            ? "bg-rose-50 border-rose-200 text-rose-700"
                            : "bg-amber-50/80 border-amber-200 text-amber-800"
                        }`}>
                          <div className="flex items-center gap-2">
                            <AlertCircle className="w-4 h-4 shrink-0" />
                            <span>
                              {isTimerExpired
                                ? "Payment time window expired. Booking cancelled."
                                : "Complete payment to confirm your seat!"}
                            </span>
                          </div>
                          {!isTimerExpired && timeLeft && (
                            <span className="px-2.5 py-1 bg-amber-200/80 text-amber-900 font-bold rounded-md tracking-wide animate-pulse">
                              ⏳ {timeLeft}
                            </span>
                          )}
                        </div>
                      )}

                      {/* Cancellation Reason alert if cancelled */}
                      {isCancelled && booking.cancellationReason && (
                        <div className="mt-4 p-3 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-600 flex items-start gap-2">
                          <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-semibold text-slate-700">Reason for cancellation:</span>{" "}
                            {booking.cancellationReason}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Card Actions */}
                    <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                      <div className="text-xs text-slate-400">
                        Booked on {formatDate(booking.joinedAt)}
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Details Modal Trigger */}
                        <button
                          onClick={() => setSelectedBookingDetails(booking)}
                          className="px-4 py-2 border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs sm:text-sm font-semibold rounded-xl transition flex items-center gap-1.5 cursor-pointer"
                        >
                          <Eye className="w-4 h-4" /> View Details
                        </button>

                        {/* Rate & Review Button */}
                        {(isConfirmed || isCompleted) && (
                          <button
                            onClick={() =>
                              setReviewModalTrip({
                                id: booking.trip?.id,
                                trip_id: booking.trip?.id,
                                trip_name: booking.trip?.name,
                                destination: booking.trip?.destination,
                              })
                            }
                            className="px-4 py-2 bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 text-xs sm:text-sm font-semibold rounded-xl transition flex items-center gap-1.5 cursor-pointer"
                          >
                            <Star className="w-4 h-4 fill-amber-400 text-amber-400" /> Rate & Review
                          </button>
                        )}

                        {/* Pay Now Button */}
                        {isPending && !isTimerExpired && (
                          <button
                            onClick={() => navigate(`/payment/${booking.id}`)}
                            className="px-5 py-2 bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-md hover:shadow-lg transition flex items-center gap-1.5 cursor-pointer"
                          >
                            <CreditCard className="w-4 h-4" /> Pay Now
                          </button>
                        )}

                        {/* Cancel Button */}
                        {!isCancelled && !isCompleted && (
                          <button
                            onClick={() => setSelectedBookingForCancel(booking)}
                            className="px-4 py-2 text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-200 text-xs sm:text-sm font-semibold rounded-xl transition cursor-pointer"
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Cancellation Confirmation Modal */}
      {selectedBookingForCancel && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="w-14 h-14 bg-rose-50 text-rose-500 rounded-2xl flex items-center justify-center mb-4 mx-auto">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <h3 className="text-xl font-bold text-slate-900 text-center">
              Cancel Booking?
            </h3>
            <p className="text-sm text-slate-500 text-center mt-2">
              Are you sure you want to cancel your booking for{" "}
              <strong className="text-slate-800">
                "{selectedBookingForCancel.trip?.name}"
              </strong>
              ? This action will release your seat.
            </p>

            <div className="mt-4">
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Reason for Cancellation (Optional)
              </label>
              <textarea
                rows={3}
                value={cancellationReason}
                onChange={(e) => setCancellationReason(e.target.value)}
                placeholder="Let us know why you're cancelling..."
                className="w-full p-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:bg-white resize-none"
              />
            </div>

            <div className="mt-6 flex items-center gap-3">
              <button
                onClick={() => {
                  setSelectedBookingForCancel(null);
                  setCancellationReason("");
                }}
                disabled={cancelLoading}
                className="flex-1 py-3 text-sm font-semibold border border-slate-200 text-slate-700 hover:bg-slate-100 rounded-xl transition cursor-pointer"
              >
                Keep Booking
              </button>
              <button
                onClick={handleCancelBooking}
                disabled={cancelLoading}
                className="flex-1 py-3 text-sm font-semibold bg-rose-600 hover:bg-rose-700 text-white rounded-xl transition shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                {cancelLoading ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  "Confirm Cancel"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Booking Details Modal */}
      {selectedBookingDetails && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <div>
                <span className="text-xs font-bold text-pink-600 uppercase tracking-wider">Booking Receipt</span>
                <h3 className="text-xl font-bold text-slate-900">
                  {selectedBookingDetails.trip?.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedBookingDetails(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6 text-sm">
              {/* Trip Overview */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 grid grid-cols-2 gap-4">
                <div>
                  <span className="text-slate-400 text-xs block">Destination</span>
                  <span className="font-semibold text-slate-800">
                    {formatDestination(selectedBookingDetails.trip?.destination)}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 text-xs block">Category</span>
                  <span className="font-semibold text-slate-800">
                    {selectedBookingDetails.trip?.category || "Travel"}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 text-xs block">Start Date</span>
                  <span className="font-semibold text-slate-800">
                    {formatDate(selectedBookingDetails.trip?.startDate)}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 text-xs block">End Date</span>
                  <span className="font-semibold text-slate-800">
                    {formatDate(selectedBookingDetails.trip?.endDate)}
                  </span>
                </div>
              </div>

              {/* Traveler & Emergency Contact Info */}
              <div>
                <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <User className="w-4 h-4 text-pink-500" /> Traveler Contact Info
                </h4>
                <div className="bg-white p-4 rounded-2xl border border-slate-200/80 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Contact Phone:</span>
                    <span className="font-medium text-slate-900">{selectedBookingDetails.phone || "N/A"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Emergency Contact:</span>
                    <span className="font-medium text-slate-900">{selectedBookingDetails.emergencyName || "N/A"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Emergency Phone:</span>
                    <span className="font-medium text-slate-900">{selectedBookingDetails.emergencyPhone || "N/A"}</span>
                  </div>
                  {selectedBookingDetails.specialRequest && (
                    <div className="pt-2 border-t border-slate-100">
                      <span className="text-slate-500 block text-xs">Special Notes:</span>
                      <p className="text-slate-700 italic mt-0.5">{selectedBookingDetails.specialRequest}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Payment Summary */}
              <div>
                <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-pink-500" /> Payment & Status Summary
                </h4>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Booking Status:</span>
                    <span className="font-bold uppercase text-slate-800">{selectedBookingDetails.bookingStatus}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Payment Status:</span>
                    <span className="font-bold uppercase text-slate-800">{selectedBookingDetails.paymentStatus}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-slate-200 text-base">
                    <span className="font-semibold text-slate-900">Total Price:</span>
                    <span className="font-extrabold text-pink-600">
                      ₹{Number(selectedBookingDetails.amount || 0).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button
                onClick={() => setSelectedBookingDetails(null)}
                className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm rounded-xl transition cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Review Modal */}
      {reviewModalTrip && (
        <ReviewModal
          trip={reviewModalTrip}
          onClose={() => setReviewModalTrip(null)}
          onSuccess={fetchBookings}
        />
      )}
    </div>
  );
};

export default MyTrip;
