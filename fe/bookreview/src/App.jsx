import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import BookList from "./pages/BookList";
import BookDetails from "./pages/BookDetails";
import AddEditBook from "./pages/AddEditBook";

function AnimatedRoutes() {
const location = useLocation();
return (
<AnimatePresence mode="wait">
<Routes location={location} key={location.pathname}>
<Route path="/" element={<BookList />} />
<Route path="/books/:id" element={<BookDetails />} />
<Route element={<ProtectedRoute />}>
<Route path="/books/new" element={<AddEditBook />} />
<Route path="/books/:id/edit" element={<AddEditBook />} />
</Route>
<Route path="/login" element={<Login />} />
<Route path="/signup" element={<Signup />} />
</Routes>
</AnimatePresence>
);
}

export default function App() {
return (
<BrowserRouter>
<Navbar />
<AnimatedRoutes />
</BrowserRouter>
);
}