import { Phone, User, Shield, FileText } from "lucide-react";

const TravelerDetails = ({

    travelerData,

    setTravelerData,

}) => {

    const handleChange = (e) => {

        const { name, value } = e.target;

        setTravelerData((prev) => ({

            ...prev,

            [name]: value,

        }));

    };

    return (

        <section className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6">

            {/* Heading */}

            <div className="mb-6">

                <h2 className="text-xl font-bold">

                    Traveler Details

                </h2>

                <p className="text-gray-500 text-sm mt-1">

                    Please provide contact details for this trip.

                </p>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                {/* Phone */}

                <div>

                    <label className="flex items-center gap-2 text-sm font-medium mb-2">

                        <Phone size={16} />

                        Phone Number

                    </label>

                    <input

                        type="tel"

                        name="phone"

                        value={travelerData.phone}

                        onChange={handleChange}

                        placeholder="Enter phone number"

                        className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-violet-500"

                    />

                </div>

                {/* Emergency Contact */}

                <div>

                    <label className="flex items-center gap-2 text-sm font-medium mb-2">

                        <User size={16} />

                        Emergency Contact

                    </label>

                    <input

                        type="text"

                        name="emergencyName"

                        value={travelerData.emergencyName}

                        onChange={handleChange}

                        placeholder="Contact person's name"

                        className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-violet-500"

                    />

                </div>

                {/* Emergency Phone */}

                <div>

                    <label className="flex items-center gap-2 text-sm font-medium mb-2">

                        <Shield size={16} />

                        Emergency Phone

                    </label>

                    <input

                        type="tel"

                        name="emergencyPhone"

                        value={travelerData.emergencyPhone}

                        onChange={handleChange}

                        placeholder="Emergency phone number"

                        className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-violet-500"

                    />

                </div>

            </div>

            {/* Special Request */}

            <div className="mt-6">

                <label className="flex items-center gap-2 text-sm font-medium mb-2">

                    <FileText size={16} />

                    Special Request (Optional)

                </label>

                <textarea

                    rows={4}

                    name="specialRequest"

                    value={travelerData.specialRequest}

                    onChange={handleChange}

                    placeholder="Any medical condition, dietary preference, pickup request, etc."

                    className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none resize-none focus:ring-2 focus:ring-violet-500"

                />

            </div>

        </section>

    );

};

export default TravelerDetails;