import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import incidentMap from "../../../assets/Images/layout-approval.png";
import locationIcon from "../../../assets/Icons/google_maps-icon.png";
import { irtDashboardData } from "../../../constants";
import searchIcon from "../../../assets/Icons/search-icon.png";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function DashboardPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const isDashboard = location.pathname === "/irt/dashboard";
  const isViewIncident = location.pathname === "/irt/viewincident";
  const isViewIncidentTaskDetails = location.pathname === "/irt/viewincidenttaskdetails";

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="p-4 md:p-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {irtDashboardData.map((item, index) => (
          <div
            key={index}
            className="border rounded-xl shadow-md p-4 text-center"
          >
            <p className="text-gray-500 text-sm">{item.label}</p>
            <p className="text-2xl font-semibold text-black">{item.value}</p>
          </div>
        ))}
      </div>

      {/* Search & Buttons */}
      <div className="border-y py-4">
        <div className="px-4 md:px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Left Section - Search + Filters */}
          <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-[70%]">
            {/* Search Input */}
            <div className="relative w-full md:w-[40%]">
              <Input
                type="text"
                placeholder="Search any Incident or Location"
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
              <PlusCircle className="w-4 h-4 mr-2" /> Add Incident
            </Button>
            <Button className="bg-yellow-400 text-white hover:bg-yellow-500 w-full sm:w-auto">
              <PlusCircle className="w-4 h-4 mr-2" /> Add Task
            </Button>
          </div>
        </div>
      </div>

      {/* Incident Name, Date, IRT */}
      {!(isDashboard || isViewIncident || isViewIncidentTaskDetails) && (
      <div className="px-4 md:px-6 py-4 flex flex-col md:flex-row items-center gap-[70px] ">
        {/* Incident Name */}
        <div className="w-full md:w-[50%] pl-6">
          <label className="mb-3 block">Incident Name</label>
          <Input
            type="text"
            placeholder="Type"
            className="border border-gray-300 rounded-lg px-4 py-6"
          />
        </div>

        {/* Date */}
        <div className="w-full md:w-[20%]">
          <label className="mb-3 block">Date</label>
          {/* <span>From</span><span>To</span> */}
          <Input
            type="date"
            className="border border-gray-300 rounded-lg px-4 py-2 text-muted-foreground"
          />
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

      {/* Location Input + Map + Footer */}
      {!(isViewIncident || isViewIncidentTaskDetails) && (
      <div className="px-4 md:px-6 pb-8 space-y-4">
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
        <div className="text-sm text-gray-600">
          Flood Crises, Bengaluru, 22:30 pm / 10-5-2025
        </div>
      </div>
      )}
    </div>
  );
}

export default DashboardPage;
