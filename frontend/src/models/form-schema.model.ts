import * as yup from "yup";
import { IAddress, ICheckoutData } from "./checkout-data.model";

export const RegistrationFormSchema = yup
  .object({
    name: yup.string().required("Name is a required field"),
    surname: yup.string().required("Surname is a required field"),
    email: yup.string().email().required("Email is a required field"),
    password: yup
      .string()
      .required("Password is a required field")
      .min(6, "Password length should be at least 6 characters")
      .max(12, "Password cannot exceed more than 12 characters"),
    confirmPass: yup
      .string()
      .required("Confirm Password is a required field")
      .min(6, "Password length should be at least 6 characters")
      .max(12, "Password cannot exceed more than 12 characters")
      .oneOf([yup.ref("password")], "Passwords do not match"),
  })
  .required();

export const LoginFormSchema = yup
  .object({
    email: yup.string().email().required("Email is a required field"),
    password: yup
      .string()
      .required("Password is a required field")
      .min(6, "Password length should be at least 6 characters")
      .max(12, "Password cannot exceed more than 12 characters"),
    isRemember: yup.boolean(),
  })
  .required();

export const ProductFormSchema = yup
  .object({
    name: yup.string().required("Name is a required field"),
    description: yup.string().required("Description is a required field"),
    image: yup.string().required("Image is a required field"),
    category: yup.string(),
    count: yup.number().required("Count is a required field"),
    price: yup.number().required("Price is a required field"),
    size: yup.array().required("Size is a required field"),
    color: yup.array().required("Color is a required field"),
    sex: yup.string().required("Sex is a required field"),
  })
  .required();

export const CategoryFormSchema = yup
  .object({
    name: yup.string().required("Name is a required field"),
    image: yup.mixed().required("Image is a required field"),
    description: yup.string().required("Description is a required field"),
  })
  .required();

export const ProductDetailFormSchema = yup
  .object({
    size: yup.string().required("You must select the size of the product"),
    color: yup.string().required("You must select the color of the product"),
  })
  .required();

export const CheckoutFormSchema = yup
  .object<ICheckoutData>({
    firstName: yup.string().required(),
    lastName: yup.string().required().min(5),
    company: yup.string(),
    address: yup.object().required(),
    phone: yup.string().required(),
    deliveryMethod: yup.object().required(),
  })
  .required();

export const NewAddressFormSchema = yup.object<IAddress>({
  name: yup.string().required(),
  city: yup.string().required(),
  country: yup.string().required(),
  address: yup.string().required(),
  apartment: yup.number().positive().integer().required(),
  state: yup.string(),
  postalCode: yup.number().required(),
});
