import React from "react";
import { Navigate } from "react-router-dom";

import AuthContext from "../context/AuthContext";

interface IProps {
    children: React.ReactNode;
}
export const PrivateRoute: React.FC<IProps> = ({children}) => {
  const context = React.useContext(AuthContext);
  if(context?.user?.role === "User") { return <Navigate to="/" /> } else {return <>{children}</>}

}