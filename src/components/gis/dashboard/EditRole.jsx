import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {editRoleFormSchema} from "../../../schemas";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import PermissionsIcon from "../../../assets/Icons/permissions-icon.png"
import ApproveIcon from "../../../assets/Icons/approve-icon.png"
import SearchNameIcon from "../../../assets/Icons/search-name-icon.png"


function EditRole() {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(editRoleFormSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            idNumber: "",
            phoneNumber: "",
            emailId: "", 
            sudAdminRole: ""
        },
    });

    const onSubmit = (data) => {
        console.log("Submitted values:", data);
    };

    return (
        <div className="mx-10 p-15">
            <div className="w-[55vw]">
                <label className="text-[#666666] block mb-1">Search name</label>
                <div className="relative">
                    <img src={SearchNameIcon} className="w-6 h-4 absolute top-1/4 left-2" />
                    <Input className="border-[#cccccc] pl-10" type="text" placeholder="Search name here" {...register("firstName")} />
                </div>
                
            </div>
            
            <form onSubmit={handleSubmit(onSubmit)} className="pt-12 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-30">
                    {/* Name */}
                    <div>
                        <label className="text-[#666666] block mb-1">First Name</label>
                        <Input className="border-[#cccccc]" type="text" placeholder="Type" {...register("firstName")} />
                        {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>}
                    </div>

                    {/* Email */}
                    <div>
                        <label className="text-[#666666] block mb-1">Last Name</label>
                        <Input className="border-[#cccccc]" type="email" placeholder="Type" {...register("lastName")} />
                        {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>}
                    </div>

                    {/* Contact Number */}
                    <div>
                        <label className="text-[#666666] block mb-1">ID Number</label>
                        <Input className="border-[#cccccc]" type="text" placeholder="Type" {...register("idNumber")} />
                        {errors.idNumber && <p className="text-red-500 text-sm mt-1">{errors.idNumber.message}</p>}
                    </div>

                    {/* Alternative Contact */}
                    <div>
                        <label className="text-[#666666] block mb-1">Phone Number</label>
                        <Input className="border-[#cccccc]" type="text" placeholder="+91" {...register("phoneNumber")} />
                        {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber.message}</p>}
                    </div>

                    {/* Aadhaar */}
                    <div>
                        <label className="text-[#666666] block mb-1">Email ID</label>
                        <Input className="border-[#cccccc]" type="text" placeholder="@gmail.com" {...register("emailId")} />
                        {errors.emailId && <p className="text-red-500 text-sm mt-1">{errors.emailId.message}</p>}
                    </div>

                    {/* PAN */}
                    <div>
                        <label className="text-[#666666] block mb-1">Sub Admin Role</label>
                        <Input className="border-[#cccccc]" type="text" placeholder="Type" {...register("sudAdminRole")} />
                        {errors.sudAdminRole && <p className="text-red-500 text-sm mt-1">{errors.sudAdminRole.message}</p>}
                    </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-center gap-5">
                    <Button type="button" onClick={()=>navigate('/gis/role-permissions')} className="bg-[#e4c811] text-white w-40 rounded-[3px]"><img src={PermissionsIcon} className="w-6 h-6"/>Permission's</Button>
                    <Button type="submit" className="bg-[#34a853] text-white w-40 rounded-[3px]"><img src={ApproveIcon} className="w-7  h-4" />Approve Access</Button>
                </div>
            </form>
        </div>
    );
}

export default EditRole;