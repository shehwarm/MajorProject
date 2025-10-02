const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing");



const MONGO_URI = "mongodb://localhost:27017/wanderlust";
main().then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log(err);
});



async function main() {
    await mongoose.connect(MONGO_URI);
    initDB();
}



const initDB = async () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj)=>({...obj, owner:"64b8f0f5f0c2e3a5d6e4b8c1"}));
    await Listing.insertMany(initData.data);
    console.log("Database initialized successfully");
}