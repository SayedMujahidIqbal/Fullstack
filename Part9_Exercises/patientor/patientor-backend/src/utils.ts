import { z } from "zod";
import {
  DiagnosisEntry,
  Discharge,
  Gender,
  NewPatientEntry,
  SickLeave,
} from "./types";

export const NewEntrySchema = z.object({
  name: z.string(),
  dateOfBirth: z.string().date(),
  ssn: z.string().optional(),
  gender: z.nativeEnum(Gender),
  occupation: z.string(),
  entries: z.any().optional(),
});

export const parseDiagnosisCodes = (
  object: unknown
): Array<DiagnosisEntry["code"]> => {
  if (!object || typeof object !== "object" || !("diagnosisCodes" in object)) {
    return [] as Array<DiagnosisEntry["code"]>;
  }

  return object.diagnosisCodes as Array<DiagnosisEntry["code"]>;
};

export const parseDischarge = (object: unknown): Discharge => {
  if (!object || typeof object !== "object" || !("discharge" in object)) {
    return {} as Discharge;
  }

  return object.discharge as Discharge;
};

export const parseSickLeave = (object: unknown): SickLeave => {
  if (!object || typeof object !== "object" || !("sickLeave" in object)) {
    return {} as SickLeave;
  }

  return object.sickLeave as SickLeave;
};

export const HospitalEntrySchema = z.object({
  date: z.string().date(),
  description: z.string(),
  specialist: z.string(),
  type: z.string(),
});

export const OccupationalHealthCareEntrySchema = z.object({
  date: z.string().date(),
  description: z.string(),
  specialist: z.string(),
  type: z.string(),
  employer: z.string(),
});

export const HealthCheckEntrySchema = z.object({
  date: z.string().date(),
  description: z.string(),
  specialist: z.string(),
  type: z.string(),
  healthCheckRating: z.string(),
});

export const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  return NewEntrySchema.parse(object);
};
