import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import queryClient from "../constants/query-client";
import { IProduct } from "../models/product.model";

const getProduct = async (id: string) => {
  return axios.get(`http://localhost:3001/products/${id}`).then((response) => {
    return response.data as IProduct;
  });
};

const getSpecialCategoryProducts = async (name: string) => {
  return axios
    .get(`http://localhost:3001/products/category/${name}`)
    .then((response) => response.data as IProduct[]);
};

const getProductList = async () => {
  return axios
    .get("http://localhost:3001/products")
    .then((response) => response.data as IProduct[]);
};

const createProduct = async (Product: IProduct) => {
  return await axios
    .post("http://localhost:3001/products", Product)
    .then((response) => response.data as IProduct);
};

const updateProduct = async (id: string, params: any) => {
  return axios
    .put(`http://localhost:3001/products/${id}`, params)
    .then((response) => response.data as IProduct);
};

const deleteProduct = async (id: string) => {
  return axios
    .delete(`http://localhost:3001/products/${id}`)
    .then((response) => console.log(response));
};

const useGetProductList = () => {
  const {
    isLoading,
    error,
    data: products,
  } = useQuery(["products"], () => getProductList());

  return {
    isLoading,
    error,
    products,
  };
};

const useGetSpecialCategoryProducts = (name: string) => {
  const {
    isLoading,
    error,
    data: products,
  } = useQuery(["products", name], () => getSpecialCategoryProducts(name));
  return {
    isLoading,
    error,
    products,
  };
};

const useGetProductDetail = (id: string) => {
  const {
    isLoading,
    error,
    data: product,
  } = useQuery(["products", id], () => getProduct(id));
  return {
    isLoading,
    error,
    product,
  };
};

const useCreateProduct = (
  onSuccess?: (data: IProduct) => any,
  onError?: (error: any) => any
) => {
  return useMutation(
    (values: IProduct) => {
      return createProduct(values);
    },
    {
      onSuccess: (data) => {
        if (queryClient.getQueryData(["products"])) {
          queryClient.setQueryData(
            ["products"],
            (cachedProductList?: IProduct[]) => {
              if (!cachedProductList) return;

              return [...cachedProductList, data];
            }
          );
        }
        if (onSuccess) onSuccess(data);
      },
      onError: (error: any) => {
        if (onError) onError(error);
      },
    }
  );
};

const useUpdateProduct = (
  onSuccess?: (product: IProduct) => any,
  onError?: () => any
) => {
  return useMutation(
    ({ id, params }: { id: string; params: any }) => {
      return updateProduct(id, params);
    },
    {
      onSuccess: (product) => {
        if (queryClient.getQueryData(["products"])) {
          queryClient.setQueryData(
            ["products"],
            (cachedProductList?: IProduct[]) => {
              if (!cachedProductList) return;

              return [...cachedProductList, product];
            }
          );
        }
        if (onSuccess) onSuccess(product);
      },
      onError: () => {
        if (onError) onError();
      },
    }
  );
};

const useDeleteProduct = (onSuccess?: () => any, onError?: () => any) => {
  return useMutation(
    (id: string) => {
      return deleteProduct(id);
    },
    {
      onSuccess: (id) => {
        queryClient.removeQueries(["products", id], { exact: true });

        if (queryClient.getQueryData(["products"])) {
          queryClient.setQueryData(
            ["products"],
            (cachedProductList?: IProduct[]) => {
              return cachedProductList?.filter((product) => product.id !== id);
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

export {
  useGetProductList,
  useGetProductDetail,
  useCreateProduct,
  useUpdateProduct,
  useDeleteProduct,
  useGetSpecialCategoryProducts,
};
