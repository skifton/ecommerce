import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  IConfirmEmail,
  IRegistrationForm,
  IRegistrationResponse,
  IUser,
} from "../models/user-auth.model";
import { useCreateSession } from "./shopping-session.service";

const API_URL = "http://localhost:3001/";

const getUserList = async () => {
  return axios
    .get(`${API_URL}users`)
    .then((response) => response.data as IUser[]);
};

const createUser = async (newUser: IRegistrationForm) => {
  const registerData = {
    name: newUser.name,
    surname: newUser.surname,
    email: newUser.email,
    password: newUser.password,
  };
  return axios
    .post(`${API_URL}users`, registerData)
    .then((response) => response.data);
};

const updateConfirmEmail = async (data: IConfirmEmail) => {
  return axios
    .post(`${API_URL}confirmation`, data)
    .then((response) => response.data);
};

export const useGetUserList = () => {
  const {
    isLoading,
    error,
    data: users,
  } = useQuery(["users"], () => getUserList());

  return {
    isLoading,
    error,
    users,
  };
};


export const useCreateUser = (
  onSuccess?: (data: IRegistrationResponse) => any,
  onError?: (error: any) => any
) => {
  const { mutate: createSession } = useCreateSession();
  return useMutation(
    (values: IRegistrationForm) => {
      return createUser(values);
    },
    {
      onSuccess: (data: IRegistrationResponse) => {
        if (onSuccess) {
          createSession(data.id);
          onSuccess(data)
        };
      },
      onError: (error: any) => {
        if (onError) onError(error);
      },
    }
  );
};

export const useUpdateConfirmEmail = (
  onSuccess?: () => any,
  onError?: (error: any) => any
) => {
  return useMutation(
    (values: IConfirmEmail) => {
      return updateConfirmEmail(values);
    },
    {
      onSuccess: () => {
        if (onSuccess) onSuccess();
      },
      onError: (error: any) => {
        if (onError) onError(error);
      },
    }
  );
};
