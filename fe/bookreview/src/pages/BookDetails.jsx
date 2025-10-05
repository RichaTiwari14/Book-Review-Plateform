import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../API/axios";
import { useAuth } from "../context/AuthContext";

export default function BookDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const [book, setBook] = useState(null);
  const [review, setReview] = useState({ rating: 5, reviewText: "" });

  const load = async () => {
    const { data } = await api.get(`/books/${id}`);
    setBook(data);
    if (user) {
      const mine = (data.reviews || []).find(r => r.userId?._id === user._id || r.user?._id === user._id);
      if (mine) setReview({ rating: mine.rating, reviewText: mine.reviewText, _id: mine._id });
    }
  };

  useEffect(() => { load(); }, [id]);

  const saveReview = async (e) => {
    e.preventDefault();
    await api.post(`/books/${id}/reviews`, review);
    await load();
  };

  const deleteReview = async (rid) => {
    await api.delete(`/reviews/${rid}`); // backend route: PUT/DELETE /api/reviews/:id
    await load();
  };

  if (!book) return <div>Loading...</div>;
  const canEdit = user && (book.addedBy?._id === user._id);

  return (
    <div style={{ maxWidth: 800, margin: "0 auto" }}>
      <h2>{book.title}</h2>
      <p>by {book.author} | {book.genre} | {book.year}</p>
      <p>{book.description}</p>
      <p>⭐ {Number(book.averageRating || 0).toFixed(1)} ({book.reviewsCount || 0} reviews)</p>
      {canEdit && <Link to={`/books/${book._id}/edit`}>Edit Book</Link>}

      <h3>Reviews</h3>
      {(book.reviews || []).map(r => (
        <div key={r._id} style={{ borderTop: "1px solid #eee", padding: "8px 0" }}>
          <b>{r.userId?.name || r.user?.name || "User"}</b> — {r.rating}★
          <p>{r.reviewText}</p>
          {(user && (r.userId?._id === user._id || r.user?._id === user._id)) && (
            <button onClick={() => deleteReview(r._id)}>Delete</button>
          )}
        </div>
      ))}

      {user && (
        <form onSubmit={saveReview} style={{ marginTop: 16 }}>
          <h4>Your Review</h4>
          <input type="number" min="1" max="5"
            value={review.rating}
            onChange={(e)=>setReview({...review, rating: Number(e.target.value)})}
          />
          <textarea
            value={review.reviewText}
            onChange={(e)=>setReview({...review, reviewText: e.target.value})}
            style={{ display: "block", width: "100%", minHeight: 80, marginTop: 8 }}
          />
          <button type="submit">Save Review</button>
        </form>
      )}
    </div>
  );
}