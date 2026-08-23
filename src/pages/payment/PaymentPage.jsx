import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Loader2, AlertCircle, CheckCircle2, ShieldCheck, ArrowRight, Compass } from "lucide-react";
import { toast } from "react-toastify";
import { getBookingDetails, processPaymentApi } from "../../services/bookingService";
import PaymentTripSummary from "../../components/paymentComponents/PaymentTripSummary.jsx";
import PaymentSummary from "../../components/paymentComponents/PaymentSummary.jsx";
import CountdownTimer from "../../components/paymentComponents/CountdownTimer.jsx";
import BookingDetails from "../../components/paymentComponents/BookingDetails.jsx";
import PaymentSecurity from "../../components/paymentComponents/PaymentSecurity.jsx";
import Navbar from "../../components/Navbar.jsx";

const PaymentPage = () => {
    const { bookingId } = useParams();
    const navigate = useNavigate();

    const [booking, setBooking] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [paymentLoading, setPaymentLoading] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState("UPI");

    const fetchBooking = async () => {
        try {
            setLoading(true);
            const data = await getBookingDetails(bookingId);
            setBooking(data.booking);
            if (data.booking?.payment_status === "paid") {
                setPaymentSuccess({
                    transactionId: `TXN_${bookingId.slice(0, 8).toUpperCase()}`,
                    paymentMethod: "UPI",
                    paidAt: new Date().toISOString()
                });
            }
        } catch (error) {
            setError(
                error?.message || error?.response?.data?.message || "Unable to load booking details."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBooking();
    }, [bookingId]);

    const handlePayment = async () => {
        try {
            setPaymentLoading(true);
            const res = await processPaymentApi(bookingId, {
                paymentMethod,
                transactionId: `TXN_${Date.now()}_${Math.floor(1000 + Math.random() * 9000)}`
            });

            if (res.success) {
                toast.success("Payment Successful! Booking Confirmed.");
                setPaymentSuccess(res.transaction || {
                    transactionId: `TXN_${Date.now()}`,
                    paymentMethod,
                    paidAt: new Date().toISOString()
                });
                fetchBooking();
            }
        } catch (error) {
            toast.error(error?.message || "Payment processing failed.");
        } finally {
            setPaymentLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
                    <p className="text-gray-600 text-lg font-medium">
                        Loading payment details...
                    </p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 px-6">
                <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-red-100 p-8 text-center">
                    <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-5" />
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">
                        Something went wrong
                    </h2>
                    <p className="text-gray-600 mb-8">{error}</p>
                    <button
                        onClick={() => navigate("/my-trips")}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl py-3 transition cursor-pointer"
                    >
                        Back to My Bookings
                    </button>
                </div>
            </div>
        );
    }

    /* Success State View */
    if (paymentSuccess) {
        return (
            <div className="min-h-screen bg-slate-50 flex flex-col">
                <Navbar />
                <div className="flex-1 flex items-center justify-center p-6">
                    <div className="max-w-lg w-full bg-white rounded-3xl shadow-2xl border border-slate-100 p-8 sm:p-10 text-center animate-in fade-in zoom-in duration-300">
                        <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                            <CheckCircle2 className="w-12 h-12" />
                        </div>
                        <span className="inline-block px-3.5 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full uppercase tracking-wider mb-2">
                            Payment Confirmed
                        </span>
                        <h2 className="text-3xl font-extrabold text-slate-900">
                            Booking Successfully Confirmed!
                        </h2>
                        <p className="text-slate-500 text-sm mt-2">
                            Pack your bags! Your seat for <strong className="text-slate-800">"{booking?.trip?.name}"</strong> is officially locked.
                        </p>

                        {/* Transaction Receipt Box */}
                        <div className="mt-6 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left text-xs space-y-2">
                            <div className="flex justify-between">
                                <span className="text-slate-400">Transaction ID</span>
                                <span className="font-mono font-bold text-slate-800">{paymentSuccess.transactionId}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-400">Payment Method</span>
                                <span className="font-semibold text-slate-800">{paymentSuccess.paymentMethod || paymentMethod}</span>
                            </div>
                            <div className="flex justify-between pt-2 border-t border-slate-200 text-sm">
                                <span className="font-semibold text-slate-700">Amount Paid</span>
                                <span className="font-extrabold text-emerald-600">₹{Number(booking?.amount || 0).toLocaleString()}</span>
                            </div>
                        </div>

                        <div className="mt-8 flex flex-col sm:flex-row gap-3">
                            <button
                                onClick={() => navigate("/my-trips")}
                                className="flex-1 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
                            >
                                Go to My Bookings <ArrowRight className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => navigate("/trips")}
                                className="py-3.5 px-6 border border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-100 transition flex items-center justify-center gap-2 cursor-pointer"
                            >
                                <Compass className="w-4 h-4" /> Explore More
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-100 flex flex-col">
            <Navbar />

            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 py-10">
                <div className="max-w-7xl mx-auto px-5">
                    <h1 className="text-4xl font-bold text-white">
                        Complete Your Payment
                    </h1>
                    <p className="text-blue-100 mt-2">
                        Secure your reserved seat by completing the payment before the booking expires.
                    </p>
                </div>
            </div>

            {/* Page Content */}
            <div className="max-w-7xl mx-auto px-5 py-10 flex-1">
                {/* Trip Summary */}
                <PaymentTripSummary booking={booking} />

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
                    {/* Left Section */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Payment Method Selector */}
                        <div className="bg-white rounded-3xl shadow-md border border-slate-200 p-6 sm:p-8">
                            <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                                <ShieldCheck className="w-5 h-5 text-blue-600" /> Select Payment Method
                            </h3>
                            <div className="grid grid-cols-3 gap-4">
                                {[
                                    { id: "UPI", label: "UPI / Google Pay", icon: "⚡" },
                                    { id: "Card", label: "Debit / Credit Card", icon: "💳" },
                                    { id: "NetBanking", label: "Net Banking", icon: "🏦" },
                                ].map((method) => (
                                    <button
                                        key={method.id}
                                        onClick={() => setPaymentMethod(method.id)}
                                        className={`p-4 rounded-2xl border text-center transition cursor-pointer ${
                                            paymentMethod === method.id
                                                ? "border-blue-600 bg-blue-50/60 ring-2 ring-blue-500/20"
                                                : "border-slate-200 hover:border-slate-300"
                                        }`}
                                    >
                                        <span className="text-2xl block mb-1">{method.icon}</span>
                                        <span className="text-xs font-semibold text-slate-800 block">{method.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <BookingDetails booking={booking} />
                        <PaymentSecurity />
                    </div>

                    {/* Right Section */}
                    <div>
                        <PaymentSummary
                            booking={booking}
                            onPay={handlePayment}
                            paymentLoading={paymentLoading}
                        >
                            <CountdownTimer expiresAt={booking.expires_at} />
                        </PaymentSummary>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentPage;