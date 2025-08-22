import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserForms = () => {
  const [active, setActive] = useState("new");
  const [forms, setForms] = useState([]);
  const [filteredForms, setFilteredForms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8082/v1/form/get-forms-for-assignee-user/user1755185263051"
        );
        const allForms = response?.data?.questionAnswerList || [];
        setForms(allForms);

        // Default filter → new forms
        const newForms = allForms.filter(
          (form) => !form.answerBeans || form.answerBeans.length === 0
        );
        setFilteredForms(newForms);
      } catch (error) {
        toast.error(error?.message || "Something went wrong", {
          style: { backgroundColor: "#ff4d4f", color: "#fff" },
        });
      }
    };
    fetchForms();
  }, []);

  const handleRowClick = (row) => {
    if(row.answerBeans.length===0){
        navigate("/irt/userAnswers", { state: row });
    }
    else{
        toast.error("You have already submitted this form")
    }
  };

  const handleFormsFilter = (type) => {
    setActive(type);
    if (type === "new") {
      setFilteredForms(
        forms.filter((form) => !form.answerBeans || form.answerBeans.length === 0)
      );
    } else if (type === "submitted") {
      setFilteredForms(
        forms.filter((form) => Array.isArray(form.answerBeans) && form.answerBeans.length > 0)
      );
    }
  };

  return (
    <div className="bg-white min-h-screen flex flex-col items-center justify-start pt-12">
      {/* Tab Buttons */}
      <div className="flex border-b border-gray-300">
        <Button
          onClick={() => handleFormsFilter("new")}
          className={`px-6 py-2 text-sm font-medium rounded-t-md focus:outline-none ${
            active === "new"
              ? "bg-yellow-300 shadow text-black"
              : "bg-white text-gray-600"
          }`}
        >
          New Forms
        </Button>
        <Button
          onClick={() => handleFormsFilter("submitted")}
          className={`px-6 py-2 text-sm font-medium rounded-t-md focus:outline-none ${
            active === "submitted"
              ? "bg-yellow-300 shadow text-black"
              : "bg-white text-gray-600"
          }`}
        >
          Submitted Forms
        </Button>
      </div>

      {/* Table */}
      <div className="w-full max-w-5xl mt-8">
        <div className="grid grid-cols-5 text-center text-gray-500 font-medium text-sm border-b border-gray-300 pb-2">
          <div>Form Name</div>
          <div>Date</div>
          <div>Submit Before</div>
          <div>Shared By</div>
        </div>

        {filteredForms.length > 0 ? (
          filteredForms.map((item, index) => (
            <div
              className="grid grid-cols-5 text-center text-gray-700 py-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50"
              key={index}
              onClick={() => handleRowClick(item)}
            >
              <div>{item.formName}</div>
              <div>{item.modifiedDate?.split("T")[0]}</div>
              <div>{item.formDeadline}</div>
              <div>{item.creatorName}</div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            No data available
          </div>
        )}
      </div>
    </div>
  );
};

export default UserForms;
