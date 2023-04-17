import React, { useState } from "react";
import EModal from "../../components/EModal";
import { yupResolver } from "@hookform/resolvers/yup";
import ProductsTable from "./ProductsTable";
import NewProductForm from "./NewProductForm";
import { useForm } from "react-hook-form";
import { useGetCategoryList } from "../../services/categories.service";
import {
  useCreateProduct,
  useDeleteProduct,
  useGetProductList,
} from "../../services/products.service";
import { IProduct } from "../../models/product.model";
import { ProductFormSchema } from "../../models/form-schema.model";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

const ProductsControl: React.FC = () => {
  const [isError, setIsError] = useState<string>("");
  const [isOpenNewProduct, setIsOpenNewProduct] = useState<boolean>(false);
  const { categories: categoryList } = useGetCategoryList();
  const { products: productList } = useGetProductList();
  const { mutate: deleteProduct } = useDeleteProduct();
  const { mutate: createProduct } = useCreateProduct(
    (data) => {
      console.log(data);
      setIsOpenNewProduct(false);
    },
    (error) => {
      console.log(error.response.data.error)
      setIsError(error.response.data.error);
    }
  );
  const useFormReturn = useForm<IProduct>({
    resolver: yupResolver(ProductFormSchema),
  });

  const onClickAddProductHandler = () => {
    setIsOpenNewProduct(true);
  };

  const onClickCloseModalHandler = () => {
    setIsOpenNewProduct(false);
  };

  const onAddNewProductClickHandler = (data: IProduct) => {
    console.log(data);
    createProduct(data);
    setIsOpenNewProduct(false);
  };

  const onClickDeleteHandler = (id: string) => {
    deleteProduct(id);
  };

  return (
    <div>
      <EModal
        title="Add new product"
        open={isOpenNewProduct}
        onCloseModal={onClickCloseModalHandler}
      >
        {isError !== "" && (
          <div className="flex rounded-md text-red-400 bg-red-200">
            <ExclamationCircleIcon className="w-7 h-7 text-red-400 m-2" />
            <p className="py-2">{isError}</p>
          </div>
        )}
        <NewProductForm
          categories={categoryList ? categoryList : []}
          onCloseModal={onClickCloseModalHandler}
          useFormInstance={useFormReturn}
          onSubmitForm={onAddNewProductClickHandler}
        />
      </EModal>
      <div className="px-4 mt-10 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold text-white leading-6 text-gray-900">
              Products
            </h1>
            <p className="mt-2 text-sm text-gray-400">
              A list of all the products in your shop including their name,
              description, and image.
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <button
              type="button"
              onClick={onClickAddProductHandler}
              className="block rounded-md bg-indigo-600 py-2 px-3 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add product
            </button>
          </div>
        </div>
        <div className="mt-8 flow-root">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 mt-6 ring-black ring-opacity-5 sm:rounded-lg">
                <ProductsTable
                  onDeleteClick={onClickDeleteHandler}
                  products={productList ? productList : []}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsControl;
