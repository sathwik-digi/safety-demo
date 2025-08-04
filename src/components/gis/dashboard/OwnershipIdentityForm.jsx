import React,{ useState,useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function OwnershipIdentityForm({ onNext, factoryData }) {
   const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    contactNumber: "",
    alternativeContactNumber: "",
    aadhaarNumber: "",
    panNumber: "",
    factoryAddress: "",
    state: "",
    district: "",
    pincode: "",
    city: "",
  });

  useEffect(() => {
    if (factoryData && factoryData.length > 0) {
      const factory = factoryData[0];
      setFormValues({
        name: "Sanjay Kuma",
        email: factory.email || "sanjay@email.com",
        contactNumber: factory.contactNumber || "9999999999",
        alternativeContactNumber: "9999999098", 
        aadhaarNumber: "1234 5678 9012", 
        panNumber: factory.panNumber || "DUMMYPAN123",
        factoryAddress: factory.factoryAddress || "Dummy Address",
        state: factory.state || "Dummy State",
        district: factory.district || "Dummy District",
        pincode: factory.pincode || "000000",
        city: factory.city || "Dummy City",
      });
    }
  }, [factoryData]);

   const handleChange = (e) => {
    setFormValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="px-4 py-8 max-w-6xl mx-auto">
      <h2 className="text-[28px] md:text-[36px] font-semibold text-[#000000] mb-6">
        Ownership Identity
      </h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onNext(); 
        }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-x-20"
      >
        <div>
          <label className="block font-semibold text-[#666666] mb-2">
            Name of the person
          </label>
          <Input type="text" value={formValues.name} onChange={handleChange} className="w-full" />
        </div>

        <div>
          <label className="block font-semibold text-[#666666] mb-2">
            Email ID
          </label>
          <Input type="email" value={formValues.email} onChange={handleChange} className="w-full" />
        </div>

        <div>
          <label className="block font-semibold text-[#666666] mb-2">
            Contact number
          </label>
          <Input type="tel" value={formValues.contactNumber} onChange={handleChange} className="w-full" />
        </div>

        <div>
          <label className="block font-semibold text-[#666666] mb-2">
            Alternative Contact Number
          </label>
          <Input type="tel" value={formValues.alternativeContactNumber} onChange={handleChange} className="w-full" />
        </div>

        <div>
          <label className="block font-semibold text-[#666666] mb-2">
            Aadhaar Number
          </label>
          <Input type="text" value={formValues.aadhaarNumber} onChange={handleChange} className="w-full" />
        </div>

        <div>
          <label className="block font-semibold text-[#666666] mb-2">
            PAN Number
          </label>
          <Input type="text" value={formValues.panNumber} onChange={handleChange} className="w-full" />
        </div>

        <div className="md:col-span-2">
          <label className="block font-semibold text-[#666666] mb-2">
            Permanent Address
          </label>
          <Input type="text" value={formValues.factoryAddress} onChange={handleChange} className="w-full" />
        </div>

        <div>
          <label className="block font-semibold text-[#666666] mb-2">
            State
          </label>
          <Input type="text" value={formValues.state} onChange={handleChange} className="w-full" />
        </div>

        <div>
          <label className="block font-semibold text-[#666666] mb-2">
            District
          </label>
          <Input type="text" value={formValues.district} onChange={handleChange} className="w-full" />
        </div>

        <div>
          <label className="block font-semibold text-[#666666] mb-2">
            Pin Code
          </label>
          <Input type="text" value={formValues.pincode} onChange={handleChange} className="w-full" />
        </div>

        <div>
          <label className="block font-semibold text-[#666666] mb-2">
            City
          </label>
          <Input type="text" value={formValues.city} onChange={handleChange} className="w-full" />
        </div>
      </form>

      <div className="flex justify-end pt-10">
        <Button
          type="button"
          className="bg-[#FED36A] text-white w-full md:w-40 rounded-[20px]"
          onClick={onNext}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

export default OwnershipIdentityForm;
