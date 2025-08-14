import React, { useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import ThreeDotsIcon from "../assets/Icons/three-dots-icon.png";

const FormDetails = () => {
  const { state: formDetails } = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [assignees, setAssignees] = useState([]);
  const [assignedTo, setAssignedTo] = useState([]);
  const [editDropDown, setEditDropDown] = useState(false);
  const [editable, setEditable] = useState(false);

  const [formName, setFormName] = useState(formDetails?.formName || "");
  const [description, setDescription] = useState(formDetails?.description || "");
  const [formDeadline, setFormDeadline] = useState(formDetails?.formDeadline || "");
  const [questions, setQuestions] = useState(
    formDetails?.dynamicFormQuestionEntities || []
  );

  const navigate = useNavigate();

  if (!formDetails) {
    return <div className="p-6">No form details available</div>;
  }

  const handleAssignees = async () => {
    try {
      if (!isOpen) {
        const response = await axios.get(
          "http://localhost:8082/v1/department/get-all-irt-departments"
        );
        setAssignees(response?.data || []);
      }
      setIsOpen((prev) => !prev);
    } catch (error) {
      toast.error("Error fetching assignees:", error);
    }
  };

  const toggleDepartment = (departmentId) => {
    setAssignedTo((prev) =>
      prev.includes(departmentId)
        ? prev.filter((id) => id !== departmentId)
        : [...prev, departmentId]
    );
  };

  const handleSave = async () => {
    const payload = {
      formId: formDetails.formId,
      creatorId: "user1006",
      assigneeId: assignedTo,
      userType: "department",
      formName,
      description,
      formDeadline,
      dynamicFormQuestionEntities: questions,
    };
    try {
      const response = await axios.post(
        "http://localhost:8082/v1/form/assigne-forms-to-users",
        payload
      );
      if (response?.data?.success) {
        toast.success("Form saved/assigned successfully");
        navigate(-1);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const handleUpdate =async()=>{
    const payload={
        formId:formDetails.formId,
        formName,
        description,
        formDeadline,
        creatorId: "user1006",
        formType: "irs",
        dynamicFormQuestionEntities:questions

    }
    console.log(payload,"Update payload");
    try{
        const response = await axios.put(`http://localhost:8082/v1/form/update-forms/${formDetails.formId}`,payload)
        console.log(response,"Response")
    if(response?.data){
        toast.success("Form updated successfully");
    }
    else{
        toast.error("Please check the data")
    }
    }
    catch(error){
        toast.error("Please check the data catch ")
    }

  }

  const handleClick = () => {
    setEditDropDown(!editDropDown);
  };

  const handleEdit = () => {
    setEditable((prev) => !prev);
    setEditDropDown(false);
  };

  const handleQuestionChange = (idx, value) => {
    const updated = [...questions];
    updated[idx].question = value;
    setQuestions(updated);
  };

  const renderField = (question, idx) => {
    switch (question.fieldType) {
      case "text":
        return (
          <Input
            value={question.answer || ""}
            onChange={(e) => {
              if (editable) {
                const updated = [...questions];
                updated[idx].answer = e.target.value;
                setQuestions(updated);
              }
            }}
            disabled={!editable}
            className="w-full"
          />
        );

      case "radio":
        return (
          <RadioGroup
            value={question.answer || ""}
            onValueChange={(val) => {
              if (editable) {
                const updated = [...questions];
                updated[idx].answer = val;
                setQuestions(updated);
              }
            }}
          >
            {question.dropDownValues &&
              Object.keys(question.dropDownValues).map((option) => (
                <div key={option} className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={option}
                    id={option}
                    disabled={!editable}
                  />
                  <Label htmlFor={option}>{option}</Label>
                </div>
              ))}
          </RadioGroup>
        );

      case "checkbox":
        return (
          <div className="space-y-2">
            {question.dropDownValues &&
              Object.keys(question.dropDownValues).map((option) => (
                <div key={option} className="flex items-center space-x-2">
                  <Checkbox
                    checked={question.answer?.includes(option)}
                    onCheckedChange={(checked) => {
                      if (editable) {
                        const updated = [...questions];
                        let answers = updated[idx].answer || [];
                        if (checked) {
                          answers = [...answers, option];
                        } else {
                          answers = answers.filter((a) => a !== option);
                        }
                        updated[idx].answer = answers;
                        setQuestions(updated);
                      }
                    }}
                    disabled={!editable}
                  />
                  <Label>{option}</Label>
                </div>
              ))}
          </div>
        );

      case "select":
        return (
          <Select
            value={question.answer || ""}
            onValueChange={(val) => {
              if (editable) {
                const updated = [...questions];
                updated[idx].answer = val;
                setQuestions(updated);
              }
            }}
            disabled={!editable}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select option" />
            </SelectTrigger>
            <SelectContent>
              {question.dropDownValues &&
                Object.keys(question.dropDownValues).map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        );

      case "file":
        return (
          <p>
            {question.answer
              ? `Uploaded: ${question.answer}`
              : "No file uploaded"}
          </p>
        );

      case "date":
      case "time":
      case "range":
        return (
          <Input
            type={question.fieldType}
            value={question.answer || ""}
            onChange={(e) => {
              if (editable) {
                const updated = [...questions];
                updated[idx].answer = e.target.value;
                setQuestions(updated);
              }
            }}
            disabled={!editable}
            className="w-full"
          />
        );

      default:
        return <p>—</p>;
    }
  };


  console.log(formDetails,"formDetails")

  return (
    <div className="p-6 space-y-6">
      {/* Top buttons */}
      <div className="flex justify-end space-x-4 relative">
        {!editable ? (
          <>
            <Button
              className="bg-yellow-500 hover:bg-yellow-600 text-white"
              onClick={handleSave}
            >
              Save
            </Button>
            <Button
              className="bg-yellow-500 hover:bg-yellow-600 text-white"
              onClick={handleAssignees}
            >
              Assign
            </Button>
          </>
        ) : (
          <Button
            className="bg-green-500 hover:bg-green-600 text-white"
            onClick={handleUpdate}
          >
            Update
          </Button>
        )}

        {/* Three dots */}
        <div className="relative inline-block">
          <img
            src={ThreeDotsIcon}
            className="w-8 h-8 cursor-pointer"
            alt="More"
            onClick={handleClick}
          />
          {editDropDown && (
            <div className="absolute right-0 mt-2 w-24 bg-white border rounded shadow-md z-10">
              <button
                className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                onClick={handleEdit}
              >
                {editable ? "Cancel" : "Edit"}
              </button>
            </div>
          )}
        </div>

        {/* Assignee dropdown */}
        {isOpen && (
          <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded shadow-lg border z-10">
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

      {/* Static info */}
      <Card>
        <CardHeader>
          {editable ? (
            <Input
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
            />
          ) : (
            <CardTitle>{formName}</CardTitle>
          )}
        </CardHeader>
        <CardContent className="space-y-2">
          <div>
            <strong>Description:</strong>{" "}
            {editable ? (
              <Input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            ) : (
              description
            )}
          </div>
          <div>
            <strong>Deadline:</strong>{" "}
            {editable ? (
              <Input
                type="date"
                value={formDeadline}
                onChange={(e) => setFormDeadline(e.target.value)}
              />
            ) : (
              formDeadline
            )}
          </div>
        </CardContent>
      </Card>

      {/* Dynamic Questions */}
      <Card>
        <CardHeader>
          <CardTitle>Form Questions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {questions?.length > 0 ? (
            questions.map((q, idx) => (
              <div key={q.questionId} className="space-y-2 border-b pb-4">
                <Label className="font-medium">
                  {idx + 1}.{" "}
                  {editable ? (
                    <Input
                      value={q.question}
                      onChange={(e) =>
                        handleQuestionChange(idx, e.target.value)
                      }
                    />
                  ) : (
                    q.question
                  )}
                  {q.required && <span className="text-red-500">*</span>}
                </Label>
                {renderField(q, idx)}
              </div>
            ))
          ) : (
            <p className="text-gray-500">No questions available</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default FormDetails;
