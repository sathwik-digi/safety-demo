import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DashboardPage from "./DashboardPage";

function AddIncident() {
  const navigate = useNavigate();
  const dropdownItems = ["Option 1", "Option 2", "Option 3"];

  const fields = [
    "Responsible Officer", "Incident Commander", "Nodal Officer", "Information & Media Officer",
    "District", "Mandal", "Village", "Devices",
    "ICP", "Incident Base", "Camp", "Relief Camp",
    "Staging Area", "Medical Camp", "Heli Base", "Heli Pad"
  ];
  const textareaFields = ["Brief of Situation", "Comment Box"];
  const dashboardFields = ["Incident Name", "From Date", "To Date"];

  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const handleDropdownChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: "" }));
  };

  const handleTextareaChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    [...fields, ...textareaFields, ...dashboardFields].forEach(field => {
      if (!formData[field]) {
        newErrors[field] = "This field is required";
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const renderDropdown = (field, placeholder) => (
    <div>
      <Select onValueChange={(val) => handleDropdownChange(field, val)}>
        <SelectTrigger className={`w-full min-w-[180px] ${errors[field] ? "border-red-500" : ""}`}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {dropdownItems.map((item, idx) => (
            <SelectItem key={idx} value={item}>{item}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      {errors[field] && <p className="text-red-500 text-sm mt-1">{errors[field]}</p>}
    </div>
  );

  return (
    <div className="space-y-8 text-[#1F2937]">
      <DashboardPage
        formData={formData}
        setFormData={setFormData}
        errors={errors}
        setErrors={setErrors} />
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-6 space-y-8 text-[#1F2937]">

        {/* Designation IRT */}
        <div className="space-y-4 border-b pb-6">
          <h2 className="font-semibold text-lg">Designation IRT</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {fields.slice(0, 4).map(field => (
              <div key={field}>
                <label className="block mb-1">{field}</label>
                {renderDropdown(field, field)}
              </div>
            ))}
          </div>
        </div>

        {/* Current Situation */}
        <div className="space-y-4 border-b pb-6">
          <h2 className="font-semibold text-lg">Current Situation</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {fields.slice(4, 8).map(field => (
              <div key={field}>
                <label className="block mb-1">{field}</label>
                {renderDropdown(field, field)}
              </div>
            ))}
          </div>
        </div>

        {/* Brief of Situation */}
        <div className="space-y-2 border-b pb-6">
          <h2 className="font-semibold text-lg">Brief of Situation</h2>
          <Textarea
            className={`w-full min-h-[100px] ${errors["Brief of Situation"] ? "border-red-500" : ""}`}
            placeholder="Brief"
            value={formData["Brief of Situation"] || ""}
            onChange={(e) => handleTextareaChange("Brief of Situation", e.target.value)}
          />
          {errors["Brief of Situation"] && (
            <p className="text-red-500 text-sm mt-1">{errors["Brief of Situation"]}</p>
          )}
        </div>

        {/* Comment Box */}
        <div className="space-y-2 border-b pb-6">
          <h2 className="font-semibold text-lg">Comment Box</h2>
          <Textarea
            className={`w-full min-h-[100px] ${errors["Comment Box"] ? "border-red-500" : ""}`}
            placeholder="Comments"
            value={formData["Comment Box"] || ""}
            onChange={(e) => handleTextareaChange("Comment Box", e.target.value)}
          />
          {errors["Comment Box"] && (
            <p className="text-red-500 text-sm mt-1">{errors["Comment Box"]}</p>
          )}
        </div>

        {/* Locations */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {fields.slice(8).map(field => (
              <div key={field}>
                <label className="block mb-1">{field}</label>
                {renderDropdown(field, field)}
              </div>
            ))}
          </div>
        </div>

        {/* Create Button */}
        <div className="pt-6 text-center">
          <Button
            className="bg-[#FFD569] text-white hover:bg-[#f2c94c] text-base px-6 py-2 rounded-md w-full sm:w-auto"
            onClick={() => {
              if (validateForm()) navigate("/irt/viewincident");
            }}
          >
            Create
          </Button>
        </div>

      </div>
    </div>
  );
}

export default AddIncident;
