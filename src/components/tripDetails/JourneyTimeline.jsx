import React, { useEffect, useState } from "react";
import {
    MapPin,
    Navigation,
    Car,
    Bus,
    Train,
    Plane,
    Calendar,
    Sparkles,
    CheckCircle2
} from "lucide-react";
import { getTripItineraryApi } from "../../services/aiItineraryService.js";

const JourneyTimeline = ({ trip }) => {
    const [itinerary, setItinerary] = useState([]);
    const [loading, setLoading] = useState(false);
    const stops = trip?.stops || [];

    useEffect(() => {
        if (trip?.id) {
            fetchItinerary();
        }
    }, [trip?.id]);

    const fetchItinerary = async () => {
        try {
            setLoading(true);
            const res = await getTripItineraryApi(trip.id);
            if (res.success && res.itinerary && res.itinerary.length > 0) {
                setItinerary(res.itinerary);
            }
        } catch (e) {
            console.warn("Fetch itinerary warning:", e);
        } finally {
            setLoading(false);
        }
    };

    const getTransportIcon = (mode) => {
        switch (mode?.toLowerCase()) {
            case "car":
                return <Car size={18} className="text-violet-600" />;
            case "bus":
                return <Bus size={18} className="text-violet-600" />;
            case "train":
                return <Train size={18} className="text-violet-600" />;
            case "flight":
                return <Plane size={18} className="text-violet-600" />;
            default:
                return <Navigation size={18} className="text-violet-600" />;
        }
    };

    const getDestinationName = (dest) => {
        if (!dest) return "Destination";
        if (typeof dest === "object") return dest.name || dest.city || "Destination";
        return dest;
    };

    return (
        <section className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6 lg:p-8 space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-100 pb-6">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white shadow-md">
                        <Calendar size={24} />
                    </div>
                    <div>
                        <span className="text-xs font-bold text-pink-600 uppercase tracking-wider flex items-center gap-1">
                            <Sparkles className="w-3.5 h-3.5" /> Day-by-Day Schedule
                        </span>
                        <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 mt-0.5">
                            Expedition Itinerary & Route
                        </h2>
                    </div>
                </div>
            </div>

            {/* Day-by-Day Itinerary List */}
            {itinerary.length > 0 ? (
                <div className="space-y-6">
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">
                        Detailed Day-by-Day Schedule
                    </h3>
                    <div className="space-y-4">
                        {itinerary.map((step) => (
                            <div key={step.id || step.dayNumber} className="p-5 bg-slate-50 rounded-2xl border border-slate-100 space-y-3">
                                <div className="flex items-center justify-between">
                                    <h4 className="font-bold text-pink-600 text-base">{step.title}</h4>
                                    {step.accommodationNote && (
                                        <span className="px-3 py-1 bg-purple-50 text-purple-700 border border-purple-200 text-xs font-semibold rounded-full">
                                            🏡 {step.accommodationNote}
                                        </span>
                                    )}
                                </div>
                                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                                    {step.description}
                                </p>
                                {Array.isArray(step.activities) && step.activities.length > 0 && (
                                    <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-200/60">
                                        {step.activities.map((act, i) => (
                                            <span key={i} className="inline-flex items-center gap-1 px-3 py-1 bg-white border border-slate-200 text-slate-700 text-xs font-medium rounded-full shadow-2xs">
                                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> {act}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            ) : null}

            {/* Route & Route Stops Timeline */}
            <div>
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">
                    Route & Travel Stops
                </h3>

                <div className="mt-4">
                    {/* Start */}
                    <div className="flex gap-5">
                        <div className="flex flex-col items-center">
                            <div className="w-5 h-5 rounded-full bg-emerald-500 border-4 border-emerald-100"></div>
                            <div className="w-1 bg-slate-200 flex-1 min-h-16"></div>
                        </div>

                        <div className="pb-6 flex-1">
                            <span className="text-xs font-bold text-emerald-600 tracking-wider">START LOCATION</span>
                            <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                                {getDestinationName(trip?.start_location)}
                            </h3>
                            <p className="text-xs text-slate-500 mt-1">Starting point of the adventure.</p>
                        </div>
                    </div>

                    {/* Stops */}
                    {stops.map((stop, index) => (
                        <div key={index} className="flex gap-5">
                            <div className="flex flex-col items-center">
                                <div className="w-5 h-5 rounded-full bg-amber-500 border-4 border-amber-100"></div>
                                {index !== stops.length - 1 && (
                                    <div className="w-1 bg-slate-200 flex-1 min-h-16"></div>
                                )}
                            </div>

                            <div className="pb-6 flex-1">
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                                    <div>
                                        <span className="text-xs font-bold text-amber-600 tracking-wider">STOP {index + 1}</span>
                                        <h3 className="text-base font-bold text-slate-900 mt-0.5">
                                            {getDestinationName(stop?.location)}
                                        </h3>
                                    </div>

                                    <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-50 text-violet-700 border border-violet-200 text-xs font-semibold self-start md:self-auto">
                                        {getTransportIcon(stop?.transport_mode)}
                                        <span className="capitalize">{stop?.transport_mode}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Destination */}
                    <div className="flex gap-5">
                        <div className="flex items-center">
                            <div className="w-5 h-5 rounded-full bg-rose-500 border-4 border-rose-100"></div>
                        </div>

                        <div>
                            <span className="text-xs font-bold text-rose-600 tracking-wider">FINAL DESTINATION</span>
                            <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                                {getDestinationName(trip?.destination)}
                            </h3>
                            <p className="text-xs text-slate-500 mt-1">Final destination of the trip.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default JourneyTimeline;