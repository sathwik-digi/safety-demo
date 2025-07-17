import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import onesubseaLogo from "../../../assets/Images/onesubsea_logo.png";
import locationIcon from "../../../assets/Icons/google_maps-icon.png";
import OwnershipIdentityForm from "./OwnershipIdentityForm";
import FactoryOwnershipIdentityForm from "./FactoryOwnershipIdentityForm";
import FactoryLayoutApproval from "./FactoryLayoutApproval";

function FactoryDetails() {
  const location = useLocation();
  const status = location.state;
  const [step, setStep] = useState(1);

  const goToNextStep = () => setStep(2);
  const goToPreviousStep = () => setStep(1);

  return (
    <div className="ml-10 mt-10 max-w-6xl">

      {/* Factory Header Section */}
      <div className="flex p-6 border-gray-300 rounded-md">
        <div className="w-[13rem] h-[11rem] mr-6">
          <img
            src={onesubseaLogo}
            alt="One Subsea Logo"
            className="object-contain w-full h-full"
          />
        </div>

        <div className="flex-1">
          <h2 className="text-[36px] font-bold text-[#000000]">One subsea</h2>
          <p className="text-[20px] font-semibold text-[#000000] mb-1">
            Production, Manufacturing & Processing Technology
          </p>
          <p className="text-[14px] font-normal text-[#18191A] mb-1 flex items-center gap-1">
            <img src={locationIcon} alt="Location Icon" className="w-4 h-4" />
            23BP & 240P, Vakalapudi, Kakinada Industrial Area, Kakinada, Andhra Pradesh 533005
          </p>
          <a
            href="https://www.onesubsea.slb.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[14px] font-normal text-[#565959] underline"
          >
            https://www.onesubsea.slb.com/
          </a>

          <div className="flex border-t w-[98%] border-black mt-3 pt-2 text-sm text-gray-800">
            <div className="mr-10">
              <p className="text-[18px] font-semibold text-[#3A3A3A]">Sanjay Kumar</p>
              <p className="text-[16px] text-[#939393] font-normal">Owner</p>
            </div>
            <div className="mr-10">
              <p className="text-[18px] font-semibold text-[#3A3A3A]">Total no of Employees</p>
              <p className="font-medium text-[16px] text-[#ADADAD]">56</p>
            </div>
            <div>
              <p className="text-[18px] font-semibold text-[#3A3A3A]">Started from</p>
              <p className="font-medium text-[16px] text-[#ADADAD]">2022</p>
            </div>
          </div>
        </div>
      </div>

      {status === "Verify" && (
        <FactoryLayoutApproval />
      )}
      {step === 1 && <OwnershipIdentityForm onNext={goToNextStep} />}
      {step === 2 && (
        <FactoryOwnershipIdentityForm onBack={goToPreviousStep} status={status} />
      )}
    </div>
  );
}

export default FactoryDetails;
