const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

router.post("/createUser", userController.createUser);
router.get("/getAllUsers", userController.getAllUsers);
router.post("/loginUser", userController.loginUser);
router.delete("/logoutUser", userController.logoutUser);
router.get("/getCurrentUser", userController.getCurrentUser);
router.get("/isUserLoggedIn", userController.isUserLoggedIn);

module.exports = router;
