const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  first_name: { type: String, minLength: 1, maxLength: 100, required: true },
  last_name: { type: String, minLength: 1, maxLength: 100, required: true },
  cellphone: { type: String, minLength: 1, required: true },
  email: { type: String, minLength: 1, required: true },
});

userSchema.virtual("url").get(function () {
  return `/management/user/${this._id}`;
});

userSchema.virtual("fullname").get(function () {
  return `${this.first_name} ${this.last_name}`;
});

module.exports = mongoose.model("User", userSchema);
