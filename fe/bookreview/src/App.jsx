import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthProvider from "./context/AuthContext.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Navbar from "./components/Navbar.jsx";

import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import BookList from "./pages/BookList.jsx";
import BookDetails from "./pages/BookDetails.jsx";
import AddEditBook from "./pages/AddEditBook.jsx";
import NotFound from "./pages/NotFound.jsx";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<BookList />} />
          <Route path="/books/:id" element={<BookDetails />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/books/new" element={<AddEditBook />} />
            <Route path="/books/:id/edit" element={<AddEditBook />} />
          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}