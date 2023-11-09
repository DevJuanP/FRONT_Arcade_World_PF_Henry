import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { Stack, Grid, Avatar, Box, CardContent } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LogoutIcon from "@mui/icons-material/Logout";
import CreateIcon from "@mui/icons-material/Create";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import { useDispatch } from "react-redux";

const FavoriteProfile = ({favorites}) => {
  return (
            <Grid container columnSpacing={3} rowSpacing={3}>
              {favorites?.map((favorite) => (
                <Grid item xs>
                  <Card
                    sx={{
                      width: "300px",
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="300px"
                      image={favorite.image}
                      alt="name"
                    />
                    <CardContent>
                      <Typography variant="h5" component="div">
                        {favorite.name}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
  );
};

export default FavoriteProfile;
