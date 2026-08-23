import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import {server} from "../../constants/constant.js"
import { joinTrip } from "../../services/bookingService.js"
const BookingActions = ({

    trip,

    travelerData,

}) => {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const handleBooking = async () => {
        if (!travelerData.phone?.trim()) {
            return toast.error("Phone number is required.");
        }

        if (!travelerData.emergencyName?.trim()) {
            return toast.error("Emergency contact name is required.");
        }

        if (!travelerData.emergencyPhone?.trim()) {
            return toast.error("Emergency phone is required.");
        }

        const phoneRegex = /^[6-9]\d{9}$/;
        const cleanPhone = (travelerData.phone || "").replace(/\D/g, "").slice(-10);
        const cleanEmergencyPhone = (travelerData.emergencyPhone || "").replace(/\D/g, "").slice(-10);

        if (!phoneRegex.test(cleanPhone)) {
            return toast.error("Please enter a valid 10-digit mobile number.");
        }

        if (!phoneRegex.test(cleanEmergencyPhone)) {
            return toast.error("Please enter a valid 10-digit emergency contact phone number.");
        }

        if (!travelerData.acceptedPolicy || !travelerData.acceptedCancellation) {
            return toast.error("Please accept all policies.");
        }

        try {
            setLoading(true);

            const data = await joinTrip(
                trip.id,
                {
                    phone: travelerData.phone,
                    emergencyName: travelerData.emergencyName,
                    emergencyPhone: travelerData.emergencyPhone,
                    specialRequest: travelerData.specialRequest,
                }
            );

            toast.success(data.message || "Booking created successfully!");
            if (data.booking?.id) {
                navigate(`/payment/${data.booking.id}`);
            }
        } catch (error) {
            console.error("Join Trip Error:", error);
            toast.error(
                error?.message ||
                error?.response?.data?.message ||
                "Failed to process booking request."
            );
        } finally {
            setLoading(false);
        }
    };

    return (

        <section className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 sticky top-24">

            <h2 className="text-xl font-bold">

                Ready to Join?

            </h2>

            <p className="text-sm text-gray-500 mt-2 leading-6">

                Review everything carefully before continuing.

            </p>

            <div className="mt-6 rounded-xl bg-slate-50 border border-slate-200 p-4">

                <div className="flex justify-between">

                    <span className="text-gray-600">

                        Destination

                    </span>

                    <span className="font-medium">

                        {
                            trip.destination?.city ||
                            trip.destination?.name ||
                            "Unknown Destination"

                        }

                    </span>

                </div>

               

                <div className="flex justify-between mt-3">

                    <span className="text-gray-600">

                        Amount

                    </span>

                    <span className="font-semibold text-violet-600">

                        ₹

                        {Number(

                            trip.price_per_person

                        ).toLocaleString()}

                    </span>

                </div>

            </div>

            <button

                onClick={handleBooking}

                disabled={loading}

                className="w-full mt-6 bg-gradient-to-r from-violet-600 to-pink-500 text-white rounded-xl py-3.5 flex items-center justify-center gap-2 font-semibold hover:opacity-95 disabled:opacity-60"

            >

                {

                    loading

                        ?

                        <>

                            <Loader2

                                size={18}

                                className="animate-spin"

                            />

                            Processing...

                        </>
                        :
                        <>
                            Continue to Payment
                            <ArrowRight size={18} />
                        </>
                }

            </button>
            <p className="text-xs text-center text-gray-500 mt-4 leading-5">
                Your booking request will be submitted after payment confirmation.
            </p>

        </section>
    );
};

export default BookingActions;