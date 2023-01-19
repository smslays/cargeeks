const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userId: Number,
  name: { first: String, last: String },
  mobile: String,
  email: String,
  address: {
    street: String,
    city: String,
    state: String,
    country: String,
    pincode: String,
  },
  pan: String,
  status: String,
  verified: Boolean,
  role: String,
  avatar: String,
  gender: String,
  dob: Date,
  password: String,
  occupation: String,
});

module.exports = mongoose.model("User", userSchema);
