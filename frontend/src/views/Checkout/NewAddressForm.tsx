import React from "react";
import { UseFormReturn, Controller } from "react-hook-form";
import EInput from "../../components/Form/EInput";
import { IAddress } from "../../models/checkout-data.model";

interface IProps {
  useFormInstance: UseFormReturn<IAddress>;
  onAddNewAddressSubmit: (newAddress: IAddress) => void;
}

const NewAddressForm: React.FC<IProps> = ({
  useFormInstance,
  onAddNewAddressSubmit,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useFormInstance;

  return (
    <form
      onSubmit={handleSubmit(onAddNewAddressSubmit)}
      className="w-full mt-10"
    >
      <Controller
        name="name"
        control={control}
        render={({ field: { onChange, value } }) => (
          <EInput
            onChange={onChange}
            value={value ?? ""}
            error={Boolean(errors.name)}
            helperText={errors.name?.message}
            label="Name"
          />
        )}
      />
      <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
        <Controller
          name="city"
          control={control}
          render={({ field: { onChange, value } }) => (
            <EInput
              onChange={onChange}
              value={value ?? ""}
              error={Boolean(errors.city)}
              helperText={errors.city?.message}
              label="City"
            />
          )}
        />

        <div>
          <label
            htmlFor="country"
            className="block text-sm font-medium text-gray-700"
          >
            Country
          </label>
          <div className="mt-1">
            <select
              id="country"
              autoComplete="country-name"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              {...register("country")}
            >
              <option>United States</option>
              <option>Canada</option>
              <option>Mexico</option>
            </select>
          </div>
        </div>

        <Controller
          name="address"
          control={control}
          render={({ field: { onChange, value } }) => (
            <EInput
              onChange={onChange}
              value={value ?? ""}
              error={Boolean(errors.address)}
              helperText={errors.address?.message}
              label="Address"
            />
          )}
        />

        <Controller
          name="apartment"
          control={control}
          render={({ field: { onChange, value } }) => (
            <EInput
              onChange={onChange}
              value={value ?? ""}
              error={Boolean(errors.apartment)}
              helperText={errors.apartment?.message}
              label="Apartment, suite, etc."
            />
          )}
        />

        <Controller
          name="state"
          control={control}
          render={({ field: { onChange, value } }) => (
            <EInput
              onChange={onChange}
              value={value ?? ""}
              error={Boolean(errors.state)}
              helperText={errors.state?.message}
              label="State / Province (optional)"
            />
          )}
        />

        <Controller
          name="postalCode"
          control={control}
          render={({ field: { onChange, value } }) => (
            <EInput
              onChange={onChange}
              value={value ?? ""}
              error={Boolean(errors.postalCode)}
              helperText={errors.postalCode?.message}
              label="Postal Code"
            />
          )}
        />
      </div>
      <button
        type="submit"
        className="w-full mt-10 rounded-md border border-transparent bg-indigo-600 py-3 px-4 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
      >
        Add Address
      </button>
    </form>
  );
};

export default NewAddressForm;
