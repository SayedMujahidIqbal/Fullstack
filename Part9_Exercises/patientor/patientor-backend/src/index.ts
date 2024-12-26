import express from "express";
import cors from "cors";
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static("dist"));

const PORT = 3003;

import diagnosisRouter from "./routes/diagnosis";
import patientsRouter from "./routes/patients";

app.get("/api/ping", (_req, res) => {
  res.send("pong");
});

app.use("/api/diagnosis", diagnosisRouter);
app.use("/api/patients", patientsRouter);

app.listen(PORT, () => {
  console.log(`Server is listening at ${PORT}`);
});
