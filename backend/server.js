// backend/server.js
import "dotenv/config"; // Tự động load biến môi trường từ .env
import express from "express";
import cors from "cors";
import morgan from "morgan";
import { connectDB } from "./src/db.js";

// Import các route
import authRoutes from "./src/routes/auth.js";
import employeeRoutes from "./src/routes/employees.js";
import assessmentRoutes from "./src/routes/assessments.js";
import criteriaRoutes from "./src/routes/criteria.js";

const app = express();

// =====================
// 🧩 Middleware
// =====================
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json({ limit: "5mb" })); // hạn chế payload lớn
app.use(morgan("dev")); // log HTTP request

// =====================
// ✅ Health check route
// =====================
app.get("/", (_, res) =>
  res.status(200).send("✅ Employee Assessment API running")
);

// =====================
// 🧠 API routes
// =====================
app.use("/api/auth", authRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/assessments", assessmentRoutes);
app.use("/api/criteria", criteriaRoutes);

// =====================
// ⚠️ Error handler (global)
// =====================
app.use((err, req, res, next) => {
  console.error("🔥 Uncaught error:", err);
  res
    .status(err.status || 500)
    .json({ message: err.message || "Internal Server Error" });
});

// =====================
// 🚀 Server start
// =====================
const PORT = process.env.PORT || 4000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server is running at http://localhost:${PORT}`);
      console.log("📦 MongoDB connected successfully");
    });
  })
  .catch((err) => {
    console.error("❌ Failed to connect to MongoDB:", err);
    process.exit(1); // Thoát nếu không kết nối được DB
  });
