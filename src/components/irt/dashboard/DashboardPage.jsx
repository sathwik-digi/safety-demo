import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import incidentMap from "../../../assets/Images/layout-approval.png";
import locationIcon from "../../../assets/Icons/google_maps-icon.png";
import { irtDashboardData } from "../../../constants";
import searchIcon from "../../../assets/Icons/search-icon.png";
import plusIcon from "../../../assets/Icons/plus-icon.png";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function DashboardPage({ formData, setFormData, errors, setErrors }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isDashboard = location.pathname === "/irt/dashboard";
  const isViewIncident = location.pathname === "/irt/viewincident";
  const isViewIncidentTaskDetails = location.pathname === "/irt/viewincidenttaskdetails";

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: "" }));
  };

  useEffect(()=>{
    if(formData){
      if(Object.keys(formData).includes("From Date") && Object.keys(formData).includes("To Date")){
        if(formData["From Date"]> formData["To Date"]){
          setFormData(prev => {
            const updated = { ...prev };
            delete updated["From Date"];
            delete updated["To Date"];
            return updated;
          });
        }
      }
    }
  },[formData])

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="p-4 md:p-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {irtDashboardData.map((item, index) => (
          <div
            key={index}
            className="border rounded-xl shadow-md p-4 text-center"
          >
            <p className=" font-medium text-[12px] text-[#000000] text-sm">{item.label}</p>
            <p className="text-[24px] font-medium text-black">{item.value}</p>
          </div>
        ))}
      </div>

      {/* Search & Buttons */}
      <div className="border-y py-4">
        <div className="px-4 md:px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Left Section - Search + Filters */}
          <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-[70%]">
            {/* Search Input */}
            <div className="relative w-full md:w-[60%]">
              <Input
                type="text"
                placeholder="Search"
                className="pl-10 border border-gray-300 rounded-lg"
              />
              <img
                src={searchIcon}
                alt="search location"
                className="absolute left-3 top-2.5 w-4 h-4 opacity-60"
              />
            </div>

            {/* Dropdown Filters */}
            {!isDashboard && (
              <div className="flex flex-col sm:flex-row gap-[16px] md:gap-[30px] md:pl-[50px] w-full md:w-auto">
                {/* District */}
                <Select>
                  <SelectTrigger className="w-full sm:w-[120px] border-gray-300 rounded-lg">
                    <SelectValue placeholder="District" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="east">East</SelectItem>
                    <SelectItem value="west">West</SelectItem>
                    <SelectItem value="north">North</SelectItem>
                    <SelectItem value="south">South</SelectItem>
                  </SelectContent>
                </Select>

                {/* Position */}
                <Select>
                  <SelectTrigger className="w-full sm:w-[120px] border-gray-300 rounded-lg">
                    <SelectValue placeholder="Position" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="engineer">Engineer</SelectItem>
                    <SelectItem value="inspector">Inspector</SelectItem>
                  </SelectContent>
                </Select>

                {/* Department */}
                <Select>
                  <SelectTrigger className="w-full sm:w-[130px] border-gray-300 rounded-lg">
                    <SelectValue placeholder="Department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="safety">Safety</SelectItem>
                    <SelectItem value="operations">Operations</SelectItem>
                    <SelectItem value="hr">HR</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>


          {/* Right Section - Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <Button
              className="bg-yellow-400 text-white hover:bg-yellow-500 w-full sm:w-auto"
              onClick={() => navigate("/irt/addincident")}
            >
              <img src={plusIcon} alt="plus" className="w-3 h-3 mr-1" /> Add Incident
            </Button>
            <Button className="bg-yellow-400 text-white hover:bg-yellow-500 w-full sm:w-auto">
              <img src={plusIcon} alt="plus" className="w-3 h-3 mr-1" /> Add Task
            </Button>
          </div>
        </div>
      </div>

      {/* Incident Name, Date */}
      {!(isDashboard || isViewIncident || isViewIncidentTaskDetails) && (
        <div className="px-4 md:px-6 py-4 flex flex-col md:flex-row items-center gap-[70px]">
          {/* Incident Name */}
          <div className="w-full md:w-[50%] pl-6">
            <label className="mb-3 block font-semibold text-[20px] text-[#666666]">Incident Name</label>
            <Input
              type="text"
              placeholder="Type"
              value={formData["Incident Name"] || ""}
              onChange={(e) => handleInputChange("Incident Name", e.target.value)}
              className={`border rounded-lg px-4 py-6 ${errors["Incident Name"] ? "border-red-500" : "border-gray-300"
                }`}
            />
            {errors["Incident Name"] && (
              <p className="text-red-500 text-sm mt-1">{errors["Incident Name"]}</p>
            )}
          </div>

          {/* From + To Date */}
          <div className="w-full md:w-[20%]">
            <label className="mb-3 block font-normal text-[20px] text-[#31373D]">Date</label>
            <div className="flex items-center gap-4">
                {["From Date", "To Date"].map(label => (
                  <div key={label} className="flex flex-col w-full">
                    <span>{label === "From Date" ? "From" : "To"}</span>
                    <Input
                      type="date"
                      value={formData[label] || ""}
                      onChange={(e) => handleInputChange(label, e.target.value)}
                      min={label==="To Date" && Object.keys(formData).includes("From Date")? formData["From Date"]:""}
                      max={new Date().toISOString().split("T")[0]}
                      className={`border rounded-lg px-4 py-2 text-muted-foreground ${errors[label] ? "border-red-500" : "border-gray-300"
                        }`}
                    />
                    {errors[label] && (
                      <p className="text-red-500 text-sm mt-1">{errors[label]}</p>
                    )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* IRT Button - Separate Row */}
      {!(isDashboard || isViewIncident || isViewIncidentTaskDetails) && (
        <div className="px-4 md:px-6 py-4 flex justify-center border-b">
          <Button className="bg-yellow-400 text-white hover:bg-yellow-500 rounded-lg px-6 py-2 font-medium">
            IRT
          </Button>
        </div>
      )}

      {!(isDashboard || isViewIncident || isViewIncidentTaskDetails) && (
        <div className="px-4 md:px-6 text-[#666666] font-semibold text-[20px]">Map Sketch</div>
      )}

      {/* Location Input + Map + Footer */}
      {!(isViewIncident || isViewIncidentTaskDetails) && (
        <div className="px-4 md:px-6 pb-8 space-y-4 mr-[40px] ml-[40px]">
          {/* Location Input */}
          <div className="relative w-full md:w-[40%]">
            <Input
              type="text"
              placeholder="Search Location"
              className="pl-10 border border-gray-300 rounded-lg"
            />
            <img
              src={locationIcon}
              alt="Location"
              className="absolute left-3 top-2.5 w-3.5 h-5"
            />
          </div>

          {/* Map Section */}
          <div className="w-full border rounded-lg overflow-hidden">
            <img
              src={incidentMap}
              alt="Map"
              className="w-full h-[250px] sm:h-[350px] md:h-[400px] object-cover"
            />
          </div>

          {/* Footer Text */}
          {isDashboard && (
          <div className="text-sm text-gray-600">
            Flood Crises, Bengaluru, 22:30 pm / 10-5-2025
          </div>
          )}
        </div>
      )}
    </div>
  );
}

export default DashboardPage;
