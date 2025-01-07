import patients from "../../data/patients";
import {
  EntryWithoutId,
  NewPatientEntry,
  NonSensitivePatientEntry,
  PatientEntry,
} from "../types";
import { v1 as uuid } from "uuid";

const getPatients = (): PatientEntry[] => {
  return patients;
};

const getPatientById = (patientId: string): PatientEntry[] => {
  return patients.filter((p: PatientEntry) => p.id === patientId);
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(({ id, name, gender, dateOfBirth, occupation }) => ({
    id,
    name,
    gender,
    dateOfBirth,
    occupation,
  }));
};

const addPatient = (entry: NewPatientEntry): PatientEntry => {
  const newPatientEntry = {
    id: uuid(),
    ...entry,
  };
  patients.push(newPatientEntry);
  return newPatientEntry;
};

const addEntry = (entry: EntryWithoutId, patientId: string): PatientEntry[] => {
  const newEntry = {
    id: uuid(),
    ...entry,
  };
  return patients.filter(
    (p) => p.id === patientId && { ...p, entries: p.entries?.push(newEntry) }
  );
};

export default {
  getPatients,
  getPatientById,
  addPatient,
  getNonSensitiveEntries,
  addEntry,
};
