export type NonSensitiveDiagnoseEntry = Omit<DiagnosisEntry, "latin">;
export type NonSensitivePatientEntry = Omit<
  PatientEntry,
  "dateOfBirth" | "ssn"
>;
export type NewPatientEntry = Omit<PatientEntry, "id">;

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

export interface PatientEntry {
  id: string;
  name: string;
  dateOfBirth?: string;
  ssn?: string;
  gender: Gender;
  occupation: string;
}
