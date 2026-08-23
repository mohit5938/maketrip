import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Heart,
  Compass,
  MapPin,
  Calendar,
  IndianRupee,
  Loader2,
  Trash2,
  Sparkles,
  ArrowRight
} from "lucide-react";
import Navbar from "../components/Navbar.jsx";
import { getUserWishlistApi, toggleWishlistApi } from "../services/wishlistService.js";

const Wishlist = () => {
  const navigate = useNavigate();
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      setLoading(true);
      const res = await getUserWishlistApi();
      if (res.success) {
        setTrips(res.trips || []);
      }
    } catch (error) {
      toast.error(error.message || "Failed to load wishlist.");
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (tripId, tripName) => {
    try {
      const res = await toggleWishlistApi(tripId);
      if (res.success) {
        toast.info(`Removed "${tripName}" from Wishlist`);
        setTrips((prev) => prev.filter((t) => String(t.tripId) !== String(tripId)));
      }
    } catch (error) {
      toast.error(error.message || "Failed to remove trip.");
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "TBD";
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  };

  const getDestinationName = (dest) => {
    if (!dest) return "Expedition";
    if (typeof dest === "object") return dest.name || dest.city || "Expedition";
    return dest;
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-8">
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-rose-600 via-pink-600 to-purple-700 rounded-3xl p-6 sm:p-10 text-white shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/15 text-xs font-semibold backdrop-blur-md mb-3">
              <Heart className="w-3.5 h-3.5 fill-rose-300 text-rose-300" /> Saved Travel Bucketlist
            </span>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
              My Saved Expeditions ({trips.length})
            </h1>
            <p className="text-xs sm:text-sm text-pink-100 mt-1 max-w-xl">
              Keep track of journeys you love, monitor available seats, and book when you're ready to explore.
            </p>
          </div>

          <button
            onClick={() => navigate("/trips")}
            className="px-5 py-3 bg-white hover:bg-slate-100 text-rose-600 font-bold text-xs rounded-2xl shadow-md transition flex items-center gap-2 cursor-pointer shrink-0"
          >
            <Compass className="w-4 h-4 text-pink-600" /> Explore More Trips
          </button>
        </div>

        {/* Wishlist Grid / State */}
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center text-slate-500">
            <Loader2 className="w-10 h-10 animate-spin text-pink-600 mb-3" />
            <p className="font-semibold text-sm">Fetching your saved expeditions...</p>
          </div>
        ) : trips.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-200/90 p-12 text-center shadow-xs max-w-md mx-auto my-8">
            <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-4 border border-rose-100">
              <Heart className="w-8 h-8 text-rose-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Your Wishlist is Empty</h3>
            <p className="text-slate-500 text-sm mt-2 leading-relaxed">
              You haven't saved any travel expeditions yet. Tap the heart icon on any trip card to save it for later!
            </p>
            <button
              onClick={() => navigate("/trips")}
              className="mt-6 px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white font-bold text-xs rounded-xl shadow-md transition inline-flex items-center gap-2 cursor-pointer"
            >
              <Compass className="w-4 h-4" /> Discover Expeditions
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trips.map((trip) => (
              <div
                key={trip.wishlistId}
                className="bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group relative"
              >
                {/* Image Banner */}
                <div className="relative h-56 w-full bg-slate-100 overflow-hidden">
                  <img
                    src={trip.coverImage}
                    alt={trip.tripName}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />

                  {/* Category Tag */}
                  <span className="absolute top-3 left-3 px-3 py-1 bg-black/60 backdrop-blur-md text-white text-xs font-semibold rounded-full uppercase tracking-wider">
                    {trip.category || "Expedition"}
                  </span>

                  {/* Remove Wishlist Button */}
                  <button
                    onClick={() => handleRemove(trip.tripId, trip.tripName)}
                    className="absolute top-3 right-3 p-2.5 rounded-full bg-white/90 backdrop-blur-md text-rose-500 hover:bg-rose-500 hover:text-white transition shadow-md cursor-pointer"
                    title="Remove from Wishlist"
                  >
                    <Heart className="w-4 h-4 fill-rose-500 hover:fill-white" />
                  </button>

                  <div className="absolute bottom-3 left-3 right-3 text-white flex items-center justify-between">
                    <span className="text-xs font-semibold flex items-center gap-1 bg-black/40 px-2.5 py-1 rounded-md backdrop-blur-sm">
                      <MapPin className="w-3.5 h-3.5 text-pink-400" /> {getDestinationName(trip.destination)}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 line-clamp-1 group-hover:text-pink-600 transition">
                      {trip.tripName}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2 mt-1">
                      {trip.description || "Embark on an unforgettable journey with fellow travelers."}
                    </p>

                    <div className="flex items-center gap-4 mt-3 text-xs text-slate-600 border-t border-slate-100 pt-3">
                      <span className="flex items-center gap-1 font-medium">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" /> {formatDate(trip.startDate)}
                      </span>
                      <span className="text-slate-400">•</span>
                      <span className="font-semibold text-slate-700">Host: {trip.hostName}</span>
                    </div>
                  </div>

                  {/* Footer Price & Action */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Price</span>
                      <span className="text-lg font-black text-slate-900">
                        ₹{Number(trip.pricePerPerson || 0).toLocaleString()}
                      </span>
                    </div>

                    <button
                      onClick={() => navigate(`/trip/${trip.tripId}`)}
                      className="px-4 py-2 bg-slate-900 hover:bg-pink-600 text-white font-bold text-xs rounded-xl shadow-sm transition flex items-center gap-1.5 cursor-pointer"
                    >
                      View Details <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Wishlist;
