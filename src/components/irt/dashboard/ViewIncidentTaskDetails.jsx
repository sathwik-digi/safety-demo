import React from "react";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DashboardPage from "./DashboardPage";

function ViewIncidentTaskDetails() {
  const tasks = [
    {
      name: "Food Distribution",
      priority: "P1 - 6 hrs",
      color: "bg-green-500",
      assignedBy: "Sanjay Kumar",
      members: "10",
      location: "Kakinada, Ap",
    },
    {
      name: "Fire Safety Drill",
      priority: "P2 - 15 hrs",
      color: "bg-orange-400",
      assignedBy: "Sanjay Kumar",
      members: "08",
      location: "Kakinada, Ap",
    },
    {
      name: "Ambulance Service",
      priority: "P3 - 18 hrs",
      color: "bg-red-500",
      assignedBy: "Sanjay Kumar",
      members: "05",
      location: "Kakinada, Ap",
    },
    {
      name: "Medical Camps",
      priority: "P4 - 24 hrs",
      color: "bg-amber-400",
      assignedBy: "Sanjay Kumar",
      members: "03",
      location: "Kakinada, Ap",
    },
  ];
  return (
    <div className="space-y-8 text-[#1F2937]">
      <DashboardPage />

      <div className="p-4 md:p-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center pb-6 mb-6 gap-4">
          <div  className="mr-[10rem]">
            <h1 className="text-[20px] text-[#000000] font-semibold">Team Alpha</h1>
            <p className="text-[#454B54] font-medium text-[12px] flex items-center">
              <span className="mr-1">📍</span> Kakinada, Andhra Pradesh
            </p>
          </div>
          <div className="grid grid-cols-2 gap-10 md:grid-cols-4 text-sm text-gray-600 w-full md:w-auto">
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

        {/* Table */} 
        <div className="overflow-x-auto">
      <Table className="min-w-[800px]">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Task Name</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Progress</TableHead>
            <TableHead>Assigned By</TableHead>
            <TableHead>No. of Members</TableHead>
            <TableHead className="text-right">Location</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task, index) => (
            <TableRow key={index}>
              <TableCell className="font-semibold">{task.name}</TableCell>
              <TableCell>
                <div className="flex items-center">
                  <span className={`w-3 h-3 rounded-full mr-2 ${task.color}`} />
                  <span
                    className="text-xs font-medium px-2 py-0.5 rounded bg-opacity-20"
                    style={{ backgroundColor: task.color }}
                  >
                    {task.priority}
                  </span>
                </div>
              </TableCell>
              <TableCell className="w-28">
                <Progress value={100} className="h-2" />
                <p className="text-xs text-right">100%</p>
              </TableCell>
              <TableCell>{task.assignedBy}</TableCell>
              <TableCell>{task.members}</TableCell>
              <TableCell className="text-right">{task.location}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
      </div>
    </div>
  );
}

export default ViewIncidentTaskDetails;
