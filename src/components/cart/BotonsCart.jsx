
import { useDispatch, useSelector } from "react-redux";
import CardContent from "@mui/material/CardContent";
import Fab from "@mui/material/Fab";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import { deleteItem } from "../../redux/actions.js"

const BotonsCart = () => {
 
  const shoppingCart = useSelector((state) => state.shoppingCart);
    
  const dispatch = useDispatch();
        
    
     let [index, setIndex] =useState(
      shoppingCart?.map((item) => item
    )
     );
    
     const handleRemoveCart = (id) => {
      const filtrado = index.filter((el) => el.id !== id);
      dispatch(deleteItem(filtrado));
      localStorage.setItem("cart", JSON.stringify(filtrado));
      setIndex(filtrado);
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
            onClick={()=>handleRemoveCart}
          >
            <DeleteIcon />
          </Fab>
         </CardContent>
      
    </div>
  );
}

export default BotonsCart;
