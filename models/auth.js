const mongoose = require("mongoose");

const userAuthSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const authModel = mongoose.model("userAuth", userAuthSchema);
module.exports = authModel;
