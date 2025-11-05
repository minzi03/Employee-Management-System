import mongoose from "mongoose";

const AssessmentSchema = new mongoose.Schema(
  {
    employee: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    supervisor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    period: { type: String, enum: ["biweekly", "monthly", "quarterly", "yearly"], required: true },
    cycleLabel: { type: String, required: true }, // ví dụ: "Q4 2024"
    criteria: [
      {
        key: String,           // "technical", "communication", ...
        label: String,         // "Kỹ năng chuyên môn", ...
        score: { type: Number, min: 0, max: 5 }
      }
    ],
    comment: String,
    nextGoals: String,
    overall: { type: Number, min: 0, max: 5 }
  },
  { timestamps: true }
);

export default mongoose.model("Assessment", AssessmentSchema);
