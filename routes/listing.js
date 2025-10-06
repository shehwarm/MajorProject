const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const ListingController = require("../controllers/listings.js");

router
  .route("/")
  .get(wrapAsync(ListingController.index))
  .post(isLoggedIn, validateListing, wrapAsync(ListingController.create));

// New Route
router.get("/new", isLoggedIn, (req, res) => {
  res.render("listings/new.ejs");
});


router
   .route("/:id")
   .get(wrapAsync(ListingController.show))
   .put(isLoggedIn, isOwner, validateListing, wrapAsync(ListingController.update))
   .delete(isLoggedIn, isOwner, wrapAsync(ListingController.delete));


// Edit Route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(ListingController.edit));


module.exports = router;
