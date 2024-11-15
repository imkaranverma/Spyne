const mongoose = require('mongoose');

const mongo_url = process.env.MONGO_CONN;

mongoose.connect(mongo_url)
.then(() => {
    console.log("MongoDb connnected..");
}).catch((err) => {
    console.log("MongoDB connection error:", err);
})