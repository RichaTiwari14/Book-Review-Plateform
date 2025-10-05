import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Signup() {
  const { signup } = useAuth();
  const nav = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const submit = async (e) => {
    e.preventDefault();
    await signup(form.name, form.email, form.password);
    nav("/");
  };

  return (
    <form onSubmit={submit} style={{ maxWidth: 360, margin: "30px auto" }}>
      <h2>Signup</h2>
      <input placeholder="Name" onChange={e=>setForm({...form, name:e.target.value})} />
      <input placeholder="Email" onChange={e=>setForm({...form, email:e.target.value})} />
      <input placeholder="Password" type="password" onChange={e=>setForm({...form, password:e.target.value})} />
      <button type="submit">Create account</button>
      <p>Have an account? <Link to="/login">Login</Link></p>
    </form>
  );
}