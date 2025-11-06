// test-system.js - Script kiểm tra toàn bộ hệ thống
import "dotenv/config";

const API_BASE = process.env.VITE_API_URL || "http://localhost:4000/api";

async function testAPI(endpoint, options = {}) {
  try {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        ...options.headers
      },
      ...options
    });
    
    const data = await response.json().catch(() => ({}));
    
    return {
      success: response.ok,
      status: response.status,
      data: data
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
}

async function runSystemTest() {
  console.log("🧪 Starting System Test...\n");
  
  // Test 1: Health Check
  console.log("1️⃣ Testing API Health Check...");
  const healthCheck = await fetch("http://localhost:4000/");
  if (healthCheck.ok) {
    console.log("✅ API Server is running");
  } else {
    console.log("❌ API Server is not responding");
    return;
  }
  
  // Test 2: Login
  console.log("\n2️⃣ Testing Authentication...");
  const loginResult = await testAPI("/auth/login", {
    method: "POST",
    body: JSON.stringify({
      username: "manager",
      password: "123456"
    })
  });
  
  if (loginResult.success) {
    console.log("✅ Login successful");
    const token = loginResult.data.token;
    
    // Test 3: Get Current User
    console.log("\n3️⃣ Testing User Info...");
    const userResult = await testAPI("/auth/me", {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    if (userResult.success) {
      console.log("✅ User info retrieved:", userResult.data.fullName);
    } else {
      console.log("❌ Failed to get user info");
    }
    
    // Test 4: Get Employees
    console.log("\n4️⃣ Testing Employee List...");
    const employeesResult = await testAPI("/employees", {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    if (employeesResult.success) {
      console.log(`✅ Found ${employeesResult.data.length} employees`);
    } else {
      console.log("❌ Failed to get employees");
    }
    
    // Test 5: Get Criteria
    console.log("\n5️⃣ Testing Criteria...");
    const criteriaResult = await testAPI("/criteria", {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    if (criteriaResult.success) {
      console.log(`✅ Found ${criteriaResult.data.length} criteria`);
      
      // Test department-specific criteria
      const itCriteriaResult = await testAPI("/criteria?department=Engineering", {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (itCriteriaResult.success) {
        console.log(`✅ Found ${itCriteriaResult.data.length} criteria for Engineering department`);
      }
    } else {
      console.log("❌ Failed to get criteria");
    }
    
    // Test 6: Get Departments
    console.log("\n6️⃣ Testing Departments...");
    const deptResult = await testAPI("/criteria/departments", {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    if (deptResult.success) {
      console.log(`✅ Found departments:`, deptResult.data);
    } else {
      console.log("❌ Failed to get departments");
    }
    
    // Test 7: Get Assessments
    console.log("\n7️⃣ Testing Assessments...");
    if (employeesResult.success && employeesResult.data.length > 0) {
      const firstEmployee = employeesResult.data[0];
      const assessmentResult = await testAPI(`/assessments/employee/${firstEmployee._id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (assessmentResult.success) {
        console.log(`✅ Found ${assessmentResult.data.length} assessments for ${firstEmployee.fullName}`);
      } else {
        console.log("❌ Failed to get assessments");
      }
    }
    
  } else {
    console.log("❌ Login failed:", loginResult.error || loginResult.data.message);
  }
  
  console.log("\n🏁 System test completed!");
}

// Chạy test nếu server đang chạy
setTimeout(() => {
  runSystemTest().catch(console.error);
}, 1000);