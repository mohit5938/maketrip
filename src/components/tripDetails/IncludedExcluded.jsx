import {
    CheckCircle2,
    XCircle,
} from "lucide-react";

const IncludedExcluded = ({ trip }) => {

    const inclusions = trip?.inclusions || [];

    const exclusions = trip?.exclusions || [];

    return (

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* Included */}

            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 lg:p-8">

                <div className="flex items-center gap-4">

                    <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center">

                        <CheckCircle2
                            size={28}
                            className="text-green-600"
                        />

                    </div>

                    <div>

                        <h2 className="text-2xl font-bold">

                            What's Included

                        </h2>

                        <p className="text-gray-500 mt-1">

                            Everything covered in your trip.

                        </p>

                    </div>

                </div>

                {

                    inclusions.length > 0 ? (

                        <div className="mt-8 space-y-5">

                            {

                                inclusions.map(

                                    (item, index) => (

                                        <div
                                            key={index}
                                            className="flex items-start gap-4"
                                        >

                                            <CheckCircle2
                                                size={22}
                                                className="text-green-500 mt-1 flex-shrink-0"
                                            />

                                            <p className="text-gray-700 leading-7">

                                                {item}

                                            </p>

                                        </div>

                                    )

                                )

                            }

                        </div>

                    ) : (

                        <div className="mt-8 rounded-2xl bg-slate-50 p-6 text-center">

                            <p className="text-gray-500">

                                No inclusions added.

                            </p>

                        </div>

                    )

                }

            </div>

            {/* Excluded */}

            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 lg:p-8">

                <div className="flex items-center gap-4">

                    <div className="w-14 h-14 rounded-2xl bg-red-100 flex items-center justify-center">

                        <XCircle
                            size={28}
                            className="text-red-500"
                        />

                    </div>

                    <div>

                        <h2 className="text-2xl font-bold">

                            What's Not Included

                        </h2>

                        <p className="text-gray-500 mt-1">

                            Things you'll need to arrange yourself.

                        </p>

                    </div>

                </div>

                {

                    exclusions.length > 0 ? (

                        <div className="mt-8 space-y-5">

                            {

                                exclusions.map(

                                    (item, index) => (

                                        <div
                                            key={index}
                                            className="flex items-start gap-4"
                                        >

                                            <XCircle
                                                size={22}
                                                className="text-red-500 mt-1 flex-shrink-0"
                                            />

                                            <p className="text-gray-700 leading-7">

                                                {item}

                                            </p>

                                        </div>

                                    )

                                )

                            }

                        </div>

                    ) : (

                        <div className="mt-8 rounded-2xl bg-slate-50 p-6 text-center">

                            <p className="text-gray-500">

                                No exclusions added.

                            </p>

                        </div>

                    )

                }

            </div>

        </section>

    );

};

export default IncludedExcluded;