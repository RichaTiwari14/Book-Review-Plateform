import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute() {
const { user, initializing } = useAuth();
const location = useLocation();

if (initializing) return null; // or a loader

return user
? <Outlet />
: <Navigate to="/login" replace state={{ from: location }} />;
}