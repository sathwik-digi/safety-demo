import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
// import { irtTreeHierarchy } from "../../../constants";
import { Tree, TreeNode } from "react-organizational-chart";
import { networkHandler } from "../../../https/networkHandler";

function IncidentTree() {
  const [activeTab, setActiveTab] = useState("response");
  const [expandedNodes, setExpandedNodes] = useState({});
  const [data, setData] = useState({});

  const countChildren = (node) => node.children?.length || 0;

  const toggleExpand = (nodeId) => {
    setExpandedNodes((prev) => ({
      ...prev,
      [nodeId]: !prev[nodeId],
    }));
  };

  useEffect(()=>{ 
    const getData= async()=>{
      const res = await networkHandler.get('/irt/getTree');
      console.log(res,"Response")
      setData(res.irtRole);
    }
    getData()
  },[])

  const RenderNode = ({ node }) => {
    const isExpanded = expandedNodes[node.id];
    return (
      <TreeNode
        label={
          <div className="flex flex-col items-center text-[8px]">
            {/* Card */}
            <div
              className="relative px-4 py-3 rounded-xl text-white font-bold text-center shadow-md flex items-center gap-3 min-w-[220px] max-w-[260px]"
              style={{ backgroundColor: node.colorCode || "#333" }}
            >
              {/* Circle */}
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[13px] font-bold text-[#FED36A]">
                {node.role
                  ?.split(" ")
                  .map((word) => word[0])
                  .join("")
                  .toUpperCase()}
              </div>

              {/* Name and Role */}
              <div className="flex-1 text-left">
                <div className="text-[12px] font-semibold leading-tight mb-[2px]">
                  {node.id || "Name of the person"}
                </div>
                <div className="text-[10px] font-normal leading-tight">
                  {node.role || "Role"}
                </div>

                {/* Progress Bar */}
                {typeof node.filled === "number" &&
                  typeof node.total === "number" && (
                    <div className="mt-1">
                      <div className="w-full h-1 bg-gray-200 rounded-full">
                        <div
                          className="h-1 bg-green-500 rounded-full"
                          style={{
                            width: `${(node.filled / node.total) * 100}%`,
                          }}
                        />
                      </div>
                      <div className="text-[8px] text-white mt-1">
                        {node.filled}/{node.total}
                      </div>
                    </div>
                  )}
              </div>

              {/* Three Dots */}
              <div className="absolute right-2 top-1/2 -translate-y-1/2 text-white text-lg cursor-pointer leading-none">
                &#8943;
              </div>
            </div>

            {/* Vertical line */}
            {countChildren(node) > 0 && (
              <div className="w-[2px] h-4 bg-[#C5C4C2]" />
            )}

            {/* Expand/Collapse */}
            {countChildren(node) > 0 && (
              <div className="">
                {isExpanded ? (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleExpand(node.id);
                    }}
                    className="bg-white border-2 border-[#D0CECE] rounded-full px-3 py-1 text-[#FED36A] font-semibold text-[8px] cursor-pointer"
                  >
                    Hide
                  </button>
                ) : (
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleExpand(node.id);
                    }}
                    className="bg-white border-2 border-[#D0CECE] rounded-full w-8 h-8 flex items-center justify-center text-[#FED36A] font-semibold text-[8px] cursor-pointer"
                  >
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
      {/* Header and Search */}
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

      {/* Tabs */}
      <div className="flex justify-center gap-2 mb-10">
        <button
          onClick={() => setActiveTab("response")}
          className={`px-6 py-2 rounded-md border transition-all text-[16px] ${
            activeTab === "response"
              ? "font-semibold text-[#FED36A] border-yellow-400 shadow-yellow-200 shadow-md"
              : "font-normal text-black border-none bg-white shadow-md"
          }`}
        >
          Response System
        </button>
        <div className="w-px h-10 bg-[#D0CECE]"></div>
        <button
          onClick={() => setActiveTab("table")}
          className={`px-6 py-2 rounded-md border transition-all text-[16px] ${
            activeTab === "table"
              ? "font-semibold text-[#FED36A] border-yellow-400 shadow-yellow-200 shadow-md"
              : "font-normal text-black border-none bg-white shadow-md"
          }`}
        >
          Table System
        </button>
      </div>

      {/* Tree View */}
      {activeTab === "response" && (
        <div style={{ overflowX: "auto" }}>
          { Object.keys(data).length>0 && 
          (<Tree lineWidth={"2px"} lineColor={"#C5C4C2"} lineBorderRadius={"10px"}>
            <RenderNode node={data} />
          </Tree>
          )}
          
        </div>
      )}
    </div>
  );
}

export default IncidentTree;
