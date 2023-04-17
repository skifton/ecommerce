import React, { Fragment } from "react";
import { UseFormReturn, Controller } from "react-hook-form";
import EInput from "../../components/Form/EInput";
import DeliveryMethods from "./DeliveryMethods";
import OrderedItemList from "./OrderedItemList";
import { IAddress, ICheckoutData } from "../../models/checkout-data.model";
import Addresses from "./Adresses";
import NewAddressForm from "./NewAddressForm";
import EModal from "../../components/EModal";
import { ICartProduct } from "../../models/product.model";

const deliveryMethods = [
  {
    id: 1,
    title: "Standard",
    turnaround: "4–10 business days",
    price: "$5.00",
  },
  { id: 2, title: "Express", turnaround: "2–5 business days", price: "$16.00" },
];

interface IProps {
  useCheckoutFormInstance: UseFormReturn<ICheckoutData>;
  useNewAddressFormInstance: UseFormReturn<IAddress>;
  onClickOpenAddAddressForm: () => void;
  isOpenNewAddressForm: boolean;
  onAddNewAddressSubmit: (newAddress: IAddress) => void;
  addresses: any;
  orderedProduct?: ICartProduct[];
  total: number,
}

const CheckoutForm: React.FC<IProps> = ({
  useCheckoutFormInstance,
  addresses,
  useNewAddressFormInstance,
  onClickOpenAddAddressForm,
  isOpenNewAddressForm,
  onAddNewAddressSubmit,
  orderedProduct,
  total,
}) => {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useCheckoutFormInstance;

  const onSubmitFormHandler = (data: any) => {
    console.log(JSON.stringify(data));
  };
  return (
    <Fragment>
      <EModal
        title="Add New Address"
        open={isOpenNewAddressForm}
        onCloseModal={onClickOpenAddAddressForm}
      >
        {/* {isError !== "" && (
          <div className="flex rounded-md text-red-400 bg-red-200">
            <ExclamationCircleIcon className="w-7 h-7 text-red-400 m-2" />
            <p className="py-2">{isError}</p>
          </div>
        )} */}
        <NewAddressForm
          useFormInstance={useNewAddressFormInstance}
          onAddNewAddressSubmit={onAddNewAddressSubmit}
        />
      </EModal>
      <form
        onSubmit={handleSubmit(onSubmitFormHandler)}
        className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16"
      >
        <div>
          <div>
            <h2 className="text-lg font-medium text-gray-900">
              Shipping information
            </h2>

            <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
              <Controller
                name="firstName"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <EInput
                    onChange={onChange}
                    value={value ?? ""}
                    error={Boolean(errors.firstName)}
                    helperText={errors.firstName?.message}
                    label="First Name"
                  />
                )}
              />

              <Controller
                name="lastName"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <EInput
                    onChange={onChange}
                    value={value ?? ""}
                    error={Boolean(errors.lastName)}
                    helperText={errors.lastName?.message}
                    label="Last Name"
                  />
                )}
              />

              <Controller
                name="company"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <EInput
                    onChange={onChange}
                    value={value ?? ""}
                    error={Boolean(errors.company)}
                    helperText={errors.company?.message}
                    label="Company (optional)"
                  />
                )}
              />

              <Controller
                name="phone"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <EInput
                    onChange={onChange}
                    value={value ?? ""}
                    error={Boolean(errors.phone)}
                    helperText={errors.phone?.message}
                    label="Phone"
                  />
                )}
              />
            </div>

            <Controller
              name="address"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Addresses
                  addresses={addresses}
                  address={value}
                  onChangeAddress={onChange}
                  onClickOpenAddAddressForm={onClickOpenAddAddressForm}
                  isError={Boolean(errors.address?.message)}
                  helperText={errors.address?.message}
                />
              )}
            />
          </div>

          <div className="mt-10 border-t border-gray-200 pt-10">
            <Controller
              name="deliveryMethod"
              control={control}
              render={({ field: { onChange, value } }) => (
                <DeliveryMethods
                  deliveryMethods={deliveryMethods}
                  selectedDeliveryMethod={value || deliveryMethods[0]}
                  onChangeDeliveryMethod={onChange}
                  isError={Boolean(errors.deliveryMethod?.message)}
                  helperText={errors.deliveryMethod?.message}
                />
              )}
            />
          </div>

          <div className="mt-10 border-t border-gray-200 pt-10">
            <h2 className="text-lg font-medium text-gray-900">Payment</h2>

            <fieldset className="mt-4 text-gray-600">
              At the moment we only accept cash payments.
            </fieldset>
          </div>
        </div>

        <div className="mt-10 lg:mt-0">
          <h2 className="text-lg font-medium text-gray-900">Order summary</h2>

          <div className="mt-4 rounded-lg border border-gray-200 bg-white shadow-sm">
            <h3 className="sr-only">Items in your cart</h3>
            <OrderedItemList products={orderedProduct} />
            <dl className="space-y-6 border-t border-gray-200 py-6 px-4 sm:px-6">
              <div className="flex items-center justify-between">
                <dt className="text-base font-medium">Total</dt>
                <dd className="text-base font-medium text-gray-900">{total}</dd>
              </div>
            </dl>

            <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
              <button
                type="submit"
                className="w-full rounded-md border border-transparent bg-indigo-600 py-3 px-4 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
              >
                Confirm order
              </button>
            </div>
          </div>
        </div>
      </form>
    </Fragment>
  );
};

export default CheckoutForm;
