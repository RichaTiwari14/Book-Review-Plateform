import express from "express";
import cors from "cors";
import morgan from "morgan";
import authRoutes from "./routes/authRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import { notFound, errorHandler } from "./middleware/error.js";

const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN || "*", credentials: true }));
app.use(express.json());
app.use(morgan("dev"));

app.get("/api/health", (req, res) => res.json({ ok: true }));

app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/reviews", reviewRoutes);

app.use(notFound);
app.use(errorHandler);
const allowedOrigins = [
process.env.CORS_ORIGIN,
"http://localhost:3000",
"http://localhost:5173", // future vite
].filter(Boolean);

app.use(cors({
origin: (origin, cb) => {
if (!origin) return cb(null, true); // Postman/health etc.
if (allowedOrigins.includes(origin)) return cb(null, true);
return cb(new Error("Not allowed by CORS"), false);
},
methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
allowedHeaders: ["Content-Type", "Authorization"],
credentials: false, // token header bhej rahe ho, cookies nahi; isliye false rehne do
}));

// Preflight handle
app.options("*", cors());

export default app;