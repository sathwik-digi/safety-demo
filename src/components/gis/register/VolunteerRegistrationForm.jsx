import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Controller } from "react-hook-form";

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select"

const VolunteerRegistrationForm = () => {

  const navigate = useNavigate();

  const formSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    email: z.string().email({ message: "Invalid email address." }),
    phoneNumber: z.string().min(10, { message: "Enter a valid number." }),
    address: z.string().min(2, { message: " Address must be at least 5 characters." }),
    state: z.string().min(2, { message: "State is required" }),
    dob: z.string().min(6, { message: "please enter date of birth." }),
    city: z.string().min(2, { message: "City must be at least 2 characters." }),
    password: z.string().min(8, { message: "Please enter minimum 8 characters" }),
    confirmPassword: z.string().min(8, { message: "Please enter minimum 8 characters" })
  });
  const { register, handleSubmit, formState: { errors },control } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      city: "",
      state: "",
      dob: "",
      address: "",
      password: "",
      confirmPassword: "",
    },
  });


  const handleRegister = (data) => {
    navigate("/auth/volunteerRegistrationSuccess")
  }

  return (
    <div className="p-6 max-w-1xl mx-auto space-y-6">
      <p className="text-sm text-muted-foreground">
        Andhra Pradesh Industrial Infrastructure Corporation Ltd. (APIIC) was incorporated on 26th September, 1973 with Authorised Capital of Rs.20.00 crores and paid up capital of Rs.16.33 crores. APIIC is a wholly owned Undertaking of Government of Andhra Pradesh.
      </p>

      <h2 className="text-2xl font-semibold">Volunteer Identity</h2>

      <form onSubmit={handleSubmit(handleRegister)} className="max-w-6xl mx-auto p-6 space-y-8">
        {/* Name + Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm block mb-1">Name of the person</label>
            <Input type="text" placeholder="name" register={register} name="name" className="text-sm h-9" />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <label className="text-sm block mb-1">Email ID</label>
            <Input type="email" placeholder="@gmail.com" register={register} name="email" className="text-sm h-9" />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>
        </div>

        {/* Contact + City */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <div>
            <label className="text-sm block mb-1">Contact number</label>
            <Input type="tel" placeholder="+91" register={register} name="phoneNumber" className="text-sm h-9" />
            {errors.phoneNumber && <p className="text-red-500 text-xs mt-1">{errors.phoneNumber.message}</p>}
          </div>

          <div>
            <label className="text-sm block mb-1">City</label>
            <Input type="text" placeholder="City" register={register} name="city" className="text-sm h-9" />
            {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>}
          </div>
        </div>

        {/* State*/}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm block mb-1">State</label>

            <Controller
              name="state"
              control={control} // ✅ Make sure `control` is destructured from useForm
              rules={{ required: "State is required" }}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-[540px]">
                    <SelectValue placeholder="Select a state" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="AP">AP</SelectItem>
                      <SelectItem value="TS">TS</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />

            {errors.state && (
              <p className="text-red-500 text-xs mt-1">{errors.state.message}</p>
            )}
          </div>

          {/*DOB*/}
          <div>
            <label className="text-sm block mb-1">Date of Birthday</label>
            <Input type="date" register={register} name="dob" className="text-sm h-9" />
            {errors.dob && <p className="text-red-500 text-xs mt-1">{errors.dob.message}</p>}
          </div>
        </div>

        {/* Address */}
        <div>
          <label className="text-sm block mb-1">Permanent Address</label>
          <Input placeholder="Type your Address" register={register} name="address" className="text-md w-full rounded-md border border-input px-2 py-1" />
          {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>}
        </div>

        {/* Password + Confirm Password */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <div>
            <label className="text-sm block mb-1">Enter password</label>
            <Input type="password" placeholder="Enter Here" register={register} name="password" className="text-sm h-9" />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>

          <div>
            <label className="text-sm block mb-1">Re-Enter password</label>
            <Input type="password" placeholder="Enter Here" register={register} name="confirmPassword" className="text-sm h-9" />
            {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
          </div>
        </div>

        {/* Terms & Privacy
      <p className="text-xs text-muted-foreground">
        By creating an account, you agree to our <span className="underline">Terms of use</span> and <span className="underline">Privacy Policy</span>
      </p> */}

        {/* Fake Captcha (just a placeholder) */}
        {/* <div>
        <img
          src="https://www.google.com/recaptcha/about/images/reCAPTCHA-dark.svg"
          alt="captcha"
          className="h-12"
        />
      </div> */}

        {/* Submit Button */}
        <div className="flex justify-center">

          <Button type="submit" onClick={handleSubmit(handleRegister)} className="bg-[#FED36A] text-white w-40 rounded-[20px]" >
            Register
          </Button>
        </div>
      </form>
    </div>
  );
};

export default VolunteerRegistrationForm;
