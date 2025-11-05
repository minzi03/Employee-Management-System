import { Router } from "express";
import Assessment from "../models/Assessment.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

// POST /api/assessments (Supervisor tạo đánh giá)
router.post("/", requireAuth(["supervisor"]), async (req, res) => {
  const data = { ...req.body, supervisor: req.user._id };
  const doc = await Assessment.create(data);
  res.status(201).json(doc);
});

// GET /api/assessments/me (Employee xem báo cáo của chính mình)
router.get("/me", requireAuth(["employee"]), async (req, res) => {
  const items = await Assessment.find({ employee: req.user._id }).sort("-createdAt").lean();
  res.json(items);
});

// GET /api/assessments/employee/:id (Supervisor xem báo cáo của 1 nhân viên)
router.get("/employee/:id", requireAuth(["supervisor"]), async (req, res) => {
  const items = await Assessment.find({ employee: req.params.id }).sort("-createdAt").lean();
  res.json(items);
});

export default router;
