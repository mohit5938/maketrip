export const isStepComplete = (step, tripData) => {

    switch (step) {

        case 1:
            return (
                tripData.tripName.trim() &&
                tripData.tripDescription.trim() &&
                tripData.category
            );

        case 2:
            return (
                tripData.startLocation &&
                tripData.destination
            );

        case 3:
            return (
                tripData.accommodation &&
                tripData.tripImages.length > 0
            );

        case 4:
            return (
                tripData.accommodationCost &&
                tripData.transportationCost &&
                tripData.foodCost
            );

        case 5:
            return (
                tripData.startDate &&
                tripData.endDate &&
                Number(tripData.travelersLimit) > 0
            );

        default:
            return true;
    }

};