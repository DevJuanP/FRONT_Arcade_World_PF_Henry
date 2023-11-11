import {
  Stack,
  Grid,
  Avatar,
  Box,
  CardContent,
  Card,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import { useForm } from "react-hook-form";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UploadImage from '../upload/UploadImage'
import { useSelector, useDispatch } from "react-redux";
import { selectedCountry, getCountry }from "../../redux/actions";

const EditProfile = ({ userLocal }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if ((userLocal === "" && !userLocal.login) || userLocal === null) {
      navigate("/");
    }
  }, []);
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
    reset,
  } = useForm();
  const uploadImageN = async (e) => {
    const files = e.target.files;
    const data = new FormData();

    data.append("file", files[0]);
    data.append("upload_preset", "JesusBavaresco"); // el segundo campo varia dependiendo del nombre que utilices
    setLoading(true);

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/du9kziyei/image/upload", // el url varia por cada usuario 'https://api.cloudinary.com/v1_1/tuUsuario/image/upload'
      {
        method: "POST",
        body: data,
      }
    );
    const file = await res.json();
    setImage(file.secure_url);
    setLoading(false);
    
  };
    const dispatch = useDispatch();
    let selectedCountry = useSelector((state) => state.selectedCountry);
    let allCountries = useSelector((state) => state.countries);
    console.log(selectedCountry); 
    let allCountriesArray = allCountries ? Object.values(allCountries) : [];

    useEffect(() => {
      dispatch(getCountry());
    }, [dispatch]);
  return (
    <Grid item sx={{ width: "100%", textAlign: "center"}}>
      <Stack sx={{ marginBottom: "10px", marginLeft: "45px" }}>
        <Avatar sx={{ width: 250, height: 250 }} src="" alt="Profile image" />
      </Stack>
      <Stack marginBottom='-20px'>
      <Stack sx={{display:'flex', textAlign:'left', marginLeft:'12px', marginBottom:'-8px'}}>
        <Typography variant='overline' color='GrayText'>change your profile image</Typography>
        </Stack>
        <UploadImage/>
      </Stack>
      <TextField
        sx={{ width: "320px", marginBottom: "10px" }}
        variant="outlined"
        type="text"
        name="name"
        label="Change your name"
        // onSubmit={onSubmit}
        {...register("name", {
          maxLength: 20,
          minLength: 3,
        })}
      />
      {errors.name?.type === "maxLength" && (
        <Typography marginTop="-25px" variant="overline" color="red">
          Name is To long
        </Typography>
      )}
      {errors.name?.type === "minLength" && (
        <Typography marginTop="-25px" variant="overline" color="red">
          Name is to short
        </Typography>
      )}
      <TextField
        sx={{ width: "320px", marginBottom: "10px" }}
        variant="outlined"
        type="text"
        name="lastname"
        label="Change your last Name"
        // onSubmit={onSubmit}
        {...register("lastname", {
          maxLength: 20,
          minLength: 3,
        })}
      />
      {errors.lastname?.type === "maxLength" && (
        <Typography marginTop="-25px" variant="overline" color="red">
          Last name is To long
        </Typography>
      )}
      {errors.lastname?.type === "minLength" && (
        <Typography marginTop="-25px" variant="overline" color="red">
          Last name is to short
        </Typography>
      )}
      <TextField
        sx={{ width: "320px", marginBottom: "10px" }}
        variant="outlined"
        type="text"
        name="nickname"
        label="Change your nick name"
        // onSubmit={onSubmit}
        {...register("nickname")}
      />
      <TextField
        sx={{ width: "320px", marginBottom: "10px" }}
        variant="outlined"
        select
        name="country"
        label="Choose your country"
        value={selectedCountry}
        onChange={(event) =>{console.log(event.target.value); dispatch(selectedCountry(event.target.value))}}
        {...register("country")}
      >
        {allCountriesArray.map((country) => (
          <MenuItem key={country} value={country}>
            {country}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        sx={{ width: "320px", marginBottom: "10px" }}
        variant="outlined"
        type="email"
        name="Email"
        label="Change your email"
        // onSubmit={onSubmit}
        {...register("Email", {
          pattern: {
            value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
            message: "Invalid Email",
          },
        })}
      />
      {errors?.Email && (
        <Typography marginTop="-25px" variant="overline" color="red">
          {errors.Email.message}
        </Typography>
      )}
      <Stack marginBottom='-20px'>
        <Stack sx={{display:'flex', textAlign:'left', marginLeft:'12px', marginBottom:'-8px'}}>
        <Typography variant='overline' color='GrayText'>Select your front Page image</Typography>
        </Stack>
        <UploadImage/>
      </Stack>
      <Button
        variant="contained"
        color="success"
        endIcon={<SaveAltIcon />}
        sx={{ width: "320px" }}
      >
        Save Changes
      </Button>
    </Grid>
  );
};

export default EditProfile;
