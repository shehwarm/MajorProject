// models/listing.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review");   // 👈 this must point to models/review.js

const defaultImage = "https://unsplash.com/photos/golden-mountain-peaks-at-sunset-with-dramatic-clouds-IyhdFcaRYqE";

const listingSchema = new Schema({
    title: {
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
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review"
        }
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});

// Cascade delete reviews when a listing is deleted
listingSchema.post("findOneAndDelete", async (listing) => {
    if (listing) {
        await Review.deleteMany({ _id: { $in: listing.reviews } });
    }
});

module.exports = mongoose.model("Listing", listingSchema);
