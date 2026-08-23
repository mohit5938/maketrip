import {
    Calendar,
    Heart,
    MapPin,
    Share2,
    Star,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { openAuthModal } from "../../redux/reducers/auth.js";
import { toggleWishlistApi, getUserWishlistIdsApi } from "../../services/wishlistService.js";

const TripHeader = ({ trip }) => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const [isWishlisted, setIsWishlisted] = useState(false);

    useEffect(() => {
        if (trip?.id && user) {
            getUserWishlistIdsApi().then((res) => {
                if (res.success && res.wishlistIds) {
                    const match = res.wishlistIds.some((id) => String(id) === String(trip.id));
                    setIsWishlisted(match);
                }
            });
        }
    }, [trip?.id, user]);

    const handleWishlistToggle = async () => {
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

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: trip?.trip_name || "JoinTrip Expedition",
                text: `Check out this expedition on JoinTrip: ${trip?.trip_name}`,
                url: window.location.href,
            }).catch(() => {});
        } else {
            navigator.clipboard.writeText(window.location.href);
            toast.success("Expedition link copied to clipboard!");
        }
    };

    const formatDate = (date) => {
        if (!date) return "";
        return new Date(date).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });
    };

    const getDestinationName = (dest) => {
        if (!dest) return "Unknown Destination";
        if (typeof dest === "object") return dest.name || dest.city || "Unknown Destination";
        return dest;
    };

    return (
        <section className="mt-10">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
                {/* Left */}
                <div className="flex-1">
                    <div className="flex flex-wrap gap-3">
                        <span className="px-4 py-2 rounded-full bg-pink-100 text-pink-600 text-sm font-semibold capitalize">
                            {trip?.category || "Expedition"}
                        </span>
                    </div>

                    <h1 className="mt-5 text-3xl md:text-4xl xl:text-5xl font-bold leading-tight text-slate-900">
                        {trip?.trip_name}
                    </h1>

                    <div className="flex flex-wrap items-center gap-6 mt-6 text-gray-600">
                        <div className="flex items-center gap-2">
                            <MapPin size={18} className="text-pink-500" />
                            <span>{getDestinationName(trip?.destination)}</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <Calendar size={18} className="text-violet-600" />
                            <span>
                                {formatDate(trip?.start_date)}
                                {" - "}
                                {formatDate(trip?.end_date)}
                            </span>
                        </div>

                        <div className="flex items-center gap-2">
                            <Star size={18} className="fill-amber-400 text-amber-400" />
                            <span className="font-bold text-slate-900">4.9</span>
                            <span className="text-gray-400 text-sm">(Verified Rating)</span>
                        </div>
                    </div>
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={handleWishlistToggle}
                        className={`w-12 h-12 rounded-full border transition flex items-center justify-center shadow-sm cursor-pointer ${
                            isWishlisted
                                ? "bg-rose-50 border-rose-200 text-rose-500 shadow-rose-100"
                                : "bg-white border-slate-200 text-slate-600 hover:bg-rose-50 hover:text-rose-500"
                        }`}
                        title={isWishlisted ? "Remove from Wishlist" : "Save to Wishlist"}
                    >
                        <Heart size={20} className={isWishlisted ? "fill-rose-500 text-rose-500" : ""} />
                    </button>

                    <button
                        onClick={handleShare}
                        className="w-12 h-12 rounded-full border border-slate-200 bg-white shadow-sm flex items-center justify-center text-slate-600 hover:bg-violet-600 hover:text-white transition cursor-pointer"
                        title="Share Expedition"
                    >
                        <Share2 size={20} />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default TripHeader;