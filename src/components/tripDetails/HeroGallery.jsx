import { MapPin } from "lucide-react";

const HeroGallery = ({ trip }) => {
console.log(trip)
    return (

        <section className="relative mb-10">

            <img

                src={
                    trip?.cover_image ||
                    "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1600"
                }

                alt={trip?.trip_name}

                className="w-full h-[250px] sm:h-[350px] lg:h-[500px] rounded-3xl object-cover"

            />

            {/* Overlay */}

            <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

            {/* Content */}

            <div className="absolute bottom-0 left-0 w-full p-6 lg:p-10 text-white">

                <div className="flex flex-wrap gap-3 mb-4">

                    <span className="px-4 py-2 rounded-full bg-pink-500 text-sm font-semibold">

                        {trip?.category}

                    </span>

         

                </div>

                <h1 className="text-3xl lg:text-5xl font-bold">

                    {trip?.trip_name}

                </h1>

                <div className="flex items-center gap-2 mt-4">

                    <MapPin size={20} />

                    <span className="text-lg">

                        {trip?.destination?.name}

                    </span>

                </div>

            </div>

        </section>

    );

};

export default HeroGallery;