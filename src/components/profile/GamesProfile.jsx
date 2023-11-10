import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Stack, Grid, Avatar, Box, CardContent } from "@mui/material";

const GamesProfile = ({ nPurchased }) => {
  return (
    <Grid container columnSpacing={3} rowSpacing={3}>
      {nPurchased?.map((elemento) => (
        <React.Fragment>
          {elemento?.Videogames?.map((gameBuy) => (
            <Grid item xs>
              <Card
                sx={{
                  width: "300px",
                }}
              >
                <CardMedia
                  component="img"
                  height="300px"
                  image={gameBuy.image}
                  alt="name"
                />
                <CardContent>
                  <Typography variant="h5" component="div">
                    {gameBuy.name}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </React.Fragment>
      ))}
    </Grid>
  );
};

export default GamesProfile;
