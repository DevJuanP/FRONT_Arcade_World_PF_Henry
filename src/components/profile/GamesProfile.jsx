import React, {useEffect} from "react"; 
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {  Grid, CardContent } from "@mui/material";
import { useDispatch } from "react-redux";
import {
  UserById
} from "../../redux/actions";
import { useSelector } from "react-redux";

const GamesProfile = ({ userLocal }) => {
  const userID = useSelector((state) => state.userID);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(UserById(userLocal?.user?.id || userLocal?.user?.uid))
  }, [])

  return (
    <Grid container columnSpacing={3} rowSpacing={3} mb={2}>
      {userID?.purchased.map((elemento, key) => (
        <React.Fragment>
          {elemento?.Videogames?.map((gameBuy) => (
            <Grid item xs>
              <Card
                sx={{
                  width: "300px",
                  height:'420px'
                }}
              >
                <CardMedia
                  component="img"
                  height="300px"
                  image={gameBuy.image}
                  alt="name"
                />
                <CardContent>
                  <Typography variant="h5" component="div">
                    {gameBuy.name}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </React.Fragment>
      ))}
    </Grid>
  );
};

export default GamesProfile;
