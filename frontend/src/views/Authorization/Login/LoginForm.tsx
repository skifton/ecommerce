import React from "react";
import { UseFormReturn, Controller } from "react-hook-form";
import EInput from "../../../components/Form/EInput";
import { ILoginForm } from "../../../models/user-auth.model";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

interface IProps {
  useFormInstance: UseFormReturn<ILoginForm>;
  onSubmitForm: (data: ILoginForm) => void;
  isError: string;
}
const LoginForm: React.FC<IProps> = ({
  useFormInstance,
  onSubmitForm,
  isError,
}) => {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useFormInstance;
  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-6">
      {isError !== "" && (
        <div className="flex rounded-md text-red-400 bg-red-200">
          <ExclamationCircleIcon className="w-7 h-7 text-red-400 m-2" />
          <p className="py-2">{isError}</p>
        </div>
      )}
      <Controller
        name="email"
        control={control}
        render={({ field: { onChange, value } }) => (
          <EInput
            onChange={onChange}
            value={value ?? ""}
            error={Boolean(errors.email)}
            helperText={errors.email?.message}
            label="Email address"
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

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Controller
            name="isRemember"
            control={control}
            render={({ field: { onChange, value } }) => (
              <>
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  onChange={onChange}
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </>
            )}
          />
        </div>

        <div className="text-sm">
          <a
            href="/"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Forgot your password?
          </a>
        </div>
      </div>

      <div>
        <button
          type="submit"
          className="flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Sign in
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
