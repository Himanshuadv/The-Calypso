const userController = require("../controllers/userController");
const express = require("express");
const router = express.Router();

router.post("/signup", userController.signUp);
router.post("/login", userController.login);
router.get("/logout", userController.logout);
router.get("/getUser/:id", userController.getUserById);
router.patch("/updateUser/:id", userController.updateUser);

router.use(userController.protect);
router.use(userController.restrictTo("admin"));
router.get("/getAll", userController.getAll);
module.exports = router;
