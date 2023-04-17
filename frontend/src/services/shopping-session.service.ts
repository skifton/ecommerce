import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import queryClient from "../constants/query-client";
import { ISession } from "../models/session.model";

const getSession = async (id: string) => {
  return axios
    .get(`http://localhost:3001/shopping-session/${id}`)
    .then((response) => response.data as ISession);
};

const createSession = async (id: string) => {
  return await axios
    .post(`http://localhost:3001/shopping-session/${id}`)
    .then((response) => response.data as ISession);
};

const updateSession = async (id: string, params: any) => {
  return axios
    .put(`http://localhost:3001/shopping-session/${id}`, params)
    .then((response) => response.data as ISession);
};

const deleteSession = async (id: string) => {
  return axios
    .delete(`http://localhost:3001/shopping-session/${id}`)
    .then((response) => response.data as ISession);
};

const useGetSession = (user_id: string) => {
  const {
    isLoading,
    error,
    data: session,
  } = useQuery(["session"], () => getSession(user_id));
  return {
    isLoading,
    error,
    session,
  };
};

const useCreateSession = (
  onSuccess?: (session: ISession) => any,
  onError?: (error: any) => any
) => {
  return useMutation(
    (id: string) => {
      return createSession(id);
    },
    {
      onSuccess: (session) => {
        if (queryClient.getQueryData(["session"])) {
          queryClient.setQueryData(["session"], () => {
            return session;
          });
        }
        if (onSuccess) onSuccess(session);
      },
      onError: (error: any) => {
        if (onError) onError(error);
      },
    }
  );
};

const useUpdateSession = (
  onSuccess?: (session: ISession) => any,
  onError?: () => any
) => {
  return useMutation(
    ({ id, params }: { id: string; params: any }) => {
      return updateSession(id, params);
    },
    {
      onSuccess: (session) => {
        if (queryClient.getQueryData(["session"])) {
          queryClient.setQueryData(["session"], () => {

            return session;
          });
        }
        if (onSuccess) onSuccess(session);
      },
      onError: () => {
        if (onError) onError();
      },
    }
  );
};

const useDeleteSession = (onSuccess?: () => any, onError?: () => any) => {
  return useMutation(
    (id: string) => {
      return deleteSession(id);
    },
    {
      onSuccess: (id) => {
        queryClient.removeQueries(["session", id], { exact: true });

        if (queryClient.getQueryData(["session"])) {
          queryClient.setQueryData(["session"], (cachedSessionList?: ISession[]) => {
            return cachedSessionList?.filter(
              (session: any) => session.id !== id
            );
          });
        }

        if (onSuccess) onSuccess();
      },
      onError: () => {
        if (onError) onError();
      },
    }
  );
};

export { useGetSession, useCreateSession, useUpdateSession, useDeleteSession };
