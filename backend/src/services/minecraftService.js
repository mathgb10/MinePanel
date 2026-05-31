const os = require("os");
const { exec } = require("child_process");
const { spawn } = require("child_process");
const fs = require("fs");
const path = require("path");
const serverManager = require("./serverManager");
const propertiesService = require("./propertiesService");
const processService = require("./processService");

class MinecraftService {

    // Coleto a plataforma formato do meu jeito e retorno para o usuário 
    getPlatform() {
        const p = os.platform();
        if (p == 'win32') {
            return 'Windows';
        } else if (p == 'darwin') {
            return 'MacOS';
        } else {
            return 'Linux';
        }
    }

    // Valido se o servidor está online e a porta que está rodando
    async getStatus(serverName) {
        const server = serverManager.getServer(serverName);
        if (!server) {
            return null
        }

        const port = Number(
            server.serverProperties?.['server-port']
        );

        if (!port) {
            return {
                id: server.id,
                name: server.name,
                online: false,
                why: "server-port não encontrado"
            };
        }

        const online = await processService.isPortOpen(port);

        return {
            id: server.id,
            name: server.name,
            online: online,
            port: port
        };
    };

    // Inicia o servidor
    async start(serverName) {
        // Preparação
        const server = serverManager.getServer(serverName);
        const status = await this.getStatus(serverName);
        const jarPath = path.join(server.path, server.jar);
        const argumentos = [
            `-Xms${server.memory.min}`,
            `-Xmx${server.memory.max}`,
            `-jar`,
            server.jar,
            "nogui"
        ];
        // Isso vai executar o seguinte comando no terminal:
        // C:\\Program Files\\Java\\jdk-26.0.1\\bin\\java.exe -Xms4G -Xmx6G server.jar nogui
        // Claro isso varia de acordo com as configurações do arquivo panel.json
        // stdio seria o terminal, no caso eu estou ignorando
        // detached para o servidor continuar rodando caso o backend feche
        const process = spawn(server.javaPath, argumentos, {
            cwd: server.path,
            detached: true,
            stdio: "ignore"
        });
        // Isso faz com que o backend não fique monitorando o processo ou seja não fique preso
        process.unref();
        // Cria um diretorio panel dentro da pasta do servidor
        const panelPath = path.join(server.path, ".panel");
        if (!fs.existsSync(panelPath)) {
            fs.mkdirSync(panelPath);
        }
        // Escreve nele um arquivo server.pid com o pid do processo
        fs.writeFileSync(path.join(panelPath, "server.pid"),
            String(process.pid),
            "utf8"
        );
        return {
            success: true,
            message: "Server iniciando",
            pid: process.pid
        }
    };

    // Para o servidor
    async stop(serverName){
        const server = serverManager.getServer(serverName);
        const status = await this.getStatus(serverName);
        const panelPath = path.join(server.path,".panel");
        const pidPath = path.join(panelPath,"server.pid");
        const pid = Number(fs.readFileSync(pidPath,'utf8'));

        // Tenta matar o processo pelo pid salvo no arquivo server.pid dentro da pasta panel
        // Se der certo ele vai matar o processo e apagar o server.pid
        // Se não vai me exibir o erro
        try {
            process.kill(pid);
            fs.unlinkSync(pidPath);
            return {
                success: true,
                msg: "Servidor parado",
                pid
            };
        } catch (error){
            return {
                success: false,
                msg: "Erro ao parar servidor",
                error: error.message
            };
        }
    }

    // Reincia o servidor
    async restart(serverName){
        // Roda o stop espera 5000ms e roda o start depois me retorna um payload
        const stop = await this.stop(serverName);
        await new Promise (resolve => setTimeout(resolve,5000));
        const start = await this.start(serverName);
        return{
            success: start.success,
            msg: "Restart executado",
            stop: stop,
            start: start
        };
    }
}

module.exports = new MinecraftService();