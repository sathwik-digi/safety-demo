import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function OwnershipIdentityForm({ onNext }) {
  return (
    <div className="ml-10 mt-10 max-w-6xl">
      {/* Ownership Identity Form */}
      <div className="mt-10 mx-10">
        <h2 className="text-[36px] font-semibold text-[#000000] mb-6">Ownership Identity</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onNext(); // move to next form step
          }}
          className="grid grid-cols-2 gap-6 gap-x-20">
          <div>
            <label className="block font-semibold text-[#666666] mb-2">Name of the person</label>
            <Input type="text" className="w-full border border-gray-300 rounded-md px-4 py-2" />
          </div>

          <div>
            <label className="block font-semibold text-[#666666] mb-2">Email ID</label>
            <Input type="email" className="w-full border border-gray-300 rounded-md px-4 py-2" />
          </div>

          <div>
            <label className="block font-semibold text-[#666666] mb-2">Contact number</label>
            <Input type="tel" className="w-full border border-gray-300 rounded-md px-4 py-2" />
          </div>

          <div>
            <label className="block font-semibold text-[#666666] mb-2">Alternative Contact Number</label>
            <Input type="tel" className="w-full border border-gray-300 rounded-md px-4 py-2" />
          </div>

          <div>
            <label className="block font-semibold text-[#666666] mb-2">Aadhaar Number</label>
            <Input type="text" className="w-full border border-gray-300 rounded-md px-4 py-2" />
          </div>

          <div>
            <label className="bblock font-semibold text-[#666666] mb-2">PAN Number</label>
            <Input type="text" className="w-full border border-gray-300 rounded-md px-4 py-2" />
          </div>

          <div className="col-span-2">
            <label className="block font-semibold text-[#666666] mb-2">Permanent Address</label>
            <Input type="text" className="w-full border border-gray-300 rounded-md px-4 py-2" />
          </div>

          <div>
            <label className="block font-semibold text-[#666666] mb-2">State</label>
            <Input type="text" className="w-full border border-gray-300 rounded-md px-4 py-2" />
          </div>

          <div>
            <label className="block font-semibold text-[#666666] mb-2">District</label>
            <Input type="text" className="w-full border border-gray-300 rounded-md px-4 py-2" />
          </div>

          <div>
            <label className="block font-semibold text-[#666666] mb-2">Pin Code</label>
            <Input type="text" className="w-full border border-gray-300 rounded-md px-4 py-2" />
          </div>

          <div>
            <label className="block font-semibold text-[#666666] mb-2">City</label>
            <Input type="text" className="w-full border border-gray-300 rounded-md px-4 py-2" />
          </div>
        </form>
        <div className="flex justify-end pt-10">
          <Button type="button" className="bg-[#FED36A] mb-5 text-white w-40 rounded-[20px]" onClick={onNext}>Next</Button>
        </div>
      </div>
    </div>
  );
}

export default OwnershipIdentityForm;
