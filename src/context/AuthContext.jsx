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

  const loginWithGoogle = () => {
    const googleProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleProvider);
  };
 
  const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {
      // Actualizar el estado solo si el usuario cambia
      setUser({
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
    // console.log(user);
    localStorage.setItem('login', JSON.stringify(user)) 
  });
  useEffect(() => {
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