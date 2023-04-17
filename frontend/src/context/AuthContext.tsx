import axios from "axios";
import React, { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useMutation } from "@tanstack/react-query";
import { IAuthToken, ILoginForm, IUser } from "../models/user-auth.model";

const AuthContext = createContext<{
  user: IUser | undefined;
  loginUser: any;
  logout: () => void;
} | null>(null);

export default AuthContext;

interface IProps {
  children: React.ReactNode;
}
export const AuthProvider: React.FC<IProps> = ({ children }) => {
  const [_authTokens, setAuthTokens] = useState<IAuthToken | null>(
    {
      accessToken: localStorage.getItem("accessToken"),
      refreshToken: localStorage.getItem("refreshToken"),
    } && null
  );
  const [expireToken, setExpireToken] = useState(0);
  const [user, setUser] = useState<IUser | undefined>(
    localStorage["accessToken"] && jwt_decode(localStorage["accessToken"])
  );

  useEffect(() => {
    if(user) refreshToken();
  }, []);

  const refreshToken = async () => {
    try {
      const response = await axios.get("http://localhost:3001/token");
      const decoded: any = jwt_decode(response.data.accessToken);
      setExpireToken(decoded?.exp);
    } catch (error: any) {
      if (error.response) {
        logout();
      }
    }
  };

  const axiosJWT = axios.create();

  axiosJWT.interceptors.request.use(
    async (config) => {
      const currentDate = new Date();
      if (expireToken * 1000 < currentDate.getTime()) {
        const response = await axios.get("http://localhost:5000/token");
        config.headers.Authorization = `Bearer ${response.data.accessToken}`;
        const decoded: any = jwt_decode(response.data.accessToken);
        setExpireToken(decoded?.exp);
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const loginUser = async (credentials: ILoginForm) => {
    return axios
      .post("http://localhost:3001/login", credentials)
      .then((response) => response.data);
  };


  const useLoginUser = (
    onSuccess?: (authTokens: IAuthToken) => any,
    onError?: (error: any) => any
  ) => {
    return useMutation(
      (values: ILoginForm) => {
        return loginUser(values);
      },
      {
        onSuccess: (authTokens: IAuthToken) => {
          const user = jwt_decode(authTokens.accessToken) as IUser;
          setAuthTokens(authTokens);
          setUser(user);
          localStorage.setItem("accessToken", authTokens.accessToken);
          localStorage.setItem("refreshToken", authTokens.refreshToken);
          if (onSuccess) onSuccess(authTokens);
        },
        onError: (error: any) => {
          if (onError) onError(error);
        },
      }
    );
  };

  const logout = () => {
    axios.delete("http://localhost:3001/logout").then((response) => {
      if (response.status === 200) {
        setAuthTokens(null);
        setUser(undefined);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      }
    });
  };
  const contextData = {
    user: user,
    loginUser: useLoginUser,
    logout: logout,
  };
  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
