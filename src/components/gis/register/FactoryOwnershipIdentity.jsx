import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import EditIcon from "../../../assets/Icons/edit-pencil-icon.png"
import UplaodImage from "../../../assets/Images/upload-image.jpeg";
import { useDispatch, useSelector } from "react-redux";
import { saveFactoryOwnershipIdentityData } from "../../../redux/slices/registrationSlice";
import { networkHandler } from "../../../https/networkHandler";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner"

const formSchema = z.object({
    factoryName: z.string().min(2, { message: "Name must be at least 2 characters" }),
    websiteLink: z.string().min(2,{ message: "Input vaild Link" }),
    ownershipPersonName: z.string().min(2,{ message: "Name must be at least 2 characters" }),
    businessEmail: z.string().email({ message: "Invalid email address." }),
    contactNumber: z.string().min(10, { message: "Enter a valid number." }),
    businessContactNumber: z.string().min(10, { message: "Enter a valid number." }),
    licenseNumber: z.string().min(2, { message: "Enter a valid number." }),
    businessPanNumber: z.string().min(10, { message: "Enter a valid number." }),
    gstNumber: z.string().min(12, { message: "Enter a valid GST number." }),
    factoryLocationLink: z.string().min(2, { message: "Enter valid factory link"}),
    permanentAddress: z.string().min(2, { message: "Permanent Address must be at least 2 characters." }),
    state: z.string().min(2, { message: "State must be at least 2 characters." }),
    district: z.string().min(2, { message: "District must be at least 2 characters." }),
    pinCode: z.string().min(6, { message: "Pincode must be at least 2 characters." }),
    city: z.string().min(2, { message: "City must be at least 2 characters." }),
});

export default function FactoryOwnershipIdentity({ setCount }) {

    const [selectedImage, setSelectedImage] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const factoryOwnershipIdentityData = useSelector((state)=>state.registration.factoryOwnershipIdentityData);
    const ownershipIdentityData = useSelector((state)=>state.registration.ownershipIdentityData);

    console.log("this is the form2 data",factoryOwnershipIdentityData);


    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setSelectedImage(imageUrl);
            setImageFile(file);
        }
        console.log(event, "this is the file...")
    }
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            factoryName: factoryOwnershipIdentityData.name || "", 
            websiteLink: factoryOwnershipIdentityData.websiteLink ||  "", 
            ownershipPersonName: factoryOwnershipIdentityData.ownershipPersonName || "", 
            businessEmail: factoryOwnershipIdentityData.email || "",
            contactNumber: factoryOwnershipIdentityData.contactNumber || "", 
            businessContactNumber: factoryOwnershipIdentityData.businessContactNumber || "", 
            licenseNumber: factoryOwnershipIdentityData.licenseNumber || "", 
            businessPanNumber: factoryOwnershipIdentityData.panNumber || "",
            gstNumber: factoryOwnershipIdentityData.gstNumber || "", 
            factoryLocationLink: factoryOwnershipIdentityData.factoryLocationLink || "", 
            permanentAddress: factoryOwnershipIdentityData.factoryPremises || "", 
            state: factoryOwnershipIdentityData.state || "", 
            district: factoryOwnershipIdentityData.district || "", 
            pinCode: factoryOwnershipIdentityData.pincode || "", 
            city: factoryOwnershipIdentityData.city || ""
        },
    });

    const onClickBack=()=>{
        setCount(0);
    }

    const onSubmit = async (data) => {
        const payload = {
            name: data.factoryName,
            email: data.businessEmail,
            contactNumber: data.contactNumber,
            licenseNumber: data.licenseNumber,
            panNumber: data.businessPanNumber,
            gstNumber: data.gstNumber,
            factoryPremises: data.permanentAddress,
            state: data.state,
            district: data.district,
            pincode: data.pinCode,
            city: data.city
        }
        dispatch(saveFactoryOwnershipIdentityData(payload))
       
        console.log("final registration data", {...ownershipIdentityData,factoryIdentication:payload});
        const registrationResponse = await networkHandler.post('8082/v1/users/factoryRegistration',{...ownershipIdentityData,factoryIdentication:payload});
        if(registrationResponse?.success){
            toast.success(registrationResponse?.successMessage);
            navigate('/auth/registration-success');
        }
        else{
            toast.warning(registrationResponse?.errorMessage??"An error occured")
        }
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

                {selectedImage === null && (
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
                    <Input className="border-[#cccccc] mb-10" type="text" placeholder="Type" register={register} name="factoryName" />
                    {errors.factoryName && <p className="text-red-500 text-sm mt-1">{errors.factoryName.message}</p>}

                    <label className="text-[#666666] block mb-1">Website Link</label>
                    <Input className="border-[#cccccc]" type="text" placeholder="www." register={register} name="websiteLink" />
                    {errors.websiteLink && <p className="text-red-500 text-sm mt-1">{errors.websiteLink.message}</p>}
                </div>

                {/* Contact Number */}
                <div>
                    <label className="text-[#666666] block mb-1">Name of the Ownership Person</label>
                    <Input className="border-[#cccccc]" type="text" placeholder="type" register={register} name="ownershipPersonName" />
                    {errors.ownershipPersonName && <p className="text-red-500 text-sm mt-1">{errors.ownershipPersonName.message}</p>}
                </div>

                {/* Contact Number */}
                <div>
                    <label className="text-[#666666] block mb-1">Business Email ID</label>
                    <Input className="border-[#cccccc]" type="text" placeholder="@gmail.com" register={register} name="businessEmail" />
                    {errors.businessEmail && <p className="text-red-500 text-sm mt-1">{errors.businessEmail.message}</p>}
                </div>

                {/* Contact Number */}
                <div>
                    <label className="text-[#666666] block mb-1">Contact Number</label>
                    <Input className="border-[#cccccc]" type="text" placeholder="+91" register={register} name="contactNumber"  />
                    {errors.contactNumber && <p className="text-red-500 text-sm mt-1">{errors.contactNumber.message}</p>}
                </div>

                {/* Alternative Contact */}
                <div>
                    <label className="text-[#666666] block mb-1">Business Contact Number</label>
                    <Input className="border-[#cccccc]" type="text" placeholder="+91" register={register} name="businessContactNumber" />
                    {errors.businessContactNumber && <p className="text-red-500 text-sm mt-1">{errors.businessContactNumber.message}</p>}
                </div>

                {/* Aadhaar */}
                <div>
                    <label className="text-[#666666] block mb-1">License Number</label>
                    <Input className="border-[#cccccc]" type="text" placeholder="0000 0000 0000 0000" register={register} name="licenseNumber" />
                    {errors.licenseNumber && <p className="text-red-500 text-sm mt-1">{errors.licenseNumber.message}</p>}
                </div>

                {/* PAN */}
                <div>
                    <label className="text-[#666666] block mb-1">Business PAN Number</label>
                    <Input className="border-[#cccccc]" type="text" placeholder="*********" register={register} name="businessPanNumber" />
                    {errors.businessPanNumber && <p className="text-red-500 text-sm mt-1">{errors.businessPanNumber.message}</p>}
                </div>

                {/* PAN */}
                <div>
                    <label className="text-[#666666] block mb-1">GST Number</label>
                    <Input className="border-[#cccccc]" type="text" placeholder="0000 0000 0000 0000" register={register} name="gstNumber" />
                    {errors.gstNumber && <p className="text-red-500 text-sm mt-1">{errors.gstNumber.message}</p>}
                </div>

                {/* PAN */}
                <div>
                    <label className="text-[#666666] block mb-1">Factory Location Link</label>
                    <Input className="border-[#cccccc]" type="text" placeholder="Add Factory Location Link" register={register} name="factoryLocationLink" />
                    {errors.factoryLocationLink && <p className="text-red-500 text-sm mt-1">{errors.factoryLocationLink.message}</p>}
                </div>

                {/* Address (full-width) */}
                <div className="md:col-span-2">
                    <label className="text-[#666666] block mb-1">Permanent Address</label>
                    <Input className="border-[#cccccc]" type="text" placeholder="Type your Address" register={register} name="permanentAddress" />
                    {errors.permanentAddress && <p className="text-red-500 text-sm mt-1">{errors.permanentAddress.message}</p>}
                </div>

                {/* State */}
                <div>
                    <label className="text-[#666666] block mb-1">State</label>
                    <Input className="border-[#cccccc]" type="text" placeholder="Select the option" register={register} name="state" />
                    {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state.message}</p>}
                </div>

                {/* District */}
                <div>
                    <label className="text-[#666666] block mb-1">District</label>
                    <Input className="border-[#cccccc]" type="text" placeholder="Select the option" register={register} name="district" />
                    {errors.district && <p className="text-red-500 text-sm mt-1">{errors.district.message}</p>}
                </div>

                {/* Pin Code */}
                <div>
                    <label className="text-[#666666] block mb-1">Pin Code</label>
                    <Input className="border-[#cccccc]" type="text" placeholder="Select the option" register={register} name="pinCode" />
                    {errors.pinCode && <p className="text-red-500 text-sm mt-1">{errors.pinCode.message}</p>}
                </div>

                {/* City */}
                <div>
                    <label className="text-[#666666] block mb-1">City</label>
                    <Input className="border-[#cccccc]" type="text" placeholder="Select the option" register={register} name="city" />
                    {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>}
                </div>
            </div>

            <div className="flex justify-between">
                <Button onClick={onClickBack} className="bg-[#FED36A] text-white w-40 rounded-[20px]">Back</Button>
                <Button type="submit" className="bg-[#FED36A] text-white w-40 rounded-[20px]">Register</Button>
            </div>
        </form>

    );
}
