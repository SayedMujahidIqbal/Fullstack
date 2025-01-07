import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Entry, EntryFormValues, Patient } from "../../types";
import patientService from "../../services/patients";
import { FemaleOutlined, MaleOutlined } from "@mui/icons-material";
import HospitalEntryDetails from "../../EntryDetails/HospitalEntry";
import OccupationalHealthcareEntryDetails from "../../EntryDetails/OccupationalHealthcareEntry";
import HealthCheckEntryDetails from "../../EntryDetails/HealthCheckEntry";
import { Button } from "@mui/material";
import EntryForm from "./EntryForm";

const PatientInformationPage = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient>();
  const [toggleDisplay, setToggleDisplay] = useState<boolean>(false);

  useEffect(() => {
    if (!patient) {
      const fetchPatientById = async (id: string) => {
        const result: Patient = await patientService.getPatientById(id);
        setPatient(result[0]);
      };
      if (typeof id === "string") {
        void fetchPatientById(id);
      }
    }
  }, [patient, id]);

  const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
    switch (entry.type) {
      case "Hospital":
        return <HospitalEntryDetails {...entry} />;
      case "OccupationalHealthcare":
        return <OccupationalHealthcareEntryDetails {...entry} />;
      case "HealthCheck":
        return <HealthCheckEntryDetails {...entry} />;
    }
  };

  const toggleForm = (): void => {
    setToggleDisplay(!toggleDisplay);
  };

  const createEntry = async (values: EntryFormValues): Promise<void> => {
    if (patient?.id) {
      const data = await patientService.createEntry(values, patient?.id);
      setPatient(data[0]);
    }
  };

  return (
    <div>
      <div style={{ display: "flex" }}>
        <h1>{patient?.name}</h1>
        {patient?.gender === "male" ? <MaleOutlined /> : <FemaleOutlined />}
      </div>
      <div style={{ fontFamily: "sans-serif", fontSize: "15px" }}>
        ssh: {patient?.ssn}
      </div>
      <div
        style={{
          fontFamily: "sans-serif",
          fontSize: "15px",
          marginBottom: "0.5rem",
        }}
      >
        occupation: {patient?.occupation}
      </div>
      <EntryForm
        setToggleDisplay={toggleForm}
        toggleDisplay={toggleDisplay}
        onSubmit={createEntry}
      />
      <div>
        <h4>entries</h4>
        <div>
          {patient?.entries.length === 1 ? (
            <EntryDetails entry={patient.entries[0]} />
          ) : (
            patient?.entries.map((e) => <EntryDetails key={e.id} entry={e} />)
          )}
          <Button
            variant="contained"
            color="primary"
            sx={{ marginTop: 2 }}
            onClick={toggleForm}
          >
            Add New Entry
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PatientInformationPage;
