const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

require("dotenv").config();

const PORT = process.env.PORT;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});
