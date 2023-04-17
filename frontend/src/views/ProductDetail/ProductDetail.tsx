import React, { useContext } from "react";
import clsx from "clsx";
import { useParams, useNavigate } from "react-router-dom";
import { useGetProductDetail } from "../../services/products.service";
import ProductDetailForm from "./ProductDetailForm";
import { useForm } from "react-hook-form";
import { ICartProduct, IProduct } from "../../models/product.model";
import { yupResolver } from "@hookform/resolvers/yup";
import { ProductDetailFormSchema } from "../../models/form-schema.model";
import {
  useAddItemInCart,
  useGetCartList,
  useUpdateCartItem,
} from "../../services/cart.service";
import {
  useGetSession,
  useUpdateSession,
} from "../../services/shopping-session.service";
import AuthContext from "../../context/AuthContext";
import { productDetailPolicies } from "../../constants/policies";
import { useSnackbar } from "notistack";

const ProductDetail: React.FC = () => {
  const { productId } = useParams();
  const context = useContext(AuthContext);
  const isAuth = Boolean(context?.user);
  const session_id = context?.user?.session_id;
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { cartItems } = useGetCartList(session_id ? session_id : "");
  const { session } = useGetSession(
    context?.user?.userId ? context?.user?.userId : ""
  );
  const { product } = useGetProductDetail(productId ? productId : "");
  const { mutate: updateCartItem } = useUpdateCartItem();
  const { mutate: updateSession } = useUpdateSession(
    () => {
      enqueueSnackbar("This product was successfully added on your cart", {
        variant: "success",
      });
    },
    () => {
      enqueueSnackbar("Something went wrong!", { variant: "error" });
    }
  );
  const { mutate: addItemInCart } = useAddItemInCart(
    () => {
      updateSession({
        id: context?.user ? context?.user?.userId : "",
        params: { price: product?.price, operation: "ADD" },
      });
    },
    () => {
      enqueueSnackbar("Something went wrong!", { variant: "error" });
    }
  );
  const useFormReturn = useForm<ICartProduct>({
    resolver: yupResolver(ProductDetailFormSchema),
  });

  const onAddProductToCartHandler = (data: ICartProduct) => {
    if (isAuth) {
      const existingCartItem = cartItems?.filter((item) => {
        return (
          item.session_id === session_id &&
          item.product_id === product?.id &&
          item.color === data.color &&
          item.size === data.size
        );
      });
      if (existingCartItem && existingCartItem?.length !== 0) {
        updateCartItem({
          id: existingCartItem[0].id ? existingCartItem[0].id : "",
          params: {
            quantity: existingCartItem[0]
              ? existingCartItem[0]?.quantity + 1
              : 1,
          },
        });
        updateSession({
          id: context?.user ? context?.user?.userId : "",
          params: { price: product?.price, operation: "ADD" },
        });
      } else {
        const newCartItem = {
          session_id: session_id,
          product_id: product?.id,
          name: product?.name,
          price: product?.price,
          category: product?.category,
          image: product?.image,
          color: data.color,
          size: data.size,
          quantity: 1,
        };
        addItemInCart(newCartItem);
      }
    } else {
      navigate("/login");
      enqueueSnackbar("You are not authorizated!", { variant: "warning" });
    }
  };
  return (
    <div className="bg-white">
      <div className="pt-6 pb-16 sm:pb-24">
        <div className="mx-auto mt-8 max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8">
            <div className="lg:col-span-5 lg:col-start-8">
              <div className="flex justify-between">
                <h1 className="text-xl font-medium text-gray-900">
                  {product?.name}
                </h1>
                <p className="text-xl font-medium text-gray-900">
                  {product?.price}$
                </p>
              </div>
            </div>

            <div className="mt-8 lg:col-span-7 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0">
              <h2 className="sr-only">Images</h2>
              <div className="grid grid-cols-1 lg:grid-cols-1 lg:grid-rows-1 lg:gap-8">
                <img
                  src={product?.image}
                  alt={product?.name}
                  className={clsx("rounded-lg")}
                />
              </div>
            </div>

            <div className="mt-8 lg:col-span-5">
              {product ? (
                <ProductDetailForm
                  product={product}
                  useFormInstance={useFormReturn}
                  onAddProductToCart={onAddProductToCartHandler}
                />
              ) : (
                <p>Unfortunaly we don't have this product.:(</p>
              )}
              <div className="mt-10">
                <h2 className="text-sm font-medium text-gray-900">
                  Description
                </h2>

                <div
                  className="prose prose-sm mt-4 text-gray-500"
                  dangerouslySetInnerHTML={{
                    __html: product ? product.description : "",
                  }}
                />
              </div>

              <div className="mt-8 border-t border-gray-200 pt-8">
                <h2 className="text-sm font-medium text-gray-900">
                  Fabric &amp; Care
                </h2>
              </div>

              <section aria-labelledby="policies-heading" className="mt-10">
                <h2 id="policies-heading" className="sr-only">
                  Our Policies
                </h2>

                <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                  {productDetailPolicies.map((policy: any) => (
                    <div
                      key={policy.name}
                      className="rounded-lg border border-gray-200 bg-gray-50 p-6 text-center"
                    >
                      <dt>
                        <policy.icon
                          className="mx-auto h-6 w-6 flex-shrink-0 text-gray-400"
                          aria-hidden="true"
                        />
                        <span className="mt-4 text-sm font-medium text-gray-900">
                          {policy.name}
                        </span>
                      </dt>
                      <dd
                        key={policy.name}
                        className="mt-1 text-sm text-gray-500"
                      >
                        {policy.description}
                      </dd>
                    </div>
                  ))}
                </dl>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
