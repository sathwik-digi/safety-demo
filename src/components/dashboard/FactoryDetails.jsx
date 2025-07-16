import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import OwnershipIdentityForm from "./OwnershipIdentityForm";
import FactoryOwnershipIdentityForm from "./FactoryOwnershipIdentityForm";
import FactoryLayoutApproval from "./FactoryLayoutApproval";

function FactoryDetails() {
  const location = useLocation();
  const factory = location.state?.factory;
  const [step, setStep] = useState(1);

  const goToNextStep = () => setStep(2);
  const goToPreviousStep = () => setStep(1);

  if (factory?.status === "Verify") {
    return (
      <div className="ml-10 mt-10 max-w-6xl">
        <FactoryLayoutApproval factory={factory} />
      </div>
    );
  }

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
