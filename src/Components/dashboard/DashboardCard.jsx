import * as React from "react";
import { Card, CardActions, CardContent, Typography } from "@mui/material";

const DashboardCard = ({desc, value, color_val}) => {
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
        background: color_val,
        marginBottom: "15px",
        marginRight: "3px",
        marginLeft: "3px",
        ":hover": {
          boxShadow: 20,
        },
      }}
      key={desc}
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
        {console.log(color_val)}
        <Typography
          sx={{
            fontSize: 25,
            textAlign: "center",
          }}
          gutterBottom
        >
          {value}
        </Typography>
        <Typography
          sx={{
            fontSize: 15,
            textAlign: "center",
          }}
          gutterBottom
        >
          {desc}
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

export default DashboardCard;
