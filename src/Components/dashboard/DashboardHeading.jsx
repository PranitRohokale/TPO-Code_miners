import * as React from "react";
import {Typography } from "@mui/material";

const DashboardHeading=({text})=>(
    <Typography
        sx={{
          fontSize: 25,
          fontWeight: 100,
        }}
        gutterBottom
      >
        {text}
      </Typography>
)

export default DashboardHeading;