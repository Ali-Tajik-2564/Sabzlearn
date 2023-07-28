import { createContext } from "react";
const AuthContext = createContext({
  token: null,
  isLoggedIn: false,
  userInfo: null,
  login: () => {},
  logout: () => {},
});
export default AuthContext;
