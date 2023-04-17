import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ConfirmEmailForm from "./ConfirmEmailForm";
import { useForm } from "react-hook-form";

interface IProps {
  onClickBackButton: () => void;
  onConfirmCode: (data: any) => void;
  isError?: string;
}
const ConfirmEmail: React.FC<IProps> = ({
  onClickBackButton,
  onConfirmCode,
  isError
}) => {
  const schema = yup
    .object({
      confirmationCode: yup
        .string()
        .required("Confirmation Code is a required field"),
    })
    .required();
  const useFormReturn = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          Confirmation E-mail
        </h2>
        <p className="text-gray-600 text-center ">
          We have sent a verification code to your account. Please check your
          email and enter the received code.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <ConfirmEmailForm
            useInstanceForm={useFormReturn}
            onClickBackButton={onClickBackButton}
            onConfirmCode={onConfirmCode}
            isError={isError}
          />
        </div>
      </div>
    </div>
  );
};

export default ConfirmEmail;
