import dotenv from "dotenv";
import * as models from "./models.js";
import fetch from "node-fetch";
import mongoose from "mongoose";

(async (_) => {
  dotenv.config();
  try {
    const url = process.env.CONNECTION_STRING;
    await mongoose.connect(url);
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
      dataDate: sensorResponse.date,
      date: new Date().toISOString()
    });
    await newSensor.save();
    console.log("Entry added successfully!");
    return;
  } catch (error) {
    console.error("Database entry failed: ", error);
    return;
  }
})();
