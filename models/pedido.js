const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pedidoSchema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  ammount: { type: Number, min: 1, required: true },
  orderPlaced: { type: Date, required: true },
});

pedidoSchema.virtual("url").get(function () {
  return `/management/pedidos/${this._id}`;
});

module.exports = mongoose.model("Pedido", pedidoSchema);
