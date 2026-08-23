import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, MapPin, Calendar, Compass, CheckCircle2, Utensils, Luggage, Loader2, ArrowRight, Flame, HeartHandshake } from "lucide-react";
import { toast } from "react-toastify";
import { generateAIItineraryApi } from "../../services/aiItineraryService.js";

const QUICK_VIBES = [
  "🎒 Solo Backpacker & Cafes",
  "🏔️ High Altitude Trekking",
  "🌊 Beach, Sunsets & Nightlife",
  "☕ Relaxed Culture & Foodie",
  "🏎️ Thrill Seeker & Watersports",
];

const HomeAITravelPlanner = () => {
  const navigate = useNavigate();
  const [destination, setDestination] = useState("Manali");
  const [duration, setDuration] = useState("3");
  const [vibe, setVibe] = useState("Peaceful solo backpacker with cozy cafe spots and mountain views");
  const [loading, setLoading] = useState(false);
  const [aiPlan, setAiPlan] = useState(null);
  const [matchingTrips, setMatchingTrips] = useState([]);

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!destination.trim()) {
      return toast.error("Please enter a destination to search AI plans.");
    }

    try {
      setLoading(true);
      const res = await generateAIItineraryApi(destination, duration, vibe);
      if (res.success && res.plan) {
        setAiPlan(res.plan);
        setMatchingTrips(res.matchingTrips || []);
        toast.success(`Gemini AI generated your custom guide for ${destination}!`);
      }
    } catch (error) {
      toast.error(error.message || "Failed to generate AI travel plan.");
    } finally {
      setLoading(false);
    }
  };

  const getDestinationName = (dest) => {
    if (!dest) return "Expedition";
    if (typeof dest === "object") return dest.name || dest.city || "Expedition";
    return dest;
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-14">
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-purple-950 rounded-3xl p-6 sm:p-12 text-white shadow-2xl border border-white/10 relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-10">
          {/* Header */}
          <div className="max-w-3xl space-y-3">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-xs font-semibold backdrop-blur-md border border-white/15 text-pink-300">
              <Sparkles className="w-4 h-4 text-pink-400" /> Powered by Google Gemini AI
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Personalized AI Travel Planner & Expedition Matcher
            </h2>
            <p className="text-xs sm:text-base text-slate-300 leading-relaxed">
              Describe your dream journey in your own words! Google Gemini AI will write a custom day-by-day itinerary tailored to your vibe, and find real hosted expeditions ready to join.
            </p>
          </div>

          {/* Spacious Form Controls */}
          <form onSubmit={handleGenerate} className="bg-white/10 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-white/15 space-y-8 shadow-inner">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Destination */}
              <div>
                <label className="block text-xs font-bold text-pink-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-pink-400" /> Destination Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Goa, Ladakh, Manali, Bali, Paris"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full px-4 py-3.5 bg-white/10 border border-white/20 rounded-2xl text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:bg-white/20 transition shadow-inner"
                />
              </div>

              {/* Trip Duration */}
              <div>
                <label className="block text-xs font-bold text-pink-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-purple-400" /> Trip Duration
                </label>
                <select
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full px-4 py-3.5 bg-slate-900 border border-white/20 rounded-2xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-pink-500 cursor-pointer shadow-inner"
                >
                  <option value="3">3 Days (Weekend Escape)</option>
                  <option value="5">5 Days (Full Expedition)</option>
                  <option value="7">7 Days (Grand Journey)</option>
                  <option value="10">10 Days (Ultimate Vacation)</option>
                </select>
              </div>
            </div>

            {/* Spacious Custom Vibe & Travel Style Card */}
            <div className="bg-white/5 p-6 rounded-2xl border border-white/10 space-y-4">
              <div>
                <label className="block text-xs sm:text-sm font-bold text-pink-300 uppercase tracking-wider mb-1.5 flex items-center gap-2">
                  <HeartHandshake className="w-4 h-4 text-pink-400" /> Describe Your Personal Travel Style & Vibe
                </label>
                <p className="text-xs text-slate-300 mb-3">
                  Write in your own natural words! Tell Gemini AI what you love (e.g. sunset coffee spots, budget backpacking, thrill sports).
                </p>
                <textarea
                  rows="3"
                  value={vibe}
                  onChange={(e) => setVibe(e.target.value)}
                  placeholder="e.g. Budget solo backpacker who loves sunset spots, street food, hidden cafes, and acoustic music evenings..."
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-2xl text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-pink-500 transition leading-relaxed shadow-inner"
                />
              </div>

              {/* Quick Vibe Badges */}
              <div className="pt-2">
                <span className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5 mb-2.5">
                  <Flame className="w-4 h-4 text-amber-400" /> Need inspiration? Tap a quick vibe:
                </span>
                <div className="flex flex-wrap gap-2.5">
                  {QUICK_VIBES.map((qv, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setVibe(qv)}
                      className="px-3.5 py-2 bg-white/10 hover:bg-white/20 active:scale-95 border border-white/20 text-xs font-semibold rounded-xl text-slate-200 transition cursor-pointer shadow-xs"
                    >
                      {qv}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Big High-Contrast Submit CTA Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-black text-sm sm:text-base rounded-2xl shadow-xl shadow-pink-500/20 transition transform active:scale-98 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" /> Consulting Google Gemini AI...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 text-amber-300" /> Generate Personal AI Itinerary & Match Trips
                </>
              )}
            </button>
          </form>

          {/* AI Plan & Matching Trips Output */}
          {aiPlan && (
            <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-400">
              {/* AI Itinerary Box */}
              <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-white/15 space-y-8 shadow-2xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 pb-5 gap-3">
                  <div>
                    <h3 className="text-2xl font-black text-white flex items-center gap-2.5">
                      <Compass className="w-6 h-6 text-pink-400" /> Gemini AI Personal Guide: {aiPlan.destination}
                    </h3>
                    <p className="text-xs sm:text-sm text-pink-300 mt-1 font-medium">
                      ✨ Customized Vibe: "{aiPlan.vibe}" • {aiPlan.durationDays}-Day Personal Schedule
                    </p>
                  </div>
                </div>

                {/* Day-by-Day Schedule */}
                <div className="space-y-5">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Day-by-Day Journey Schedule</h4>
                  <div className="space-y-4">
                    {aiPlan.itineraryDays.map((day) => (
                      <div key={day.dayNumber} className="bg-white/10 p-5 rounded-2xl border border-white/10 space-y-3 shadow-xs">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <h5 className="font-bold text-pink-300 text-base">{day.title}</h5>
                          {day.accommodationNote && (
                            <span className="px-3 py-1 bg-purple-500/20 text-purple-200 border border-purple-400/30 text-xs font-semibold rounded-full self-start sm:self-auto">
                              🏡 {day.accommodationNote}
                            </span>
                          )}
                        </div>
                        <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">{day.description}</p>

                        <div className="flex flex-wrap gap-2 pt-1 border-t border-white/10">
                          {day.activities.map((act, i) => (
                            <span key={i} className="px-3 py-1 bg-white/10 text-xs rounded-full text-slate-200 font-medium border border-white/10">
                              • {act}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Packing & Food Extras */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  {/* Packing */}
                  <div className="bg-white/5 p-5 rounded-2xl border border-white/10 space-y-3">
                    <h5 className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-2">
                      <Luggage className="w-4 h-4 text-amber-400" /> Vibe-Matched Packing Essentials
                    </h5>
                    <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                      {aiPlan.packingChecklist.map((item, i) => (
                        <li key={i} className="flex items-center gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Food */}
                  <div className="bg-white/5 p-5 rounded-2xl border border-white/10 space-y-3">
                    <h5 className="text-xs font-bold text-pink-300 uppercase tracking-wider flex items-center gap-2">
                      <Utensils className="w-4 h-4 text-pink-400" /> Recommended Dining & Spots
                    </h5>
                    <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                      {aiPlan.foodRecommendations.map((food, i) => (
                        <li key={i} className="flex items-center gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-pink-400 shrink-0" /> {food}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Matching Live Expeditions */}
              <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-white/15 space-y-6 shadow-2xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 pb-5 gap-3">
                  <div>
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-pink-400" /> Real Expeditions Matching Your Vibe ({matchingTrips.length})
                    </h3>
                    <p className="text-xs text-slate-300 mt-1">
                      Hosted trips ready to join matching "{aiPlan.destination}"
                    </p>
                  </div>

                  <button
                    onClick={() => navigate(`/trips?destination=${encodeURIComponent(aiPlan.destination)}`)}
                    className="text-xs font-bold text-pink-400 hover:text-pink-300 flex items-center gap-1 cursor-pointer"
                  >
                    View All <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {matchingTrips.length === 0 ? (
                  <div className="text-center py-10 text-slate-400 text-xs sm:text-sm">
                    No active hosted trips currently listed matching "{aiPlan.destination}". Check back soon or explore all available trips!
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {matchingTrips.map((trip) => (
                      <div
                        key={trip.id}
                        onClick={() => navigate(`/trip/${trip.id}`)}
                        className="bg-white text-slate-900 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition duration-300 cursor-pointer flex flex-col group"
                      >
                        <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                          <img
                            src={trip.cover_image || "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200"}
                            alt={trip.trip_name}
                            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                          />
                          <span className="absolute top-3 left-3 px-3 py-1 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold rounded-full uppercase tracking-wider">
                            {trip.category || "Expedition"}
                          </span>
                        </div>

                        <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                          <div>
                            <h4 className="font-bold text-base text-slate-900 group-hover:text-pink-600 transition line-clamp-1">
                              {trip.trip_name}
                            </h4>
                            <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                              <MapPin className="w-3.5 h-3.5 text-pink-500" /> {getDestinationName(trip.destination)}
                            </p>
                          </div>

                          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                            <div>
                              <span className="text-[10px] font-bold text-slate-400 uppercase block">Starting Price</span>
                              <span className="text-base font-black text-slate-900">₹{Number(trip.price_per_person || 0).toLocaleString()}</span>
                            </div>

                            <button className="px-4 py-2 bg-slate-900 hover:bg-pink-600 text-white font-bold text-xs rounded-xl transition flex items-center gap-1">
                              Join Expedition <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HomeAITravelPlanner;
