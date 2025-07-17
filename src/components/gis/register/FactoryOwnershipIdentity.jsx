import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import EditIcon from "../../../assets/Icons/edit-pencil-icon.png"
import UplaodImage from "../../../assets/Images/upload-image.jpeg"

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

export default function FactoryOwnershipIdentity() {

    const [selectedImage, setSelectedImage] = useState(null);
    const [imageFile, setImageFile] = useState(null);


    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setSelectedImage(imageUrl);
            setImageFile(file);
        }
        console.log(event,"this is the file...")
    }
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
            <p className="font-semibold text-[27px] sm:text-[100px] md:text-[36px]">Factory Ownership Identity</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {selectedImage && (
                    <div className="p-2 relative text-center">
                        <img
                            src={selectedImage}
                            alt="Selected"
                            className="w-35 h-35 object-contain m-auto mb-5"
                        />
                        <label htmlFor="upload-image">
                            <img src={EditIcon} className="w-7 h-7 rounded-[50%] p-1 shadow-md absolute top-32 left-90 bg-white" />
                        </label>
                        <input type="file" id="upload-image" style={{ display: "none" }} accept="image/jpg, image/png, image/jpeg" onChange={handleFileChange} />
                        <div className="text-[12px]">
                            <p>Maximum file size: Unlimited, maximum number of files: 1</p>
                            <p>Accepted file types : JPEG or PNG</p>
                            <p>Note : Image files Won’t be optimized such as Badges, Gif & PDF</p>
                        </div>
                    </div>
                )}

                {selectedImage===null && (
                    <div className="flex flex-col text-center">
                        <label htmlFor="upload-image" className="mb-5">
                            <img src={UplaodImage} className="w-35 h-35 shadow-md m-auto" />
                        </label>
                        <input type="file" id="upload-image" style={{ display: "none" }} accept="image/jpg, image/png, image/jpeg" onChange={handleFileChange} />
                        <div className="text-[12px]">
                            <p>Maximum file size: Unlimited, maximum number of files: 1</p>
                            <p>Accepted file types : JPEG or PNG</p>
                            <p>Note : Image files Won’t be optimized such as Badges, Gif & PDF</p>
                        </div>
                    </div>
                )}


                {/* Name */}
                <div>
                    <label className="text-[#666666] block mb-1">Name of the Factory</label>
                    <Input className="border-[#cccccc] mb-10" type="text" placeholder="Type" {...register("name")} />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
            
                    <label className="text-[#666666] block mb-1">Website Link</label>
                    <Input className="border-[#cccccc]" type="email" placeholder="www." {...register("email")} />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                </div>

                {/* Contact Number */}
                <div>
                    <label className="text-[#666666] block mb-1">Name of the Ownership Person</label>
                    <Input className="border-[#cccccc]" type="text" placeholder="type" {...register("contactNumber")} />
                    {errors.contactNumber && <p className="text-red-500 text-sm mt-1">{errors.contactNumber.message}</p>}
                </div>

                {/* Contact Number */}
                <div>
                    <label className="text-[#666666] block mb-1">Business Email ID</label>
                    <Input className="border-[#cccccc]" type="text" placeholder="@gmail.com" {...register("contactNumber")} />
                    {errors.contactNumber && <p className="text-red-500 text-sm mt-1">{errors.contactNumber.message}</p>}
                </div>

                {/* Contact Number */}
                <div>
                    <label className="text-[#666666] block mb-1">Contact Number</label>
                    <Input className="border-[#cccccc]" type="text" placeholder="+91" {...register("contactNumber")} />
                    {errors.contactNumber && <p className="text-red-500 text-sm mt-1">{errors.contactNumber.message}</p>}
                </div>

                {/* Alternative Contact */}
                <div>
                    <label className="text-[#666666] block mb-1">Business Contact Number</label>
                    <Input className="border-[#cccccc]" type="text" placeholder="+91" {...register("alternativeContactNumber")} />
                    {errors.alternativeContactNumber && <p className="text-red-500 text-sm mt-1">{errors.alternativeContactNumber.message}</p>}
                </div>

                {/* Aadhaar */}
                <div>
                    <label className="text-[#666666] block mb-1">Licenses Number</label>
                    <Input className="border-[#cccccc]" type="text" placeholder="0000 0000 0000 0000" {...register("aadhaarNumber")} />
                    {errors.aadhaarNumber && <p className="text-red-500 text-sm mt-1">{errors.aadhaarNumber.message}</p>}
                </div>

                {/* PAN */}
                <div>
                    <label className="text-[#666666] block mb-1">Business PAN Number</label>
                    <Input className="border-[#cccccc]" type="text" placeholder="*********" {...register("panNumber")} />
                    {errors.panNumber && <p className="text-red-500 text-sm mt-1">{errors.panNumber.message}</p>}
                </div>

                {/* PAN */}
                <div>
                    <label className="text-[#666666] block mb-1">GST Number</label>
                    <Input className="border-[#cccccc]" type="text" placeholder="0000 0000 0000 0000" {...register("panNumber")} />
                    {errors.panNumber && <p className="text-red-500 text-sm mt-1">{errors.panNumber.message}</p>}
                </div>

                {/* PAN */}
                <div>
                    <label className="text-[#666666] block mb-1">Factory Location Link</label>
                    <Input className="border-[#cccccc]" type="text" placeholder="Add Factory Location Link" {...register("panNumber")} />
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
                <Button type="submit" className="bg-[#FED36A] text-white w-40 rounded-[20px]">Register</Button>
            </div>
        </form>

    );
}
