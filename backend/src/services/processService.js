const net = require("net");

class ProcessService {
    isPortOpen(port, host = "localhost") {
        return new Promise((resolve) => {
            const socket = new net.Socket();

            socket.setTimeout(1500);

            socket.connect(port, host, () => {
                socket.destroy();
                resolve(true);
            });

            socket.on("error", () => {
                resolve(false);
            });

            socket.on("timeout", () => {
                socket.destroy();
                resolve(false);
            });
        });
    }
}

module.exports = new ProcessService();