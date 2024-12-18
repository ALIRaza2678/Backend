import User from "../Model/user_model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const SECRET_KEY = "test"; 
const salt = 10;

// Store new user
export const store = async (req, res) => {
  try {
      if (!req.file) {
          return res.status(400).json({ success: false, message: "Avatar is required" });
      }

      const { email, password } = req.body;

      const existingUser = await User.findOne({ email });
      if (existingUser) {
          return res.status(203).json({ success: false, message: "Email is already registered" });
      }

      const hashedPassword = await bcrypt.hash(password, 10); // Use saltRounds

      const newUser = await User.create({
          ...req.body,
          password: hashedPassword,
          avatar: req.file.filename,
      });

      res.status(200).json({
          success: true,
          message: "User created successfully",
          user: { email: newUser.email, id: newUser._id },
      });
  } catch (error) {
      res.status(500).json({
          success: false,
          message: "An error occurred during registration",
          error: error.message,
      });
  }
};


// Login user
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }

    const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: "1h" });

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user: { email: user.email, id: user._id }, 
      token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred during login",
      error: error.message,
    });
  }
};

// Get all users
export const index = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json({
      success: true,
      message: "Users Fetched Successfully",
      users: users.map(user => ({ email: user.email, id: user._id })),
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching users",
      error: err.message,
    });
  }
};

export const get = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findOne({ _id: id });
        if (!user) {
            return res.json({ status: 404, success: false, message: "User not found" });
        }
        return res.json({ status: 200, success: true, message: "User Fetched Successfully", user });
    } catch (err) {
        console.log(err.message);
    }
};

// Delete user
export const destroy = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOneAndDelete({ _id: id });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    return res.status(200).json({ success: true, message: "User Deleted Successfully" });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "An error occurred during deletion",
      error: err.message,
    });
  }
};

// Update user
export const update = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOneAndUpdate({ _id: id }, req.body, { new: true });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    return res.status(200).json({
      success: true,
      message: "User Updated Successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "An error occurred during update",
      error: err.message,
    });
  }
};

// Generate OTP for the user
export const generateOTP = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);
    user.code = otp;
    await user.save();
    return res.status(200).json({ success: true, message: "OTP Created Successfully" });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "An error occurred during OTP generation",
      error: err.message,
    });
  }
};

// Verify OTP
export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (user.code == otp) {
      return res.status(200).json({ success: true, message: "OTP Verified Successfully" });
    } else {
      return res.status(403).json({ success: false, message: "Incorrect OTP" });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "An error occurred during OTP verification",
      error: err.message,
    });
  }
};


