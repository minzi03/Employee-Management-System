# 📚 Git Push Guide - Employee Assessment System

## 🚀 Cách 1: Push tự động (Khuyến nghị)

### ⚡ Sử dụng script tự động:
```cmd
git-push.bat
```

Script sẽ tự động:
- ✅ Dọn dẹp node_modules changes
- ✅ Add source code files
- ✅ Add demo và setup files  
- ✅ Commit với message
- ✅ Push lên branch của bạn

---

## 🔧 Cách 2: Push thủ công

### Bước 1: Dọn dẹp Git status
```cmd
# Reset node_modules changes (không cần thiết)
git checkout -- backend/node_modules/
git checkout -- frontend/node_modules/
git clean -fd backend/node_modules/
git clean -fd frontend/node_modules/
```

### Bước 2: Add files cần thiết
```cmd
# Add .gitignore
git add .gitignore

# Add source code
git add backend/src/
git add backend/server.js  
git add backend/package.json
git add frontend/src/
git add frontend/index.html
git add frontend/package.json

# Add demo files
git add *.md *.bat *.json
```

### Bước 3: Commit changes
```cmd
git commit -m "feat: Add PDF export functionality with Vietnamese support

- ✅ PDF export cho danh sách nhân viên
- ✅ Báo cáo chi tiết với thống kê
- ✅ Hỗ trợ font tiếng Việt UTF-8
- ✅ Demo scripts và documentation
- ✅ Setup instructions cho báo cáo"
```

### Bước 4: Push lên branch
```cmd
# Option 1: Push lên branch hiện tại
git push origin HEAD

# Option 2: Tạo branch mới và push
git checkout -b feature/pdf-export-vietnamese
git push --set-upstream origin feature/pdf-export-vietnamese

# Option 3: Push lên main/master (nếu có quyền)
git push origin main
```

---

## 📋 Files sẽ được push

### 🔧 Source Code:
```
backend/
├── src/
│   ├── db.js              # MongoDB connection
│   └── seed.js            # Sample data
├── server.js              # Main server
└── package.json           # Dependencies

frontend/
├── src/
│   ├── components/
│   │   ├── EmployeeManagement.jsx
│   │   ├── ExportButtons.jsx
│   │   └── ...
│   ├── pages/
│   │   ├── EmployeeDetail.jsx
│   │   ├── PDFTest.jsx
│   │   └── ...
│   ├── utils/
│   │   └── pdfExport.js   # PDF export functions
│   └── main.jsx
├── index.html
└── package.json
```

### 📄 Demo & Setup Files:
```
├── setup-and-run.bat      # Auto setup script
├── quick-start.bat        # Quick start script  
├── git-push.bat          # Git push script
├── README-SETUP.md       # Setup guide
├── DEMO-SCRIPT.md        # Demo flow script
├── demo-checklist.md     # Demo checklist
├── QUICK-REFERENCE.md    # Quick reference
├── package-info.json     # Project info
├── .gitignore           # Git ignore rules
└── GIT-GUIDE.md         # This file
```

---

## 🎯 Recommended Branch Names

### Theo tính năng:
- `feature/pdf-export-vietnamese`
- `feature/employee-management-pdf`
- `enhancement/pdf-reports`

### Theo mục đích:
- `demo/employee-assessment-system`
- `release/v1.0-demo-ready`
- `main` (nếu là branch chính)

---

## 🔍 Kiểm tra trước khi push

### ✅ Checklist:
- [ ] Code chạy được: `npm start` (backend) + `npm run dev` (frontend)
- [ ] PDF export hoạt động: Test xuất PDF tiếng Việt
- [ ] Demo scripts hoạt động: `setup-and-run.bat`
- [ ] Không push node_modules
- [ ] Không push .env files
- [ ] Commit message rõ ràng

### 🧪 Test nhanh:
```cmd
# Test backend
cd backend && npm start

# Test frontend (terminal mới)
cd frontend && npm run dev

# Test PDF export
# Vào http://localhost:5173/employee-management
# Click "📄 Xuất PDF" và "📊 Báo cáo Chi tiết"
```

---

## 🆘 Troubleshooting

### ❌ Lỗi thường gặp:

#### 1. "fatal: not a git repository"
```cmd
# Khởi tạo Git repository
git init
git remote add origin [YOUR_REPO_URL]
```

#### 2. "failed to push some refs"
```cmd
# Pull trước khi push
git pull origin main
# Hoặc force push (cẩn thận!)
git push --force-with-lease origin HEAD
```

#### 3. "large files detected"
```cmd
# Xóa node_modules khỏi Git
git rm -r --cached backend/node_modules/
git rm -r --cached frontend/node_modules/
git commit -m "Remove node_modules from tracking"
```

#### 4. "authentication failed"
```cmd
# Cấu hình Git credentials
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Hoặc sử dụng Personal Access Token
# GitHub Settings > Developer settings > Personal access tokens
```

### 🔧 Git commands hữu ích:
```cmd
# Xem status
git status

# Xem branch hiện tại
git branch -v

# Xem remote repositories  
git remote -v

# Xem commit history
git log --oneline -10

# Undo commit cuối (giữ changes)
git reset --soft HEAD~1

# Xem diff
git diff --name-only
```

---

## 🎯 Sau khi push thành công

### 📋 Checklist báo cáo:
- [ ] Code đã push lên repository
- [ ] README-SETUP.md có hướng dẫn rõ ràng
- [ ] Demo scripts hoạt động
- [ ] PDF export với tiếng Việt OK
- [ ] Có thể clone và chạy được ngay

### 🔗 Share với team:
```
Repository: [YOUR_REPO_URL]
Branch: [YOUR_BRANCH_NAME]
Demo URL: http://localhost:5173 (sau khi setup)
Setup: Chạy setup-and-run.bat
Login: supervisor / password123
```

---

**🎉 Chúc bạn push code thành công và demo tốt!**