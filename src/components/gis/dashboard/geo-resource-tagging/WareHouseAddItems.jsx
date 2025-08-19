import React from "react";
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
  console.log(items,"these are from redux...")

  return (
    <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Add</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Warehouse Items here</DialogTitle>
          </DialogHeader>

          <NewItemForm />
        </DialogContent>
    </Dialog>
  )
}

export default WareHouseAddItems;