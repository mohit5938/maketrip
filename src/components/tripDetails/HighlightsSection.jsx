import {
    Sparkles,
    CheckCircle2,
} from "lucide-react";

const HighlightsSection = ({ trip }) => {

    const features = trip?.special_features || [];

    return (

        <section className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 lg:p-8">

            {/* Heading */}

            <div className="flex items-center gap-4">

                <div className="w-14 h-14 rounded-2xl bg-yellow-100 flex items-center justify-center">

                    <Sparkles
                        size={28}
                        className="text-yellow-600"
                    />

                </div>

                <div>

                    <h2 className="text-2xl lg:text-3xl font-bold">

                        Trip Highlights

                    </h2>

                    <p className="text-gray-500 mt-1">

                        The best experiences you'll enjoy on this trip.

                    </p>

                </div>

            </div>

            {

                features.length > 0 ? (

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-8">

                        {

                            features.map(

                                (feature, index) => (

                                    <div
                                        key={index}
                                        className="flex items-start gap-4 p-5 rounded-2xl border border-slate-200 hover:border-pink-300 hover:shadow-lg transition-all duration-300"
                                    >

                                        <div className="w-12 h-12 rounded-xl bg-pink-100 flex items-center justify-center flex-shrink-0">

                                            <CheckCircle2
                                                size={24}
                                                className="text-pink-500"
                                            />

                                        </div>

                                        <div>

                                            <h3 className="font-semibold text-lg">

                                                {feature}

                                            </h3>

                                            <p className="text-gray-500 text-sm mt-2">

                                                Included as part of your trip experience.

                                            </p>

                                        </div>

                                    </div>

                                )

                            )

                        }

                    </div>

                ) : (

                    <div className="mt-8 rounded-2xl bg-slate-50 border border-slate-200 p-8 text-center">

                        <p className="text-gray-500">

                            No trip highlights available.

                        </p>

                    </div>

                )

            }

        </section>

    );

};

export default HighlightsSection;