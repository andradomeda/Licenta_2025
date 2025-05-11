// GlobalContext.js
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const GlobalContext = createContext();

export function GlobalProvider({ children }) {
  const [volunteer, setVolunteer] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);

  useEffect(() => {
    if (token) {
      axios
        .get("http://localhost:3000/volunteers/me", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(res => {
          setVolunteer(res.data);
          setIsAuthenticated(true);
        })
        .catch(err => {
          console.error("Token invalid sau expirat", err);
          logout();
        });
    }
  }, [token]);

  const login = (accessToken) => {
    setToken(accessToken);
    localStorage.setItem("token", accessToken);
  };

  const logout = () => {
    setToken(null);
    setVolunteer(null);
    setIsAuthenticated(false);
    localStorage.removeItem("token");
  };

  return (
    <GlobalContext.Provider value={{ volunteer, isAuthenticated, token, login, logout }}>
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobalContext() {
  return useContext(GlobalContext);
}
