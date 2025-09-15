import React from "react";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import {yellowButtonColor} from "../../../../lib/theme";
import { Input } from "@/components/ui/input"
import { useDispatch } from "react-redux";
import { saveItem } from "../../../../redux/slices/wareHouseItemsSlice";

const NewItemForm = () => {

  const dispatch = useDispatch();

  const handleSubmit=()=>{
    console.log("going inside form submit...")
    dispatch(saveItem({name:"siva"}));
  }

  return (
    <Dialog>
       <form className="space-y-3" onSubmit={handleSubmit}>
        <DialogTrigger asChild>
          <Button className={`bg-[${yellowButtonColor}] text-white`}>Add new item</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>New Item</DialogTitle>
          </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 items-center">
              <label className="text-[#666666] block mb-1">Item Name</label>
              <Input className="border-[#cccccc]" type="text" placeholder="Enter product name" name="name" />
              {/* {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>} */}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 items-center">
              <label className="text-[#666666] block mb-1">Item ID</label>
              <Input className="border-[#cccccc]" type="text" placeholder="Enter product ID" name="name" />
              {/* {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>} */}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 items-center">
              <label className="text-[#666666] block mb-1">Category</label>
              <Input className="border-[#cccccc]" type="text" placeholder="Select product category" name="name" />
              {/* {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>} */}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 items-center">
              <label className="text-[#666666] block mb-1">Expiry Date</label>
              <Input className="border-[#cccccc]" type="text" placeholder="Enter expiry date" name="name" />
              {/* {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>} */}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 items-center">
              <label className="text-[#666666] block mb-1">Quantity</label>
              <Input className="border-[#cccccc]" type="text" placeholder="Enter product quantity" name="name" />
              {/* {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>} */}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 items-center">
              <label className="text-[#666666] block mb-1">On the way</label>
              <Input className="border-[#cccccc]" type="text" placeholder="Enter product unit" name="name" />
              {/* {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>} */}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 items-center">
              <label className="text-[#666666] block mb-1">Threshold Value</label>
              <Input className="border-[#cccccc]" type="text" placeholder="Enter threshold value" name="name" />
              {/* {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>} */}
            </div>
          <DialogClose asChild>
            <Button type="submit" className={`bg-[${yellowButtonColor}] text-white`}>Save</Button>
          </DialogClose>
        </DialogContent>
        </form>
    </Dialog>
  )
}

export default NewItemForm;