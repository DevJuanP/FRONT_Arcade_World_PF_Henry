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
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
<<<<<<< HEAD
import UploadImage from '../upload/UploadImage'
import { useSelector, useDispatch } from "react-redux";
import { selectedCountry, getCountry }from "../../redux/actions";
=======
import UploadImage from "../upload/UploadImage";
import axios from "axios";
import useImage from "../utils/useImage";
import { putProfile } from "../../redux/actions";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import "./editProfile.css";
>>>>>>> 0b737829f9536fa7dad429c03e838a50c347a023


const EditProfile = ({ id, handleChangeRenderProfileEdit, setChanges }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [image, setImage] = useState("");
  const [cover, setCover] = useState("");
  const { uploadImage } = useImage(setImage);
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
    reset,
  } = useForm();

  const onSubmit = handleSubmit((data) => {
    data.id = id;
    data.image = image;
    data.coverImage = cover;
    dispatch(putProfile(data)).then(() => {
      setChanges(Math.random());
      const Toast = Swal.mixin({
        toast: true,
        position: "bottom",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });
      Toast.fire({
        icon: "success",
        title: "User Updated",
      });
      handleChangeRenderProfileEdit();
    });
  });

<<<<<<< HEAD
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
=======
>>>>>>> 0b737829f9536fa7dad429c03e838a50c347a023
  return (
    <Grid item sx={{ width: "100%", textAlign: "center" }}>
      <Stack sx={{ marginBottom: "10px", marginLeft: "45px" }}>
        <Avatar
          sx={{ width: 250, height: 250, opacity: 0.6 }}
          src={image ?? ""}
          alt="Profile image"
        />
      </Stack>
      <Stack marginBottom="-20px">
        <Stack
          sx={{
            display: "flex",
            textAlign: "left",
            marginLeft: "12px",
            marginBottom: "-8px",
          }}
        >
        </Stack>
        <Stack
          sx={{
            alignItems: "center",
            marginTop: "5px",
          }}
        >
        <input
          className="file-selectProfile"
          id="exampleFile"
          name="file"
          type="file"
          onChange={uploadImage}
        />
      </Stack>
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
      {errors?.name?.type === "maxLength" && (
        <Typography marginTop="-25px" variant="overline" color="red">
          Name is To long
        </Typography>
      )}
      {errors?.name?.type === "minLength" && (
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
      {errors?.lastname?.type === "maxLength" && (
        <Typography marginTop="-25px" variant="overline" color="red">
          Last name is To long
        </Typography>
      )}
      {errors?.lastname?.type === "minLength" && (
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
        <Stack
          sx={{
            display: "flex",
            textAlign: "left",
            marginLeft: "12px",
            marginBottom: "5px",
          }}
        >
        <Typography variant="overline" color='GrayText' mb='-10px'>Select your new front page image</Typography>
        <UploadImage image={cover} setImage={setCover}/>
      </Stack>
      <Button
        variant="contained"
        color="success"
        endIcon={<SaveAltIcon />}
        sx={{ width: "320px" }}
        onClick={onSubmit}
        disabled={!isDirty || !isValid}
      >
        Save Changes
      </Button>
    </Grid>
  );
};

export default EditProfile;
