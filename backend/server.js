import "dotenv/config.js";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import { connectDB } from "./src/db.js";
import authRoutes from "./src/routes/auth.js";
import employeeRoutes from "./src/routes/employees.js";
import assessmentRoutes from "./src/routes/assessments.js";

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (_, res) => res.send("Employee Assessment API OK"));

app.use("/api/auth", authRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/assessments", assessmentRoutes);

const port = process.env.PORT || 4000;

connectDB(process.env.MONGO_URL)
  .then(() => app.listen(port, () => console.log(`🚀 API running at http://localhost:${port}`)))
  .catch((e) => {
    console.error("❌ Mongo connection failed:", e.message);
    process.exit(1);
  });
  