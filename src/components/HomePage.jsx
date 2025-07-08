import React from "react";
import { useNavigate } from "react-router-dom";
function HomePage() {
  const navigate = useNavigate();
  return (
    <>
      <div className="">HomePage</div>
      <button className="border-solid border-2 p-4 my-8 bg-red-200 rounded-sm border-indigo-600" onClick={()=>navigate("/dashboard")}>Navigate to dashboard</button>
    </>
  );
}

export default HomePage;