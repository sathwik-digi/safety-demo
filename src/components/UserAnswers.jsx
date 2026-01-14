import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const UserAnswers = () => {
    const { state: form } = useLocation(); // form metadata passed from previous page
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({}); // store user answers
    const navigate = useNavigate();

    useEffect(() => {
        const fetchQuestion = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8082/v1/form/get-form/${form.formId}`
                );
                const qns = response.data.dynamicFormQuestionEntities || [];

                // ✅ Normalize options (from dropDownValues object → array)
                const normalized = qns.map((q) => ({
                    ...q,
                    options: q.dropDownValues
                        ? Object.keys(q.dropDownValues)
                        : q.options || [],
                }));

                setQuestions(normalized);

                // ✅ Pre-fill answers if they already exist
                const existing = {};
                normalized.forEach((q) => {
                    if (q.answer) existing[q.questionId] = q.answer;
                });
                setAnswers(existing);

                console.log("Fetched Questions:", normalized);
            } catch (error) {
                toast.error(error.errorMessage || "Failed to fetch the details");
            }
        };
        fetchQuestion();
    }, [form.formId]);

    // handle input change
    const handleChange = (id, value) => {
        setAnswers((prev) => ({ ...prev, [id]: value }));

    };

    // inside GisDistrictAnswerForm.jsx

    const handleSubmit = async() => {
        const payload = {
            formId: form.formId,
            submittedBy: "user1755185263051", // TODO: replace dynamically
            answerBeans: questions.map((q) => {
                const userAnswer = answers[q.questionId];

                // ✅ For checkbox, radio, select → use answeredOptions
                if (q.fieldType === "checkbox" || q.fieldType === "radio" || q.fieldType === "select") {
                    const answeredOptions = {};
                    q.options?.forEach((opt) => {
                        if (q.fieldType === "checkbox") {
                            // multiple selection
                            answeredOptions[opt] = userAnswer?.includes(opt) || false;
                        } else {
                            // single selection (radio / select)
                            answeredOptions[opt] = userAnswer === opt;
                        }
                    });
                    return {
                        questionId: q.questionId,
                        answeredOptions,
                    };
                }

                // ✅ For file upload
                if (q.fieldType === "file") {
                    return {
                        questionId: q.questionId,
                        answer: userAnswer || null // file reference
                    };
                }

                // ✅ Default: text, number, date, time, email, url, etc.
                return {
                    questionId: q.questionId,
                    answer: userAnswer || null,
                };
            }),
        };

        console.log("Final Payload:", payload);

        try{
            const response= await axios.post("http://localhost:8082/v1/form/save-answers",payload)
            console.log(response,"Response")
            console.log(response.data,"Response data")
            if(response?.data){
                toast.success("Form submitted successfully!");
                navigate(-1)
            }
            else{
                toast.error("Form submission failed!");
            }
        }
        catch(error){
            toast.error("Form submission failed!");
        }
    };

    // Render UI by field type
    const renderField = (q) => {
        switch (q.fieldType) {
            case "text":
                return (
                    <input
                        type="text"
                        placeholder="Enter text"
                        className="w-full border-b p-2"
                        value={answers[q.questionId] || ""}
                        onChange={(e) => handleChange(q.questionId, e.target.value)}
                    />
                );

            case "select":
                return (
                    <select
                        className="w-full border p-2 rounded"
                        value={answers[q.questionId] || ""}
                        onChange={(e) => handleChange(q.questionId, e.target.value)}
                    >
                        <option value="">Select option</option>
                        {q.options?.map((opt, idx) => (
                            <option key={idx} value={opt}>
                                {opt}
                            </option>
                        ))}
                    </select>
                );

            case "radio":
                return (
                    <div className="space-y-2">
                        {q.options?.map((opt, idx) => (
                            <label key={idx} className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name={q.questionId}
                                    value={opt}
                                    checked={answers[q.questionId] === opt}
                                    onChange={() => handleChange(q.questionId, opt)}
                                />
                                {opt}
                            </label>
                        ))}
                    </div>
                );

            case "checkbox":
                return (
                    <div className="space-y-2">
                        {q.options?.map((opt, idx) => {
                            const selected = answers[q.questionId] || [];
                            return (
                                <label key={idx} className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        value={opt}
                                        checked={selected.includes(opt)}
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                handleChange(q.questionId, [...selected, opt]);
                                            } else {
                                                handleChange(
                                                    q.questionId,
                                                    selected.filter((o) => o !== opt)
                                                );
                                            }
                                        }}
                                    />
                                    {opt}
                                </label>
                            );
                        })}
                    </div>
                );

            case "file":
                return (
                    <input
                        type="file"
                        className="w-full border p-2"
                        onChange={(e) => {
                            const file = e.target.files[0];
                            handleChange(q.questionId, file ? file.name : ""); // only filename
                        }}
                    />
                );

            case "range":
                return (
                    <div className="flex flex-col items-center">
                        <input
                            type="range"
                            min="1"
                            max="5"
                            value={answers[q.questionId] || 3}
                            onChange={(e) => handleChange(q.questionId, e.target.value)}
                        />
                        <div className="flex gap-4 mt-2">
                            {[1, 2, 3, 4, 5].map((n) => (
                                <span key={n}>{n}⭐</span>
                            ))}
                        </div>
                    </div>
                );

            case "date":
                return (
                    <input
                        type="date"
                        className="w-full border p-2"
                        value={answers[q.questionId] || ""}
                        onChange={(e) => handleChange(q.questionId, e.target.value)}
                    />
                );

            case "time":
                return (
                    <input
                        type="time"
                        className="w-full border p-2"
                        value={answers[q.questionId] || ""}
                        onChange={(e) => handleChange(q.questionId, e.target.value)}
                    />
                );

            default:
                return <p>Unsupported field</p>;
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-4 space-y-6">
            <h2 className="text-xl font-bold">{form.formName}</h2>
            <p className="text-gray-500">{form.description}</p>

            {questions.map((q, idx) => (
                <div key={q.questionId} className="border p-4 rounded space-y-2">
                    <label className="font-medium">
                        {q.sequence}. {q.question} {q.required && "*"}
                    </label>
                    {renderField(q)}
                </div>
            ))}

            <button
                onClick={handleSubmit}
                className="bg-yellow-400 text-white px-6 py-2 rounded shadow"
            >
                Submit
            </button>
        </div>
    );
};

export default UserAnswers;
