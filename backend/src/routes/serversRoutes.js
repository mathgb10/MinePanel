const router = require("express").Router();
const serversController = require("../controllers/serversController");
// Defini duas rotas get
router.get("/", serversController.index);
router.get("/:serverName", serversController.show);

module.exports = router;