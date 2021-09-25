// const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const models = require("./models");
const mongoose = require("mongoose");

const port = process.env.PORT || 8080;
const app = express();

// app.use(bodyParser.json());
app.use(cors());

(async (_) => {
  try {
    const url = process.env.CONNECTION_STRING;
    await mongoose.connect(url);
    console.log("Successfully connected to the database");
  } catch (error) {
    console.error("Database connection failed: ", error);
  }
})();

app.get("/sensor",
  async (req, res) => {
    if (req.query.date) {
      req.text("Success!");
    } else {
      req.text("Fail!");
    }
  }
);

app.listen(port, () => console.log(`The API is running on port ${port}!`));
