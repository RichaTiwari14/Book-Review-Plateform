import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../API/axios";

export default function BookList() {
  const [data, setData] = useState({ data: [], pagination: { page: 1, pages: 1 } });
  const [page, setPage] = useState(1);
  const [q, setQ] = useState("");

  const load = async (p = 1) => {
    const { data } = await api.get(`/books?page=${p}&limit=5&q=${q}`);
    setData(data);
    setPage(p);
  };

  useEffect(() => { load(1); }, [q]);

  return (
    <div style={{ maxWidth: 800, margin: "0 auto" }}>
      <h2>Books</h2>
      <input
        placeholder="Search title/author"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        style={{ width: "100%", marginBottom: 12 }}
      />
      <ul>
        {data.data.map((b) => (
          <li key={b._id}>
            <Link to={`/books/${b._id}`}>{b.title}</Link> — {b.author} — ⭐ {Number(b.avgRating || b.averageRating || 0).toFixed(1)} ({b.numReviews || 0})
          </li>
        ))}
      </ul>
      <div style={{ marginTop: 12 }}>
        <button disabled={page <= 1} onClick={() => load(page - 1)}>Prev</button>
        <span style={{ margin: "0 8px" }}> {page} / {data.pagination?.pages || data.totalPages || 1} </span>
        <button disabled={page >= (data.pagination?.pages || data.totalPages || 1)} onClick={() => load(page + 1)}>Next</button>
      </div>
    </div>
  );
}