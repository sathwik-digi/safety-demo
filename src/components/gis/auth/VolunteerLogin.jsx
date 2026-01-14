import React, { useState } from "react";
import backgroundImage from '../../../assets/Images/LoginBackground.png';
import mobileBackgroundImage from '../../../assets/Images/mobile-auth-background.png';
import LoadingComponent from "../../../lib/LoadingComponent";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner"
import { setCookie } from "../../../https";
import { accessToken } from "../../../constants";
import { useDispatch } from "react-redux";
import { saveAclData } from "../../../redux/slices/aclSlice";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

const REACT_APP_API = import.meta.env.VITE_REACT_APP_API;

const VolunteerLogin = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    const [passwordInputType, setPasswordInputType] = useState("password");
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
        if (value.trim() !== "") {
            setErrors((prev) => ({ ...prev, [id]: "" }));
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        let isValid = true;
        let newErrors = {
          email: "",
          password: "",
        };
    
    
        if (!formData.email.trim()) { 
          newErrors.email = "Email is required";
          isValid = false;
        }
        if (!formData.password.trim()) {
          newErrors.password = "Password is required";
          isValid = false;
        }

        setErrors(newErrors);
    
    
        if (isValid) {
            setLoading(true);
            const res = await axios.post(`https://sm-authentication-${REACT_APP_API}/auth/login`, {
              email: formData.email,
              password: formData.password,
              mobileNumber: "",
              otp: ""
            });
            const response = res.data;
    
            if (response?.success) {
              setCookie(accessToken, response?.token, 1);
              setCookie("userId", response?.userId, 1);
              const ress = await axios.get(`https://sm-acl-${REACT_APP_API}/acl/get-user-role-premissions-and-function-by-user-id/${response?.userId}`);
              setCookie("siteName", ress?.data?.siteName, 1);
              dispatch(saveAclData(ress?.data));
              setLoading(false);
              toast.success("Login Successful");
              navigate(`/${ress?.data?.siteName}/dashboard`);
            }
            else {
              setLoading(false);
              toast.error(response?.errorMessage ?? 'Please check your mail and password', {
                style: {
                  backgroundColor: '#ff4d4f',
                  color: '#fff',
                },
              });
            }
        }
      };

    const handleInputPassswordType = () => {
        if (passwordInputType === "password") {
            setPasswordInputType("text")
        }
        else {
            setPasswordInputType("password")
        }
    }

    return (
        <>
            {loading && <LoadingComponent />}
            <div className="flex flex-col md:flex-row h-screen w-full font-['Segoe_UI',_sans-serif]">
                {/* Left Side Background */}
                <div className="">
                    <img
                        src={backgroundImage}
                        className="hidden md:block w-[80vw] h-screen object-cover"
                        alt="Desktop background"
                    />
                    <img
                        src={mobileBackgroundImage}
                        className="block md:hidden w-[100vw] h-[50vw]"
                        alt="Mobile background"
                    />
                </div>

                {/* Right Side Form */}
                <div className="w-full md:w-[550px] flex flex-col justify-start md:pt-42 pt-10 px-4 md:px-16 bg-white relative">
                    {/* Login Form */}
                    <div className="w-full max-w-[350px] space-y-6">
                        <div className="text-center">
                            <div className="w-8 h-8 bg-gray-300 rounded-full mx-auto mb-3" />
                            <h2 className="text-2xl font-semibold text-gray-900">
                                Log in
                            </h2>
                            <p className="text-sm text-gray-600">
                                Don’t have an account?{" "}
                                <Link to="/auth/volunteer-Registration" className="text-[#FDB43C] hover:underline">
                                    Sign up
                                </Link>
                            </p>
                        </div>

                        <>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Your email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="password">Your password</Label>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        type={passwordInputType}
                                        placeholder="Password"
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                    <div className="absolute top-3 right-3 " onClick={handleInputPassswordType}>
                                        {passwordInputType === "text" && (<FaEye size={18} />)}
                                        {passwordInputType === "password" && (<FaEyeSlash size={18} />)}
                                    </div>
                                </div>
                                {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                            </div>

                            <div className="flex justify-end">
                                <span className="text-sm text-gray-500 underline cursor-pointer">
                                    Forgot your password?
                                </span>
                            </div>

                            <Button
                                type="submit"
                                onClick={handleLogin}
                                className="bg-[#FFD36A] text-white p-4 w-full rounded-full font-bold text-base hover:bg-[#e6c859]"
                            >
                                Log in
                            </Button>
                        </>
                    </div>
                </div>
            </div>
        </>
    )
}

export default VolunteerLogin;