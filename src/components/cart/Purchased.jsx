import axios from "axios";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";


export default function Purchased() {

  const UserId = useSelector( s => s.userData)
  // let userLocalLogin = JSON.parse(localStorage.getItem("login"));
  // let UserEmail = userLocalLogin.user.Email;
  // console.log(UserId);
  const shoppingCart = useSelector ( s => s.shoppingCart)
 
  const handleOnclickcarrito = async () => {
    try {
      const videogameIds = shoppingCart.map((game) => game.id);
  
      const response = await axios.post('http://localhost:3001/cart/purchased', {UserId , GamesIds: videogameIds})
      const url = response.data.session_url
      window.location.href = url;
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Button
        variant="contained"
        color="success"
        fullWidth
        sx={{
          minWidth: "100%",
        }}
        onClick={handleOnclickcarrito}
      >
        Pay Now
      </Button>
    </div>
  );
}
