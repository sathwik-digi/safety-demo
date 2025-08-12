import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { networkHandler } from "../../../https/networkHandler";
import onesubseaLogo from "../../../assets/Images/onesubsea_logo.png";

function FactoryList() {
  const [filterType, setFilterType] = useState("District");
  const [statusFilter, setStatusFilter] = useState("All Factory's / Industries");
  const [dynamicFactories, setDynamicFactories] = useState([]);

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

  useEffect(() => {
    const factoriesList = async () => {
      try {
        const res = await networkHandler.get("irt","/users/getAllFactories");
        setDynamicFactories(res || []);
      } catch (error) {
        console.error("Error fetching factoriesList:", error);
      }
    };
    factoriesList();
  }, []);

  const selectedStatus = statusMap[statusFilter];

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
              statusFilter === status ? "bg-[#fed36a] text-white" : "bg-white text-black"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Factory List */}
      {dynamicFactories.map((factory) => (
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
              {factory.name}
            </h2>
            <p className="text-[14px] font-normal text-[#565959] mb-1">
              Production, Manufacturing & Processing Technology
            </p>
            <p className="text-[14px] font-normal text-[#18191A]">{factory.factoryAddress}</p>
            <a
              href="https://www.onesubsea.slb.com/"
              className="text-[14px] font-normal text-[#565959] underline block"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://www.onesubsea.slb.com/
            </a>
            <p className={`text-[14px] font-medium mt-1 ${getStatusColor(selectedStatus)}`}>
              • {selectedStatus}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default FactoryList;
