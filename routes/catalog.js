const express = require("express");
const router = express.Router();

//Inializacion de controllers
const product_controller = require("../controllers/productController");
const category_controller = require("../controllers/categoryController");

//Category routes

// GET catalog homepage

router.get("/", category_controller.category_list);

router.get("/categories", category_controller.category_list);

//GET request for creating a category. This route must come before routes that display category (uses :id)
router.get("/category/create", category_controller.category_create_get);

//POST request for creating a category
router.post("/category/create", category_controller.category_create_post);

//Get request to update a category
router.get("/category/:id/update", category_controller.category_update_get);

//POST request to update a category
router.post("/category/:id/update", category_controller.category_update_post);

//GET request to delete a category
router.get("/category/:id/delete", category_controller.category_delete_get);

//POST request to delete a category
router.post("/category/:id/delete", category_controller.category_delete_post);

//GET request to show details of a category
router.get("/category/:id", category_controller.category_detail);

//Product Routes

//GET list of all products
router.get("/products/", product_controller.product_list);

//GET request to create a product
router.get("/product/create", product_controller.product_create_get);

//POST request to create a product
router.get("/product/create", product_controller.product_create_post);

//GET request to update a product
router.get("/product/:id/update", product_controller.product_update_get);

//POST request to update a product
router.post("/product/:id/update", product_controller.product_update_post);

//GET request to delete a product
router.get("/product/:id/delete", product_controller.product_delete_get);

//POST request to delete a product
router.post("/product/:id/delete", product_controller.product_delete_post);

//GET reques to show details of a product
router.get("/product/:id", product_controller.product_detail);

module.exports = router;
