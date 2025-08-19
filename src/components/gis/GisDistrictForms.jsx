import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import ThreeDotsIcon from "../../assets/Icons/three-dots-icon.png";
import RenameIcon from "../../assets/Icons/RenameForm.png";
import DeleteIcon from "../../assets/Icons/delete-role-icon.png";
import sharedToIcon from "../../assets/Icons/SharedTo-Icon.png";
import axios from "axios";

const GisDistrictForms = () => {
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
                    "http://localhost:8082/v1/form/get-forms-for-assignee-user/user1004"
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


    //   const filterForms = () => {
    //     if (!Array.isArray(forms)) return []; // ✅ safeguard

    //     console.log(activeTab,"Tab")
    //     if (activeTab === "all") {

    //       return forms.filter((form) => form.questionAnswerList?.answerBeans != null);
    //     } else if (activeTab === "received") {

    //       return forms.filter((form) => form.questionAnswerList?.answerBeans == null);
    //     } else if (activeTab === "review") {
    //       return forms.filter((form) => form.status === "review");
    //     } else {
    //       return forms;
    //     }
    //   };



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
                navigate("/gis/formDetails", { state: response?.data });

            }

        }
        catch (error) {
            toast.error(error?.errorMessage)
        }
    }

    const handleRowClick = (row) => {
        console.log(row, "Rowdata")
        navigate("/gis/userAnswers", { state: row });
    }

    console.log(forms.questionAnswerList, "Outer forms")



    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            {/* Top bar */}
            <div className="flex justify-between items-center mb-8">
                <div className="flex gap-4">
                    {["all", "received", "review"].map((tab) => (
                        <Button
                            key={tab}
                            className={`px-4 py-2 font-semibold shadow ${activeTab === tab ? "bg-yellow-300 text-white" : "bg-white text-gray-700"}`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab === "all" ? "All Forms" : tab === "received" ? "Received Forms" : "Review Forms"}
                        </Button>
                    ))}
                </div>

            </div>

            {/* Table header */}
            <div className="hidden md:grid grid-cols-5 text-gray-500 text-sm font-bold mb-4">
                <div>Form Name</div>
                <div>Received Date </div>
                <div>Submit Before</div>
                <div>Assigned By</div>
                <div></div>
            </div>

            {/* Forms list */}


            <div className="space-y-4">

                {forms.questionAnswerList
                   ? ( forms.questionAnswerList.map((form, index) => (
                        <div
                            key={index}
                            onClick={() => {
                                if (tab === "review") {
                                    handleSpecificFormDetails(form.formId)
                                }
                                if(tab==="receive"){
                                    form=forms.questionAnswerList.answerBeans===null
                                }
                            }}

                            className="grid grid-cols-1 md:grid-cols-5 gap-y-2 md:gap-y-0 bg-white p-4 rounded shadow hover:shadow-md transition"
                        >
                            <div className="font-medium">{form.formName}</div>
                            <div className="text-gray-600">{form.createdDate?.split("T")[0]}</div>
                            <div className="font-medium">{form.formDeadline}</div>
                            {/* <div className="font-medium">{form?.creatorName}</div> */}


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
        </div>
    );
};

export default GisDistrictForms;
