import { Box, Card, CardContent, Typography } from "@mui/material";
import { HealthCheckEntry } from "../types";
import { MedicalServices } from "@mui/icons-material";

const HealthCheckEntryDetails = (props: HealthCheckEntry) => {
  return (
    <Box
      sx={{
        minWidth: 500,
        border: "0.1rem solid black",
        borderRadius: "0.3rem",
      }}
    >
      <Card variant="outlined">
        <CardContent>
          <Typography gutterBottom sx={{ color: "InfoText", fontSize: 14 }}>
            {props.date} <MedicalServices fontSize="small" />
          </Typography>
          <Typography
            gutterBottom
            sx={{ color: "InfoText", fontSize: 14, fontStyle: "italic" }}
          >
            {props.description}
          </Typography>
          <Typography gutterBottom sx={{ color: "InfoText", fontSize: 14 }}>
            {props.healthCheckRating}
          </Typography>
          <Typography gutterBottom sx={{ color: "InfoText", fontSize: 14 }}>
            diagnose by {props.specialist}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default HealthCheckEntryDetails;
