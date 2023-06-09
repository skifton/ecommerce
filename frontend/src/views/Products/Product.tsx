import React from "react";

interface IProps {
  product: any;
  onClickProductDetail: (id: string) => void;
}
const Product: React.FC<IProps> = ({ product, onClickProductDetail }) => {
  return (
    <div
      key={product.id}
      onClick={() => onClickProductDetail(product.id)}
      className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white"
    >
      <div className="aspect-w-3 aspect-h-4 bg-gray-200 group-hover:opacity-75 sm:aspect-none sm:h-96">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover object-center sm:h-full sm:w-full"
        />
      </div>
      <div className="flex flex-1 flex-col space-y-2 p-4">
        <h3 className="text-sm font-medium text-gray-900">
          <span aria-hidden="true" className="absolute inset-0" />
          {product.name}
        </h3>
        <p className="text-sm text-gray-500">{product.description}</p>
        <div className="flex flex-1 flex-col justify-end">
          <p className="text-sm italic text-gray-500">
            {product.color.map((color: any) => `${color.label}, `)}
          </p>
          <p className="text-base font-medium text-gray-900">
            ${product.price}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Product;
