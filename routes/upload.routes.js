const router = require("express").Router()
const upload = require("../helpers/multer");
const uploadController = require("../controllers/uploadController")

router.post("/", upload.single("table"), uploadController.upload)

module.exports = router

