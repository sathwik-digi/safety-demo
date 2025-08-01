import React, { useState } from "react";

const DynamicForm = () => {
  const [questions, setQuestions] = useState([]);
  const [nextId, setNextId] = useState(1);

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

  console.log(questions)
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Dynamic Google Form Clone</h1>

      <button
        onClick={addQuestion}
        className="mb-4 px-4 py-2 bg-green-500 text-white rounded"
      >
        + Add Question
      </button>

      {questions.map((q, idx) => (
        <div
          key={q.id}
          className="border p-4 mb-4 rounded shadow-sm bg-white"
        >
          <label className="block font-medium mb-1">
            Question {idx + 1}
          </label>
          <input
            type="text"
            value={q.question}
            onChange={(e) =>
              updateQuestion(q.id, "question", e.target.value)
            }
            placeholder="Enter your question"
            className="border px-2 py-1 w-full mb-2"
          />
          <select
            value={q.fieldType}
            onChange={(e) =>
              updateQuestion(q.id, "fieldType", e.target.value)
            }
            className="mb-2 border px-2 py-1"
          >
            <option value="text">Text</option>
            <option value="radio">Multiple Choice (Radio)</option>
            <option value="checkbox">Checkboxes</option>
          </select>

          {(q.fieldType === "radio" || q.fieldType === "checkbox") && (
            <div>
              <p className="mb-1">Options:</p>
              {q.options.map((opt, i) => (
                <input
                  key={i}
                  type="text"
                  value={opt}
                  onChange={(e) => updateOption(q.id, i, e.target.value)}
                  placeholder={`Option ${i + 1}`}
                  className="border px-2 py-1 w-full mb-1"
                />
              ))}
              <button
                type="button"
                onClick={() => addOption(q.id)}
                className="text-blue-600 text-sm mt-1"
              >
                + Add Option
              </button>
            </div>
          )}

          <button
            onClick={() => removeQuestion(q.id)}
            className="text-red-600 mt-2 text-sm"
          >
            🗑 Remove
          </button>
        </div>
      ))}

      {questions.length > 0 && (
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-3">Preview</h2>
          {questions.map((q) => (
            <div key={q.id} className="mb-4">
              <p className="font-medium mb-1">{q.question}</p>

              {q.fieldType === "text" && (
                <input
                  type="text"
                  disabled
                  placeholder="Your answer"
                  className="border px-2 py-1 w-full bg-gray-100"
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
            </div>
          ))}

          <button
            type="button"
            className="px-4 py-2 bg-blue-500 text-white rounded mt-4"
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default DynamicForm;
