const minecraftService = require("../services/minecraftService");

exports.status = async(req,res) => {
    const status = minecraftService.getStatus();
    res.json(status);
};