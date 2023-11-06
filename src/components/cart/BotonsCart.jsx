
import { useDispatch } from "react-redux";
import CardContent from "@mui/material/CardContent";
import Fab from "@mui/material/Fab";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteItem } from "../../redux/actions.js"
import PropTypes from "prop-types";

const BotonsCart = ({element}) => {
 const gameId = element.id;
      
  const dispatch = useDispatch();
        
    const handleRemoveCart = ()=> {
    dispatch(deleteItem(gameId)); 
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
             <DeleteIcon/>
          </Fab>
         </CardContent>
     
    </div>
  );
}
BotonsCart.propTypes = {
  element: PropTypes.object.isRequired,
};

export default BotonsCart;
