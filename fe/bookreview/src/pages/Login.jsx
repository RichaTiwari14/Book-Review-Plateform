import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const submit = async (e) => {
    e.preventDefault();
    await login(form.email, form.password);
    nav("/");
  };

  return (
    <form onSubmit={submit} style={{ maxWidth: 360, margin: "30px auto" }}>
      <h2>Login</h2>
      <input placeholder="Email" onChange={e=>setForm({...form, email:e.target.value})} />
      <input placeholder="Password" type="password" onChange={e=>setForm({...form, password:e.target.value})} />
      <button type="submit">Login</button>
      <p>No account? <Link to="/signup">Signup</Link></p>
    </form>
  );
}