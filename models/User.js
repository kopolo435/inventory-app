const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  first_name: { type: String, minLength: 1, maxLength: 100, required: true },
  family_name: { type: String, minLength: 1, maxLength: 100, required: true },
  cellphone: { type: String, minLength: 1, required: true },
  email: { type: String, minLength: 1, required: true },
});

userSchema.virtual("url").get(function () {
  return `/accounts/user/${this._id}`;
});

module.exports = mongoose.model("User", userSchema);
