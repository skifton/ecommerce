import React from "react";
import { Controller, UseFormReturn } from "react-hook-form";
import EMultiSelect from "../../components/EMultiSelect";
import EInput from "../../components/Form/EInput";
import { Colors } from "../../utils/colors.util";
import { Size } from "../../utils/size.util";
import { IProduct } from "../../models/product.model";
import ESelectInput from "../../components/Form/ESelectInput";
import { ICategories } from "../../models/categories.model";

interface IProps {
  useFormInstance: UseFormReturn<IProduct>;
  onSubmitForm: (data: IProduct) => void;
  onCloseModal: () => void;
  categories: ICategories[];
}
const NewProductForm: React.FC<IProps> = ({
  useFormInstance,
  onSubmitForm,
  onCloseModal,
  categories,
}) => {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useFormInstance;

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-6">
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

      <Controller
        name="description"
        control={control}
        render={({ field: { onChange, value } }) => (
          <EInput
            onChange={onChange}
            value={value ?? ""}
            error={Boolean(errors.description)}
            helperText={errors.description?.message}
            label="Description"
          />
        )}
      />

      <Controller
        name="image"
        control={control}
        render={({ field: { onChange, value } }) => (
          <EInput
            onChange={onChange}
            value={value ?? ""}
            error={Boolean(errors.image)}
            helperText={errors.image?.message}
            label="Image"
          />
        )}
      />

      <Controller
        name="category"
        control={control}
        render={({ field: { onChange, value } }) => (
          <ESelectInput
            label="Category"
            value={value}
            onChange={onChange}
            options={categories}
          />
        )}
      />

      <Controller
        name="count"
        control={control}
        render={({ field: { onChange, value } }) => (
          <EInput
            type="number"
            onChange={onChange}
            value={value ?? ""}
            error={Boolean(errors.count)}
            helperText={errors.count?.message}
            label="Count"
          />
        )}
      />

      <Controller
        name="color"
        control={control}
        render={({ field: { onChange, value } }) => (
          <EMultiSelect
            options={Colors}
            onChange={onChange}
            value={value}
            error={Boolean(errors.color)}
            helperText={errors.color?.message}
            label="Color"
          />
        )}
      />

      <Controller
        name="size"
        control={control}
        render={({ field: { onChange, value } }) => (
          <EMultiSelect
            options={Size}
            onChange={onChange}
            value={value}
            error={Boolean(errors.color)}
            helperText={errors.color?.message}
            label="size"
          />
        )}
      />

      <Controller
        name="price"
        control={control}
        render={({ field: { onChange, value } }) => (
          <EInput
            type="number"
            onChange={onChange}
            value={value ?? ""}
            error={Boolean(errors.price)}
            helperText={errors.price?.message}
            label="Price"
          />
        )}
      />

      <Controller
        name="sex"
        control={control}
        render={({ field: { onChange, value } }) => (
          <EInput
            onChange={onChange}
            value={value ?? ""}
            error={Boolean(errors.sex)}
            helperText={errors.sex?.message}
            label="Sex"
          />
        )}
      />
      <div className="mt-5 sm:mt-6 flex float-right">
        <button
          type="button"
          className="inline-flex w-[10rem] mx-5 justify-center rounded-md bg-red-600/80 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={onCloseModal}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="inline-flex w-[10rem] mx-5 justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Add
        </button>
      </div>
    </form>
  );
};

export default NewProductForm;
