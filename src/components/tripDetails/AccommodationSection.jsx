import {
    Hotel,
    BedDouble,
    IndianRupee,
    CheckCircle2,
} from "lucide-react";

const AccommodationSection = ({ trip }) => {

    return (

        <section className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 lg:p-8">

            {/* Header */}

            <div className="flex items-center gap-4">

                <div className="w-14 h-14 rounded-2xl bg-violet-100 flex items-center justify-center">

                    <Hotel
                        size={28}
                        className="text-violet-600"
                    />

                </div>

                <div>

                    <h2 className="text-2xl lg:text-3xl font-bold">

                        Accommodation

                    </h2>

                    <p className="text-gray-500 mt-1">

                        Stay information during your trip.

                    </p>

                </div>

            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">

                {/* Image */}

                <div>

                    <img

                        src={

                            trip?.cover_image ||

                            "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200"

                        }

                        alt={trip?.trip_name}

                        className="w-full h-72 lg:h-80 rounded-3xl object-cover"

                    />

                </div>

                {/* Details */}

                <div className="flex flex-col justify-between">

                    <div>

                        <div className="flex items-center gap-3">

                            <BedDouble
                                size={24}
                                className="text-violet-600"
                            />

                            <h3 className="text-2xl font-bold">

                                {trip?.accommodation}

                            </h3>

                        </div>

                        <p className="mt-6 text-gray-600 leading-8">

                            {

                                trip?.accommodation_description ||

                                "Comfortable accommodation arranged by the host for all travelers."

                            }

                        </p>

                    </div>

                    {/* Price */}

                    <div className="mt-8 rounded-2xl bg-slate-50 border border-slate-200 p-6">

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-gray-500">

                                    Accommodation Cost

                                </p>

                                <h3 className="text-3xl font-bold text-violet-600 mt-2">

                                    ₹{trip?.accommodation_cost}

                                </h3>

                            </div>

                            <IndianRupee
                                size={38}
                                className="text-violet-600"
                            />

                        </div>

                    </div>

                    {/* Amenities */}

                    <div className="grid grid-cols-2 gap-4 mt-8">

                        <div className="flex items-center gap-3 rounded-2xl border border-slate-200 p-4">

                            <CheckCircle2
                                size={20}
                                className="text-green-500"
                            />

                            <span>

                                Comfortable Stay

                            </span>

                        </div>

                        <div className="flex items-center gap-3 rounded-2xl border border-slate-200 p-4">

                            <CheckCircle2
                                size={20}
                                className="text-green-500"
                            />

                            <span>

                                Clean Rooms

                            </span>

                        </div>

                        <div className="flex items-center gap-3 rounded-2xl border border-slate-200 p-4">

                            <CheckCircle2
                                size={20}
                                className="text-green-500"
                            />

                            <span>

                                Safe Location

                            </span>

                        </div>

                        <div className="flex items-center gap-3 rounded-2xl border border-slate-200 p-4">

                            <CheckCircle2
                                size={20}
                                className="text-green-500"
                            />

                            <span>

                                Verified Stay

                            </span>

                        </div>

                    </div>

                </div>

            </div>

        </section>

    );

};

export default AccommodationSection;