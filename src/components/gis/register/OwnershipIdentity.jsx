import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
// import {Input} from "../../reuable-components/input";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { saveOwnershipIdentityData } from "../../../redux/slices/registrationSlice";

const formSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    email: z.string().email({ message: "Invalid email address." }),
    contactNumber: z.string().min(10, { message: "Enter a valid number." }).regex(/^[6-9]/,{message:"Contact number must start with 6-9"}).regex(/[0-9]{10}/,{message:"Enter only digits"}),
    alternativeContactNumber: z.string().min(10, { message: "Enter a valid number." }).regex(/^[6-9]/,{message:"Contact number must start with 6-9"}).regex(/[0-9]{10}/,{message:"Enter only digits"}),
    aadhaarNumber: z.string().min(12, { message: "Enter 12 digit valid Aadhaar number." }).regex(/^[2-9]/,{message:"Aadhar number must start with 2-9"}).regex(/[0-9]{12}/,{message:"Enter only digits"}),
    panNumber: z.string().regex(/^[A-Z]{5}[0-9]{4}[A-Z]$/, { message: "Enter a valid Indian PAN (e.g., ABCDE1234F)." }),
    permanentAddress: z.string().min(2, { message: "Permanent Address must be at least 2 characters." }),
    state: z.string().min(2, { message: "State must be at least 2 characters." }),
    district: z.string().min(2, { message: "District must be at least 2 characters." }),
    pinCode: z.string().min(6, { message: "PinCode must be 6 characters." }).regex(/[0-9]{6}/,{message:"Enter only digits"}),
    city: z.string().min(2, { message: "City must be at least 2 characters." }),
});

export default function OwnershipIdentity({setCount}) {
    const dispatch = useDispatch();

    const ownershipIdentityData = useSelector((state)=> state.registration.ownershipIdentityData);

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: ownershipIdentityData.name || "", 
            email: ownershipIdentityData.email || "", 
            contactNumber: ownershipIdentityData.contactNumber || "", 
            alternativeContactNumber: ownershipIdentityData.alternativeContactNumber || "",
            aadhaarNumber: ownershipIdentityData.aadhaarNumber || "", 
            panNumber: ownershipIdentityData.panNumber || "", 
            permanentAddress: ownershipIdentityData.permanentAddress || "",
            state: ownershipIdentityData.state || "", 
            district: ownershipIdentityData.district || "", 
            pinCode: ownershipIdentityData.pinCode || "", 
            city: ownershipIdentityData.city || ""
        },
    });

    const onSubmit = (data) => {
        setCount(1);
        const payload = {
            name: data.name,
            email: data.email,
            contactNumber: data.contactNumber,
            alternativeContactNumber: data.alternativeContactNumber,
            aadhaarNumber: data.aadhaarNumber,
        };
        dispatch(saveOwnershipIdentityData(payload))
        
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-6xl mx-auto p-6 space-y-8">
            <p className="md:w-[50vw] text-sm  md:text-lg font-semibold">Andhra Pradesh Industrial Infrastructure Corporation Ltd. (APIIC) was incorporated on 26th September, 1973 with Authorised Capital of Rs.20.00 crores and paid up capital of Rs.16.33 crores. APIIC is a wholly owned Undertaking of Government of Andhra Pradesh.</p>
            <p className="font-semibold text-[27px] md:text-[36px]">Ownership Identity</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                    <label className="text-[#666666] block mb-1">Name of the person</label>
                    <Input className="border-[#cccccc]" type="text" placeholder="Type" register={register} name="name" />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                </div>

                {/* Email */}
                <div>
                    <label className="text-[#666666] block mb-1">Email ID</label>
                    <Input className="border-[#cccccc]" type="email" placeholder="@gmail.com" register={register} name="email" />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                </div>

                {/* Contact Number */}
                <div>
                    <label className="text-[#666666] block mb-1">Contact Number</label>
                    <Input maxLength={10} className="border-[#cccccc]" type="text" placeholder="+91" register={register} name="contactNumber" />
                    {errors.contactNumber && <p className="text-red-500 text-sm mt-1">{errors.contactNumber.message}</p>}
                </div>

                {/* Alternative Contact */}
                <div>
                    <label className="text-[#666666] block mb-1">Alternative Contact Number</label>
                    <Input maxLength={10} className="border-[#cccccc]" type="text" placeholder="+91" register={register} name="alternativeContactNumber" />
                    {errors.alternativeContactNumber && <p className="text-red-500 text-sm mt-1">{errors.alternativeContactNumber.message}</p>}
                </div>

                {/* Aadhaar */}
                <div>
                    <label className="text-[#666666] block mb-1">Aadhaar Number</label>
                    <Input maxLength={12} className="border-[#cccccc]" type="text" placeholder="0000 0000 0000 0000" register={register} name="aadhaarNumber" />
                    {errors.aadhaarNumber && <p className="text-red-500 text-sm mt-1">{errors.aadhaarNumber.message}</p>}
                </div>

                <div>
                    <label className="text-[#666666] block mb-1">PAN Number</label>
                    <Input maxLength={10} className="border-[#cccccc]" type="text" placeholder="*********" register={register} name="panNumber" />
                    {errors.panNumber && <p className="text-red-500 text-sm mt-1">{errors.panNumber.message}</p>}
                </div>

                <div className="md:col-span-2">
                    <label className="text-[#666666] block mb-1">Permanent Address</label>
                    <Input className="border-[#cccccc]" type="text" placeholder="Type your Address" register={register} name="permanentAddress" />
                    {errors.permanentAddress && <p className="text-red-500 text-sm mt-1">{errors.permanentAddress.message}</p>}
                </div>

                <div>
                    <label className="text-[#666666] block mb-1">State</label>
                    <Input className="border-[#cccccc]" type="text" placeholder="Select the option" register={register} name="state" />
                    {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state.message}</p>}
                </div>

                <div>
                    <label className="text-[#666666] block mb-1">District</label>
                    <Input className="border-[#cccccc]" type="text" placeholder="Select the option" register={register} name="district" />
                    {errors.district && <p className="text-red-500 text-sm mt-1">{errors.district.message}</p>}
                </div>

                <div>
                    <label className="text-[#666666] block mb-1">Pin Code</label>
                    <Input maxLength={6} className="border-[#cccccc]" type="text" placeholder="Select the option" register={register} name="pinCode" />
                    {errors.pinCode && <p className="text-red-500 text-sm mt-1">{errors.pinCode.message}</p>}
                </div>

                <div>
                    <label className="text-[#666666] block mb-1">City</label>
                    <Input className="border-[#cccccc]" type="text" placeholder="Select the option" register={register} name="city" />
                    {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>}
                </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
                <Button type="submit" className="bg-[#FED36A] text-white w-40 rounded-[20px]">Next</Button>
            </div>
        </form>

    );
}

