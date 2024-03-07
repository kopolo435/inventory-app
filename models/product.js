const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: { type: String, minLength: 1, maxLenght: 100, required: true },
  summary: { type: String, minLength: 1, maxLength: 100, required: true },
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  price: { type: Number, min: 0, required: true },
  stock: { type: Number, min: 0, default: 0 },
  img: { type: String },
});

productSchema.virtual("url").get(function () {
  return `/catalog/product/${this._id}`;
});

module.exports = mongoose.model("Product", productSchema);
