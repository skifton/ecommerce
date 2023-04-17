import React from "react";
import { Controller, UseFormReturn } from "react-hook-form";
import EInput from "../../components/Form/EInput";
import { ICategories } from "../../models/categories.model";

interface IProps {
  useFormInstance: UseFormReturn<ICategories>;
  onSubmitForm: (data: ICategories) => void;
  onCloseModal: () => void;
  defaultValues?: ICategories;
}
const NewCategoryForm: React.FC<IProps> = ({
  useFormInstance,
  onSubmitForm,
  onCloseModal,
  defaultValues,
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
            defaultValue={defaultValues?.name}
            label="Name"
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
            defaultValue={defaultValues?.image}
            label="Image"
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
            defaultValue={defaultValues?.description}
            label="Description"
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

export default NewCategoryForm;
