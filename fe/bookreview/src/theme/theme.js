import { createTheme } from "@mui/material/styles";

export const getTheme = (mode = "light") =>
  createTheme({
    palette: {
      mode,
      primary: { main: mode === "light" ? "#2563eb" : "#60a5fa" },
      secondary: { main: "#22c55e" },
      background: {
        default: mode === "light" ? "#f7f9fc" : "#0b1220",
        paper: mode === "light" ? "#fff" : "#0f172a",
      },
    },
    shape: { borderRadius: 10 },
    typography: {
      fontFamily: `'Inter', system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif`,
      h4: { fontWeight: 700 },
      button: { textTransform: "none", fontWeight: 600 },
    },
  });