const mongoose = require('mongoose');
const initdata = require('./data.js'); // Import sample data
const Listing = require('../models/listing.js');

// Connect to MongoDB
const mongoURL = 'mongodb://localhost:27017/wanderlust';

main()
.then(() => {console.log("MongoDB connection established");})
.catch(err => console.log(err));

async function main(){
    await mongoose.connect(mongoURL);
}

const initDB = async () => {
    await Listing.deleteMany({});
    await Listing.insertMany(initdata.data);
    console.log("Database initialized with sample data");

};
initDB();