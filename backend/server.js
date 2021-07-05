const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const bodyParser = require("body-parser");
const connection = require("./config/db");
const cors = require("cors");

const authRoutes = require("./routes/api/auth");
const projectRoutes = require("./routes/api/projects");
const memberRoutes = require("./routes/api/members");
const sectionRoutes = require("./routes/api/sections");
const taskRoutes = require("./routes/api/tasks");
const channelRoutes = require("./routes/api/channel");
const invitationRoutes = require("./routes/api/invitation");

require("dotenv").config();

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: "*"
  }
});

const PORT = process.env.PORT | 9000;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

connection.connect(function (err) {
  if (err) throw err;
  console.log("DB connected!");
});

app.use("/api", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/members", memberRoutes);
app.use("/api/sections", sectionRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/channels", channelRoutes);
app.use("/api/invitation", invitationRoutes);

io.on("connection", (socket) => {
  console.log("connection made successfully");
  socket.on("message", (payload) => {
    console.log("Message received on server: ", payload);
    io.emit("message", payload);
  });

  socket.on("say", (payload) => {
    console.log("hi: ", payload);
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});
