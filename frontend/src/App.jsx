import React, { useState } from "react";
import "./App.css";
import { useRoutes } from "react-router-dom";
import routes from "./router";
import "./style/reset.css";
import "./style/fonts.css";
import "./style/helpers.css";
import "./style/variables.css";
import "./style/defaults.css";
import AuthContext from "./Context/AuthContext";
function App() {
  const [token, setToken] = useState(null);
  const [userInfo, setUserINfo] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const login = (userInfo, token) => {
    setToken(token);
    setUserINfo(userInfo);
    setIsLoggedIn(true);
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
