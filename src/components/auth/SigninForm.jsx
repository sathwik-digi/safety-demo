import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import backgroundImage from '../../assets/Images/LoginBackground.png';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox"

const SigninForm = () => {
  const navigate = useNavigate();

  const [formData,setFormData]=useState(
    {
      email:"",
      credentials:"",
    }
  )
  const [errors, setErrors] = useState({
    email: "",
    credentials: "",
  });

  const handleChange=(e)=>{
    const {id,value}=e.target
    setFormData((prev)=>({...prev,[id]:value}));

    if(value.trim()!==""){
      setErrors((prev) => ({ ...prev, [id]: "" }));
    }
  }

  const handleSignIn=(e)=>{

    e.preventDefault();
    let isValid=true;
    const newErrors={email: "",credentials: ""};

    if(!formData.email.trim()){
      newErrors.email="Please enter Email address";
      isValid = false;
    }
    if(!formData.credentials.trim()){
      newErrors.credentials="Please enter the credentials";
      isValid =false;
    }
    setErrors(newErrors);

    if(isValid){
      navigate("/auth/create-account")
    }
  }

  return (
    <div className="flex h-screen w-full font-['Segoe_UI',_sans-serif]">
      <div
        className="flex-1 bg-cover bg-center bg-no-repeat md:shrink-0"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      ></div>

      <div className="w-[550px] flex flex-col justify-start pt-50 items-end pr-[140px] bg-white relative">
        <div className="absolute top-[150px] right-[130px] text-2xl cursor-pointer text-gray-800">×</div>
        <div className="w-full max-w-[350px]">
          <h2 className="text-2xl mb-5 text-gray-900">Sign in</h2>

          <div className="grid w-full max-w-sm items-center gap-3">
            <Label htmlFor="email">Email or phone number</Label>
            <Input type="email" id="email" placeholder="Email" value={formData.email} onChange={handleChange}/>
            {errors.email && <p className={"text-red-500 text-sm"}>{errors.email}</p>}
          </div>

          <div className="grid w-full max-w-sm mt-5 items-center gap-3">
            <Label htmlFor="credentials">Credentials</Label>
            <Input type="credentials" id="credentials" placeholder="credentials" value={formData.credentials} onChange={handleChange}/>
            {errors.credentials && <p className={"text-red-500 text-sm"}>{errors.credentials}</p>}
          </div>

          <Button
            type="submit"
            onClick={handleSignIn}
            className="bg-[#FFD36A] text-white p-6 w-full rounded-full font-bold text-base mt-5 hover:bg-[#e6c859]"
          >
            Sign in
          </Button>
          <div className="flex justify-between items-center mt-4">
            <div className="flex items-center gap-2">
              <Checkbox id="remember" />
              <Label htmlFor="remember" className="text-sm text-gray-800">
                Remember me
              </Label>
            </div>
            <span className="text-sm text-gray-500 underline cursor-pointer">Need help?</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SigninForm;