import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import axios from "axios";

const DynamicForm = () => {
    const [formName, setFormName] = useState("");
    const [description, setDescription] = useState("");
    const [questions, setQuestions] = useState([
        {
            id: 1,
            question: "",
            fieldType: "text",
            options: [],
            required: true,
        },
    ]);
    const [nextId, setNextId] = useState(2);
    const [lastDate, setLastDate] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [assignees, setAssignees] = useState([]);
    const [assignedTo, setAssignedTo] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        console.log("✅ Updated assignedTo:", assignedTo);
    }, [assignedTo]);

    const addQuestion = () => {
        setQuestions((prev) => [
            ...prev,
            {
                id: nextId,
                question: "",
                fieldType: "text",
                options: [],
                required: true,
            },
        ]);
        setNextId((prev) => prev + 1);
    };

    const updateQuestion = (id, key, value) => {
        setQuestions((prev) =>
            prev.map((q) => (q.id === id ? { ...q, [key]: value } : q))
        );
    };

    const addOption = (id) => {
        setQuestions((prev) =>
            prev.map((q) =>
                q.id === id ? { ...q, options: [...q.options, ""] } : q
            )
        );
    };

    const updateOption = (qid, index, value) => {
        setQuestions((prev) =>
            prev.map((q) =>
                q.id === qid
                    ? {
                        ...q,
                        options: q.options.map((opt, i) =>
                            i === index ? value : opt
                        ),
                    }
                    : q
            )
        );
    };

    const removeQuestion = (id) => {
        setQuestions((prev) => prev.filter((q) => q.id !== id));
    };

    const exportPayload = () => {
        const dynamicFormQuestionEntities = questions.map((q, index) => {
            let dropDownValues = {};
            const withOptions = ["radio", "checkbox", "select"];
            if (withOptions.includes(q.fieldType)) {
                q.options
                    .filter((opt) => opt.trim() !== "")
                    .forEach((opt) => {
                        dropDownValues[opt.trim()] = false;
                    });
            }
            return {
                sequence: (index + 1).toString(),
                question: q.question.trim(),
                fieldType: q.fieldType,
                required: q.required,
                dropDownValues:
                    Object.keys(dropDownValues).length > 0 ? dropDownValues : undefined,
            };
        });

        const payload = {
            description,
            formName,
            creatorId: "user1006",
            formType: "irs",
            departmentIds: assignedTo, // ✅ send selected department IDs
            formDeadline: lastDate,
            dynamicFormQuestionEntities,
        };

        console.log("📦 Final Exported Payload:", payload);
        saveForm(payload);
    };

    const allFieldTypes = [
        "text",
        "radio",
        "checkbox",
        "select",
        "file",
        "range",
        "date",
        "time",
    ];

    const saveForm = async (payload) => {
        try {
            console.log("before API")
            const result = await axios.post(
                "http://localhost:8082/v1/form/create-form",
                payload
            );
            console.log(result,"Result")
            if (result?.data) {
                toast.info("Form created Successfully",{
                    style: { backgroundColor: "#006400 ", color: "#fff" },
                })
                setFormName("");
                setDescription("");
                setLastDate("");
                setAssignedTo([]);
                setQuestions([]);
                setAssignees([]);
                setNextId(1);
                setIsOpen(false);
            } 
            else {
                console.log("else block")
                toast.error(result.errorMessage, {
                    style: { backgroundColor: "#ff4d4f", color: "#fff" },
                });
            }
        } catch (error) {
            console.log("catch block")
            toast.error(error.message, {
                style: { backgroundColor: "#ff4d4f", color: "#fff" },
            });
        }
    };

    const handleAssignees = async () => {
        try {
            const response = await axios.get(
                "http://localhost:8082/v1/department/get-all-irt-departments"
            );
            setAssignees(response?.data || []);
            setIsOpen((prev) => !prev);
        } catch (error) {
            console.error("Error fetching assignees:", error);
        }
    };

    const toggleDepartment = (departmentId) => {
        setAssignedTo((prev) =>
            prev.includes(departmentId)
                ? prev.filter((id) => id !== departmentId)
                : [...prev, departmentId]
        );
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Dynamic Google Form Clone</h1>

            <div className="flex justify-end gap-4 mt-4">
                <Button
                    onClick={exportPayload}
                    disabled={questions.length === 0}
                    className={`${
                        questions.length === 0
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-yellow-500 text-white"
                    }`}
                >
                    Save
                </Button>

                <div className="relative inline-block text-left">
                    <button
                        onClick={handleAssignees}
                        className="bg-yellow-500 text-white px-4 py-2 rounded shadow hover:bg-yellow-600"
                    >
                        Assign
                    </button>

                    {isOpen && (
                        <div className="absolute mt-2 w-48 bg-white rounded shadow-lg border">
                            {assignees.length > 0 ? (
                                assignees.map((department) => (
                                    <button
                                        key={department.departmentId}
                                        onClick={() => toggleDepartment(department.departmentId)}
                                        className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                                            assignedTo.includes(department.departmentId)
                                                ? "bg-yellow-100"
                                                : ""
                                        }`}
                                    >
                                        {department.departmentName}
                                    </button>
                                ))
                            ) : (
                                <div className="px-4 py-2 text-sm text-gray-500">
                                    No assignees found
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            <Input
                type="text"
                placeholder="Form Name"
                onChange={(e) => setFormName(e.target.value)}
                value={formName}
                className="mb-2"
            />

            <Input
                type="text"
                placeholder="Description"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                className="mb-4 h-20"
            />

           {questions.map((q, idx) => (
  <div
    key={q.id}
    className="border border-gray-200 rounded-lg shadow-sm p-4 mb-6 w-full bg-white max-w-2xl"
  >
    <div className="flex items-center mb-3 gap-3">
      <input
        type="text"
        placeholder={`Question 0${idx + 1}`}
        value={q.question}
        onChange={(e) => updateQuestion(q.id, "question", e.target.value)}
        className="flex-grow bg-gray-50 border-b-2 border-yellow-400 outline-none text-lg font-medium py-2 placeholder:text-gray-500 focus:border-yellow-500 transition-colors"
      />

      <Select
        value={q.fieldType}
        onValueChange={(val) => updateQuestion(q.id, "fieldType", val)}
      >
        <SelectTrigger className="w-[160px] border-gray-300">
          <SelectValue placeholder="Field type" />
        </SelectTrigger>
        <SelectContent>
          {allFieldTypes.map((type) => (
            <SelectItem key={type} value={type}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>

    {["radio", "checkbox", "select"].includes(q.fieldType) && (
      <div>
        <p className="mb-1 text-gray-600 text-sm">Options:</p>
        {q.options.map((opt, i) => (
          <Input
            key={i}
            type="text"
            value={opt}
            onChange={(e) => updateOption(q.id, i, e.target.value)}
            placeholder={`Option ${i + 1}`}
            className="mb-1 border-gray-300"
          />
        ))}
        <Button
          type="button"
          variant="link"
          onClick={() => addOption(q.id)}
          className="text-sm p-0 h-auto text-yellow-600"
        >
          + Add Option
        </Button>
      </div>
    )}

    <div className="flex items-center justify-between pt-4 border-t border-gray-200 mt-4">
      <Button
        variant="link"
        onClick={() => removeQuestion(q.id)}
        className="text-gray-600 hover:text-red-600 text-sm p-0 h-auto"
      >
        🗑 Remove
      </Button>
      <div className="flex items-center gap-2">
        <span className="text-gray-700 text-sm">Required</span>
        <Switch
          id={`required-${q.id}`}
          checked={q.required}
          onCheckedChange={(checked) =>
            updateQuestion(q.id, "required", checked)
          }
        />
      </div>
    </div>
  </div>
))}


            <div className="flex gap-4">
                <Button onClick={addQuestion} className="bg-green-500 text-white">
                    + Add Question
                </Button>

                <div className="flex gap-2">
                    <div className="flex-1">
                        <label className="text-xs block mb-1">End Date</label>
                        <input
                            type="date"
                            value={lastDate}
                            onChange={(e) => setLastDate(e.target.value)}
                            className="w-full border rounded-md p-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#FED36A]"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DynamicForm;
