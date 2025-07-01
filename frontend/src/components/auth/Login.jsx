import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";
import { USER_API_END_POINT } from "@/utils/api";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((store) => store.auth);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
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

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (res.data?.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const validateForm = () => {
    let newErrors = { ...errors };

    if (!formData.email) newErrors.email = "Email is required";
    else if (!formData.email.includes("@") || !formData.email.includes("."))
      newErrors.email = "Invalid email format";
    else newErrors.email = "";

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be atleast 6 characters";
    } else {
      newErrors.password = "";
    }

    setErrors(newErrors);

    for (const key in newErrors) {
      if (newErrors[key]) return false;
    }

    return true;
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center md:max-w-5xl sm:max-w-4xl mx-auto my-16 ">
          <form
            onSubmit={handleSubmit}
            className=" w-4/5 md:w-1/2 border border-gray-200 rounded-md p-6 "
            noValidate
          >
            <h1 className="font-bold md:text-3xl sm:text-2xl text-xl mb-5 text-[#1248b2]">
              {" "}
              Login
            </h1>

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

            <div className="mb-6">
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
                Login
              </Button>
            )}

            <div className="text-sm pt-4">
              Don't have an account ?
              <Link to="/signup" className="text-blue-900">
                {" "}
                Sign Up{" "}
              </Link>
            </div>
          </form>
        </div>
    </div>
  );
};

export default Login;
