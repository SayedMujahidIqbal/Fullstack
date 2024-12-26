import { z } from "zod";
import { NewEntrySchema } from "./utils";

export type NonSensitiveDiagnoseEntry = Omit<DiagnosisEntry, "latin">;
export type NonSensitivePatientEntry = Omit<
  PatientEntry,
  "dateOfBirth" | "ssn"
>;
export type NewPatientEntry = z.infer<typeof NewEntrySchema>;

export interface PatientEntry {
  id: string;
  name: string;
  dateOfBirth?: string;
  ssn?: string;
  gender: Gender;
  occupation: string;
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
