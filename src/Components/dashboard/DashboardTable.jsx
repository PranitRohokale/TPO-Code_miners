import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const DashboardTable = ({rows})=> {
  return (
    <TableContainer component={Paper} sx={{maxWidth: 250}}>
      <Table sx={{maxWidth: 250}} aria-label="simple table">
        <TableHead style={{ background: "#ffff66" }}>
          <TableRow>
            <TableCell style={{ fontWeight: 600 }}>Company Name</TableCell>
            <TableCell align="right" style={{ fontWeight: 600 }}>CTC</TableCell>
            <TableCell align="right" style={{ fontWeight: 600 }}>Students recruited</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.ctc}</TableCell>
              <TableCell align="right">{row.students}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
export default DashboardTable;