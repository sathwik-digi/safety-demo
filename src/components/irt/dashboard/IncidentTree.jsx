import React, { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Search, MoreHorizontal, ChevronDown, Plus, User, CalendarDays } from "lucide-react"; // Added User for Add Person, CalendarDays for date picker
// Import icons for the popup menu
import {
  ClipboardList, // For Assign Task
  FileText,      // For Add Task
  UserPlus,      // For Add Person
  HeartHandshake, // For Add Volunteer (using a suitable icon)
  GitFork,       // For Add Child (using a suitable icon)
  XCircle        // For Close
} from "lucide-react";
import { Tree, TreeNode } from "react-organizational-chart";

function IncidentTree() {
  const [activeTab, setActiveTab] = useState("response");
  const [showOperationsDetails, setShowOperationsDetails] = useState(false);
  const [showPlanningDetails, setShowPlanningDetails] = useState(false);
  const [showLogisticsDetails, setShowLogisticsDetails] = useState(false);

  // State for managing the context menu popup visibility and position
  const [contextMenuPopup, setContextMenuPopup] = useState({
    visible: false,
    x: 0,
    y: 0,
    nodeId: null, // To identify which node the popup belongs to
  });

  // State for managing the "Assign Task" modal visibility
  const [showAssignTaskModal, setShowAssignTaskModal] = useState(false);
  // State for managing the "Add Task" modal visibility
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  // State for managing the "Add Person" modal visibility
  const [showAddPersonModal, setShowAddPersonModal] = useState(false);
  // New state for managing the "Add Volunteer" modal visibility
  const [showAddVolunteerModal, setShowAddVolunteerModal] = useState(false);


  // Ref for the context menu popup element to detect clicks outside
  const contextMenuPopupRef = useRef(null);
  // Ref for the Assign Task modal element to detect clicks outside
  const assignTaskModalRef = useRef(null);
  // Ref for the Add Task modal element to detect clicks outside
  const addTaskModalRef = useRef(null);
  // Ref for the Add Person modal element to detect clicks outside
  const addPersonModalRef = useRef(null);
  // Ref for the Add Volunteer modal element to detect clicks outside
  const addVolunteerModalRef = useRef(null);

  // Effect to handle clicks outside the context menu popup to close it
  useEffect(() => {
    const handleClickOutsideContextMenu = (event) => {
      if (contextMenuPopupRef.current && !contextMenuPopupRef.current.contains(event.target)) {
        setContextMenuPopup({ ...contextMenuPopup, visible: false });
      }
    };
    if (contextMenuPopup.visible) {
      document.addEventListener("mousedown", handleClickOutsideContextMenu);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideContextMenu);
    };
  }, [contextMenuPopup]);

  // Effect to handle clicks outside the Assign Task modal to close it
  useEffect(() => {
    const handleClickOutsideAssignTaskModal = (event) => {
      if (assignTaskModalRef.current && !assignTaskModalRef.current.contains(event.target)) {
        setShowAssignTaskModal(false);
      }
    };
    if (showAssignTaskModal) {
      document.addEventListener("mousedown", handleClickOutsideAssignTaskModal);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideAssignTaskModal);
    };
  }, [showAssignTaskModal]);

  // Effect to handle clicks outside the Add Task modal to close it
  useEffect(() => {
    const handleClickOutsideAddTaskModal = (event) => {
      if (addTaskModalRef.current && !addTaskModalRef.current.contains(event.target)) {
        setShowAddTaskModal(false);
      }
    };
    if (showAddTaskModal) {
      document.addEventListener("mousedown", handleClickOutsideAddTaskModal);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideAddTaskModal);
    };
  }, [showAddTaskModal]);

  // Effect to handle clicks outside the Add Person modal to close it
  useEffect(() => {
    const handleClickOutsideAddPersonModal = (event) => {
      if (addPersonModalRef.current && !addPersonModalRef.current.contains(event.target)) {
        setShowAddPersonModal(false);
      }
    };
    if (showAddPersonModal) {
      document.addEventListener("mousedown", handleClickOutsideAddPersonModal);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideAddPersonModal);
    };
  }, [showAddPersonModal]);

  // Effect to handle clicks outside the Add Volunteer modal to close it
  useEffect(() => {
    const handleClickOutsideAddVolunteerModal = (event) => {
      if (addVolunteerModalRef.current && !addVolunteerModalRef.current.contains(event.target)) {
        setShowAddVolunteerModal(false);
      }
    };
    if (showAddVolunteerModal) {
      document.addEventListener("mousedown", handleClickOutsideAddVolunteerModal);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideAddVolunteerModal);
    };
  }, [showAddVolunteerModal]);


  // Define data for each individual node in the organizational chart
  const nodes = {
    incidentCommander: {
      id: "incidentCommander",
      name: "Name of the person",
      role: "INCIDENT COMMANDER",
      avatarUrl: "https://placehold.co/40x40/324EA1/ffffff?text=IC",
      bgColor: "#324EA1",
    },
    deputy: {
      id: "deputy",
      name: "Name of the person",
      role: "Deputy",
      avatarUrl: "https://placehold.co/40x40/6A5ACD/ffffff?text=DP",
      bgColor: "#6A5ACD",
    },
    infoMediaOfficer: {
      id: "infoMediaOfficer",
      name: "Name of the person",
      role: "Information & Media Officer",
      avatarUrl: "https://placehold.co/40x40/6A5ACD/ffffff?text=IM",
      bgColor: "#6A5ACD",
    },
    safetyOfficer: {
      id: "safetyOfficer",
      name: "Name of the person",
      role: "Safety Officer",
      avatarUrl: "https://placehold.co/40x40/6A5ACD/ffffff?text=SO",
      bgColor: "#6A5ACD",
    },
    liaisonOfficer: {
      id: "liaisonOfficer",
      name: "Name of the person",
      role: "Liaison Officer",
      avatarUrl: "https://placehold.co/40x40/6A5ACD/ffffff?text=LO",
      bgColor: "#6A5ACD",
    },
    operationsSection: {
      id: "operationsSection",
      name: "Name of the person",
      role: "Operations Section",
      avatarUrl: "https://placehold.co/40x40/3CB371/ffffff?text=OS",
      bgColor: "#3CB371",
      bottomNumber: 9,
    },
    planningSection: {
      id: "planningSection",
      name: "Name of the person",
      role: "Planning Section",
      avatarUrl: "https://placehold.co/40x40/DAA520/ffffff?text=PS",
      bgColor: "#DAA520",
      bottomNumber: 4,
    },
    logisticsSection: {
      id: "logisticsSection",
      name: "Name of the person",
      role: "Logistics Section",
      avatarUrl: "https://placehold.co/40x40/FF8C00/ffffff?text=LS",
      bgColor: "#FF8C00",
      bottomNumber: 13,
    },
    // Nodes for Operations Section details
    stagingArea: {
      id: "stagingArea",
      name: "Name of the person",
      role: "Staging Area",
      avatarUrl: "https://placehold.co/40x40/3CB371/ffffff?text=SA",
      bgColor: "#3CB371",
    },
    responseBranch: {
      id: "responseBranch",
      name: "Name of the person",
      role: "Response Branch",
      avatarUrl: "https://placehold.co/40x40/3CB371/ffffff?text=RB",
      bgColor: "#3CB371",
    },
    transportationBranch: {
      id: "transportationBranch",
      name: "Name of the person",
      role: "Transportation Branch",
      avatarUrl: "https://placehold.co/40x40/3CB371/ffffff?text=TB",
      bgColor: "#3CB371",
    },
    divisionGeographical: {
      id: "divisionGeographical",
      name: "Name of the person",
      role: "Division (Geographical)",
      avatarUrl: "https://placehold.co/40x40/3CB371/ffffff?text=DG",
      bgColor: "#3CB371",
    },
    groupFunctional: {
      id: "groupFunctional",
      name: "Name of the person",
      role: "Group (Functional)\n(Single Resource Task\nForce/Strike Team)",
      avatarUrl: "https://placehold.co/40x40/3CB371/ffffff?text=GF",
      bgColor: "#3CB371",
    },
    road: {
      id: "road",
      name: "Name of the person",
      role: "Road",
      avatarUrl: "https://placehold.co/40x40/3CB371/ffffff?text=RD",
      bgColor: "#3CB371",
    },
    rail: {
      id: "rail",
      name: "Name of the person",
      role: "Rail",
      avatarUrl: "https://placehold.co/40x40/3CB371/ffffff?text=RL",
      bgColor: "#3CB371",
    },
    water: {
      id: "water",
      name: "Name of the person",
      role: "Water",
      avatarUrl: "https://placehold.co/40x40/3CB371/ffffff?text=WT",
      bgColor: "#3CB371",
    },
    air: {
      id: "air",
      name: "Name of the person",
      role: "Air",
      avatarUrl: "https://placehold.co/40x40/3CB371/ffffff?text=AR",
      bgColor: "#3CB371",
    },
    // Nodes for Planning Section details
    resourceUnit: {
      id: "resourceUnit",
      name: "Name of the person",
      role: "Resource Unit",
      avatarUrl: "https://placehold.co/40x40/DAA520/ffffff?text=RU",
      bgColor: "#DAA520",
    },
    situationUnit: {
      id: "situationUnit",
      name: "Name of the person",
      role: "Situation Unit",
      avatarUrl: "https://placehold.co/40x40/DAA520/ffffff?text=SU",
      bgColor: "#DAA520",
    },
    documentationUnit: {
      id: "documentationUnit",
      name: "Name of the person",
      role: "Documentation Unit",
      avatarUrl: "https://placehold.co/40x40/DAA520/ffffff?text=DU",
      bgColor: "#DAA520",
    },
    demobilizationUnit: {
      id: "demobilizationUnit",
      name: "Name of the person",
      role: "Demobilization Unit",
      avatarUrl: "https://placehold.co/40x40/DAA520/ffffff?text=DM",
      bgColor: "#DAA520",
    },
    // New nodes for Logistics Section details
    serviceBranch: {
      id: "serviceBranch",
      name: "Name of the person",
      role: "Service Branch",
      avatarUrl: "https://placehold.co/40x40/FF8C00/ffffff?text=SB",
      bgColor: "#FF8C00",
    },
    supportBranch: {
      id: "supportBranch",
      name: "Name of the person",
      role: "Support Branch",
      avatarUrl: "https://placehold.co/40x40/FF8C00/ffffff?text=SPB",
      bgColor: "#FF8C00",
    },
    financeBranch: {
      id: "financeBranch",
      name: "Name of the person",
      role: "Finance Branch",
      avatarUrl: "https://placehold.co/40x40/FF8C00/ffffff?text=FB",
      bgColor: "#FF8C00",
    },
    communicationUnit: {
      id: "communicationUnit",
      name: "Name of the person",
      role: "Communication Unit",
      avatarUrl: "https://placehold.co/40x40/FF8C00/ffffff?text=CU",
      bgColor: "#FF8C00",
    },
    medicalUnit: {
      id: "medicalUnit",
      name: "Name of the person",
      role: "Medical Unit",
      avatarUrl: "https://placehold.co/40x40/FF8C00/ffffff?text=MU",
      bgColor: "#FF8C00",
    },
    foodUnit: {
      id: "foodUnit",
      name: "Name of the person",
      role: "Food Unit",
      avatarUrl: "https://placehold.co/40x40/FF8C00/ffffff?text=FU",
      bgColor: "#FF8C00",
    },
    resourceProvisioningUnit: {
      id: "resourceProvisioningUnit",
      name: "Name of the person",
      role: "Resource Provisioning Unit",
      avatarUrl: "https://placehold.co/40x40/FF8C00/ffffff?text=RPU",
      bgColor: "#FF8C00",
    },
    facilitiesUnit: {
      id: "facilitiesUnit",
      name: "Name of the person",
      role: "Facilities Unit",
      avatarUrl: "https://placehold.co/40x40/FF8C00/ffffff?text=FAU",
      bgColor: "#FF8C00",
    },
    groundSupportUnit: {
      id: "groundSupportUnit",
      name: "Name of the person",
      role: "Ground Support Unit",
      avatarUrl: "https://placehold.co/40x40/FF8C00/ffffff?text=GSU",
      bgColor: "#FF8C00",
    },
    timeUnit: {
      id: "timeUnit",
      name: "Name of the person",
      role: "Time Unit",
      avatarUrl: "https://placehold.co/40x40/FF8C00/ffffff?text=TU",
      bgColor: "#FF8C00",
    },
    compensationClaimUnit: {
      id: "compensationClaimUnit",
      name: "Name of the person",
      role: "Compensation/Claim Unit",
      avatarUrl: "https://placehold.co/40x40/FF8C00/ffffff?text=CCU",
      bgColor: "#FF8C00",
    },
    procurementUnit: {
      id: "procurementUnit",
      name: "Name of the person",
      role: "Procurement Unit",
      avatarUrl: "https://placehold.co/40x40/FF8C00/ffffff?text=PRU",
      bgColor: "#FF8C00",
    },
    costUnit: {
      id: "costUnit",
      name: "Name of the person",
      role: "Cost Unit",
      avatarUrl: "https://placehold.co/40x40/FF8C00/ffffff?text=COU",
      bgColor: "#FF8C00",
    },
  };

  // Popup menu component (Context Menu)
  const ContextMenu = ({ x, y, nodeId, onClose }) => {
    // Handle menu item click
    const handleMenuItemClick = (action) => {
      console.log(`Action: ${action} for Node ID: ${nodeId}`);
      onClose(); // Close context menu popup

      if (action === "Assign Task") {
        setShowAssignTaskModal(true); // Open the Assign Task modal
      } else if (action === "Add Task") {
        setShowAddTaskModal(true); // Open the Add Task modal
      } else if (action === "Add Person") {
        setShowAddPersonModal(true); // Open the Add Person modal
      } else if (action === "Add Volunteer") {
        setShowAddVolunteerModal(true); // Open the Add Volunteer modal
      }
    };

    return (
      <div
        ref={contextMenuPopupRef}
        className="absolute bg-white rounded-lg shadow-lg py-2 z-50 min-w-[180px]"
        style={{ top: y, left: x }}
      >
        <div
          className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700"
          onClick={() => handleMenuItemClick("Assign Task")}
        >
          <ClipboardList className="w-4 h-4 mr-3 text-gray-500" /> Assign Task
        </div>
        <div
          className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700"
          onClick={() => handleMenuItemClick("Add Task")}
        >
          <FileText className="w-4 h-4 mr-3 text-gray-500" /> Add Task
        </div>
        <div
          className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700"
          onClick={() => handleMenuItemClick("Add Person")}
        >
          <UserPlus className="w-4 h-4 mr-3 text-gray-500" /> Add Person
        </div>
        <div
          className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700"
          onClick={() => handleMenuItemClick("Add Volunteer")}
        >
          <HeartHandshake className="w-4 h-4 mr-3 text-gray-500" /> Add Volunteer
        </div>
        <div
          className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700"
          onClick={() => handleMenuItemClick("Add Child")}
        >
          <GitFork className="w-4 h-4 mr-3 text-gray-500" /> Add Child
        </div>
        <div className="border-t border-gray-200 my-1"></div>
        <div
          className="flex items-center px-4 py-2 hover:bg-red-50 text-red-600 cursor-pointer"
          onClick={onClose}
        >
          <XCircle className="w-4 h-4 mr-3" /> Close
        </div>
      </div>
    );
  };

  // Assign Task Modal component
  const AssignTaskModal = ({ onClose }) => {
    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-[100] backdrop-blur-sm">
        <div ref={assignTaskModalRef} className="bg-white rounded-lg shadow-xl p-6 w-96 relative">
          {/* Close button at top right */}
          <button
            onClick={onClose}
            className="absolute -top-4 -right-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors"
          >
            <XCircle className="w-6 h-6 text-gray-600" />
          </button>

          <div className="relative mb-6">
            <Input
              placeholder="Assign Task to"
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 cursor-pointer" />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              onClick={onClose}
              className="px-6 py-2 rounded-md border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                console.log("Task Assigned!");
                onClose();
              }}
              className="px-6 py-2 rounded-md bg-yellow-400 text-white font-medium shadow-sm hover:bg-yellow-500 transition-colors"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Add Task Modal component
  const AddTaskModal = ({ onClose }) => {
    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-[100] backdrop-blur-sm">
        <div ref={addTaskModalRef} className="bg-white rounded-lg shadow-xl p-6 w-96 relative">
          {/* Close button at top right */}
          <button
            onClick={onClose}
            className="absolute -top-4 -right-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors"
          >
            <XCircle className="w-6 h-6 text-gray-600" />
          </button>

          <div className="relative mb-6">
            <Input
              placeholder="Add Task"
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
            />
            <Plus className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 cursor-pointer" />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              onClick={onClose}
              className="px-6 py-2 rounded-md border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                console.log("Task Added!");
                onClose();
              }}
              className="px-6 py-2 rounded-md bg-yellow-400 text-white font-medium shadow-sm hover:bg-yellow-500 transition-colors"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Add Person Modal component
  const AddPersonModal = ({ onClose }) => {
    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-[100] backdrop-blur-sm">
        <div ref={addPersonModalRef} className="bg-white rounded-lg shadow-xl p-6 w-96 relative">
          {/* Close button at top right */}
          <button
            onClick={onClose}
            className="absolute -top-4 -right-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors"
          >
            <XCircle className="w-6 h-6 text-gray-600" />
          </button>

          <h3 className="text-lg font-semibold mb-4 text-gray-800">Add a Person</h3>
          <div className="relative mb-6">
            <Input
              placeholder="Name of the Person"
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              onClick={onClose}
              className="px-6 py-2 rounded-md border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                console.log("Person Added!");
                onClose();
              }}
              className="px-6 py-2 rounded-md bg-yellow-400 text-white font-medium shadow-sm hover:bg-yellow-500 transition-colors"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    );
  };

  // New Add Volunteer Modal component
  const AddVolunteerModal = ({ onClose }) => {
    // State for date inputs
    const [fromDate, setFromDate] = useState("09/05/2025");
    const [toDate, setToDate] = useState("09/05/2025");

    const handleResetDates = () => {
      setFromDate("09/05/2025");
      setToDate("09/05/2025");
    };

    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-[100] backdrop-blur-sm">
        <div ref={addVolunteerModalRef} className="bg-white rounded-lg shadow-xl p-6 w-[450px] relative">
          {/* Close button at top right */}
          <button
            onClick={onClose}
            className="absolute -top-4 -right-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors"
          >
            <XCircle className="w-6 h-6 text-gray-600" />
          </button>

          <h3 className="text-lg font-semibold mb-4 text-gray-800">Add a volunteer</h3>

          {/* Name of the Person */}
          <div className="mb-4">
            <Input
              placeholder="Name of the Person"
              className="pl-4 pr-4 py-2 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
            />
          </div>

          {/* Role */}
          <div className="mb-4">
            <p className="text-sm text-gray-700 mb-1">Role</p>
            <Input
              placeholder="Name of the Role"
              className="pl-4 pr-4 py-2 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
            />
          </div>

          {/* Add a New Person / Name */}
          <div className="mb-4">
            <div className="relative mb-2">
              <Input
                placeholder="Add a New Person"
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              />
              <UserPlus className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
            <p className="text-sm text-gray-700 mb-1">Name</p>
            <Input
              placeholder="Name of the Person"
              className="pl-4 pr-4 py-2 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
            />
          </div>

          {/* Phone Number and Mail Id */}
          <div className="flex gap-4 mb-4">
            <div className="flex-1">
              <p className="text-sm text-gray-700 mb-1">Phone Number</p>
              <Input
                placeholder="+91"
                className="pl-4 pr-4 py-2 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-700 mb-1">Mail Id</p>
              <Input
                placeholder="@gmail.com"
                className="pl-4 pr-4 py-2 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              />
            </div>
          </div>

          {/* No. of Days they can voluntary */}
          <div className="mb-4">
            <p className="text-sm text-gray-700 mb-1">No. of Days they can voluntary</p>
            {/* This input is not explicitly shown in the image, but implied by the date fields */}
            <Input
              type="number"
              placeholder="e.g., 5"
              className="pl-4 pr-4 py-2 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
            />
          </div>

          {/* Date Range */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-1">
              <p className="text-sm text-gray-700">Date</p>
              <button
                onClick={handleResetDates}
                className="text-blue-600 text-sm font-medium hover:underline"
              >
                Reset
              </button>
            </div>
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Input
                  type="text" // Use text type for custom date format display
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  className="pl-4 pr-10 py-2 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                />
                <CalendarDays className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 cursor-pointer" />
                <p className="text-xs text-gray-500 mt-1">From</p>
              </div>
              <div className="flex-1 relative">
                <Input
                  type="text" // Use text type for custom date format display
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  className="pl-4 pr-10 py-2 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                />
                <CalendarDays className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 cursor-pointer" />
                <p className="text-xs text-gray-500 mt-1">To</p>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              onClick={onClose}
              className="px-6 py-2 rounded-md border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                console.log("Volunteer Added!");
                onClose();
              }}
              className="px-6 py-2 rounded-md bg-yellow-400 text-white font-medium shadow-sm hover:bg-yellow-500 transition-colors"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Box component to render each individual node in the organizational chart
  const Box = ({ person }) => {
    const isPurpleBlue = ["#324EA1", "#6A5ACD"].includes(person.bgColor);

    // Function to handle the click on the MoreHorizontal icon
    const handleMoreClick = (event) => {
      // Stop event propagation to prevent immediate closing by document click listener
      event.stopPropagation();
      const rect = event.currentTarget.getBoundingClientRect();
      setContextMenuPopup({
        visible: true,
        x: rect.left - 150, // Adjust X position to align with the icon
        y: rect.top + window.scrollY + rect.height / 2, // Adjust Y position
        nodeId: person.id,
      });
    };

    return (
      <div
        className="rounded-xl shadow-md px-4 py-3 text-sm w-60 flex items-center relative"
        style={{ backgroundColor: person.bgColor, color: "white" }}
      >
        <img
          src={person.avatarUrl}
          alt={person.name}
          className="w-10 h-10 rounded-full mr-3 object-cover"
          onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/40x40/${person.bgColor.substring(1)}/ffffff?text=AV`; }}
        />
        <div className="flex-grow text-left">
          <p className="font-semibold text-base leading-tight">{person.name}</p>
          <p className="text-xs font-normal opacity-80 whitespace-pre-line">{person.role}</p>
        </div>
        {isPurpleBlue && (
          <span className="absolute top-2 right-8 text-xs font-medium opacity-70">1/3</span>
        )}
        {/* Make the MoreHorizontal icon clickable */}
        <MoreHorizontal
          className="absolute top-2 right-2 w-5 h-5 opacity-70 cursor-pointer"
          color="white"
          onClick={handleMoreClick}
          title="More options"
        />
      </div>
    );
  };

  return (
    <div className="p-6">
      {/* Header and Search Bar Section */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold">Incident Response Teams</h2>
          <div className="w-[180px] h-[2px] bg-gray-300 mt-1"></div>
        </div>
        <div className="relative w-[320px]">
          <Input
            placeholder="Search name of the person"
            className="pl-10 pr-4 py-2 border border-gray-200 shadow-sm rounded-md"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>
      </div>

      {/* Tab Navigation Section */}
      <div className="flex justify-center gap-4 mb-10">
        <button
          onClick={() => setActiveTab("response")}
          className={`px-6 py-2 rounded-md border text-sm font-medium transition-all ${activeTab === "response"
              ? "border-yellow-400 text-yellow-500 shadow-yellow-200 shadow-md"
              : "border-none bg-white text-gray-700 shadow-md"
            }`}
        >
          Response System
        </button>
        <button
          onClick={() => setActiveTab("table")}
          className={`px-6 py-2 rounded-md border text-sm font-medium transition-all ${activeTab === "table"
              ? "border-yellow-400 text-yellow-500 shadow-yellow-200 shadow-md"
              : "border-none bg-white text-gray-700 shadow-md"
            }`}
        >
          Table System
        </button>
      </div>

      {/* Organizational Tree Display Section */}
      {activeTab === "response" && (
        <div className="p-10 flex justify-center overflow-auto">
          <div className="scale-[0.75] origin-top">
            <Tree
              lineWidth={"2px"}
              lineColor={"#ccc"}
              lineBorderRadius={"12px"}
              label={<Box person={nodes.incidentCommander} />}
            >
              <TreeNode label={<Box person={nodes.deputy} />} />
              <TreeNode label={<Box person={nodes.infoMediaOfficer} />} />
              <TreeNode label={<Box person={nodes.safetyOfficer} />} />
              <TreeNode label={<Box person={nodes.liaisonOfficer} />} />

              {/* Operations Section with clickable number to toggle details */}
              <TreeNode label={
                <div className="flex flex-col items-center">
                  <Box person={nodes.operationsSection} />
                  <button
                    onClick={() => setShowOperationsDetails(!showOperationsDetails)}
                    className="mt-4 w-8 h-8 flex items-center justify-center rounded-full bg-orange-500 text-white font-bold text-sm shadow-md cursor-pointer hover:bg-orange-600 transition-colors"
                    title="Click to expand/collapse Operations Section details"
                  >
                    {nodes.operationsSection.bottomNumber}
                  </button>
                </div>
              }>
                {/* Conditionally render children of Operations Section */}
                {showOperationsDetails && (
                  <>
                    <TreeNode label={<Box person={nodes.stagingArea} />} />
                    <TreeNode label={<Box person={nodes.responseBranch} />}>
                      <TreeNode label={<Box person={nodes.divisionGeographical} />}>
                        <TreeNode label={<Box person={nodes.groupFunctional} />} />
                      </TreeNode>
                    </TreeNode>
                    <TreeNode label={<Box person={nodes.transportationBranch} />}>
                      <TreeNode label={<Box person={nodes.road} />} />
                      <TreeNode label={<Box person={nodes.rail} />} />
                      <TreeNode label={<Box person={nodes.water} />} />
                      <TreeNode label={<Box person={nodes.air} />} />
                    </TreeNode>
                  </>
                )}
              </TreeNode>

              {/* Planning Section with clickable number to toggle details */}
              <TreeNode label={
                <div className="flex flex-col items-center">
                  <Box person={nodes.planningSection} />
                  <button
                    onClick={() => setShowPlanningDetails(!showPlanningDetails)}
                    className="mt-4 w-8 h-8 flex items-center justify-center rounded-full bg-orange-500 text-white font-bold text-sm shadow-md cursor-pointer hover:bg-orange-600 transition-colors"
                    title="Click to expand/collapse Planning Section details"
                  >
                    {nodes.planningSection.bottomNumber}
                  </button>
                </div>
              }>
                {/* Conditionally render children of Planning Section */}
                {showPlanningDetails && (
                  <>
                    <TreeNode label={<Box person={nodes.resourceUnit} />} />
                    <TreeNode label={<Box person={nodes.situationUnit} />} />
                    <TreeNode label={<Box person={nodes.documentationUnit} />} />
                    <TreeNode label={<Box person={nodes.demobilizationUnit} />} />
                  </>
                )}
              </TreeNode>

              {/* Logistics Section with clickable number to toggle details */}
              <TreeNode label={
                <div className="flex flex-col items-center">
                  <Box person={nodes.logisticsSection} />
                  <button
                    onClick={() => setShowLogisticsDetails(!showLogisticsDetails)}
                    className="mt-4 w-8 h-8 flex items-center justify-center rounded-full bg-orange-500 text-white font-bold text-sm shadow-md cursor-pointer hover:bg-orange-600 transition-colors"
                    title="Click to expand/collapse Logistics Section details"
                  >
                    {nodes.logisticsSection.bottomNumber}
                  </button>
                </div>
              }>
                {/* Conditionally render children of Logistics Section */}
                {showLogisticsDetails && (
                  <>
                    <TreeNode label={<Box person={nodes.serviceBranch} />}>
                      <TreeNode label={<Box person={nodes.communicationUnit} />} />
                      <TreeNode label={<Box person={nodes.medicalUnit} />} />
                      <TreeNode label={<Box person={nodes.foodUnit} />} />
                    </TreeNode>
                    <TreeNode label={<Box person={nodes.supportBranch} />}>
                      <TreeNode label={<Box person={nodes.resourceProvisioningUnit} />} />
                      <TreeNode label={<Box person={nodes.facilitiesUnit} />} />
                      <TreeNode label={<Box person={nodes.groundSupportUnit} />} />
                    </TreeNode>
                    <TreeNode label={<Box person={nodes.financeBranch} />}>
                      <TreeNode label={<Box person={nodes.timeUnit} />} />
                      <TreeNode label={<Box person={nodes.compensationClaimUnit} />} />
                      <TreeNode label={<Box person={nodes.procurementUnit} />} />
                      <TreeNode label={<Box person={nodes.costUnit} />} />
                    </TreeNode>
                  </>
                )}
              </TreeNode>
            </Tree>
          </div>
        </div>
      )}

      {/* Render the ContextMenu if visible */}
      {contextMenuPopup.visible && (
        <ContextMenu
          x={contextMenuPopup.x}
          y={contextMenuPopup.y}
          nodeId={contextMenuPopup.nodeId}
          onClose={() => setContextMenuPopup({ ...contextMenuPopup, visible: false })}
        />
      )}

      {/* Render the AssignTaskModal if visible */}
      {showAssignTaskModal && (
        <AssignTaskModal onClose={() => setShowAssignTaskModal(false)} />
      )}

      {/* Render the AddTaskModal if visible */}
      {showAddTaskModal && (
        <AddTaskModal onClose={() => setShowAddTaskModal(false)} />
      )}

      {/* Render the AddPersonModal if visible */}
      {showAddPersonModal && (
        <AddPersonModal onClose={() => setShowAddPersonModal(false)} />
      )}

      {/* Render the AddVolunteerModal if visible */}
      {showAddVolunteerModal && (
        <AddVolunteerModal onClose={() => setShowAddVolunteerModal(false)} />
      )}
    </div>
  );
}

export default IncidentTree;
