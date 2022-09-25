import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [loggedIn, setLoggedIn] = useState(user);

  const login = (data) => {
    localStorage.setItem("user", JSON.stringify({ data, id: data.sub }));
    setLoggedIn(true);
  };

  const logout = () => {
    // remove user data from local storage
    localStorage.removeItem("user");
    setLoggedIn(false);
  };

  const value = {
    loggedIn,
    login,
    logout,
    user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
