import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
} from "@mui/material";

const StudentsTable = ({ rows }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 350, maxWidth: 350 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Student Name</TableCell>
            <TableCell align="right">Branch</TableCell>
            <TableCell align="right">ID</TableCell>
            <TableCell align="right">Grad Year</TableCell>
            <TableCell align="right">Gender</TableCell>
            <TableCell align="right">Is CR</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.clgId}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.firstName+" "+row.lastName}
              </TableCell>
              <TableCell align="right">{row.branch}</TableCell>
              <TableCell align="right">{row.clgId}</TableCell>
              <TableCell align="right">{row.gradYear}</TableCell>
              <TableCell align="right">{row.gender}</TableCell>
              <TableCell align="right"><Checkbox checked={row.isCr} color= 'success' /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default StudentsTable;
