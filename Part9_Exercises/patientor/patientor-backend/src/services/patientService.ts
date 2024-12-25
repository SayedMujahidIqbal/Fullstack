import patients from "../../data/patients";
import { NonSensitivePatientEntry, PatientEntry } from "../types";

const getPatients = (): PatientEntry[] => {
  return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(({ id, name, gender, occupation }) => ({
    id,
    name,
    gender,
    occupation,
  }));
};

const addPatient = () => {
  return null;
};

export default {
  getPatients,
  addPatient,
  getNonSensitiveEntries,
};
