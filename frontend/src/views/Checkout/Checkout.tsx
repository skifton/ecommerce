import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import CheckoutForm from "./CheckoutForm";
import { IAddress, ICheckoutData } from "../../models/checkout-data.model";
import { useCreateAddress, useGetUsersAddressList } from "../../services/address.service";
import AuthContext from "../../context/AuthContext";
import {
  CheckoutFormSchema,
  NewAddressFormSchema,
} from "../../models/form-schema.model";
import { useGetCartList } from "../../services/cart.service";
import { useGetSession } from "../../services/shopping-session.service";

const Checkout: React.FC = () => {
  const [isOpenNewAddressForm, setIsOpenNewAddressForm] = useState<boolean>(false);
  const context = useContext(AuthContext);
  const userId = context?.user?.userId;
  const { session } = useGetSession(userId ? userId : "");
  const { addresses } = useGetUsersAddressList(userId ? userId : "");
  const { cartItems } = useGetCartList(session ? session.id : "");
  const { mutate: createAddress } = useCreateAddress(
    (createAddress) => {
      console.log(createAddress);
    }
  );
  const useCheckoutFormReturn = useForm<ICheckoutData>({
    resolver: yupResolver(CheckoutFormSchema),
  });
  const useNewAddressFormReturn = useForm<IAddress>({
    resolver: yupResolver(NewAddressFormSchema),
  });

  const onClickOpenAddAddressFormHandler = () => {
    setIsOpenNewAddressForm(!isOpenNewAddressForm);
  };
  const onAddNewAddressHandler = (newAddrress: IAddress) => {
    const address = {
      user_id: userId,
      ...newAddrress,
    };
    createAddress(address);
  }
  return (
    <main className="mx-auto max-w-7xl px-4 pt-16 pb-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl lg:max-w-none">
        <h1 className="sr-only">Checkout</h1>
        <CheckoutForm
          addresses={addresses}
          useCheckoutFormInstance={useCheckoutFormReturn}
          useNewAddressFormInstance={useNewAddressFormReturn}
          onClickOpenAddAddressForm={onClickOpenAddAddressFormHandler}
          isOpenNewAddressForm={isOpenNewAddressForm}
          onAddNewAddressSubmit={onAddNewAddressHandler}
          orderedProduct={cartItems}
          total={Number(session?.total)}
        />
      </div>
    </main>
  );
};

export default Checkout;
