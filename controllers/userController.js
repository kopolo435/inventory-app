const asyncHandler = require("express-async-handler");
const User = require("../models/user");

//Muestra lista de usuarios
exports.user_list = asyncHandler(async (req, res, next) => {
  //TODO
  res.send("Sin implementar mostrar lista de usuarios");
});

//Muestra detalles de usuarios
exports.user_details = asyncHandler(async (req, res, next) => {
  //TODO
  res.send("Sin implementar mostrar detalles de usuarios");
});

//Muestra form para crear usuarios en solicitud get
exports.user_create_get = asyncHandler(async (req, res, next) => {
  //TODO
  res.send("Sin implementar mostrar form para crear usuarios");
});

//Maneja solicitud post para crear usuario
exports.user_create_post = asyncHandler(async (req, res, next) => {
  //TODO
  res.send("Sin implementar manejo de solicitud post para crear usuarios");
});

//Maneja solicitud get para actualizar usuario
exports.user_update_get = asyncHandler(async (req, res, next) => {
  //TODO
  res.send("Sin implementar mostar form para actualizr usuarios");
});

//Maneja solicitud post para actualizar usuario
exports.user_update_post = asyncHandler(async (req, res, next) => {
  //TODO
  res.send("Sin implementar manejo de solicitud post para actualizar usuario");
});

//Maneja solicitud get para eliminar usuario
exports.user_delete_get = asyncHandler(async (req, res, next) => {
  //TODO
  res.send("Sin implementar manejo de solicitud get para actualizar usuarios");
});

//Maneja solicitud post para eliminar usuario
exports.user_delete_post = asyncHandler(async (req, res, next) => {
  //TODO
  res.send("Sin implementar manejo de solicitud post para eliminar usuario");
});
