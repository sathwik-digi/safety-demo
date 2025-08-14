import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import ThreeDotsIcon from "../assets/Icons/three-dots-icon.png";
import RenameIcon from "../assets/Icons/RenameForm.png";
import DeleteIcon from "../assets/Icons/delete-role-icon.png";
import sharedToIcon from "../assets/Icons/SharedTo-Icon.png";
import axios from "axios";

const Forms = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");
  const [forms, setForms] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);
  const [renameDialogBox, setRenamedialogBox] = useState(false);
  const [newName, setNewName] = useState("");
  const [deleteDialogAlert, setDeleteDialogAlert] = useState(false);
  const [selectedFormId, setSelectedFormId] = useState(null);
  const [selectedFormName, setSelectedFormName] = useState("");
  const [sharedToDialogBox, setSharedToDialogBox] = useState(false);
  const [sharedToData, setSharedToData] = useState(null);



  useEffect(() => {
    const fetchForms = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8082/v1/form/get-forms-for-admin-users/user1006"
        );
        setForms(response?.data);
      } catch (error) {
        toast.error(error?.message || "Something went wrong", {
          style: { backgroundColor: "#ff4d4f", color: "#fff" },
        });
      }
    };
    fetchForms();
  }, []);

  const handleFormCreation = () => {
    navigate("/irt/formCreation");
  };

  const filterForms = () => {
    if (activeTab === "all") return forms;
    if (activeTab === "received") return forms.filter((form) => form.status === "received");
    if (activeTab === "saved") return forms.filter((form) => form.status === "saved");
    return [];
  };

  const handleRenameSubmit = async () => {
    try {
      const payload = { formId: selectedFormId, formName: newName };
      const response = await axios.put(`http://localhost:8082/v1/form/update-forms/${selectedFormId}`, payload);
      if (response?.data) {
        toast.success("Form renamed successfully!");
        setRenamedialogBox(false);
        setNewName("");
      }
    } catch (error) {
      toast.error(error?.message || "Rename failed");
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:8082/v1/form/delete-form/${selectedFormId}`);
      if (response?.data) {
        toast.success("Form deleted successfully!");
        setDeleteDialogAlert(false);
      }
    } catch (error) {
      toast.error(error?.message || "Delete failed");
    }
  };

  const handleSharedTo = async (formId, departmentId) => {
    try {
      const response = await axios.get(`http://localhost:8082/v1/form/get-forms-for-specific-department/${formId}/${departmentId}`);
      console.log(response.data, "SharedTo API")
      setSharedToData(response?.data);
    }
    catch (error) {
      console.error(error?.message || "error")
    }
  }

  const handleSpecificFormDetails = async (formId) => {
    try {
      const response = await axios.get(`http://localhost:8082/v1/form/get-form/${formId}`);
      if (response?.data) {
        navigate("/irt/formDetails", { state: response?.data });

      }

    }
    catch (error) {
      toast.error(error?.errorMessage)
    }
  }

  const handleRowClick = (row) => {
    console.log(row, "Rowdata")
    navigate("/irt/userAnswers", { state: row });
  }



  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Top bar */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex gap-4">
          {["all", "received", "saved"].map((tab) => (
            <Button
              key={tab}
              className={`px-4 py-2 rounded-full font-semibold shadow ${activeTab === tab ? "bg-yellow-300 text-white" : "bg-white text-gray-700"}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === "all" ? "All Forms" : tab === "received" ? "Received Forms" : "Saved Forms"}
            </Button>
          ))}
        </div>
        <Button
          className="px-5 py-3 bg-yellow-300 text-white font-semibold rounded flex items-center gap-2 shadow"
          onClick={handleFormCreation}
        >
          <span className="text-xl font-bold">+</span> Create New Form
        </Button>
      </div>

      {/* Table header */}
      <div className="hidden md:grid grid-cols-5 text-gray-500 text-sm font-bold mb-4">
        <div>Form Name</div>
        <div>Department</div>
        <div>Date</div>
        <div>Shared to</div>
        <div></div>
      </div>

      {/* Forms list */}


      <div className="space-y-4">

        {filterForms().length > 0 ? (
          filterForms().map((form, index) => (
            <div
              key={index}
              onClick={() => {
                if (form.status === "saved") {
                  handleSpecificFormDetails(form.formId)
                }
              }}

              className="grid grid-cols-1 md:grid-cols-5 gap-y-2 md:gap-y-0 bg-white p-4 rounded shadow hover:shadow-md transition"
            >

              <div className="font-medium">{form.formName}</div>
              <div className="font-medium">{form.department}</div>
              <div className="text-gray-600">{form.createdDate?.split("T")[0]}</div>


              {/* Shared To Button */}
              <div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSharedToDialogBox(true);
                    setSelectedFormId(form.formId);
                    handleSharedTo(form.formId, form.departmentId);
                  }}
                >
                  <div className="flex items-center text-gray-600 gap-2">
                    <img src={sharedToIcon} alt="shared to icon" width={19} height={19} />
                    {form.sharedTo}
                  </div>
                </button>
              </div>


              {/* Actions Menu */}
              <div className="relative"
                onClick={(e) => e.stopPropagation()}
              >
                <div
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="cursor-pointer w-6 h-6"
                >
                  <img src={ThreeDotsIcon} className="w-6 h-6" alt="More" />
                </div>


                {openIndex === index && (
                  <div className="absolute right-18 mt-0 w-38 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                    <div
                      className="flex items-center px-4 py-2 text-gray-500 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setSelectedFormId(form.formId);
                        setRenamedialogBox(true);
                      }}
                    >
                      <img src={RenameIcon} className="w-3 h-4 mr-2" alt="" />
                      Rename
                    </div>
                    <div
                      className="flex items-center px-4 py-2 text-red-500 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setSelectedFormId(form.formId);
                        setSelectedFormName(form.formName);
                        setDeleteDialogAlert(true);
                      }}
                    >
                      <img src={DeleteIcon} className="w-3 h-3 mr-2" alt="" />
                      Delete
                    </div>
                  </div>
                )}
              </div>

            </div>
          ))
        ) : (
          <div className="text-gray-500 text-center py-8">No forms found for this category.</div>
        )
        }
      </div>

      {/* Shared To Dialog */}

      {sharedToDialogBox && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setSharedToDialogBox(false)}></div>
          <div className="relative bg-white rounded-lg shadow-lg p-4 w-full max-w-3xl z-10">
            <div className="flex justify-between items-center border-b pb-2 mb-3">
              <h2 className="text-lg font-semibold">Shared To</h2>
              <button onClick={() => setSharedToDialogBox(false)} className="text-gray-500 hover:text-gray-800">✕</button>
            </div>
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 text-left text-sm text-gray-600">
                  <th className="p-2">Sl no</th>
                  <th className="p-2">Name</th>
                  <th className="p-2">Department</th>
                  <th className="p-2">Submitted Date</th>
                  <th className="p-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {sharedToData?.submittedUsers
                  .map((row, idx) => (
                    <tr key={idx}
                      className="border-b hover:bg-gray-50 text-sm"
                      onClick={() => handleRowClick(row)}
                    >
                      <td className="p-2">{String(idx + 1).padStart(2, "0")}</td>
                      <td className="p-2">{row.userName}</td>
                      <td className="p-2">{row.departmentName}</td>
                      <td className="p-2">
                        {row.answers[0]?.submittedDate
                          ? new Date(row.answers[0].submittedDate).toLocaleDateString()
                          : "no date available"}
                      </td>
                      <td className="p-2 flex items-center gap-2 text-green-600">
                        <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
                        {row.status}
                      </td>
                    </tr>
                  ))}

                {sharedToData?.notSubmittedUsers
                  .map((row, idx) => (
                    <tr key={idx} className="border-b hover:bg-gray-50 text-sm">
                      <td className="p-2">{String(idx + 1).padStart(2, "0")}</td>
                      <td className="p-2">{row.userName}</td>
                      <td className="p-2">{row.departmentName}</td>
                      <td className="p-2">{row.submittedDate || "no date available"}</td>
                      <td className="p-2 flex items-center gap-2 text-red-600">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
                        {row.status}
                      </td>
                    </tr>
                  ))}


              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Rename Dialog */}
      {renameDialogBox && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setRenamedialogBox(false)}></div>
          <div className="relative bg-white rounded-lg p-6 w-140 shadow-lg border border-gray-200 z-10">
            <h2 className="text-2xl font-semibold mb-2">Rename</h2>
            <p className="text-gray-500 mb-4">Please enter a new name for the form</p>
            <input
              type="text"
              placeholder="Type name here"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
            />
            <div className="flex justify-end gap-4">
              <button className="px-12 py-2 border border-yellow-400 text-yellow-500 rounded hover:bg-yellow-50" onClick={() => setRenamedialogBox(false)}>Cancel</button>
              <button className="px-12 py-2 bg-green-500 text-white rounded hover:bg-green-600" onClick={handleRenameSubmit}>✓ ok</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Dialog */}
      {deleteDialogAlert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 backdrop-blur-sm" onClick={() => setDeleteDialogAlert(false)}></div>
          <div className="relative bg-white rounded-lg p-6 w-150 shadow-lg border border-gray-200 z-10">
            <h2 className="text-xl font-semibold mb-4 text-red-600">Do you want to Delete the Form.?</h2>
            <p className="mb-6 text-gray-700">{selectedFormName} will be deleted forever</p>
            <p className="mb-6 text-gray-700">If this file is shared, collaborators can still make a copy of it until it's “Permanently Deleted”.</p>
            <div className="flex justify-end gap-4">
              <Button className="bg-yellow-500 hover:bg-yellow-600 text-white" onClick={() => setDeleteDialogAlert(false)}>Cancel</Button>
              <Button className="bg-red-500 hover:bg-red-600 text-white" onClick={handleDelete}>Delete Form</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Forms;
