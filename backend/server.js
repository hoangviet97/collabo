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
const postRoutes = require("./routes/api/posts");
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
app.use("/api/posts", postRoutes);
app.use("/api/invitation", invitationRoutes);

const chat = io.of("/chat");

chat.on("connection", (socket) => {
  console.log("projects...");
  socket.on("hi", (data) => {
    console.log(data);
  });
  socket.emit("your id", socket.id);
  socket.on("send message", (body) => {
    chat.emit("msg", body);
  });
  socket.on("join", (data) => {
    console.log(data);
    socket.emit("get join", "ffff gain");
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});
