const serverManager = require("../services/serverManager");
const minecraftService = require("../services/minecraftService");
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
// Exibe os status do servidor
exports.status = async(req,res)=>{
    const serverName = req.params.serverName;
    const status = await minecraftService.getStatus(serverName);
    res.json(status)
}
// Inicia o servidor e me retorna uma resposta
exports.start = async(req,res)=>{
    const serverName = req.params.serverName;
    const r = await minecraftService.start(serverName);
    res.json(r);
}
// Para o servidor e me retorna uma resposta
exports.stop = async(req,res)=>{
    const serverName = req.params.serverName;
    const r = await minecraftService.stop(serverName);
    res.json(r);
}
// Reinicia o servidor e me retorna uma resposta
exports.restart = async(req,res)=>{
    const serverName = req.params.serverName;
    const r = await minecraftService.restart(serverName);
    res.json(r);
}