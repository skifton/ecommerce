import React from "react";
import OrderedItem from "./OrderedItem";
import { ICartProduct } from "../../models/product.model";

interface IProps {
  products?: ICartProduct[];
}
const OrderedItemList: React.FC<IProps> = ({ products }) => {
  return (
    <ul className="divide-y divide-gray-200">
      {products?.map((product: any) => (
        <li key={product.id}>
          <OrderedItem product={product} />
        </li>
      ))}
    </ul>
  );
};

export default OrderedItemList;
