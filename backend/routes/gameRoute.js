const userController = require("../controllers/userController");
const gameController = require("../controllers/gameController");
const express = require("express");
const router = express.Router();

router.get(
  "/getLeaderboardMyBranch",
  userController.protect,
  gameController.getLeaderboardMyBranch
);
router.get(
  "/getLeaderboardByBranch/:branch",
  gameController.getLeaderboardByBranch
);
router.get("/getLeaderboard", gameController.getLeaderboard);
module.exports = router;
