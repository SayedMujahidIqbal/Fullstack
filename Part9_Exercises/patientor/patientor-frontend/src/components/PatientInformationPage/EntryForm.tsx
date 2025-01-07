import { Box, Button, SelectChangeEvent, Typography } from "@mui/material";
import React, { useState } from "react";
import {
  DiagnosisEntry,
  Discharge,
  EntryFormValues,
  SickLeave,
} from "../../types";
import {
  HealthCheckHelpers,
  HospitalHelpers,
  OccupationalHelpers,
} from "./Helper";
import BaseEntryForm from "./BaseEntryForm";

interface Props {
  toggleDisplay: boolean;
  setToggleDisplay: React.Dispatch<React.SetStateAction<boolean[]>>;
  onSubmit: (values: EntryFormValues) => void;
}

const EntryForm = (props: Props) => {
  const [date, setDate] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [specialist, setSpecialist] = useState<string>("");
  const [diagnosisCodes, setDiagnoseCodes] = useState<
    Array<DiagnosisEntry["code"]>
  >([]);
  const [discharge, setDischarge] = useState<Discharge>({
    date: "",
    criteria: "",
  });
  const [employer, setEmployer] = useState<string>("");
  const [sickLeave, setSickLeave] = useState<SickLeave>({
    startDate: "",
    endDate: "",
  });
  const [healthCheckRating, setHealthCheckRating] = useState<string>("");
  const [type, setType] = useState<string>("");
  const healthRatings = ["1", "2", "3"];

  const handleDiagnosisChange = (
    event: SelectChangeEvent<typeof diagnosisCodes>
  ) => {
    const {
      target: { value },
    } = event;
    setDiagnoseCodes([...value]);
  };

  const handleTypeChange = (event: SelectChangeEvent<typeof type>) => {
    const {
      target: { value },
    } = event;
    setType(value);
  };

  const handleRatingChange = (
    event: SelectChangeEvent<typeof healthCheckRating>
  ) => {
    const {
      target: { value },
    } = event;
    setHealthCheckRating(value);
  };

  const addEntry = (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (type === "Hospital") {
      props.onSubmit({
        type,
        date,
        description,
        specialist,
        diagnosisCodes,
        discharge,
      });
      setType("");
      setDate("");
      setDescription("");
      setSpecialist("");
      setDiagnoseCodes([]);
      setDischarge({ date: "", criteria: "" });
    } else if (type === "HealthCheck") {
      props.onSubmit({
        type,
        date,
        description,
        specialist,
        diagnosisCodes,
        healthCheckRating,
      });
      setType("");
      setDate("");
      setDescription("");
      setSpecialist("");
      setDiagnoseCodes([]);
      setHealthCheckRating("");
    } else if (type === "OccupationalHealthcare") {
      props.onSubmit({
        type,
        date,
        description,
        specialist,
        diagnosisCodes,
        sickLeave,
        employer,
      });
      setType("");
      setDate("");
      setDescription("");
      setSpecialist("");
      setDiagnoseCodes([]);
      setSickLeave({ startDate: "", endDate: "" });
      setEmployer("");
    }
  };

  return (
    <Box
      sx={{
        border: "3px dotted black",
        padding: "1rem",
        display: props.toggleDisplay ? "block" : "none",
      }}
    >
      <form onSubmit={addEntry}>
        <BaseEntryForm
          type={type}
          handleTypeChange={handleTypeChange}
          setType={setType}
          date={date}
          setDate={setDate}
          description={description}
          setDescription={setDescription}
          specialist={specialist}
          setSpecialist={setSpecialist}
          diagnosisCodes={diagnosisCodes}
          handleDiagnosisChange={handleDiagnosisChange}
        />
        {type === "Hospital" && (
          <Box sx={{ padding: "1rem" }}>
            <Typography variant="body1" color="GrayText">
              Discharge
            </Typography>
            <HospitalHelpers
              discharge={discharge}
              setDischarge={setDischarge}
            />
          </Box>
        )}
        {type === "OccupationalHealthcare" && (
          <OccupationalHelpers
            sickLeave={sickLeave}
            setSickLeave={setSickLeave}
            employer={employer}
            setEmployer={setEmployer}
          />
        )}
        {type === "HealthCheck" && (
          <HealthCheckHelpers
            healthRatings={healthRatings}
            handleRatingChange={handleRatingChange}
            rating={healthCheckRating}
          />
        )}
        <div style={{ padding: "0.5rem" }}>
          <Button
            variant="contained"
            color="error"
            onClick={props.setToggleDisplay}
          >
            cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ float: "right" }}
          >
            add
          </Button>
        </div>
      </form>
    </Box>
  );
};

export default EntryForm;
