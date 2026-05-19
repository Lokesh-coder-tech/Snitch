import express from "express";
import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/product.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import cors from "cors";
import cookieParser from "cookie-parser"

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PATCH"],
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(express.static('public'));

app.get("*name", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
export default app;
