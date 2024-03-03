const asyncHandler = require("express-async-handler");
const User = require("../models/user");
const Pedido = require("../models/pedido");

//Muestra lista de usuarios
exports.user_list = asyncHandler(async (req, res, next) => {
  const allUsers = await User.find().sort({ last_name: -1 }).exec();

  res.render("user_list", { title: "Lista de usuarios", allUsers });
});

//Muestra detalles de usuarios
exports.user_details = asyncHandler(async (req, res, next) => {
  const [user, userPedidos] = await Promise.all([
    User.findById(req.params.id).exec(),
    Pedido.find({ user: req.params.id }).populate("product").exec(),
  ]);

  if (user === null) {
    //No results
    const err = new Error("No se encontro el usuario indicado");
    err.status = 404;
    return next(err);
  }

  res.render("user_details", {
    title: "Detalles de usuario",
    user,
    userPedidos,
  });
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
