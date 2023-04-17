import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import RegistrationForm from "./RegistrationForm";
import { IRegistrationForm } from "../../../models/user-auth.model";
import ConfirmEmail from "./ConfirmEmail";
import {
  useUpdateConfirmEmail,
  useCreateUser,
} from "../../../services/auth.service";
import { RegistrationFormSchema } from "../../../models/form-schema.model";

const Registration: React.FC = () => {
  const navigate = useNavigate();
  const [view, setView] = useState<string>("REGISTRATION");
  const [isError, setIsError] = useState<string>("");
  const [currentEmail, setCurrentEmail] = useState<string>("");
  const useFormReturn = useForm<IRegistrationForm>({
    resolver: yupResolver(RegistrationFormSchema),
  });

  const { mutate: createUser } = useCreateUser(
    (data) => {
      console.log(data);
      setIsError("");
      setCurrentEmail(data.email);
      setView("CONFIRM_EMAIL");
    },
    (error) => {
      setIsError(error.response.data.error);
    }
  );

  const { mutate: updateConfirmUpdate } = useUpdateConfirmEmail(
    () => {
      navigate("/login");
    },
    (error) => {
      setIsError(error.response.data.error);
    }
  );

  const onSubmitRegistrationFormHandler = (data: IRegistrationForm) => {
    createUser(data);
  };

  const onClickBackButtonHandler = () => {
    setView("REGISTRATION");
  };

  const onConfirmEmailHandler = (data: any) => {
    const userData = {
      email: currentEmail,
      confirmationCode: data.confirmationCode,
    };
    updateConfirmUpdate(userData);
  };

  return (
    <div>
      {view === "REGISTRATION" ? (
        <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Create new account
            </h2>
          </div>

          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
              <RegistrationForm
                isError={isError}
                useFormInstance={useFormReturn}
                onSubmitRegistrationForm={onSubmitRegistrationFormHandler}
              />
            </div>
          </div>
        </div>
      ) : (
        <ConfirmEmail
          isError={isError}
          onConfirmCode={onConfirmEmailHandler}
          onClickBackButton={onClickBackButtonHandler}
        />
      )}
    </div>
  );
};

export default Registration;
