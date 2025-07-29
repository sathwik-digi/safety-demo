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
import { networkHandler } from "../../../https/networkHandler"

function AddIncident() {
  const navigate = useNavigate();

  const fields = [
    "Responsible Officer", "Incident Commander", "Nodal Officer", "Information & Media Officer",
    "District", "Mandal", "Village", "Devices",
    "ICP", "Incident Base", "Camp", "Relief Camp",
    "Staging Area", "Medical Camp", "Heli Base", "Heli Pad"
  ];
  const textareaFields = ["Brief of Situation", "Comment Box"];
  const dashboardFields = ["Incident Name", "From Date", "To Date"];

  const dropdownItemsByField = {
    "Responsible Officer": Array.from({ length: 9 }, (_, i) => `USR00${i + 1}`),
    "Incident Commander": Array.from({ length: 9 }, (_, i) => `USR00${i + 1}`),
    "Nodal Officer": Array.from({ length: 9 }, (_, i) => `USR00${i + 1}`),
    "Information & Media Officer": Array.from({ length: 9 }, (_, i) => `USR00${i + 1}`),

    "District": ["Central", "North Zone", "Coastal Region"],
    "Mandal": ["Main Mandal", "Greenfield Mandal", "Hilltop Mandal"],
    "Village": ["Riverbank", "Stonebridge", "Sunnyvale"],
    "Devices": ["Drones", "Radios", "Rescue Boats"],

    "ICP": Array.from({ length: 5 }, (_, i) => `ICP-00${i + 1}`),
    "Incident Base": Array.from({ length: 26 }, (_, i) => `Base Camp ${String.fromCharCode(65 + i)}`),
    "Camp": Array.from({ length: 26 }, (_, i) => `Camp ${String.fromCharCode(65 + i)}`),
    "Relief Camp": Array.from({ length: 26 }, (_, i) => `Relief Camp ${String.fromCharCode(65 + i)}`),
    "Staging Area": Array.from({ length: 26 }, (_, i) => `Staging Area ${String.fromCharCode(65 + i)}`),
    "Medical Camp": Array.from({ length: 26 }, (_, i) => `Medical Camp ${String.fromCharCode(65 + i)}`),
    "Heli Base": Array.from({ length: 26 }, (_, i) => `Heli Base ${String.fromCharCode(65 + i)}`),
    "Heli Pad": Array.from({ length: 26 }, (_, i) => `Heli Pad ${String.fromCharCode(65 + i)}`),
  };

  const defaultItems = ["Option 1", "Option 2", "Option 3"];
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

  const renderDropdown = (field, placeholder) => {
    const items = dropdownItemsByField[field] || defaultItems;
    return (
      <div>
        <Select onValueChange={(val) => handleDropdownChange(field, val)}>
          <SelectTrigger className={`w-full min-w-[180px] ${errors[field] ? "border-red-500" : ""}`}>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {items.map((item, idx) => (
              <SelectItem key={idx} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors[field] && <p className="text-red-500 text-sm mt-1">{errors[field]}</p>}
      </div>
    );
  };


const handleCreateIncident = async () => {
  if (!validateForm()) return;

  const payload = {
    name: formData["Incident Name"],
    fromDate: formData["From Date"],
    toDate: formData["To Date"],
    responsibleOfficer: formData["Responsible Officer"],
    incidentCommander: formData["Incident Commander"],
    nodalOfficer: formData["Nodal Officer"],
    infoMediaOfficer: formData["Information & Media Officer"],
    district: formData["District"],
    mandal: formData["Mandal"],
    village: formData["Village"],
    devices: formData["Devices"],
    brief: formData["Brief of Situation"],
    comments: formData["Comment Box"],
    icp: formData["ICP"],
    incidentBase: formData["Incident Base"],
    camp: formData["Camp"],
    reliefCamp: formData["Relief Camp"],
    stagingArea: formData["Staging Area"],
    medialCamp: formData["Medical Camp"],
    heliBase: formData["Heli Base"],
    heliPad: formData["Heli Pad"],
    location: "Downtown District",
    locationLink: "https://maps.example.com/location/123",
    searchLocation: "Downtown",
    inCharge: "USR001",
    createdBy: "USR002",
    active: true,
    status: "Ongoing",
  };

  try {
    const result = await networkHandler.post("/v1/incident/addIncident", payload);
    console.log("Incident created successfully", result);
    navigate("/irt/viewincident");
  } catch (err) {
    console.error("Error creating incident", err);
  }
};

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
            onClick={handleCreateIncident}
          >
            Create
          </Button>
        </div>

      </div>
    </div>
  );
}

export default AddIncident;
