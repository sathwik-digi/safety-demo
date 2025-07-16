import React, { useState } from "react";
import {useNavigate } from "react-router-dom";
import {factories} from "../../constants"
// import {
//   Pagination,
//   PaginationContent,
//   PaginationEllipsis,
//   PaginationItem,
//   PaginationLink,
//   PaginationNext,
//   PaginationPrevious,
// } from "@/components/ui/pagination"

function FactoryList() {
  const [filterType, setFilterType] = useState("District");
  const [statusFilter, setStatusFilter] = useState("All Factory's / Industries");
  const navigate = useNavigate();

  const statusOptions = [
    "All Factory's / Industries",
    "Pending Application",
    "Resubmitted Application",
    "Approved Application",
    "Layout Approval",
    "Rejected Application",
  ];

  const statusMap = {
    "All Factory's / Industries": "Accepted",
    "Pending Application": "Waiting",
    "Resubmitted Application": "Resubmitted",
    "Approved Application": "Pending",
    "Layout Approval": "Verify",
    "Rejected Application": "Rejected",
  };

  

  const getStatusColor = (status) => {
    switch (status) {
      case "Accepted":
        return "text-green-600";
      case "Rejected":
        return "text-red-600";
      case "Waiting":
      case "Pending":
        return "text-yellow-600";
      case "Resubmitted":
        return "text-blue-600";
      case "Verify":
        return "text-purple-600";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Dropdown Filter */}
      <div className="flex justify-end mb-4">
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none"
        >
          <option value="District">District</option>
          <option value="City">City</option>
        </select>
      </div>

      {/* Status Filter Tabs */}
      <div className="flex flex-wrap gap-3 mb-6">
        {statusOptions.map((status, idx) => (
          <button
            key={idx}
            onClick={() => setStatusFilter(status)}
            className={`px-5 py-2 rounded-full shadow text-[12px] font-medium ${
              statusFilter === status
                ? "bg-[#fed36a] text-white"
                : "bg-white text-black"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Factory List */}
        {factories
          .filter((factory) => factory.status === statusMap[statusFilter])
          .map((factory, idx) => (
            <div
              key={idx}
              className="flex gap-5 border-b border-gray-300 py-6 items-center cursor-pointer"
              onClick={() => navigate('/factory-details', { state: { factory } })}
            >
              <img
                src={factory.logo}
                alt={factory.name}
                className="w-20 h-20 object-contain"
              />
              <div>
                <h2 className="text-[32px] font-bold text-gray-900">
                  {factory.name}
                </h2>
                <p className="text-[14px] font-normal text-[#565959] mb-1">
                  {factory.description}
                </p>
                <p className="text-[14px] font-normal text-[#18191A]">
                  {factory.address}
                </p>
                <a
                  href={factory.link}
                  className="text-[14px] font-normal text-[#565959] underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {factory.link}
                </a>
                {/* Status Display */}
                <p
                  className={`text-[14px] font-medium mt-1 ${getStatusColor(factory.status)}`}
                >
                  • {factory.status}
                </p>
              </div>
            </div>
        ))}

    {/* <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination> */}


    </div>
  );
}

export default FactoryList;
