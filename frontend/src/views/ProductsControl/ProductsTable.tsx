import { TrashIcon } from "@heroicons/react/24/outline";
import React from "react";
import { IProduct } from "../../models/product.model";

interface IProps {
    products: IProduct[];
    onDeleteClick: (id: string) => void;
}
const ProductsTable: React.FC<IProps> = ({
    products,
    onDeleteClick,
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
          <th
            scope="col"
            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
          >
            Colors
          </th>
          <th
            scope="col"
            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
          >
            Size
          </th>
          <th
            scope="col"
            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
          >
            Categories
          </th>
          <th
            scope="col"
            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
          >
            Count
          </th>
          <th
            scope="col"
            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
          >
            Price
          </th>
          <th
            scope="col"
            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
          >
            Sex
          </th>
          <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
            <span className="sr-only">Edit</span>
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200 bg-white">
        {products?.map((product) => (
          <tr key={product.name}>
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
              {product.name}
            </td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
              {product.description}
            </td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
              {product.image}
            </td>
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
              {product?.color?.map((color) => `${color.label}, `)}
            </td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {product?.size?.map((size) => `${size.label}, `)}
            </td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
              {product.category}
            </td>
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
              {product.count}
            </td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
              {product.price}
            </td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
              {product.sex}
            </td>
            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
              <button className="text-indigo-600 mr-5 hover:text-indigo-900">
                Edit<span className="sr-only">, {product.name}</span>
              </button>
              <button onClick={() => onDeleteClick(product?.id ? product?.id : "")} className="text-red-500 hover:text-red-200">
                <TrashIcon className="w-4 h-4"/>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductsTable;
