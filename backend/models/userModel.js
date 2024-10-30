const crypto = require("crypto");
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    // required: [true, "Please enter your name"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please enter the email"],
    trim: true,
    unique: [true, "This Email is already registered"],
    lowercase: true,
    validate: {
      validator: function (v) {
        return /^[a-zA-Z0-9._%+-]+@mnnit\.ac\.in$/.test(v);
      },
      message: "Please enter a valid college mail address",
    },
  },
  registrationNumber: {
    type: String,
    required: [true, "Registration number is required"],
    unique: true,
  },
  year: {
    type: Number,
    // required: [true, "Year is required"],
    min: [1, "Year must be at least 1"],
    max: [4, "Year cannot exceed 4"],
  },
  semester: {
    type: Number,
    // required: [true, "Semester is required"],
    min: [1, "Semester must be at least 1"],
    max: [8, "Semester cannot exceed 8"],
  },
  branch: {
    type: String,
    enum: {
      values: ["CSE", "ECE", "ME", "EE", "CE", "CHE"],
      message: "{VALUE} is not a valid branch",
    },
    // required: [true, "Branch is required"],
  },
  phoneNo: {
    type: String,
    // required: [true, "Phone number is required"],
    validate: {
      validator: (v) => validator.isMobilePhone(v, "en-IN"), // Adjust for region if necessary
      message: "Please enter a valid phone number",
    },
  },
  photo: String,
  password: {
    type: String,
    required: [true, "Please enter the password"],
    minlength: 8,
    select: false,
  },
  role: {
    type: String,
    enum: ["student", "cr", "admin"],
    default: "student",
  },
  auraPoint: {
    type: Number,
    default: 0,
    min: [0, "Aura points cannot be negative"],
  },
  isCR: {
    type: Boolean,
    default: false,
  },
  confirmPassword: {
    type: String,
    required: [true, "Please enter the same password as the password"],
    minlength: 8,
    validate: {
      validator: function (val) {
        return this.password === val;
      },
      message: "Passwords are not the same",
    },
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  changedPasswordAt: Date,
  passwordResetToken: String,
  passwordResetExpire: Date,
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

// Creating the encryption of the password
userSchema.pre("save", async function (next) {
  // only run in the case when the password was actually modified
  if (!this.isModified("password")) return next();
  // hashing the password with the cost of 12
  this.password = await bcrypt.hash(this.password, 12);
  // delete the password confirm field
  this.confirmPassword = undefined;
  next();
});
/// creating the decryption of the password
// this method is instance method its mean its available in whole file
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

// Rest feature to be implemented later
const User = mongoose.model("User", userSchema);

module.exports = User;
