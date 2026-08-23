import {
    BadgeCheck,
    MessageCircle,
    Star,
} from "lucide-react";

const HostCard = ({ trip }) => {

    return (

        <section className="mt-8">

            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 lg:p-8">

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">

                    {/* Host Info */}

                    <div className="flex items-center gap-5">

                        <img

                            src={
                                trip?.profile_image ||

                                `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                    trip?.full_name || "Host"
                                )}&background=ec4899&color=fff`
                            }

                            alt={trip?.full_name}

                            className="w-24 h-24 rounded-full object-cover border-4 border-pink-100"

                        />

                        <div>

                            <div className="flex items-center gap-2">

                                <h2 className="text-2xl font-bold">

                                    {trip?.full_name}

                                </h2>

                                <BadgeCheck
                                    size={22}
                                    className="text-blue-600"
                                />

                            </div>

                            <p className="text-gray-500 mt-2">

                                Verified Trip Host

                            </p>

                         
                        </div>

                    </div>

                    {/* Button */}

                    <button

                        className="flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-pink-500 text-white font-semibold hover:bg-pink-600 transition"

                    >

                        <MessageCircle size={20} />

                        Message Host

                    </button>

                </div>

             
            </div>

        </section>

    );

};

export default HostCard;