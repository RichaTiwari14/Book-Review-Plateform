import { useEffect, useState } from "react";
import { Container, Card, CardContent, Typography, Stack, Rating, TextField, Button, Avatar, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { Link as RouterLink, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { enqueueSnackbar } from "notistack";
import useTitle from "../hooks/useTitle";
import API from "../API/axios";
import { MotionCard, MotionBox, MotionButton } from "../motion/Motion";
import { fadeInUp, staggerContainer } from "../motion/presets";
import { useMotionSafe } from "../motion/presets";
import Page from "../components/Page";
export default function BookDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const [book, setBook] = useState(null);
  const [review, setReview] = useState({ rating: 5, reviewText: "" });

  const load = async () => {
    const { data } = await API.get(`/books/${id}`);
    setBook(data);
    if (user) {
      const mine = (data.reviews || []).find(r => (r.userId?._id || r.user?._id) === user._id);
      if (mine) setReview({ rating: mine.rating, reviewText: mine.reviewText, _id: mine._id });
    }
  };
const safe = useMotionSafe();
  useEffect(() => { load(); }, [id]);
  useTitle(book ? `${book.title} • Book Review` : "Book • Book Review");

  const submit = async () => {
    try {
      await API.post(`/books/${id}/reviews`, review);
      enqueueSnackbar("Review saved", { variant: "success" });
      await load();
    } catch {
      enqueueSnackbar("Failed to save review", { variant: "error" });
    }
  };

  if (!book) return null;
  const canEdit = user && (book.addedBy?._id === user._id);

  return (
    <Page>
    <Container maxWidth="md" sx={{ py: 4 }}>
        <MotionBox variants={staggerContainer(0.06, 0.05)} {...safe}>
        <MotionCard variants={fadeInUp(0)} {...safe} sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h5" fontWeight={700}>{book.title}</Typography>
          <Typography color="text.secondary">by {book.author} {book.year ? `• ${book.year}` : ""} {book.genre ? `• ${book.genre}` : ""}</Typography>
          <Stack direction="row" spacing={1} alignItems="center" mt={1}>
            <Rating value={Number(book.averageRating || 0)} readOnly precision={0.1} />
            <Typography variant="body2">({book.reviewsCount || 0})</Typography>
            {canEdit && <Button component={RouterLink} to={`/books/${book._id}/edit`} size="small">Edit Book</Button>}
          </Stack>
          <Typography sx={{ mt: 2 }}>{book.description}</Typography>
        </CardContent>
      </MotionCard>
      <MotionCard variants={fadeInUp(0.02)} sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" fontWeight={700} gutterBottom>Reviews</Typography>
          {(book.reviews || []).length === 0 ? (
            <Typography color="text.secondary">No reviews yet.</Typography>
          ) : (
            <List>
              {(book.reviews || []).map(r => (
                <ListItem key={r._id} alignItems="flex-start" divider>
                  <ListItemAvatar><Avatar>{(r.userId?.name || r.user?.name || "U").slice(0,1)}</Avatar></ListItemAvatar>
                  <ListItemText
                    primary={<Stack direction="row" spacing={1} alignItems="center"><Rating size="small" value={r.rating} readOnly /> <Typography variant="caption">{r.userId?.name || r.user?.name}</Typography></Stack>}
                    secondary={r.reviewText}
                  />
                </ListItem>
              ))}
            </List>
          )}
        </CardContent>
      </MotionCard>

      {user && (
        <MotionCard variants={fadeInUp(0.06)}>
          <CardContent>
            <Typography variant="h6" fontWeight={700} gutterBottom>Your Review</Typography>
            <Stack spacing={2} maxWidth={600}>
              <Rating value={review.rating} onChange={(_, v) => setReview(s => ({ ...s, rating: v }))} />
              <TextField multiline minRows={3} placeholder="Share your thoughts..." value={review.reviewText} onChange={(e)=>setReview(s=>({...s, reviewText: e.target.value}))}/>
              <MotionButton
                variant="contained"
                whileTap={{ scale: 0.98 }}
                onClick={submit}
              >
                Save
              </MotionButton>
            </Stack>
          </CardContent>
        </MotionCard>
      )}
        
        </MotionBox>
    </Container>
    </Page>
  );
}