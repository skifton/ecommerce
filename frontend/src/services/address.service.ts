import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import queryClient from "../constants/query-client";

const getAddressList = async () => {
  return axios
    .get(`http://localhost:3001/address`)
    .then((response) => response.data);
};

const getUsersAddressList = async (user_id: string) => {
  return axios
    .get(`http://localhost:3001/address/${user_id}`)
    .then((response) => response.data);
};

const createAddress = async (address: any) => {
  return await axios
    .post("http://localhost:3001/address", address)
    .then((response) => response.data);
};

const updateAddress = async (address_id: string, params: any) => {
  return axios
    .put(`http://localhost:3001/categories/${address_id}`, params)
    .then((response) => response.data);
};

const deleteAddress = async (address_id: string) => {
  return axios
    .delete(`http://localhost:3001/categories/${address_id}`)
    .then((response) => response.data);
};

const useGetAddressList = () => {
  const {
    isLoading,
    error,
    data: addresses,
  } = useQuery(["address"], () => getAddressList());

  return {
    isLoading,
    error,
    addresses,
  };
};

const useGetUsersAddressList = (user_id: string) => {
  const {
    isLoading,
    error,
    data: addresses,
  } = useQuery(["address", user_id], () => getUsersAddressList(user_id));

  return {
    isLoading,
    error,
    addresses,
  };
};

const useCreateAddress = (
  onSuccess?: (createdAddress: any) => any,
  onError?: (error: any) => any
) => {
  return useMutation(
    (newAddress: any) => {
      return createAddress(newAddress);
    },
    {
      onSuccess: (createdAddress) => {
        if (queryClient.getQueryData(["address"])) {
          queryClient.setQueryData(["address"], (cachedAddressList?: any) => {
            if (!cachedAddressList) return;

            return [...cachedAddressList, createdAddress];
          });
        }
        if (onSuccess) onSuccess(createdAddress);
      },
      onError: (error: any) => {
        if (onError) onError(error);
      },
    }
  );
};

const useUpdateAddress = (
  onSuccess?: (updatedAddress: any) => any,
  onError?: () => any
) => {
  return useMutation(
    ({ address_id, params }: { address_id: string; params: any }) => {
      return updateAddress(address_id, params);
    },
    {
      onSuccess: (updatedAddress) => {
        if (queryClient.getQueryData(["address"])) {
          queryClient.setQueryData(["address"], (cachedAddressList?: any) => {
            if (!cachedAddressList) return;

            return [...cachedAddressList, updatedAddress];
          });
        }
        if (onSuccess) onSuccess(updatedAddress);
      },
      onError: () => {
        if (onError) onError();
      },
    }
  );
};

const useDeleteAddress = (onSuccess?: () => any, onError?: () => any) => {
  return useMutation(
    (address_id: string) => {
      return deleteAddress(address_id);
    },
    {
      onSuccess: (address_id) => {
        queryClient.removeQueries(["address", address_id], { exact: true });

        if (queryClient.getQueryData(["address"])) {
          queryClient.setQueryData(["address"], (cachedAddressList?: any) => {
            return cachedAddressList?.filter(
              (address: any) => address.id !== address_id
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

export {
  useGetAddressList,
  useGetUsersAddressList,
  useCreateAddress,
  useUpdateAddress,
  useDeleteAddress,
};
