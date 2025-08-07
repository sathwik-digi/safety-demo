import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import approveIcon from "../../../assets/Icons/approve-icon.png";
import resubmitIcon from "../../../assets/Icons/resubmit-icon.png";
import declineIcon from "../../../assets/Icons/decline-icon.png";
import { networkHandler } from "../../../https/networkHandler";
import { toast } from "sonner"

function FactoryOwnershipIdentityForm({ onBack, status, factoryData }) {
  const [formValues, setFormValues] = useState({
    name: "",
    businessEmail: "",
    contactNumber: "",
    businessContactNumber: "",
    licensesNumber: "",
    businessPanNumber: "",
    gstNumber: "",
    factoryAddress: "",
    state: "",
    district: "",
    pincode: "",
    city: "",
  });

  useEffect(() => {
    if (factoryData) {
      const factory = factoryData;
      setFormValues({
        name: "Sanjay Kuma",
        businessEmail: factory.email || "sanjay@email.com",
        contactNumber: factory.contactNumber || "9999999999",
        businessContactNumber: "9999999000",
        licensesNumber: "1234 5678 9012",
        businessPanNumber: factory.panNumber || "DUMMYPAN123",
        gstNumber: "37AAACP1206G1ZW",
        factoryAddress: factory.factoryAddress || "Dummy Address",
        state: factory.state || "Dummy State",
        district: factory.district || "Dummy District",
        pincode: factory.pincode || "000000",
        city: factory.city || "Dummy City",
      });
    }
  }, [factoryData]);


  const handleApproval = async (message) => {
    if (!factoryData) {
      alert("Factory data not available");
      return;
    }

    const payload = {
      factoryId: factoryData.id,
      approvalStatus: message
    };

    try {
      const response = await networkHandler.post("8082/v1/users/factory/approval", payload);
      toast.success("This industry is approved");
    } catch (error) {
      console.error("Error in approval:", error);
    }
  };



  return (
    <div className="mx-4 sm:ml-10 mt-10 max-w-6xl">
      {/* Factory Ownership Identity Form */}
      <div className="mt-6 sm:mt-10 sm:mx-10">
        <h2 className="text-[28px] sm:text-[36px] font-semibold text-[#000000] mb-6">
          Factory Ownership Identity
        </h2>

        <form className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-x-20">
          <div>
            <label className="block font-semibold text-[#666666] mb-2">
              Name of the person
            </label>
            <Input type="text" value={formValues.name} className="w-full" />
          </div>

          <div>
            <label className="block font-semibold text-[#666666] mb-2">
              Business Email ID
            </label>
            <Input type="email" value={formValues.businessEmail} className="w-full" />
          </div>

          <div>
            <label className="block font-semibold text-[#666666] mb-2">
              Contact number
            </label>
            <Input type="tel" value={formValues.contactNumber} className="w-full" />
          </div>

          <div>
            <label className="block font-semibold text-[#666666] mb-2">
              Business Contact Number
            </label>
            <Input type="tel" value={formValues.businessContactNumber} className="w-full" />
          </div>

          <div>
            <label className="block font-semibold text-[#666666] mb-2">
              Licenses Number
            </label>
            <Input type="text" value={formValues.licensesNumber} className="w-full" />
          </div>

          <div>
            <label className="block font-semibold text-[#666666] mb-2">
              Business PAN Number
            </label>
            <Input type="text" value={formValues.businessPanNumber} className="w-full" />
          </div>

          <div>
            <label className="block font-semibold text-[#666666] mb-2">
              GST Number
            </label>
            <Input type="text" value={formValues.gstNumber} className="w-full" />
          </div>

          <div className="sm:col-span-2">
            <label className="block font-semibold text-[#666666] mb-2">
              Address of Factory Premises
            </label>
            <Input type="text" value={formValues.factoryAddress} className="w-full" />
          </div>

          <div>
            <label className="block font-semibold text-[#666666] mb-2">
              State
            </label>
            <Input type="text" value={formValues.state} className="w-full" />
          </div>

          <div>
            <label className="block font-semibold text-[#666666] mb-2">
              District
            </label>
            <Input type="text" value={formValues.district} className="w-full" />
          </div>

          <div>
            <label className="block font-semibold text-[#666666] mb-2">
              Pin Code
            </label>
            <Input type="text" value={formValues.pincode} className="w-full" />
          </div>

          <div>
            <label className="block font-semibold text-[#666666] mb-2">
              City
            </label>
            <Input type="text" value={formValues.city} className="w-full" />
          </div>
        </form>

        <div className="flex justify-start pt-10">
          <Button
            type="button"
            className="bg-[#FED36A] mb-5 text-white w-40 rounded-[20px]"
            onClick={onBack}
          >
            Back
          </Button>
        </div>
      </div>

      {status !== "Verify" && (
        <div className="pb-16 mt-10 sm:mx-10">
          <h3 className="text-center text-[#FEC84B] text-xl font-semibold mb-4">
            Comments
          </h3>

          <Textarea
            placeholder="Reason why the Application is Rejected or Resubmit"
            className="w-full h-28 border border-gray-300 rounded-md px-4 py-2 text-gray-700 resize-none"
          />

          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 mt-8">
            <Button
              type="button"
              className="bg-[#12B76A] hover:bg-green-600 text-white px-6 py-2 rounded-md flex items-center justify-center gap-2"
              onClick={()=> handleApproval("APPROVED")}
            >
              <img src={approveIcon} alt="Approve Icon" className="w-5 h-5" /> Approve
            </Button>

            <Button
              type="button"
              className="bg-[#FEC84B] hover:bg-yellow-500 text-white px-6 py-2 rounded-md flex items-center justify-center gap-2"
              onClick={()=> handleApproval("APPROVED")}
            >
              <img src={resubmitIcon} alt="Resubmit Icon" className="w-5 h-5" /> Resubmit
            </Button>

            <Button
              type="button"
              className="bg-[#F04438] hover:bg-red-600 text-white px-6 py-2 rounded-md flex items-center justify-center gap-2"
              onClick={()=> handleApproval("APPROVED")}
            >
              <img src={declineIcon} alt="Decline Icon" className="w-5 h-5" /> Decline
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default FactoryOwnershipIdentityForm;
