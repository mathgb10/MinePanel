const fs = require("fs");
const path = require("path");
const serverManager = require("./serverManager");

class filesService{
    // Exibe os arquivos/diretorios do servidor
    getFiles(serverName, rPath){
        const server = serverManager.getServer(serverName);
        // Pega o caminho lê ele e caso o caminho digitado saia da raiz do servidor
        // Retorna um erro
        const tPath = path.join(server.path, rPath);
        const files = fs.readdirSync(tPath,{withFileTypes:true});
        const rootPath = path.resolve(server.path);
        if(!tPath.startsWith(rootPath)){
            return{
                error:"Tentativa de invasão detectada"
            };
        } 
        // Retorna os arquivos mostrando o tipo e o caminho
        return files.map(f=>({
            name: f.name,
            type: f.isDirectory()?"directory":"file",
            path: path.join(rPath, f.name).replaceAll("\\","/")
        }));
    }
}

module.exports = new filesService();