import {
    CalendarDays,
    MapPin,
    User,
    Tag,
} from "lucide-react";

const PaymentTripSummary = ({ booking }) => {

    const trip = booking?.trip;
    const host = booking?.host;

    const formatDate = (date) => {

        if (!date) return "-";

        return new Date(date).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });

    };

    return (

        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">

           

            {/* Content */}

            <div className="p-7">

                <h2 className="text-3xl font-bold text-slate-800">

                    {trip?.name}

                </h2>

                {/* Destination */}

                <div className="flex items-center gap-3 mt-6">

                    <MapPin
                        size={20}
                        className="text-pink-500"
                    />

                    <span className="text-gray-600">

                        {trip?.destination?.name ||
                            trip?.destination ||
                            "Unknown Destination"}

                    </span>

                </div>

                {/* Date */}

                <div className="flex items-center gap-3 mt-4">

                    <CalendarDays
                        size={20}
                        className="text-blue-500"
                    />

                    <span className="text-gray-600">

                        {formatDate(trip?.start_date)}
                        {" - "}
                        {formatDate(trip?.end_date)}

                    </span>

                </div>

                {/* Host */}

                <div className="flex items-center gap-3 mt-4">

                    <User
                        size={20}
                        className="text-green-500"
                    />

                    <span className="text-gray-600">

                        Hosted by{" "}
                        <span className="font-semibold text-slate-800">

                            {host?.name}

                        </span>

                    </span>

                </div>

                {/* Category */}

                <div className="flex items-center gap-3 mt-4">

                    <Tag
                        size={20}
                        className="text-orange-500"
                    />

                    <span className="text-gray-600">

                        {trip?.category}

                    </span>

                </div>

            </div>

        </div>

    );

};

export default PaymentTripSummary;