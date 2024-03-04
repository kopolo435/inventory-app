const express = require("express");
const router = express.Router();

//Require controllers
const pedido_controller = require("../controllers/pedidoController");
const user_controller = require("../controllers/userController");

//Pedidos routes

//GET list of pedidos
router.get("/orders", pedido_controller.pedido_list);

//GET request to create a pedido
router.get("/order/create", pedido_controller.pedido_create_get);

//POST request to create pedido
router.post("/order/create", pedido_controller.pedido_create_post);

//GET request to update a pedido
router.get("/order/:id/update", pedido_controller.pedido_update_get);

//POST request to update a pedido
router.post("/order/:id/update", pedido_controller.pedido_update_post);

//GET request to delete a pedido
router.get("/order/:id/delete", pedido_controller.pedido_delete_get);

//POST request to delete a pedido
router.post("/order/:id/delete", pedido_controller.pedido_delete_post);

//GET request to show pedido details
router.get("/order/:id", pedido_controller.pedido_details);

//User routes

//GET list of all users
router.get("/users", user_controller.user_list);

//GET request to create a user
router.get("/user/create", user_controller.user_create_get);

//POST request to create a user
router.post("/user/create", user_controller.user_create_post);

//GET request to update a user
router.get("/user/:id/update", user_controller.user_update_get);

//POST request to update a user
router.post("/user/:id/update", user_controller.user_update_post);

//GET request to delete a user
router.get("/user/:id/delete", user_controller.user_update_get);

//POST request to delete a user
router.post("/user/:id/delete", user_controller.user_update_post);

//GET request to show user details
router.get("/user/:id", user_controller.user_details);

module.exports = router;
