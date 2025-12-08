const mongoose = require('mongoose');

const uri='mongodb+srv://RohithCR:12345@cluster0.d4cdaqy.mongodb.net/'
mongoose.connect(uri)

const connection = mongoose.connection;
connection.once('open',()=>{
    console.log("MongoDB database connection established successfully");
});

