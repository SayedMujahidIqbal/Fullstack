import { Box, Card, CardContent, Typography } from "@mui/material";
import { OccupationalHealthcareEntry } from "../types";
import { WorkSharp } from "@mui/icons-material";

const OccupationalHealthcareEntryDetails = (
  props: OccupationalHealthcareEntry
) => {
  return (
    <Box
      sx={{
        minWidth: 500,
        border: "0.1rem solid black",
        borderRadius: "0.3rem",
        margin: "0.3rem",
      }}
    >
      <Card variant="outlined">
        <CardContent>
          <Typography gutterBottom sx={{ color: "InfoText", fontSize: 14 }}>
            {props.date} <WorkSharp fontSize="small" />
          </Typography>
          <Typography
            gutterBottom
            sx={{ color: "InfoText", fontSize: 14, fontStyle: "italic" }}
          >
            {props.description}
          </Typography>
          <Typography gutterBottom sx={{ color: "InfoText", fontSize: 14 }}>
            diagnose by {props.specialist}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default OccupationalHealthcareEntryDetails;
