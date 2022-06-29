const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const connection = require("./config/db");
const cors = require("cors");
const socketIo = require("socket.io");
const routes = require("./routes/api/index");

require("dotenv").config();

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT | 9000;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Database connection
connection.connect(function (err) {
  if (err) throw err;
  console.log("DB connected!");
});

const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000"
  }
});

let clients = [];

io.on("connection", (socket) => {
  socket.on("client-connect", (data) => {
    clients.push({ socketId: socket.id, email: data });
    console.log(clients);
  });

  socket.on("send-invitation", (data) => {
    const client1 = clients.find((x) => x.email === data);
    console.log(clients);
    console.log(data);
    if (client1) {
      io.to(client1.socketId).emit("increment-unread");
    }
  });

  socket.on("disconnect", (reason) => {
    console.log(reason);
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
