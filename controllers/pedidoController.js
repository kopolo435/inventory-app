const asyncHandler = require("express-async-handler");
const Pedido = require("../models/pedido");

//Muestra lista de todos los pedidos en base a filtros
exports.pedido_list = asyncHandler(async (req, res, next) => {
  //TODO
  res.send("Sin implementar listado de pedidos segun filtros");
});

//Muestra detalles de un pedido
exports.pedido_details = asyncHandler(async (req, res, next) => {
  //TODO
  res.send("Sin implementar mostart detalles de un pedido");
});

//Maneja solicitud get para crear un pedido
exports.pedido_create_get = asyncHandler(async (req, res, next) => {
  //TODO
  res.send("Sin implementar mostrar form para crear pedido");
});

//Maneja solicitud post para crear pedodp
exports.pedido_create_post = asyncHandler(async (req, res, next) => {
  //TODO
  res.send("Sin implementar manejo de solicitud post para crear usuario");
});

//Maneja solicitud get para actualizar pedido
exports.pedido_update_get = asyncHandler(async (req, res, next) => {
  //TODO
  res.send("Sin implementar manejo de solicitud get para actualizar pedido");
});

//Maneja solicitud post para actualizar pedido
exports.pedido_update_post = asyncHandler(async (req, res, next) => {
  //TODO
  res.send("Sin implementar manejo de solicitud post para actualizar pedido");
});

//Maneja solicitud get para eliminar pedido
exports.pedido_delete_get = asyncHandler(async (req, res, next) => {
  //TODO
  res.send("Sin implementar manejo de solicitud get para eliminar pedido");
});

//Maneja solicitud post para eliminar pedido
exports.pedido_delete_post = asyncHandler(async (req, res, next) => {
  //TODO
  res.send("Sin implementar manejo de solicitud post para eliminar pedido");
});
