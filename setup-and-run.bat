@echo off
echo ========================================
echo    EMPLOYEE ASSESSMENT SYSTEM SETUP
echo ========================================
echo.

REM Kiểm tra Node.js
echo [1/8] Checking Node.js installation...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js first.
    pause
    exit /b 1
)
echo ✅ Node.js is installed

REM Kiểm tra npm
echo [2/8] Checking npm installation...
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm is not installed. Please install npm first.
    pause
    exit /b 1
)
echo ✅ npm is installed

REM Dừng tất cả processes Node.js
echo [3/8] Stopping all Node.js processes...
taskkill /f /im node.exe >nul 2>&1
echo ✅ All Node.js processes stopped

REM Dọn dẹp cache và dependencies
echo [4/8] Cleaning cache and dependencies...
npm cache clean --force >nul 2>&1

REM Xóa node_modules và package-lock.json
if exist "backend\node_modules" (
    echo    - Removing backend node_modules...
    rmdir /s /q "backend\node_modules"
)
if exist "backend\package-lock.json" (
    echo    - Removing backend package-lock.json...
    del "backend\package-lock.json"
)
if exist "frontend\node_modules" (
    echo    - Removing frontend node_modules...
    rmdir /s /q "frontend\node_modules"
)
if exist "frontend\package-lock.json" (
    echo    - Removing frontend package-lock.json...
    del "frontend\package-lock.json"
)
echo ✅ Cache and dependencies cleaned

REM Cài đặt backend dependencies
echo [5/8] Installing backend dependencies...
cd backend
npm install
if %errorlevel% neq 0 (
    echo ❌ Failed to install backend dependencies
    pause
    exit /b 1
)
echo ✅ Backend dependencies installed
cd ..

REM Cài đặt frontend dependencies
echo [6/8] Installing frontend dependencies...
cd frontend
npm install
if %errorlevel% neq 0 (
    echo ❌ Failed to install frontend dependencies
    pause
    exit /b 1
)
echo ✅ Frontend dependencies installed
cd ..

REM Khởi động backend
echo [7/8] Starting backend server...
start "Backend Server" cmd /k "cd backend && npm start"
timeout /t 3 >nul

REM Khởi động frontend
echo [8/8] Starting frontend server...
start "Frontend Server" cmd /k "cd frontend && npm run dev"
timeout /t 3 >nul

echo.
echo ========================================
echo        🎉 SETUP COMPLETED! 🎉
echo ========================================
echo.
echo 🔗 Application URLs:
echo    Backend:  http://localhost:4000
echo    Frontend: http://localhost:5173
echo.
echo 📋 Available Pages:
echo    Login:           http://localhost:5173/login
echo    Dashboard:       http://localhost:5173/dashboard
echo    Employee Mgmt:   http://localhost:5173/employee-management
echo    Employee Detail: http://localhost:5173/employee-detail
echo    Criteria Admin:  http://localhost:5173/criteria-admin
echo.
echo 👤 Default Login Credentials:
echo    Supervisor: supervisor / password123
echo    Employee:   employee1 / password123
echo.
echo 📄 PDF Export Features:
echo    - Employee List Export (Simple & Detailed)
echo    - Employee Assessment Reports
echo    - Criteria Management Reports
echo.
echo ⚠️  Note: Wait 10-15 seconds for servers to fully start
echo    Then open http://localhost:5173 in your browser
echo.
pause