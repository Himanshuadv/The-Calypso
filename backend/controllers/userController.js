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
  const { name, email, registrationNumber, password, confirmPassword } =
    req.body;

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

//creating a login function
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  //   steps
  /////////// 1 check if email and password exist
  if (!email || !password) {
    return next(new AppError("please provide email or password", 400));
  }
  //////////  2 chack if user exist and password is correct
  const user = await User.findOne({ email }).select("+password"); // if user is not there then it takes to much time and cant proceed further so i put correct statement in the if col
  console.log(user);
  //   const correct = await user.correctPassword(password, user.password);
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Email id or Password is incorrect"), 401);
  }
  /////////   3 if everything is fine then log in the user
  // const token = signToken(user._id);
  // res.status(200).json({
  //   status: 'success',
  //   token,
  // });
  createAndSendToken(user, 200, res);
});

// creating a logout function
exports.logout = catchAsync(async (req, res, next) => {
  // in this we create a new cookie which replace the old cookie with no user data so its look like the user is log out
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: "success" });
});

//creating a protect route
exports.protect = catchAsync(async (req, res, next) => {
  let token;

  // 1. Get the token and check if it exists
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    // Extract token from the 'Authorization' header
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    // Extract token from cookies as a fallback
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(new AppError("Invalid token. You are not logged in", 401));
  }

  // 2. Verify the token
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return next(
      new AppError("Invalid or expired token. Please log in again", 401)
    );
  }

  console.log("Decoded token:", decoded);

  // 3. Check if the user still exists
  const freshUser = await User.findById(decoded.id);
  if (!freshUser) {
    return next(
      new AppError("The user belonging to this token no longer exists", 401)
    );
  }

  // // 4. Check if the user changed the password after the token was issued
  // if (freshUser.changedPasswordAfter(decoded.iat)) {
  //   return next(new AppError('User recently changed password. Please log in again', 401));
  // }

  // Grant access to the protected route
  req.user = freshUser;
  res.locals.user = freshUser;
  next();
});

/// creating restric middleware
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    // roles = ['admin','lead-guide'] let current login user has role==='user'. So this user is not a role in roles array so this user donot have a permission to pass in the next function
    // console.log(req.user.role);

    if (!roles.includes(req.user.role))
      return next(new AppError("you dont have a permission do to this", 403));
    next();
  };
};
