const fs = require("fs");
const path = require("path");
const propertiesService = require("./propertiesService");
// const { config } = require("process");

class ServerManager {
    getAllServers() {
        // Defino o caminho da pasta mc-servers que está na raiz do projeto
        const serversPath = path.join(
            process.cwd(),
            "..",
            "mc-servers"
        );
        // Coleto os items presentes na pasta mc-servers
        const items = fs.readdirSync(serversPath, { withFileTypes: true });
        // Filtro os mesmos mostrando somente pastas
        const folders = items
            .filter(item => item.isDirectory())
            .map(item => item.name);

        return folders;
    }

    // Pego o arquivo server.properties e formato
    getServerProperties(serverPath){
        const hasServerProperties = fs.existsSync(path.join(serverPath,"server.properties"));
        if(hasServerProperties){
            const propPath = path.join(serverPath,"server.properties");
            const prop = propertiesService.parse(propPath);
            return prop;
        } else {
            return null;
        }
    }

    // Retorna o servidor e suas informações
    getServer(serverName) {
        // Caminho do servidor
        const serverPath = path.join(
            process.cwd(),
            "..",
            "mc-servers",
            serverName
        );
        // Caso ele não existir retorna null
        if (!fs.existsSync(serverPath)) {
            return null;
        }
        // Valida a configuração caso não exista ele cria uma de exemplo
        const configPath = path.join(serverPath, "panel.json");
        let config = null;
        if (fs.existsSync(configPath)) {
            // Le o arquivo de configuração e formata em JSON
            const configSeca = fs.readFileSync(configPath, "utf8");
            config = JSON.parse(configSeca);
        } else {
            const defaultConfig = {
                "name": "Exemplo",
                "javaPath": "C:\\Program Files\\Java\\jdk-26.0.1\\bin\\java.exe",
                "jar": "server.jar",
                "memory": {
                    "min": "2G",
                    "max": "4G"
                }
            }
            // Escrevo o arquivo no caminho e mando uma mensagem no console (temporariamente)
            fs.writeFileSync(configPath,JSON.stringify(defaultConfig,null,4),"utf8");
            const txt = 'Não foi encontrada nenhum arquivo de configuração\nCriamos um arquivo de exemplo por favor certifique-se de alterar as informações';
            config = defaultConfig;
            console.log(txt);
        }
        return {
            id: serverName,
            name: config.name,
            path: serverPath,
            configPath,
            javaPath: config.javaPath,
            jar: config.jar,
            memory: config.memory,
            hasEula: fs.existsSync(path.join(serverPath,"eula.txt")),
            serverProperties: this.getServerProperties(serverPath) 
        };
    }
}

module.exports = new ServerManager;