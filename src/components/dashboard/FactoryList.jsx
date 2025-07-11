import React, { useState } from "react";
import onesubseaLogo from "../../assets/Images/onesubsea_logo.png";
import BakerHughesLogo from "../../assets/Images/BakerHughes.png";
import UniversalBiofuelsLogo from "../../assets/Images/UniversalBiofuels.png";
import LohiyaEdibleLogo from "../../assets/Images/LohiyaEdible.png";
import Kaleesuwari from "../../assets/Images/ksw_logo.png"
import Coromandel from "../../assets/Images/CIL-logo.png"

function FactoryList() {
  const [filterType, setFilterType] = useState("District");

  const factories = [
    {
      name: "One subsea",
      logo: onesubseaLogo,
      description: "Production, Manufacturing & Processing Technology",
      address:
        "23BP & 24OP, Vakalapudi, Kakinada Industrial Area, Kakinada, Andhra Pradesh 533005",
      link: "https://www.onesubsea.slb.com/",
    },
    {
      name: "Baker Hughes SPS Service Base",
      logo: BakerHughesLogo,
      description: "Support Equipment lifecycle Management",
      address:
        "S and 6, 12A/1 Supply Base Facility, ONGC Logistics Park, Baker Hughes SPS Service Base, 12A/5A and 5B, ADB Road, Thammavaram, Andhra Pradesh 533005",
      link: "https://www.bakerhughes.com/subsea/subsea-services",
    },
    {
      name: "Universal Biofuels Private Limited",
      logo: UniversalBiofuelsLogo,
      description:
        "Industrial manufacturing of Renewable Chemicals, Fuels & Natural oils",
      address: "Kakinada Industrial Area, Kakinada, Andhra Pradesh 533005",
      link: "http://www.universalbiofuelsltd.com/",
    },
    {
      name: "Lohiya Edible Oil Company",
      logo: LohiyaEdibleLogo,
      description: "Edible Oil Industry",
      address: "Kakinada Industrial Area, Kakinada, Andhra Pradesh 533005",
      link: "https://lohiyagroup.in/",
    },
    {
      name: "Kaleesuwari Refinery & Industry Pvt. LTD",
      logo: Kaleesuwari,
      description: "Edible Oil, Oil & Natural Gas Company",
      address:
        "Phase-III, Industrial Park, Vakalapudi, Kakinada, Andhra Pradesh 533005",
      link: "https://kaleesuwari.com/",
    },
    {
      name: "Coromandel International ltd",
      logo: Coromandel,
      description: "Chemical plant",
      address:
        "87/A, Dr No16-22, Samalkota-Kakinada Bypass, Kakinada Port, Kakinada, Andhra Pradesh 533001",
      link: "https://www.coromandel.biz/",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Filter Dropdown */}
      <div className="flex justify-end mb-6">
        <div className="relative text-[14px] font-normal text-[#252C32]">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none"
          >
            <option value="District">District</option>
            <option value="City">City</option>
          </select>
        </div>
      </div>

      {/* Factory List */}
      {factories.map((factory, idx) => (
        <div
          key={idx}
          className="flex gap-5 border-b border-gray-300 py-6 items-center"
        >
          <img
            src={factory.logo}
            alt={factory.name}
            className="w-20 h-20 object-contain"
          />
          <div>
            <h2 className="text-[32px] font-bold text-gray-900">{factory.name}</h2>
            <p className="text-[14px] font-normal text-[#565959] mb-1">{factory.description}</p>
            <p className="text-[14px] font-normal text-[#18191A]">{factory.address}</p>
            <a
              href={factory.link}
              className="text-[14px] font-normal text-[#565959] underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {factory.link}
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}

export default FactoryList;
