const router = require("express").Router();
const authController = require("../controllers/AuthController")
const isAuth = require("../helpers/isAuth");

router.post("/register", authController.register);
router.post("/authenticate", authController.authenticate);
router.get("/checkToken", isAuth, authController.checkToken);

module.exports = router