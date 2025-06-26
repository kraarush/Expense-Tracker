import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { EXPENSE_API_END_POINT } from "@/utils/api";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { toast } from "sonner";
import Navbar from "./shared/Navbar";

const SingleExpense = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [expense, setExpense] = useState({
    amount: "",
    category: "",
    description: "",
    date: "",
  });

  useEffect(() => {
    const fetchExpense = async () => {
      try {
        const res = await axios.get(`${EXPENSE_API_END_POINT}/get/${id}`, {
          withCredentials: true,
        });
        const data = res.data.expense;
        setExpense({
          ...data,
          date: data.date.slice(0, 10),
        });
      } catch (err) {
        toast.error("Failed to load expense");
        console.error(err);
      }
    };

    fetchExpense();
  }, [id]);

  const handleChange = (e) => {
    setExpense({ ...expense, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`${EXPENSE_API_END_POINT}/${id}`, expense, {
        withCredentials: true,
      });
      toast.success("Expense updated successfully!");
      navigate("/dashboard");
    } catch (err) {
      toast.error("Failed to update expense");
      console.error(err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-md mt-8">
        <h2 className="text-2xl font-semibold mb-4">Edit Expense</h2>
        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Amount (₹)</label>
            <Input
              type="number"
              name="amount"
              value={expense.amount}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select
              name="category"
              value={expense.category}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            >
              <option value="">Select category</option>
              <option value="Food">Food</option>
              <option value="Travel">Travel</option>
              <option value="Shopping">Shopping</option>
              <option value="Health">Health</option>
              <option value="Utilities">Utilities</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <Textarea
              name="description"
              value={expense.description}
              onChange={handleChange}
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Date</label>
            <Input
              type="date"
              name="date"
              value={expense.date}
              onChange={handleChange}
              required
            />
          </div>

          <Button type="submit" className="w-full">
            Update Expense
          </Button>
        </form>
      </div>
    </>
  );
};

export default SingleExpense;
