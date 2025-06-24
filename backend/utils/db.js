import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log('db connected successfully');
  } catch (error) {
    console.error('db connection failed:', error.message);
    process.exit(1);
  }
};

export default connectDB;
