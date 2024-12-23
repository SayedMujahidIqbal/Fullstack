import express from "express";
import { calculateBmi } from "./bmiCalculator";
const app = express();

app.get("/ping", (_req, res) => {
  res.send("pong");
});

app.get("/bmi", (req, res) => {
  const url = req.originalUrl;
  const urlParameters = url.split("?")[1];
  const height = Number(urlParameters.split("&")[0].split("=")[1]);
  const weight = Number(urlParameters.split("&")[1].split("=")[1]);
  const bmi = calculateBmi(height, weight);
  res.json({ weight, height, bmi });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
