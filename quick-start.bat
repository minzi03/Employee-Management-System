@echo off
title Employee Assessment System - Quick Start

echo ========================================
echo     🚀 QUICK START - DEMO READY 🚀
echo ========================================
echo.

REM Dừng processes cũ
echo [1/4] Stopping old processes...
taskkill /f /im node.exe >nul 2>&1
echo ✅ Old processes stopped

REM Khởi động backend
echo [2/4] Starting backend...
start "Backend" cmd /k "cd backend && npm start"
timeout /t 2 >nul

REM Khởi động frontend  
echo [3/4] Starting frontend...
start "Frontend" cmd /k "cd frontend && npm run dev"
timeout /t 3 >nul

REM Mở browser
echo [4/4] Opening browser...
timeout /t 5 >nul
start http://localhost:5173

echo.
echo ========================================
echo           🎉 READY FOR DEMO! 🎉
echo ========================================
echo.
echo 🔗 URLs:
echo    Frontend: http://localhost:5173
echo    Backend:  http://localhost:4000
echo.
echo 👤 Login:
echo    supervisor / password123
echo.
echo 📄 PDF Features Ready:
echo    ✅ Employee List Export
echo    ✅ Detailed Reports  
echo    ✅ Vietnamese Support
echo.
pause