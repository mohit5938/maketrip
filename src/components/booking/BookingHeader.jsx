import {
    ShieldCheck,
    CalendarDays,
    MapPin,
} from "lucide-react";

const BookingHeader = ({ trip }) => {

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

    return (

        <section className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6">

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

                {/* Left */}

                <div>

                    <div className="flex items-center gap-3">

                        <div className="w-12 h-12 rounded-xl bg-violet-100 flex items-center justify-center">

                            <ShieldCheck
                                size={24}
                                className="text-violet-600"
                            />

                        </div>

                        <div>

                            <h1 className="text-2xl lg:text-3xl font-bold">

                                Confirm Your Booking

                            </h1>

                            <p className="text-gray-500 mt-1">

                                Review your trip details before continuing.

                            </p>

                        </div>

                    </div>

                </div>

                {/* Right */}

                <div className="flex flex-wrap gap-4">

                    <div className="flex items-center gap-3 bg-slate-50 rounded-xl px-4 py-3">

                        <CalendarDays
                            size={20}
                            className="text-pink-500"
                        />

                        <div>

                            <p className="text-xs text-gray-500">

                                Trip Dates

                            </p>

                            <p className="font-semibold">

                                {formatDate(trip?.start_date)}

                                {" - "}

                                {formatDate(trip?.end_date)}

                            </p>

                        </div>

                    </div>

                    <div className="flex items-center gap-3 bg-slate-50 rounded-xl px-4 py-3">

                        <MapPin
                            size={20}
                            className="text-violet-600"
                        />

                        <div>

                            <p className="text-xs text-gray-500">

                                Destination

                            </p>

                            <p className="font-semibold">

                                {trip?.destination?.name}

                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </section>

    );

};

export default BookingHeader;