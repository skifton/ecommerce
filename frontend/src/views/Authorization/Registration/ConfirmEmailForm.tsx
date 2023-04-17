import React from "react";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { Controller } from "react-hook-form";
import EInput from "../../../components/Form/EInput";

interface IProps {
  useInstanceForm: any;
  onClickBackButton: () => void;
  onConfirmCode: (data: any) => void;
  isError?: string;
}
const ConfirmEmailForm: React.FC<IProps> = ({
  useInstanceForm,
  onClickBackButton,
  onConfirmCode,
  isError,
}) => {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useInstanceForm;
  return (
    <form onSubmit={handleSubmit(onConfirmCode)} className="space-y-6">
      {isError !== "" && (
        <div className="flex rounded-md text-red-400 bg-red-200">
          <ExclamationCircleIcon className="w-7 h-7 text-red-400 m-2" />
          <p className="py-2">{isError}</p>
        </div>
      )}
      <Controller
        name="confirmationCode"
        control={control}
        render={({ field: { onChange, value } }) => (
          <EInput
            type="number"
            onChange={onChange}
            value={value ?? ""}
            error={Boolean(errors.confiramtionCode)}
            helperText={errors.confiramtionCode?.message}
            label="Confirmation Code"
          />
        )}
      />
      <div className="justify-between">
        <button
          type="submit"
          className="flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Confirm
        </button>
        <button
          type="button"
          onClick={onClickBackButton}
          className="flex w-full justify-center rounded-md bg-gray-600 py-2 my-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-gray-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Back
        </button>
      </div>
    </form>
  );
};

export default ConfirmEmailForm;
