import React, { useState } from "react";
import onesubseaLogo from "../../assets/Images/onesubsea_logo.png";
import BakerHughesLogo from "../../assets/Images/BakerHughes.png";
import UniversalBiofuelsLogo from "../../assets/Images/UniversalBiofuels.png";
import LohiyaEdibleLogo from "../../assets/Images/LohiyaEdible.png";
import Kaleesuwari from "../../assets/Images/ksw_logo.png";
import Coromandel from "../../assets/Images/CIL-logo.png";
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

  const factories = [
    {
      name: "One subsea",
      logo: onesubseaLogo,
      description: "Production, Manufacturing & Processing Technology",
      address: "23BP & 24OP, Vakalapudi, Kakinada Industrial Area, Kakinada, Andhra Pradesh 533005",
      link: "https://www.onesubsea.slb.com/",
      status: "Accepted",
    },
    {
      name: "Baker Hughes SPS Service Base",
      logo: BakerHughesLogo,
      description: "Support Equipment lifecycle Management",
      address: "S and 6, 12A/1 Supply Base Facility, ONGC Logistics Park, Baker Hughes SPS Service Base, 12A/5A and 5B, ADB Road, Thammavaram, Andhra Pradesh 533005",
      link: "https://www.bakerhughes.com/subsea/subsea-services",
      status: "Accepted",
    },
    {
      name: "Universal Biofuels Private Limited",
      logo: UniversalBiofuelsLogo,
      description: "Industrial manufacturing of Renewable Chemicals, Fuels & Natural oils",
      address: "Kakinada Industrial Area, Kakinada, Andhra Pradesh 533005",
      link: "http://www.universalbiofuelsltd.com/",
      status: "Accepted",
    },
    {
      name: "Lohiya Edible Oil Company",
      logo: LohiyaEdibleLogo,
      description: "Edible Oil Industry",
      address: "Kakinada Industrial Area, Kakinada, Andhra Pradesh 533005",
      link: "https://lohiyagroup.in/",
      status: "Accepted",
    },
    {
      name: "Kaleesuwari Refinery & Industry Pvt. LTD",
      logo: Kaleesuwari,
      description: "Edible Oil, Oil & Natural Gas Company",
      address: "Phase-III, Industrial Park, Vakalapudi, Kakinada, Andhra Pradesh 533005",
      link: "https://kaleesuwari.com/",
      status: "Accepted",
    },
    {
      name: "Coromandel International ltd",
      logo: Coromandel,
      description: "Chemical plant",
      address: "87/A, Dr No16-22, Samalkota-Kakinada Bypass, Kakinada Port, Kakinada, Andhra Pradesh 533001",
      link: "https://www.coromandel.biz/",
      status: "Accepted",
    },
    {
      name: "One subsea",
      logo: onesubseaLogo,
      description: "Production, Manufacturing & Processing Technology",
      address: "23BP & 24OP, Vakalapudi, Kakinada Industrial Area, Kakinada, Andhra Pradesh 533005",
      link: "https://www.onesubsea.slb.com/",
      status: "Waiting",
    },
    {
      name: "Baker Hughes SPS Service Base",
      logo: BakerHughesLogo,
      description: "Support Equipment lifecycle Management",
      address: "S and 6, 12A/1 Supply Base Facility, ONGC Logistics Park, Baker Hughes SPS Service Base, 12A/5A and 5B, ADB Road, Thammavaram, Andhra Pradesh 533005",
      link: "https://www.bakerhughes.com/subsea/subsea-services",
      status: "Waiting",
    },
    {
      name: "Universal Biofuels Private Limited",
      logo: UniversalBiofuelsLogo,
      description: "Industrial manufacturing of Renewable Chemicals, Fuels & Natural oils",
      address: "Kakinada Industrial Area, Kakinada, Andhra Pradesh 533005",
      link: "http://www.universalbiofuelsltd.com/",
      status: "Waiting",
    },
    {
      name: "Lohiya Edible Oil Company",
      logo: LohiyaEdibleLogo,
      description: "Edible Oil Industry",
      address: "Kakinada Industrial Area, Kakinada, Andhra Pradesh 533005",
      link: "https://lohiyagroup.in/",
      status: "Waiting",
    },
    {
      name: "Kaleesuwari Refinery & Industry Pvt. LTD",
      logo: Kaleesuwari,
      description: "Edible Oil, Oil & Natural Gas Company",
      address: "Phase-III, Industrial Park, Vakalapudi, Kakinada, Andhra Pradesh 533005",
      link: "https://kaleesuwari.com/",
      status: "Waiting",
    },
    {
      name: "Coromandel International ltd",
      logo: Coromandel,
      description: "Chemical plant",
      address: "87/A, Dr No16-22, Samalkota-Kakinada Bypass, Kakinada Port, Kakinada, Andhra Pradesh 533001",
      link: "https://www.coromandel.biz/",
      status: "Waiting",
    },
    {
      name: "One subsea",
      logo: onesubseaLogo,
      description: "Production, Manufacturing & Processing Technology",
      address: "23BP & 24OP, Vakalapudi, Kakinada Industrial Area, Kakinada, Andhra Pradesh 533005",
      link: "https://www.onesubsea.slb.com/",
      status: "Resubmitted",
    },
    {
      name: "Baker Hughes SPS Service Base",
      logo: BakerHughesLogo,
      description: "Support Equipment lifecycle Management",
      address: "S and 6, 12A/1 Supply Base Facility, ONGC Logistics Park, Baker Hughes SPS Service Base, 12A/5A and 5B, ADB Road, Thammavaram, Andhra Pradesh 533005",
      link: "https://www.bakerhughes.com/subsea/subsea-services",
      status: "Resubmitted",
    },
    {
      name: "Universal Biofuels Private Limited",
      logo: UniversalBiofuelsLogo,
      description: "Industrial manufacturing of Renewable Chemicals, Fuels & Natural oils",
      address: "Kakinada Industrial Area, Kakinada, Andhra Pradesh 533005",
      link: "http://www.universalbiofuelsltd.com/",
      status: "Resubmitted",
    },
    {
      name: "Lohiya Edible Oil Company",
      logo: LohiyaEdibleLogo,
      description: "Edible Oil Industry",
      address: "Kakinada Industrial Area, Kakinada, Andhra Pradesh 533005",
      link: "https://lohiyagroup.in/",
      status: "Resubmitted",
    },
    {
      name: "Kaleesuwari Refinery & Industry Pvt. LTD",
      logo: Kaleesuwari,
      description: "Edible Oil, Oil & Natural Gas Company",
      address: "Phase-III, Industrial Park, Vakalapudi, Kakinada, Andhra Pradesh 533005",
      link: "https://kaleesuwari.com/",
      status: "Resubmitted",
    },
    {
      name: "Coromandel International ltd",
      logo: Coromandel,
      description: "Chemical plant",
      address: "87/A, Dr No16-22, Samalkota-Kakinada Bypass, Kakinada Port, Kakinada, Andhra Pradesh 533001",
      link: "https://www.coromandel.biz/",
      status: "Resubmitted",
    },
     {
      name: "One subsea",
      logo: onesubseaLogo,
      description: "Production, Manufacturing & Processing Technology",
      address: "23BP & 24OP, Vakalapudi, Kakinada Industrial Area, Kakinada, Andhra Pradesh 533005",
      link: "https://www.onesubsea.slb.com/",
      status: "Pending",
    },
    {
      name: "Baker Hughes SPS Service Base",
      logo: BakerHughesLogo,
      description: "Support Equipment lifecycle Management",
      address: "S and 6, 12A/1 Supply Base Facility, ONGC Logistics Park, Baker Hughes SPS Service Base, 12A/5A and 5B, ADB Road, Thammavaram, Andhra Pradesh 533005",
      link: "https://www.bakerhughes.com/subsea/subsea-services",
      status: "Pending",
    },
    {
      name: "Universal Biofuels Private Limited",
      logo: UniversalBiofuelsLogo,
      description: "Industrial manufacturing of Renewable Chemicals, Fuels & Natural oils",
      address: "Kakinada Industrial Area, Kakinada, Andhra Pradesh 533005",
      link: "http://www.universalbiofuelsltd.com/",
      status: "Pending",
    },
    {
      name: "Lohiya Edible Oil Company",
      logo: LohiyaEdibleLogo,
      description: "Edible Oil Industry",
      address: "Kakinada Industrial Area, Kakinada, Andhra Pradesh 533005",
      link: "https://lohiyagroup.in/",
      status: "Pending",
    },
    {
      name: "Kaleesuwari Refinery & Industry Pvt. LTD",
      logo: Kaleesuwari,
      description: "Edible Oil, Oil & Natural Gas Company",
      address: "Phase-III, Industrial Park, Vakalapudi, Kakinada, Andhra Pradesh 533005",
      link: "https://kaleesuwari.com/",
      status: "Pending",
    },
    {
      name: "Coromandel International ltd",
      logo: Coromandel,
      description: "Chemical plant",
      address: "87/A, Dr No16-22, Samalkota-Kakinada Bypass, Kakinada Port, Kakinada, Andhra Pradesh 533001",
      link: "https://www.coromandel.biz/",
      status: "Pending",
    },
     {
      name: "One subsea",
      logo: onesubseaLogo,
      description: "Production, Manufacturing & Processing Technology",
      address: "23BP & 24OP, Vakalapudi, Kakinada Industrial Area, Kakinada, Andhra Pradesh 533005",
      link: "https://www.onesubsea.slb.com/",
      status: "Verify",
    },
    {
      name: "Baker Hughes SPS Service Base",
      logo: BakerHughesLogo,
      description: "Support Equipment lifecycle Management",
      address: "S and 6, 12A/1 Supply Base Facility, ONGC Logistics Park, Baker Hughes SPS Service Base, 12A/5A and 5B, ADB Road, Thammavaram, Andhra Pradesh 533005",
      link: "https://www.bakerhughes.com/subsea/subsea-services",
      status: "Verify",
    },
    {
      name: "Universal Biofuels Private Limited",
      logo: UniversalBiofuelsLogo,
      description: "Industrial manufacturing of Renewable Chemicals, Fuels & Natural oils",
      address: "Kakinada Industrial Area, Kakinada, Andhra Pradesh 533005",
      link: "http://www.universalbiofuelsltd.com/",
      status: "Verify",
    },
    {
      name: "Lohiya Edible Oil Company",
      logo: LohiyaEdibleLogo,
      description: "Edible Oil Industry",
      address: "Kakinada Industrial Area, Kakinada, Andhra Pradesh 533005",
      link: "https://lohiyagroup.in/",
      status: "Verify",
    },
    {
      name: "Kaleesuwari Refinery & Industry Pvt. LTD",
      logo: Kaleesuwari,
      description: "Edible Oil, Oil & Natural Gas Company",
      address: "Phase-III, Industrial Park, Vakalapudi, Kakinada, Andhra Pradesh 533005",
      link: "https://kaleesuwari.com/",
      status: "Verify",
    },
    {
      name: "Coromandel International ltd",
      logo: Coromandel,
      description: "Chemical plant",
      address: "87/A, Dr No16-22, Samalkota-Kakinada Bypass, Kakinada Port, Kakinada, Andhra Pradesh 533001",
      link: "https://www.coromandel.biz/",
      status: "Verify",
    },
    {
      name: "One subsea",
      logo: onesubseaLogo,
      description: "Production, Manufacturing & Processing Technology",
      address: "23BP & 24OP, Vakalapudi, Kakinada Industrial Area, Kakinada, Andhra Pradesh 533005",
      link: "https://www.onesubsea.slb.com/",
      status: "Rejected",
    },
    {
      name: "Baker Hughes SPS Service Base",
      logo: BakerHughesLogo,
      description: "Support Equipment lifecycle Management",
      address: "S and 6, 12A/1 Supply Base Facility, ONGC Logistics Park, Baker Hughes SPS Service Base, 12A/5A and 5B, ADB Road, Thammavaram, Andhra Pradesh 533005",
      link: "https://www.bakerhughes.com/subsea/subsea-services",
      status: "Rejected",
    },
    {
      name: "Universal Biofuels Private Limited",
      logo: UniversalBiofuelsLogo,
      description: "Industrial manufacturing of Renewable Chemicals, Fuels & Natural oils",
      address: "Kakinada Industrial Area, Kakinada, Andhra Pradesh 533005",
      link: "http://www.universalbiofuelsltd.com/",
      status: "Rejected",
    },
    {
      name: "Lohiya Edible Oil Company",
      logo: LohiyaEdibleLogo,
      description: "Edible Oil Industry",
      address: "Kakinada Industrial Area, Kakinada, Andhra Pradesh 533005",
      link: "https://lohiyagroup.in/",
      status: "Rejected",
    },
    {
      name: "Kaleesuwari Refinery & Industry Pvt. LTD",
      logo: Kaleesuwari,
      description: "Edible Oil, Oil & Natural Gas Company",
      address: "Phase-III, Industrial Park, Vakalapudi, Kakinada, Andhra Pradesh 533005",
      link: "https://kaleesuwari.com/",
      status: "Rejected",
    },
    {
      name: "Coromandel International ltd",
      logo: Coromandel,
      description: "Chemical plant",
      address: "87/A, Dr No16-22, Samalkota-Kakinada Bypass, Kakinada Port, Kakinada, Andhra Pradesh 533001",
      link: "https://www.coromandel.biz/",
      status: "Rejected",
    },
  ];

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
                ? "bg-yellow-300 text-white"
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
              className="flex gap-5 border-b border-gray-300 py-6 items-center"
              // onClick={}
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
