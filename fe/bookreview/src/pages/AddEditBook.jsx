import { useEffect, useState } from "react";
import { Container, Paper, Typography, TextField, Button, Stack } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import API from "../API/axios";
import useTitle from "../hooks/useTitle";

export default function AddEditBook() {
  const { id } = useParams();
  const nav = useNavigate();
  const editing = Boolean(id);
  const [form, setForm] = useState({ title:"", author:"", description:"", genre:"", year:"" });

  useTitle(editing ? "Edit Book • Book Review" : "Add Book • Book Review");

  useEffect(() => {
    if (editing) {
      API.get(`/books/${id}`).then(({data}) => {
        const { title, author, description, genre, year } = data;
        setForm({ title, author, description: description || "", genre: genre || "", year: year || "" });
      });
    }
  }, [id]);

  const submit = async (e) => {
    e.preventDefault();
    try {
      if (editing) await API.put(`/books/${id}`, form);
      else await API.post(`/books`, form);
      enqueueSnackbar(editing ? "Book updated" : "Book created", { variant: "success" });
      nav("/");
    } catch (e) {
      enqueueSnackbar(e?.response?.data?.message || "Failed", { variant: "error" });
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h6" fontWeight={700} mb={2}>{editing ? "Edit" : "Add"} Book</Typography>
        <form onSubmit={submit}>
          <Stack spacing={2}>
            <TextField label="Title" value={form.title} onChange={e=>setForm(s=>({...s, title: e.target.value}))} />
            <TextField label="Author" value={form.author} onChange={e=>setForm(s=>({...s, author: e.target.value}))} />
            <TextField label="Genre" value={form.genre} onChange={e=>setForm(s=>({...s, genre: e.target.value}))} />
            <TextField label="Year" type="number" value={form.year} onChange={e=>setForm(s=>({...s, year: e.target.value}))} />
            <TextField label="Description" multiline minRows={3} value={form.description} onChange={e=>setForm(s=>({...s, description: e.target.value}))} />
            <Button type="submit" variant="contained">{editing ? "Update" : "Create"}</Button>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
}