import React from 'react';
import Cartitem from './CartItem';
import { ICartProduct } from '../../models/product.model';

interface IProps {
    products: ICartProduct[] | undefined,
    onDeleteClick: (id: string, price: number, quantity: number) => void;
    onIncrementQuantity: (id: string, params: { quantity: number }, price: number) => void;
    onDecrementQuantity: (id: string, params: { quantity: number }, price: number) => void;
}
const CartList: React.FC<IProps> = ({
    products,
    onDeleteClick,
    onIncrementQuantity,
    onDecrementQuantity
}) => {
    return <ul className="divide-y divide-gray-200 border-t border-b border-gray-200">
    {products?.map((product: ICartProduct) => (
    <li key={product.id}><Cartitem product={product} onDeleteClick={onDeleteClick} onIncrementQuantity={onIncrementQuantity} onDecrementQuantity={onDecrementQuantity}/></li>
    ))}
  </ul>
};

export default CartList;