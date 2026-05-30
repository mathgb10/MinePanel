const os = require("os");
const {exec} = require("child_process");

class MinecraftService {
    
    testPlatform(p){
        if(p == 'win32'){
            return 'Windows';
        } else {
            return 'Linux';
        }
    }

    testStatus(p){
        if(p == 'win32'){
            return
        } else {
            return
        }

    }
    
    getStatus(){
        return {
            platform: this.testPlatform(os.platform()),
            online: false
        };
    };


}

module.exports = new MinecraftService();