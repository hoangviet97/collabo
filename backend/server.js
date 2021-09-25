const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const bodyParser = require("body-parser");
const connection = require("./config/db");
const cors = require("cors");

require("dotenv").config();

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const PORT = process.env.PORT | 9000;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

connection.connect(function (err) {
  if (err) throw err;
  console.log("DB connected!");
});

const authRoutes = require("./routes/api/auth");
const projectRoutes = require("./routes/api/projects");
const memberRoutes = require("./routes/api/members");
const sectionRoutes = require("./routes/api/sections");
const taskRoutes = require("./routes/api/tasks");
const postRoutes = require("./routes/api/posts");
const sessionRoutes = require("./routes/api/session");
const talkingPointRoutes = require("./routes/api/talking_points");
const invitationRoutes = require("./routes/api/invitation");
const fileRoutes = require("./routes/api/files");
const folderRoutes = require("./routes/api/folders");
const timerRoutes = require("./routes/api/timers");

const uuid4 = require("uuid4");

app.use("/api", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/members", memberRoutes);
app.use("/api/sections", sectionRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/talking-points", talkingPointRoutes);
app.use("/api/invitation", invitationRoutes);
app.use("/api/files", fileRoutes);
app.use("/api/folders", folderRoutes);
app.use("/api/timers", timerRoutes);

app.set("io", io);

let users = [];

app.set("users", users);

io.on("connection", (socket) => {
  socket.on("greet", (data) => {
    socket.emit("notify", data);
  });

  socket.on("meet", (data) => {
    console.log(data);
  });

  socket.on("create post", (postBody) => {
    const newPost = { id: uuid4(), text: postBody.body, created_at: new Date(), projects_id: postBody.project, users_id: postBody.id, name: postBody.name };

    const sql = `INSERT INTO posts (id, text, created_at, projects_id, users_id) VALUES (?, ?, ?, ?, ?)`;
    connection.query(sql, [newPost.id, newPost.text, newPost.created_at, newPost.projects_id, newPost.users_id], (err, res) => {
      console.log(newPost);
      io.emit("get post", newPost);
      return;
    });
  });

  socket.on("disconnect", () => {
    users = users.filter((item) => item !== socket.id);
    socket.removeAllListeners();
    console.log("bye");
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});
