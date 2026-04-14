import express from "express";
import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/product.routes.js";
import cors from "cors";
import cookieParser from "cookie-parser"

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
export default app;
