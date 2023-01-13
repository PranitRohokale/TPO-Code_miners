import React, { useEffect, useState } from "react";
import {
  Container,
  Snackbar,
  Typography,
  Alert,
  Grid,
  Card,
  CardActions,
  CardContent,
  Button,
  Dialog,
  useMediaQuery,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
} from "@mui/material";

import { Link } from "react-router-dom";
// import StudentsTable from "../../../Components/AdminViewStudents/StudentsTable";
import { GET_ALL_STUDENTS } from "../../../Graphql/Queries/AdminViewStudents/adminViewStudents";
import { useQuery } from "@apollo/client";

// function createStudentData(
//     name,
//     branch,
//     id,
//     year,
//     gender,
//     isCR
//   ) {
//     return { name, branch, id, year, gender, isCR };
//   }

// var dashboardData= {
//     "overview":[
//         {"desc":"Total companies",
//             "value":300,
//             "color_val": "#8cf0f5"},
//         {"desc":"Total students registered",
//             "value": 4000,
//             "color_val": "#5fd986"}
//     ],
//     "students":{
//         "placements":[
//             {"desc":"Students registered",
//                 "value": 2000,
//                 "color_val": "#9d83f2"},
//             {"desc":"Students placed",
//                 "value": 1800,
//                 "color_val": "#f5a262"},
//             {"desc":"Highest CTC",
//                 "value": "50 LPA",
//                 "color_val": "#e0f57a"}
//         ],
//         "internships":[
//             {"desc":"Students registered",
//                 "value":2000,
//                 "color_val": "#5f65d4"},
//             {"desc":"Students placed",
//                 "value": 1900,
//                 "color_val": "#96d4a3"},
//             {"desc":"Highest stipend (per month)",
//                 "value": "3 Lac",
//                 "color_val": "#f7adea"}
//         ]
//     },
//     "studentData": [
//         createStudentData('Abc', 'IT', 195235235, 4, "F", true),
//         createStudentData('Def', 'COMP', 204789330, 3, "F", false),
//         createStudentData('Ghi', 'COMP', 196378953, 2, "M", true),
//         createStudentData('Jkl', 'EXTC', 195364782, 1, "M", false),
//       ]
// }

// const data1 = {
//   Students: [
//     {
//       __typename: "Students",
//       CPI: 9.12,
//       SPI1: 0,
//       SPI2: 0,
//       SPI3: 0,
//       SPI4: 0,
//       SPI5: 0,
//       SPI6: 0,
//       SPI7: 0,
//       SPI8: 0,
//       age: 20,
//       branch: "CS",
//       clgEmail: "prrohokale_b19@ce.vjti.ac.in",
//       clgId: 191070000,
//       column_10th: 90,
//       column_12th: 90,
//       created_at: "2023-01-12T07:54:45.59504+00:00",
//       dob: "2002-09-29",
//       firstName: "Pranit",
//       gender: "Male",
//       gradYear: 2023,
//       id: "0173a65e-ac39-405c-8a92-e2fa1d6d49cb",
//       isCr: false,
//       isDreamPlaced: null,
//       isNormalPlaced: null,
//       isSuperPlaced: null,
//       lastName: "Rohokale",
//       middleName: "Rangnath ",
//       mobileNumber: 8446122060,
//       programme: "BTech",
//       resumeLink:
//         "https://docs.google.com/document/d/1CNkznkHiSqI1zSHLY-NRZy0MgXhDHg-RDPe5EuJqwQk/edit",
//     },
//   ],
// };

const ViewStudents = () => {
  const [students, setStudents] = useState([]);
  const { loading, error } = useQuery(GET_ALL_STUDENTS, {
    onCompleted: (data) => setStudents(data.Students),
  });
  const updateStudent = (id, studentAttributes) => {
    var index = students.findIndex((x) => x.id === id);
    if (index === -1) {
      // handle error
      console.log("error: index= -1");
    } else {
      // console.log("New student attr:", studentAttributes);
      var newStudents = [
        ...students.slice(0, index),
        Object.assign({}, students[index], studentAttributes),
        ...students.slice(index + 1),
      ];
      // console.log("New students:", newStudents);
      setStudents(newStudents);
    }
  };
  const [updatedCrs, setUpdatedCrs] = useState({});

  // if(loading)
  //     return


  return (
    <Container maxWidth="lg" sx={{ my: 5 }}>
      {students ? (
        <TableContainer component={Paper}>
          <Table
            sx={{ minWidth: 350, maxWidth: 350 }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <TableCell>Student Name</TableCell>
                <TableCell align="right">Is CR</TableCell>
                <TableCell align="right">Is Placed</TableCell>
                <TableCell align="right">Programme</TableCell>
                <TableCell align="right">Branch</TableCell>
                <TableCell align="right">ID</TableCell>
                <TableCell align="right">Grad Year</TableCell>
                <TableCell align="right">Gender</TableCell>
                <TableCell align="right">Age</TableCell>
                <TableCell align="right">CPI</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.firstName + " " + row.lastName}
                  </TableCell>
                  <TableCell align="right">
                    <Checkbox
                      checked={row.isCr}
                      onChange={(e) => {
                        var newStudentAttr = { "isCr": !row.isCr }; //...students[index],
                        updateStudent(row.id, newStudentAttr);
                        // var newData={
                        //   "Students": [...students, ]
                        // }
                        // var crList_ = crList;
                        // crList_[row.id] = !crList_[row.id];
                        // setCrList(crList_);
                        var updatedCrs_ = updatedCrs;
                        updatedCrs_[row.id] = students[index].isCr;
                        setUpdatedCrs(updatedCrs_);
                        console.log(updatedCrs);
                      }}
                      color="success"
                    />
                  </TableCell>
                  <TableCell>
                    {row.isNormalPlaced
                      ? row.isDreamPlaced
                        ? row.isSuperPlaced
                          ? "Yes, Super dream"
                          : "Yes, Dream"
                        : "Yes, Normal"
                      : "No"}
                  </TableCell>
                  <TableCell>{row.programme ? row.programme : "N/A"}</TableCell>
                  <TableCell>{row.branch ? row.branch : "N/A"}</TableCell>
                  <TableCell align="right">
                    {row.clgId ? row.clgId : "N/A"}
                  </TableCell>
                  <TableCell align="right">
                    {row.gradYear ? row.gradYear : "N/A"}
                  </TableCell>
                  <TableCell>{row.gender ? row.gender : "N/A"}</TableCell>
                  <TableCell align="right">
                    {row.age ? row.age : "N/A"}
                  </TableCell>
                  <TableCell align="right">
                    {row.CPI ? row.CPI : "N/A"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        "Loading..."
      )}
      {/* <Button onClick={()=>(console.log(crList))}>Log crList</Button> */}
    </Container>
  );
};

export default ViewStudents;
