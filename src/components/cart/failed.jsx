import { NavLink } from 'react-router-dom';
import { Card, Button, } from "@mui/material";

function Failed() {

  return (
    <div>
      <Card
          sx={{
            width: "80vw",
            height: "70vh",
            backgroundColor: "#eddcb9",
            boxShadow: "1px 1px 8px 1px black",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            margin: "16px",
            marginLeft: "120px"
          }}
        >
         <h2>Payment error</h2>
         <p>
         Sorry, there was a problem processing your payment. Please try
         again.
         </p>
        <NavLink to='/store'>
          <Button variant="contained" >
            Discover Products
        </Button>
       </NavLink>
    </Card> 
      
    </div>
  )
}

export default Failed