import { Grid, Avatar, Typography, Stack } from "@mui/material";
import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";

const onlyProfile = ({userLocal}) => {
  const navigate = useNavigate();
  useEffect(() => {
    if ((userLocal === '' && !userLocal.login) || userLocal === null) {
      navigate("/");
    }
  }, []);
  return (
    <Grid item sx={{ width: "100%", textAlign:'center'}}>
      <Avatar
        sx={{ width: 250, height: 250, marginBottom: "10px", marginLeft:'40px' }}
        src={userLocal?.user?.photo}
        alt="Profile image"
        />
       <Grid item sx={{textAlign:'left', marginLeft:'10px'}}>
      <Typography sx={{marginBottom:'20px'}} variant="h5" component="div">
        Name: {userLocal?.user?.name}
      </Typography>
      <Typography sx={{marginBottom:'20px'}} variant="h5">
        Lastname: {userLocal?.user?.lastname}
      </Typography>
      <Typography sx={{marginBottom:'20px'}} variant="h5">
        Nickname: {userLocal?.user?.nickname}
      </Typography>
      <Typography sx={{marginBottom:'20px'}} variant="h5">Email: {userLocal?.user?.Email}</Typography>
        </Grid> 
    </Grid>
  );
};

export default onlyProfile;
