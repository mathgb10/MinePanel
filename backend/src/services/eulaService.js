const fs = require("fs");
const path = require("path");
const serverManager = require("./serverManager");

class eulaService{
    // Valida se a eula está aceita só por enquanto
    getEula(serverName){
        const server = serverManager.getServer(serverName);
        const eulaPath = path.join(server.path, "eula.txt");
        const content = fs.readFileSync(eulaPath,"utf8");
        return {
            exists: true,
            accept: content.includes("eula=true")
        };
    }
    // Aceita a eula do servidor
    // Tentei deixar parecido com o estado que fica na EULA quando você abre e aceita e liga o servidor
    acceptEula(serverName){
        const server = serverManager.getServer(serverName);
        const eulaPath = path.join(server.path, "eula.txt");
        const date = new Date();

        // Pega as informações referente ao dia
        const dayNum = date.getDate();
        const day = date.getDay();
        const month = date.getMonth();
        const year = date.getFullYear();

        // Pega as informações referente as horas, e sempre quando for um horario com menos de 1 casa decimal
        // Adiciona um 0 na frente
        const hours = String(date.getHours()).padStart(2,'0');
        const minutes = String(date.getMinutes()).padStart(2,'0');
        const seconds = String(date.getSeconds()).padStart(2,'0');

        // Arrays com os nomes de dias e meses
        // O getDay e getMonth me retorna o número de 0 a 11
        const dayName = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
        const monthName = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"]

        // Escrevo no arquivo eula e retorna uma resposta
        fs.writeFileSync(eulaPath,`#By changing the setting below to TRUE you are indicating your agreement to our EULA (https://account.mojang.com/documents/minecraft_eula).\n#${dayName[day]} ${monthName[month]} ${dayNum} ${hours}:${minutes}:${seconds} BRT ${year}\neula=true`,"utf8");
        return {
            success: true,
            accepted: true
        };
    }
}

module.exports = new eulaService();