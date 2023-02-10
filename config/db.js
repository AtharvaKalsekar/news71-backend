import colors from 'colors';
import mongoose from 'mongoose';

const _ = colors;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected:  ${conn.connection.host}`.cyan.underline);
  } catch (e) {
    console.log(`Error: ${e.message}`.red.bold.underline);
    process.exit(1);
  }
};

export default connectDB;
