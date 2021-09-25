require("dotenv").config();
const cors = require("cors");
const express = require("express");
const models = require("./models");
const mongoose = require("mongoose");

const port = process.env.PORT || 8080;
const app = express();

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
      const result = await models.Sensor.findOne({ date: req.query.date }).exec();
      res.json(result);
    } else {
      res.send("An invalid query provided.");
    }
  }
);
app.get("/times",
  async (req, res) => {
    try {
      models.Sensor.find().sort({ date: -1 }).limit(24).select("date").exec((error, data) => {
        console.log(data);
        if (error) throw error;
        res.json(data);
      });
    } catch(error) {
      res.json(error);
    }
  }
);
app.get("/current",
  async (req, res) => {
    try {
      models.Sensor.findOne().sort({ date: -1 }).limit(1).exec((error, data) => {
        if (error) throw error;
        res.json(data);
      });
    } catch(error) {
      res.json(error);
    }
  }
);

app.listen(port, () => console.log(`The API is running on port ${port}!`));
