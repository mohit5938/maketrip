import { Plus, Trash2 } from "lucide-react";
import {
    calculateTripCost,
} from "../../utils/calculateTripCost";
import { useEffect } from "react";

const Step4Pricing = ({
    tripData,
    setTripData,
}) => {

    const handleChange = (e) => {

        setTripData((prev) => ({
            ...prev,
            [e.target.name]:
                e.target.value,
        }));

    };

    const {

        accommodationCost,

        transportationCost,

        foodCost,

        otherExpensesTotal,

        totalTripCost,

        hostFee,

        totalCollection,

        estimatedCostPerTraveler,

    } = calculateTripCost(
        tripData
    );

    useEffect(() => {

        setTripData(prev => ({

            ...prev,

            totalTripCost,

            totalCollection,

            pricePerPerson: estimatedCostPerTraveler,

        }));

    }, [

        totalTripCost,

        totalCollection,

        estimatedCostPerTraveler,

        setTripData,

    ]);

    const addExpense = () => {

        setTripData((prev) => ({
            ...prev,

            otherExpenses: [
                ...prev.otherExpenses,

                {
                    name: "",
                    cost: "",
                },
            ],
        }));

    };

    const removeExpense = (
        index
    ) => {

        setTripData((prev) => ({
            ...prev,

            otherExpenses:
                prev.otherExpenses.filter(
                    (_, i) =>
                        i !== index
                ),
        }));

    };

    const updateExpense = (
        index,
        field,
        value
    ) => {

        const expenses = [
            ...tripData.otherExpenses,
        ];

        expenses[index][field] =
            value;

        setTripData((prev) => ({
            ...prev,
            otherExpenses:
                expenses,
        }));

    };



    return (

        <div className="space-y-8">

            {/* Header */}

            <div>

                <h2 className="text-3xl font-bold">
                    Trip Pricing
                </h2>

                <p className="text-gray-500 mt-2">
                    Enter your total trip
                    expenses. JoinTrip will
                    calculate traveler pricing
                    automatically.
                </p>

            </div>

            {/* Main Costs */}

            <div
                className="
          grid
          md:grid-cols-2
          gap-5
        "
            >

                <div>

                    <label
                        className="
              block
              mb-2
              font-medium
            "
                    >
                        Accommodation Cost
                        (Total)
                    </label>

                    <input
                        type="number"
                        name="accommodationCost"
                        value={
                            tripData.accommodationCost
                        }
                        onChange={
                            handleChange
                        }
                        placeholder="20000"
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

                    <label
                        className="
              block
              mb-2
              font-medium
            "
                    >
                        Transportation Cost
                        (Total)
                    </label>

                    <input
                        type="number"
                        name="transportationCost"
                        value={
                            tripData.transportationCost
                        }
                        onChange={
                            handleChange
                        }
                        placeholder="10000"
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

                    <label
                        className="
              block
              mb-2
              font-medium
            "
                    >
                        Food Cost
                        (Total)
                    </label>

                    <input
                        type="number"
                        name="foodCost"
                        value={
                            tripData.foodCost
                        }
                        onChange={
                            handleChange
                        }
                        placeholder="5000"
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

                    <label
                        className="
            block
            mb-2
            font-medium
        "
                    >
                        Guide Fee (Total)
                    </label>

                    <input
                        type="number"
                        name="hostFee"
                        value={tripData.hostFee}
                        onChange={handleChange}
                        placeholder="5000"
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

            {/* Other Expenses */}

            <div>

                <div
                    className="
            flex
            justify-between
            items-center
            mb-4
          "
                >

                    <h3
                        className="
              text-xl
              font-bold
            "
                    >
                        Other Expenses
                    </h3>

                    <button
                        type="button"
                        onClick={addExpense}
                        className="
              flex
              items-center
              gap-2
              bg-pink-500
              text-white
              px-4
              py-2
              rounded-xl
            "
                    >
                        <Plus size={18} />
                        Add Expense
                    </button>

                </div>

                <div className="space-y-4">

                    {tripData.otherExpenses.map(
                        (
                            expense,
                            index
                        ) => (

                            <div
                                key={index}
                                className="
                  border
                  rounded-2xl
                  p-4
                "
                            >

                                <div
                                    className="
                    grid
                    md:grid-cols-2
                    gap-4
                  "
                                >

                                    <input
                                        type="text"
                                        placeholder="Expense Name"
                                        value={
                                            expense.name
                                        }
                                        onChange={(e) =>
                                            updateExpense(
                                                index,
                                                "name",
                                                e.target.value
                                            )
                                        }
                                        className="
                      border
                      rounded-xl
                      px-4
                      py-3
                    "
                                    />

                                    <input
                                        type="number"
                                        placeholder="Cost"
                                        value={
                                            expense.cost
                                        }
                                        onChange={(e) =>
                                            updateExpense(
                                                index,
                                                "cost",
                                                e.target.value
                                            )
                                        }
                                        className="
                      border
                      rounded-xl
                      px-4
                      py-3
                    "
                                    />

                                </div>

                                <button
                                    type="button"
                                    onClick={() =>
                                        removeExpense(
                                            index
                                        )
                                    }
                                    className="
                    mt-3
                    flex
                    items-center
                    gap-2
                    text-red-500
                  "
                                >
                                    <Trash2
                                        size={16}
                                    />
                                    Remove
                                </button>

                            </div>

                        )
                    )}

                </div>

            </div>

            {/* Cost Summary */}

            <div
                className="
          bg-pink-50
          border
          border-pink-100
          rounded-3xl
          p-6
        "
            >

                <h3
                    className="
            text-xl
            font-bold
            mb-4
          "
                >
                    Cost Summary
                </h3>

                <div className="space-y-3">

                    <div className="flex justify-between">
                        <span>Accommodation</span>
                        <span>₹{accommodationCost}</span>
                    </div>

                    <div className="flex justify-between">
                        <span>Transportation</span>
                        <span>₹{transportationCost}</span>
                    </div>

                    <div className="flex justify-between">
                        <span>Food</span>
                        <span>₹{foodCost}</span>
                    </div>

                    <div className="flex justify-between">
                        <span>Other Expenses</span>
                        <span>₹{otherExpensesTotal}</span>
                    </div>

                    <hr />

                    <div className="flex justify-between font-semibold">
                        <span>Total Trip Cost</span>
                        <span>₹{totalTripCost}</span>
                    </div>

                    <div className="flex justify-between">

                        <span>Guide Fee</span>

                        <span>₹{hostFee}</span>

                    </div>

                    <hr />

                    <div
                        className="
              flex
              justify-between
              text-xl
              font-bold
              text-pink-600
            "
                    >

                        <span>
                            Total Collection
                        </span>

                        <span>
                            ₹{totalCollection}
                        </span>

                    </div>

                </div>

            </div>

            {/* Traveler Preview */}

            <div
                className="
          bg-blue-50
          border
          border-blue-100
          rounded-3xl
          p-6
        "
            >

                <h3
                    className="
            text-xl
            font-bold
            mb-4
          "
                >
                    Traveler Cost Preview
                </h3>

                <div className="space-y-3">

                    <div className="flex justify-between">

                        <span>
                            Travelers Limit
                        </span>

                        <span>
                            {tripData.travelersLimit || 0}
                        </span>

                    </div>

                    <hr />

                    <div
                        className="
              flex
              justify-between
              text-xl
              font-bold
              text-blue-600
            "
                    >

                        <span>
                            Estimated Cost /
                            Traveler
                        </span>

                        <span>
                            ₹
                            {
                                estimatedCostPerTraveler
                            }
                        </span>

                    </div>

                </div>

            </div>

        </div>

    );

};

export default Step4Pricing;