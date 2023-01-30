const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const cors = require("cors");
const socketIo = require("socket.io");
const routes = require("./routes/api/index");

require("dotenv").config();

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT;
const client_url = process.env.CLIENT_URL;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const io = socketIo(server, {
  cors: {
    origin: client_url
  }
});

let clients = [];

io.on("connection", (socket) => {
  socket.on("client-connect", (data) => {
    clients.push({ socketId: socket.id, email: data });
  });

  socket.on("send-invitation", (data) => {
    const client1 = clients.find((x) => x.email === data.receiver);

    if (client1) {
      io.to(client1.socketId).emit("increment-unread", data.data);
    }
  });

  socket.on("disconnect", (reason) => {
    const arr = clients.filter((item) => item.socketId !== socket.id);
    clients = arr;
  });
});

app.set("clients", clients);

// Routes import
app.use("/api", routes);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});
