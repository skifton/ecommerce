import React from "react";
import { UseFormReturn, Controller } from "react-hook-form";
import { IRegistrationForm } from "../../../models/user-auth.model";
import EInput from "../../../components/Form/EInput";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

interface IProps {
  useFormInstance: UseFormReturn<IRegistrationForm>;
  onSubmitRegistrationForm: (data: IRegistrationForm) => void;
  isError: string;
}
const RegistrationForm: React.FC<IProps> = ({
  useFormInstance,
  onSubmitRegistrationForm,
  isError,
}) => {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useFormInstance;

  return (
    <form onSubmit={handleSubmit(onSubmitRegistrationForm)} className="space-y-6">
      {isError !== "" && (
        <div className="flex rounded-md text-red-400 bg-red-200">
          <ExclamationCircleIcon className="w-7 h-7 text-red-400 m-2" />
          <p className="py-2">{isError}</p>
        </div>
      )}
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
        name="surname"
        control={control}
        render={({ field: { onChange, value } }) => (
          <EInput
            onChange={onChange}
            value={value ?? ""}
            error={Boolean(errors.surname)}
            helperText={errors.surname?.message}
            label="Surname"
          />
        )}
      />

      <Controller
        name="email"
        control={control}
        render={({ field: { onChange, value } }) => (
          <EInput
            onChange={onChange}
            value={value ?? ""}
            error={Boolean(errors.email)}
            helperText={errors.email?.message}
            label="Email Address"
          />
        )}
      />

      <Controller
        name="password"
        control={control}
        render={({ field: { onChange, value } }) => (
          <EInput
            type="password"
            onChange={onChange}
            value={value ?? ""}
            error={Boolean(errors.password)}
            helperText={errors.password?.message}
            label="Password"
          />
        )}
      />

      <Controller
        name="confirmPass"
        control={control}
        render={({ field: { onChange, value } }) => (
          <EInput
            type="password"
            onChange={onChange}
            value={value ?? ""}
            error={Boolean(errors.confirmPass)}
            helperText={errors.confirmPass?.message}
            label="Confirm Password"
          />
        )}
      />

      <div>
        <button
          type="submit"
          className="flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Registration
        </button>
      </div>
    </form>
  );
};

export default RegistrationForm;
