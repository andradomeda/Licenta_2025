// src/GlobalContext.js
import { createContext, useContext, useState } from "react";

// Creăm contextul
const GlobalContext = createContext();

// Provider-ul care va înconjura aplicația
export function GlobalProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // false = utilizatorul nu este logat

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <GlobalContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobalContext() {
  return useContext(GlobalContext);
}
