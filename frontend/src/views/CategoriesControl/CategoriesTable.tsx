import React from "react";
import { TrashIcon } from "@heroicons/react/24/outline";
import { ICategories } from "../../models/categories.model";

interface IProps {
  categories?: ICategories[];
  onDeleteClick: (id: number) => void;
  onEditClick: (id: number) => void;
}
const CategoriesTable: React.FC<IProps> = ({
  categories,
  onDeleteClick,
  onEditClick,
}) => {
  return (
    <table className="min-w-full divide-y divide-gray-300">
      <thead className="bg-gray-50">
        <tr>
          <th
            scope="col"
            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
          >
            Name
          </th>
          <th
            scope="col"
            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
          >
            Description
          </th>
          <th
            scope="col"
            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
          >
            Image
          </th>
          <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
            <span className="sr-only">Edit</span>
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200 bg-white">
        {categories?.map((category) => (
          <tr key={category.name}>
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
              {category.name}
            </td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
              {category.description}
            </td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
              {category.image}
            </td>
            <td className="relative flex whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
              <button
                className="text-indigo-600 mr-4 hover:text-indigo-900"
                onClick={() => onEditClick(category?.id ? category?.id : 0)}
              >
                Edit<span className="sr-only">, {category.name}</span>
              </button>
              <button
                className="text-red-500 hover:text-red-200"
                onClick={() => onDeleteClick(category?.id ? category?.id : 0)}
              >
                <TrashIcon className="h-4 w-4" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CategoriesTable;
