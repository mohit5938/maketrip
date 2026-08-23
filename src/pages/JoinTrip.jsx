import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBookingTripDetails } from "../services/bookingService.js";
import Navbar from "../components/Navbar.jsx";

import BookingHeader from "../components/booking/BookingHeader";
import BookingSummary from "../components/booking/BookingSummary";
import TravelerDetails from "../components/booking/TravelerDetails";
import BookingPolicy from "../components/booking/BookingPolicy";
import PriceBreakdown from "../components/booking/PriceBreakdown";
import BookingActions from "../components/booking/BookingActions";



const JoinTrip = () => {

    const { tripId } = useParams();

    const [loading, setLoading] = useState(true);

    const [trip, setTrip] = useState(null);

    const [travelerData, setTravelerData] = useState({

        phone: "",

        emergencyName: "",

        emergencyPhone: "",

        specialRequest: "",

        acceptedPolicy: false,

        acceptedCancellation: false,

        acceptedCommunity: false,

    });

    useEffect(() => {

        fetchTrip();

    }, [tripId]);

    const fetchTrip = async () => {

        try {

            setLoading(true);

            const data = await getBookingTripDetails(tripId);

            if (data.success) {

                setTrip(data.trip);

            }

        }

        catch (error) {

            console.error(error);

        }

        finally {

            setLoading(false);

        }

    };

    if (loading) {

        return (

            <div className="min-h-screen bg-slate-50">

                <Navbar />

                <div className="max-w-7xl mx-auto px-4 py-16">

                    <div className="flex flex-col items-center justify-center">

                        {/* Spinner */}

                        <div className="relative">

                            <div className="w-16 h-16 rounded-full border-4 border-slate-200"></div>

                            <div className="absolute inset-0 w-16 h-16 rounded-full border-4 border-violet-600 border-t-transparent animate-spin"></div>

                        </div>

                        {/* Text */}

                        <h2 className="mt-6 text-xl font-semibold text-slate-800">

                            Preparing Your Adventure

                        </h2>

                        <p className="mt-2 text-sm text-slate-500 text-center max-w-sm">

                            Fetching trip details and getting everything ready for your booking...

                        </p>

                    </div>

                </div>

            </div>

        );

    }

    if (!trip) {

        return (

            <div className="min-h-screen flex items-center justify-center">

                Trip not found.

            </div>

        );

    }

    return (

        <div className="min-h-screen bg-slate-50">

            <Navbar />

            <div className="max-w-7xl mx-auto px-4 py-8">

                {/* Header */}

                <BookingHeader trip={trip} />

                {/* Main Layout */}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">

                    {/* Left */}

                    <div className="lg:col-span-2 space-y-6">

                        <BookingSummary trip={trip} />

                        <TravelerDetails
                            travelerData={travelerData}

                            setTravelerData={setTravelerData}

                        />

                        <BookingPolicy

                            travelerData={travelerData}

                            setTravelerData={setTravelerData}

                        />

                    </div>

                    {/* Right */}

                    <div className="space-y-6">

                        <PriceBreakdown trip={trip} />

                        <BookingActions

                            trip={trip}

                            travelerData={travelerData}

                        />

                    </div>

                </div>

            </div>

        </div>

    );

};

export default JoinTrip;