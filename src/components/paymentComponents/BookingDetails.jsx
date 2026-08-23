import {
    Receipt,
    CalendarDays,
    Clock3,
    Phone,
    User,
    Hash,
} from "lucide-react";

const BookingDetails = ({ booking }) => {

    const formatDateTime = (date) => {

        if (!date) return "-";

        return new Date(date).toLocaleString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "numeric",
            minute: "2-digit",
        });

    };

    return (

        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-7">

            <div className="flex items-center gap-3 mb-8">

                <div className="w-12 h-12 rounded-2xl bg-pink-100 flex items-center justify-center">

                    <Receipt
                        size={24}
                        className="text-pink-600"
                    />

                </div>

                <div>

                    <h2 className="text-2xl font-bold text-slate-800">

                        Booking Details

                    </h2>

                    <p className="text-sm text-gray-500">

                        Review your booking information before payment.

                    </p>

                </div>

            </div>

            <div className="space-y-5">

                {/* Booking ID */}

                <div className="flex justify-between items-center">

                    <div className="flex items-center gap-3 text-gray-600">

                        <Hash
                            size={18}
                            className="text-blue-500"
                        />

                        <span>Booking ID</span>

                    </div>

                    <span className="font-semibold text-slate-800">

                        #{booking?.id}

                    </span>

                </div>

                <hr />

                {/* Traveler */}

                <div className="flex justify-between items-center">

                    <div className="flex items-center gap-3 text-gray-600">

                        <User
                            size={18}
                            className="text-green-500"
                        />

                        <span>Traveler</span>

                    </div>

                    <span className="font-semibold text-slate-800">

                        {booking?.traveler?.name || "-"}

                    </span>

                </div>

                <hr />

                {/* Phone */}

                <div className="flex justify-between items-center">

                    <div className="flex items-center gap-3 text-gray-600">

                        <Phone
                            size={18}
                            className="text-orange-500"
                        />

                        <span>Phone</span>

                    </div>

                    <span className="font-semibold text-slate-800">

                        {booking?.phone || "-"}

                    </span>

                </div>

                <hr />

                {/* Joined At */}

                <div className="flex justify-between items-center">

                    <div className="flex items-center gap-3 text-gray-600">

                        <CalendarDays
                            size={18}
                            className="text-indigo-500"
                        />

                        <span>Booked On</span>

                    </div>

                    <span className="font-semibold text-slate-800">

                        {formatDateTime(booking?.joined_at)}

                    </span>

                </div>

                <hr />

                {/* Expires */}

                <div className="flex justify-between items-center">

                    <div className="flex items-center gap-3 text-gray-600">

                        <Clock3
                            size={18}
                            className="text-red-500"
                        />

                        <span>Payment Expires</span>

                    </div>

                    <span className="font-semibold text-red-600">

                        {formatDateTime(booking?.expires_at)}

                    </span>

                </div>

            </div>

        </div>

    );

};

export default BookingDetails;