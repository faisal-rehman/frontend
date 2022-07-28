import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";

import { getRequest } from "../../httpServer";
import SnackAlert from "../../SnackAlerts";
import Header from "../Header";

const StudentList = () => {
  const [rows, setRows] = useState([]);
  const [error, setError] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    getRequest("students").then((result) => {
      if (result.success) {
        setRows(result.data);
      } else {
        setError({ type: "error", msg: result.message });
      }
    });
  }, []);
  return (
    <React.Fragment>
      <Header title={"Students List"} />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{++index}</TableCell>
                <TableCell component="th" scope="row">
                  {row.first_name}
                </TableCell>
                <TableCell>{row.last_name}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    onClick={() => navigate(`/student/detail/${row.id}`)}
                  >
                    Detail
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <SnackAlert alertInfo={error} />
    </React.Fragment>
  );
};

export default StudentList;
