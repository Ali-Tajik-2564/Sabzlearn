import React, { useState } from "react";
import "./App.css";
import { useRoutes } from "react-router-dom";
import routes from "./router";
import "./style/reset.css";
import "./style/fonts.css";
import "./style/helpers.css";
import "./style/variables.css";
import "./style/defaults.css";
import AuthContext from "./Context/authContext";
function App() {
  const [token, setToken] = useState(nul);
  const [userInfo, setUserINfo] = useState(nul);
  const [isLoggedIn, setIsLoggedIn] = useState(nul);
  const login = (token) => {
    setToken(token);
    localStorage.setItem("user", JSON.stringify(token));
  };
  const logout = () => {
    setToken(null);
    setUserINfo(null);
    localStorage.removeItem("user");
  };
  const router = useRoutes(routes);
  return (
    <AuthContext.Provider
      value={{
        token,
        userInfo,
        login,
        logout,
        isLoggedIn,
      }}>
      {router}
    </AuthContext.Provider>
  );
}

export default App;
