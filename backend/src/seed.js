// backend/src/seed.js
import "dotenv/config";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import { connectDB } from "./db.js";
import User from "./models/User.js";
import Assessment from "./models/Assessment.js";
import Criteria from "./models/Criteria.js";

(async () => {
  try {
    console.log("⏳ Connecting to MongoDB...");
    await connectDB(process.env.MONGO_URL);

    // =========================
    // 🔄 RESET EXISTING DATA
    // =========================
    console.log("⏳ Resetting database...");
    await Promise.all([
      User.deleteMany({}),
      Assessment.deleteMany({}),
      Criteria.deleteMany({}),
    ]);
    console.log("✅ Cleared old data");

    // =========================
    // 👥 CREATE USERS
    // =========================
    const employeesData = [
      [
        "sarah.johnson",
        "Sarah Johnson",
        "Engineering",
        "Senior Software Engineer",
      ],
      ["michael.chen", "Michael Chen", "Product", "Product Manager"],
      ["emma.nguyen", "Emma Nguyen", "HR", "HR Specialist"],
      ["minh.tran", "Minh Tran", "Marketing", "Marketing Executive"],
      ["david.pham", "David Pham", "Engineering", "Backend Developer"],
      ["anna.le", "Anna Le", "Engineering", "Frontend Developer"],
      ["peter.vo", "Peter Vo", "Sales", "Sales Executive"],
      ["lisa.ho", "Lisa Ho", "Finance", "Accountant"],
      ["kelly.bui", "Kelly Bui", "Marketing", "Content Specialist"],
      ["tommy.ngo", "Tommy Ngo", "IT", "System Support"],
      ["phuong.tran", "Phuong Tran", "Product", "Product Analyst"],
      ["vinh.do", "Vinh Do", "Engineering", "DevOps Engineer"],
    ];

    const users = [
      {
        username: "manager",
        passwordHash: await bcrypt.hash("123456", 10),
        role: "supervisor",
        fullName: "Quản lý Hệ thống",
        email: "manager@company.com",
        department: "Engineering",
        position: "Engineering Manager",
      },
      ...employeesData.map(([username, fullName, dept, position]) => ({
        username,
        passwordHash: bcrypt.hashSync("123456", 10),
        role: "employee",
        fullName,
        email: `${username}@company.com`,
        department: dept,
        position,
      })),
    ];

    const createdUsers = await User.insertMany(users);
    const manager = createdUsers.find((u) => u.role === "supervisor");
    const employees = createdUsers.filter((u) => u.role === "employee");

    console.log(`✅ Created ${employees.length} employees and 1 supervisor`);

    // =========================
    // 🧱 CREATE CRITERIA (version 1)
    // =========================
    const criteriaSet = [
      {
        code: "C1",
        name: "Kỹ năng chuyên môn",
        description: "Hiểu biết kỹ thuật, giải pháp chuyên sâu",
        version: 1,
      },
      {
        code: "C2",
        name: "Giao tiếp",
        description: "Khả năng diễn đạt và lắng nghe",
        version: 1,
      },
      {
        code: "C3",
        name: "Làm việc nhóm",
        description: "Hợp tác, hỗ trợ, tôn trọng đồng nghiệp",
        version: 1,
      },
      {
        code: "C4",
        name: "Giải quyết vấn đề",
        description: "Phân tích, đánh giá và xử lý tình huống",
        version: 1,
      },
      {
        code: "C5",
        name: "Chủ động sáng tạo",
        description: "Đề xuất, cải tiến, tìm kiếm giải pháp mới",
        version: 1,
      },
    ];

    await Criteria.insertMany(criteriaSet);
    console.log(`✅ Seeded ${criteriaSet.length} criteria (version 1)`);

    // =========================
    // 📊 CREATE ASSESSMENTS DATA
    // =========================
    const cycles = [
      "Q1 2024",
      "Q2 2024",
      "Q3 2024",
      "Q4 2024",
      "Q1 2025",
      "Q2 2025",
      "Q3 2025",
      "Q4 2025",
    ];

    const criteriaTemplate = [
      { key: "technical", label: "Kỹ năng chuyên môn" },
      { key: "communication", label: "Giao tiếp" },
      { key: "teamwork", label: "Làm việc nhóm" },
      { key: "problem", label: "Giải quyết vấn đề" },
      { key: "initiative", label: "Chủ động sáng tạo" },
    ];

    const genCriteria = () =>
      criteriaTemplate.map((c) => ({
        ...c,
        score: +(Math.random() * (5 - 2.5) + 2.5).toFixed(1),
      }));

    console.log("📈 Seeding assessments...");

    const assessments = [];

    for (const emp of employees) {
      for (const cycle of cycles) {
        const overallScore = +(Math.random() * (5 - 2.6) + 2.6).toFixed(1);

        assessments.push({
          employee: emp._id,
          supervisor: manager._id,
          period: "quarterly",
          cycleLabel: cycle,
          overall: overallScore,
          comment: "Nhân viên làm việc tốt, có tinh thần trách nhiệm.",
          criteria: genCriteria(),
          nextGoals: "Tiếp tục cải thiện kỹ năng và phát triển nghề nghiệp.",
        });
      }
    }

    // Bulk insert for performance
    await Assessment.insertMany(assessments);
    console.log(`✅ Inserted ${assessments.length} assessments`);

    // =========================
    // ✅ DONE
    // =========================
    console.log("🌱 Database seeding completed successfully!");
    console.log("🔐 Login with: username: manager | password: 123456");
  } catch (err) {
    console.error("❌ Error while seeding database:", err);
  } finally {
    await mongoose.connection.close();
    console.log("🔌 MongoDB connection closed");
    process.exit(0);
  }
})();
  