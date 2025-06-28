import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";

import { useForm } from "react-hook-form";
import { loginSchema } from "src/schemas/loginSchema";

type LoginFormInputs = {
  username: string;
  password: string;
};

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormInputs) => {
    console.log("Login data:", data);
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
      </Stack>
    </form>
  );
}
