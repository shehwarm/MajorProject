const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, validateListing } = require("../middleware.js");
const ListingController = require("../Controllers/listing.js");

// Index Route
router.get("/", wrapAsync(ListingController.index));

// New Route
router.get("/new", isLoggedIn, (req, res) => {
  res.render("listings/new.ejs");
});

// Show Route
router.get("/:id", wrapAsync(ListingController.show));

// Create Route
router.post("/", isLoggedIn, validateListing, wrapAsync(ListingController.create));

// Edit Route
router.get("/:id/edit", isLoggedIn, wrapAsync(ListingController.edit));

// Update Route
router.put("/:id", isLoggedIn, wrapAsync(ListingController.update));

// Delete Route
router.delete("/:id", isLoggedIn, wrapAsync(ListingController.delete));

module.exports = router;
