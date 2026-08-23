import {
    calculateTripCost,
} from "../../utils/calculateTripCost";

const Step6Review = ({
    tripData,
}) => {

    const {

        totalTripCost,

        hostFee,

        totalCollection,

        estimatedCostPerTraveler,

    } = calculateTripCost(
        tripData
    );

    return (

        <div className="space-y-8">

            {/* Header */}

            <div>

                <h2 className="text-3xl font-bold">
                    Review Your Trip
                </h2>

                <p className="text-gray-500 mt-2">
                    Review all details before
                    publishing.
                </p>

            </div>

            {/* Traveler Cost */}

            <div
                className="
          bg-green-50
          border
          border-green-200
          rounded-3xl
          p-6
        "
            >

                <h3
                    className="
            text-xl
            font-bold
            mb-3
          "
                >
                    What Travelers Will Pay
                </h3>

                <div
                    className="
            text-4xl
            font-bold
            text-green-600
          "
                >
                    ₹
                    {
                        estimatedCostPerTraveler
                    }
                </div>

                <p className="text-gray-600 mt-2">
                    Estimated price per
                    traveler based on
                    {
                        " "
                    }
                    {
                        tripData.travelersLimit
                    }
                    {
                        " "
                    }
                    seats.
                </p>

            </div>

            {/* Basic Info */}

            <div className="border rounded-2xl p-5">

                <h3 className="font-bold mb-4">
                    Basic Information
                </h3>

                <div className="space-y-2">

                    <p>
                        <strong>
                            Trip Name:
                        </strong>
                        {" "}
                        {
                            tripData.tripName
                        }
                    </p>

                    <p>
                        <strong>
                            Category:
                        </strong>
                        {" "}
                        {
                            tripData.category
                        }
                    </p>

                

                    <p>
                        <strong>
                            Description:
                        </strong>
                        {" "}
                        {
                            tripData.tripDescription
                        }
                    </p>

                </div>

            </div>

            {/* Route */}

            <div className="border rounded-2xl p-5">

                <h3 className="font-bold mb-4">
                    Route
                </h3>

                <p>
                    <strong>
                        Start:
                    </strong>
                    {" "}
                    {
                        tripData
                            ?.startLocation
                            ?.name
                    }
                </p>

                {tripData.stops.map(
                    (
                        stop,
                        index
                    ) => (

                        <div
                            key={index}
                            className="mt-2"
                        >

                            ↓
                            {" "}
                            {
                                stop.transportMode
                            }

                            <br />

                            📍
                            {" "}
                            {
                                stop.location
                                    ?.name
                            }

                        </div>

                    )
                )}

                <p className="mt-2">

                    <strong>
                        Destination:
                    </strong>
                    {" "}
                    {
                        tripData
                            ?.destination
                            ?.name
                    }

                </p>

            </div>

            {/* Stay */}

            <div className="border rounded-2xl p-5">

                <h3 className="font-bold mb-4">
                    Accommodation
                </h3>

                <p>
                    {
                        tripData.accommodation
                    }
                </p>

                <p className="mt-3">
                    {
                        tripData
                            .accommodationDescription
                    }
                </p>

            </div>

            {/* Pricing */}

            <div className="border rounded-2xl p-5">

                <h3 className="font-bold mb-4">
                    Pricing
                </h3>

                <div className="space-y-2">

                    <div className="flex justify-between">
                        <span>
                            Total Trip Cost
                        </span>

                        <span>
                            ₹
                            {
                                totalTripCost
                            }
                        </span>
                    </div>

                    <div className="flex justify-between">

                        <span>Guide Fee</span>

                        <span>₹{hostFee}</span>

                    </div>

                    <div className="flex justify-between font-bold">

                        <span>
                            Total Collection
                        </span>

                        <span>
                            ₹
                            {
                                totalCollection
                            }
                        </span>

                    </div>

                </div>

            </div>

            {/* Settings */}

            <div className="border rounded-2xl p-5">

                <h3 className="font-bold mb-4">
                    Trip Settings
                </h3>

                <p>
                    <strong>
                        Start Date:
                    </strong>
                    {" "}
                    {
                        tripData.startDate
                    }
                </p>

                <p>
                    <strong>
                        End Date:
                    </strong>
                    {" "}
                    {
                        tripData.endDate
                    }
                </p>

                <p>
                    <strong>
                        Maximum Travelers:
                    </strong>
                    Estimated price per traveler if all
                    {" "}
                    {tripData.travelersLimit}
                    {" "}
                    traveler slots are filled.
                </p>

             

            </div>

        </div>

    );

};

export default Step6Review;