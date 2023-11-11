import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import {
  Stack,
  Grid,
  Avatar,
  Box,
  CardContent,
  IconButton,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import CreateIcon from "@mui/icons-material/Create";
import { styled } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import {
  deleteItem,
  deleteItemCart,
} from "../../redux/actions";
import GamesProfile from "./GamesProfile";
import FavoriteProfile from "./FavoriteProfile";
import EditProfile from "./editProfile";
import OnlyProfile from "./OnlyProfile";
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

const Profile = () => {
  const [rederFav, setRenderFav] = useState(false);
  const [renderBuy, setRenderBuy] = useState(true);

  const handleChangeRender = () => {
    setRenderFav((elemento) => !elemento);
    setRenderBuy((elemento) => !elemento);
  };

  const [renderEdit, setRenderEdit] = useState(false);
  const [renderProfile, setRenderProfile] = useState(true);

  const handleChangeRenderProfileEdit = () => {
    setRenderEdit((elemento) => !elemento);
    setRenderProfile((elemento) => !elemento);
  };
  const dispatch = useDispatch();

  
  const removeItemCart = (id) => {
    dispatch(deleteItem(id));
  };
  //llamada a favoritos
  const favorites = useSelector((state) => state.favorites);
  const shoppingCart = useSelector((state) => state.shoppingCart);
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  //parte del login
  let userLocal = localStorage.getItem("login");
  userLocal = userLocal ? JSON.parse(userLocal) : null;
  let nPurchased = userLocal?.user?.purchased;

  useEffect(() => {
    if ((userLocal === '' && !userLocal.login) || userLocal === null) {
      navigate("/");
    }
  }, []);
  const handleLogout = () => {
    if (userLocal) {
      userLocal.login = false;
      userLocal.user = null;
      dispatch(deleteItemCart(shoppingCart));
      navigate("/");
      localStorage.removeItem("login");
    }
  };
  return (
    <Box sx={{ minHeight: "100vh", backgroundColor:'#1a2a3b', marginTop:'20px' }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={3}>
          <Card sx={{ width: "100%", height:'125vh', marginLeft:'25px', marginTop:'30px', marginBottom:'20px'}}>
            <Stack direction="column" alignItems="center">
              <Stack marginRight="290px" marginBottom="-20px">
                <Button
                  size="large"
                  sx={{ color: "#000" }}
                  onClick={handleLogout}
                >
                  <LogoutIcon />
                </Button>
              </Stack>
              <Stack>
              <Stack sx={{display:'flex', alignItems:'flex-end', marginTop:'-20px', marginRight:'5px'}} >
                <IconButton
                  sx={{ backgroundColor: "transparent", color: "#000" }}
                  onClick={handleChangeRenderProfileEdit}
                >
                  {<CreateIcon userLocal={userLocal} />}
                </IconButton>
                </Stack>
                {renderProfile === true ? (
                  <OnlyProfile userLocal={userLocal} />
                ) : (
                  <EditProfile />
                )}
              </Stack>
            </Stack>
          </Card>
        </Grid>
        <Grid
          item
          xs={8}
          gridTemplateColumns="repeat(3, 1fr)"
          sx={{ marginTop: "50px", marginLeft: "70px" }}
        >
          <Grid container columnSpacing={3} rowSpacing={3} marginTop='-60px'>
            {renderBuy === true ? (
              <FormControlLabel
              control={
                <Switch
                  // sx={{ marginBottom: "20px" }}
                  onClick={handleChangeRender}
                />
              }
              label="Your Favorites" sx={{color: 'white'}}
              />
            ) : (
                <FormControlLabel
                control={
                  <Switch
                    defaultChecked
                    // sx={{ marginBottom: "20px" }}
                    onClick={handleChangeRender}
                  />
                }
                label="Your Games" sx={{color: 'white'}}
                />
            )}
            {renderBuy === true ? (
              <FavoriteProfile favorites={favorites}/>
            ) : (
              <GamesProfile nPurchased={nPurchased} />
            )}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
export default Profile;
