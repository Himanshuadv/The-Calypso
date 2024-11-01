const catchAsync = require("../utils/catchAsync");
const User = require("../models/userModel");
const AppError = require("../utils/appError");

exports.getLeaderboardMyBranch = catchAsync(async (req, res, next) => {
  const userBranch = req.user.branch;
  console.log(req.user);

  // Fetch the top 10 users in the same branch sorted by points
  const topUsers = await User.find({ branch: userBranch })
    .sort({ auraPoint: -1 })
    .limit(10)
    .select("name registrationNumber auraPoint"); // Select only the necessary fields

  // Find the user's current position in the leaderboard within the same branch
  const userPosition =
    (await User.countDocuments({
      branch: userBranch,
      auraPoint: { $gt: req.user.auraPoint },
    })) + 1;

  // Send the response
  res.status(200).json({
    status: "success",
    data: {
      leaderboard: topUsers,
      userPosition: userPosition,
    },
  });
});

exports.getLeaderboardByBranch = catchAsync(async (req, res, next) => {
  const branch = req.params.branch;
  const user = await User.find({ branch })
    .sort({ auraPoint: -1 })
    .limit(10)
    .select("name registrationNumber auraPoint");
  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

exports.getLeaderboard = catchAsync(async (req, res, next) => {
  const user = await User.find()
    .sort({ auraPoint: -1 })
    .limit(10)
    .select("name registrationNumber auraPoint branch");
  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});
