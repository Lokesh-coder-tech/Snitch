import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import express from "express";
import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/product.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import cors from "cors";
import cookieParser from "cookie-parser"

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS configuration for both development and production
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://snitch-9ajg.onrender.com",
  process.env.FRONTEND_URL // Add frontend URL from environment variable for flexibility
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "DELETE", "PATCH"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
app.use(cookieParser());

// API routes MUST come before static files and SPA fallback
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);

// Static file serving
app.use(express.static('public'));

// SPA fallback - MUST be last to catch all unmatched routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

export default app;
