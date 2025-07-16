import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    email: z.string().email({ message: "Invalid email address." }),
    contactNumber: z.string().min(10, { message: "Enter a valid number." }),
    alternativeContactNumber: z.string().min(10, { message: "Enter a valid number." }),
    aadhaarNumber: z.string().min(12, { message: "Enter a valid Aadhaar number." }),
    panNumber: z.string().regex(/^[A-Z]{5}[0-9]{4}[A-Z]$/, { message: "Enter a valid Indian PAN (e.g., ABCDE1234F)." }),
    permanentAddress: z.string().min(2, { message: "Permanent Address must be at least 2 characters." }),
    state: z.string().min(2, { message: "State must be at least 2 characters." }),
    district: z.string().min(2, { message: "District must be at least 2 characters." }),
    pinCode: z.string().min(6, { message: "PinCode must be at least 2 characters." }),
    city: z.string().min(2, { message: "City must be at least 2 characters." }),
});

export default function OwnershipIdentity() {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "", email: "", contactNumber: "", alternativeContactNumber: "",
            aadhaarNumber: "", panNumber: "", permanentAddress: "",
            state: "", district: "", pinCode: "", city: ""
        },
    });

    const onSubmit = (data) => {
        console.log("Submitted values:", data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-6xl mx-auto p-6 space-y-8">
            <p className="font-semibold text-[27px] md:text-[36px]">Ownership Identity</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}    
                <div>
                    <label className="text-[#666666] block mb-1">Name of the person</label>
                    <Input className="border-[#cccccc]" type="text" placeholder="Type" {...register("name")} />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                </div>

                {/* Email */}
                <div>
                    <label className="text-[#666666] block mb-1">Email ID</label>
                    <Input className="border-[#cccccc]" type="email" placeholder="@gmail.com" {...register("email")} />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                </div>

                {/* Contact Number */}
                <div>
                    <label className="text-[#666666] block mb-1">Contact Number</label>
                    <Input className="border-[#cccccc]" type="text" placeholder="+91" {...register("contactNumber")} />
                    {errors.contactNumber && <p className="text-red-500 text-sm mt-1">{errors.contactNumber.message}</p>}
                </div>

                {/* Alternative Contact */}
                <div>
                    <label className="text-[#666666] block mb-1">Alternative Contact Number</label>
                    <Input className="border-[#cccccc]" type="text" placeholder="+91" {...register("alternativeContactNumber")} />
                    {errors.alternativeContactNumber && <p className="text-red-500 text-sm mt-1">{errors.alternativeContactNumber.message}</p>}
                </div>

                {/* Aadhaar */}
                <div>
                    <label className="text-[#666666] block mb-1">Aadhaar Number</label>
                    <Input className="border-[#cccccc]" type="text" placeholder="0000 0000 0000 0000" {...register("aadhaarNumber")} />
                    {errors.aadhaarNumber && <p className="text-red-500 text-sm mt-1">{errors.aadhaarNumber.message}</p>}
                </div>

                {/* PAN */}
                <div>
                    <label className="text-[#666666] block mb-1">PAN Number</label>
                    <Input className="border-[#cccccc]" type="text" placeholder="*********" {...register("panNumber")} />
                    {errors.panNumber && <p className="text-red-500 text-sm mt-1">{errors.panNumber.message}</p>}
                </div>

                {/* Address (full-width) */}
                <div className="md:col-span-2">
                    <label className="text-[#666666] block mb-1">Permanent Address</label>
                    <Input className="border-[#cccccc]" type="text" placeholder="Type your Address" {...register("permanentAddress")} />
                    {errors.permanentAddress && <p className="text-red-500 text-sm mt-1">{errors.permanentAddress.message}</p>}
                </div>

                {/* State */}
                <div>
                    <label className="text-[#666666] block mb-1">State</label>
                    <Input className="border-[#cccccc]" type="text" placeholder="Select the option" {...register("state")} />
                    {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state.message}</p>}
                </div>

                {/* District */}
                <div>
                    <label className="text-[#666666] block mb-1">District</label>
                    <Input className="border-[#cccccc]" type="text" placeholder="Select the option" {...register("district")} />
                    {errors.district && <p className="text-red-500 text-sm mt-1">{errors.district.message}</p>}
                </div>

                {/* Pin Code */}
                <div>
                    <label className="text-[#666666] block mb-1">Pin Code</label>
                    <Input className="border-[#cccccc]" type="text" placeholder="Select the option" {...register("pinCode")} />
                    {errors.pinCode && <p className="text-red-500 text-sm mt-1">{errors.pinCode.message}</p>}
                </div>

                {/* City */}
                <div>
                    <label className="text-[#666666] block mb-1">City</label>
                    <Input className="border-[#cccccc]" type="text" placeholder="Select the option" {...register("city")} />
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
