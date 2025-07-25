import React,{ useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
  import { Switch } from "@/components/ui/switch";
  import { Button } from "@/components/ui/button";
  import backArrowIcon from "../../../assets/Icons/back-arrow-icon.png";
  import ApproveIcon from "../../../assets/Icons/approve-icon.png";

  const accessList = [
    {
      "SI.NO": 1,
      access: "Dashboard",
      key:"dashboard"
    },
    {
      "SI.NO": 2,
      access: "User Profile Management",
        key:"userProfileManagement"
    },
    {
      "SI.NO": 3,
      access: "GIS",
        key:"gis"
    },
    {
      "SI.NO": 4,
      access: "Notifications",
      key:"notifications"
    },
    {
      "SI.NO": 5,
      access: "Updates Reminder",
      key:"updatesReminder"
    },
    {
      "SI.NO": 6,
      access: "Learning Management System",
      key:"learningManagementSystem"
    },
  ];


  export default function RolePermissions() {
    const navigate = useNavigate();
    const [toggleSwitchData, setToggleSwitchData]= useState([{
      dashboard:{
        view: true,
        edit: true,
        delete: true
      },
       userProfileManagement:{
        view: true,
        edit: true,
        delete: true
      },
      gis:{
        view: true,
        edit: true,
        delete: true
      },
      notifications:{
        view: true,
        edit: true,
        delete: true
      },
      updatesReminder:{
        view: true,
        edit: true,
        delete: true
      },
      learningManagementSystem:{
        view: true,
        edit: true,
        delete: true
      }
    }])
  
    const handleToggle=(checked, access, type)=>{
      setToggleSwitchData([{...toggleSwitchData[0],[access]:{...toggleSwitchData[0][access], [type]:!toggleSwitchData[0][access][type]}}]);
    }

    return (
      <div className="p-10"> 
        <Button className="bg-white border-black border-1 rounded-[5px] mb-10" onClick={()=>navigate(-1)}><img src={backArrowIcon} className="h-3 w-6" />Back</Button>
        <Table className="shadow-md border border-gray-200">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">S.NO</TableHead>
            <TableHead>Access</TableHead>
            <TableHead>View</TableHead>
            <TableHead className="text-right">Edit</TableHead>
            <TableHead className="text-right">Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {accessList.map((invoice) => (
            <TableRow key={invoice.invoice}>
              <TableCell className="font-medium">{invoice["SI.NO"]}</TableCell>
              <TableCell className="font-medium">{invoice.access}</TableCell>
              <TableCell><Switch id="airplane-mode" className="data-[state=checked]:bg-[#34C759] data-[state=unchecked]:bg-gray-400" defaultChecked onCheckedChange={(checked)=> handleToggle(checked,invoice.key, "view")} /></TableCell>
              <TableCell className="text-right"><Switch id="airplane-mode" className="data-[state=checked]:bg-[#34C759] data-[state=unchecked]:bg-gray-400" defaultChecked onCheckedChange={(checked)=> handleToggle(checked,invoice.key, "edit")} /></TableCell>
              <TableCell className="text-right"><Switch id="airplane-mode" className="data-[state=checked]:bg-[#34C759] data-[state=unchecked]:bg-gray-400" defaultChecked onCheckedChange={(checked)=> handleToggle(checked,invoice.key, "delete")} /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="text-center mt-10">
       <Button type="submit" className="bg-[#34a853] text-white w-40 rounded-[3px]"><img src={ApproveIcon} className="w-7  h-4" />Approve Access</Button>
      </div>
      </div>
    )
  }
  


