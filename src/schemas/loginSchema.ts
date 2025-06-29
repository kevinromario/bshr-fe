import * as yup from "yup";

export const loginSchema = yup.object({
  username: yup.string().min(8).required(),
  password: yup.string().min(8).required(),
});
