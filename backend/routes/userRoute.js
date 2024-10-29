const userController = require("../controllers/userController");
const express = require("express");
const router = express.Router();

router.post("/signup", userController.signUp);
router.get("/getAll", userController.getAll);
router.get("/getUser/:id", userController.getUserById);
router.patch("/updateUser/:id", userController.updateUser);
module.exports = router;
