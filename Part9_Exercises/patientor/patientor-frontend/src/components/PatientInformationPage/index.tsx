import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Patient } from "../../types";
import patientService from "../../services/patients";
import { FemaleOutlined, MaleOutlined } from "@mui/icons-material";

const PatientInformationPage = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient>();

  useEffect(() => {
    if (!patient) {
      const fetchPatientById = async (id: string) => {
        const result: Patient | undefined = await patientService.getPatientById(
          id
        );
        setPatient(result[0]);
      };
      void fetchPatientById(id);
    }
  }, [patient, id]);

  return (
    <div>
      <div style={{ display: "flex" }}>
        <h1>{patient?.name}</h1>
        {patient?.gender === "male" ? <MaleOutlined /> : <FemaleOutlined />}
      </div>
      <div style={{ fontFamily: "sans-serif", fontSize: "15px" }}>
        ssh: {patient?.ssn}
      </div>
      <div style={{ fontFamily: "sans-serif", fontSize: "15px" }}>
        occupation: {patient?.occupation}
      </div>
    </div>
  );
};

export default PatientInformationPage;
