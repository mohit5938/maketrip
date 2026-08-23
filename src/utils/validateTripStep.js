import { toast } from "react-toastify";

export const validateTripStep = (step, tripData) => {

    switch (step) {

        case 1:

            if (!tripData.tripName.trim()) {
                toast.error("Trip name is required");
                return false;
            }

            if (!tripData.tripDescription.trim()) {
                toast.error("Trip description is required");
                return false;
            }

            if (!tripData.category) {
                toast.error("Please select a category");
                return false;
            }

            return true;

        case 2:

            if (!tripData.startLocation) {
                toast.error("Please select a start location");
                return false;
            }

            if (!tripData.destination) {
                toast.error("Please select a destination");
                return false;
            }

            return true;

        case 3:

            if (!tripData.accommodation) {
                toast.error("Please select accommodation");
                return false;
            }

            if (tripData.tripImages.length === 0) {
                toast.error("Upload at least one trip image");
                return false;
            }

            return true;

        case 4:

            if (!tripData.accommodationCost) {
                toast.error("Accommodation cost is required");
                return false;
            }

            if (!tripData.transportationCost) {
                toast.error("Transportation cost is required");
                return false;
            }

            if (!tripData.foodCost) {
                toast.error("Food cost is required");
                return false;
            }

            return true;

        case 5:

            if (!tripData.startDate) {
                toast.error("Please select start date");
                return false;
            }

            if (!tripData.endDate) {
                toast.error("Please select end date");
                return false;
            }

            if (
                new Date(tripData.endDate) <
                new Date(tripData.startDate)
            ) {
                toast.error("End date cannot be before start date");
                return false;
            }

            if (Number(tripData.travelersLimit) <= 0) {
                toast.error("Please enter a valid traveler limit");
                return false;
            }

            return true;

        default:
            return true;
    }

};