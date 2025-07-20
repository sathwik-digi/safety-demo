import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

function AddIncident() {
  const navigate = useNavigate();
  const dropdownItems = ["Option 1", "Option 2", "Option 3"];

  const renderDropdown = (placeholder = "Dropdown option") => (
    <Select>
      <SelectTrigger className="w-full min-w-[180px]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {dropdownItems.map((item, index) => (
          <SelectItem key={index} value={item}>{item}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  );

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8 text-[#1F2937]">
      {/* Designation IRT */}
      <div className="space-y-4 border-b pb-6" >
        <h2 className="font-semibold text-lg">Designation IRT</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block mb-1">Responsible Officer</label>
            {renderDropdown()}
          </div>
          <div>
            <label className="block mb-1">Incident Commander</label>
            {renderDropdown()}
          </div>
          <div>
            <label className="block mb-1">Nodal Officer</label>
            {renderDropdown()}
          </div>
          <div>
            <label className="block mb-1">Information & Media Officer</label>
            {renderDropdown()}
          </div>
        </div>
      </div>

      {/* Current Situation */}

      <div className="space-y-4 border-b pb-6">
        <h2 className="font-semibold text-lg">Current Situation</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block mb-1">District</label>
            {renderDropdown()}
          </div>
          <div>
            <label className="block mb-1">Mandal</label>
            {renderDropdown()}
          </div>
          <div>
            <label className="block mb-1">Village</label>
            {renderDropdown()}
          </div>
          <div>
            <label className="block mb-1">Devices</label>
            {renderDropdown()}
          </div>
        </div>
      </div>

      {/* Brief of Situation */}
      <div className="space-y-2 border-b pb-6">
        <h2 className="font-semibold text-lg">Brief of Situation</h2>
        <Textarea placeholder="Brief" className="w-[87%] min-h-[100px] ml-19" />
      </div>

      {/* Comment Box */}
      <div className="space-y-2 border-b pb-6">
        <h2 className="font-semibold text-lg">Comment Box</h2>
        <Textarea placeholder="Comments" className="w-[87%] min-h-[100px] ml-19" />
      </div>

      {/* Locations */}
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block mb-1">ICP</label>
            {renderDropdown()}
          </div>
          <div>
            <label className="block mb-1">Incident Base</label>
            {renderDropdown()}
          </div>
          <div>
            <label className="block mb-1">Camp</label>
            {renderDropdown()}
          </div>
          <div>
            <label className="block mb-1">Relief Camp</label>
            {renderDropdown()}
          </div>
          <div>
            <label className="block mb-1">Staging area</label>
            {renderDropdown()}
          </div>
          <div>
            <label className="block mb-1">Medical Camp</label>
            {renderDropdown()}
          </div>
          <div>
            <label className="block mb-1">Heli Base</label>
            {renderDropdown()}
          </div>
          <div>
            <label className="block mb-1">Heli Pad</label>
            {renderDropdown()}
          </div>
        </div>
      </div>

      {/* Create Button */}
      <div className="pt-6 text-center">
        <Button className="bg-[#FFD569] text-white hover:bg-[#f2c94c] text-base px-6 py-2 rounded-md shadow-none" onClick={()=>navigate('/irt/viewincident')}>
          Create
        </Button>
      </div>
    </div>
  );
}

export default AddIncident;
