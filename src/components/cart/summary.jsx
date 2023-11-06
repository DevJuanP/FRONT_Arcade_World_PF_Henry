
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from "react";
import { Card, Button } from "@mui/material";
import { useSelect } from "@mui/base";

const Summary = () => {
  const games = useSelect((state)=> state.allGames);
  const [products, setProducts] = useState([]);

useEffect(() => {
    const videogameIds = JSON.parse(localStorage.getItem("videogameIds"));
    const filteredGames = games.filter((gm) =>
    videogameIds?.includes(gm.id));

    setProducts(filteredGames);

    return () => {localStorage.removeItem("videogameIds")};
    }, [games]);
       
  return (
    <div>
      <Card
          sx={{
            width: "80vw",
            height: "70vh",
            backgroundColor: "#eddcb9",
            boxShadow: "1px 1px 8px 1px blue",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            margin: "16px",
            marginLeft: "120px"
          }}
        >
         <h3>Payment successfully completed</h3>
         <h4>Products purchased:</h4>
         <ul>
            {products.map((game, i) => (
             <li key={i}>{game.name} - ${game.price}</li>
             ))}
          </ul>
      
          <p>Total: ${products.reduce((total, game) => total + game.price, 0)}</p> 
        
        <NavLink to='/store'>
          <Button variant="contained" >
            Discover Products
          </Button>
       </NavLink>
    </Card> 
    </div>
  );
};

export default Summary;
