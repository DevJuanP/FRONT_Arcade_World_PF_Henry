import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  CardContent,
  Typography,
  Button,
  Box,
  Stack,
  CardMedia,
  Avatar,
  Grid
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch, useSelector } from "react-redux";
import { purchaseSuccess } from '../../redux/actions.js';

const Summary = () => {
  const dispatch = useDispatch();
  const games = JSON.parse(localStorage.getItem("allGames"));
  const UserId = useSelector(s => s.userData?.user.id)
  const [products, setProducts] = useState([]);
  const amount = products.reduce((total, game) => total + game.price, 0)
  
  useEffect(() => {
    const videogameIds = JSON.parse(localStorage.getItem("gameIds"));
    const filteredGames = games.filter((gm) => videogameIds?.includes(gm.id));
    const payload = {
      UserId: UserId,
      amount: amount,
      GamesIds: videogameIds
  
    }
    setProducts(filteredGames);
    dispatch(purchaseSuccess(payload))

    return () => {
      localStorage.removeItem("gameIds");
    };
  }, []);

  return (
    <div
      style={{
        backgroundColor:'#1a2a3b',
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          backgroundColor: "#fff",
          borderRadius:'2% 0% 0% 2%',
          height: "80vh",
          width: "1100px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "right",
          alignItems: "left",
          marginTop: "18px",
          // gap: "10px",
          border:'4px solid #000',
          boxShadow: "1px 1px 3px 1px black",
          top: "0",
        }}
      >
        {products.map((game) => (
          <Stack
            sx={{
              display: "flex",
              alignItems: "center",
              alignContent: "center",
            }}
            key={game.id}
          >
            <CardContent
              sx={{
                marginLeft:'45px',
                width: "300px",
                display: "flex",
                textAlign: "center",
                alignItems: "center",
                flexDirection: "column",
                gap: "40px",
              }}
            >
              <Avatar
              src="https://res.cloudinary.com/du9kziyei/image/upload/v1699602012/images/g7oo7zdtcszck5kxmohu.png"
              sx={{backgroundColor:'#1a2a3b', width:'65px', height:'65px', marginTop:'-10px', marginBottom:'-25px'}}
              />
              <Typography variant="h4">Arcade World</Typography>
              <Typography variant="h5" color='GrayText'>Payment completed successfully</Typography>
              <Typography variant="body2">Products purchased:</Typography>
              <Typography variant="h6" component="div">
                {game.name}: $ {game.price}
              </Typography>
            </CardContent>
              <Stack style={{ display: "flex", alignItems: "center" }}>
                <Typography variant="h6" sx={{marginBottom:'80px'}}>
                  Total: ${amount}
                </Typography>
                    <Typography variant="caption">Thanks for your support</Typography>
              </Stack>
          </Stack>
        ))}
            <CardMedia
            sx={{marginLeft:'20px', marginRight:'-25px', marginTop:'-3px', border:'4px solid #000', borderRadius:'0% 2% 2% 0%'}}
            component="img"
            height="550px"
            width='350px'
            image="https://cdn.dribbble.com/users/330915/screenshots/3806532/media/a5b29f241eacaafa4c08a0dbad63b7e1.gif"
            alt="green iguana"
            />
          
        <Grid>
      </Grid>
      </Box>
      <Stack
        sx={{ display: "flex", alignContent: "center", alignItems: "center" }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "25px",
            marginBottom: "17px",
          }}
        >
          <NavLink to="/store">
            <Button variant="contained" endIcon={<SearchIcon/>}>Discover more products</Button>
          </NavLink>
        </div>
      </Stack>
    </div>
  );
};
export default Summary;
