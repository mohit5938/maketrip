const Step1BasicInfo = ({
    tripData,
    setTripData,
}) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setTripData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h2 className="text-2xl font-bold text-slate-900">
                    Basic Information
                </h2>
                <p className="text-gray-500 mt-1 text-sm">
                    Enter the fundamental details of your hosted expedition manually.
                </p>
            </div>

            {/* Trip Name */}
            <div>
                <label className="block mb-2 font-semibold text-slate-700 text-sm">
                    Trip Name
                    <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                    type="text"
                    name="tripName"
                    value={tripData.tripName}
                    onChange={handleChange}
                    maxLength={100}
                    placeholder="e.g. Goa Beach Workation 2026"
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-pink-500 outline-none transition"
                />
                <p className="text-xs text-gray-400 mt-1">
                    {tripData.tripName.length}/100 characters
                </p>
            </div>

            {/* Trip Description */}
            <div>
                <label className="block mb-2 font-semibold text-slate-700 text-sm">
                    Trip Description
                </label>
                <textarea
                    rows="5"
                    name="tripDescription"
                    value={tripData.tripDescription}
                    onChange={handleChange}
                    maxLength={2000}
                    placeholder="Describe your expedition, activities, stay arrangements, and overall experience..."
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-pink-500 outline-none transition"
                />
                <p className="text-xs text-gray-400 mt-1">
                    {tripData.tripDescription.length}/2000 characters
                </p>
            </div>

            {/* Category */}
            <div>
                <label className="block mb-2 font-semibold text-slate-700 text-sm">
                    Category
                    <span className="text-red-500 ml-1">*</span>
                </label>
                <select
                    name="category"
                    value={tripData.category}
                    onChange={handleChange}
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-pink-500 outline-none transition cursor-pointer"
                >
                    <option value="">Select Category</option>
                    <option value="adventure">Adventure</option>
                    <option value="trekking">Trekking</option>
                    <option value="beach">Beach</option>
                    <option value="roadtrip">Road Trip</option>
                    <option value="backpacking">Backpacking</option>
                    <option value="workation">Workation</option>
                </select>
            </div>
        </div>
    );
};

export default Step1BasicInfo;