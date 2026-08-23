import {
    ShieldCheck,
    CircleCheck,
} from "lucide-react";

const BookingPolicy = ({

    travelerData,

    setTravelerData,

}) => {

    const handleCheckbox = (e) => {

        const { name, checked } = e.target;

        setTravelerData((prev) => ({

            ...prev,

            [name]: checked,

        }));

    };

    return (

        <section className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6">

            {/* Heading */}

            <div className="flex items-center gap-3 mb-6">

                <div className="w-11 h-11 rounded-xl bg-violet-100 flex items-center justify-center">

                    <ShieldCheck
                        size={22}
                        className="text-violet-600"
                    />

                </div>

                <div>

                    <h2 className="text-xl font-bold">

                        Trip Policies

                    </h2>

                    <p className="text-sm text-gray-500 mt-1">

                        Please read and accept before continuing.

                    </p>

                </div>

            </div>

            {/* Policy List */}

            <div className="space-y-5">

                <label className="flex items-start gap-3 cursor-pointer">

                    <input

                        type="checkbox"

                        name="acceptedPolicy"

                        checked={travelerData.acceptedPolicy}

                        onChange={handleCheckbox}

                        className="mt-1 h-5 w-5 accent-violet-600"

                    />

                    <div>

                        <p className="font-medium">

                            I agree to the Trip Terms & Conditions.

                        </p>

                        <p className="text-sm text-gray-500">

                            I understand the responsibilities and rules of joining this trip.

                        </p>

                    </div>

                </label>

                <label className="flex items-start gap-3 cursor-pointer">

                    <input

                        type="checkbox"

                        name="acceptedCancellation"

                        checked={travelerData.acceptedCancellation || false}

                        onChange={handleCheckbox}

                        className="mt-1 h-5 w-5 accent-violet-600"

                    />

                    <div>

                        <p className="font-medium">

                            I agree to the Cancellation Policy.

                        </p>

                        <p className="text-sm text-gray-500">

                            Refund eligibility depends on the host's cancellation policy.

                        </p>

                    </div>

                </label>

            </div>

            {/* Notice */}

            <div className="mt-8 rounded-2xl bg-green-50 border border-green-200 p-4 flex gap-3">

                <CircleCheck
                    size={22}
                    className="text-green-600 mt-0.5"
                />

                <p className="text-sm text-gray-700 leading-7">

                    Your booking will only be created after you accept all required policies.

                </p>

            </div>

        </section>

    );

};

export default BookingPolicy;