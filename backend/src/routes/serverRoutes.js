const router = require("express").Router();
const serverController = require("../controllers/serverController");

router.get("/status",serverController.status);
module.exports = router;

