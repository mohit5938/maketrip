import { useState } from "react";
import { calculateTripCost } from "../../utils/calculateTripCost";
import { toast } from "react-toastify";
import {createTrip} from "../../services/tripService.js"
import { useNavigate } from "react-router-dom";

const Step7Payment = ({
    tripData,
}) => {

    const navigate =  useNavigate();
    const [loading, setLoading] = useState(false);
    console.log(tripData);
    const {
        totalTripCost,
        hostFee,
        totalCollection,
        estimatedCostPerTraveler,
    } = calculateTripCost(tripData);

    const coverImage = tripData.tripImages?.[0];

    const handlePublish =
        async () => {
            if (loading) return;
            try {
                setLoading(true);
                const data =
                    await createTrip(
                        tripData
                    );

                toast.success(
                    data.message ||
                    "Trip submitted successfully"
                );

                setTimeout(() => {

                    navigate(
                        "/my-trips"
                    );

                }, 1500);

            } catch (error) {

                toast.error(

                    error.response?.data
                        ?.message ||

                    "Failed to create trip"

                );

            }
            finally {
                setLoading(false);
            }

        };
    return (
        <div className="space-y-8">

            {/* HEADER */}

            <div>

                <h2 className="text-3xl font-bold">
                    Publish Trip
                </h2>

                <p className="text-gray-500 mt-2">
                    Final confirmation
                    before publishing.
                </p>

            </div>

            {/* Pricing Card*/}

            <div
                className="
          bg-gradient-to-r
          from-pink-500
          to-purple-500
          text-white
          rounded-3xl
          p-6
        "
            >

                <h3 className="text-sm opacity-90">
                    Travelers Will Pay
                </h3>

                <h2 className="text-5xl font-bold mt-2">
                    ₹
                    {
                        estimatedCostPerTraveler
                    }
                </h2>

                <p className="mt-1">
                    Per Person
                </p>

                <div
                    className="
            grid
            grid-cols-2
            gap-4
            mt-6
          "
                >

                    <div>

                        <p className="text-sm opacity-80">
                            Total Trip Cost
                        </p>

                        <p className="text-xl font-bold">
                            ₹{totalTripCost}
                        </p>

                    </div>

                    <div>

                        <p className="text-sm opacity-80">
                            Host Fee
                        </p>

                        <p className="text-xl font-bold">
                            ₹{hostFee}
                        </p>

                    </div>

                </div>

            </div>

            {/* COVER IMAGE */}

            {coverImage && (

                <div>

                    <h3
                        className="
            text-xl
            font-bold
            mb-4
          "
                    >
                        Cover Image
                    </h3>
                    <img
                        src={
                            typeof coverImage === "string"
                                ? coverImage
                                : URL.createObjectURL(
                                    coverImage
                                )
                        }
                        alt="Trip Cover"
                    />

                </div>

            )}
      

            {/* QUICK DETAILS */}

            <div
                className="
          border
          rounded-3xl
          p-6
        "
            >

                <h3 className="
          text-xl
          font-bold
          mb-5
        ">
                    Trip Summary
                </h3>

                <div className="space-y-4">

                    <div className="
            flex
            justify-between
          ">
                        <span>
                            Trip Name
                        </span>

                        <span>
                            {
                                tripData.tripName
                            }
                        </span>
                    </div>

                    <div className="
            flex
            justify-between
          ">
                        <span>
                            Destination
                        </span>

                        <span>
                            {
                                tripData.destination
                                    ?.name
                            }
                        </span>
                    </div>

                    <div className="
            flex
            justify-between
          ">
                        <span>
                            Category
                        </span>

                        <span>
                            {
                                tripData.category
                            }
                        </span>
                    </div>

                  
                    <div className="
            flex
            justify-between
          ">
                        <span>
                            Maximum Travelers
                        </span>

                        <span>
                            {
                                tripData.travelersLimit
                            }
                        </span>
                    </div>

                   

                    <div className="flex justify-between">

                        <span>
                            Start Date
                        </span>

                        <span>
                            {
                                tripData.startDate
                            }
                        </span>

                    </div>

                    <div className="flex justify-between">

                        <span>
                            End Date
                        </span>

                        <span>
                            {
                                tripData.endDate
                            }
                        </span>

                    </div>

                </div>

            

                </div>

            

 {/* Notice */ }

    <div
        className="
        bg-yellow-50
        border
        border-yellow-200
        rounded-2xl
        p-5
      "
    >

        <h4 className="font-semibold">
            Admin Review
        </h4>

        <p
            className="
          text-sm
          text-gray-600
          mt-2
        "
        >

                    After publishing, your trip will be submitted for admin review.

                    Once approved, it will appear in the JoinTrip marketplace where travelers can discover and join it.

        </p>

    </div>

        

            {/* PUBLISH BUTTON */}
<div>
            <button
                onClick={
                    handlePublish
                }
                disabled={loading}
                className="
          w-full
          py-4
          rounded-2xl
          bg-pink-500
          text-white
          font-semibold
          hover:bg-pink-600
          transition
          disabled:opacity-50
        "
            >

                {loading
                    ? "Publishing..."
                    : "Publish Trip"}

            </button>

        </div>

        </div>
    );
};

export default Step7Payment;