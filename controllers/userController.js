const asyncHandler = require("express-async-handler");
const { body, validationResult, matchedData } = require("express-validator");
const User = require("../models/user");
const Pedido = require("../models/pedido");
const Admin = require("../models/admin");

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
  res.render("user_form", { title: "Crear usuario", user: {}, errors: {} });
});

//Maneja solicitud post para crear usuario
exports.user_create_post = [
  body("first_name")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Debe ingresar el nombre del usuario")
    .escape(),
  body("last_name")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Debe ingresar el apellido")
    .escape(),
  body("cellphone")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Debe ingresar el numero de celular")
    .isMobilePhone()
    .withMessage("Debe ingresar un numero valido")
    .escape(),
  body("email")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Debe ingresar un email")
    .isEmail()
    .withMessage("Debe introducir un correo electronico valido"),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const user = new User({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      cellphone: req.body.cellphone,
      email: req.body.email,
    });

    if (!errors.isEmpty()) {
      res.render("user_form", {
        title: "Crear usuario",
        user,
        errors: errors.mapped(),
      });
    } else {
      const userExists = await User.findOne({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
      }).exec();
      if (userExists) {
        res.redirect(userExists.url);
      } else {
        await user.save();
        res.redirect(user.url);
      }
    }
  }),
];

//Maneja solicitud get para actualizar usuario
exports.user_update_get = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id).exec();
  if (user === null) {
    const err = new Error("No se encontro el usuario");
    err.status = 404;
    return next(err);
  }
  //Se inicializa errors como vacio para inicializar variable en view
  res.render("user_form", { title: "Actualizar usuario", user, errors: {} });
});

//Maneja solicitud post para actualizar usuario
exports.user_update_post = [
  body("first_name")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Debe ingresar el nombre del usuario")
    .escape(),
  body("last_name")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Debe ingresar el apellido")
    .escape(),
  body("cellphone")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Debe ingresar el numero de celular")
    .isMobilePhone()
    .withMessage("Debe ingresar un numero valido")
    .escape(),
  body("email")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Debe ingresar un email")
    .isEmail()
    .withMessage("Debe introducir un correo electronico valido"),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const user = new User({
      _id: req.params.id,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      cellphone: req.body.cellphone,
      email: req.body.email,
    });

    if (!errors.isEmpty()) {
      res.render("user_form", {
        title: "Crear usuario",
        user,
        errors: errors.mapped(),
      });
    } else {
      const userExists = await User.findOne({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
      }).exec();
      if (userExists) {
        res.redirect(userExists.url);
      } else {
        await User.findByIdAndUpdate(req.params.id, user, {});
        res.redirect(user.url);
      }
    }
  }),
];

//Maneja solicitud get para eliminar usuario
exports.user_delete_get = asyncHandler(async (req, res, next) => {
  const [user, userPedidos] = await Promise.all([
    User.findById(req.params.id).exec(),
    Pedido.find({ user: req.params.id }).populate("product").sort({ _id: 1 }),
  ]);

  if (user === null) {
    const err = new Error("No se encontro el usuario indicado");
    err.status = 404;
    return next(err);
  }
  res.render("user_delete", {
    title: "Eliminar usuario",
    user,
    pedidos: userPedidos,
    errors: {},
  });
});

//Maneja solicitud post para eliminar usuario
exports.user_delete_post = [
  body("name")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Debe ingresar el nombre de la cuenta de administracion"),
  body("password")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Debe ingresar la contraseña"),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const [user, userPedidos] = await Promise.all([
      User.findById(req.params.id).exec(),
      Pedido.find({ user: req.params.id }).populate("product").sort({ _id: 1 }),
    ]);

    const admin = new Admin({
      name: req.body.name,
      password: req.body.password,
    });

    if (!errors.isEmpty()) {
      res.render("user_delete", {
        title: "Eliminar Usuario",
        user,
        pedidos: userPedidos,
        admin,
        errors: errors.mapped(),
      });
    } else {
      const adminExists = await Admin.findOne({
        name: req.body.name,
        password: req.body.password,
      }).exec();
      if (!adminExists) {
        //Validation failed
        res.render("user_delete", {
          title: "Eliminar usuario",
          user,
          pedidos: userPedidos,
          admin,
          errors: errors.mapped(),
          validation: false,
        });
      } else {
        //Validation was succesful
        await Promise.all([
          User.findByIdAndDelete(req.params.id),
          Pedido.deleteMany({ user: req.params.id }),
        ]);
        res.redirect("/management/users");
      }
    }
  }),
];
