const serverManager = require("../services/serverManager");
// Exibe o nome da pasta e se ela existe
exports.show = (req,res) => {
    const serverName = req.params.serverName;
    const server = serverManager.getServer(serverName);
    res.json(server);
};
// Exibe todas as pastas
exports.index = (req,res) => {
    const servers = serverManager.getAllServers();
    res.json(servers);
};