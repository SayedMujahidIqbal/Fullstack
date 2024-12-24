import express from "express";
import cors from "cors";
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("dist"));

app.get("/api/ping", (_req, res) => {
  res.send("pong");
  console.log("someone pinged me");
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server is listening at ${PORT}`);
});
