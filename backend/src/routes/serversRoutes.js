const router = require("express").Router();
const serversController = require("../controllers/serversController");
// Defini as rotas
router.get("/", serversController.index);
router.get("/:serverName", serversController.show);
router.get("/:serverName/status", serversController.status);

router.post("/:serverName/start", serversController.start);
router.post("/:serverName/stop", serversController.stop);
router.post("/:serverName/restart", serversController.restart);

module.exports = router;