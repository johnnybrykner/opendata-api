require("dotenv").config();
const models = require("./models");
const fetch = require("node-fetch");
const mongoose = require("mongoose");

(async (_) => {
  try {
    const url = process.env.CONNECTION_STRING;
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    const rawData = await fetch(process.env.EFICODE_API_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + process.env.EFICODE_API_TOKEN,
      },
    });
    const sensorResponse = await rawData.json();
    const newSensor = new models.Sensor({
      ...sensorResponse,
    });
    await newSensor.save();
  } catch (error) {
    console.error("Database connection failed: ", error);
  }
})();
