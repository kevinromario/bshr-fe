import { yupResolver } from "@hookform/resolvers/yup";
import {
  Alert,
  Box,
  Button,
  Collapse,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";

import { useForm } from "react-hook-form";
import { loginSchema } from "src/schemas/loginSchema";
import { login } from "src/services/auth.service";

type LoginFormInputs = {
  username: string;
  password: string;
};

export function LoginForm() {
  const router = useRouter();
  const [errorLogin, setErrorLogin] = React.useState("");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(loginSchema),
  });

  const username = watch("username");
  const password = watch("password");

  React.useEffect(() => {
    setErrorLogin("");
  }, [username, password]);

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      await login(data);
      router.push("/carts");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        const message = error.response?.data || "Unexpected error";
        setErrorLogin(`Error ${status}: ${message}`);
      } else {
        setErrorLogin(`Error: ${error}`);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <Typography variant="h6">Login</Typography>
        <TextField
          label="Username"
          variant="standard"
          {...register("username")}
          error={!!errors.username}
          helperText={errors.username?.message}
        />
        <TextField
          label="Password"
          variant="standard"
          {...register("password")}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        <Box sx={{ justifyContent: "center", display: "flex" }}>
          <Button variant="contained" type="submit">
            Login
          </Button>
        </Box>
        <Collapse in={!!errorLogin}>
          <Alert severity="error">{errorLogin}</Alert>
        </Collapse>
      </Stack>
    </form>
  );
}
