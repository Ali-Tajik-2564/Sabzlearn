import React, { useCallback, useEffect, useState } from "react";
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
  const router = useRoutes(routes);
  const [token, setToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  const login = (userInfo, token) => {
    setToken(token);
    setUserInfo(userInfo);
    setIsLoggedIn(true);
    localStorage.setItem("user", JSON.stringify(token));
  }
  const logout = useCallback(() => {
    setToken(null);
    setUserInfo(null);
    localStorage.removeItem("user");
  }, []);
  useEffect(() => {
    const localStorageData = JSON.parse(localStorage.getItem("user"));
    console.log("localStorageDate", localStorageData);
    if (localStorageData) {
      fetch("http://localhost:4000/v1/auth/me", {
        headers: {
          Authorization: `Bearer ${localStorageData}`,
        },
      })
        .then((res) => res.json())
        .then((userData) => {
          setIsLoggedIn(true);
          setUserInfo(userData);
          console.log(isLoggedIn);
        });
    }
  }, [login]);
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
