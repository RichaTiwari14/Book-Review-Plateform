import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from "./App.jsx";
import reportWebVitals from './reportWebVitals';
import ColorModeProvider from "./context/ColorModeContext";
import { SnackbarProvider } from "notistack";
import AuthProvider from "./context/AuthContext";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ColorModeProvider>
      <SnackbarProvider
        maxSnack={3}
        autoHideDuration={2500}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <AuthProvider>
    <App />
    </AuthProvider>
    </SnackbarProvider>
    </ColorModeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
