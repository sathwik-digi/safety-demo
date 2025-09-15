import React, { useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import locationIcon from "../../../assets/Icons/google_maps-icon.png";
import { Progress } from "@/components/ui/progress";
import DashboardPage from "./DashboardPage";
// import {teams} from "../../../constants"
import { networkHandler } from "../../../https/networkHandler"

function ViewIncident() {
  const navigate = useNavigate();
  const [incidents, setIncidents] = useState([]);

  const getBorderColor = (color) => {
    return {
      green: "border-green-500",
      orange: "border-orange-400",
      amber: "border-amber-400",
      red: "border-red-400",
    }[color];
  };

  const getButtonColor = (color) => {
    return {
      green: "text-green-600 border-green-600 hover:bg-green-100",
      orange: "text-orange-500 border-orange-400 hover:bg-orange-100",
      amber: "text-amber-500 border-amber-400 hover:bg-amber-100",
      red: "text-red-500 border-red-400 hover:bg-red-100",
    }[color];
  };

  useEffect(() => {
    const getAllIncidents = async () => {
      try {
        const res = await networkHandler.get('irt','/incident/getAllIncidents');
        if (res?.length) {
          setIncidents(res);
        }
      } catch (error) {
        console.error("Error fetching incidents:", error);
      }
    };
    getAllIncidents();
  }, []);

  return (
    <div className="space-y-6 text-[#1F2937]">
      <DashboardPage />

      <div className="px-4 sm:px-6 md:px-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {incidents.map((incident, index) => (
          <div
            key={index}
            className={`border rounded-xl p-4 shadow-sm bg-white border-green-500`}
          >
            {/* Team Title */}
            <h2 className="font-semibold text-lg mb-1">{incident.name}</h2>

            {/* Location */}
            <div className="flex items-center text-sm text-gray-500 mb-2">
              <img src={locationIcon} alt="Location" className="w-4 h-4 mr-1" />
               {incident.location}
            </div>

            {/* In-Charge */}
            <p className="text-gray-700 font-medium">Sanjay Kumar</p>
            <p className="text-gray-400 text-sm">In charge</p>

            {/* Members */}
            <p className="text-gray-400 text-sm mt-2">No. of Members</p>
            <p className="text-black font-semibold">08</p>

            {/* Progress */}
            <div className="my-3">
              <Progress value={(7 / 10) * 100} />
              <p className="text-xs text-right text-gray-500 mt-1">
                7/10
              </p>
            </div>

            {/* View Task Button */}
            <Button
              className={`w-full py-2 rounded-md mt-2 border text-sm font-medium bg-white text-[#DEAD31] border-[#DEAD31] hover:bg-[#FFF8E1]`}
              onClick={() => navigate("/irt/viewincidenttaskdetails")}
            >
              View Tasks
            </Button>

            {/* Generate Report Button */}
            <Button className="w-full py-2 mt-2 border border-black rounded-md text-sm font-medium bg-white hover:bg-gray-100">
              Generate Report
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewIncident;
