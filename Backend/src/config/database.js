const mongoose = require("mongoose");

async function connectToDB() {
    try {
        console.log("Mongo URI loaded:", !!process.env.MONGO_URI);
        
        await mongoose.connect(process.env.MONGO_URI);

        console.log("CONNECTED DB");
    } catch (err) {
        console.log(err);
    }
}

module.exports = connectToDB;