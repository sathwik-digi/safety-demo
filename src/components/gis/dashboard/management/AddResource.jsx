import React from "react";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { yellowButtonColor } from "../../../../lib/theme";

const AddResource = () => {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline">Add New Resource</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>New Resource</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 items-center gap-3">
              <Label htmlFor="name">Resource name</Label>
              <Input id="name" name="name"  placeholder="Enter product name" />
            </div>
            <div className="grid grid-cols-2 items-center gap-3">
              <Label htmlFor="resource-id">Resource ID</Label>
              <Input id="resource-id" name="resourceId" placeholder="Enter product ID" />
            </div>
            <div className="grid grid-cols-2 items-center gap-3">
              <Label htmlFor="quantity">Quantity</Label>
              <select
                id="quantity"
                name="quantity"
                className="border border-input bg-background px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                defaultValue=""
              >
                <option value="" disabled>Enter Item quantity No</option>
                {Array.from({ length: 15 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-2 items-center gap-3">
              <Label htmlFor="maintained-date">Maintained Date</Label>
              <Input
                type="date"
                id="maintained-date"
                name="maintainedDate"
                placeholder="Select maintained date"
                className="text-sm"
              />
            </div>
            <div className="grid grid-cols-2 items-center gap-3">
              <Label htmlFor="expiry-date">Expiry Date</Label>
              <Input
                type="date"
                id="expiry-date"
                name="expiryDate"
                placeholder="Select expiry date"
                className="text-sm"
              />
            </div>
          </div>
          <DialogFooter className="flex justify-center pt-4">
            <Button type="submit" style={{ backgroundColor: yellowButtonColor }}>Update & Save</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}

export default AddResource;
