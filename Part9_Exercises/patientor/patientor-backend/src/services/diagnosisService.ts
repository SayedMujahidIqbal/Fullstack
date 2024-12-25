import diagnosis from "../../data/diagnosis";
import { DiagnosisEntry, NonSensitiveDiagnoseEntry } from "../types";

const getDiagnosis = (): DiagnosisEntry[] => {
  return diagnosis;
};

const getNonSensitiveEntries = (): NonSensitiveDiagnoseEntry[] => {
  return diagnosis.map(({ code, name }) => ({
    code,
    name,
  }));
};

const addDiagnosis = () => {
  return null;
};

export default {
  getDiagnosis,
  getNonSensitiveEntries,
  addDiagnosis,
};
