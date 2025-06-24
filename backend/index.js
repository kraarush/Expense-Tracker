import express from 'express';
import cors from 'cors';
import { configDotenv } from 'dotenv';
import userRoutes from "./routes/user.route.js";

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

app.use('/api/v1/user', userRoutes);

app.listen(PORT, () => {
    console.log(`server is live on http://localhost:${PORT}`);
});