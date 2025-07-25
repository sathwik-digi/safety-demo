// import React from "react";

// function RoleBaseAccess() {


//   return (
//     <div>
//         Sathwik is an.
//     </div>
//   );
// }

// export default RoleBaseAccess;


import React, { useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import AddIcon from "../../../assets/Icons/add-icon.png";
import EditRoleIcon from "../../../assets/Icons/edit-role-icon.png";
import DeleteRoleIcon from "../../../assets/Icons/delete-role-icon.png";
import PermissionsIcon from "../../../assets/Icons/permissions-icon.png"
import ApproveIcon from "../../../assets/Icons/approve-icon.png"
import { useNavigate } from "react-router-dom";

// ✅ Sample data
const data = [
  { id: "m5gr84i9", location: "kakinada, Ap", phoneNumber: "+9718677334", Role: "sub admin-1", status: "success", email: "ken99@example.com" },
  { id: "3u1reuv4", location: "kakinada, Ap", phoneNumber: "+9718677334", Role: "sub admin-2", status: "success", email: "Abe45@example.com" },
  { id: "derv1ws0", location: "kakinada, Ap", phoneNumber: "+9718677334", Role: "sub admin-1", status: "processing", email: "Monserrat44@example.com" },
  { id: "5kma53ae", location: "kakinada, Ap", phoneNumber: "+9718677334", Role: "sub admin-2", status: "success", email: "Silas22@example.com" },
  { id: "bhqecj4p", location: "kakinada, Ap", phoneNumber: "+9718677334", Role: "sub admin-1", status: "failed", email: "carmella@example.com" },
]

export default function RoleBaseAccess() {
  const [sorting, setSorting] = React.useState([])
  const [columnFilters, setColumnFilters] = React.useState([])
  const [columnVisibility, setColumnVisibility] = React.useState({})
  const [rowSelection, setRowSelection] = React.useState({})
  const navigate = useNavigate();

  // ✅ Define columns inside useMemo
  const columns = React.useMemo(() => [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("status")}</div>
      ),
    },
    {
      accessorKey: "email",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("email")}</div>
      ),
    },
    {
      accessorKey: "role",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Role
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("role")}</div>
      ),
    },
    {
      accessorKey: "location",
      header: () => <div className="text-right">Location</div>,
      cell: ({ row }) => {
        const location = parseFloat(row.getValue("location"))
        // const formatted = new Intl.NumberFormat("en-US", {
        //   style: "currency",
        //   currency: "USD",
        // }).format(location)
        return <div className="text-right font-medium">{location}</div>
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const payment = row.original
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {/* <DropdownMenuItem onClick={() => navigator.clipboard.writeText(payment.id)}>
                Copy payment ID
              </DropdownMenuItem> */}
              <DropdownMenuItem onClick={() => navigate('/gis/edit-role')}><img src={EditRoleIcon} className="w-5 h-5" />Edit</DropdownMenuItem>
              <DropdownMenuItem><img src={DeleteRoleIcon} className="w-4 h-4" />Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ], [])

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  const [activeButton, setActiveButton] = useState(true);

  return (
    <div className="w-full">
      <div className="flex items-center justify-around ml-[36vw] mt-[2.5vw]">
        <div className="flex items-center gap-2">
          <button className={`rounded-l-lg p-3 px-5 ${activeButton ? "border-[#fed36a] border-[1.5px] text-[#fed36a] font-medium" : "shadow-md"}`} onClick={() => setActiveButton((prev) => !prev)}>Sub Admin's</button>
          <div className="w-[2px] h-[4vw] border-r-1 border-gray-300"></div>
          <button className={`rounded-r-lg p-3 px-5 ${activeButton ? "shadow-md/20" : "border-[#fed36a] border-[1.5px] text-[#fed36a] font-semibold"}`} onClick={() => setActiveButton((prev) => !prev)}>Permissions</button>
        </div>
        <div>
          <Dialog>
            <form>
              <DialogTrigger asChild>
                 <Button className="bg-[#fed36a] text-white"><img src={AddIcon} className="w-4 h-4" /> Add person</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <div className="grid gap-4">
                  <div className="grid gap-3">
                    <Label htmlFor="name-1">Add New Sub Admin</Label>
                    <Input id="name-1" name="name" placeholder="Search the Person" />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="username-1">Email Id</Label>
                    <Input id="username-1" name="username" placeholder="@gmail.com" />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="name-1">Add Phone Number</Label>
                    <Input id="name-1" name="name" placeholder="+91" />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="username-1">Sub Admin Role</Label>
                    <Input id="username-1" name="username" placeholder="If Required" />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="name-1">ID Number</Label>
                    <Input id="name-1" name="name" />
                  </div>
                </div>
                <div className="flex justify-center gap-5">
                    <Button type="button" onClick={()=>navigate('/gis/role-permissions')} className="bg-[#e4c811] text-white w-40 rounded-[3px]"><img src={PermissionsIcon} className="w-6 h-6"/>Permission's</Button>
                    <Button type="submit" className="bg-[#34a853] text-white w-40 rounded-[3px]"><img src={ApproveIcon} className="w-7  h-4" />Approve Access</Button>
                </div>
              </DialogContent>
            </form>
          </Dialog>
        </div>
      </div>

      <div className="flex items-center py-4">
        <Input
          placeholder="Filter emails..."
          value={table.getColumn("email")?.getFilterValue() ?? ""}
          onChange={(e) =>
            table.getColumn("email")?.setFilterValue(e.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) =>
                    column.toggleVisibility(!!value)
                  }
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={table.getAllLeafColumns().length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-muted-foreground flex-1 text-sm">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
