const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String, 
        required: true 
    },
    image: {
        type: String, 
        default: "https://unsplash.com/photos/rocky-coastline-with-waves-crashing-at-sunset-bTfySKA_WrI",
        set : (v) => v === "" ? "https://unsplash.com/photos/rocky-coastline-with-waves-crashing-at-sunset-bTfySKA_WrI" : v,
    },
    price: { 
        type: Number, 
        required: true 
    },
    location: { 
        type: String, 
        required: true 
    },
    country: {
        type: String
    },
    });

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
