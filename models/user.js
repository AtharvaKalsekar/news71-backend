import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: String,
  password: String,
  email: String,
  verificationOtp: Number,
  otpGeneratedAt: Date,
  isEmailVerified: Boolean,
});

const User = mongoose.model("User", UserSchema);

export default User;
