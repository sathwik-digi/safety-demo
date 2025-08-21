import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

const GisUserAnswers = () => {
  const location = useLocation();
  const rowData = location.state;
  const navigate = useNavigate();

  if (!rowData || !rowData.answers) {
    return <div className="p-4">No data available</div>;
  }

  const renderAnswer = (ans) => {
    const type = ans.fieldType;

    switch (type) {
      case "checkbox":
        return (
          <div className="flex flex-col gap-2">
            {Object.entries(ans.answeredOptions || {}).map(([option, checked]) => (
              <label
                key={option}
                className="flex items-center gap-2"
              >
                <input type="checkbox" checked={checked} disabled />
                <span>{option}</span>
              </label>
            ))}
          </div>
        );

      case "radio":
        return (
          <div className="flex items-center gap-2">
            <input type="radio" checked disabled />
            <span>{ans.answer}</span>
          </div>
        );

      case "select":
        return <div className="border rounded-md px-3 py-2 text-gray-700">{ans.answer}</div>;

      case "range":
        return (
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={20}
                className={star <= Number(ans.answer) ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}
              />
            ))}
          </div>
        );

      case "file":
        return ans.answer ? (
          <a href={ans.answer} target="_blank" rel="noreferrer" className="text-blue-500 underline">
            View File
          </a>
        ) : (
          "—"
        );

      case "image":
        return (
          <div className="flex gap-4">
            {ans.image && (
              <img
                src={ans.image}
                alt="Answer"
                className="w-32 h-32 object-cover rounded-md border"
              />
            )}
            <div>
              <p className="font-semibold">{ans.title}</p>
              <p>{ans.answer}</p>
            </div>
          </div>
        );

      case "date":
        return <span>{ans.answer ? new Date(ans.answer).toLocaleDateString() : "—"}</span>;

      case "time":
        return <span>{ans.answer || "—"}</span>;

      default:
        return <p className="text-gray-700">{ans.answer || "—"}</p>;
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Back Button */}
      <Button
        className="bg-white text-black border border-gray-300 hover:bg-gray-100 mb-6"
        onClick={() => navigate(-1)}
      >
        ← Back
      </Button>

      {/* Form Header */}
      <div className="bg-white shadow-md rounded-md p-6 mb-6">
        <h1 className="text-xl font-semibold">
          {rowData.formName || "Form Answers"}
        </h1>
        <p className="text-gray-600 mt-1">{rowData.description}</p>
      </div>

      {/* Questions */}
      <div className="space-y-4">
        {rowData.answers.map((ans, idx) => (
          <div
            key={idx}
            className="bg-white border rounded-md shadow-sm overflow-hidden"
          >
            <div className="border-t-4 border-yellow-300 p-4">
              <p className="font-semibold text-lg mb-2">
                {ans.question} {ans.required && <span className="text-red-500">*</span>}
              </p>
              {ans.description && (
                <p className="text-gray-600 mb-3">{ans.description}</p>
              )}
              {renderAnswer(ans)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GisUserAnswers;
