import User from "../models/User.js";
import OTP from "../models/OTP.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendOtpEmail } from "../utils/email.js";

const generateOTP = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

/* ---------------- REGISTER ---------------- */
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });
    if (user)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "user",
      isVerified: false,
    });

    const otp = generateOTP();

    await OTP.create({
      email,
      otp,
      action: "account_verification", // ✅ correct field name
      createdAt: new Date(),
    });

    await sendOtpEmail(email, otp, "account-verification");

    res.status(201).json({
      message: "OTP sent to email",
      email: user.email,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

/* ---------------- LOGIN ---------------- */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    if (!user.isVerified) {
      const otp = generateOTP();

      // ✅ use 'action' instead of 'type'
      await OTP.deleteMany({ email, action: "account_verification" });

      await OTP.create({
        email,
        otp,
        action: "account_verification",
        createdAt: new Date(),
      });

      await sendOtpEmail(email, otp, "account-verification");

      return res.status(403).json({
        message: "Account not verified",
        needsVerification: true,
        email,
      });
    }

    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user.id, user.role),
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

/* ---------------- VERIFY OTP ---------------- */
export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    // ✅ use 'action' instead of 'type'
    const validOTP = await OTP.findOne({
      email,
      otp,
      action: "account_verification",
    });

    if (!validOTP) {
      return res.status(400).json({
        message: "Invalid OTP",
      });
    }

    // ⏰ Expiry check
    const expiryTime = new Date(validOTP.createdAt.getTime() + 5 * 60 * 1000);
    if (expiryTime < new Date()) {
      return res.status(400).json({
        message: "OTP expired",
      });
    }

    const user = await User.findOneAndUpdate(
      { email },
      { isVerified: true },
      { new: true }
    );

    await OTP.deleteOne({ _id: validOTP._id });

    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user.id, user.role),
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};