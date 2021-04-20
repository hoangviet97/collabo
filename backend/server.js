const express = require("express");
const bodyParser = require("body-parser");
const connection = require("./config/db");
const cors = require("cors");

const authRoutes = require("./routes/api/auth");
const projectRoutes = require("./routes/api/projects");
const memberRoutes = require("./routes/api/members");
const sectionRoutes = require("./routes/api/sections");
const taskRoutes = require("./routes/api/tasks");

require("dotenv").config();

const app = express();
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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...${process.env.DB_NAME}`);
});
