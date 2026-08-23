import {
    Heart,
    BadgeCheck,
    MapPin,
    CalendarDays,
    Users,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { openAuthModal } from "../redux/reducers/auth.js";
import { toggleWishlistApi, getUserWishlistIdsApi } from "../services/wishlistService.js";

const TripCard = ({ trip, initialWishlistIds = [] }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const [isWishlisted, setIsWishlisted] = useState(false);

    useEffect(() => {
        if (trip?.id) {
            const match = initialWishlistIds.some((id) => String(id) === String(trip.id));
            setIsWishlisted(match);
        }
    }, [trip?.id, initialWishlistIds]);

    const handleWishlistToggle = async (e) => {
        e.stopPropagation();
        if (!user) {
            toast.info("Please login to save trips to your wishlist.");
            dispatch(openAuthModal());
            return;
        }

        const nextState = !isWishlisted;
        setIsWishlisted(nextState);

        try {
            const res = await toggleWishlistApi(trip.id);
            if (res.success) {
                if (typeof res.isWishlisted === "boolean") {
                    setIsWishlisted(res.isWishlisted);
                }
                toast.success(res.message || (nextState ? "Saved to Wishlist!" : "Removed from Wishlist"));
            }
        } catch (error) {
            setIsWishlisted(!nextState); // revert state
            toast.error(error.message || "Failed to update wishlist.");
        }
    };

    const openTrip = () => {
        navigate(`/trip/${trip.id}`);
    };

    const seatsLeft = Math.max(
        (trip?.travelers_limit ?? 0) -
        (trip?.current_bookings ?? 0),
        0
    );

    const image =
        trip?.cover_image ||
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200";

    const getDestinationName = (dest) => {
        if (!dest) return "Unknown Destination";
        if (typeof dest === "object") return dest.name || dest.city || "Unknown Destination";
        return dest;
    };

    return (
        <div
            onClick={openTrip}
            className="group bg-white rounded-[28px] overflow-hidden border border-slate-200 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 cursor-pointer"
        >
            <div className="relative overflow-hidden">
                <img
                    src={image}
                    alt={trip?.trip_name}
                    className="w-full h-52 sm:h-56 lg:h-60 object-cover group-hover:scale-110 transition-transform duration-700"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                <div className="absolute top-5 left-5">
                    <span className="px-4 py-2 rounded-full bg-white/90 backdrop-blur-md text-sm font-semibold capitalize shadow-lg">
                        {trip?.category || "Travel"}
                    </span>
                </div>

                <button
                    onClick={handleWishlistToggle}
                    className="absolute top-5 right-5 w-11 h-11 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-lg hover:scale-110 transition active:scale-95 cursor-pointer"
                    title={isWishlisted ? "Remove from Wishlist" : "Save to Wishlist"}
                >
                    <Heart
                        size={20}
                        className={isWishlisted ? "fill-rose-500 text-rose-500" : "text-slate-600 hover:text-rose-500"}
                    />
                </button>
            </div>

            <div className="p-5">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <img
                            src={
                                trip?.profile_image ||
                                `https://ui-avatars.com/api/?name=${encodeURIComponent(trip?.full_name || "Host")}&background=ec4899&color=fff`
                            }
                            alt="Host"
                            className="w-12 h-12 rounded-full object-cover border-2 border-pink-400"
                        />
                        <div>
                            <h4 className="font-semibold text-slate-900">{trip?.full_name || "Verified Host"}</h4>
                            <p className="text-xs text-gray-500">Trip Host</p>
                        </div>
                    </div>

                    <div className="px-3 py-1 rounded-full bg-blue-50 text-blue-600 flex items-center gap-1 text-xs font-semibold">
                        <BadgeCheck size={18} /> Verified
                    </div>
                </div>

                <h2 className="mt-6 text-xl sm:text-2xl font-bold text-slate-800 line-clamp-2 group-hover:text-pink-500 transition-colors">
                    {trip?.trip_name}
                </h2>

                <div className="flex items-center gap-2 mt-4 text-gray-500 text-sm">
                    <MapPin size={18} className="text-pink-500 shrink-0" />
                    <span className="line-clamp-1">{getDestinationName(trip?.destination)}</span>
                </div>

                <div className="flex items-center gap-2 mt-3 text-gray-500 text-sm">
                    <CalendarDays size={18} className="text-blue-500 shrink-0" />
                    <span>
                        {new Date(trip?.start_date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                        {" - "}
                        {new Date(trip?.end_date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                    </span>
                </div>

                <div className="flex justify-between items-center mt-6 text-sm">
                    <div className="flex items-center gap-2">
                        <Users size={18} className="text-orange-500" />
                        <span>{seatsLeft} Seats Left</span>
                    </div>
                    <span className="text-green-600 font-semibold">
                        {seatsLeft}/{trip?.travelers_limit ?? 0}
                    </span>
                </div>

                <hr className="my-6 border-slate-200" />

                <div className="flex justify-between items-center">
                    <div>
                        <p className="text-xs text-gray-500">Starting From</p>
                        <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                            ₹ {Number(trip?.price_per_person || 0).toLocaleString("en-IN")}
                        </h3>
                        <p className="text-xs text-gray-500">per person</p>
                    </div>

                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/trip/${trip.id}`);
                        }}
                        className="px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white text-sm font-semibold hover:scale-105 transition cursor-pointer shadow-md"
                    >
                        View Trip
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TripCard;