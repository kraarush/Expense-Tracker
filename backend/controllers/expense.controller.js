import Expense from "../model/expense.model.js";
import validator from 'validator';

export const getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({userId: req.id}).sort({ createdAt: -1 });

    return res.status(200).json({
      expenses,
      success: true
    });
  }
  catch (err) {
    console.log(err.message);
    res.status(500).json({
      success: false,
      error: 'Internal server error in getAllExpenses controller'
    });
  }
};

export const addExpense = async (req, res) => {
  try {

    let { amount, category, description, date } = req.body;

    amount = parseFloat(amount);
    category = category?.trim() || "";
    description = description?.trim() || "";
    date = date?.trim() || "";
    const isValidDate = validator.isISO8601(date);

    if (!amount || amount <= 0 || isNaN(amount) || !category || !description || !isValidDate) {
      return res.status(400).json({
        success: false,
        message: "Invalid or missing fields",
      });
    }

    const newExpense = new Expense({
      amount,
      category,
      description,
      date: new Date(date),
      userId: req.id,
    });

    await newExpense.save();

    res.status(201).json({
      success: true,
      message: "Expense added successfully"
    });
  }
  catch (err) {
    console.log(err.message);
    res.status(500).json({
      success: false,
      error: 'Internal server error in addExpense controller'
    });
  }
};


export const updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    let { amount, category, description, date } = req.body;

    const expense = await Expense.findById(id);

    if (!expense) {
      return res.status(404).json({
        success: false,
        message: 'Expense not found',
      });
    }

    if(amount !== undefined) {
      const parsedAmount = parseFloat(amount);
      if (isNaN(parsedAmount) || parsedAmount <= 0) {
        return res.status(400).json({ 
          success:false, 
          message: "Invalid amount" 
        });
      }
      amount = parsedAmount;
    }

    const newData = {
      amount: amount || expense.amount,
      category: category || expense.category,
      description: description?.trim() || expense.description,
      date: date || expense.date,
      userId: req.id
    }

    expense.set(newData);
    await expense.save();

    res.status(200).json({
      success: true,
      message: `Expense updated successfully`
    });
  }
  catch (err) {
    console.log(err.message);
    res.status(500).json({
      error: 'Internal server error in updateExpense controller ' +  err.message,
      success: false
    });
  }
};


export const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedData = await Expense.findByIdAndDelete(id);

    if (!deletedData) {
      return res.status(404).json({ error: 'Expense not found with given id' });
    }

    res.status(200).json({
      success: true,
      message: `Expense deleted successfully`
    });
  }
  catch (err) {
    console.log(err.message);
    res.status(500).json({
      error: 'Internal server error in deleteExpense controller',
      success: false
    });
  }
};

export const getExpenseById = async (req, res) => {
  try {
    const { id } = req.params;

    const expense = await Expense.findById(id);

    if (!expense) {
      return res.status(404).json({
        success: false,
        message: "Expense not found",
      });
    }

    res.status(200).json({
      success: true,
      expense,
    });
  } catch (err) {
    console.error("Error in getExpenseById:", err.message);
    res.status(500).json({
      success: false,
      error: "Internal server error in getExpenseById controller",
    });
  }
};