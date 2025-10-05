import { useEffect, useMemo, useState } from "react";
import { Container, Grid, Card, CardContent, CardActions, Typography, TextField, Button, Chip, Stack, Pagination, Rating, Skeleton } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import debounce from "lodash.debounce";
import useTitle from "../hooks/useTitle";
import API from "../API/axios"; // adjust path if your file is src/api/axios.js
import { MotionBox, MotionCard } from "../motion/Motion";
import { staggerContainer, fadeInUp } from "../motion/presets";
import { useMotionSafe } from "../motion/presets";
import Page from "../components/Page";
export default function BookList() {
  useTitle("Books • Book Review");
  const [state, setState] = useState({ data: [], pagination: { page: 1, pages: 1 } });
  const [page, setPage] = useState(1);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(true);

  const load = async (p = 1, search = "") => {
    setLoading(true);
    const { data } = await API.get(`/books`, { params: { page: p, limit: 5, q: search } });
    setState({ data: data.data, pagination: data.pagination || { page: p, pages: 1 } });
    setPage(p);
    setLoading(false);
  };
const safe = useMotionSafe();
  const debounced = useMemo(() => debounce((val) => load(1, val), 400), []);
  useEffect(() => { load(1, q); }, []); // first load
  useEffect(() => () => debounced.cancel(), [debounced]);

  return (
    <Page>
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} mb={3}>
        <TextField
          fullWidth size="small" label="Search by title/author"
          value={q}
          onChange={(e) => { setQ(e.target.value); debounced(e.target.value); }}
        />
      </Stack>

      {loading ? (
        <Grid container spacing={2}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <Skeleton variant="rectangular" height={150} sx={{ borderRadius: 2 }} />
            </Grid>
          ))}
        </Grid>
      ) : state.data.length === 0 ? (
        <MotionBox variants={fadeInUp(0.05)} {...safe}>
        <CardContent><Typography>No books found.</Typography></CardContent>
        </MotionBox>
      ) : (
        <MotionBox
variants={staggerContainer(0.06, 0.1)}
{...safe}
>
        <Grid container spacing={2}>
          {state.data.map((b,i) => (
            <Grid item xs={12} sm={6} md={4} key={b._id}>
                <MotionCard
variants={fadeInUp(i * 0.03)}
whileHover={{ y: -4, scale: 1.01 }}
transition={{ type: "spring", stiffness: 260, damping: 18 }}
>
                <CardContent>
                  <Typography variant="h6" fontWeight={700} gutterBottom>{b.title}</Typography>
                  <Typography variant="body2" color="text.secondary">by {b.author} {b.year ? `• ${b.year}` : ""}</Typography>
                  <Stack direction="row" spacing={1} alignItems="center" mt={1}>
                    <Rating size="small" value={Number(b.avgRating || b.averageRating || 0)} precision={0.1} readOnly />
                    <Typography variant="caption">({b.numReviews || 0})</Typography>
                  </Stack>
                  {b.genre && <Chip label={b.genre} size="small" sx={{ mt: 1 }} />}
                </CardContent>
                <CardActions>
                  <Button size="small" component={RouterLink} to={`/books/${b._id}`}>Details</Button>
                </CardActions>
              </MotionCard>
            </Grid>
          ))}
        </Grid>
        </MotionBox>
      )}

      <Stack alignItems="center" mt={3}>
        <Pagination
          page={page}
          count={state.pagination.pages || 1}
          onChange={(_, val) => load(val, q)}
          color="primary"
        />
      </Stack>
    </Container>
    </Page>
  );
}