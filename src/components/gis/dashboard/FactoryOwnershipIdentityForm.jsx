import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea"
import approveIcon from "../../../assets/Icons/approve-icon.png"
import resubmitIcon from "../../../assets/Icons/resubmit-icon.png"
import declineIcon from "../../../assets/Icons/decline-icon.png"

function FactoryOwnershipIdentityForm({ onBack, status }) {
  return (
    <div className="ml-10 mt-10 max-w-6xl">

      {/* FactoryOwnership Identity Form */}
      <div className="mt-10 mx-10">
        <h2 className="text-[36px] font-semibold text-[#000000] mb-6">Factory Ownership Identity</h2>
        <form className="grid grid-cols-2 gap-6 gap-x-20">
          <div>
            <label className="block font-semibold text-[#666666] mb-2">Name of the person</label>
            <Input type="text" className="w-full border border-gray-300 rounded-md px-4 py-2" />
          </div>

          <div>
            <label className="block font-semibold text-[#666666] mb-2">Business Email ID</label>
            <Input type="email" className="w-full border border-gray-300 rounded-md px-4 py-2" />
          </div>

          <div>
            <label className="block font-semibold text-[#666666] mb-2">Contact number</label>
            <Input type="tel" className="w-full border border-gray-300 rounded-md px-4 py-2" />
          </div>

          <div>
            <label className="block font-semibold text-[#666666] mb-2">Business Contact Number</label>
            <Input type="tel" className="w-full border border-gray-300 rounded-md px-4 py-2" />
          </div>

          <div>
            <label className="block font-semibold text-[#666666] mb-2">Licenses Number</label>
            <Input type="text" className="w-full border border-gray-300 rounded-md px-4 py-2" />
          </div>

          <div>
            <label className="bblock font-semibold text-[#666666] mb-2">Business PAN Number</label>
            <Input type="text" className="w-full border border-gray-300 rounded-md px-4 py-2" />
          </div>

          <div>
            <label className="bblock font-semibold text-[#666666] mb-2">GST Number</label>
            <Input type="text" className="w-full border border-gray-300 rounded-md px-4 py-2" />
          </div>

          <div className="col-span-2">
            <label className="block font-semibold text-[#666666] mb-2">Address of Factory Premises</label>
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
        <div className="flex justify-start pt-10">
          <Button type="button" className="bg-[#FED36A] mb-5 text-white w-40 rounded-[20px]" onClick={onBack}>Back</Button>
        </div>
      </div>

      {status !== "Verify" && (
        <div class=" pb-15 mt-10 mx-10">
          <h3 className="text-center text-[#FEC84B] text-xl font-semibold mb-4">Comments</h3>

          <Textarea
            placeholder="Reason why the Application is Rejected or Resubmit"
            className="w-full h-28 border border-gray-300 rounded-md px-4 py-2 text-gray-700 resize-none"
          />

          <div className="flex justify-center gap-6 mt-8">
            <Button
              type="button"
              className="bg-[#12B76A] hover:bg-green-600 text-white px-6 py-2 rounded-md flex items-center gap-2"
            >
              <img src={approveIcon} alt="Approve Icon" className="w-5 h-5" /> Approve
            </Button>

            <Button
              type="button"
              className="bg-[#FEC84B] hover:bg-yellow-500 text-white px-6 py-2 rounded-md flex items-center gap-2"
            >
              <img src={resubmitIcon} alt="Resubmit Icon" className="w-5 h-5" /> Resubmit
            </Button>

            <Button
              type="button"
              className="bg-[#F04438] hover:bg-red-600 text-white px-6 py-2 rounded-md flex items-center gap-2"
            >
              <img src={declineIcon} alt="Decline Icon" className="w-5 h-5" /> Decline
            </Button>
          </div>
        </div>
      )

      }

    </div>
  );
}

export default FactoryOwnershipIdentityForm;
