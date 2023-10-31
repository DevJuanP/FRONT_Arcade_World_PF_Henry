import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { postLogin, setAuthenticated, setUserData } from "../../redux/actions";
import Swal from "sweetalert2";
import { useAuth0 } from "@auth0/auth0-react";
import "./auth.css";

const Login = () => {
  const { loginWithRedirect } = useAuth0();
  //para uso del form
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm();
  //para uso de redux
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = handleSubmit((data) => {
    dispatch(postLogin(data)).then((response) => {
      if (response.data.login === false) {
        Swal.fire({
          position: "top-center",
          icon: "error",
          title: "Sorry",
          showConfirmButton: false,
          timer: 1500,
        });
        console.log("negativo");
      } else {
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
          title: "Signed in successfully",
        });
          //permanencia de usuario
          localStorage.setItem("login", JSON.stringify(response.data));
          //Autenticación para pasar al profile
          dispatch(setAuthenticated(true));
          //Toma de datos para pasarlos al profile
          dispatch(setUserData(response.data));
          //Migración al profile
          navigate("/user/profile");
      }
    });
    reset(); //limpiamos campos luego de mandar la data
  });
  return (
    <div>
      <div className="inputBox">
        <div className="titleBox">
          <p className="LoginTitle">Sign in to Arcade World</p>
        </div>
        <div>
          <button className="btnAuth0" onClick={() => loginWithRedirect()}>
            <img
              className="googleIcon"
              src="https://img.icons8.com/color/48/google-logo.png"
              alt="google-logo"
            />
            Continue with Google
          </button>
        </div>
        <p>or</p>
        <form onSubmit={onSubmit}>
          <div>
            <input
              type="text"
              name="nick_email"
              className="loginInput"
              placeholder="Email o Username"
              {...register("nick_email", {
                required: {
                  value: true,
                  message: "User o Email required",
                },
                maxLength: 20,
                minLength: 3,
              })}
            />
            {errors.name?.type === "required" && (
              <span className="error">Name is required</span>
            )}
            {errors.name?.type === "maxLength" && (
              <span className="error">Name is To logn</span>
            )}
            {errors.name?.type === "minLength" && (
              <span className="error">Name is to short</span>
            )}
          </div>

          <div>
            <input
              type="password"
              className="loginInput"
              placeholder="Password"
              {...register("password", {
                required: {
                  value: true,
                  message: "Password is required",
                },
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
            />
            {errors.password && (
              <p className="error">{errors.password.message}</p>
            )}
          </div>

          <button type="submit" className="btnLogin" disabled={!isDirty}>
            Log in
          </button>
        </form>
      </div>
    </div>
  );
};
export default Login;
