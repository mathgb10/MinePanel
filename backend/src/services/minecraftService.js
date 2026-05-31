const os = require("os");
const { exec } = require("child_process");
const serverManager = require("./serverManager");
const propertiesService = require("./propertiesService");
const processService = require("./processService");

class MinecraftService {

    getPlatform() {
        const p = os.platform();
        if (p == 'win32') {
            return 'Windows';
        } else if (p == 'darwin') {
            return 'darwin';
        } else {
            return 'Linux';
        }
    }

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
}

module.exports = new MinecraftService();