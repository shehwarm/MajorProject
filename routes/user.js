const express = require("express");
const router = express.Router();
const passport = require("passport");
const wrapAsync = require("../utils/wrapAsync");
const { saveRedirectUrl } = require("../middleware");

// Import controllers
const userController = require("../controllers/users");

// 🟢 SIGNUP ROUTES
router.get("/signup", userController.signupForm);
router.post("/signup", wrapAsync(userController.signup));

// 🟢 LOGIN ROUTES
router.get("/login", userController.loginForm);
router.post(
  "/login",
  saveRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  userController.login
);

// 🟢 LOGOUT ROUTE
router.get("/logout", userController.logout);

module.exports = router;
