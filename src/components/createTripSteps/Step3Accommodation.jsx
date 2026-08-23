import { useState } from "react";

const Step3Accommodation = ({
    tripData,
    setTripData,
}) => {

    const [imagePreviews, setImagePreviews] =
        useState([]);

    const inclusionOptions = [
        "Breakfast",
        "Lunch",
        "Dinner",
        "Accommodation",
        "Transport",
        "Activities",
        "Airport Pickup",
        "WiFi",
    ];

    const exclusionOptions = [
        "Flights",
        "Travel Insurance",
        "Personal Expenses",
        "Visa",
        "Shopping",
        "Medical Expenses",
    ];

    const specialOptions = [
        "Bonfire",
        "Night Safari",
        "Trekking",
        "Camping",
        "Water Sports",
        "Sunrise Point",
        "Photography Tour",
    ];

    const handleCheckboxChange = (
        field,
        value
    ) => {

        const current =
            tripData[field];

        const updated =
            current.includes(value)
                ? current.filter(
                    (item) =>
                        item !== value
                )
                : [...current, value];

        setTripData((prev) => ({
            ...prev,
            [field]: updated,
        }));
    };

    const handleImageChange = (e) => {

        const files =
            Array.from(
                e.target.files
            );

        setTripData((prev) => ({
            ...prev,
            tripImages: files,
        }));

        const previews =
            files.map((file) =>
                URL.createObjectURL(
                    file
                )
            );

        setImagePreviews(
            previews
        );
    };

    return (

        <div className="space-y-8">

            {/* Header */}

            <div>

                <h2 className="text-2xl font-bold">
                    Stay & Trip Highlights
                </h2>

                <p className="text-gray-500">
                    Show travelers where
                    they'll stay and what
                    they'll experience.
                </p>

            </div>

            {/* Images */}

            <div>

                <label className="block mb-2 font-medium">
                    Trip Images
                </label>

                <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={
                        handleImageChange
                    }
                    className="
            w-full
            border
            rounded-xl
            p-3
          "
                />

                {imagePreviews.length >
                    0 && (

                        <div className="
            grid
            grid-cols-2
            md:grid-cols-4
            gap-3
            mt-4
          ">

                            {imagePreviews.map(
                                (
                                    image,
                                    index
                                ) => (

                                    <img
                                        key={index}
                                        src={image}
                                        alt=""
                                        className="
                    h-28
                    w-full
                    object-cover
                    rounded-xl
                  "
                                    />

                                )
                            )}

                        </div>

                    )}

            </div>

            {/* Accommodation Type */}

            <div>

                <label className="
          block
          mb-2
          font-medium
        ">
                    Accommodation Type
                </label>

                <select
                    value={
                        tripData.accommodation
                    }
                    onChange={(e) =>
                        setTripData(
                            (prev) => ({
                                ...prev,
                                accommodation:
                                    e.target.value,
                            })
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

                    <option value="">
                        Select Accommodation
                    </option>

                    <option value="hotel">
                        Hotel
                    </option>

                    <option value="hostel">
                        Hostel
                    </option>

                    <option value="resort">
                        Resort
                    </option>

                    <option value="camping">
                        Camping
                    </option>

                    <option value="homestay">
                        Homestay
                    </option>

                    <option value="villa">
                        Villa
                    </option>

                    <option value="apartment">
                        Apartment
                    </option>

                </select>

            </div>

            {/* Accommodation Description */}

            <div>

                <label className="
          block
          mb-2
          font-medium
        ">
                    Accommodation Details
                </label>

                <textarea
                    rows="4"
                    value={
                        tripData
                            .accommodationDescription || ""
                    }
                    onChange={(e) =>
                        setTripData(
                            (prev) => ({
                                ...prev,
                                accommodationDescription:
                                    e.target.value,
                            })
                        )
                    }
                    placeholder="
Describe rooms,
location,
amenities,
sharing details...
          "
                    className="
            w-full
            border
            rounded-xl
            px-4
            py-3
          "
                />

            </div>

            {/* Inclusions */}

            <div>

                <h3 className="
          text-lg
          font-semibold
          mb-3
        ">
                    Inclusions
                </h3>

                <div className="
          grid
          md:grid-cols-2
          gap-3
        ">

                    {inclusionOptions.map(
                        (item) => (

                            <label
                                key={item}
                                className="
                  flex
                  items-center
                  gap-3
                  border
                  rounded-xl
                  p-3
                  cursor-pointer
                "
                            >

                                <input
                                    type="checkbox"
                                    checked={
                                        tripData.inclusions.includes(
                                            item
                                        )
                                    }
                                    onChange={() =>
                                        handleCheckboxChange(
                                            "inclusions",
                                            item
                                        )
                                    }
                                />

                                {item}

                            </label>

                        )
                    )}

                </div>

            </div>

            {/* Exclusions */}

            <div>

                <h3 className="
          text-lg
          font-semibold
          mb-3
        ">
                    Exclusions
                </h3>

                <div className="
          grid
          md:grid-cols-2
          gap-3
        ">

                    {exclusionOptions.map(
                        (item) => (

                            <label
                                key={item}
                                className="
                  flex
                  items-center
                  gap-3
                  border
                  rounded-xl
                  p-3
                  cursor-pointer
                "
                            >

                                <input
                                    type="checkbox"
                                    checked={
                                        tripData.exclusions.includes(
                                            item
                                        )
                                    }
                                    onChange={() =>
                                        handleCheckboxChange(
                                            "exclusions",
                                            item
                                        )
                                    }
                                />

                                {item}

                            </label>

                        )
                    )}

                </div>

            </div>

            {/* Special Features */}

            <div>

                <h3 className="
          text-lg
          font-semibold
          mb-3
        ">
                    Special Features
                </h3>

                <div className="
          grid
          md:grid-cols-2
          gap-3
        ">

                    {specialOptions.map(
                        (item) => (

                            <label
                                key={item}
                                className="
                  flex
                  items-center
                  gap-3
                  border
                  rounded-xl
                  p-3
                  cursor-pointer
                "
                            >

                                <input
                                    type="checkbox"
                                    checked={
                                        tripData.specialFeatures.includes(
                                            item
                                        )
                                    }
                                    onChange={() =>
                                        handleCheckboxChange(
                                            "specialFeatures",
                                            item
                                        )
                                    }
                                />

                                {item}

                            </label>

                        )
                    )}

                </div>

            </div>

        </div>

    );

};

export default Step3Accommodation;