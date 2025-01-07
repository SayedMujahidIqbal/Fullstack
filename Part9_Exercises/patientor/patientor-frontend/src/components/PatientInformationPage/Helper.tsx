import {
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { ReactNode } from "react";
import { Discharge, SickLeave } from "../../types";

interface HealthCheckProps {
  rating: string;
  handleRatingChange:
    | ((event: SelectChangeEvent<string>, child: ReactNode) => void)
    | undefined;
  healthRatings: string[];
}

interface HospitalProps {
  discharge: Discharge;
  setDischarge: React.Dispatch<React.SetStateAction<Discharge>>;
}

interface OccupationalProps {
  sickLeave: SickLeave;
  setSickLeave: React.Dispatch<React.SetStateAction<SickLeave>>;
  employer: string;
  setEmployer: React.Dispatch<React.SetStateAction<string>>;
}

export const HealthCheckHelpers = (props: HealthCheckProps) => {
  return (
    <div style={{ padding: "0.5rem" }}>
      <FormControl>
        <InputLabel id="demo-multiple-name-label">Health Rating</InputLabel>
        <Select
          fullWidth
          value={props.rating}
          labelId="demo-multiple-name-label"
          id="demo-multiple-name-label"
          variant="standard"
          input={<OutlinedInput label="Health Rating" />}
          sx={{ width: "65rem" }}
          onChange={props.handleRatingChange}
        >
          {props.healthRatings.map((rating) => (
            <MenuItem key={rating} value={rating}>
              {rating}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export const HospitalHelpers = (props: HospitalProps) => {
  return (
    <>
      <div style={{ padding: "0.5rem" }}>
        <TextField
          fullWidth
          type="date"
          variant="standard"
          sx={{ width: "65rem" }}
          onChange={({ target }) => {
            props.setDischarge({ ...props.discharge, date: target.value });
          }}
        />
      </div>
      <div style={{ padding: "0.5rem" }}>
        <TextField
          fullWidth
          label="Discharge Criteria"
          variant="standard"
          sx={{ width: "65rem" }}
          onChange={({ target }) => {
            props.setDischarge({ ...props.discharge, criteria: target.value });
          }}
        />
      </div>
    </>
  );
};

export const OccupationalHelpers = (props: OccupationalProps) => {
  return (
    <>
      <div>
        <Typography variant="body1" color="GrayText">
          Sick Leave
        </Typography>
        <div style={{ marginBottom: "1rem", padding: "0.5rem" }}>
          <InputLabel>Start Date</InputLabel>
          <TextField
            fullWidth
            type="date"
            variant="standard"
            value={props.sickLeave.startDate}
            onChange={({ target }) => {
              props.setSickLeave({
                ...props.sickLeave,
                startDate: target.value,
              });
            }}
          />
        </div>
        <div style={{ padding: "0.5rem" }}>
          <InputLabel>End Date</InputLabel>
          <TextField
            fullWidth
            type="date"
            variant="standard"
            value={props.sickLeave.endDate}
            onChange={({ target }) => {
              props.setSickLeave({ ...props.sickLeave, endDate: target.value });
            }}
          />
        </div>
      </div>
      <div style={{ marginTop: "1rem", padding: "0.5rem" }}>
        <TextField
          fullWidth
          label="Employer"
          variant="standard"
          value={props.employer}
          sx={{ width: "65rem" }}
          onChange={({ target }) => {
            props.setEmployer(target.value);
          }}
        />
      </div>
    </>
  );
};
