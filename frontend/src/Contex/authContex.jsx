import { createContext } from "react";
const AuthContext = createContext({
  token: null,
  isLoggedIn: false,
  userInfos: null,
  login: () => {},
  logout: () => {},
});
export default AuthContext;
