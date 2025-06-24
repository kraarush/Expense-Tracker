// routes/expenseRoutes.js
import express from 'express';
import { createExpense, getExpenses } from '../controllers/expense.controller.js';

const router = express.Router();

router.get('/getAll', getExpenses);
router.post('/addNew', createExpense);

export default router;
