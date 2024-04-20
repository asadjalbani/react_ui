import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";

function Header() {
  return (
    <div>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <span>Icon</span>
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, marginLeft: 1 }}
          >
            TindAPI
          </Typography>
          <Box display="flex" alignItems="center">
            <Avatar alt="Profile Picture" src="/path_to_profile_picture.jpg" />
          </Box>
        </Toolbar>
      </AppBar>
      <Divider />
    </div>
  );
}

export default Header;
