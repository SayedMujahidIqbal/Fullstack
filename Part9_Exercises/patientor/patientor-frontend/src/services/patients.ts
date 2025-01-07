import axios from "axios";
import { EntryFormValues, Patient, PatientFormValues } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);

  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(`${apiBaseUrl}/patients`, object);

  return data;
};

const getPatientById = async (id: string) => {
  const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
  return data;
};

const getDiagnosis = async () => {
  const { data } = await axios.get(`${apiBaseUrl}/diagnosis`);
  return data;
};

const createEntry = async (entry: EntryFormValues, patientId: string) => {
  const { data } = await axios.post(
    `${apiBaseUrl}/patients/${patientId}/entries`,
    entry
  );
  return data;
};

export default {
  getAll,
  create,
  getPatientById,
  getDiagnosis,
  createEntry,
};
