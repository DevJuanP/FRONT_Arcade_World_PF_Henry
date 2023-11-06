import { CardContent, Typography, Card, CardMedia } from "@mui/material";
import { Link } from "react-router-dom";
import style from "./cart.module.css";
import BotonsCart from "./botonsCart.jsx";
import PropTypes from "prop-types";

const CartCard = ({ element }) => {
  return (
    <div>
      <section>
        <Card
          sx={{
            width: "750px",
            height: "200px",
            backgroundColor: "#eddcb9",
            boxShadow: "1px 1px 3px 1px black",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <CardMedia
            component="img"
            image={element.image}
            alt="imagen"
            sx={{
              backgroundColor: "#e4cfa5",
              height: "170px",
              width: "170px",
              borderRadius: "6px",
            }}
          />
          <Link className={style.link} to={`/detail/${element.id}`}>
            <CardContent
              sx={{
                height: 20,
                display: "flex",
              }}
            >
              <Typography
                variant="h1"
                component="div"
                sx={{
                  fontSize: 20,
                  fontWeight: "bold",
                  fontFamily: "Roboto Mono, monospace",
                }}
              >
                {element.name}
              </Typography>
              
            </CardContent>
          </Link>

          <CardContent sx={{ height: 40 }}>
            <Typography variant="body1" component="div" sx={{ fontSize: 25 }}>
              ${element.price}
            </Typography>
          </CardContent>
         
        <CardContent
            sx={{
              height: 50,
              width: 35,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
             }}
          >
            <BotonsCart element={element} />
          </CardContent>
        </Card>
      </section>
    </div>
  );
};
CartCard.propTypes= {
  element: PropTypes.object.isRequired,
}
export default CartCard;
