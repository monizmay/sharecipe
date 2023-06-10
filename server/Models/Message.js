const mongoose = require("mongoose");

const Message = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Your username is required"],
  },
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  message: {
    type: String,
    required: [true, "Your message is required"],
  },
});


module.exports = mongoose.model("Message", Message);