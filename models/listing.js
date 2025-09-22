const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const defaultImage = "https://unsplash.com/photos/golden-mountain-peaks-at-sunset-with-dramatic-clouds-IyhdFcaRYqE";
const listingSchema = new Schema({
    title:{
        type: String, 
        required: true
    },
    description: String,
    image: {
        url: {
            type: String,
            default: defaultImage,
            set: (v) => v === "" ? defaultImage : v,
        },
        filename: {
            type: String,
            default: "listingimage"
        }
    },
    price: Number,
    location: String,
    country: String,
    reviews : [
         {
            type: Schema.Types.ObjectId,
            ref : "Review"
         }
    ]
});
 
const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
    