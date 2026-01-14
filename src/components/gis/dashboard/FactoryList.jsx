import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { networkHandler } from "../../../https/networkHandler";
import onesubseaLogo from "../../../assets/Images/onesubsea_logo.png";

function FactoryList() {
  const [filterType, setFilterType] = useState("District");
  const [selectedStatus, setSelectedStatus] = useState("waiting");
  const [dynamicFactories, setDynamicFactories] = useState([]);
  // const [filteredData, setFilteredData] = useState([]);

  const navigate = useNavigate();

  const statusMap = {
    "All Factory's / Industries": "approved",
    "Pending Application": "waiting",
    "Resubmitted Application": "resubmission",
    "Approved Application": "pending_gis",
    "Layout Approval": "verify",
    "Rejected Application": "rejected",
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "text-green-600";
      case "rejected":
        return "text-red-600";
      case "waiting":
        return "text-[#FED36A]";
      case "pending_gis":
        return "text-[#DB8A19]";
      case "resubmission":
        return "text-blue-600";
      case "verify":
        return "text-purple-600";
      default:
        return "text-gray-500";
    }
  };

  const capitalLetter=(s)=>{
    return s[0].toUpperCase()+s.slice(1,s.length);
  }

  useEffect(() => {
    const factoriesList = async () => {
      try {
        const res = await networkHandler.get("user", "/users/getAllFactories");
        setDynamicFactories(res || []);
      } catch (error) {
        console.error("Error fetching factoriesList:", error);
      }
    };
    factoriesList();
  }, []);


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
        {Object.keys(statusMap).map((status, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedStatus(statusMap[status])}
            className={`px-5 py-2 rounded-full shadow text-[12px] font-medium ${selectedStatus === statusMap[status] ? "bg-[#fed36a] text-white" : "bg-white text-black"}`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Factory List */}
      {dynamicFactories.length > 0 && dynamicFactories.filter(factory => selectedStatus === factory.status).length > 0 ? (dynamicFactories.filter(factory => selectedStatus === factory.status).map((factory) => (
        <div
        key={factory.id}
        className="flex flex-col sm:flex-row gap-4 sm:gap-5 border-b border-gray-300 py-6 cursor-pointer"
        onClick={() => navigate("/gis/factory-details", { state: factory })}
      >
        <img
          src={onesubseaLogo}
          alt={factory.name}
          className="w-20 h-20 object-contain self-center sm:self-start"
        />
        <div className="flex-1 text-center sm:text-left">
          <h2 className="text-[24px] sm:text-[32px] font-bold text-gray-900">
            {factory.factoryIdentication.name}
          </h2>
          <p className="text-[14px] font-normal text-[#565959] mb-1">
            Production, Manufacturing & Processing Technology
          </p>
          <p className="text-[14px] font-normal text-[#18191A]">
          {`${factory.factoryIdentication.factoryPremises}, ${factory.factoryIdentication.city}, ${factory.factoryIdentication.district}, ${factory.factoryIdentication.state}, ${factory.factoryIdentication.pincode}`}
          </p>
          <a
            href="https://www.onesubsea.slb.com/"
            className="text-[14px] font-normal text-[#565959] underline block"
            target="_blank"
            rel="noopener noreferrer"
          >
            {factory.factoryIdentication.websiteLink || "https://www.onesubsea.slb.com"}
          </a>
          <p className={`text-[14px] font-medium mt-1 ${getStatusColor(selectedStatus)}`}>
            • { capitalLetter(selectedStatus === "pending_gis" ? "pending" : selectedStatus=== "resubmission" ? "resubmitted" : selectedStatus) }
          </p>
        </div>
      </div>)))
        : (<div className="flex justify-center font-medium">No items to display</div>)
      }
    </div>
  )
}


export default FactoryList;
