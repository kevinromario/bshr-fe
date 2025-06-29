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
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "src/hooks/useAuth";
import { useCart } from "src/hooks/useCart";
import { useProduct } from "src/hooks/useProduct";
import { useSnackbar } from "src/hooks/useSnackbar";
import { loginSchema } from "src/schemas/loginSchema";
import { login } from "src/services/auth.service";
import { getUserById } from "src/services/user.service";
import { handleAxiosError } from "src/utils/handleAxiosError";
import { capitalizeFirstLetter } from "src/utils/string";

type LoginFormInputs = {
  username: string;
  password: string;
};

export function LoginForm() {
  const router = useRouter();
  const { setUser } = useAuth();
  const { showSnackbar } = useSnackbar();
  const { clearCarts } = useCart();
  const { clearProducts } = useProduct();
  const [isLoading, setIsLoading] = React.useState(false);
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
      if (isLoading) {
        return;
      }

      setIsLoading(true);

      const res = await login(data);
      const decodedToken = JSON.parse(atob(res.token.split(".")[1]));
      const user = await getUserById(decodedToken.sub);
      clearProducts();
      clearCarts();
      setUser(user);

      showSnackbar({
        message: `Welcome Back ${capitalizeFirstLetter(user.name.firstname)}`,
        severity: "success",
      });

      router.push("/cart");
    } catch (error: unknown) {
      const message = handleAxiosError(error);
      setErrorLogin(message);
    } finally {
      setIsLoading(false);
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
          type="password"
          label="Password"
          variant="standard"
          {...register("password")}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        <Box sx={{ justifyContent: "center", display: "flex" }}>
          <Button variant="contained" type="submit" loading={isLoading}>
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
