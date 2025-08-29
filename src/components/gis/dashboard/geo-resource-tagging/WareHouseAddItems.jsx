import React, { useState } from "react";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import NewItemForm from "./NewItemForm";
import { useSelector } from "react-redux";

const WareHouseAddItems = () => {

  const items = useSelector((state)=>state.wareHouseItems.items);
  console.log(items,"these are from redux...");

  const data = [
    {
      name: "Sodium Chloride",
      type: "Inorganic Compound",
      quantity: 75
    },
    {
      name: "Ethanol",
      type: "Organic Compound",
      quantity: 92
    },
    {
      name: "Sulfuric Acid",
      type: "Acid",
      quantity: 68
    },
    {
      name: "Ammonium Hydroxide",
      type: "Base",
      quantity: 83
    }
  ];
  

  return (
    <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Add</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Warehouse Items here</DialogTitle>
          </DialogHeader>
          {data && data.map((i,index)=>(
            <div className="border border-[#EAECF0] px-4 py-2" key={index}>
              <div className=" flex justify-between">
                <div>
                  <p className="font-medium text-[20px]">{i.name}</p>
                  <p className="text-[#667085]">{i.type}</p>
                </div>
                <p className="underline underline-offset-2">Details</p>
              </div>
              <div className="flex items-center">
                <div className={`h-2 w-[15vw] bg-[#DBFAE6] mr-1`}></div>
                <p className="font-bold">{i.quantity}</p>
              </div>
            </div>
          ))} 
          <NewItemForm isGeo={true} />
        </DialogContent>
    </Dialog>
  )
}

export default WareHouseAddItems;