import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { isNotNumber } from "./utils";
import { calculateExercises } from "./exerciseCalculator";

const app = express();

app.use(express.json());

app.get("/ping", (_req, res) => {
  res.send("pong");
});

app.get("/bmi", (req, res) => {
  const url: string = req.originalUrl;
  const urlParameters: string = url.split("?")[1];
  const height: number = Number(urlParameters.split("&")[0].split("=")[1]);
  const weight: number = Number(urlParameters.split("&")[1].split("=")[1]);
  const bmi: string = calculateBmi(height, weight);
  res.json({ weight, height, bmi });
});

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { daily_exercises, target } = req.body;
  if (!daily_exercises || !target) {
    res.send("parameters missing");
  } else if (!Array.isArray(daily_exercises) && !isNotNumber(target)) {
    res.send("malformatted parameters");
  } else {
    res.json(calculateExercises(daily_exercises, Number(target)));
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
