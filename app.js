const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Listing = require('./models/listing.js');


// Connect to MongoDB

const mongoURI = 'mongodb://localhost:27017/wanderlust';

main()
.then(() => {console.log("MongoDB connection established");})
.catch(err => console.log(err));

async function main(){
    await mongoose.connect(mongoURI);
}

app.get("/", (req, res) => {
    res.send("Hello, World!");
});

app.get("/testListing", async (req, res) => {
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

// Start the server

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});