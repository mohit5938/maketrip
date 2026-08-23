import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { server } from "../constants/constant.js"
import {
    ArrowRight,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";



const DestinationSection = () => {
    const [loading, setLoading] =  useState(false);
    const [error, setError] =  useState(null);
    const [currentIndex,setCurrentIndex] = useState(0);
    const [destinations, setDestinations] = useState([]);
    const navigate = useNavigate();
    const getTopDestinations =
        async () => {

            try {

                setLoading(true);

                const { data } =
                    await axios.get(

                        `${server}trip/top-destinations`

                    );
                    console.log(data)

                if (data.success) {

                    setDestinations(
                        data.destinations
                    );

                }

            } catch (error) {

                console.log(error);

                setError(
                    error.response?.data?.message ||
                    "Failed to fetch destinations"
                );

            } finally {

                setLoading(false);

            }

        };

    useEffect(() => {
        getTopDestinations();
    }, []);

    const handleDestinationClick =
        (destinationName) => {

            navigate(

                `/trips?destination=${encodeURIComponent(
                    destinationName
                )}`

            );

        };

    const handleNext = () => {
        console.log("Button Clicked");

        if (currentIndex + 4 < destinations.length) {
            console.log("Updating index");
            setCurrentIndex(currentIndex + 4);
        }

        console.log("Current:", currentIndex);
        console.log("Length:", destinations.length);
    };

    const handlePrev = () => {
console.log("right")
            if ( currentIndex > 0 ) {
                setCurrentIndex(
                    currentIndex - 4
                );
            }
        console.log(currentIndex)
        };


    return (

        <section
            className="
      max-w-7xl
      mx-auto
      px-4
      py-20
    "
        >

            <div
                className="
        flex
        items-center
        justify-between
        mb-10
      "
            >

                <div>

                    <p
                        className="
            text-pink-500
            font-medium
          "
                    >
                        Explore Top Destinations
                    </p>

                    <h2
                        className="
            text-4xl
            font-bold
            mt-2
          "
                    >
                        Find Your Next Adventure
                    </h2>

                </div>

                <div
                    className="
          hidden
          md:flex
          gap-3
        "
                >

                    <button
                        className="
    w-14
    h-14
    rounded-full
    backdrop-blur-md
    bg-white/70
    border
    border-white/30
    shadow-xl
    flex
    items-center
    justify-center
    hover:bg-pink-500
    hover:text-white
    transition-all
    duration-300
  "

                        onClick={
                          
                            handlePrev
                        }

                        disabled={
                            currentIndex === 0
                        }

                    >
                        <ChevronLeft size={22} />
                    </button>

                    <button
                        className="
            w-14
    h-14
    rounded-full
    backdrop-blur-md
    bg-white/70
    border
    border-white/30
    shadow-xl
    flex
    items-center
    justify-center
    hover:bg-pink-500
    hover:text-white
    transition-all
    duration-300
          "

                        onClick={ () =>   handleNext()   }

                        disabled={
                            currentIndex + 4 >=
                            destinations.length
                        }
                    >
                        <ChevronRight size={22} />
                    </button>

                </div>

            </div>

            <div
                className="
        grid
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-4
        gap-6
        "
            >
                {
                    !loading &&
                    destinations.length === 0 && (

                        <div
                            className="
            text-center
            py-20
            text-gray-500
            "
                        >

                            No destinations found

                        </div>

                    )
                }

                {
                    destinations.slice(
                        currentIndex,
                        currentIndex + 4
                    )
                    .map(
                        (destination) => (

                            <div

                                key={
                                    destination.name
                                }

                                onClick={() =>
                                    handleDestinationClick(
                                        destination.destination_name
                                    )
                                }


                                className="
                group
                cursor-pointer
                rounded-3xl
                overflow-hidden
                relative
                h-[500px]
                "
                            >

                                <img

                                    src={
                                        destination.cover_image
                                    }

                                    alt={
                                        destination.destination_name
                                    }

                                    className="
                  w-full
                  h-full
                  object-cover
                  group-hover:scale-110
                  duration-500
                  "
                                />

                                <div
                                    className="
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-black/60
                  via-transparent
                  to-transparent
                  "
                                />

                                <div
                                    className="
                  absolute
                  bottom-4
                  left-4
                  right-4
                  bg-white
                  rounded-2xl
                  px-5
                  py-4
                  flex
                  items-center
                  justify-between
                  "
                                >

                                    <div>

                                        <h3
                                            className="
                      font-bold
                      text-xl
                    "
                                        >
                                            {
                                                destination.destination_name
                                            }
                                        </h3>

                                        <p
                                            className="
                      text-gray-500
                    "
                                        >
                                            {
                                                destination.total_trips
                                            } Trips
                                        </p>

                                    </div>

                                    <ArrowRight
                                        className="
                    text-pink-500
                    "
                                    />

                                </div>

                            </div>

                        )
                    )
                }
 

            </div>

        </section>

    );

};

export default DestinationSection;