import { z } from "zod";
import { NewEntrySchema } from "./utils";

export type NonSensitiveDiagnoseEntry = Omit<DiagnosisEntry, "latin">;
export type NonSensitivePatientEntry = Omit<PatientEntry, "ssn" | "entries">;
export type NewPatientEntry = z.infer<typeof NewEntrySchema>;

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface Entry {}

export interface PatientEntry {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn?: string;
  gender: Gender;
  occupation: string;
  entries?: Entry[];
}

export interface DiagnosisEntry {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}
