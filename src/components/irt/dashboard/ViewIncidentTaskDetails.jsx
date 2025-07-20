import React from "react";
import { Progress } from "@/components/ui/progress";

function ViewIncidentTaskDetails() {
  return (
    <div className="p-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b pb-6 mb-6">
        <div>
          <h1 className="text-xl font-semibold">Team Alpha</h1>
          <p className="text-sm text-gray-500 flex items-center">
            <span className="mr-1">📍</span> Kakinada, Andhra Pradesh
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mt-4 md:mt-0">
          <div>
            <p className="text-gray-400">Date</p>
            <p className="font-medium">20/05/2025</p>
          </div>
          <div> 
            <p className="text-gray-400">Sanjay Kumar</p>
            <p className="font-medium">In charge</p>
          </div>
          <div>
            <p className="text-gray-400">Total no of Members</p>
            <p className="font-medium">26</p>
          </div>
          <div>
            <p className="text-gray-400">Total no of Volunteers</p>
            <p className="font-medium">10</p>
          </div>
        </div>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-7 text-sm font-medium text-gray-500 py-2 border-b">
        <p className="col-span-2">Task Name</p>
        <p>Priority</p>
        <p>Progress</p>
        <p>Assigned By</p>
        <p>No. of Members</p>
        <p className="text-right">Location</p>
      </div>

      {/* Table Rows */}
      {[
        { name: "Food Distribution", priority: "P1 - 6 hrs", color: "bg-green-500", assignedBy: "Sanjay Kumar", members: "10", phone: "+91 420010101", location: "Kakinada, Ap" },
        { name: "Fire Safety Drill", priority: "P2 - 15 hrs", color: "bg-orange-400", assignedBy: "Sanjay Kumar", members: "08", phone: "+91 870010101", location: "Kakinada, Ap" },
        { name: "Ambulance Service", priority: "P3 - 18 hrs", color: "bg-red-500", assignedBy: "Sanjay Kumar", members: "05", phone: "+91 970010101", location: "Kakinada, Ap" },
        { name: "Medical Camps", priority: "P4 - 24 hrs", color: "bg-amber-400", assignedBy: "Sanjay Kumar", members: "03", phone: "+91 650010101", location: "Kakinada, Ap" },
      ].map((task, index) => (
        <div key={index} className="grid grid-cols-7 items-center text-sm py-4 border-b">
          <p className="col-span-2 font-semibold">{task.name}</p>
          <div className="flex items-center">
            <span className={`w-3 h-3 rounded-full mr-2 ${task.color}`}></span>
            <span className="text-xs font-medium px-2 py-0.5 rounded bg-opacity-20" style={{ backgroundColor: task.color }}>{task.priority}</span>
          </div>
          <div className="w-20">
            <Progress value={100} className="h-2" />
            <p className="text-xs text-right">100%</p>
          </div>
          <p>{task.assignedBy}</p>
          <p>{task.members}</p>
          <p className="text-right">{task.location}</p>
        </div>
      ))}
    </div>
  );
}

export default ViewIncidentTaskDetails;
