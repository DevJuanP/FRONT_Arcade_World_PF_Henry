import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { Stack, Grid, Avatar, Box, CardContent } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import CreateIcon from "@mui/icons-material/Create";
import { styled } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import {
  deleteItem,
  removeFromFavorites,
  deleteItemCart,
} from "../../redux/actions";
import GamesProfile from "./GamesProfile";
import FavoriteProfile from "./FavoriteProfile";

const Profile = () => {
  const [rederFav, setRenderFav] = useState(false);
  const [renderBuy, setRenderBuy] = useState(true);

  const handleChangeRender = () => {
    setRenderFav((elemento) => !elemento);
    setRenderBuy((elemento) => !elemento);
  };
  const dispatch = useDispatch();

  const removeFav = (id) => {
    dispatch(removeFromFavorites(id));
  };
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
    if ((userLocal && !userLocal.login) || userLocal === null) {
      navigate("/");
    }
  }, []);
  const handleLogout = () => {
    if (userLocal) {
      userLocal.login = false;
      userLocal.user = null;
      console.log(userLocal);
      // localStorage.setItem('login', JSON.stringify(userLocal));
      localStorage.removeItem("login");
      dispatch(deleteItemCart(shoppingCart));
      navigate("/");
      userLocal = "";
    }
  };
  const uploadImageN = async (e) => {
    const files = e.target.files;
    const data = new FormData();

    data.append("file", files[0]);
    data.append("upload_preset", "JesusBavaresco"); // el segundo campo varia dependiendo del nombre que utilices
    setLoading(true);

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/du9kziyei/image/upload", // el url varia por cada usuario 'https://api.cloudinary.com/v1_1/tuUsuario/image/upload'
      {
        method: "POST",
        body: data,
      }
    );
    const file = await res.json();
    setImage(file.secure_url);
    setLoading(false);
  };
  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });
  return (
    <Box sx={{ minHeight: "100vh" }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={3}>
          <Card sx={{ width: "100%" }}>
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
              <Stack marginLeft="299px" marginTop="-15px" marginBottom="-20px">
                <Button
                  sx={{ backgroundColor: "transparent", color: "#000" }}
                  component="label"
                  variant="text"
                  startIcon={<CreateIcon />}
                  onChange={uploadImageN}
                >
                  <VisuallyHiddenInput type="file" />
                </Button>
              </Stack>
              <Avatar
                sx={{ width: 300, height: 300, marginTop: "4px" }}
                src={userLocal?.user?.photo}
                alt="Profile image"
              />
              <Typography variant="h5" component="div">
                Name: {userLocal?.user?.name}
              </Typography>
              <Typography variant="h5">
                Lastname: {userLocal?.user?.lastname}
              </Typography>
              <Typography variant="h5">
                Nickname: {userLocal?.user?.nickname}
              </Typography>
              <Typography variant="h5">
                Email: {userLocal?.user?.Email}
              </Typography>
            </Stack>
          </Card>
        </Grid>
        <Grid item xs={8} gridTemplateColumns='repeat(3, 1fr)' sx={{marginTop:'50px', marginLeft:'70px'}}>
        <Grid container columnSpacing={3} rowSpacing={3}>
        {renderBuy === true ? (
            <Stack >
              <Button
              sx={{marginBottom:'20px'}}
                color="primary"
                variant="contained"
                onClick={handleChangeRender}
              >
                Your games
              </Button>
            </Stack>
          ) : (
            <Stack>
              <Button
              sx={{marginBottom:'20px'}}
                color="primary"
                variant="contained"
                onClick={handleChangeRender}
              >
                Your favorites
              </Button>
            </Stack>
          )}
          {renderBuy === true ? (
            <FavoriteProfile favorites={favorites} />
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
