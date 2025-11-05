import "dotenv/config.js";
import bcrypt from "bcryptjs";
import { connectDB } from "./db.js";
import User from "./models/User.js";

(async () => {
  await connectDB(process.env.MONGO_URL);
  await User.deleteMany({ username: { $in: ["manager", "sarah.johnson"] } });

  const manager = await User.create({
    username: "manager",
    passwordHash: await bcrypt.hash("123456", 10),
    role: "supervisor",
    fullName: "Quản lý Hệ thống",
    email: "manager@company.com",
    department: "Engineering",
    position: "Engineering Manager"
  });

  const employee = await User.create({
    username: "sarah.johnson",
    passwordHash: await bcrypt.hash("123456", 10),
    role: "employee",
    fullName: "Sarah Johnson",
    email: "sarah.johnson@company.com",
    department: "Engineering",
    position: "Senior Software Engineer"
  });

  console.log("✅ Seeded:", { manager: manager.username, employee: employee.username });
  process.exit(0);
})();
