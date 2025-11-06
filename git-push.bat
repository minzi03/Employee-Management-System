@echo off
echo ========================================
echo       GIT PUSH TO YOUR BRANCH
echo ========================================
echo.

REM Kiểm tra Git status
echo [1/7] Checking Git status...
git status --porcelain >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Not a Git repository. Please initialize Git first.
    echo Run: git init
    pause
    exit /b 1
)
echo ✅ Git repository detected

REM Reset về trạng thái clean (loại bỏ node_modules changes)
echo [2/7] Cleaning up node_modules changes...
git checkout -- backend/node_modules/ >nul 2>&1
git checkout -- frontend/node_modules/ >nul 2>&1
git clean -fd backend/node_modules/ >nul 2>&1
git clean -fd frontend/node_modules/ >nul 2>&1
echo ✅ Node_modules changes cleaned

REM Add .gitignore
echo [3/7] Adding .gitignore...
git add .gitignore
echo ✅ .gitignore added

REM Add source code files
echo [4/7] Adding source code files...
git add backend/src/
git add backend/server.js
git add backend/package.json
git add frontend/src/
git add frontend/index.html
git add frontend/package.json
git add frontend/vite.config.js
echo ✅ Source code added

REM Add demo and setup files
echo [5/7] Adding demo and setup files...
git add *.md
git add *.bat
git add *.json
echo ✅ Demo files added

REM Commit changes
echo [6/7] Committing changes...
set /p commit_message="Enter commit message (or press Enter for default): "
if "%commit_message%"=="" set commit_message="feat: Add PDF export functionality with Vietnamese support"

git commit -m "%commit_message%"
if %errorlevel% neq 0 (
    echo ❌ Commit failed. Please check for errors.
    pause
    exit /b 1
)
echo ✅ Changes committed

REM Push to branch
echo [7/7] Pushing to your branch...
echo.
echo Available options:
echo 1. Push to current branch
echo 2. Push to new branch
echo 3. Show current branch info
echo.
set /p push_option="Choose option (1-3): "

if "%push_option%"=="1" (
    git push origin HEAD
    if %errorlevel% neq 0 (
        echo ❌ Push failed. You may need to set upstream branch.
        echo Try: git push --set-upstream origin [branch-name]
        pause
        exit /b 1
    )
    echo ✅ Pushed to current branch
) else if "%push_option%"=="2" (
    set /p new_branch="Enter new branch name: "
    git checkout -b %new_branch%
    git push --set-upstream origin %new_branch%
    if %errorlevel% neq 0 (
        echo ❌ Push to new branch failed
        pause
        exit /b 1
    )
    echo ✅ Pushed to new branch: %new_branch%
) else if "%push_option%"=="3" (
    echo Current branch info:
    git branch -v
    git remote -v
    echo.
    echo Run this script again to push
    pause
    exit /b 0
) else (
    echo ❌ Invalid option
    pause
    exit /b 1
)

echo.
echo ========================================
echo        🎉 PUSH COMPLETED! 🎉
echo ========================================
echo.
echo 📋 What was pushed:
echo    ✅ Source code (backend + frontend)
echo    ✅ PDF export functionality
echo    ✅ Demo scripts and documentation
echo    ✅ Setup instructions
echo.
echo 🚀 Your code is now on the remote repository!
echo.
pause