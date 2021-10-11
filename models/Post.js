const mongoose = require("mongoose");


const postSchema = mongoose.Schema({
    title : String,
    photo : String,
    description : String,
    createdAt : {type : Date , default : Date.now()}
})

module.exports = mongoose.model("Post", postSchema);