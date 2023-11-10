import { createContext, useContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged
  // sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../firebase/config";

const authContext = createContext();

export const useAuth = () => {
  const context = useContext(authContext);
  if (!context) throw new Error("There is no Auth provider");
  return context;
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const loginWithGoogle = async () => {
    const googleProvider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, googleProvider);

    const credential = GoogleAuthProvider.credentialFromResult(result);
    if(credential){
      onAuthStateChanged(auth, user => console.log(user.accessToken))
    }
  };
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        // Actualizar el estado solo si el usuario cambia
        setUser({
          // token: currentUser.accessToken,
          login: true,
          user: {
            image: currentUser.photoURL,
            email: currentUser.email,
            name: currentUser.displayName.split(' ')[0],
            lastname: currentUser.displayName.split(' ')[1],
            nickname: currentUser.displayName,
            uid: currentUser.uid,
          },
        });
      } else {
        // Usuario no autenticado
        setUser(null);
        localStorage.removeItem("login");
      }
      localStorage.setItem("login", JSON.stringify(user));
    });
    return () => {
      unsubscribe();
    };
  }, []);

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