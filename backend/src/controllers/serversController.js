const serverManager = require("../services/serverManager");
// Exibe o nome da pasta e se ela existe
exports.show = (req,res) => {
    const serverName = req.params.serverName;
    res.json({
        name: serverName,
        exists: serverManager.exists(serverName)
    });
};
// Exibe todas as pastas
exports.index = (req,res) => {
    const servers = serverManager.getAllServers();
    res.json(servers);
};