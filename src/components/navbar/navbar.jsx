import React from 'react'
import { Link, NavLink, useLocation } from "react-router-dom";
import Profile from "../profile/Profile";
import Search from "../search/Search";
import logo from "./logo1Sinfondo.png";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Button from "@mui/joy/Button";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Box } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { useSelector } from 'react-redux';

function Navbar() {
  let userLocal = localStorage.getItem("login");
  userLocal = userLocal ? JSON.parse(userLocal) : null;
  const userLog = userLocal?.login;
  const location = useLocation();
  const appbar = {
    flexwrap: "wrap",
  };
  const cartItemCount = useSelector(state => state.cartItemCount);
  return (
    <AppBar position="" sx={{ background: "#263238" }} style={appbar}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo */}
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            gap={2}
          >
            <img src={logo} style={{ width: "5em" }} alt="Logo" />
            <Typography
              variant="h4"
              sx={{
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
              }}
            >
              Arcade World
            </Typography>
            {location.pathname === "/store" && <Search />}
          </Box>
          {/* Links */}
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            gap={5}
            sx={{ flexGrow: 1 }}
          >
            <NavLink style={{ fontSize: "1.5em", color: "white" }} to="/">
              Home
            </NavLink>
            <NavLink style={{ fontSize: "1.5em", color: "white" }} to="/store">
              Store
            </NavLink>
            <NavLink style={{ fontSize: "1.5em", color: "white" }} to="/about">
              About
            </NavLink>
          </Box>
          {/* Cart, Login and avatar */}
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            gap={2}
          >
            {location.pathname !== "/auth" && (
              <>
                <div style={{ position: 'relative' }}>
                <Link to="/cart">
                  <ShoppingCartIcon sx={{ color: "#f1f1f1" }} />
                  {cartItemCount > 0 && (
                      <div style={{ position: 'absolute', top: -12, right: 20, background: 'red', 
                      borderRadius: '50%', padding: '8px', color: 'white',width:'8px', height:'8px', margin:'2px', display: 'flex', alignItems: 'center',fontSize:'14px' }}>
                     {cartItemCount}
                   </div>
                   )}
                </Link>
                </div>
                {userLog && (
                  <Link to="/user/profile">
                    <Avatar alt="Remy Sharp" src={userLocal?.user?.image} />
                  </Link>
                )}
                {location.pathname !== "/user/profile" && !userLocal?.login && (
                  <Link to="/auth">
                    <Button variant="soft">Login</Button>
                  </Link>
                )}
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;