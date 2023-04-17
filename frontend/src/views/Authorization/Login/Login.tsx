import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { ILoginForm } from "../../../models/user-auth.model";
import LoginForm from "./LoginForm";
import AuthContext from "../../../context/AuthContext";
import { LoginFormSchema } from "../../../models/form-schema.model";

const Login: React.FC = () => {
  const [isError, setIsError] = useState("");
  const navigate = useNavigate();
  const context = useContext(AuthContext);
  
  const { mutate: loginUser } = context?.loginUser(
    () => {
      navigate("/");
    },
    (error: any) => {
      setIsError(error.response.data.error);
    }
  );

  const useFormReturn = useForm<ILoginForm>({
    resolver: yupResolver(LoginFormSchema),
  });

  const onSubmitFormHandler = (data: ILoginForm) => {
    loginUser(data);
  };

  return (
    <div>
      <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <LoginForm
              isError={isError}
              onSubmitForm={onSubmitFormHandler}
              useFormInstance={useFormReturn}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
