const fs = require("fs");

class PropertiesService{
    parse(filePath){
        const content = fs.readFileSync(filePath,"utf8");
        const lines = content.split("\n");
        const r = {};
        for (const i of lines){
            const trimmed = i.trim();
            if (trimmed == ""){
                continue;
            }
            const separator = trimmed.indexOf("=");
            if(separator == -1){
                continue;
            }
            const k = trimmed.substring(0,separator);
            const v = trimmed.substring(separator + 1);
            r[k] = v;
        }
        return r;
    }
}

module.exports = new PropertiesService();