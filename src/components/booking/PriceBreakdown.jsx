import {
    ReceiptIndianRupee,
    Hotel,
    Bus,
    Utensils,
    Wallet,
    Users,
} from "lucide-react";

const PriceBreakdown = ({ trip }) => {

    const accommodationCost =
        Number(trip?.accommodation_cost) || 0;

    const transportationCost =
        Number(trip?.transportation_cost) || 0;

    const foodCost =
        Number(trip?.food_cost) || 0;

    const otherExpenses =
        trip?.other_expenses?.reduce(

            (total, expense) =>

                total + (Number(expense.cost) || 0),

            0

        ) || 0;

    const hostFee =
        Number(trip?.host_fee) || 0;

    const totalTripCost =
        Number(trip?.total_trip_cost) || 0;

    const totalCollection =
        Number(trip?.total_collection) || 0;

    const pricePerTraveler =
        Number(trip?.price_per_person) || 0;

    return (

        <section className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 sticky top-24">

            {/* Header */}

            <div className="flex items-center gap-3 mb-6">

                <div className="w-11 h-11 rounded-xl bg-violet-100 flex items-center justify-center">

                    <ReceiptIndianRupee
                        size={22}
                        className="text-violet-600"
                    />

                </div>

                <div>

                    <h2 className="text-xl font-bold">

                        Price Breakdown

                    </h2>

                    <p className="text-sm text-gray-500">

                        Trip cost details

                    </p>

                </div>

            </div>

            {/* Cost Details */}

            <div className="space-y-4">

                <Row
                    icon={<Hotel size={18} />}
                    title="Accommodation"
                    value={accommodationCost}
                />

                <Row
                    icon={<Bus size={18} />}
                    title="Transportation"
                    value={transportationCost}
                />

                <Row
                    icon={<Utensils size={18} />}
                    title="Food"
                    value={foodCost}
                />

                <Row
                    icon={<Wallet size={18} />}
                    title="Other Expenses"
                    value={otherExpenses}
                />

                {

                    trip?.trip_type === "hosted_trip" && (

                        <Row
                            icon={<Users size={18} />}
                            title="Host Fee"
                            value={hostFee}
                        />

                    )

                }

            </div>

            {/* Divider */}

            <div className="border-t border-slate-200 my-6"></div>

            {/* Totals */}

            <div className="space-y-3">

                <div className="flex justify-between">

                    <span className="text-gray-600">

                        Total Trip Cost

                    </span>

                    <span className="font-semibold">

                        ₹{totalTripCost.toLocaleString()}

                    </span>

                </div>

                <div className="flex justify-between">

                    <span className="text-gray-600">

                        Total Collection

                    </span>

                    <span className="font-semibold">

                        ₹{totalCollection.toLocaleString()}

                    </span>

                </div>

            </div>

            {/* Price Card */}

            <div className="mt-6 rounded-2xl bg-gradient-to-r from-violet-600 to-pink-500 text-white p-5">

                <p className="text-sm opacity-90">

                    You Pay

                </p>

                <h2 className="text-3xl font-bold mt-1">

                    ₹{pricePerTraveler.toLocaleString()}

                </h2>

                <p className="text-sm mt-1">

                    Per Traveler

                </p>

            </div>

        </section>

    );

};

const Row = ({ icon, title, value }) => (

    <div className="flex items-center justify-between">

        <div className="flex items-center gap-3 text-gray-700">

            {icon}

            <span>{title}</span>

        </div>

        <span className="font-semibold">

            ₹{value.toLocaleString()}

        </span>

    </div>

);

export default PriceBreakdown;