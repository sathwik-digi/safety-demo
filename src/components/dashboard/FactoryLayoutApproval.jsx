import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea"
import approveIcon from "../../assets/Icons/approve-icon.png"
import resubmitIcon from "../../assets/Icons/resubmit-icon.png"
import layoutApproval from "../../assets/Images/layout-approval.png"

function FactoryLayoutApproval() {
  return (
    <div className="ml-10 mt-10 pb-16 max-w-6xl">
      <div className="mt-10 mx-10">
        <img
          src={layoutApproval}
          alt="Factory Layout Approval"
          className="w-full h-auto rounded-md border border-gray-300"
        />
      </div>
      <div class=" pb-15 mt-10 mx-10">
        <h3 className="text-center text-[#FEC84B] text-xl font-semibold mb-4">Comments</h3>

        <Textarea
          placeholder="Reason why to Resubmit to add necessary changes in the bookmarks or Layout"
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
        </div>
      </div>

    </div>
  );
}

export default FactoryLayoutApproval;
