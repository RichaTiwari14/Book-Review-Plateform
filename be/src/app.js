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
process.env.CORS_ORIGIN, // e.g. http://localhost:3000
"http://localhost:3000",
"http://localhost:5173",
].filter(Boolean);

const corsOptions = {
origin: (origin, cb) => {
if (!origin) return cb(null, true); // Postman/health
if (allowedOrigins.includes(origin)) return cb(null, true);
return cb(new Error("Not allowed by CORS"));
},
methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
allowedHeaders: ["Content-Type", "Authorization"],
credentials: false, // cookies nahi bhej rahe to false hi rakho
};

app.use(cors(corsOptions)); 

export default app;