const mongoose = require('mongoose')

const foodschema = new mongoose.Schema({
    foodname: {
        type : String,
        required : true
    }
    daySinceIate: {
        type : Number,
        required : true
    }
});
const Food = mongoose.model("Food",foodschema);
MediaSourceHandle.exports = Food;