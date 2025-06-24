import express from 'express';
import cors from 'cors';
import { configDotenv } from 'dotenv';
import userRoutes from "./routes/user.route.js";
import expenseRoutes from "./routes/expense.route.js";
import connectDB from './utils/db.js';

const app = express();
const PORT = process.env.PORT || 3000;
configDotenv();


// middlewares
app.use(express.json());

// cors setup
const corsOption = {
    origin: ['http://localhost:5173']
}
app.use(cors(corsOption));

// routes
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/expense', expenseRoutes);

app.listen(PORT, async() => {
    await connectDB();
    console.log(`server is live on http://localhost:${PORT}`);
});