import React from "react";
import onesubseaLogo from "../../assets/Images/onesubsea_logo.png";
import locationIcon from "../../assets/Icons/google_maps-icon.png";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function FactoryOwnershipIdentityForm({ onBack }) {
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

      {/* Ownership Identity Form */}
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

      <div className="pt-16">
  <h3 className="text-center text-[#FEC84B] text-xl font-semibold mb-4">Comments</h3>
  
  <textarea
    placeholder="Reason why the Application is Rejected or Resubmit"
    className="w-full h-28 border border-gray-300 rounded-md px-4 py-2 text-gray-700 resize-none"
  />

  <div className="flex justify-center gap-6 mt-8">
    <Button
      type="button"
      className="bg-[#12B76A] hover:bg-green-600 text-white px-6 py-2 rounded-md flex items-center gap-2"
    >
      <span>✔️</span> Approve
    </Button>

    <Button
      type="button"
      className="bg-[#FEC84B] hover:bg-yellow-500 text-white px-6 py-2 rounded-md flex items-center gap-2"
    >
      <span>🔁</span> Resubmit
    </Button>

    <Button
      type="button"
      className="bg-[#F04438] hover:bg-red-600 text-white px-6 py-2 rounded-md flex items-center gap-2"
    >
      <span>❌</span> Decline
    </Button>
  </div>
</div>

    </div>
  );
}

export default FactoryOwnershipIdentityForm;
