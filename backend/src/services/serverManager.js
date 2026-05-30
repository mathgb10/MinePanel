const fs = require("fs");
const path = require("path");

class ServerManager {
    getAllServers(){
        // Defino o caminho da pasta mc-servers que está na raiz do projeto
        const serversPath = path.join(
            process.cwd(),
            "..",
            "mc-servers"
        );
        // Coleto os items presentes na pasta mc-servers
        const items = fs.readdirSync(serversPath,{withFileTypes:true});
        // Filtro os mesmos mostrando somente pastas
        const folders = items
            .filter(item => item.isDirectory())
            .map(item => item.name);
        
        return folders;
    }
    // Verifico se existe uma pasta com o nome informado
    exists(n){
        const name = n;
        const all = this.getAllServers();
        return all.includes(name);
    }
}

module.exports = new ServerManager;