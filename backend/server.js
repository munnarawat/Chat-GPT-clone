require("dotenv").config();
const app =  require("./src/app");
const ConectToDB = require("./src/db/db");
const initSocketServer = require("./src/socket/socket.server")
// import and create http server
const httpServer = require("http").createServer(app)

ConectToDB();

initSocketServer(httpServer);

httpServer.listen(3000,()=>{
    console.log("Server is running on port 3000");  
})