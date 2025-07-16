import React, { useState } from "react";
import OwnershipIdentityForm from "./OwnershipIdentityForm";
import FactoryOwnershipIdentityForm from "./FactoryOwnershipIdentityForm";

function FactoryDetails() {
  const [step, setStep] = useState(1);

  const goToNextStep = () => {
    setStep(2);
  };

  const goToPreviousStep = () => {
    setStep(1);
  };

  return (
    <div className="ml-10 mt-10 max-w-6xl">
      {step === 1 && <OwnershipIdentityForm onNext={goToNextStep} />}
      {step === 2 && (
        <FactoryOwnershipIdentityForm onBack={goToPreviousStep} />
      )}
    </div>
  );
}

export default FactoryDetails;
