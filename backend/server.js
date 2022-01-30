const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const connection = require("./config/db");
const cors = require("cors");

require("dotenv").config();

const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT | 9000;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

connection.connect(function (err) {
  if (err) throw err;
  console.log("DB connected!");
});

const routes = require("./routes/api/index");

app.use("/api", routes);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});
