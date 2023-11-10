import axios from "axios";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import CreditCardIcon from '@mui/icons-material/CreditCard';


export default function Purchased() {

  const UserId = useSelector( s => s.userData?.user.id);
  const shoppingCart = useSelector ( s => s.shoppingCart);
 
  const handleOnclickcarrito = async () => {
    try {
      const videogameIds = shoppingCart.map((game) => game.id);
  
      const response = await axios.post('http://localhost:3001/cart/purchased', {UserId , GamesIds: videogameIds})
      const url = response.data.session_url
      window.location.href = url;
      localStorage.setItem("gameIds", JSON.stringify(videogameIds));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Button
        variant="contained"
        color="success"
        sx={{
          minWidth: "100%",
          marginLeft:'10px'
        }}
        onClick={handleOnclickcarrito}
        endIcon={<CreditCardIcon/>}
      >
        Pay Now
      </Button>
    </div>
  );
}
