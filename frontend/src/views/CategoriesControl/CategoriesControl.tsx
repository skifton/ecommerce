import React, { useState } from "react";
import EModal from "../../components/EModal";
import { yupResolver } from "@hookform/resolvers/yup";
import { ICategories } from "../../models/categories.model";
import CategoriesTable from "./CategoriesTable";
import { useForm } from "react-hook-form";
import NewCategoryForm from "./NewCategoryForm";
import {
  useCreateCategory,
  useDeleteCategory,
  useGetCategoryList,
} from "../../services/categories.service";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { CategoryFormSchema } from "../../models/form-schema.model";

const CategoriesControl: React.FC = () => {
  const [isOpenNewCategories, setIsOpenNewCategories] =
    useState<boolean>(false);
  const [isError, setIsError] = useState<string>("");
  const [modalTitle, setModalTitle] = useState<string>("");
  const { categories: categoryList } = useGetCategoryList();
  const { mutate: createCategory } = useCreateCategory(
    () => {
      setIsOpenNewCategories(false);
    },
    (error: any) => {
      setIsError(error.response.data.error);
    }
  );
  const { mutate: deleteCategory } = useDeleteCategory();
  const useFormReturn = useForm<ICategories>({
    resolver: yupResolver(CategoryFormSchema),
  });

  const onClickAddCategoryHandler = () => {
    setModalTitle("Add new category");
    setIsOpenNewCategories(true);
  };

  const onClickCloseModalHandler = () => {
    setIsOpenNewCategories(false);
  };

  const onAddNewCategoryClickHandler = (data: ICategories) => {
    createCategory(data);
  };

  const onDeleteClickHandler = (id: number) => {
    deleteCategory(id);
  };

  const onEditClickHandler = (id: number) => {
    setModalTitle("Edit category");
    setIsOpenNewCategories(true);
  };
  return (
    <div>
      <EModal
        title={modalTitle}
        open={isOpenNewCategories}
        onCloseModal={onClickCloseModalHandler}
      >
        {isError !== "" && (
          <div className="flex rounded-md text-red-400 bg-red-200">
            <ExclamationCircleIcon className="w-7 h-7 text-red-400 m-2" />
            <p className="py-2">{isError}</p>
          </div>
        )}
        <NewCategoryForm
          onCloseModal={onClickCloseModalHandler}
          useFormInstance={useFormReturn}
          onSubmitForm={onAddNewCategoryClickHandler}
        />
      </EModal>
      <div className="px-4 mt-10 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold text-white leading-6 text-gray-900">
              Categories
            </h1>
            <p className="mt-2 text-sm text-gray-400">
              A list of all the categories in your shop including their name,
              description, and image.
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <button
              type="button"
              onClick={onClickAddCategoryHandler}
              className="block rounded-md bg-indigo-600 py-2 px-3 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add category
            </button>
          </div>
        </div>
        <div className="mt-8 flow-root">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 mt-6 ring-black ring-opacity-5 sm:rounded-lg">
                <CategoriesTable
                  onEditClick={onEditClickHandler}
                  onDeleteClick={onDeleteClickHandler}
                  categories={categoryList}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoriesControl;
