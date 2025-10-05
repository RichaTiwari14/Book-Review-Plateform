import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  return (
    <nav style={{ padding: 12, borderBottom: "1px solid #ddd", marginBottom: 16 }}>
      <Link to="/">Books</Link>{" | "}
      {user ? (
        <>
          <Link to="/books/new">Add Book</Link>{" | "}
          <button onClick={logout} style={{ marginLeft: 8 }}>Logout</button>
          <span style={{ marginLeft: 8 }}>({user.name})</span>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>{" | "}
          <Link to="/signup">Signup</Link>
        </>
      )}
    </nav>
  );
}