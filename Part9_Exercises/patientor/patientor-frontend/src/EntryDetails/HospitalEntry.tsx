import { Box, Card, CardContent, Typography } from "@mui/material";
import { HospitalEntry } from "../types";
import { LocalHospitalSharp } from "@mui/icons-material";

const HospitalEntryDetails = (props: HospitalEntry) => {
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
            {props.date} <LocalHospitalSharp fontSize="small" />
          </Typography>
          <Typography
            gutterBottom
            sx={{ color: "InfoText", fontSize: 14, fontStyle: "italic" }}
          >
            {props.description}
          </Typography>
          <Typography gutterBottom sx={{ color: "InfoText", fontSize: 14 }}>
            {props.discharge.criteria}
          </Typography>
          <Typography gutterBottom sx={{ color: "InfoText", fontSize: 14 }}>
            {props.discharge.date}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default HospitalEntryDetails;
