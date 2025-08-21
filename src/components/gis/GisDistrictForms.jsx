import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import axios from "axios";
import sharedToIcon from "../../assets/Icons/SharedTo-Icon.png";

const GisDistrictForms = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("all");
    const [forms, setForms] = useState([]);
    const [reviewForms, setReviewForms] = useState([]); // ✅ new state
    const [sharedToDialogBox, setSharedToDialogBox] = useState(false);
    const [selectedFormId, setSelectedFormId] = useState("");
    const [sharedToData, setSharedToData] = useState([]);

    useEffect(() => {
        const fetchForms = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:8082/v1/form/get-forms-for-assignee-user/user1755185263049"
                );
                setForms(response?.data?.questionAnswerList || []);
            } catch (error) {
                toast.error(error?.message || "Something went wrong", {
                    style: { backgroundColor: "#ff4d4f", color: "#fff" },
                });
            }
        };
        fetchForms();
    }, []);

    useEffect(() => {
        if (activeTab === "review") {
            handleReviewForms();
        }
    }, [activeTab]);

    const handleReviewForms = async () => {
        try {
            const response = await axios.get(
                "http://localhost:8082/v1/form/review-assigned-forms/user1755185263049"
            );
            console.log(response.data.assignedFormResponseBeans, "Review response")
            setReviewForms(response.data.assignedFormResponseBeans || []); // ✅ store in state
        } catch (error) {
            toast.error("Failed to fetch");
        }
    };

    const filterForms = () => {
        if (activeTab === "all") {
            return forms;
        } else if (activeTab === "received") {
            return forms.filter((form) => form?.answerBeans?.length === 0);
        } else if (activeTab === "review") {
            return reviewForms; // ✅ use review state
        } else {
            return [];
        }
    };

    const filteredForms = filterForms();

    const handleSharedTo = async (formId) => {
        console.log(formId, "First")
        setSharedToDialogBox(!sharedToDialogBox);

        try {
            const response = await axios.get(`http://localhost:8082/v1/form/get-forms-by-district-admin/user1755185263049/${formId}`);
            setSharedToData(response.data)
            console.log(response, "response")
        }
        catch (error) {
            toast.error("Fetching failed")
        }

    }

    const handleRowClick = (row) => {
        console.log(row, "Rowdata")
        navigate("/gis/userAnswers", { state: row });
    }


    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            {/* Top bar */}
            <div className="flex justify-between items-center mb-8">
                <div className="flex gap-4">
                    {["all", "received", "review"].map((tab) => (
                        <Button
                            key={tab}
                            className={`px-4 py-2 font-semibold shadow ${activeTab === tab
                                ? "bg-yellow-300 text-white"
                                : "bg-white text-gray-700"
                                }`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab === "all"
                                ? "All Forms"
                                : tab === "received"
                                    ? "Received Forms"
                                    : "Industry Forms"}
                        </Button>
                    ))}
                </div>
            </div>

            {/* Table header */}
            <div className="hidden md:grid grid-cols-5 text-gray-500 text-sm font-bold mb-4">
                <div>Form Name</div>
                {activeTab == "review" ? (
                    <>
                        <div>Shared By</div>
                        <div>Created Date</div>
                    </>
                ) : (
                    <>
                        <div>Received Date</div>
                        <div>Submit Before</div>
                        <div>Assigned By</div>
                        <div></div>
                    </>
                )
                }
            </div>

            {/* Forms list */}
            <div className="space-y-4">
                {filteredForms?.length > 0 ? (
                    filteredForms.map((form, index) => (
                        <div
                            key={index}
                            onClick={() => {
                                if (activeTab === "received") {
                                    navigate("/gis/gis-district-answerform", { state: form });
                                }
                            }}
                            className="grid grid-cols-1 md:grid-cols-5 gap-y-2 md:gap-y-0 bg-white p-4 rounded shadow hover:shadow-md transition"
                        >
                            <div className="font-medium">{form.formName}</div>

                            {activeTab === "review" ? (
                                <>
                                    <div className="font-medium flex items-center gap-2">
                                        <button className="flex items-center gap-2 px-2 py-1"
                                            onClick={() => handleSharedTo(form.formId)}
                                        >
                                            <img
                                                src={sharedToIcon}
                                                alt="Shared To"
                                                className="w-5 h-5"
                                            />
                                            <span>{form?.sharedTo}</span>
                                        </button>

                                    </div>

                                    <div className="text-gray-600"> {form.createdDate?.split("T")[0]}</div>
                                </>
                            ) : (
                                <>
                                    <div className="text-gray-600">
                                        {form.createdDate?.split("T")[0]}
                                    </div>
                                    <div className="font-medium">{form?.formDeadline}</div>
                                    <div className="font-medium">{form?.creatorName}</div>
                                </>
                            )}
                        </div>
                    ))
                ) : (
                    <div className="text-gray-500 text-center py-8">
                        No forms found for this category.
                    </div>
                )}
            </div>



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
                                    <th className="p-2">Industry Name</th>
                                    <th className="p-2">Submitted Date</th>
                                    <th className="p-2">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.isArray(sharedToData?.submittedUsers) &&
                                    sharedToData.submittedUsers.map((row, idx) => (
                                        <tr
                                            key={idx}
                                            className="border-b hover:bg-gray-50 text-sm"
                                            onClick={() => handleRowClick(row)}
                                        >
                                            <td className="p-2">{String(idx + 1).padStart(2, "0")}</td>
                                            <td className="p-2">{row.userName}</td>
                                            <td className="p-2">{row.factoryName}</td>
                                            <td className="p-2">
                                                {row.answers?.[0]?.submittedDate
                                                    ? new Date(row.answers[0].submittedDate).toLocaleDateString()
                                                    : "no date available"}
                                            </td>
                                            <td className="p-2 flex items-center gap-2 text-green-600">
                                                <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
                                                {row.status || "not submitted"}
                                            </td>
                                        </tr>
                                    ))}

                                {Array.isArray(sharedToData?.notSubmittedUsers) &&
                                    sharedToData.notSubmittedUsers.map((row, idx) => (
                                        <tr key={idx} className="border-b hover:bg-gray-50 text-sm">
                                            <td className="p-2">{String(idx + 1).padStart(2, "0")}</td>
                                            <td className="p-2">{row.userName}</td>
                                            <td className="p-2">{row.factoryName}</td>
                                            <td className="p-2">{row.submittedDate || "no date available"}</td>
                                            <td className="p-2 flex items-center gap-2 text-red-600">
                                                <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
                                                {row.status || "not submitted"}
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
