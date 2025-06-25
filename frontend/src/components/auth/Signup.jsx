import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import { USER_API_END_POINT } from "@/utils/api";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { loading } = useSelector((store) => store.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [errors, setErrors] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const userData = new FormData();
    userData.append("fullname", formData.fullname);
    userData.append("email", formData.email);
    userData.append("password", formData.password);
    userData.append("phoneNumber", formData.phoneNumber);
    userData.append("role", formData.role);
    if (formData.file) {
      userData.append("file", formData.file);
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, userData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (error) {
      console.log(error.response.data);
      toast.error(error.response?.data?.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const validateForm = () => {
    let newErrors = { ...errors };

    if (!formData.fullname.trim()) newErrors.fullname = "Name is required";
    else newErrors.fullname = "";

    if (!formData.email) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Invalid email format";
    else newErrors.email = "";

    if (!formData.phoneNumber) newErrors.phoneNumber = "Number is required";
    else if (!/^\+?[1-9][0-9]{9,14}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Enter a valid phone number";
    } else newErrors.phoneNumber = "";

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else {
      const errors = [];
      if (formData.password.length < 8) errors.push("at least 8 characters");
      if (!/[A-Z]/.test(formData.password)) errors.push("one uppercase letter");
      if (!/[a-z]/.test(formData.password)) errors.push("one lowercase letter");
      if (!/[!@#$%^&*(),.?":{}|<>]/.test(formData.password))
        errors.push("one special character");

      if (errors.length) {
        newErrors.password = `Password must contain ${errors.join(", ")}`;
      } else {
        newErrors.password = "";
      }
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    } else {
      newErrors.confirmPassword = "";
    }

    if (!formData.role) newErrors.role = "Role is required";
    else newErrors.role = "";

    setErrors(newErrors);

    for (const key in newErrors) {
      if (newErrors[key]) return false;
    }

    return true;
  };

  return (
    <div>
      <Navbar />
      <div>
        <div className="flex items-center justify-center md:max-w-7xl max-w-sm mx-auto ">
          <form
            onSubmit={handleSubmit}
            className="p-4 mx-auto md:w-1/2 md:border md:border-gray-200 md:rounded-md md:p-6 my-10 "
            noValidate
          >
            <h1 className="font-bold md:text-3xl sm:text-2xl text-xl mb-5 text-[#1248b2]">
              Sign up
            </h1>
            <div className="my-4">
              <Label>
                Full name<span className="text-red-500 ml-1">*</span>
              </Label>
              <Input
                type="text"
                placeholder="Enter your name"
                name="fullname"
                onChange={changeEventHandler}
                value={formData.fullname}
                className="placeholder:text-sm md:placeholder:text-base"
              />
              {errors.fullname && (
                <p className="text-red-500 text-sm my-1 mx-2">
                  {errors.fullname}
                </p>
              )}
            </div>

            <div className="my-4">
              <Label>
                Email<span className="text-red-500 ml-1">*</span>
              </Label>
              <Input
                type="email"
                placeholder="user@gmail.com"
                name="email"
                onChange={changeEventHandler}
                value={formData.email}
                className="placeholder:text-sm md:placeholder:text-base"
              />
              {errors.email && (
                <p className="text-red-500 text-sm my-1 mx-2">{errors.email}</p>
              )}
            </div>

            <div className="my-4">
              <Label>
                Password<span className="text-red-500 ml-1">*</span>
              </Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  name="password"
                  onChange={changeEventHandler}
                  value={formData.password}
                  className="placeholder:text-sm md:placeholder:text-base pr-10"
                />
                {formData.password && (
                  <div
                    className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </div>
                )}
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm my-1 mx-2">
                  {errors.password}
                </p>
              )}
            </div>

            <div className="my-4 mb-6">
              <Label>
                Confirm Password<span className="text-red-500 ml-1">*</span>
              </Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  name="confirmPassword"
                  onChange={changeEventHandler}
                  value={formData.confirmPassword}
                  className="placeholder:text-sm md:placeholder:text-base pr-10"
                />
                {formData.confirmPassword && (
                  <div
                    className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </div>
                )}
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm my-1 mx-2">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {loading ? (
              <Button className="w-full my-2 bg-blue-700 hover:bg-blue-600">
                <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button
                className="w-full my-2 bg-[#1248b2] hover:bg-blue-700"
                type="submit"
              >
                sign up
              </Button>
            )}
            <div className="text-sm pt-4">
              Already have an account ?{" "}
              <Link to="/login" className="text-blue-900">
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
