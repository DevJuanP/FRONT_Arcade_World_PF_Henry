import axios from "axios";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import CreditCardIcon from '@mui/icons-material/CreditCard';
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
const { VITE_IS_LOCAL }= import.meta.env
const URL_DEPLOY = 'https://back-arcade-world-pf-henry.onrender.com';
const urlLocal = 'http://localhost:3001';
const BD_URL =  VITE_IS_LOCAL === 'true' ? urlLocal : URL_DEPLOY


export default function Purchased() {

  const UserId = useSelector( s => s.userData?.user.id);
  const shoppingCart = useSelector ( s => s.shoppingCart);
  const navigate = useNavigate();
  let userLocalPay = localStorage.getItem("login");
  userLocalPay = userLocalPay ? JSON.parse(userLocalPay) : null;
 
  const handleOnclickcarrito = async () => {
    if (userLocalPay === null || userLocalPay === "")  {
      Swal.fire({
        toast: true,
        icon: "info",
        title: "You must be logged in to purchase",
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
  
      const response = await axios.post(`${BD_URL}/cart/purchased`, {UserId: UserId, GamesIds: videogameIds})
      const url = response.data.session_url
      const amount = response.data.amount
      localStorage.setItem("gameIds", JSON.stringify(videogameIds));
      localStorage.setItem("amount", `${amount}`);
      localStorage.setItem("UserId", UserId);
      window.location.href = url;
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