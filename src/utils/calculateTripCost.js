export const calculateTripCost = (tripData) => {

    const accommodationCost =
        Number(tripData.accommodationCost) || 0;

    const transportationCost =
        Number(tripData.transportationCost) || 0;

    const foodCost =
        Number(tripData.foodCost) || 0;

    const otherExpensesTotal =
        tripData.otherExpenses?.reduce(
            (total, expense) =>
                total + (Number(expense.cost) || 0),
            0
        ) || 0;

    // Guide Fee (Host Profit)

    const hostFee =
        Number(tripData.hostFee) || 0;

    // Total Trip Expenses (without host profit)

    const totalTripCost =
        accommodationCost +
        transportationCost +
        foodCost +
        otherExpensesTotal;

    // Total amount collected from travelers

    const totalCollection =
        totalTripCost +
        hostFee;

    // Estimated amount each traveler pays

    const travelersLimit =
        Number(tripData.travelersLimit) || 1;

    const estimatedCostPerTraveler =
        Math.ceil(
            totalCollection / travelersLimit
        );

    return {

        accommodationCost,

        transportationCost,

        foodCost,

        otherExpensesTotal,

        totalTripCost,

        hostFee,

        totalCollection,

        estimatedCostPerTraveler,

    };

};