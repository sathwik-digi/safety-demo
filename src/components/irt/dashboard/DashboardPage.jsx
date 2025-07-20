import React from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Import, MapPin, PlusCircle } from "lucide-react";
import incidentMap from "../../../assets/Images/layout-approval.png"
import locationIcon from "../../../assets/Icons/google_maps-icon.png"
import { irtDashboardData } from "../../../constants";
import searchIcon from "../../../assets/Icons/search-icon.png"

function DashboardPage() {
   const navigate = useNavigate();
  return (
    <div className=" space-y-6">
      {/* Stats Cards */}
      <div className="p-6 grid grid-cols-7 gap-4">
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

      {/* Search & Buttons with top/bottom border */}
      <div className="border-y py-4">
        <div className="px-6 flex flex-col md:flex-row justify-between items-center gap-4">
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

          {/* Buttons */}
          <div className="flex gap-4">
            <Button className="bg-yellow-400 text-[#FFFFFF] hover:bg-yellow-500" onClick={()=>navigate('/irt/addincident')}>
              <PlusCircle className="w-4 h-4 mr-2" /> Add Incident
            </Button>
            <Button className="bg-yellow-400 text-[#FFFFFF] hover:bg-yellow-500">
              <PlusCircle className="w-4 h-4 mr-2" /> Add Task
            </Button>
          </div>
        </div>
      </div>

      {/* Location Input, Map & Footer - Shifted Right */}
      <div className="p-6 ml-10 space-y-4">
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
        <div className="w-[95%] border rounded-lg overflow-hidden">
          <img
            src={incidentMap}
            alt="Map"
            className="w-full h-[400px] object-cover"
          />
        </div>

        {/* Footer Incident Info */}
        <div className="text-sm text-gray-600 pl-1">
          Flood Crises, Bengaluru, 22:30 pm / 10-5-2025
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
