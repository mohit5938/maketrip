import {
    ShieldCheck,
    Lock,
    BadgeCheck,
    Headphones,
} from "lucide-react";

const PaymentSecurity = () => {

    const securityFeatures = [

        {
            icon: <ShieldCheck size={22} className="text-green-600" />,
            title: "100% Secure Payment",
            description:
                "Your payment is protected using industry-standard encryption.",
        },

        {
            icon: <Lock size={22} className="text-blue-600" />,
            title: "SSL Encrypted",
            description:
                "All payment information is transmitted securely over SSL.",
        },

        {
            icon: <BadgeCheck size={22} className="text-purple-600" />,
            title: "Instant Confirmation",
            description:
                "Your booking is confirmed immediately after successful payment.",
        },

        {
            icon: <Headphones size={22} className="text-orange-600" />,
            title: "24×7 Support",
            description:
                "Need help? Our support team is available whenever you need assistance.",
        },

    ];

    return (

        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-7">

            <div className="flex items-center gap-3 mb-8">

                <div className="w-12 h-12 rounded-2xl bg-green-100 flex items-center justify-center">

                    <ShieldCheck
                        size={24}
                        className="text-green-600"
                    />

                </div>

                <div>

                    <h2 className="text-2xl font-bold text-slate-800">

                        Payment Security

                    </h2>

                    <p className="text-sm text-gray-500">

                        Your payment and personal information are always protected.

                    </p>

                </div>

            </div>

            <div className="space-y-5">

                {securityFeatures.map((feature, index) => (

                    <div
                        key={index}
                        className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100"
                    >

                        <div className="flex-shrink-0">

                            {feature.icon}

                        </div>

                        <div>

                            <h3 className="font-semibold text-slate-800">

                                {feature.title}

                            </h3>

                            <p className="text-sm text-gray-600 mt-1">

                                {feature.description}

                            </p>

                        </div>

                    </div>

                ))}

            </div>

        </div>

    );

};

export default PaymentSecurity;