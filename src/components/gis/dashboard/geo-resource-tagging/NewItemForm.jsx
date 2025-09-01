import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter
} from "@/components/ui/dialog";
import { yellowButtonColor } from "../../../../lib/theme";
import { Input } from "@/components/ui/input"
import { useDispatch } from "react-redux";
import { saveItem } from "../../../../redux/slices/wareHouseItemsSlice";
import axios from "axios";

export const formSchema = z.object({
  name: z.string().min(2, { message: "Name of the chemical must be at least 2 characters" }),
  type: z.string().min(2, { message: "Select the type" }),
  casNumber: z.string().min(1, { message: "CAS registry number is required" }),
  phValue: z.string()
    .refine((val) => !isNaN(val) && Number(val) >= 0 && Number(val) <= 14, {
      message: "pH value must be a number between 0 and 14.",
    }),
  description: z.string().min(5, { message: "Description must be at least 5 characters." }),
  stockQuantity: z.string()
    .refine((val) => !isNaN(val) && Number(val) >= 0, {
      message: "Stock quantity must be a valid number.",
    }),
  unit: z.string().min(1, { message: "Unit of measurement is required." }),
  minRequiredQuantity: z.string()
    .refine((val) => !isNaN(val) && Number(val) >= 0, {
      message: "Minimum required quantity must be a valid number.",
    }),
  maxAllowedQuantity: z.string()
    .refine((val) => !isNaN(val) && Number(val) > 0, {
      message: "Max allowed storage quantity must be a valid number greater than 0.",
    }),
  factoryId: z.string().min(1, { message: "Factory ID is required." }),
  receivedDate: z.string().refine((val) => /^\d{4}-\d{2}-\d{2}$/.test(val), {
    message: "Received date must be in YYYY-MM-DD format.",
  }),
  expiryDate: z.string().refine((val) => /^\d{4}-\d{2}-\d{2}$/.test(val), {
    message: "Expiry date must be in YYYY-MM-DD format.",
  }),
  batchNo: z.string().min(1, { message: "Batch number is required." }),
  storageConditions: z.string().min(2, { message: "Storage condition is required." }),
  containerType: z.string().min(2, { message: "Container type is required." }),
  incompatibleMaterials: z.string().min(2, { message: "Incompatible materials are required." }),
  supplierName: z.string().min(2, { message: "Supplier name must be at least 2 characters." }),
  supplierContact: z
    .string()
    .regex(/^[0-9]{10,15}$/, { message: "Enter a valid contact number (10–15 digits)." }),
  supplierEmail: z.string().email({ message: "Enter a valid email address." }),
  availability: z.enum(["available", "notavailable"], {
    required_error: "Please select availability.",
  }),
});


const NewItemForm = ({ isGeo }) => {

  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const { register, watch, handleSubmit, formState: { errors }, control } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      type: "",
      casNumber: "",
      phValue: "",
      description: "",
      stockQuantity: "",
      unit: "",
      minRequiredQuantity: "",
      maxAllowedQuantity: "",
      factoryId: "",
      receivedDate: "",
      expiryDate: "",
      batchNo: "",
      storageConditions: "",
      containerType: "",
      incompatibleMaterials: "",
      supplierName: "",
      supplierContact: "",
      supplierEmail: "",
      availability: "",
    },
  });


  const onSubmit = async () => {
    if (isGeo === true) {
      dispatch(saveItem());
    }
    else {
      const payload = {
    chemicalName: data.name,
    chemicalType: data.type,
    casNumber : data.casNumber,
    phValue : data.phValue,
    description : data.description,
    actuallQuantity: data.stockQuantity,
    unit : data.unit,
    minRequiredQuantity: data.minRequiredQuantity,
    maxAllowedQuantity: data.maxAllowedQuantity,
    receivedDate: data.receivedDate,
    expiryDate: data.expiryDate,
    batchNumber: data.batchNo,
    storageCondition: data.storageConditions,
    containerType: data.containerType,
    incompatibleMaterials: data.incompatibleMaterials,
    supplierName: data.supplierName,
    phoneNumber: data.supplierContact,
    email: data.supplierEmail,
    factoryId: "fa1756466471506",
    available: data.availability
}
  const response = await axios.post("http://localhost:8082/v1/users/addChemicalsInInventory", payload)
      
    }
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen} className="">
      <DialogTrigger asChild>
        <Button className={`bg-[${yellowButtonColor}] text-white`}>Add new item</Button>
      </DialogTrigger>
      <DialogContent className="!w-[60vw] !max-w-[60vw]">
        <DialogHeader>
          <DialogTitle>New Item</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} >
          <div className="space-y-3 grid grid-cols-2 gap-x-5 text-[13px] mb-2">
            <div className="grid grid-cols-1 md:grid-cols-2 items-center">
              <label className="text-[#666666] block  ">Name of the chemical</label>
              <Input height="9" className="border-[#cccccc]" type="text" placeholder="Enter product name" name="name" register={register} />
              {errors.name && <p className="text-red-500 text-sm mt-1 text-[13px]">{errors.name.message}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 items-center">
              <label className="text-[#666666] block  ">Type of the chemical</label>
              <Controller
                name="type"
                control={control} // ✅ Make sure `control` is destructured from useForm
                rules={{ required: "Type is required" }}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Item Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="Liquid">Liquid</SelectItem>
                        <SelectItem value="Solid">Solid</SelectItem>
                        <SelectItem value="Gasoline">Gasoline</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              {/* <Input className="border-[#cccccc]" type="text" placeholder="Enter product ID" name="type" register={register} /> */}
              {errors.type && <p className="text-red-500 text-sm mt-1 text-[13px]">{errors.type.message}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 items-center">
              <label className="text-[#666666] block  ">CAS registry number</label>
              <Input height="9" className="border-[#cccccc]" type="text" placeholder="Select product category" name="casNumber" register={register} />
              {errors.casNumber && <p className="text-red-500 text-sm mt-1 text-[13px]">{errors.casNumber.message}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 items-center">
              <label className="text-[#666666] block  ">pH value of the Chemical</label>
              <Input height="9" className="border-[#cccccc]" type="text" placeholder="Enter pH value" name="phValue" register={register} />
              {errors.phValue && <p className="text-red-500 text-sm mt-1 text-[13px]">{errors.phValue.message}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 items-center">
              <label className="text-[#666666] block  ">Detailed Description</label>
              <Input height="9" className="border-[#cccccc]" type="text" placeholder="Enter description" name="description" register={register} />
              {errors.description && <p className="text-red-500 text-sm mt-1 text-[13px]">{errors.description.message}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 items-center">
              <label className="text-[#666666] block  ">Current stock Quantity</label>
              <Input height="9" className="border-[#cccccc]" type="text" placeholder="Enter stock quantity" name="stockQuantity" register={register} />
              {errors.stockQuantity && <p className="text-red-500 text-sm mt-1 text-[13px]">{errors.stockQuantity.message}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 items-center">
              <label className="text-[#666666] block  ">Unit of Measurement</label>
              <Controller
                name="unit"
                control={control} // ✅ Make sure `control` is destructured from useForm
                rules={{ required: "Unit is required" }}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Measurement" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="ltr">Liter's</SelectItem>
                        <SelectItem value="kg">KG</SelectItem>
                        <SelectItem value="ton">Ton's</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              {/* <Input className="border-[#cccccc]" type="text" placeholder="Enter unit" name="unit" register={register} /> */}
              {errors.unit && <p className="text-red-500 text-sm mt-1 text-[13px]">{errors.unit.message}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 items-center">
              <label className="text-[#666666] block  ">Minimum required Quantity</label>
              <Input height="9" className="border-[#cccccc]" type="text" placeholder="Enter min quantity" name="minRequiredQuantity" register={register} />
              {errors.minRequiredQuantity && <p className="text-red-500 text-sm mt-1 text-[13px]">{errors.minRequiredQuantity.message}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 items-center">
              <label className="text-[#666666] block  ">Max allowed storage Quantity</label>
              <Input height="9" className="border-[#cccccc]" type="text" placeholder="Enter max quantity" name="maxAllowedQuantity" register={register} />
              {errors.maxAllowedQuantity && <p className="text-red-500 text-sm mt-1 text-[13px]">{errors.maxAllowedQuantity.message}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 items-center">
              <label className="text-[#666666] block  ">Reference to the associated factory id</label>
              <Input height="9" className="border-[#cccccc]" type="text" placeholder="Enter factory ID" name="factoryId" register={register} />
              {errors.factoryId && <p className="text-red-500 text-sm mt-1 text-[13px]">{errors.factoryId.message}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 items-center">
              <label className="text-[#666666] block  ">Received Date</label>
              <Input height="9" className="border-[#cccccc]" type="date" placeholder="Enter received date" name="receivedDate" register={register} />
              {errors.receivedDate && <p className="text-red-500 text-sm mt-1 text-[13px]" >{errors.receivedDate.message}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 items-center">
              <label className="text-[#666666] block  ">Expiry Date</label>
              <Input height="9" className="border-[#cccccc]" type="date" placeholder="Enter expiry date" name="expiryDate" register={register} />
              {errors.expiryDate && <p className="text-red-500 text-sm mt-1 text-[13px]">{errors.expiryDate.message}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 items-center">
              <label className="text-[#666666] block  ">Batch No. of the chemical</label>
              <Input height="9" className="border-[#cccccc]" type="text" placeholder="Enter batch number" name="batchNo" register={register} />
              {errors.batchNo && <p className="text-red-500 text-sm mt-1 text-[13px]">{errors.batchNo.message}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 items-center">
              <label className="text-[#666666] block  ">Special storage condition requirements</label>
              <Input height="9" className="border-[#cccccc]" type="text" placeholder="Enter storage conditions" name="storageConditions" register={register} />
              {errors.storageConditions && <p className="text-red-500 text-sm mt-1 text-[13px]">{errors.storageConditions.message}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 items-center">
              <label className="text-[#666666] block  ">Type of container used for storage</label>
              <Input height="9" className="border-[#cccccc]" type="text" placeholder="Enter container type" name="containerType" register={register} />
              {errors.containerType && <p className="text-red-500 text-sm mt-1 text-[13px]">{errors.containerType.message}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 items-center">
              <label className="text-[#666666] block">Materials incompatible with this chemical</label>
              <Input height="9" className="border-[#cccccc]" type="text" placeholder="Enter incompatible materials" name="incompatibleMaterials" register={register} />
              {errors.incompatibleMaterials && <p className="text-red-500 text-sm mt-1 text-[13px]">{errors.incompatibleMaterials.message}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 items-center">
              <label className="text-[#666666] block  ">Name of the supplier</label>
              <Input height="9" className="border-[#cccccc]" type="text" placeholder="Enter supplier name" name="supplierName" register={register} />
              {errors.supplierName && <p className="text-red-500 text-sm mt-1 text-[13px]">{errors.supplierName.message}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 items-center">
              <label className="text-[#666666] block">Supplier contact number</label>
              <Input height="9" className="border-[#cccccc]" type="text" placeholder="Enter supplier contact" name="supplierContact" register={register} />
              {errors.supplierContact && <p className="text-red-500 text-sm mt-1 text-[13px]">{errors.supplierContact.message}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 items-center">
              <label className="text-[#666666] block">Supplier email address</label>
              <Input height="9" className="border-[#cccccc]" type="text" placeholder="Enter supplier email" name="supplierEmail" register={register} />
              {errors.supplierEmail && <p className="text-red-500 text-sm mt-1 text-[13px]">{errors.supplierEmail.message}</p>}
            </div>

          </div>
          <div className="flex items-center gap-10 mb-3">
            <label className="text-[#666666] block text-[13px] w-[11.8vw]">
              Indicates whether the chemical is available in warehouse storage
            </label>
            <div className="flex gap-7">
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  id="available"
                  value="available"
                  {...register("availability")}
                />
                <label htmlFor="available" className="text-[#666666] text-[13px]">Available</label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  id="notavailable"
                  value="notavailable"
                  {...register("availability")}
                />
                <label htmlFor="notavailable" className="text-[#666666] text-[13px]">Not Available</label>
              </div>
            </div>
          </div>
          {errors.availability && (
            <p className="text-red-500 text-sm mt-1">{errors.availability.message}</p>
          )}
          <Button type="submit" className={`bg-[${yellowButtonColor}] text-white flex`}>Save</Button>
        </form>

      </DialogContent>
    </Dialog>
  )
}

export default NewItemForm;
