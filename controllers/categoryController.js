const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const Category = require("../models/category");
const Product = require("../models/product");

//Se encarga de mostrar la lista de categorias almacenadas
exports.category_list = asyncHandler(async (req, res, next) => {
  const categories = await Category.find().sort({ name: 1 }).exec();
  res.render("category_list", {
    title: "Categorias disponibles",
    categories: categories,
  });
});

//Se encarga de mostrar la informacion detallada de una categoria
exports.category_detail = asyncHandler(async (req, res, next) => {
  const [category, categoryProducts] = await Promise.all([
    Category.findById(req.params.id).exec(),
    Product.find({ category: req.params.id }).sort({ name: 1 }).exec(),
  ]);
  if (category === null) {
    //No results
    const err = new Error("Categoria no encontrada");
    err.status = 404;
    return next(err);
  }

  res.render("category_detail", {
    title: "Detalles de Categoria",
    category: category,
    categoryProducts,
  });
});

//Se encarga de mostrar el form para crear una categoria
exports.category_create_get = asyncHandler(async (req, res, next) => {
  res.render("category_form", { title: "Crear Categoria" });
});

//Se encarga de manejar la solicitud de creacion de una categoria
exports.category_create_post = [
  body("name", "El nombre de la categoria debe tener al menos 3 letras")
    .trim()
    .isLength({ min: 3 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const category = new Category({
      name: req.body.name,
    });

    if (!errors.isEmpty()) {
      res.render("category_form", {
        title: "Crear Categoria",
        category: category,
        errors: errors.mapped(),
      });
    } else {
      // Data from form is valid.
      // Check if Genre with same name already exists.
      const categoryExists = await Category.findOne({ name: req.body.name })
        .collation({ locale: "en", strength: 2 })
        .exec();
      if (categoryExists) {
        // Genre exists, redirect to its detail page.
        res.redirect(categoryExists.url);
      } else {
        await category.save();
        // New genre saved. Redirect to genre detail page.
        res.redirect(category.url);
      }
    }
  }),
];

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
