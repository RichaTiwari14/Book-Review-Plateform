import { AppBar, Toolbar, Typography, IconButton, Button, Box, Container } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { DarkMode, LightMode, LibraryBooks } from "@mui/icons-material";
import { useAuth } from "../context/AuthContext";
import { useColorMode } from "../context/ColorModeContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { mode, toggle } = useColorMode();
  const nav = useNavigate();

  return (
    <AppBar position="sticky" elevation={0} color="transparent" sx={{ borderBottom: 1, borderColor: "divider" }}>
      <Container maxWidth="lg">
        <Toolbar sx={{ gap: 2 }}>
          <LibraryBooks color="primary" />
          <Typography
            component={RouterLink}
            to="/"
            variant="h6"
            color="text.primary"
            sx={{ textDecoration: "none", flexGrow: 1, fontWeight: 700 }}
          >
            Book Review
          </Typography>

          <IconButton onClick={toggle} color="inherit" sx={{ mr: 1 }}>
            {mode === "dark" ? <LightMode /> : <DarkMode />}
          </IconButton>

          {user ? (
            <Box sx={{ display: "flex", gap: 1 }}>
              <Button variant="outlined" size="small" component={RouterLink} to="/books/new">Add Book</Button>
              <Button
                variant="contained"
                size="small"
                onClick={() => { logout(); nav("/login"); }}
              >
                Logout
              </Button>
            </Box>
          ) : (
            <Box sx={{ display: "flex", gap: 1 }}>
              <Button size="small" component={RouterLink} to="/login">Login</Button>
              <Button variant="contained" size="small" component={RouterLink} to="/signup">Sign up</Button>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}