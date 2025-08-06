import React, { useState } from "react";
import { networkHandler } from "../https/networkHandler";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

const DynamicForm = () => {

    const [description,setDescription]=useState("");
    const [questions, setQuestions] = useState([]);
    const [nextId, setNextId] = useState(1);

    const navigate = useNavigate();

    const addQuestion = () => {
        setQuestions((prev) => [
            ...prev,
            {
                id: nextId,
                question: "",
                fieldType: "text",
                options: [],
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

            const withOptions = ["radio", "checkbox", "dropdown", "multi choice"];
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
                dropDownValues: Object.keys(dropDownValues).length > 0 ? dropDownValues : undefined,
            };
        });

        const payload = {
            description: description,
            department: "Safety",
            creatorId: "user6581",
            formType: "irs",
            assignee: ["user6582", "user6583"],
            dynamicFormQuestionEntities,
        };

        console.log("📦 Final Exported Payload:", payload);
        saveForm(payload);
    };

    const allFieldTypes = [
        "text",
        "radio",
        "checkbox",
        "dropdown",
        "file upload",
        "rating",
        "date",
        "time",
        "multi choice",
    ];

    const saveForm = async (payload) => {
        try {
            console.log("Before API")
            const result = await networkHandler.post("8082/v1/form/save-forms", payload);
            if (result.success) {
                navigate("/irt/dashboard");
            } else {
                console.log("Else block")
                toast.error(result.errorMessage, {
                    style: { backgroundColor: "#ff4d4f", color: "#fff" },
                });
            }
        } catch (error) {
            console.log(error, "Error in catch")
            toast.error(error.message, {
                style: { backgroundColor: "#ff4d4f", color: "#fff" },
            });
        }
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Dynamic Google Form Clone</h1>

            <Input
            type="text"
            placeholder="Description"
            onChange={(e)=>setDescription(e.target.value)}
            value={description}
            className="mb-2"
            />

            {questions.map((q, idx) => (
                <div key={q.id} className="border p-4 mb-4 rounded shadow-sm bg-white">
                    <label className="block font-medium mb-1">Question {idx + 1}</label>
                    <Input
                        type="text"
                        value={q.question}
                        onChange={(e) => updateQuestion(q.id, "question", e.target.value)}
                        placeholder="Enter your question"
                        className="mb-2"
                    />

                    <Select
                        value={q.fieldType}
                        onValueChange={(val) => updateQuestion(q.id, "fieldType", val)}
                    >
                        <SelectTrigger className="mb-2">
                            <SelectValue placeholder="Select field type" />
                        </SelectTrigger>
                        <SelectContent>
                            {allFieldTypes.map((type) => (
                                <SelectItem key={type} value={type}>
                                    {type.charAt(0).toUpperCase() + type.slice(1)}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    {["radio", "checkbox", "dropdown", "multi choice"].includes(q.fieldType) && (
                        <div>
                            <p className="mb-1">Options:</p>
                            {q.options.map((opt, i) => (
                                <Input
                                    key={i}
                                    type="text"
                                    value={opt}
                                    onChange={(e) => updateOption(q.id, i, e.target.value)}
                                    placeholder={`Option ${i + 1}`}
                                    className="mb-1"
                                />
                            ))}
                            <Button
                                type="button"
                                variant="link"
                                onClick={() => addOption(q.id)}
                                className="text-sm p-0 h-auto"
                            >
                                + Add Option
                            </Button>
                        </div>
                    )}

                    <div className="mt-4 bg-gray-50 p-3 rounded border">
                        <p className="text-sm font-semibold mb-2">Preview:</p>

                        {q.fieldType === "text" && (
                            <Input
                                type="text"
                                disabled
                                placeholder="Your answer"
                                className="bg-gray-100"
                            />
                        )}

                        {q.fieldType === "radio" &&
                            q.options.map((opt, i) => (
                                <label key={i} className="block">
                                    <input type="radio" disabled className="mr-2" />
                                    {opt}
                                </label>
                            ))}

                        {q.fieldType === "checkbox" &&
                            q.options.map((opt, i) => (
                                <label key={i} className="block">
                                    <input type="checkbox" disabled className="mr-2" />
                                    {opt}
                                </label>
                            ))}

                        {q.fieldType === "dropdown" && (
                            <Select disabled>
                                <SelectTrigger className="bg-gray-100">
                                    <SelectValue placeholder="Select an option" />
                                </SelectTrigger>
                                <SelectContent>
                                    {q.options.map((opt, i) => (
                                        <SelectItem key={i} value={opt}>
                                            {opt}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        )}

                        {q.fieldType === "file upload" && (
                            <Input
                                type="file"
                                disabled
                                className="bg-gray-100"
                            />
                        )}

                        {q.fieldType === "rating" && (
                            <div>
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <span key={star} className="text-yellow-500 text-xl">
                                        ★
                                    </span>
                                ))}
                            </div>
                        )}

                        {q.fieldType === "date" && (
                            <Input
                                type="date"
                                disabled
                                className="bg-gray-100"
                            />
                        )}

                        {q.fieldType === "time" && (
                            <Input
                                type="time"
                                disabled
                                className="bg-gray-100"
                            />
                        )}

                        {q.fieldType === "multi choice" &&
                            q.options.map((opt, i) => (
                                <label key={i} className="block">
                                    <input type="checkbox" disabled className="mr-2" />
                                    {opt}
                                </label>
                            ))}
                    </div>

                    <Button
                        variant="link"
                        onClick={() => removeQuestion(q.id)}
                        className="text-red-600 mt-2 text-sm p-0 h-auto"
                    >
                        🗑 Remove
                    </Button>
                </div>
            ))}

            <div className="flex gap-4">
                <Button onClick={addQuestion} className="bg-green-500 text-white">
                    + Add Question
                </Button>

                <Button
                    onClick={exportPayload}
                    disabled={questions.length === 0}
                    className={`${questions.length === 0 ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 text-white"}`}
                >
                    Save
                </Button>
            </div>
        </div>
    );
};

export default DynamicForm;
