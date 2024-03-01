const asyncHandler = require("express-async-handler");
const Category = require("../models/category");

//Se encarga de mostrar la lista de categorias almacenadas
exports.category_list = asyncHandler(async (req, res, next) => {
  //TODO implementar fetch de lista de categorias
  res.send("Sin implementar lista de categorias");
});

//Se encarga de mostrar la informacion detallada de una categoria
exports.category_detail = asyncHandler(async (req, res, next) => {
  //TODO implementar fetch de informacion de una categoria
  res.send("Sin implementar detalles de categoria");
});

//Se encarga de mostrar el form para crear una categoria
exports.category_create_get = asyncHandler(async (req, res, next) => {
  //TODO
  res.send("Sin implementar form para crear categoria");
});

//Se encarga de manejar la solicitud de creacion de una categoria
exports.category_create_post = asyncHandler(async (req, res, next) => {
  //TODO
  res.send("Sin implementar manejo de creacion de categoria");
});

//Se encarga de mostrar el formulario indicado para actualizar una categoria
exports.category_update_get = asyncHandler(async (req, res, next) => {
  //TODO
  res.send("Sin implementar form para actualiza categoria");
});

//Se encarga de manejar la solicitud de actualizar una categoria
exports.category_update_post = asyncHandler(async (req, res, next) => {
  //TODO
  res.send("Sin implementar manejo de actualizacion de categoria ");
});

//Se encarga de mostrar datos de categoria al intentar borrarla
exports.category_delete_get = asyncHandler(async (req, res, next) => {
  //TODO
  res.send("Sin implementar mostrado interfaz para borrar categoria");
});

//Se encarga de manejar la solicitud de borrar una categoria
exports.category_delete_post = asyncHandler(async (req, res, next) => {
  //TODO
  res.send("Sin implementar manejo de solicitud de borrar categoria");
});
