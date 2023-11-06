import axios from "axios";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";


export default function Purchased() {

  const UserId = useSelector( s => s.userData);
  const shoppingCart = useSelector ( s => s.shoppingCart);
  const navigate = useNavigate();
  let userLocalPay = localStorage.getItem("login");
  userLocalPay = userLocalPay ? JSON.parse(userLocalPay) : null;
  
 
  const handleOnclickcarrito = async () => {
    if (userLocalPay === null || userLocalPay === "")  {
      Swal.fire({
        toast: true,
        icon: "info",
        title: "You must be logged in to continue with the purchase",
        showConfirmButton: true,
        position: "center",
        confirmButtonText: "Login",
      }).then((willRedirect) => {
        if (willRedirect) {
            navigate("/auth");
        }
      });
    } else {
            
      try {
        const videogameIds = shoppingCart.map((game) => game.id);
        
        const response = await axios.post('http://localhost:3001/cart/purchased', {UserId:UserId , GamesIds: videogameIds})
        const url = response.data.session_url
        window.location.href = url;
        localStorage.setItem("gameIds", JSON.stringify(videogameIds));
      } catch (error) {
        console.log(error);
      }
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
