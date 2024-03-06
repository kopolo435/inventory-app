const asyncHandler = require("express-async-handler");
const { body, validationResult, matchedData } = require("express-validator");
const Product = require("../models/product");
const Category = require("../models/category");
const Pedido = require("../models/pedido");
const Admin = require("../models/admin");

//Muestra lista de productos filtrados segun parametros
exports.product_list = asyncHandler(async (req, res, next) => {
  const categoryFilters = req.query.categoriesFilter;
  // Constructing the query dynamically based on category filters
  let productQuery = Product.find();
  if (categoryFilters && categoryFilters.length > 0) {
    productQuery = productQuery.where("category").in(categoryFilters);
  }

  const [allProducts, categories] = await Promise.all([
    productQuery.populate("category").sort({ name: 1 }),
    Category.find().sort({ name: 1 }).exec(),
  ]);

  res.render("product_list", {
    title: "Lista de productos",
    allProducts: allProducts,
    categories,
  });
});

//Muesta detalles de un producto
exports.product_detail = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id)
    .populate("category")
    .exec();

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
  const categories = await Category.find().sort({ name: 1 }).exec();
  res.render("product_form", { title: "Crear producto", categories });
});

//Maneja solicitud post de creacion de un producto
exports.product_create_post = [
  body("name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Debe introducir el nombre del producto"),

  body("summary").trim().escape().optional({ values: "falsy" }),
  body("category").escape(),
  body("price")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Debe introducir un precio")
    .isFloat({ min: 0 })
    .withMessage("Debe introducir un valor mayor a 0"),

  body("stock")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Debe introducir la cantidad en inventario")
    .isInt({ min: 0 }),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const product = new Product({
      name: req.body.name,
      summary: req.body.summary,
      category: req.body.category,
      price: req.body.price,
      stock: req.body.stock,
    });

    if (!errors.isEmpty()) {
      const categories = await Category.find().sort({ name: 1 }).exec();
      res.render("product_form", {
        title: "Crear producto",
        errors: errors.mapped(),
        product,
        categories,
      });
    } else {
      const productExists = await Product.findOne({
        name: product.name,
      }).exec();

      if (productExists) {
        res.redirect(productExists.url);
      } else {
        await product.save();
        res.redirect(product.url);
      }
    }
  }),
];

//Maneja solicitud get de actualizar producto
exports.product_update_get = asyncHandler(async (req, res, next) => {
  const [product, categories] = await Promise.all([
    Product.findById(req.params.id).exec(),
    Category.find().sort({ name: 1 }).exec(),
  ]);

  if (product === null) {
    const err = new Error("No se encontro el producto");
    err.status = 404;
    return next(err);
  }

  res.render("product_form", {
    title: "Actualizar producto",
    product,
    categories,
  });
});

//Maneja solicitud post de actualizar producto
exports.product_update_post = [
  body("name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Debe introducir el nombre del producto"),

  body("summary").trim().escape().optional({ values: "falsy" }),
  body("category").escape(),
  body("price")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Debe introducir un precio")
    .isFloat({ min: 0 })
    .withMessage("Debe introducir un valor mayor a 0"),

  body("stock")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Debe introducir la cantidad en inventario")
    .isInt({ min: 0 }),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const product = new Product({
      _id: req.params.id,
      name: req.body.name,
      summary: req.body.summary,
      category: req.body.category,
      price: req.body.price,
      stock: req.body.stock,
    });

    if (!errors.isEmpty()) {
      const categories = await Category.find().sort({ name: 1 }).exec();
      res.render("product_form", {
        title: "Actualizar producto",
        errors: errors.mapped(),
        product,
        categories,
      });
    } else {
      const productExists = await Product.findOne({
        name: product.name,
      }).exec();

      if (productExists) {
        res.redirect(productExists.url);
      } else {
        await Product.findByIdAndUpdate(req.params.id, product, {});
        res.redirect(product.url);
      }
    }
  }),
];

//Maneja solicitud get de eliminar producto
exports.product_delete_get = asyncHandler(async (req, res, next) => {
  const [product, productPedidos] = await Promise.all([
    Product.findById(req.params.id).populate("category"),
    Pedido.find({ product: req.params.id }).populate("user"),
  ]);

  if (product === null) {
    const err = new Error("No se encontro el producto indicado");
    err.status = 404;
    return next(err);
  }

  res.render("product_delete", {
    title: "Eliminar producto",
    product,
    productPedidos,
    errors: {},
  });
});

//Maneja solicitud post de eliminar producto
exports.product_delete_post = [
  body("name")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Debe colocar el nombre de la cuenta de administracion")
    .escape(),
  body("password")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Debe colocar la contraseña")
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const admin = new Admin({
      name: req.body.name,
      password: req.body.password,
    });
    const [product, productPedidos] = await Promise.all([
      Product.findById(req.params.id).populate("category"),
      Pedido.find({ product: req.params.id }).populate("user"),
    ]);
    if (!errors.isEmpty()) {
      res.render("product_delete", {
        title: "Eliminar Producto",
        product,
        productPedidos,
        admin,
        errors: errors.mapped(),
      });
    } else {
      const adminExists = await Admin.findOne({
        name: req.body.name,
        password: req.body.password,
      }).exec();
      if (!adminExists) {
        res.render("product_delete", {
          title: "Eliminar Producto",
          product,
          productPedidos,
          admin,
          errors: errors.mapped(),
          validation: false,
        });
      } else {
        await Promise.all([
          Product.findByIdAndDelete(req.params.id),
          Pedido.deleteMany({ product: req.params.id }),
        ]);

        res.redirect("/catalog/products");
      }
    }
  }),
];
