import { useEffect } from "react";
import {
    X,
    Search,
} from "lucide-react";

const Filter = ({
    isOpen,
    onClose,
    filters,
    setFilters,
    onApply,
}) => {

    const categories = [
        "Adventure",
        "Trekking",
        "Camping",
        "Road Trip",
        "Beach",
        "Mountains",
        "Wildlife",
        "Backpacking",
        "Luxury",
        "Spiritual",
    ];
    const accommodationOptions = [
        "Hotel",
        "Hostel",
        "Camping",
        "Homestay",
        "Resort",
        "Guest House",
    ];
    const activeFilters = [

        filters.destination,

        filters.category,

        filters.tripType,

        filters.fromDate,

        filters.toDate,

        filters.travelers > 1,

        filters.budget !== 50000,

        filters.sortBy !== "Recommended",

        filters.accommodation.length > 0,

    ].filter(Boolean).length;

    const sortOptions = [

        "Recommended",

        "Newest",

        "Oldest",

        "Price: Low to High",

        "Price: High to Low",

        "Departure Date",

    ];

    useEffect(() => {

        const handleEscape = (e) => {
            if (e.key === "Escape") onClose();
        };

        window.addEventListener(
            "keydown",
            handleEscape
        );

        return () =>
            window.removeEventListener(
                "keydown",
                handleEscape
            );

    }, [onClose]);
    if (!isOpen) return null;

return (

<>
        <div
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
        />
        <div
            className="
    fixed right-0 top-0 z-50 h-screen
    w-full sm:w-[420px] lg:w-[480px]
    bg-white shadow-2xl
    flex flex-col
    "
        >

            <div
                className="
    flex items-center justify-between
    px-5 sm:px-6 py-5
    border-b bg-white
    "
            >

                <div>

                    <h2 className="text-2xl font-bold">
                        Filter Trips
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                        Find your perfect adventure
                    </p>

                </div>

                <button
                    onClick={onClose}
                    className="
        w-10 h-10 rounded-xl
        bg-gray-100 hover:bg-gray-200
        flex items-center justify-center
        transition
        "
                >
                    <X size={20} />
                </button>

            </div>

            <div className="flex-1 overflow-y-auto px-5 sm:px-6 py-6 space-y-8">
                <div className="space-y-3">

                    <h3 className="text-lg font-semibold">
                        Destination
                    </h3>

                    <div className="relative">

                        <Search
                            size={18}
                            className="
            absolute left-4 top-1/2
            -translate-y-1/2 text-gray-400
            "
                        />

                        <input

                            type="text"

                            placeholder="Search destination..."

                            value={filters.destination}

                            onChange={(e) =>

                                setFilters(prev => ({

                                    ...prev,

                                    destination: e.target.value,

                                }))

                            }

                            className="
            w-full pl-11 pr-4 py-3
            rounded-xl border border-gray-300
            focus:ring-2 focus:ring-pink-500
            focus:border-pink-500 outline-none
            transition
            "

                        />

                    </div>

                </div>
                <div className="space-y-4">

                    <h3 className="text-lg font-semibold">

                        Category

                    </h3>

                    <div className="flex flex-wrap gap-3">

                        {

                            categories.map(category => (

                                <button

                                    key={category}

                                    type="button"

                                    onClick={() =>

                                        setFilters(prev => ({

                                            ...prev,

                                            category:

                                                prev.category === category

                                                    ? ""

                                                    : category

                                        }))

                                    }

                                    className={`

                    px-4 py-2 rounded-full
                    border text-sm font-medium
                    transition-all duration-200

                    ${filters.category === category

                                            ?

                                            "bg-pink-500 border-pink-500 text-white shadow"

                                            :

                                            "bg-white border-gray-300 hover:border-pink-500 hover:text-pink-500"

                                        }

                    `}

                                >

                                    {category}

                                </button>

                            ))

                        }

                    </div>

                </div>
                <div className="space-y-4">

                    <h3 className="text-lg font-semibold">
                        Trip Type
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                        <button
                            type="button"
                            onClick={() =>
                                setFilters(prev => ({
                                    ...prev,
                                    tripType:
                                        prev.tripType === "hosted_trip"
                                            ? ""
                                            : "hosted_trip",
                                }))
                            }
                            className={`py-3 rounded-xl border font-medium transition-all duration-200 ${filters.tripType === "hosted_trip"
                                    ? "bg-pink-500 text-white border-pink-500"
                                    : "bg-white border-gray-300 hover:border-pink-500 hover:text-pink-500"
                                }`}
                        >
                            Hosted Trip
                        </button>

                        <button
                            type="button"
                            onClick={() =>
                                setFilters(prev => ({
                                    ...prev,
                                    tripType:
                                        prev.tripType === "community_trip"
                                            ? ""
                                            : "community_trip",
                                }))
                            }
                            className={`py-3 rounded-xl border font-medium transition-all duration-200 ${filters.tripType === "community_trip"
                                    ? "bg-pink-500 text-white border-pink-500"
                                    : "bg-white border-gray-300 hover:border-pink-500 hover:text-pink-500"
                                }`}
                        >
                            Community Trip
                        </button>

                    </div>

                </div>
                <div className="space-y-4">

                    <h3 className="text-lg font-semibold">
                        Travel Dates
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                        <div>

                            <label className="text-sm text-gray-500">
                                From
                            </label>

                            <input
                                type="date"
                                value={filters.fromDate}
                                onChange={(e) =>
                                    setFilters(prev => ({
                                        ...prev,
                                        fromDate: e.target.value,
                                    }))
                                }
                                className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-pink-500 outline-none"
                            />

                        </div>

                        <div>

                            <label className="text-sm text-gray-500">
                                To
                            </label>

                            <input
                                type="date"
                                value={filters.toDate}
                                onChange={(e) =>
                                    setFilters(prev => ({
                                        ...prev,
                                        toDate: e.target.value,
                                    }))
                                }
                                className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-pink-500 outline-none"
                            />

                        </div>

                    </div>

                </div>
                <div className="space-y-4">

                    <div className="flex items-center justify-between">

                        <h3 className="text-lg font-semibold">
                            Travelers
                        </h3>

                        <span className="text-pink-500 font-semibold">
                            {filters.travelers || 1}
                        </span>

                    </div>

                    <input
                        type="range"
                        min="1"
                        max="20"
                        value={filters.travelers || 1}
                        onChange={(e) =>
                            setFilters(prev => ({
                                ...prev,
                                travelers: Number(e.target.value),
                            }))
                        }
                        className="w-full accent-pink-500 cursor-pointer"
                    />

                </div>
                <div className="space-y-4">

                    <div className="flex items-center justify-between">

                        <h3 className="text-lg font-semibold">
                            Maximum Budget
                        </h3>

                        <span className="text-pink-500 font-semibold">
                            ₹{filters.budget || 50000}
                        </span>

                    </div>

                    <input
                        type="range"
                        min="1000"
                        max="50000"
                        step="500"
                        value={filters.budget || 50000}
                        onChange={(e) =>
                            setFilters(prev => ({
                                ...prev,
                                budget: Number(e.target.value),
                            }))
                        }
                        className="w-full accent-pink-500 cursor-pointer"
                    />

                </div>
                <div className="space-y-4">

                    <h3 className="text-lg font-semibold">
                        Accommodation
                    </h3>

                    <div className="flex flex-wrap gap-3">

                        {accommodationOptions.map((item) => (

                            <button
                                key={item}
                                type="button"
                                onClick={() =>
                                    setFilters(prev => ({

                                        ...prev,

                                        accommodation:
                                            prev.accommodation.includes(item)

                                                ? prev.accommodation.filter(
                                                    value => value !== item
                                                )

                                                : [
                                                    ...prev.accommodation,
                                                    item,
                                                ],

                                    }))
                                }

                                className={`px-4 py-2 rounded-full border text-sm font-medium transition-all duration-200 ${filters.accommodation.includes(item)

                                        ? "bg-pink-500 text-white border-pink-500"

                                        : "bg-white border-gray-300 hover:border-pink-500 hover:text-pink-500"
                                    }`}
                            >

                                {item}

                            </button>

                        ))}

                    </div>

                </div>
              
                <div className="space-y-4">

                    <h3 className="text-lg font-semibold">

                        Sort By

                    </h3>

                    <div className="grid grid-cols-1 gap-3">

                        {

                            sortOptions.map(option => (

                                <button

                                    key={option}

                                    type="button"

                                    onClick={() =>
                                        setFilters(prev => ({

                                            ...prev,

                                            sortBy: option,

                                        }))
                                    }

                                    className={`

                    flex items-center justify-between

                    px-5 py-3

                    rounded-xl border

                    transition-all duration-200

                    ${filters.sortBy === option

                                            ?

                                            "border-pink-500 bg-pink-50 text-pink-600"

                                            :

                                            "border-gray-300 hover:border-pink-500"

                                        }

                    `}

                                >

                                    <span>

                                        {option}

                                    </span>

                                    {

                                        filters.sortBy === option && (

                                            <div className="w-2 h-2 rounded-full bg-pink-500" />

                                        )

                                    }

                                </button>

                            ))

                        }

                    </div>

                </div>
            

                <div className="rounded-2xl bg-pink-50 border border-pink-100 p-4">

                    <div className="flex items-center justify-between">

                        <span className="font-medium">

                            Active Filters

                        </span>

                        <span className="text-pink-600 font-bold">

                            {activeFilters}

                        </span>

                    </div>

                </div>
            </div>

            <div
                className="
    sticky bottom-0
    bg-white
    border-t
    border-gray-200
    px-5 sm:px-6
    py-4
    "
            >

                <div className="flex flex-col sm:flex-row gap-3">

                    {/* Reset Button */}

                    <button

                        type="button"

                        onClick={() =>

                            setFilters({

                                destination: "",

                                category: "",

                                tripType: "",

                                fromDate: "",

                                toDate: "",

                                travelers: 1,

                                budget: 50000,

                                accommodation: [],

                                sortBy: "Recommended",

                            })

                        }

                        className="
            flex-1
            py-3.5
            rounded-xl
            border
            border-gray-300
            bg-white
            font-semibold
            hover:bg-gray-100
            transition
            "

                    >

                        Reset

                    </button>

                    {/* Show Trips Button */}

                    <button

                        type="button"

                        onClick={() => {

                            onApply();

                            onClose();

                        }}

                        className="
            flex-1
            py-3.5
            rounded-xl
            bg-gradient-to-r
            from-pink-500
            to-rose-500
            text-white
            font-semibold
            shadow-lg
            hover:shadow-xl
            hover:scale-[1.02]
            transition-all
            duration-300
            "

                    >

                        Show Trips

                    </button>

                </div>

            </div>
</div>
        </>

        );

};

        export default Filter;

                    
