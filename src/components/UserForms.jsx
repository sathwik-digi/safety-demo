import { useState } from "react";
import { Button } from "@/components/ui/button";

const UserForms = () => {
    const [active, setActive] = useState("new");

    const data = [
        {
            formName: "venky",
            department: "cs",
            date: "01/08/2025",
            submitBefore: "01/08/2025",
            sharedBy: "Admin",
            formType: "new"

        },
        {
            formName: "venky",
            department: "cs",
            date: "01/08/2025",
            submitBefore: "01/08/2025",
            sharedBy: "Admin",
            formType: "new"
        },
        {
            formName: "venky submit",
            department: "cs",
            date: "01/08/2025",
            submitBefore: "01/08/2025",
            sharedBy: "Admin",
            formType: "submitted"
        },
        {
            formName: "venky submit",
            department: "cs",
            date: "01/08/2025",
            submitBefore: "01/08/2025",
            sharedBy: "Admin",
            formType: "submitted"
        }
    ]


    const filteredData=data.filter((item)=>item.formType===active);

    return (
        <div className="bg-white min-h-screen flex flex-col items-center justify-start pt-12">
            {/* Tab Buttons */}
            <div className="flex border-b border-gray-300">
                <Button
                    onClick={() => setActive("new")}
                    className={`px-6 py-2 text-sm font-medium rounded-t-md focus:outline-none ${active === "new"
                        ? "bg-yellow-300 shadow text-black"
                        : "bg-white text-gray-600"
                        }`}
                >
                    New Forms
                </Button>
                <Button
                    onClick={() => setActive("submitted")}
                    className={`px-6 py-2 text-sm font-medium rounded-t-md focus:outline-none ${active === "submitted"
                        ? "bg-yellow-300 shadow text-black"
                        : "bg-white text-gray-600"
                        }`}
                >
                    Submitted Forms
                </Button>
            </div>

            {/* Table Headers */}
            <div className="w-full max-w-5xl mt-8">
                {/* Table Header */}
                <div className="grid grid-cols-5 text-center text-gray-500 font-medium text-sm border-b border-gray-300 pb-2">
                    <div>Form Name</div>
                    <div>Department</div>
                    <div>Date</div>
                    <div>Submit Before</div>
                    <div>Shared By</div>
                </div>

                {/* Table Row */}
                {filteredData.length>0 ? (
                    filteredData.map((item,index)=>(

                    <div className="grid grid-cols-5 text-center text-gray-700 py-4 border-b border-gray-200"
                    key={index}
                    >
                        <div>{item.formName}</div>
                        <div>{item.department}</div>
                        <div>{item.date}</div>
                        <div>{item.submitBefore}</div>
                        <div>{item.sharedBy}</div>
                    </div>
                    ))
                ) : (
                    <div className="text-center py-8 text-gray-500">No data available</div>
                )}
            </div>

        </div>
    );
};

export default UserForms;
