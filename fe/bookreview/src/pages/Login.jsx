import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Container, Paper, Typography, TextField, Button, Stack } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { enqueueSnackbar } from "notistack";
import { useNavigate, Link } from "react-router-dom";
import useTitle from "../hooks/useTitle";

const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Min 6 characters"),
});

export default function Login() {
  useTitle("Login • Book Review");
  const { login } = useAuth();
  const nav = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } =
    useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (values) => {
    try {
      await login(values.email, values.password);
      enqueueSnackbar("Welcome back!", { variant: "success" });
      nav("/");
    } catch (e) {
      enqueueSnackbar(e?.response?.data?.message || "Login failed", { variant: "error" });
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h5" fontWeight={700} mb={2}>Login</Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <TextField label="Email" {...register("email")} error={!!errors.email} helperText={errors.email?.message} />
            <TextField label="Password" type="password" {...register("password")} error={!!errors.password} helperText={errors.password?.message} />
            <Button type="submit" variant="contained" disabled={isSubmitting}>
              {isSubmitting ? "Signing in..." : "Login"}
            </Button>
            <Typography variant="body2">
              No account? <Link to="/signup">Create one</Link>
            </Typography>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
}