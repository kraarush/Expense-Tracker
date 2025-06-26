import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import axios from "axios";
import { EXPENSE_API_END_POINT } from "@/utils/api";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const ShowAllExpense = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const res = await axios.get(`${EXPENSE_API_END_POINT}/`, {
          withCredentials: true,
        });
        setExpenses(res.data.expenses);
      } catch (err) {
        console.error("Failed to fetch expenses", err);
      }
    };

    fetchExpenses();
  }, []);

  return (
    <div>
      <Navbar />

      <div className="flex flex-col lg:max-w-7xl mx-auto my-16 p-4">
        <h1 className="font-bold text-2xl md:text-3xl">All Expenses</h1>

        <div className="mt-8 md:mt-4 overflow-x-auto">
          <Table>
            <TableCaption>All Expenses</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Amount (₹)</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Edit</TableHead>
                <TableHead>Delete</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {expenses.map((expense) => (
                <TableRow key={expense._id}>
                  <TableCell>
                    {new Date(expense.date).toLocaleDateString("en-IN")}
                  </TableCell>
                  <TableCell>₹{expense.amount}</TableCell>
                  <TableCell>{expense.category}</TableCell>
                  <TableCell>{expense.description || "-"}</TableCell>
                  <TableCell>
                    <Link to={`/expense/${expense._id}`}>
                      <Button variant="outline" size="sm">
                        <Pencil className="w-4 h-4" />
                      </Button>
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={async () => {
                        try {
                          await axios.delete(
                            `${EXPENSE_API_END_POINT}/${expense._id}`,
                            { withCredentials: true }
                          );

                          setExpenses((prev) =>
                            prev.filter((item) => item._id !== expense._id)
                          );

                          toast.success("Expense deleted successfully");
                        } catch (err) {
                          console.error("Delete failed", err);
                          toast.success("Error deleting expense");
                        }
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default ShowAllExpense;
