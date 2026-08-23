import {
    MapPin,
    CalendarDays,
    Users,
    User,
    Compass,
    Clock3,
} from "lucide-react";

const BookingSummary = ({ trip }) => {

    const formatDate = (date) => {

        return new Date(date).toLocaleDateString(

            "en-IN",

            {

                day: "numeric",

                month: "short",

                year: "numeric",

            }

        );

    };

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

    return (

        <section className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">

            {/* Cover */}

            <img

                src={
                    trip?.cover_image ||
                    "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200"
                }

                alt={trip?.trip_name}

                className="w-full h-56 object-cover"

            />

            <div className="p-6">

                {/* Trip Name */}

                <div className="flex flex-wrap items-center gap-3">

                    <h2 className="text-2xl font-bold">

                        {trip?.trip_name}

                    </h2>

                    <span className="px-3 py-1 rounded-full bg-violet-100 text-violet-700 text-sm font-medium">

                        {trip?.category}

                    </span>

                </div>

                {/* Destination */}

                <div className="flex items-center gap-2 mt-4 text-gray-600">

                    <MapPin size={18} />

                    <span>

                        {trip?.destination?.name}

                    </span>

                </div>

                {/* Grid */}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-6">

                    <div className="flex items-center gap-3">

                        <CalendarDays
                            size={20}
                            className="text-pink-500"
                        />

                        <div>

                            <p className="text-xs text-gray-500">

                                Dates

                            </p>

                            <p className="font-semibold">

                                {formatDate(trip?.start_date)}

                                {" - "}

                                {formatDate(trip?.end_date)}

                            </p>

                        </div>

                    </div>

                    <div className="flex items-center gap-3">

                        <Clock3
                            size={20}
                            className="text-orange-500"
                        />

                        <div>

                            <p className="text-xs text-gray-500">

                                Duration

                            </p>

                            <p className="font-semibold">

                                {totalDays} Days

                            </p>

                        </div>

                    </div>

                    <div className="flex items-center gap-3">

                        <Users
                            size={20}
                            className="text-green-600"
                        />

                        <div>

                            <p className="text-xs text-gray-500">

                                Seats

                            </p>

                            <p className="font-semibold">

                                {(trip?.travelers_limit ?? 0) - (trip?.current_bookings ?? 0)}

                                {" / "}

                                {trip?.travelers_limit}

                            </p>

                        </div>

                    </div>

                   

                </div>

                {/* Host */}

                <div className="flex items-center gap-4 mt-8 pt-6 border-t border-slate-200">

                    <img

                        src={
                            trip?.profile_image ||
                            `https://ui-avatars.com/api/?name=${encodeURIComponent(trip?.full_name || "Host")}`
                        }

                        alt={trip?.full_name}

                        className="w-14 h-14 rounded-full object-cover"

                    />

                    <div>

                        <p className="text-xs text-gray-500">

                            Hosted By

                        </p>

                        <h3 className="font-semibold">

                            {trip?.full_name}

                        </h3>

                    </div>

                </div>

            </div>

        </section>

    );

};

export default BookingSummary;