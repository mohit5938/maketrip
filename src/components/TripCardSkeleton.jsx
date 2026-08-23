const TripCardSkeleton = () => {
    return (
        <div className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm animate-pulse">

            {/* Image */}

            <div className="shimmer w-full h-48" />

            <div className="p-5">

                {/* Host */}

                <div className="flex items-center justify-between">

                    <div className="flex items-center gap-3">

                        <div className="shimmer w-12 h-12 rounded-full" />

                        <div className="space-y-2">

                            <div className="shimmer h-4 w-28 rounded-md" />

                            <div className="shimmer h-3 w-16 rounded-md" />

                        </div>

                    </div>

                    <div className="shimmer h-8 w-16 rounded-full" />

                </div>

                {/* Title */}

                <div className="shimmer h-6 rounded-lg mt-6 w-5/6" />

                {/* Destination */}

                <div className="shimmer h-4 rounded mt-4 w-3/4" />

                {/* Dates */}

                <div className="flex gap-3 mt-5">

                    <div className="shimmer h-8 flex-1 rounded-full" />

                    <div className="shimmer h-8 flex-1 rounded-full" />

                </div>

                {/* Tags */}

                <div className="flex gap-2 mt-6">

                    <div className="shimmer h-8 w-20 rounded-full" />

                    <div className="shimmer h-8 w-24 rounded-full" />

                    <div className="shimmer h-8 w-16 rounded-full" />

                </div>

                {/* Bottom */}

                <div className="flex items-center justify-between mt-8">

                    <div className="space-y-2">

                        <div className="shimmer h-5 w-24 rounded" />

                        <div className="shimmer h-3 w-16 rounded" />

                    </div>

                    <div className="shimmer h-11 w-28 rounded-full" />

                </div>

            </div>

        </div>
    );
};

export default TripCardSkeleton;