const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const app = express();

app.use(cors);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);

  socket.on("join", (data) => {
    console.log("join", data);
    socket.join(data.room);
  });

  socket.on("sendMessage", (data) => {
    console.log("sendMessage", data);
    socket.to(data.author.room).emit("receiveMessage", data);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
  });
});

server.listen(3001, () => {
  console.log("listening on *:3001");
});
