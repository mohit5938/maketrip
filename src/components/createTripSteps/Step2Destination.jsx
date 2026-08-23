import { Plus, Trash2 } from "lucide-react";
import DestinationSearch from "../../components/DestinationSearch.jsx";

const Step2Destination = ({
    tripData,
    setTripData,
}) => {

    const addStop = () => {

        setTripData((prev) => ({
            ...prev,

            stops: [
                ...prev.stops,

                {
                    location: null,
                    transportMode: "bus",
                },
            ],
        }));

    };

    const removeStop = (index) => {

        setTripData((prev) => ({
            ...prev,

            stops: prev.stops.filter(
                (_, i) => i !== index
            ),
        }));

    };

    const updateStopLocation = (
        index,
        location
    ) => {

        const updatedStops = [
            ...tripData.stops,
        ];

        updatedStops[index].location =
            location;

        setTripData((prev) => ({
            ...prev,
            stops: updatedStops,
        }));

    };

    const updateTransportMode = (
        index,
        value
    ) => {

        const updatedStops = [
            ...tripData.stops,
        ];

        updatedStops[index].transportMode =
            value;

        setTripData((prev) => ({
            ...prev,
            stops: updatedStops,
        }));

    };

    return (

        <div className="space-y-8">

            {/* Header */}

            <div>

                <h2 className="text-2xl font-bold">
                    Route & Destination
                </h2>

                <p className="text-gray-500 mt-1">
                    Build your travel route from
                    start location to destination.
                </p>

            </div>

            {/* Start Location */}

            <div>

                <label className="block mb-2 font-medium">
                    Start Location
                </label>

                <DestinationSearch
                    onSelect={(place) =>
                        setTripData((prev) => ({
                            ...prev,
                            startLocation: place,
                        }))
                    }
                />

                {tripData.startLocation && (

                    <div className="
            mt-3
            p-3
            rounded-xl
            bg-green-50
            border
          ">

                        📍
                        {" "}
                        {tripData.startLocation.name}

                    </div>

                )}

            </div>

            {/* Stops */}

            <div>

                <div className="
          flex
          items-center
          justify-between
          mb-4
        ">

                    <h3 className="
            text-lg
            font-semibold
          ">
                        Trip Stops
                    </h3>

                    <button
                        type="button"
                        onClick={addStop}
                        className="
              flex
              items-center
              gap-2
              px-4
              py-2
              bg-pink-500
              text-white
              rounded-xl
            "
                    >
                        <Plus size={18} />
                        Add Stop
                    </button>

                </div>

                <div className="space-y-5">

                    {tripData.stops.map(
                        (stop, index) => (

                            <div
                                key={index}
                                className="
                  border
                  rounded-2xl
                  p-5
                  bg-gray-50
                "
                            >

                                <div className="
                  flex
                  items-center
                  justify-between
                  mb-4
                ">

                                    <h4 className="font-medium">
                                        Stop {index + 1}
                                    </h4>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            removeStop(index)
                                        }
                                        className="
                      text-red-500
                    "
                                    >
                                        <Trash2 size={18} />
                                    </button>

                                </div>

                                {/* Location */}

                                <DestinationSearch
                                    onSelect={(place) =>
                                        updateStopLocation(
                                            index,
                                            place
                                        )
                                    }
                                />

                                {stop.location && (

                                    <div className="
                    mt-3
                    p-3
                    rounded-xl
                    bg-pink-50
                    border
                  ">

                                        📍
                                        {" "}
                                        {stop.location.name}

                                    </div>

                                )}

                                {/* Transport */}

                                <div className="mt-4">

                                    <label className="
                    block
                    mb-2
                    font-medium
                  ">
                                        Transport To Next Stop
                                    </label>

                                    <select
                                        value={
                                            stop.transportMode
                                        }
                                        onChange={(e) =>
                                            updateTransportMode(
                                                index,
                                                e.target.value
                                            )
                                        }
                                        className="
                      w-full
                      border
                      rounded-xl
                      px-4
                      py-3
                    "
                                    >

                                        <option value="flight">
                                            Flight
                                        </option>

                                        <option value="train">
                                            Train
                                        </option>

                                        <option value="bus">
                                            Bus
                                        </option>

                                        <option value="car">
                                            Car
                                        </option>

                                        <option value="bike">
                                            Bike
                                        </option>

                                        <option value="walk">
                                            Walk
                                        </option>

                                    </select>

                                </div>

                            </div>

                        )
                    )}

                </div>

            </div>

            {/* Final Destination */}

            <div>

                <label className="
          block
          mb-2
          font-medium
        ">
                    Final Destination
                </label>

                <DestinationSearch
                    onSelect={(place) =>
                        setTripData((prev) => ({
                            ...prev,
                            destination: place,
                        }))
                    }
                />

                {tripData.destination && (

                    <div className="
            mt-3
            p-3
            rounded-xl
            bg-blue-50
            border
          ">

                        🎯
                        {" "}
                        {tripData.destination.name}

                    </div>

                )}

            </div>

            {/* Route Preview */}

            <div className="
        border
        rounded-2xl
        p-5
        bg-gray-50
      ">

                <h3 className="
          text-lg
          font-semibold
          mb-4
        ">
                    Route Preview
                </h3>

                {tripData.startLocation && (

                    <div className="mb-2">
                        📍
                        {" "}
                        {tripData.startLocation.name}
                    </div>

                )}

                {tripData.stops.map(
                    (stop, index) => (

                        stop.location && (

                            <div
                                key={index}
                                className="mb-2"
                            >

                                <div className="
                  text-sm
                  text-gray-500
                  ml-4
                ">
                                    ↓ {stop.transportMode}
                                </div>

                                <div>
                                    📍
                                    {" "}
                                    {stop.location.name}
                                </div>

                            </div>

                        )
                    )
                )}

                {tripData.destination && (

                    <div className="mt-2">

                        <div className="
              text-sm
              text-gray-500
              ml-4
            ">
                            ↓ Arrival
                        </div>

                        <div>
                            🎯
                            {" "}
                            {tripData.destination.name}
                        </div>

                    </div>

                )}

            </div>

        </div>

    );

};

export default Step2Destination;