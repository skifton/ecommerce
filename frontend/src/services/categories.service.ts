import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import queryClient from "../constants/query-client";
import { ICategories } from "../models/categories.model";

const getCategory = async (id: string) => {
  return axios
    .get(`http://localhost:3001/categories/${id}`)
    .then((response) => response.data as ICategories);
};

const getCategoryList = async () => {
  return axios
    .get("http://localhost:3001/categories")
    .then((response) => response.data as ICategories[]);
};

const createCategory = async (category: ICategories) => {
  return await axios
    .post("http://localhost:3001/categories", category)
    .then((response) => response.data as ICategories);
};

const updateCategory = async (id: number, params: any) => {
  return axios
    .put(`http://localhost:3001/categories/${id}`, params)
    .then((response) => response.data as ICategories);
};

const deleteCategory = async (id: number) => {
  return axios
    .delete(`http://localhost:3001/categories/${id}`)
    .then((response) => console.log(response));
};

const useGetCategoryList = () => {
  const {
    isLoading,
    error,
    data: categories,
  } = useQuery(["categories"], () => getCategoryList());

  return {
    isLoading,
    error,
    categories,
  };
};

const useGetCategoryDetail = (id: string) => {
  const {
    isLoading,
    error,
    data: category,
  } = useQuery(["categories", id], () => getCategory(id));

  return {
    isLoading,
    error,
    category,
  };
};

const useCreateCategory = (
  onSuccess?: (data: ICategories) => any,
  onError?: (error: any) => any
) => {
  return useMutation(
    (values: ICategories) => {
      return createCategory(values);
    },
    {
      onSuccess: (data) => {
        if (queryClient.getQueryData(["categories"])) {
          queryClient.setQueryData(
            ["categories"],
            (cachedCategoryList?: ICategories[]) => {
              if (!cachedCategoryList) return;

              return [...cachedCategoryList, data];
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

const useUpdateCategory = (
  onSuccess?: (category: ICategories) => any,
  onError?: () => any
) => {
  return useMutation(
    ({ id, params }: { id: number; params: any }) => {
      return updateCategory(id, params);
    },
    {
      onSuccess: (data) => {
        if (queryClient.getQueryData(["categories"])) {
          queryClient.setQueryData(
            ["categories"],
            (cachedCategoryList?: ICategories[]) => {
              if (!cachedCategoryList) return;

              return [...cachedCategoryList, data];
            }
          );
        }
        if (onSuccess) onSuccess(data);
      },
      onError: () => {
        if (onError) onError();
      },
    }
  );
};

const useDeleteCategory = (onSuccess?: () => any, onError?: () => any) => {
  return useMutation(
    (id: number) => {
      return deleteCategory(id);
    },
    {
      onSuccess: (id) => {
        queryClient.removeQueries(["categories", id], { exact: true });

        if (queryClient.getQueryData(["categories"])) {
          queryClient.setQueryData(
            ["Products"],
            (cachedCategoryList?: ICategories[]) => {
              return cachedCategoryList?.filter(
                (category) => category.id !== id
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

export {
  useGetCategoryList,
  useGetCategoryDetail,
  useCreateCategory,
  useUpdateCategory,
  useDeleteCategory,
};
