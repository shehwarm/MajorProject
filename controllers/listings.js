const Listing = require("../models/listing");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken});

// 🟢 Show all listings
module.exports.index = async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
};

// 🟢 Render new listing form
module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

// 🟢 Create new listing
module.exports.createListing = async (req, res) => {
  let response = await geocodingClient.forwardGeocode({
    query: req.body.listing.location,
    limit: 1,
    }) 
    .send();
    res.send("done!");

    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;

  if (req.file) {
    newListing.image = {
      url: req.file.path,
      filename: req.file.filename,
    };
  }

  newListing.geometry = response.body.features[0].geometry;

  let savedListing = await newListing.save();
  console.log(savedListing);
  req.flash("success", "New listing created!");
  res.redirect(`/listings/${newListing._id}`);
};

// 🟢 Show listing details
module.exports.show = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");

  if (!listing) {
    req.flash("error", "Listing you requested does not exist");
    return res.redirect("/listings");
  }

  res.render("listings/show.ejs", { listing });
};

// 🟢 Render edit form
module.exports.renderEditForm = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Cannot edit non-existing listing");
    return res.redirect("/listings");
  }

  let orignalImageUrl = listing.image.url;
  orignalImageUrl = orignalImageUrl.replace("/upload", "/upload/h_300,w_250");
  res.render("listings/edit.ejs", { listing, orignalImageUrl });
};

// 🟢 Update listing
module.exports.updateListing = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
      
      if(typeof req.file !== "undefined"){
      let url = req.file.path;
      let filename = req.file.filename;
      let listingImage = { url, filename };
      listing.image = listingImage;
      await listing.save();
      }

  req.flash("success", "Listing updated!");
  res.redirect(`/listings/${listing._id}`);
};

// 🟢 Delete listing
module.exports.deleteListing = async (req, res) => {
  const { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing deleted!");
  res.redirect("/listings");
};
