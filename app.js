const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Listing = require('./models/listing.js');
const path = require('path');


// Connect to MongoDB

const mongoURL = 'mongodb://localhost:27017/wanderlust';

main()
.then(() => {console.log("MongoDB connection established");})
.catch(err => console.log(err));

async function main(){
    await mongoose.connect(mongoURL);
}

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("Hello, World!");
});

// Index route
app.get("/listings", async (req, res) => {
   const allListings = await Listing.find({});
   res.render("listings/index.ejs", { allListings });
});

//New route
app.get("/listings/new", (req, res) => {
    res.render("listings/new.ejs");
});

//Show route
app.get("/listings/:id", async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs", { listing });
});

//Create route
app.post("/listings", async (req, res) => {
    const newListing = new Listing(req.body);
    await newListing.save();
    res.redirect(`/listings/${newListing._id}`);
});


/*app.get("/testListing", async (req, res) => {
    let sampleListing = new Listing({
        title: "My Villa",
        description: "By the Beach.",
        price: 1200,
        location: "Calangute, Goa",
        country: "India",
    });
    await sampleListing.save();
    console.log("Sample listing saved to database");
    res.send("Sample listing created and saved to database.");
});
*/

// Start the server

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});