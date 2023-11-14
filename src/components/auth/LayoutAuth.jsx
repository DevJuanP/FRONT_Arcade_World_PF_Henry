import { Button, Stack, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

function LayoutAuth({ children }) {
  let userLocal = localStorage.getItem("login");

  return (
    <>
      {userLocal ? (
        <div>
            { children }
        </div>
      ) : (
        <Stack height="77vh" justifyContent="center" alignItems="center">
          <Typography>No tienes acceso a esta pagina</Typography>
          <Link to='/'>
          <Button variant="contained" color="info">Go Home</Button>
          </Link>
        </Stack>
      )}
    </>
  );
}
export default LayoutAuth;
