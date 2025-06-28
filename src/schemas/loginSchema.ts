import * as yup from "yup";

export const loginSchema = yup.object({
  username: yup.string().min(4).required(),
  password: yup.string().min(6).required(),
});
