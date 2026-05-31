const router = require("express").Router();
const serversController = require("../controllers/serversController");
// Defini as rotas
router.get("/", serversController.index);
router.get("/:serverName", serversController.show);
router.get("/:serverName/status", serversController.status);
// Opções principais do Servidor
router.post("/:serverName/start", serversController.start);
router.post("/:serverName/stop", serversController.stop);
router.post("/:serverName/restart", serversController.restart);
// Eula
router.get("/:serverName/eula", serversController.eula);
router.post("/:serverName/eula/accept", serversController.acceptEula);
// Arquivos
router.get("/:serverName/files",serversController.files);
// Conteudo de arquivo
router.get("/:serverName/files/content", serversController.fileContent);

module.exports = router;