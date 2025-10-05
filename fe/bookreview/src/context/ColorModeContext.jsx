import { createContext, useContext, useMemo, useState } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { getTheme } from "../theme/theme";

const ColorModeCtx = createContext({ mode: "light", toggle: () => {} });
export const useColorMode = () => useContext(ColorModeCtx);

export default function ColorModeProvider({ children }) {
  const [mode, setMode] = useState(localStorage.getItem("mode") || "light");

  const value = useMemo(
    () => ({
      mode,
      toggle: () => {
        const next = mode === "light" ? "dark" : "light";
        setMode(next);
        localStorage.setItem("mode", next);
      },
    }),
    [mode]
  );

  const theme = useMemo(() => getTheme(mode), [mode]);

  return (
    <ColorModeCtx.Provider value={value}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeCtx.Provider>
  );
}