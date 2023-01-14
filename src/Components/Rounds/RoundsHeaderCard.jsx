import * as React from "react";
import { Card, CardActions, CardContent, Typography } from "@mui/material";

const RoundHeaderCard = ({desc, value}) => {//, color_val
  return (
    <Card
      sx={{
        minWidth: 175,
        maxWidth: 200,
        maxHeight: 120,
        minHeight: 120,
        display: "flex",
        flexDirection: "column",
        alignContent: "space-around",
        background: "#C8C8C8",
        marginBottom: "15px",
        marginRight: "10px",
        marginLeft: "10px",
        ":hover": {
          boxShadow: 20,
        },
      }}
    >
      <CardContent
        sx={{
          minWidth: 175,
          maxWidth: 175,
          maxHeight: 120,
          minHeight: 120,
          display: "flex",
          flexDirection: "column",
          alignContent: "space-between",
        }}
      >
        <Typography
          sx={{
            fontSize: 15,
            textAlign: "center",
          }}
          gutterBottom
        >
          {desc}
        </Typography>
        <Typography
          sx={{
            fontSize: 15,
            textAlign: "center",
          }}
          gutterBottom
        >
          {value}
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
        }}
      ></CardActions>
    </Card>
  );
};

export default RoundHeaderCard;
