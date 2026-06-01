const fs = require("fs");
const path = require("path");
const serverManager = require("./serverManager");

class filesService {
    // Exibe os arquivos/diretorios do servidor
    getFiles(serverName, rPath) {
        const server = serverManager.getServer(serverName);
        // Pega o caminho lê ele e caso o caminho digitado saia da raiz do servidor
        // Retorna um erro
        const rootPath = path.resolve(server.path);
        const tPath = path.resolve(server.path, rPath);
        if (!tPath.startsWith(rootPath)) {
            return {
                error: "Tentativa de invasão detectada"
            };
        }
        const files = fs.readdirSync(tPath, { withFileTypes: true });
        // Retorna os arquivos mostrando o tipo e o caminho
        return files.map(f => ({
            name: f.name,
            type: f.isDirectory() ? "directory" : "file",
            path: path.join(rPath, f.name).replaceAll("\\", "/")
        }));
    }

    getFileContent(serverName, rPath) {
        const server = serverManager.getServer(serverName);
        const tPath = path.resolve(server.path, rPath);
        const rootPath = path.resolve(server.path);
        if (!tPath.startsWith(rootPath)) {
            return {
                error: "Tentativa de invasão detectada"
            };
        }
        if(!fs.existsSync(tPath)){
            return {
                error: "Arquivo não encontrado"
            };
        }
        if(!fs.statSync(tPath)){
            return {
                error: "O caminho informado não é um arquivo"
            };
        }
        const file = fs.readFileSync(tPath, 'utf8');
        return {
            path: tPath,
            file
        };
    }

    saveFileContent(serverName,rPath,content){
        const server = serverManager.getServer(serverName);
        const rootPath = path.resolve(server.path);
        const tPath = path.resolve(server.path,rPath);
        if (!tPath.startsWith(rootPath)) {
            return {
                error: "Tentativa de invasão detectada"
            };
        }
        const stats = fs.statSync(tPath);
        fs.writeFileSync(tPath,content,"utf8");
        return{
            success: true,
            path: rPath,
            msg: "Arquivo salvo com sucesso"
        };
    }
}

module.exports = new filesService();