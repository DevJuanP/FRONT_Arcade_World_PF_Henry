import { useDispatch, useSelector } from "react-redux";
import CardContent from "@mui/material/CardContent";
import Fab from "@mui/material/Fab";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteItem } from "../../redux/actions.js";

const BotonsCart = ({shop}) => {
  const dispatch = useDispatch();
  // const shoppingCart = useSelector((state) => state.shoppingCart);
  // console.log(shop);
  const handleRemoveCart = () => {
    dispatch(deleteItem(shop));
    // localStorage.setItem("cart", JSON.stringify(shop));
  };

  return (
    <div>
      <CardContent
        sx={{
          height: 35,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <Fab
          style={{ backgroundColor: "#A5CAA8" }}
          size="medium"
          color="default"
          aria-label="add"
          onClick={handleRemoveCart}
        >
          <DeleteIcon />
        </Fab>
      </CardContent>
    </div>
  );
};

export default BotonsCart;
