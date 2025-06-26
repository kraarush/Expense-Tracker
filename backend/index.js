import express from 'express';
import cors from 'cors';
import { configDotenv } from 'dotenv';
import userRoutes from "./routes/user.route.js";
import expenseRoutes from "./routes/expense.route.js";
import connectDB from './utils/db.js';
import cookieParser from 'cookie-parser';
import swaggerUi from 'swagger-ui-express';

import fs from 'fs';
const swaggerDocument = JSON.parse(fs.readFileSync('./swagger-output.json', 'utf-8'));

const app = express();
const PORT = process.env.PORT || 3000;
configDotenv();


// middlewares
app.use(express.json());
app.use(cookieParser());


// cors setup
const corsOption = {
    origin: ['http://localhost:5173','https://exprensio.netlify.app'],
    credentials: true
}
app.use(cors(corsOption));

// routes
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/expenses', expenseRoutes);


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.listen(PORT, async() => {
    await connectDB();
    console.log(`server is live on http://localhost:${PORT}`);
});