const express = require('express');
const app = express();
const mongoose = require('mongoose');


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

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});