const Step5Settings = ({
    tripData,
    setTripData,
}) => {

    return (

        <div className="space-y-8">

            {/* HEADER */}

            <div>

                <h2 className="text-3xl font-bold">
                    Trip Settings
                </h2>

                <p className="text-gray-500 mt-2">
                    Configure your trip schedule and available seats.
                </p>

            </div>

            {/* DATES */}

            <div>

                <h3 className="
          text-xl
          font-semibold
          mb-4
        ">
                    Trip Schedule
                </h3>

                <div className="
          grid
          md:grid-cols-2
          gap-5
        ">

                    <div>

                        <label className="
              block
              mb-2
              font-medium
            ">
                            Start Date
                        </label>
                        <input
                            type="date"
                            min={new Date().toISOString().split("T")[0]}
                            value={tripData.startDate}
                            onChange={(e) =>
                                setTripData((prev) => ({
                                    ...prev,
                                    startDate: e.target.value,
                                }))
                            }
                            className="
        w-full
        border
        rounded-xl
        px-4
        py-3
    "
                        />

                    </div>

                    <div>

                        <label className="
              block
              mb-2
              font-medium
            ">
                            End Date
                        </label>

                        <input
                            type="date"
                            min={tripData.startDate}
                            value={tripData.endDate}
                            onChange={(e) =>
                                setTripData((prev) => ({
                                    ...prev,
                                    endDate: e.target.value,
                                }))
                            }
                            className="
        w-full
        border
        rounded-xl
        px-4
        py-3
    "
                        />

                    </div>

                </div>

            </div>

            {/* SEATS */}

            <div>

                <label className="
          block
          font-medium
          mb-2
        ">
                    Maximum Travelers
                </label>

                <input
                    type="number"
                    min="1"
                    value={
                        tripData.travelersLimit
                    }
                    onChange={(e) =>
                        setTripData(
                            (prev) => ({
                                ...prev,
                                travelersLimit:
                                    e.target.value,
                            })
                        )
                    }
                    placeholder="20"
                    className="
            w-full
            border
            rounded-xl
            px-4
            py-3
          "
                />

            </div>

           
            {/* SUMMARY */}

            <div
                className="
          bg-pink-50
          border
          border-pink-100
          rounded-2xl
          p-5
        "
            >

                <h3 className="
          font-semibold
          mb-3
        ">
                    Trip Summary
                </h3>

                <div className="
          space-y-2
          text-sm
        ">

                

                    <div className="
            flex
            justify-between
          ">
                        <span>
                            Seats
                        </span>

                        <span>
                            {tripData.travelersLimit || 0}
                        </span>
                    </div>

                

                    <div className="
            flex
            justify-between
          ">
                        <span>
                            Start Date
                        </span>

                        <span>
                            {tripData.startDate || "-"}
                        </span>
                    </div>

                    <div className="
            flex
            justify-between
          ">
                        <span>
                            End Date
                        </span>

                        <span>
                            {tripData.endDate || "-"}
                        </span>
                    </div>

                </div>

            </div>

        </div>

    );

};

export default Step5Settings;