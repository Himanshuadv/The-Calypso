const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const jwt = require("jsonwebtoken");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

const createAndSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookiOption = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") cookiOption.secure = true;

  ///// remove the  user password from the output
  user.password = undefined;

  res.cookie("jwt", token, cookiOption);
  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};
//create a new user
// Create a new user
exports.signUp = catchAsync(async (req, res, next) => {
  console.log(req.body);
  const {
    name,
    email,
    registrationNumber,
    password,
    confirmPassword,
  } = req.body;
  
  console.log("hello I am here");
  
  
  // Create a new user instance
  const newUser = await User.create({
    name,
    email,
    registrationNumber,
    password,
    confirmPassword,
  });

  createAndSendToken(newUser, 201, res);
});

//get all user
exports.getAll = catchAsync(async (req, res, next) => {
  const user = await User.find();
  // Send Response
  res.status(200).json({
    status: "success",
    length: user.length,
    data: {
      user,
    },
  });
});

// Get a user by ID
exports.getUserById = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new AppError("No user found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

// update the user
exports.updateUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!user) {
    return new new AppError("no user found by the given id", 404)();
  }
  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});
