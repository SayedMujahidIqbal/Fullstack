import express, { Response } from "express";
import { PatientEntry } from "../types";
import patientService from "../services/patientService";

const router = express.Router();

router.get("/", (_req, res: Response<PatientEntry[]>) => {
  res.send(patientService.getNonSensitiveEntries());
});

router.post("/", (_req, res) => {
  res.send("Saving a patient");
});

export default router;
