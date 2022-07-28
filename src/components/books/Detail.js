import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import moment from "moment";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {
  List,
  ListItemText,
  Divider,
  TextField,
  Grid,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import DateAdapter from "@mui/lab/AdapterMoment";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";

import { getRequest, updateRequest } from "../../httpServer";
import SnackAlert from "../../SnackAlerts";
import Header from "../Header";

const StudentDetail = () => {
  const params = useParams();
  const navigate = useNavigate();

  const id = params.id;
  const [row, setRow] = useState({});
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [selectedStudentId, setSelectedStudentId] = useState("");
  const [studentsList, setStudentsList] = useState([]);
  const [borrowDate, setBorrowDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const [msg, setMsg] = useState({});

  useEffect(() => {
    getRequest(`books/${id}`).then((result) => {
      if (result.success) {
        const { data, students } = result;
        setRow(data);
        setSelectedStudentId(data?.student_id);
        setName(data?.name);
        setAuthor(data?.author);
        setBorrowDate(data?.borrow_date);
        setReturnDate(data?.return_date);
        setStudentsList(students);
      } else {
        setMsg({ type: "error", msg: result.message });
      }
    });
  }, [id]);

  const handleUpdate = () => {
    const body = {
      name,
      author,
      student_id: selectedStudentId,
      borrow_date: borrowDate,
      return_date: returnDate,
    };
    updateRequest(`books/${id}`, body).then((result) => {
      const { message } = result;
      if (result.success) {
        setMsg({ type: "success", msg: message });
        setTimeout(() => {
          navigate("/books");
        }, 500);
      } else {
        setMsg({ type: "error", msg: message });
      }
    });
  };
  return (
    <React.Fragment>
      <Header title={"Book Detail"} />
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Card sx={{ minWidth: 275 }}>
              <Typography variant="h6">Update Info</Typography>
              <Divider />
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <InputLabel>Name</InputLabel>
                    <TextField
                      required
                      fullWidth
                      id="outlined-required"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <InputLabel>Author</InputLabel>
                    <TextField
                      required
                      fullWidth
                      id="outlined-required"
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <InputLabel>Student</InputLabel>
                    <Select
                      fullWidth
                      value={selectedStudentId}
                      onChange={(e) => setSelectedStudentId(e.target.value)}
                    >
                      {studentsList.map((item) => (
                        <MenuItem key={item.id} value={item.id}>
                          {item.first_name} {item?.last_name}
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>
                  <Grid item xs={12}>
                    <InputLabel>Borrow Date</InputLabel>
                    <LocalizationProvider dateAdapter={DateAdapter}>
                      <DatePicker
                        value={borrowDate}
                        onChange={(newValue) => {
                          setBorrowDate(newValue);
                        }}
                        renderInput={(params) => (
                          <TextField {...params} fullWidth />
                        )}
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={12}>
                    <InputLabel>Return Date</InputLabel>
                    <LocalizationProvider dateAdapter={DateAdapter}>
                      <DatePicker
                        value={returnDate}
                        onChange={(newValue) => {
                          setReturnDate(newValue);
                        }}
                        renderInput={(params) => (
                          <TextField {...params} fullWidth />
                        )}
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={12}>
                    <Button variant="contained" onClick={() => handleUpdate()}>
                      Update
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} pl={3}>
            <Card sx={{ minWidth: 275 }}>
              <CardContent>
                <List>
                  <Typography mt={3} variant="h5">
                    Books Detail
                  </Typography>
                  <ListItemText primary="Book Name" secondary={row?.name} />
                  <ListItemText primary="Author" secondary={row?.author} />
                  <ListItemText
                    primary="Borrow Date"
                    secondary={
                      row.borrow_date !== null
                        ? moment(row.borrow_date).format("YYYY-MM-DD")
                        : "-"
                    }
                  />
                  <ListItemText
                    primary="Return Date"
                    secondary={
                      row.return_date !== null
                        ? moment(row.return_date).format("YYYY-MM-DD")
                        : "-"
                    }
                  />
                  <Divider />
                  <Typography mt={3} variant="h5">
                    Student Detail
                  </Typography>
                  <ListItemText
                    primary="First Name"
                    secondary={row?.student?.first_name}
                  />
                  <ListItemText
                    primary="Last Name"
                    secondary={row?.student?.last_name}
                  />
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      <SnackAlert alertInfo={msg} />
    </React.Fragment>
  );
};

export default StudentDetail;
