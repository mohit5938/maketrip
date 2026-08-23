import { FileText } from "lucide-react";

const AboutSection = ({ trip }) => {

    return (

        <section className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 lg:p-8">

            {/* Heading */}

            <div className="flex items-center gap-4">

                <div className="w-14 h-14 rounded-2xl bg-pink-100 flex items-center justify-center">

                    <FileText
                        size={28}
                        className="text-pink-500"
                    />

                </div>

                <div>

                    <h2 className="text-2xl lg:text-3xl font-bold">

                        About This Trip

                    </h2>

                    <p className="text-gray-500 mt-1">

                        Get to know what makes this trip special.

                    </p>

                </div>

            </div>

            {/* Description */}

            <div className="mt-8">

                <p className="text-gray-600 text-[16px] leading-8 whitespace-pre-line">

                    {

                        trip?.trip_description ||

                        "No description available for this trip."

                    }

                </p>

            </div>

            {/* Information Box */}

            <div className="mt-10 rounded-2xl bg-gradient-to-r from-pink-50 to-violet-50 border border-pink-100 p-6">

                <h3 className="text-lg font-semibold text-slate-800">

                    Before You Join

                </h3>

                <p className="mt-3 text-gray-600 leading-7">

                    Please read the trip description carefully before joining.

                    Make sure you're comfortable with the itinerary, trip type,

                    accommodation, and activities planned by the host.

                </p>

            </div>

        </section>

    );

};

export default AboutSection;