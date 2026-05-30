const express = require("express");
const  serverR = require("./routes/serverRoutes");
const  serversR = require("./routes/serversRoutes");
const app = express();

app.use(express.json());
app.use("/api/server", serverR);
app.use("/api/servers", serversR);
app.listen(3000,()=>{
    console.log("Backend Rodando");
})