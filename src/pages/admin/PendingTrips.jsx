import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  Compass,
  MapPin,
  Calendar,
  Users,
  CheckCircle2,
  XCircle,
  Loader2,
  Search,
  Eye,
  IndianRupee,
  Clock
} from "lucide-react";
import { getPendingTripsApi, updateTripStatusApi } from "../../services/adminService.js";

export const PendingTrips = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchPendingTrips();
  }, [page]);

  const fetchPendingTrips = async () => {
    try {
      setLoading(true);
      const res = await getPendingTripsApi(page, 10);
      if (res.success) {
        setTrips(res.trips || []);
        setTotalPages(res.totalPages || 1);
      }
    } catch (error) {
      toast.error(error.message || "Failed to load pending trips.");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (tripId, status) => {
    try {
      setActionLoading(tripId);
      const res = await updateTripStatusApi(tripId, status);
      if (res.success) {
        toast.success(
          status === "published"
            ? "Trip approved & published live!"
            : "Trip application rejected."
        );
        fetchPendingTrips();
      }
    } catch (error) {
      toast.error(error.message || "Failed to update trip status.");
    } finally {
      setActionLoading(null);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const formatDestination = (dest) => {
    if (!dest) return "Destination N/A";
    if (typeof dest === "object") return dest.name || dest.city || dest.country || "Destination";
    return dest;
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-purple-600 uppercase tracking-wider">Expedition Moderation</span>
          <h1 className="text-2xl font-bold text-slate-900 mt-1">
            Pending Trips Approval ({trips.length})
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Review host-created trip itineraries, destination details, and pricing before publishing them live.
          </p>
        </div>
      </div>

      {/* Content Area */}
      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center text-slate-500">
          <Loader2 className="w-10 h-10 animate-spin text-purple-600 mb-3" />
          <p className="font-semibold text-sm">Loading trips awaiting approval...</p>
        </div>
      ) : trips.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-12 text-center shadow-xs">
          <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">All Trips Reviewed!</h3>
          <p className="text-slate-500 text-sm mt-1 max-w-md mx-auto">
            There are currently no host-created trips waiting for admin moderation.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {trips.map((trip) => (
            <div
              key={trip.id}
              className="bg-white rounded-3xl border border-slate-200/90 shadow-xs hover:shadow-md transition overflow-hidden flex flex-col md:flex-row"
            >
              {/* Trip Cover Image */}
              <div className="relative w-full md:w-72 h-52 md:h-auto shrink-0 bg-slate-100">
                <img
                  src={
                    trip.cover_image ||
                    "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80"
                  }
                  alt={trip.trip_name}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 px-3 py-1 bg-amber-500/90 text-white text-xs font-bold rounded-full uppercase tracking-wider backdrop-blur-md">
                  Pending Approval
                </span>
              </div>

              {/* Details */}
              <div className="flex-1 p-6 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                    <span className="text-xs font-bold text-purple-600 bg-purple-50 px-3 py-1 rounded-full uppercase">
                      {trip.category || "Trip"}
                    </span>
                    <div className="text-right">
                      <span className="text-xs text-slate-400 block font-medium">Price / Person</span>
                      <span className="text-lg font-extrabold text-slate-900">
                        ₹{Number(trip.price_per_person || 0).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <h2 className="text-xl font-bold text-slate-900">{trip.trip_name}</h2>
                  <p className="text-slate-600 text-sm mt-2 line-clamp-2">{trip.trip_description}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4 text-xs font-medium text-slate-600 bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-purple-500 shrink-0" />
                      <span className="truncate">{formatDestination(trip.destination)}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-purple-500 shrink-0" />
                      <span>{formatDate(trip.start_date)} - {formatDate(trip.end_date)}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-purple-500 shrink-0" />
                      <span>Limit: {trip.travelers_limit} Travelers</span>
                    </div>
                  </div>

                  <div className="mt-3 text-xs text-slate-500">
                    <strong>Host:</strong> {trip.host_name} ({trip.host_email})
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                  <button
                    disabled={actionLoading === trip.id}
                    onClick={() => handleStatusUpdate(trip.id, "rejected")}
                    className="px-4 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-600 font-semibold text-xs rounded-xl border border-rose-200 transition cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
                  >
                    <XCircle className="w-4 h-4" /> Reject
                  </button>

                  <button
                    disabled={actionLoading === trip.id}
                    onClick={() => handleStatusUpdate(trip.id, "published")}
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm transition cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
                  >
                    {actionLoading === trip.id ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <CheckCircle2 className="w-4 h-4" />
                    )}
                    Approve & Publish Live
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PendingTrips;
