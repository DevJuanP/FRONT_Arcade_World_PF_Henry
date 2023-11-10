import { createContext, useContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  // sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../firebase/config";
import axios from "axios";

const authContext = createContext();

export const useAuth = () => {
  const context = useContext(authContext);
  if (!context) throw new Error("There is no Auth provider");
  return context;
};

export function AuthProvider({ children }) {
  const [userF, setUserF] = useState("");
  const googleProvider = new GoogleAuthProvider();

  const loginWithGoogle = async () => {
    try {
    const result = await signInWithPopup(auth, googleProvider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (credential) {
        onAuthStateChanged(auth, async (user) => {
          if (user) {
            const token = user.accessToken;
              const response = await axios.post('http://localhost:3001/user/firebase', {
                token: token
              });
              setUserF(response.data);
            }
          });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
  };
  localStorage.setItem("login", JSON.stringify(userF));
  return (
    <authContext.Provider
      value={{
        loginWithGoogle,
        // resetPassword,
      }}
    >
      {children}
    </authContext.Provider>
  );
}
