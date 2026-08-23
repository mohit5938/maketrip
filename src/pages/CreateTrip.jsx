import { useState } from "react";
import { isStepComplete } from "../utils/isStepComplete.js";
import { validateTripStep } from "../utils/validateTripStep.js";
import Step1BasicInfo from "../components/createTripSteps/Step1BasicInfo.jsx";
import Step2Destination from "../components/createTripSteps/Step2Destination.jsx";
import Step3Accommodation from "../components/createTripSteps/Step3Accommodation.jsx";
import Step4Pricing from "../components/createTripSteps/Step4Pricing.jsx";
import Step5Settings from "../components/createTripSteps/Step5Settings.jsx";
import Step6Review from "../components/createTripSteps/Step6Review.jsx";
import Step7Payment from "../components/createTripSteps/Step7Payment.jsx";
import { toast } from "react-toastify";
const TOTAL_STEPS = 7;

const CreateTrip = () => {
  const [step, setStep] = useState(1);

  const [tripData, setTripData] =
    useState({
      tripName: "",
      tripDescription: "",
      category: "",
      startLocation: null,
  destination: null,
  stops: [],
  accommodation: "",
  inclusions: [],
  exclusions: [],
  specialFeatures: [],
      tripImages: [],
  accommodationCost: "",
  transportationCost: "",
      foodCost: "",
      otherExpenses: [
        {
          name: "",
          cost: "",
        },
      ],
  hostFee: "",
      totalTripCost: 0,
      totalCollection: 0,
      pricePerPerson: 0,  
  travelersLimit: "",
  startDate: "",
  endDate: "",
});



  const nextStep = () => {

    if (!validateTripStep( step, tripData )) {
      return;
    }

    if (step < TOTAL_STEPS) {
      setStep(step + 1);
    }

  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const progress =
    (step / TOTAL_STEPS) * 100;

  const renderStep = () => {
    switch (step) {
      case 1:
        return (<Step1BasicInfo
          tripData={tripData}
          setTripData={setTripData}
        />
        );

        
  case 2:
    return (
      <Step2Destination
        tripData={tripData}
        setTripData={setTripData}
      />
    );

  case 3:
    return (
      <Step3Accommodation
        tripData={tripData}
        setTripData={setTripData}
      />
    );

  case 4:
    return (
      <Step4Pricing
        tripData={tripData}
        setTripData={setTripData}
      />
    );

  case 5:
    return (
      <Step5Settings
        tripData={tripData}
        setTripData={setTripData}
      />
    );

  case 6:
    return (
      <Step6Review
        tripData={tripData}
      />
    );

  case 7:
    return (
      <Step7Payment
        tripData={tripData}
      />
    );

  default:
    return null;
}


    };

    return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">

    
      <div className="max-w-5xl mx-auto">

        <div className="bg-white rounded-3xl shadow-lg overflow-hidden">

          <div className="bg-gradient-to-r from-pink-500 to-rose-500 p-6">

            <h1 className="text-3xl font-bold text-white">
              Create Trip
            </h1>

            <p className="text-pink-100 mt-2">
              Step {step} of {TOTAL_STEPS}
            </p>

            <div className="mt-4 h-3 bg-white/30 rounded-full">

              <div
                className="h-full bg-white rounded-full transition-all duration-300"
                style={{
                  width: `${progress}%`,
                }}
              />

            </div>

          </div>

          <div className="p-6 md:p-8">

            {renderStep()}

            <div className="flex justify-between mt-10">

              <button
                onClick={prevStep}
                disabled={step === 1}
                className="
              px-6
              py-3
              rounded-xl
              border
              disabled:opacity-50
            "
              >
                Previous
              </button>

              {step < TOTAL_STEPS && (
                  <button
                    onClick={nextStep}
                    disabled={!isStepComplete(step, tripData)}
                    className={`
        px-6
        py-3
        rounded-xl
        text-white
        transition

        ${isStepComplete(step, tripData)
                        ? "bg-pink-500 hover:bg-pink-600"
                        : "bg-gray-300 cursor-not-allowed"
                      }
    `}
                  >
                    Next
                  </button>
              )}

            </div>

          </div>

        </div>

      </div>

    </div>


);
};

export default CreateTrip;
