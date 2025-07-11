// routes/expenseRoutes.js
import express from 'express';
import { addExpense, deleteExpense, getAllExpenses, getExpenseById, summaryByCategory, summaryByMonth, updateExpense,  } from '../controllers/expense.controller.js';
import authMiddleware from '../middlewares/authmiddleware.js';

const router = express.Router();


router.route('/').get(authMiddleware,getAllExpenses);
router.route('/').post(authMiddleware,addExpense);
router.route('/:id').patch(authMiddleware, updateExpense);       // I have used patch because user dont always need to send the whole data for updation he can just update the required fields
router.route('/:id').delete(authMiddleware, deleteExpense);
router.route('/get/:id').get(authMiddleware, getExpenseById);
router.route('/category').get(authMiddleware, summaryByCategory);
router.route('/month').get(authMiddleware, summaryByMonth);


export default router;
