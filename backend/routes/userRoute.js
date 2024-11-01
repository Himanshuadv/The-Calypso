const userController = require("../controllers/userController");
const express = require("express");
const router = express.Router();

router.post("/signup", userController.signUp);
router.post("/login", userController.login);
router.get("/logout", userController.logout);
router.get("/getUser/:id", userController.getUserById);
router.patch("/updateUser/:id", userController.updateUser);

router.use(userController.protect);
router.get("/getByRegno/:id", userController.getUserByRegNumber);
router.get(
  "/getBatchmate",
  userController.restrictTo("cr"),
  userController.getBatchmate
);
router.use(userController.restrictTo("admin"));
router.get("/getAll", userController.getAll);
router.patch("/makeCR/:id", userController.makeCR);
module.exports = router;
