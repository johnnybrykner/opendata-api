const mongoose = require("mongoose");

const sensorSchema = new mongoose.Schema(
  {
    date: String,
    sensor1: Number | null,
    sensor2: Number | null,
    sensor3: Number | null,
    sensor4: Number | null,
  },
  { collection: "sensorData" }
);

module.exports = {
  Sensor: mongoose.model("Sensor", sensorSchema),
};
