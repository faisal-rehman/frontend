import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
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

import { getRequest, updateRequest } from "../../httpServer";
import SnackAlert from "../../SnackAlerts";
import Header from "../Header";

const StudentDetail = () => {
  const params = useParams();
  const navigate = useNavigate();

  const id = params.id;
  const [row, setRow] = useState({});
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userBooks, setUserBooks] = useState([]);
  const [books, setBooks] = useState([]);
  const [msg, setMsg] = useState({});

  useEffect(() => {
    getRequest(`students/${id}`).then((result) => {
      if (result.success) {
        const { data, books } = result;
        setRow(data);
        setFirstName(data.first_name);
        setLastName(data.last_name);
        const selectedbooks = data.books;
        let userbooks =
          selectedbooks.length > 0
            ? selectedbooks.map((book) => book["id"])
            : [];
        setUserBooks(userbooks);
        setBooks(books);
      } else {
        setMsg({ type: "error", msg: result.message });
      }
    });
  }, [id]);

  const handleUpdate = () => {
    const body = {
      first_name: firstName,
      last_name: lastName,
      books: userBooks.toString(),
    };
    updateRequest(`students/${id}`, body).then((result) => {
      const { message } = result;
      if (result.success) {
        setMsg({ type: "success", msg: message });
        setTimeout(() => {
          navigate("/");
        }, 500);
      } else {
        setMsg({ type: "error", msg: message });
      }
    });
  };
  return (
    <React.Fragment>
      <Header title={"Students Detail"} />
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Card sx={{ minWidth: 275 }}>
              <Typography variant="h6">Update Info</Typography>
              <Divider />
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <InputLabel>First Name</InputLabel>
                    <TextField
                      required
                      fullWidth
                      id="outlined-required"
                      value={firstName}
                      onChange={(e) => setFirstName(e.currentTarget.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <InputLabel>Last Name</InputLabel>
                    <TextField
                      required
                      fullWidth
                      id="outlined-required"
                      value={lastName}
                      onChange={(e) => setLastName(e.currentTarget.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <InputLabel>Books</InputLabel>
                    <Select
                      fullWidth
                      multiple
                      value={userBooks}
                      onChange={(e) => setUserBooks(e.target.value)}
                    >
                      {books.map((item) => (
                        <MenuItem key={item.id} value={item.id}>
                          {item.name}
                        </MenuItem>
                      ))}
                    </Select>
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
              <Typography variant="h5" component="div" gutterBottom>
                User Detail
              </Typography>
              <CardContent>
                <List>
                  <ListItemText
                    primary="First Name:"
                    secondary={row?.first_name}
                  />
                  <ListItemText
                    primary="Last Name:"
                    secondary={row?.last_name}
                  />
                  <Divider />
                  <Typography mt={3} variant="h5">
                    Books Detail
                  </Typography>
                  {row?.books?.map((item, index) => (
                    <ListItemText
                      primary={item.name}
                      key={index}
                      secondary={item.author}
                    />
                  ))}
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
