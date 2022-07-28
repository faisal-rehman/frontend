import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";

import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";


import { getRequest } from "../../httpServer";
import SnackAlert from "../../SnackAlerts";
import Header from "../Header";

const List = () => {
  const [rows, setRows] = useState([]);
  const [msg, setMsg] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    getRequest("books").then((result) => {
      if (result.success) {
        setRows(result.data);
      } else {
        setMsg({ type: "error", msg: result.message });
      }
    });
  }, []);
  return (
    <React.Fragment>
      <Header title={"Students"} />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Author Name</TableCell>
              <TableCell>Borrowed By</TableCell>
              <TableCell>Borrow Date</TableCell>
              <TableCell>Date Return</TableCell>
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
                  {row.name}
                </TableCell>
                <TableCell>{row.author}</TableCell>
                <TableCell>
                  {row?.student?.first_name} {row?.student?.last_name}
                </TableCell>
                <TableCell>
                  {row.borrow_date !== null
                    ? moment(row.borrow_date).format("YYYY-MM-DD")
                    : "-"}
                </TableCell>
                <TableCell>
                  {row.return_date !== null
                    ? moment(row.return_date).format("YYYY-MM-DD")
                    : "-"}
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    onClick={() => navigate(`/book/detail/${row.id}`)}
                  >
                    Detail
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <SnackAlert alertInfo={msg} />
    </React.Fragment>
  );
};

export default List;
