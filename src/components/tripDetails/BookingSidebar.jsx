import {
    CalendarDays,
    Heart,
    Share2,
    ShieldCheck,
    Users,
    Wallet,
} from "lucide-react";
import { useNavigate } from "react-router-dom";


const BookingSidebar = ({ trip }) => {
    const navigate = useNavigate();
    const handleJoinTrip = () => {

        navigate(`/join-trip/${trip.id}`);

    };
    const seatsLeft =

        (trip?.travelers_limit ?? 0) -

        (trip?.current_bookings ?? 0);

    const bookedPercentage =

        trip?.travelers_limit

            ? ((trip?.current_bookings ?? 0) /

                trip.travelers_limit) * 100

            : 0;

    const totalDays = Math.max(

        1,

        Math.ceil(

            (

                new Date(trip?.end_date) -

                new Date(trip?.start_date)

            ) /

            (1000 * 60 * 60 * 24)

        )

    );

    const formatDate = (date) =>

        new Date(date).toLocaleDateString(

            "en-IN",

            {

                day: "numeric",

                month: "short",

                year: "numeric",

            }

        );

    return (

        <aside className="sticky top-24 space-y-6">

            {/* Price */}

            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">

                <p className="text-gray-500">

                    Starting From

                </p>

                <h2 className="text-4xl font-bold text-pink-600 mt-2">

                    ₹{trip?.price_per_person}

                </h2>

                <p className="text-gray-500">

                    Per Traveler

                </p>

                <button 
                    onClick={handleJoinTrip}
                className="w-full mt-8 py-4 rounded-2xl bg-gradient-to-r from-pink-500 to-violet-600 text-white font-semibold hover:opacity-90 transition">

                    Join This Trip

                </button>

                <p className="text-xs text-center text-gray-500 mt-4">

                    No payment required until booking confirmation.

                </p>

            </div>

            {/* Seats */}

            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">

                <div className="flex items-center justify-between">

                    <div className="flex items-center gap-2">

                        <Users size={20} className="text-violet-600" />

                        <span className="font-semibold">

                            Seats Left

                        </span>

                    </div>

                    <span className="font-bold text-green-600">

                        {seatsLeft}/{trip?.travelers_limit}

                    </span>

                </div>

                <div className="w-full h-3 bg-slate-200 rounded-full mt-5 overflow-hidden">

                    <div

                        style={{

                            width: `${bookedPercentage}%`

                        }}

                        className="h-full bg-gradient-to-r from-pink-500 to-violet-600"

                    />

                </div>

            </div>

            {/* Trip Summary */}

            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">

                <h3 className="text-xl font-bold mb-5">

                    Trip Summary

                </h3>

                <div className="space-y-5">

                    <div className="flex justify-between">

                        <span className="text-gray-500">

                            Duration

                        </span>

                        <span className="font-semibold">

                            {totalDays} Days

                        </span>

                    </div>

                    <div className="flex justify-between">

                        <span className="text-gray-500">

                            Departure

                        </span>

                        <span className="font-semibold">

                            {formatDate(

                                trip?.start_date

                            )}

                        </span>

                    </div>

                    <div className="flex justify-between">

                        <span className="text-gray-500">

                            Category

                        </span>

                        <span className="capitalize font-semibold">

                            {trip?.category}

                        </span>

                    </div>

                    <div className="flex justify-between">

                        <span className="text-gray-500">

                            Trip Type

                        </span>

                        <span className="font-semibold">

                            {

                                trip?.trip_type === "hosted_trip"

                                    ? "Hosted"

                                    : "Community"

                            }

                        </span>

                    </div>

                </div>

            </div>

            {/* Trust */}

            <div className="bg-green-50 rounded-3xl border border-green-200 p-6">

                <div className="flex items-center gap-3">

                    <ShieldCheck className="text-green-600" />

                    <h3 className="font-bold">

                        Travel With Confidence

                    </h3>

                </div>

                <p className="text-sm text-gray-600 mt-4 leading-7">

                    Verified host, secure payments, transparent pricing and customer support throughout your journey.

                </p>

            </div>

            {/* Actions */}

            <div className="grid grid-cols-2 gap-4">

                <button className="flex items-center justify-center gap-2 py-3 rounded-2xl border border-slate-200 hover:bg-slate-100 transition">

                    <Heart size={18} />

                    Save

                </button>

                <button className="flex items-center justify-center gap-2 py-3 rounded-2xl border border-slate-200 hover:bg-slate-100 transition">

                    <Share2 size={18} />

                    Share

                </button>

            </div>

        </aside>

    );

};

export default BookingSidebar;