const mongoose = require("mongoose");
const { DateTime } = require("luxon");
const Schema = mongoose.Schema;

const pedidoSchema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  ammount: { type: Number, min: 1, required: true },
  orderPlaced: { type: Date, required: true },
});

pedidoSchema.virtual("url").get(function () {
  return `/management/order/${this._id}`;
});

pedidoSchema.virtual("inputDate").get(function () {
  return DateTime.fromJSDate(this.orderPlaced, { zone: "utc" }).toISODate(); // format 'YYYY-MM-DD'
});

pedidoSchema.virtual("formattedDate").get(function () {
  return DateTime.fromJSDate(this.orderPlaced).toLocaleString(
    DateTime.DATE_MED
  );
});

module.exports = mongoose.model("Pedido", pedidoSchema);
