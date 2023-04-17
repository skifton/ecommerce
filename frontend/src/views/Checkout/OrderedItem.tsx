import React from "react";
import { Link } from "react-router-dom";
import { ICartProduct } from "../../models/product.model";

interface IProps {
    product: any;
}
const OrderedItem: React.FC<IProps> = ({
    product
}) => {
  return (
    <div key={product.id} className="flex py-6 px-4 sm:px-6">
      <div className="flex-shrink-0">
        <img
          src={product.image}
          alt={product.name}
          className="w-28 h-28 rounded-md"
        />
      </div>
      <div className="flex justify-between w-full">
      <div className="ml-6 flex flex-1 flex-col">
        <div className="flex">
          <div className="min-w-0 flex-1">
            <h4 className="text-sm">
              <Link
                to={`/category/${product.product_id}`}
                className="font-medium text-gray-700 hover:text-gray-800"
              >
                {product.name}
              </Link>
            </h4>
            <p className="mt-1 text-sm text-gray-500">{product.color}</p>
            <p className="mt-1 text-sm text-gray-500">{product.size}</p>
          </div>
        </div>

        <div className="flex flex-1 items-end justify-between pt-2">
          <p className="mt-1 text-sm font-medium text-gray-900">
            {product.price}
          </p>
        </div>
      </div>
      <p className="self-center">x{product.quantity}</p>
      </div>
    </div>
  );
};

export default OrderedItem;
