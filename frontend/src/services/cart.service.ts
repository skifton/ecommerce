import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import queryClient from "../constants/query-client";
import { ICartProduct } from "../models/product.model";

const getCartList = async (id: string) => {
  return axios
    .get(`http://localhost:3001/cart-item/${id}`)
    .then((response) => response.data as ICartProduct[]);
};

const addItemInCart = async (data: any) => {
  return await axios
    .post(`http://localhost:3001/cart-item`, data)
    .then((response) => response.data as ICartProduct);
};

const updateCartItem = async (id: string, params: any) => {
  return axios
    .put(`http://localhost:3001/cart-item/${id}`, params)
    .then((response) => response.data as ICartProduct);
};

const deleteCartItem = async (id: string) => {
  return axios
    .delete(`http://localhost:3001/cart-item/${id}`)
    .then((response) => response.data as ICartProduct);
};

const useGetCartList = (session_id: string) => {
  const {
    isLoading,
    error,
    data: cartItems,
  } = useQuery(["cart-item"], () => getCartList(session_id));

  return {
    isLoading,
    error,
    cartItems,
  };
};

const useAddItemInCart = (
  onSuccess?: (cartItem: ICartProduct) => any,
  onError?: (error: any) => any
) => {
  return useMutation(
    (data: ICartProduct) => {
      return addItemInCart(data);
    },
    {
      onSuccess: (cartItem) => {
        if (queryClient.getQueryData(["cart-item"])) {
          queryClient.setQueryData(
            ["cart-item"],
            (cachedCartList?: ICartProduct[]) => {
              if (!cachedCartList) return;

              return [...cachedCartList, cartItem];
            }
          );
        }
        if (onSuccess) onSuccess(cartItem);
      },
      onError: (error: any) => {
        if (onError) onError(error);
      },
    }
  );
};

const useUpdateCartItem = (
  onSuccess?: (cartItem: ICartProduct) => any,
  onError?: () => any
) => {
  return useMutation(
    ({ id, params }: { id: string; params: any }) => {
      return updateCartItem(id, params);
    },
    {
      onSuccess: (cartItem) => {
        if (queryClient.getQueryData(["cart-item"])) {
          queryClient.setQueryData(
            ["cart-item"],
            (cachedCartItemList?: ICartProduct[]) => {
              if (!cachedCartItemList) return;

              return [...cachedCartItemList, cartItem];
            }
          );
        }
        if (onSuccess) onSuccess(cartItem);
      },
      onError: () => {
        if (onError) onError();
      },
    }
  );
};

const useDeleteCartItem = (onSuccess?: () => any, onError?: () => any) => {
  return useMutation(
    (id: string) => {
      return deleteCartItem(id);
    },
    {
      onSuccess: (id) => {
        queryClient.removeQueries(["cart-item", id], { exact: true });

        if (queryClient.getQueryData(["cart-item"])) {
          queryClient.setQueryData(
            ["cart-item"],
            (cachedCartItemList?: ICartProduct[]) => {
              return cachedCartItemList?.filter(
                (session: any) => session.id !== id
              );
            }
          );
        }

        if (onSuccess) onSuccess();
      },
      onError: () => {
        if (onError) onError();
      },
    }
  );
};

export { useGetCartList, useAddItemInCart, useDeleteCartItem, useUpdateCartItem };
