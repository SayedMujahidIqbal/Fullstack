import {
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import React, { ReactNode } from "react";
import { DiagnosisEntry } from "../../types";

interface BaseFormProps {
  type: string;
  setType: React.Dispatch<React.SetStateAction<string>>;
  handleTypeChange:
    | ((event: SelectChangeEvent<string>, child: ReactNode) => void)
    | undefined;
  date: string;
  setDate: React.Dispatch<React.SetStateAction<string>>;
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  specialist: string;
  setSpecialist: React.Dispatch<React.SetStateAction<string>>;
  diagnosisCodes: Array<DiagnosisEntry["code"]>;
  handleDiagnosisChange:
    | ((
        event: SelectChangeEvent<DiagnosisEntry["code"]>,
        child: ReactNode
      ) => void)
    | undefined;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const BaseEntryForm = (props: BaseFormProps) => {
  const types = ["Hospital", "HealthCheck", "OccupationalHealthcare"];
  const codes = [
    "M24.2",
    "M51.2",
    "S03.5",
    "J10.1",
    "J06.9",
    "Z57.1",
    "N30.0",
    "H54.7",
    "J03.0",
    "L60.1",
    "Z74.3",
    "L20",
    "F43.2",
    "S62.5",
    "H35.29",
  ];
  return (
    <div>
      <div>
        <FormControl>
          <InputLabel id="demo-multiple-name-label">Type</InputLabel>
          <Select
            fullWidth
            labelId="demo-multiple-name-label"
            id="demo-multiple-name-label"
            value={props.type}
            input={<OutlinedInput label="Type" />}
            sx={{ width: "65rem" }}
            onChange={props.handleTypeChange}
          >
            {types.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div>
        <TextField
          fullWidth
          value={props.date}
          variant="standard"
          type="date"
          onChange={({ target }) => props.setDate(target.value)}
        />
      </div>
      <div>
        <TextField
          fullWidth
          value={props.description}
          label="Description"
          variant="standard"
          onChange={({ target }) => props.setDescription(target.value)}
        />
      </div>
      <div>
        <TextField
          fullWidth
          value={props.specialist}
          label="Specialist"
          variant="standard"
          onChange={({ target }) => props.setSpecialist(target.value)}
        />
      </div>
      <div>
        <FormControl fullWidth sx={{ marginTop: "0.5rem" }}>
          <InputLabel id="demo-multiple-name-label">Diagnosis Codes</InputLabel>
          <Select
            fullWidth
            labelId="demo-multiple-name-label"
            id="demo-multiple-name"
            multiple
            value={props.diagnosisCodes}
            MenuProps={MenuProps}
            input={<OutlinedInput label="Diagnosis Codes" />}
            onChange={props.handleDiagnosisChange}
          >
            {codes.map((c) => (
              <MenuItem key={c} value={c}>
                {c}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </div>
  );
};

export default BaseEntryForm;
