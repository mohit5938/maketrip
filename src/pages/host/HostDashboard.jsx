import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Users,
  Compass,
  Calendar,
  MapPin,
  Plus,
  DollarSign,
  CheckCircle2,
  Clock,
  XCircle,
  Phone,
  Mail,
  UserCheck,
  Eye,
  X,
  Search,
  ChevronRight,
  TrendingUp,
  AlertCircle
} from "lucide-react";
import Navbar from "../../components/Navbar.jsx";
import { getMyHostedTrips, getTripTravelers, updateHostedTripStatus } from "../../services/hostService.js";

const HostDashboard = () => {
  const navigate = useNavigate();
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Roster Modal state
  const [rosterModalTrip, setRosterModalTrip] = useState(null);
  const [rosterTravelers, setRosterTravelers] = useState([]);
  const [rosterLoading, setRosterLoading] = useState(false);

  useEffect(() => {
    fetchHostedTrips();
  }, []);

  const fetchHostedTrips = async () => {
    try {
      setLoading(true);
      const res = await getMyHostedTrips();
      if (res.success) {
        setTrips(res.trips || []);
      }
    } catch (error) {
      toast.error(error.message || "Failed to load hosted trips");
    } finally {
      setLoading(false);
    }
  };

  const handleFetchRoster = async (trip) => {
    try {
      setRosterModalTrip(trip);
      setRosterLoading(true);
      const res = await getTripTravelers(trip.id);
      if (res.success) {
        setRosterTravelers(res.travelers || []);
      }
    } catch (error) {
      toast.error(error.message || "Failed to load guest list");
    } finally {
      setRosterLoading(false);
    }
  };

  const handleUpdateStatus = async (tripId, status) => {
    try {
      const res = await updateHostedTripStatus(tripId, status);
      if (res.success) {
        toast.success(`Trip status updated to ${status}.`);
        fetchHostedTrips();
      }
    } catch (error) {
      toast.error(error.message || "Failed to update trip status.");
    }
  };

  // Formatting helpers
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

  // Filter trips
  const filteredTrips = trips.filter((t) => {
    let matchTab = true;
    if (activeTab === "published") matchTab = t.status === "published";
    else if (activeTab === "pending") matchTab = t.status === "pending";
    else if (activeTab === "completed") matchTab = t.status === "completed";

    const query = searchQuery.toLowerCase().trim();
    const tripName = (t.name || "").toLowerCase();
    const destName = formatDestination(t.destination).toLowerCase();

    return matchTab && (tripName.includes(query) || destName.includes(query));
  });

  // Calculate metrics
  const stats = {
    totalTrips: trips.length,
    activeTrips: trips.filter((t) => t.status === "published").length,
    totalGuests: trips.reduce((sum, t) => sum + Number(t.confirmedBookingsCount || 0), 0),
    totalEarnings: trips.reduce((sum, t) => sum + Number(t.totalRevenue || 0), 0),
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col">
      <Navbar />

      {/* Main Container */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Host Hero Header */}
        <div className="bg-gradient-to-r from-purple-700 via-indigo-600 to-pink-600 rounded-3xl p-6 sm:p-10 text-white shadow-xl mb-8 relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/20 text-xs font-semibold tracking-wide backdrop-blur-md mb-3">
                <UserCheck className="w-3.5 h-3.5" /> Host Control Center
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                My Hosted Trips & Expeditions
              </h1>
              <p className="mt-2 text-purple-100 text-sm sm:text-base max-w-xl">
                Manage your created trips, review joined traveler rosters, monitor seat occupancy, and track earnings all in one dashboard.
              </p>
            </div>

            <button
              onClick={() => navigate("/create-trip")}
              className="self-start md:self-auto px-6 py-3.5 bg-white text-purple-700 hover:bg-purple-50 font-bold rounded-2xl shadow-lg hover:shadow-xl transition transform active:scale-95 flex items-center gap-2 cursor-pointer"
            >
              <Plus className="w-5 h-5" /> Host a New Trip
            </button>
          </div>
        </div>

        {/* Host Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold text-lg">
              {stats.totalTrips}
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Total Hosted</p>
              <p className="text-xl font-bold text-slate-900">{stats.totalTrips} Trips</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-lg">
              {stats.activeTrips}
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Published</p>
              <p className="text-xl font-bold text-slate-900">{stats.activeTrips} Active</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-pink-50 text-pink-600 flex items-center justify-center font-bold text-lg">
              {stats.totalGuests}
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Confirmed Guests</p>
              <p className="text-xl font-bold text-slate-900">{stats.totalGuests} Travelers</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-lg">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Total Revenue</p>
              <p className="text-xl font-bold text-slate-900">₹{stats.totalEarnings.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Filter Bar & Search */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {[
              { id: "all", label: "All Hosted Trips" },
              { id: "published", label: "Published" },
              { id: "pending", label: "Pending Approval" },
              { id: "completed", label: "Completed" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-purple-600 text-white shadow-md"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search hosted trips..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition"
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
        ) : filteredTrips.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-200/80 p-12 text-center shadow-sm my-6">
            <div className="w-20 h-20 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-4 text-purple-600">
              <Compass className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">No Hosted Trips Found</h3>
            <p className="text-slate-500 text-sm mt-1 max-w-md mx-auto">
              {searchQuery
                ? `No trips match "${searchQuery}".`
                : "You haven't created any trips as a host yet. Start hosting your first expedition today!"}
            </p>
            <button
              onClick={() => navigate("/create-trip")}
              className="mt-6 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition shadow-md hover:shadow-lg inline-flex items-center gap-2 cursor-pointer"
            >
              <Plus className="w-5 h-5" /> Host a New Trip
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {filteredTrips.map((trip) => {
              const occupancyPercent = Math.min(
                Math.round(((trip.currentBookings || 0) / (trip.travelersLimit || 1)) * 100),
                100
              );

              return (
                <div
                  key={trip.id}
                  className="bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-md transition overflow-hidden flex flex-col md:flex-row group"
                >
                  {/* Trip Banner */}
                  <div className="relative w-full md:w-72 h-56 md:h-auto shrink-0 bg-slate-100 overflow-hidden">
                    <img
                      src={
                        trip.coverImage ||
                        "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80"
                      }
                      alt={trip.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <span className="absolute top-3 left-3 px-3 py-1 bg-black/60 backdrop-blur-md text-white text-xs font-semibold rounded-full uppercase tracking-wider">
                      {trip.category || "Trip"}
                    </span>
                  </div>

                  {/* Trip Details */}
                  <div className="flex-1 p-6 flex flex-col justify-between">
                    <div>
                      {/* Header Row */}
                      <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold capitalize border ${
                              trip.status === "published"
                                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                : trip.status === "pending"
                                ? "bg-amber-50 text-amber-700 border-amber-200"
                                : trip.status === "completed"
                                ? "bg-blue-50 text-blue-700 border-blue-200"
                                : "bg-rose-50 text-rose-700 border-rose-200"
                            }`}
                          >
                            {trip.status === "published" ? "✓ Active / Published" : trip.status}
                          </span>
                        </div>

                        <div className="text-right">
                          <span className="text-xs text-slate-400 block font-medium">Price / Seat</span>
                          <span className="text-lg font-extrabold text-slate-900">
                            ₹{Number(trip.pricePerPerson || 0).toLocaleString()}
                          </span>
                        </div>
                      </div>

                      {/* Title */}
                      <h2
                        className="text-xl font-bold text-slate-900 hover:text-purple-600 transition cursor-pointer"
                        onClick={() => navigate(`/trip/${trip.id}`)}
                      >
                        {trip.name}
                      </h2>

                      {/* Meta Info */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 text-sm text-slate-600">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-purple-500 shrink-0" />
                          <span className="font-medium">{formatDestination(trip.destination)}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-purple-500 shrink-0" />
                          <span>
                            {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
                          </span>
                        </div>
                      </div>

                      {/* Seat Progress Bar */}
                      <div className="mt-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                        <div className="flex justify-between items-center text-xs font-semibold mb-1.5">
                          <span className="text-slate-600">Occupancy Progress</span>
                          <span className="text-purple-700">
                            {trip.currentBookings} / {trip.travelersLimit} Seats Booked ({occupancyPercent}%)
                          </span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-purple-500 to-pink-500 h-2.5 rounded-full transition-all duration-500"
                            style={{ width: `${occupancyPercent}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <span className="text-xs text-slate-400 block">Total Host Revenue</span>
                        <span className="text-base font-extrabold text-emerald-600">
                          ₹{Number(trip.totalRevenue || 0).toLocaleString()}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Guest Roster Modal Trigger */}
                        <button
                          onClick={() => handleFetchRoster(trip)}
                          className="px-4 py-2 bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 text-xs sm:text-sm font-semibold rounded-xl transition flex items-center gap-1.5 cursor-pointer"
                        >
                          <Users className="w-4 h-4" /> Guest Roster ({trip.confirmedBookingsCount || 0})
                        </button>

                        {/* Status update options */}
                        {trip.status === "published" && (
                          <button
                            onClick={() => handleUpdateStatus(trip.id, "completed")}
                            className="px-3.5 py-2 border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl transition cursor-pointer"
                          >
                            Mark Completed
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

      {/* Traveler Roster Modal */}
      {rosterModalTrip && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <div>
                <span className="text-xs font-bold text-purple-600 uppercase tracking-wider">Guest Roster</span>
                <h3 className="text-xl font-bold text-slate-900">
                  {rosterModalTrip.name}
                </h3>
              </div>
              <button
                onClick={() => {
                  setRosterModalTrip(null);
                  setRosterTravelers([]);
                }}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {rosterLoading ? (
              <div className="py-12 text-center text-slate-500">Loading guest list...</div>
            ) : rosterTravelers.length === 0 ? (
              <div className="py-12 text-center text-slate-500">
                <Users className="w-12 h-12 mx-auto mb-3 text-slate-300" />
                No travelers have booked this trip yet.
              </div>
            ) : (
              <div className="space-y-4">
                {rosterTravelers.map((t) => (
                  <div
                    key={t.bookingId}
                    className="p-4 rounded-2xl border border-slate-200/80 bg-slate-50 flex flex-col sm:flex-row justify-between gap-4"
                  >
                    <div className="flex items-start gap-3">
                      <img
                        src={t.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(t.name)}`}
                        alt={t.name}
                        className="w-12 h-12 rounded-full object-cover border border-slate-200 shrink-0"
                      />
                      <div>
                        <h4 className="font-bold text-slate-900">{t.name}</h4>
                        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-1">
                          <span className="flex items-center gap-1">
                            <Mail className="w-3.5 h-3.5" /> {t.email}
                          </span>
                          <span className="flex items-center gap-1 font-semibold text-slate-700">
                            <Phone className="w-3.5 h-3.5 text-purple-500" /> {t.phone || "N/A"}
                          </span>
                        </div>
                        {t.emergencyName && (
                          <div className="text-xs text-slate-500 mt-1">
                            <span className="font-medium text-slate-700">Emergency Contact:</span> {t.emergencyName} ({t.emergencyPhone})
                          </div>
                        )}
                        {t.specialRequest && (
                          <div className="text-xs text-purple-700 bg-purple-50 p-2 rounded-lg mt-2 border border-purple-100">
                            <strong>Note:</strong> {t.specialRequest}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex sm:flex-col justify-between items-end gap-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold capitalize border ${
                          t.paymentStatus === "paid"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : "bg-amber-50 text-amber-700 border-amber-200"
                        }`}
                      >
                        Payment: {t.paymentStatus?.toUpperCase()}
                      </span>
                      <span className="text-xs text-slate-400">Joined {formatDate(t.joinedAt)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-8 flex justify-end">
              <button
                onClick={() => {
                  setRosterModalTrip(null);
                  setRosterTravelers([]);
                }}
                className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm rounded-xl transition cursor-pointer"
              >
                Close Roster
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HostDashboard;
