import axios from "axios";
import {server} from "../constants/constant.js";
export const createTrip = async (
    tripData
) => {

    const formData =
        new FormData();

    formData.append(
        "tripName",
        tripData.tripName
    );

    formData.append(
        "tripDescription",
        tripData.tripDescription
    );

    formData.append(
        "category",
        tripData.category
    );

    formData.append(
        "tripType",
        tripData.tripType
    );

    formData.append(
        "aboutHost",
        tripData.aboutHost
    );

    /* ------------------
       Route
    ------------------- */

    formData.append(
        "startLocation",
        JSON.stringify(
            tripData.startLocation
        )
    );

    formData.append(
        "destination",
        JSON.stringify(
            tripData.destination
        )
    );

    formData.append(
        "stops",
        JSON.stringify(
            tripData.stops
        )
    );

    /* ------------------
       Accommodation
    ------------------- */

    formData.append(
        "accommodation",
        tripData.accommodation
    );

    formData.append(
        "accommodationDescription",
        tripData.accommodationDescription
    );

    formData.append(
        "inclusions",
        JSON.stringify(
            tripData.inclusions
        )
    );

    formData.append(
        "exclusions",
        JSON.stringify(
            tripData.exclusions
        )
    );

    formData.append(
        "specialFeatures",
        JSON.stringify(
            tripData.specialFeatures
        )
    );

    /* ------------------
       Pricing
    ------------------- */

    formData.append(
        "accommodationCost",
        tripData.accommodationCost
    );

    formData.append(
        "transportationCost",
        tripData.transportationCost
    );

    formData.append(
        "foodCost",
        tripData.foodCost
    );

    formData.append(
        "hostFee",
        tripData.hostFee
    );

    formData.append(
        "otherExpenses",
        JSON.stringify(
            tripData.otherExpenses
        )
    );

    /* ------------------
       Settings
    ------------------- */

    formData.append(
        "travelersLimit",
        tripData.travelersLimit
    );

    formData.append(
        "visibility",
        tripData.visibility
    );

    formData.append(
        "startDate",
        tripData.startDate
    );

    formData.append(
        "endDate",
        tripData.endDate
    );

    /* ------------------
       Images
    ------------------- */

    tripData.tripImages.forEach(
        (image) => {

            formData.append(
                "tripImages",
                image
            );

        }
    );

    const { data } =
        await axios.post(

            `${server}trip/create-trip`,

            formData,

            {

                withCredentials:
                    true,

            }

        );

    return data;
};