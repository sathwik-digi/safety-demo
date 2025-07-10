import React from "react";
import backgroundImage from "../../assets/Images/LoginBackground.png";
import RecaptchaImage from '../../assets/Icons/Recaptcha.png';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

function CreateAccountForm() {
  return (
    <div className="flex h-screen w-full font-['Segoe_UI',_sans-serif]">
      {/* Left Side Image */}
      <div
        className="flex-1 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      />

      {/* Right Side Form */}
      <div className="w-[550px] flex flex-col justify-start pt-[50px] items-end pr-[140px] bg-white relative">
        {/* Close Button */}
        <div className="absolute top-[30px] right-[60px] text-2xl cursor-pointer text-gray-800">
          ×
        </div>

        <div className="w-full max-w-[350px] space-y-5">
          {/* Title & Link */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">Create an account</h2>
            <p className="text-sm text-gray-600">
              Already have an account?{" "}

              <Link className="text-[#FDB43C] hover:underline" to="/auth/login">Login</Link>
            </p>
          </div>

          {/* Username */}
          <div className="grid gap-2">
            <Label htmlFor="username">User name</Label>
            <Input id="username" placeholder="User name" />
          </div>

          {/* Email */}
          <div className="grid gap-2">
            <Label htmlFor="email">Email address</Label>
            <Input id="email" type="email" placeholder="Email address" />
          </div>

          {/* Password */}
          <div className="grid gap-2">
            <Label htmlFor="password">Create new Password</Label>
            <Input id="password" type="password" placeholder="New password" />
          </div>

          {/* Password Hint */}
          <p className="text-xs text-gray-500">
            Use 8 or more characters with a mix of letters, numbers & symbols
          </p>

          {/* Terms */}
          <p className="text-xs text-gray-600">
            By creating an account, you agree to our{" "}
            <a href="#" className="text-[#FDB43C] hover:underline">
              Terms of use
            </a>{" "}
            and{" "}
            <a href="#" className="text-[#FDB43C] hover:underline">
              Privacy Policy
            </a>
          </p>

          {/* Recaptcha Placeholder */}
          <div className="w-[260px] border rounded-md px-4 py-3 text-sm text-gray-600 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <input type="checkbox" id="robot" />
              <label htmlFor="robot">I'm not a robot</label>
            </div>
            <img src={RecaptchaImage} alt="captcha" className="w-7 h-7" />
          </div>
          {/* Submit Button */}
          <Button
            type="submit"
            className="bg-[#FFD36A] text-white p-6 w-full rounded-full font-bold text-base mt-2 hover:bg-[#e6c859]"
          >
            Create an account
          </Button>

          {/* Bottom Link */}
          <p className="text-sm text-gray-600 text-center">
            Already have an account?{" "}
            <Link className="text-[#FDB43C] hover:underline" to="/auth/login">Log in </Link>

          </p>
        </div>
      </div>
    </div>
  );
}

export default CreateAccountForm;
