import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { irtTreeHierarchy } from "../../../constants";
import { Tree, TreeNode } from "react-organizational-chart";

function IncidentTree() {
  const [activeTab, setActiveTab] = useState("response");
  const [expandedNodes, setExpandedNodes] = useState({});

  const countChildren = (node) => node.children?.length || 0;

  const toggleExpand = (nodeId) => {
    setExpandedNodes((prev) => ({
      ...prev,
      [nodeId]: !prev[nodeId],
    }));
  };

  const RenderNode = ({ node }) => {
  const isExpanded = expandedNodes[node.id];
  return (
    <TreeNode
      label={
        <div className="flex flex-col items-center">
          {/* Parent Role Box */}
          <div className={`px-4 py-2 rounded-md text-white font-bold text-center shadow-md`}
            style={{ backgroundColor: node.colorCode || "#333" }}>
            {node.role}
          </div>

          {/* Line between Role and Badge/Button */}
          {countChildren(node) > 0 && (
            <div className="w-[2px] h-4 bg-[#C5C4C2]" />
          )}

          {/* Count Badge or Hide Button */}
          {countChildren(node) > 0 && (
            <div className="">
              {isExpanded ? (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleExpand(node.id);
                  }}
                  className="bg-white border-2 border-[#D0CECE] rounded-full px-3 py-1 text-[#FED36A] font-semibold cursor-pointer">
                  Hide
                </button>
              ) : (
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleExpand(node.id);
                  }}
                  className="bg-white border-2 border-[#D0CECE] rounded-full w-8 h-8 leading-[30px] text-center text-[#FED36A] font-semibold text-[16px] cursor-pointer">
                  {countChildren(node)}
                </div>
              )}
            </div>
          )}
        </div>
      }
    >
      {isExpanded &&
        node.children.map((child) => (
          <RenderNode key={child.id} node={child} />
        ))}
    </TreeNode>
  );
};

  return (
    <div className="p-6">
      {/* Header and Search Bar Section */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-[36px] font-bold">Incident Response Teams</h2>
          <div className="w-[420px] h-[1px] bg-black mt-1"></div>
        </div>
        <div className="relative w-[420px]">
          <Input
            placeholder="Search name of the person"
            className="pl-10 pr-4 py-2 border border-gray-200 shadow-sm rounded-md"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>
      </div>

      {/* Tab Navigation Section */}
      <div className="flex justify-center gap-2 mb-10">
        <button
          onClick={() => setActiveTab("response")}
          className={`px-6 py-2 rounded-md border transition-all text-[16px] ${activeTab === "response"
            ? "font-semibold text-[#FED36A] border-yellow-400 shadow-yellow-200 shadow-md"
            : "font-normal text-black border-none bg-white shadow-md"
            }`}
        >
          Response System
        </button>
        <div className="w-px h-10 bg-[#D0CECE]"></div>
        <button
          onClick={() => setActiveTab("table")}
          className={`px-6 py-2 rounded-md border transition-all text-[16px] ${activeTab === "table"
            ? "font-semibold text-[#FED36A] border-yellow-400 shadow-yellow-200 shadow-md"
            : "font-normal text-black border-none bg-white shadow-md"
            }`}
        >
          Table System
        </button>
      </div>

      {/* Tree View Section */}
      {activeTab === "response" && (
        <div style={{ overflowX: "auto" }}>
          <Tree
            lineWidth={"2px"}
            lineColor={"#333"}
            lineBorderRadius={"10px"}>
            <RenderNode node={irtTreeHierarchy} />
          </Tree>
        </div>
      )}
    </div>
  );
}

export default IncidentTree;
