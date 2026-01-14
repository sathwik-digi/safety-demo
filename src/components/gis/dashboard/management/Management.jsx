import React, { useState } from "react";
import { yellowButtonColor } from "../../../../lib/theme";
import AddResource from "./AddResource"
import AddMockDrill from "./AddMockDrill";
import ResourceManagement from "./ResourceManagement";
import InventoryManagement from "./InventoryManagement";
import MockDrill from "./MockDrill";
import NewItemForm from "../geo-resource-tagging/NewItemForm"

function Management() {
  const [activeTab, setActiveTab] = useState("resource");

  const getButtonText = () => {
    switch (activeTab) {
      case "inventory":
        return "Add New Inventory";
      case "resource":
        return "Add New Resource";
      case "mockdrill":
        return "Upload New Mock Drill";
      default:
        return "Add";
    }
  };

  return (
    <div className="p-6 mt-10 bg-white rounded-md">
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-6">
        <div></div>
        {
          activeTab === "inventory" && (<NewItemForm />)
        }
        {
          activeTab === "mockdrill" && (<AddMockDrill />)
        }
        {
          activeTab === "resource" && (<AddResource />)
        }
      </div>
      {/* Tabs */}
      <div className="flex justify-center space-x-4 mb-6">
        {[
          { key: "inventory", label: "Inventory Management" },
          { key: "resource", label: "Resource Management" },
          { key: "mockdrill", label: "MockDrill" },
        ].map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`px-4 py-2 rounded-md shadow ${
              activeTab === key ? "text-white" : "bg-white text-black border"
            }`}
            style={activeTab === key ? { backgroundColor: yellowButtonColor } : {}}
          >
            {label}
          </button>
        ))}
      </div>
        {
          activeTab === "inventory" && (< InventoryManagement/>)
        }
        {
          activeTab === "resource" && (<ResourceManagement />)
        }
        {
          activeTab === "mockdrill" && (<MockDrill />)
        }
    </div>
    
  );
}

export default Management;
