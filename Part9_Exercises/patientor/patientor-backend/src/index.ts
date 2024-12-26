import express from "express";
import cors from "cors";
import diagnosisRouter from "./routes/diagnosis";
import patientsRouter from "./routes/patients";
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("dist"));

const PORT = 3003;

app.get("/api/ping", (_req, res) => {
  res.send("pong");
});

app.use("/api/diagnosis", diagnosisRouter);
app.use("/api/patients", patientsRouter);

app.listen(PORT, () => {
  console.log(`Server is listening at ${PORT}`);
});
