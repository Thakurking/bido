import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Drawer,
} from "@material-ui/core";

import { Menu, AccountCircle } from "@material-ui/icons";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountBoxIcon from '@material-ui/icons/AccountBox';

export default function NavBar(){
  const [open, setOpen] = useState(false);
  const [anchor, setAnchor] = useState("left");
  const handleDrawer = () =>{
    setAnchor("left");
    setOpen(true);
  }
  const handleAccount = () => {
    setAnchor("bottom");
    setOpen(true);
  };
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            onClick={handleDrawer}
            color="inherit"
            edge="start"
            arial-label="menu"
          >
            <Menu />
          </IconButton>
          <Typography
            variant="h6"
            style={{ flexGrow: 1, fontStyle: "inherit" }}
          >
            BIDO
          </Typography>
          <IconButton
            onClick={handleAccount}
            color="inherit"
            aria-label="account"
          >
            <AccountCircle />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer anchor={anchor} open={open} onClose={() => setOpen(false)}>
        <div>
          {anchor === "left" ? (
            <div style={{ height: "100%", width: "200px" }}>
              <h3>Home</h3>
              <h3>about</h3>
            </div>
          ) : (
            <div
              style={{
                height: "100%",
                padding: "20px",
              }}
            >
              <Button
                variant="contained"
                style={{
                  borderRadius: 10,
                  fontSize: 17,
                }}
                color="primary"
              >
                Logout
                <ExitToAppIcon />
              </Button>
              <Button
                variant="contained"
                style={{
                  borderRadius: 10,
                  fontSize: 17,
                }}
                color="primary"
              >
                Profile
                <AccountBoxIcon />
              </Button>
            </div>
          )}
        </div>
      </Drawer>
    </div>
  );
}