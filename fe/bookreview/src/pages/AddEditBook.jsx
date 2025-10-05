import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../API/axios";

export default function AddEditBook() {
  const { id } = useParams();
  const nav = useNavigate();
  const editing = Boolean(id);
  const [form, setForm] = useState({ title: "", author: "", description: "", genre: "", year: "" });

  useEffect(() => {
    if (editing) {
      api.get(`/books/${id}`).then(({ data }) => {
        const { title, author, description, genre, year } = data;
        setForm({ title, author, description: description || "", genre: genre || "", year: year || "" });
      });
    }
  }, [id]);

  const submit = async (e) => {
    e.preventDefault();
    if (editing) await api.put(`/books/${id}`, form);
    else await api.post(`/books`, form);
    nav("/");
  };

  return (
    <form onSubmit={submit} style={{ maxWidth: 600, margin: "20px auto" }}>
      <h2>{editing ? "Edit" : "Add"} Book</h2>
      <input placeholder="Title" value={form.title} onChange={e=>setForm({...form, title: e.target.value})} />
      <input placeholder="Author" value={form.author} onChange={e=>setForm({...form, author: e.target.value})} />
      <input placeholder="Genre" value={form.genre} onChange={e=>setForm({...form, genre: e.target.value})} />
      <input placeholder="Year" type="number" value={form.year} onChange={e=>setForm({...form, year: e.target.value})} />
      <textarea placeholder="Description" value={form.description} onChange={e=>setForm({...form, description: e.target.value})} />
      <button type="submit">{editing ? "Update" : "Create"}</button>
    </form>
  );
}