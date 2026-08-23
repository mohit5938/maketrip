import {
    CreditCard,
    Wallet,
    Clock3,
    CheckCircle2,
    Receipt,
} from "lucide-react";

const PaymentSummary = ({
    booking,
    children,
    onPay,
    paymentLoading = false,
}) => {

    const getBookingBadge = () => {

        switch (booking?.booking_status) {

            case "confirmed":

                return "bg-green-100 text-green-700";

            case "cancelled":

                return "bg-red-100 text-red-700";

            case "completed":

                return "bg-blue-100 text-blue-700";

            default:

                return "bg-yellow-100 text-yellow-700";

        }

    };

    const getPaymentBadge = () => {

        switch (booking?.payment_status) {

            case "paid":

                return "bg-green-100 text-green-700";

            case "failed":

                return "bg-red-100 text-red-700";

            default:

                return "bg-yellow-100 text-yellow-700";

        }

    };

    const disablePayment =
        booking?.booking_status !== "pending" ||
        booking?.payment_status === "paid";

    return (

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-7 sticky top-24">

            <div className="flex items-center gap-3 mb-8">

                <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center">

                    <Wallet className="text-blue-600" size={24} />

                </div>

                <div>

                    <h2 className="text-2xl font-bold text-slate-800">

                        Payment Summary

                    </h2>

                    <p className="text-gray-500 text-sm">

                        Complete payment to confirm your booking.

                    </p>

                </div>

            </div>

            <div className="space-y-6">

                <div className="flex items-center justify-between">

                    <div className="flex items-center gap-2 text-gray-600">

                        <Receipt size={18} />

                        <span>Amount</span>

                    </div>

                    <h2 className="text-3xl font-bold text-green-600">

                        ₹ {Number(booking?.amount || 0).toLocaleString("en-IN")}

                    </h2>

                </div>

                <hr />

                <div className="flex items-center justify-between">

                    <span className="text-gray-600">

                        Booking Status

                    </span>

                    <span className={`px-3 py-1 rounded-full text-sm font-semibold capitalize ${getBookingBadge()}`}>

                        {booking?.booking_status}

                    </span>

                </div>

                <div className="flex items-center justify-between">

                    <span className="text-gray-600">

                        Payment Status

                    </span>

                    <span className={`px-3 py-1 rounded-full text-sm font-semibold capitalize ${getPaymentBadge()}`}>

                        {booking?.payment_status}

                    </span>

                </div>

                <div className="flex items-center justify-between">

                    <div className="flex items-center gap-2 text-gray-600">

                        <Clock3 size={18} />

                        <span>Expires In</span>

                    </div>

                    {children}

                </div>

                <div className="rounded-2xl bg-blue-50 border border-blue-100 p-4">

                    <div className="flex items-start gap-3">

                        <CheckCircle2 className="text-blue-600 mt-1" size={20} />

                        <div>

                            <h4 className="font-semibold text-slate-800">

                                Secure Payment

                            </h4>

                            <p className="text-sm text-gray-600 mt-1">

                                Your payment is processed through an encrypted
                                and secure payment gateway.

                            </p>

                        </div>

                    </div>

                </div>

                <button
                    onClick={onPay}
                    disabled={disablePayment || paymentLoading}
                    className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-lg font-semibold transition-all"
                >

                    <CreditCard size={22} />

                    {paymentLoading ? "Processing..." : "Pay Now"}

                </button>

            </div>

        </div>

    );

};

export default PaymentSummary;