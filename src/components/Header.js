import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import { Toolbar, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
const Header = ({ title }) => {
  const navigate = useNavigate();
  return (
    <React.Fragment>
      <Box sx={{ flexGrow: 1 }} mb={3}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {title}
            </Typography>
            <Button color="inherit" onClick={() => navigate("/")}>
              Students
            </Button>
            <Button color="inherit" onClick={() => navigate("/books")}>
              Books
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    </React.Fragment>
  );
};
export default Header;
