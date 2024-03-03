const asyncHandler = require("express-async-handler");
const Product = require("../models/product");

//Muestra lista de productos filtrados segun parametros
exports.product_list = asyncHandler(async (req, res, next) => {
  const allProducts = await Product.find().sort({ name: 1 });
  res.render("product_list", {
    title: "Lista de productos",
    allProducts: allProducts,
  });
});

//Muesta detalles de un producto
exports.product_detail = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id).exec();

  if (product === null) {
    //No result
    const err = new Error("Producto no encontrado");
    err.status = 404;
    return next(err);
  }

  res.render("product_detail", {
    title: "Detalles de producto",
    product,
  });
});

//Muestra form para crear un nuevo producto
exports.product_create_get = asyncHandler(async (req, res, next) => {
  res.send("Sin implementar mostrar form de crear producto");
});

//Maneja solicitud post de creacion de un producto
exports.product_create_post = asyncHandler(async (req, res, next) => {
  res.send("Sin implementar manejo de solicitud post de crear producto");
});

//Maneja solicitud get de actualizar producto
exports.product_update_get = asyncHandler(async (req, res, next) => {
  res.send("Sin implementar manejo de solicitud get de actualizar producto");
});

//Maneja solicitud post de actualizar producto
exports.product_update_post = asyncHandler(async (req, res, next) => {
  res.send("Sin implementar manejo de solicitud post de actualizar producto");
});

//Maneja solicitud get de eliminar producto
exports.product_delete_get = asyncHandler(async (req, res, next) => {
  res.send("Sin implementar interfaz de eliminar producto");
});

//Maneja solicitud post de eliminar producto
exports.product_delete_post = asyncHandler(async (req, res, next) => {
  res.send("Sin implementar manejo de solicitud de eliminar producto");
});
