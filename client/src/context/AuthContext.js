import { createContext, useContext, useEffect, useState } from "react";
import axiosClient from "../lib/apiClient";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(undefined);

  const getAuth = async () => {
    try {
      const authValue = await axiosClient.get("/isUserLoggedIn", {
        withCredentials: true,
      });

      return setAuth(authValue.data);
    } catch (error) {
      console.log("No luck with context");
    }
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, getAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
