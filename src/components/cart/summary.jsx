import { NavLink } from 'react-router-dom';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { CardContent, Typography, Button, Box, Stack } from "@mui/material";
import { purchaseSuccess } from '../../redux/actions.js';


const Summary = () => {
  const UserId = useSelector( s => s.userData?.user?.id);
  const games = JSON.parse(localStorage.getItem("allGames"));
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const priceTotal = products.reduce((total, game) => total + game.price, 0).toFixed(2);
    
  useEffect(() => {
    const fetchData = async () => {
      try {
        const videogameIds = JSON.parse(localStorage.getItem("gameIds"));
        const filteredGames = games.filter((gm) =>
        videogameIds?.includes(gm.id));
        const payload = {
          UserId,
          GamesIds: videogameIds, 
          amount: priceTotal,
        }
        setProducts(filteredGames);
        dispatch(purchaseSuccess(payload));
    
        return () => {localStorage.removeItem("gameIds"); localStorage.removeItem("login")};
        
      } catch (error) {
        console.error('Error durante la compra:', error);
      }
  }
  fetchData(); 
    }, []);
       
  return (
    <div style={{ display: "flex",
    flexDirection: "column", alignItems:'center' }}>
      <h2 >Pago completado con éxito</h2>
      <h3>Productos comprados:</h3>
      <Box
              sx={{
                backgroundColor: "#fff",
                height: "40vh",
                width: "60vw",
                borderRadius: "6px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems:'left',
                marginTop:'18px',
                gap: "10px",
                boxShadow: "1px 1px 3px 1px black",
                paddingLeft:"35px",
                top: "0",
              }}
            >
        {products.map((game) => (
          <Stack sx={{display:'flex', alignItems:'center', alignContent:'center'}} key={game.id}>
             <CardContent 
               sx={{
                width: "400px",
                display: "flex",
                alignItems: "left",
                flexDirection: "column",
                gap: "40px",
              }}>
                <Typography variant="h6" component="div">
                   {game.name}: $ {game.price.toFixed(2)}
                </Typography>
             </CardContent>
             </Stack>
        ))}
        <Stack style={{ display: "flex", alignItems:'center'}}>
          <Typography variant="h6" component="div" >
            Total: ${priceTotal}
          </Typography>
        </Stack>
      </Box> 
      <Stack sx={{display:'flex', alignContent:'center', alignItems:'center'}}>
        <div style={{ display: "flex",
    flexDirection: "column", marginTop:'25px', marginBottom:'17px' }}>

          <NavLink to='/store'>
            <Button variant="contained" >
              Discover Products
            </Button>
          </NavLink>
        </div>
      </Stack> 
    
    </div>
  );
};

export default Summary;
