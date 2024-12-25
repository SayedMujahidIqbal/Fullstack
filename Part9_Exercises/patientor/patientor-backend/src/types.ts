export type NonSensitiveDiagnoseEntry = Omit<DiagnosisEntry, "latin">;
export type NonSensitivePatientEntry = Omit<
  PatientEntry,
  "dateOfBirth" | "ssn"
>;

export interface DiagnosisEntry {
  code: string;
  name: string;
  latin?: string;
}

export interface PatientEntry {
  id: string;
  name: string;
  dateOfBirth?: string;
  ssn?: string;
  gender: string;
  occupation: string;
}
