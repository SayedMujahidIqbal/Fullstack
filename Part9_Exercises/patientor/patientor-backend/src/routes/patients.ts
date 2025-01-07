import express, { Response, Request, NextFunction } from "express";
import {
  Entry,
  NewPatientEntry,
  ParamsDictionary,
  PatientEntry,
} from "../types";
import patientService from "../services/patientService";
import {
  HealthCheckEntrySchema,
  HospitalEntrySchema,
  NewEntrySchema,
  OccupationalHealthCareEntrySchema,
  parseDiagnosisCodes,
  parseDischarge,
  parseSickLeave,
} from "../utils";
import { z } from "zod";

const router = express.Router();

router.get("/", (_req, res: Response<PatientEntry[]>) => {
  res.send(patientService.getNonSensitiveEntries());
});

router.get("/:id", (req: Request, res: Response<PatientEntry[]>) => {
  res.send(patientService.getPatientById(req.params.id));
});

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    NewEntrySchema.parse(req.body);
    console.log(req.body);
    next();
  } catch (error) {
    next(error);
  }
};

const newEntryParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    const { type, diagnosisCodes } = req.body;
    switch (type) {
      case "Hospital":
        const { discharge } = req.body;
        parseDischarge(discharge);
        HospitalEntrySchema.parse(req.body);
        break;
      case "OccupationalHealthcare":
        if (req.body.sickLeave) parseSickLeave(req.body.sickLeave);
        OccupationalHealthCareEntrySchema.parse(req.body);
        break;
      case "HealthCheck":
        HealthCheckEntrySchema.parse(req.body);
        break;
      default:
        throw new Error("No such type found");
    }
    parseDiagnosisCodes(diagnosisCodes);
    next();
  } catch (error) {
    next(error);
  }
};

const errorMiddleware = (
  error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};

router.post(
  "/",
  newPatientParser,
  (
    req: Request<unknown, unknown, NewPatientEntry>,
    res: Response<PatientEntry>
  ) => {
    const addedEntry = patientService.addPatient(req.body);
    res.json(addedEntry);
  }
);

router.post(
  "/:id/entries",
  newEntryParser,
  (
    req: Request<ParamsDictionary, unknown, Entry>,
    res: Response<PatientEntry[]>
  ) => {
    const { id } = req.params;
    if (id) {
      const addedEntry = patientService.addEntry(req.body, id);
      res.json(addedEntry);
    }
  }
);

router.use(errorMiddleware);

export default router;
