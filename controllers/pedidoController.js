const asyncHandler = require("express-async-handler");
const { body, validationResult, matchedData } = require("express-validator");
const Pedido = require("../models/pedido");
const Product = require("../models/product");
const User = require("../models/user");

//Muestra lista de todos los pedidos en base a filtros
exports.pedido_list = asyncHandler(async (req, res, next) => {
  const allPedidos = await Pedido.find()
    .populate("product")
    .sort({ orderPlaced: -1 });
  res.render("pedido_list", { title: "Lista de pedidos", allPedidos });
});

//Muestra detalles de un pedido
exports.pedido_details = asyncHandler(async (req, res, next) => {
  const pedido = await Pedido.findById(req.params.id)
    .populate("product")
    .populate("user")
    .exec();

  if (pedido === null) {
    //No results
    const err = new Error("Pedido no encontrado");
    err.status = 404;
    return next(err);
  }
  res.render("pedido_details", { title: "Detalles de pedido", pedido });
});

//Maneja solicitud get para crear un pedido
exports.pedido_create_get = asyncHandler(async (req, res, next) => {
  const [allUsers, product] = await Promise.all([
    User.find().sort({ last_name: 1 }).exec(),
    Product.findById(req.params.id).exec(),
  ]);

  res.render("pedido_form", {
    title: "Crear pedido",
    users: allUsers,
    errors: {},
    pedido: {},
    product,
  });
});

//Maneja solicitud post para crear pedodp
exports.pedido_create_post = [
  body("user").escape(),
  body("ammount")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Debe ingresar la cantidad")
    .isInt({ min: 1 })
    .withMessage("Debe introducir una cantidad mayor a 0")
    .escape(),
  body("orderPlaced", "Fecha invalida").isISO8601().toDate(),

  asyncHandler(async (req, res, next) => {
    const validationErrors = validationResult(req);

    const pedido = new Pedido({
      product: req.params.id,
      user: req.body.user,
      ammount: req.body.ammount,
      orderPlaced: req.body.orderPlaced,
    });

    if (!validationErrors.isEmpty()) {
      const [allUsers, product] = await Promise.all([
        User.find().sort({ last_name: 1 }).exec(),
        Product.findById(req.params.id).exec(),
      ]);
      const test = validationErrors.mapped();
      res.render("pedido_form", {
        title: "Crear pedido",
        users: allUsers,
        pedido,
        errors: validationErrors.mapped(),
        product,
      });
    } else {
      await pedido.save();
      res.redirect(pedido.url);
    }
  }),
];

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
