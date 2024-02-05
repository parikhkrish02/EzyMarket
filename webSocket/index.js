const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors())

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
        methods: ["GET", "POST"]
    }
})

io.on("connection", (socket) => {
    console.log(socket.id)
    socket.on("send_update", () => {
        console.log("update fires");
        socket.broadcast.emit("update")
    })

    socket.on("disconnect", (reason) => {
        console.log('-------------------------------------------------------------------------------------------------------------------------------------');
      });
})


server.listen(3001, () => {
    console.log('Socket Server Running !!!');
})