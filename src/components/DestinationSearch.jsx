import axios from "axios";
import {
    useState,
    useEffect,
} from "react";

const DestinationSearch = ({
    onSelect,
}) => {
    const [query, setQuery] = useState("");
    const [isSelected, setIsSelected] = useState(false);
    const [loading, setLoading] =  useState(false);

    const [suggestions, setSuggestions] = useState([]);

    const fetchDestinations =
        async () => {
            try {
                setLoading(true);


                const { data } =
                    await axios.get(
                        `http://localhost:3000/api/trip/search-destination?query=${query}`
                    );
                console.log(data);
                setSuggestions(
                    data.places
                );

            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

    useEffect(() => {

        if (isSelected) return;

        const timer = setTimeout(() => {

            if (query.trim().length < 2) {
                setSuggestions([]);
                return;
            }

            fetchDestinations();

        }, 500);

        return () => clearTimeout(timer);

    }, [query, isSelected]);

   


    return (<div className="relative">

        < input
            type="text"
            value={query}
            placeholder="Where do you want to go?"
            onChange={(e) => {
                setQuery(e.target.value);
                setIsSelected(false);
            }}
            className="
w-full
border
border-gray-200
rounded-xl
px-4
py-3
outline-none
focus: ring-2
focus: ring-pink-500
"
        />

        {loading && (
            <div className="
      absolute
      top-full
      left-0
      mt-2
      text-sm
      text-gray-500
    ">
                Searching...
            </div>
        )}

        {
            suggestions.length >
            0 && (
                <div
                    className="
      absolute
      top-full
      left-0
      right-0
      bg-white
      rounded-xl
      border
      border-gray-200
      shadow-lg
      mt-2
      z-50
      overflow-hidden
    "
                >
                    {suggestions.map(
                        (place) => (
                            <div
                                key={
                                    place.place_id
                                }
                                onClick={ () => {
                                    onSelect(place);

                                    setQuery(place.name);

                                    setSuggestions([]);

                                    setIsSelected(true);
                                }}
                                className="
              px-4
              py-3
              cursor-pointer
              hover:bg-pink-50
              border-b
              last:border-b-0
            "
                            >
                                <p className="font-medium">
                                    {place.city ||
                                        place.name}
                                </p>

                                <p className="
              text-xs
              text-gray-500
            ">
                                    {
                                        place.name
                                    }
                                </p>
                            </div>
                        )
                    )}
                </div>
            )
        }
    </div >
    );
};

export default DestinationSearch;
