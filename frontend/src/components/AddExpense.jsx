import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { EXPENSE_API_END_POINT } from "@/utils/api";
import { toast } from "sonner";
import { Textarea } from "./ui/textarea";
import { useSelector } from "react-redux";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AddExpense = () => {
  const { loading } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  const [inputData, setFormData] = useState({
    amount: "",
    category: "",                                             
    description: "",
    date: "",
  });

  const [errors, setErrors] = useState({
    amount: "",
    category: "",
    description: "",
    date: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = { ...errors };

    if (
      !inputData.amount ||
      isNaN(inputData.amount) ||
      Number(inputData.amount) <= 0
    ) {
      newErrors.amount = "Amount must be a positive number";
    } else {
      newErrors.amount = "";
    }

    if (!inputData.category) {
      newErrors.category = "Category is required";
    } else {
      newErrors.category = "";
    }

    if (!inputData.description || inputData.description.trim().length < 5) {
      newErrors.description = "Description must be at least 5 characters";
    } else {
      newErrors.description = "";
    }

    if (!inputData.date || isNaN(Date.parse(inputData.date))) {
      newErrors.date = "Valid date is required";
    } else {
      newErrors.date = "";
    }

    setErrors(newErrors);

    return Object.values(newErrors).every((err) => err === "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const res = await axios.post(`${EXPENSE_API_END_POINT}/`, inputData, {
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success("Expense added successfully");
        setFormData({ amount: "", category: "", description: "", date: "" });
        navigate('/dashboard');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center md:max-w-7xl mx-auto">
        <form
          onSubmit={handleSubmit}
          className="p-4 mx-auto md:w-1/2 md:border md:border-gray-200 md:rounded-md md:p-6 my-10"
        >
          <h1 className="font-bold md:text-3xl text-2xl mb-5 text-[#1248b2]">
            Add New Expense
          </h1>

          <div className="mb-4">
            <Label>
              Amount (₹)<span className="text-red-500 ml-1">*</span>
            </Label>
            <Input
              type="text"
              name="amount"
              value={inputData.amount}
              onChange={handleChange}
              placeholder="Enter amount"
            />
            {errors.amount && (
              <p className="text-red-500 text-sm mt-1">{errors.amount}</p>
            )}
          </div>

          <div className="mb-4">
            <Label>
              Category<span className="text-red-500 ml-1">*</span>
            </Label>
            <select
              name="category"
              value={inputData.category}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="">Select Category</option>
              <option value="Food">Food</option>
              <option value="Travel">Travel</option>
              <option value="Shopping">Shopping</option>
              <option value="Health">Health</option>
              <option value="Utilities">Utilities</option>
              <option value="Other">Other</option>
            </select>
            {errors.category && (
              <p className="text-red-500 text-sm mt-1">{errors.category}</p>
            )}
          </div>

          <div className="mb-4">
            <Label htmlFor="description">
              Description<span className="text-red-500 ml-1">*</span>
            </Label>
            <Textarea
              id="description"
              name="description"
              value={inputData.description}
              onChange={handleChange}
              placeholder="Enter description"
              className="mt-1"
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description}</p>
            )}
          </div>

          <div className="mb-6">
            <Label>
              Date<span className="text-red-500 ml-1">*</span>
            </Label>
            <Input
              type="date"
              name="date"
              value={inputData.date}
              onChange={handleChange}
            />
            {errors.date && (
              <p className="text-red-500 text-sm mt-1">{errors.date}</p>
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
              Add expense
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddExpense;
