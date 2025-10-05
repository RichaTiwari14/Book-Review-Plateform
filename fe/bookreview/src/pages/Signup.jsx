import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Container, Paper, Typography, TextField, Button, Stack } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { enqueueSnackbar } from "notistack";
import { useNavigate, Link } from "react-router-dom";
import useTitle from "../hooks/useTitle";
import Page from "../components/Page";
import { MotionPaper, MotionButton } from "../motion/Motion";
import { pop } from "../motion/presets";
import { useMotionSafe } from "../motion/presets";
const schema = z.object({
  name: z.string().min(2, "Name is too short"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Min 6 characters"),
});

export default function Signup() {
    const safe = useMotionSafe();
  useTitle("Sign up • Book Review");
  const { signup } = useAuth();
  const nav = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } =
    useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (values) => {
    try {
      await signup(values.name, values.email, values.password);
      enqueueSnackbar("Welcome! Account created.", { variant: "success" });
      nav("/");
    } catch (e) {
      enqueueSnackbar(e?.response?.data?.message || "Signup failed", { variant: "error" });
    }
  };

  return (
    <Page>
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <MotionPaper variants={pop(0.02)} {...safe} sx={{ p: 4 }}>
        <Typography variant="h5" fontWeight={700} mb={2}>Create your account</Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <TextField label="Full name" {...register("name")} error={!!errors.name} helperText={errors.name?.message} />
            <TextField label="Email" {...register("email")} error={!!errors.email} helperText={errors.email?.message} />
            <TextField label="Password" type="password" {...register("password")} error={!!errors.password} helperText={errors.password?.message} />
            <MotionButton type="submit" variant="contained" whileTap={{ scale: 0.98 }}>
              {isSubmitting ? "Creating..." : "Create account"}
            </MotionButton>
            <Typography variant="body2">
              Already have an account? <Link to="/login">Login</Link>
            </Typography>
          </Stack>
        </form>
      </MotionPaper>
    </Container>
    </Page>
  );
}