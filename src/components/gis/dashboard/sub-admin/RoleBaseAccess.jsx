import React, { useState } from "react";
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import AddIcon from "../../../../assets/Icons/add-icon.png";
import EditRoleIcon from "../../../../assets/Icons/edit-role-icon.png";
import DeleteRoleIcon from "../../../../assets/Icons/delete-role-icon.png";
import PermissionsIcon from "../../../../assets/Icons/permissions-icon.png"
import ApproveIcon from "../../../../assets/Icons/approve-icon.png"
import ThreeDotsIcon from "../../../../assets/Icons/three-dots-icon.png"
import { useNavigate } from "react-router-dom";

export default function RoleBaseAccess() {
  const navigate = useNavigate();

  const invoices = [
    {
      selectAll: "John Doe",
      status: "Active",
      mailId: "john.doe@example.com",
      phoneNumber: "+91-9876543210",
      role: "Manager",
      location: "Bangalore",
    },
    {
      selectAll: "Priya Sharma",
      status: "Inactive",
      mailId: "priya.sharma@example.com",
      phoneNumber: "+91-9123456789",
      role: "Developer",
      location: "Hyderabad",
    },
    {
      selectAll: "Amit Verma",
      status: "Pending",
      mailId: "amit.verma@example.com",
      phoneNumber: "+91-9988776655",
      role: "Designer",
      location: "Mumbai",
    }
  ];

  const [activeButton, setActiveButton] = useState(true);

  return (
    <div className="w-full">
      <div className="flex items-center justify-around ml-[2  6vw] mt-[2.5vw]">
        <div className="flex items-center gap-2">
          <button className={`rounded-l-lg p-3 px-5 ${activeButton ? "border-[#fed36a] border-[1.5px] text-[#fed36a] font-medium" : "shadow-md"}`} onClick={() => setActiveButton((prev) => !prev)}>Sub Admin's</button>
          <div className="w-[2px] h-[4vw] border-r-1 border-gray-300"></div>
          <button className={`rounded-r-lg p-3 px-5 ${activeButton ? "shadow-md/20" : "border-[#fed36a] border-[1.5px] text-[#fed36a] font-semibold"}`} onClick={() => setActiveButton((prev) => !prev)}>Permissions</button>
        </div>
        <div>
          <Dialog>
            <form>
              <DialogTrigger asChild>
                <Button className="bg-[#fed36a] text-white"><img src={AddIcon} className="w-4 h-4" /> Add person</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <div className="grid gap-4">
                  <div className="grid gap-3">
                    <Label htmlFor="name-1">Add New Sub Admin</Label>
                    <Input id="name-1" name="name" placeholder="Search the Person" />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="username-1">Email Id</Label>
                    <Input id="username-1" name="username" placeholder="@gmail.com" />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="name-1">Add Phone Number</Label>
                    <Input id="name-1" name="name" placeholder="+91" />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="username-1">Sub Admin Role</Label>
                    <Input id="username-1" name="username" placeholder="If Required" />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="name-1">ID Number</Label>
                    <Input id="name-1" name="name" />
                  </div>
                </div>
                <div className="flex justify-center gap-5">
                  <Button type="button" onClick={() => navigate('/gis/role-permissions')} className="bg-[#e4c811] text-white w-40 rounded-[3px]"><img src={PermissionsIcon} className="w-6 h-6" />Permission's</Button>
                  <Button type="submit" className="bg-[#34a853] text-white w-40 rounded-[3px]"><img src={ApproveIcon} className="w-7  h-4" />Approve Access</Button>
                </div>
              </DialogContent>
            </form>
          </Dialog>
        </div>
      </div>

      <div className="mx-15">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead><Checkbox className="border border-[#0832de]" /></TableHead>
              <TableHead className="text-[#7d7d7d] p-5">Select All</TableHead>
              <TableHead className="text-[#7d7d7d]">Status</TableHead>
              <TableHead className="text-[#7d7d7d]">Mail Id</TableHead>
              <TableHead className="text-[#7d7d7d]">Phone number</TableHead>
              <TableHead className="text-[#7d7d7d]">Role</TableHead>
              <TableHead className="text-[#7d7d7d]">Location</TableHead>
              <TableHead className="text-[#7d7d7d]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.invoice}>
                <TableCell><Checkbox className="border border-[#0832de]" /></TableCell>
                <TableCell className="font-medium p-5">{invoice.selectAll}</TableCell>
                <TableCell className= {`${invoice.status==="Active"?"text-[#2be33e]": invoice.status==="Pending"?"text-[#C8CC41]": invoice.status==="Inactive"?"text-[red]":""}`} >{invoice.status}</TableCell>
                <TableCell>{invoice.mailId}</TableCell>
                <TableCell className="">{invoice.phoneNumber}</TableCell>
                <TableCell className="">{invoice.role}</TableCell>
                <TableCell className="">{invoice.location}</TableCell>
                <TableCell className="">
                  <DropdownMenu>
                    <DropdownMenuTrigger> <img src={ThreeDotsIcon} className="w-4 h-5" /></DropdownMenuTrigger>
                    <DropdownMenuContent className="shadow-xl shadow-gray-300" align="start" >
                      <DropdownMenuItem onClick={() => navigate('/gis/edit-role')}><img src={EditRoleIcon} className="w-5 h-5" />Edit</DropdownMenuItem>
                      <DropdownMenuItem><img src={DeleteRoleIcon} className="w-4 h-4" />Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

