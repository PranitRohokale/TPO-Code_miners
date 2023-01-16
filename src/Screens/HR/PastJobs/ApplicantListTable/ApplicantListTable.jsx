import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  Grid,
} from "@mui/material";
import { useParams } from "react-router";


import { Link } from "react-router-dom";
import RoundHeaderCard from "../../../../Components/Rounds/RoundsHeaderCard";

const ApplicantListTable = ({
  applications,
  updatedSelects,
  setUpdatedSelects,
  updateApplication,
  title,
  roundAttrs,
}) => {

    const requiredArray = ['roundDetail', 'roundTime', 'status']
    const { jobId, roundId } = useParams();

    console.log(roundId);

// const roundAttrs= Object.entries(roundInfo).map(([key, value]) => ({key,value}));
  return (
    <Container maxWidth="lg" sx={{ my: 5 }}>
      <Typography
        sx={{
          fontSize: 40,
          textAlign: "center",
          fontWeight: 500,
          color: "#fff",
        }}
        gutterBottom
      >
        {title}
      </Typography>
      <Grid container spacing={0} align="center">
        {roundAttrs.map((row, index) => {
            if(!requiredArray.includes(row.key))
                return (<span key={index}></span>)

            return(<div key={index}>
                <RoundHeaderCard
                    desc={row.key+":"}
                    value={row.value}
                    // color_val={row.color_val}
                />
          </div>)
        })}
      </Grid>
      {applications ? (
        <TableContainer component={Paper}>
          <Table
            sx={{ minWidth: 350, maxWidth: 350 }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: 600 }}>Student Name</TableCell>
                <TableCell align="right" style={{ fontWeight: 600 }}>
                  Is Selected
                </TableCell>
                {/* <TableCell style={{ fontWeight: 600 }}>Programme</TableCell> */}
                <TableCell style={{ fontWeight: 600 }}>Branch</TableCell>
                {/* <TableCell align="right" style={{ fontWeight: 600 }}>
                  ID
                </TableCell>
                <TableCell align="right" style={{ fontWeight: 600 }}>
                  Grad Year
                </TableCell> */}
                <TableCell align="right" style={{ fontWeight: 600 }}>
                  Gender
                </TableCell>
                <TableCell align="right" style={{ fontWeight: 600 }}>
                  CPI
                </TableCell>
                {/* <TableCell align="right" style={{ fontWeight: 600 }}>
                  10th
                </TableCell>
                <TableCell align="right" style={{ fontWeight: 600 }}>
                  12th
                </TableCell> */}
                <TableCell align="right" style={{ fontWeight: 600 }}>
                  Mobile
                </TableCell>
                <TableCell align="right" style={{ fontWeight: 600 }}>
                  Resume Link
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {applications.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.Student.firstName + " " + row.Student.lastName}
                  </TableCell>
                  <TableCell align="right">
                    <Checkbox
                      checked={row.isSelected}
                      onChange={(e) => {
                        var newApplicationAttr = { isSelected: !row.isSelected }; //...students[index],
                        updateApplication(row.id, newApplicationAttr);
                        var updatedSelects_ = updatedSelects;
                        updatedSelects_[row.id] = applications[index].isSelected;
                        setUpdatedSelects(updatedSelects_);
                        console.log(updatedSelects_);
                      }}
                      color="success"
                    />
                  </TableCell>
                  <TableCell>{row.Student.branch ? row.Student.branch : "N/A"}</TableCell>
                  
                  <TableCell>{row.Student.gender ? row.Student.gender : "N/A"}</TableCell>
                  <TableCell align="right">
                    {row.Student.CPI ? row.Student.CPI : "N/A"}
                  </TableCell>
                  
                  <TableCell align="right">
                    {row.Student.mobileNumber ? row.Student.mobileNumber : "N/A"}
                  </TableCell>
                  <TableCell align="right">
                    {row.resumeLink ? (
                      <div styles={{ color: "#4287f5" }}>
                        <a href={row.resumeLink} target={"_blank"}> Link</a>
                      </div>
                    ) : (
                      "N/A"
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        "Loading..."
      )}
    </Container>
  );
};

export default ApplicantListTable;
