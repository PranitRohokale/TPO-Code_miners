import React, { useEffect, useState } from "react";
import {
  Container,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
} from "@mui/material";
import styles from "../TpoPolicy/TpoPolicy.module.css";
import { Link } from "react-router-dom";
// import StudentsTable from "../../../Components/AdminViewStudents/StudentsTable";
import { GET_ALL_STUDENTS } from "../../../Graphql/Queries/AdminViewStudents/adminViewStudents";
import { useQuery } from "@apollo/client";
import ASidebar from "../../../Components/adminSidebar/ASidebar";
import CriteriaDropdown from "../../../Components/AdminViewStudents/CriteriaDropdown";

const CHOOSE_ALL_VAL_INT = 0;
const CHOOSE_ALL_VAL_STR = " ";
const CHOOSE_ALL_NAME = "All";
const PLACED_NP = "Not placed";
const PLACED_N = "Normal";
const PLACED_D = "Dream";
const PLACED_SD = "Super Dream";
const PLACED_CHOICES = [PLACED_NP, PLACED_N, PLACED_D, PLACED_SD];

const cpiRange = (max, min) => {
  return {
    max: max,
    min: min,
    name: max.toString() + " - " + min.toString(),
  };
};

const CPI_RANGES = [
  cpiRange(10, 9.5),
  cpiRange(9.5, 9),
  cpiRange(9, 8.5),
  cpiRange(8.5, 8),
  cpiRange(8, 7.5),
  cpiRange(7.5, 7),
  cpiRange(7, 6.5),
  cpiRange(6.5, 6),
  cpiRange(6, 5.5),
  cpiRange(5.5, 5),
  cpiRange(5, 4.5),
  cpiRange(4.5, 4),
  cpiRange(4, 3.5),
  cpiRange(3.5, 3),
  cpiRange(3, 2.5),
  cpiRange(2.5, 2),
  cpiRange(2, 1.5),
  cpiRange(1.5, 1),
  cpiRange(1, 0.5),
  cpiRange(0.5, 0),
];

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
  const [availablePrograms, setAvailablePrograms] = useState([]);
  const [availableBranches, setAvailableBranches] = useState([]);
  const [availableGradYears, setAvailableGradYears] = useState([]);
  const { loading, error } = useQuery(GET_ALL_STUDENTS, {
    onCompleted: (data) => {
      setStudents(data.Students);
      var uniquePrograms = availablePrograms;
      var uniqueBraches = availableBranches;
      var uniqueGradYears = availableGradYears;
      for (var student of data.Students) {
        if (!uniquePrograms.includes(student.programme)) {
          uniquePrograms.push(student.programme);
        }
        if (!uniqueBraches.includes(student.branch)) {
          uniqueBraches.push(student.branch);
        }
        if (!uniqueGradYears.includes(student.gradYear)) {
          uniqueGradYears.push(student.gradYear);
        }
      }
      setAvailablePrograms(uniquePrograms);
      setAvailableBranches(uniqueBraches);
      setAvailableGradYears(uniqueGradYears);
    },
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
  const [chosenProgram, setChosenProgram] = useState(CHOOSE_ALL_VAL_STR);
  const [chosenBranch, setChosenBranch] = useState(CHOOSE_ALL_VAL_STR);
  const [chosenGradYear, setChosenGradYear] = useState(0);
  const [chosenPlaced, setChosenPlaced] = useState(CHOOSE_ALL_VAL_STR);
  const [chosenCpiRange, setChosenCpiRange] = useState(CHOOSE_ALL_VAL_STR);
  // if(loading)
  //     return

  return (
    <div className={styles.hospitals_wrapper}>
      <ASidebar value="Student list" />
      <Container maxWidth="lg" sx={{ my: 5 }}>
        <div className="text-center text-2xl font-bold mb-6">Student List</div>
        {/* <Typography
          sx={{
            fontSize: 40,
            textAlign: "center",
            fontWeight: 500,
            color: "#8c47ed"
          }}
          gutterBottom
        >
          Student List
        </Typography> */}
        <div className="mt-2">
          <div className="text-lg font-bold mb-6 inline mr-2">Filter by:</div>
          <CriteriaDropdown
            inputLabel="Program"
            label="Program"
            defaultVal={CHOOSE_ALL_VAL_STR}
            defaultValName={CHOOSE_ALL_NAME}
            chosen={chosenProgram}
            handleChange={(e) => setChosenProgram(e.target.value)}
            available={availablePrograms}
          />
          <CriteriaDropdown
            inputLabel="Branch"
            label="Branch"
            defaultVal={CHOOSE_ALL_VAL_STR}
            defaultValName={CHOOSE_ALL_NAME}
            chosen={chosenBranch}
            handleChange={(e) => setChosenBranch(e.target.value)}
            available={availableBranches}
          />
          <CriteriaDropdown
            inputLabel="Grad Year"
            label="Grad Year"
            defaultVal={CHOOSE_ALL_VAL_INT}
            defaultValName={CHOOSE_ALL_NAME}
            chosen={chosenGradYear}
            handleChange={(e) => setChosenGradYear(e.target.value)}
            available={availableGradYears}
          />
          <CriteriaDropdown
            inputLabel="Placed Category"
            label="Placed Category"
            defaultVal={CHOOSE_ALL_VAL_STR}
            defaultValName={CHOOSE_ALL_NAME}
            chosen={chosenPlaced}
            handleChange={(e) => setChosenPlaced(e.target.value)}
            available={PLACED_CHOICES}
          />
          <CriteriaDropdown
            inputLabel="CPI Range"
            label="CPI Range"
            defaultVal={CHOOSE_ALL_VAL_STR}
            defaultValName={CHOOSE_ALL_NAME}
            chosen={chosenCpiRange}
            handleChange={(e) => {
              setChosenCpiRange(e.target.value);
            }}
            available={CPI_RANGES.map((cpi_range) => cpi_range.name)}
          />
          {/* <Button
            onClick={() => {
              // console.log(students);
              console.log(
                "Chosen Branch: " +
                  chosenBranch +
                  ", Chosen Grad Year: " +
                  chosenGradYear.toString()
              );
            }}
            variant="contained"
            color="success"
            sx={{ margin: 3 }}
          >
            Log
          </Button> */}
        </div>
        <br />
        {students ? (
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 350, maxWidth: 350 }}
              aria-label="simple table"
            >
              <TableHead style={{ background: "#ffbf00" }}>
                <TableRow>
                  <TableCell style={{ fontWeight: 600 }}>
                    Student Name
                  </TableCell>
                  <TableCell align="right" style={{ fontWeight: 600 }}>
                    Is CR
                  </TableCell>
                  <TableCell style={{ fontWeight: 600 }}>Is Placed</TableCell>
                  <TableCell style={{ fontWeight: 600 }}>Programme</TableCell>
                  <TableCell style={{ fontWeight: 600 }}>Branch</TableCell>
                  <TableCell align="right" style={{ fontWeight: 600 }}>
                    ID
                  </TableCell>
                  <TableCell align="right" style={{ fontWeight: 600 }}>
                    Grad Year
                  </TableCell>
                  <TableCell align="right" style={{ fontWeight: 600 }}>
                    Gender
                  </TableCell>
                  <TableCell align="right" style={{ fontWeight: 600 }}>
                    Age
                  </TableCell>
                  <TableCell align="right" style={{ fontWeight: 600 }}>
                    CPI
                  </TableCell>
                  <TableCell align="right" style={{ fontWeight: 600 }}>
                    10th
                  </TableCell>
                  <TableCell align="right" style={{ fontWeight: 600 }}>
                    12th
                  </TableCell>
                  <TableCell align="right" style={{ fontWeight: 600 }}>
                    Mobile
                  </TableCell>
                  <TableCell align="right" style={{ fontWeight: 600 }}>
                    Resume Link
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {students
                  .filter((s) => {
                    const cpiRangeName = chosenCpiRange;
                    const cpiRangeParts = cpiRangeName.split(" - ");
                    const cpiRangeMax = cpiRangeParts[0];
                    const cpiRangeMin = cpiRangeParts[1];
                    console.log("Max:",cpiRangeMax);
                    console.log("Min:",cpiRangeMin);

                    return (
                      (chosenProgram === CHOOSE_ALL_VAL_STR ||
                        chosenProgram === s.programme) &&
                      (chosenBranch === CHOOSE_ALL_VAL_STR || chosenBranch === s.branch) &&
                      (chosenGradYear === 0 || chosenGradYear === s.gradYear) &&
                      (chosenPlaced === CHOOSE_ALL_VAL_STR ||
                        (chosenPlaced === PLACED_SD && s.isSuperPlaced) ||
                        (chosenPlaced === PLACED_D && s.isDreamPlaced) ||
                        (chosenPlaced === PLACED_N && s.isNormalPlaced) ||
                        (chosenPlaced === PLACED_NP &&
                          !(
                            s.isNormalPlaced ||
                            s.isDreamPlaced ||
                            s.isSuperPlaced
                          ))) &&
                      (chosenCpiRange === CHOOSE_ALL_VAL_STR ||
                        (cpiRangeMax >= s.CPI && s.CPI >= cpiRangeMin))
                    );
                  })
                  .map((row, index) => (
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
                            var oldCrVal = row.isCr;
                            var newStudentAttr = { isCr: !oldCrVal }; //...students[index],
                            updateStudent(row.id, newStudentAttr);
                            var updatedCrs_ = updatedCrs;
                            updatedCrs_[row.id] = !oldCrVal;
                            setUpdatedCrs(updatedCrs_);
                            console.log(updatedCrs);
                          }}
                          color="success"
                        />
                      </TableCell>
                      <TableCell>
                        {row.isSuperPlaced
                          ? "Yes, Super dream"
                          : row.isDreamPlaced
                          ? "Yes, Dream"
                          : row.isNormalPlaced
                          ? "Yes, Normal"
                          : "No"}
                      </TableCell>
                      <TableCell>
                        {row.programme ? row.programme : "N/A"}
                      </TableCell>
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
                      <TableCell align="right">
                        {row.column_10th ? row.column_10th : "N/A"}
                      </TableCell>
                      <TableCell align="right">
                        {row.column_12th ? row.column_12th : "N/A"}
                      </TableCell>
                      <TableCell align="right">
                        {row.mobileNumber ? row.mobileNumber : "N/A"}
                      </TableCell>
                      <TableCell align="right">
                        {row.resumeLink ? (
                          <div styles={{ color: "#4287f5" }}>
                            <a href={row.resumeLink}> Link</a>
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
        <hr />
        <Button
          onClick={() => {}}
          variant="contained"
          color="success"
          sx={{ marginTop: 3, marginLeft: 120 }}
        >
          Save Changes
        </Button>
      </Container>
    </div>
  );
};

export default ViewStudents;
