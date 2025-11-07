# ✅ Checklist Deploy Vercel - Employee Assessment App

## 📋 Chuẩn bị trước khi deploy

### 1. Tài khoản & Cài đặt
- [ ] Tạo tài khoản Vercel tại [vercel.com](https://vercel.com)
- [ ] Cài đặt Vercel CLI (tùy chọn): `npm i -g vercel`
- [ ] Kết nối GitHub/GitLab với Vercel

### 2. Database MongoDB
- [ ] Tạo MongoDB Atlas account tại [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
- [ ] Tạo cluster mới (chọn Free tier)
- [ ] Tạo database user với username và password
- [ ] Whitelist IP: `0.0.0.0/0` (cho phép tất cả IP - production)
- [ ] Copy MongoDB connection string
- [ ] Thay thế `<username>`, `<password>`, `<cluster>` trong connection string

### 3. Environment Variables
- [ ] Chuẩn bị các biến môi trường sau:

#### Backend Environment Variables:
```
MONGO_URL=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-change-this
PORT=4000
```

#### Frontend Environment Variables:
```
VITE_API_URL=https://your-backend-url.vercel.app
```

---

## 🚀 Các bước Deploy

### Phương án 1: Deploy qua Vercel Dashboard (Khuyến nghị)

#### A. Deploy Backend
1. [ ] Vào [vercel.com/new](https://vercel.com/new)
2. [ ] Import repository của bạn
3. [ ] Chọn **Root Directory**: `backend`
4. [ ] Framework Preset: **Other**
5. [ ] Build Command: (để trống)
6. [ ] Output Directory: (để trống)
7. [ ] Install Command: `npm install`
8. [ ] Thêm Environment Variables:
   - [ ] `MONGO_URL`
   - [ ] `JWT_SECRET`
   - [ ] `PORT`
9. [ ] Click **Deploy**
10. [ ] Copy URL backend (ví dụ: `https://your-backend.vercel.app`)

#### B. Deploy Frontend
1. [ ] Vào [vercel.com/new](https://vercel.com/new)
2. [ ] Import cùng repository
3. [ ] Chọn **Root Directory**: `frontend`
4. [ ] Framework Preset: **Vite**
5. [ ] Build Command: `npm run build`
6. [ ] Output Directory: `dist`
7. [ ] Install Command: `npm install`
8. [ ] Thêm Environment Variables:
   - [ ] `VITE_API_URL` = URL backend từ bước A.10
9. [ ] Click **Deploy**

### Phương án 2: Deploy qua Vercel CLI

#### Backend:
```bash
cd backend
vercel --prod
```

#### Frontend:
```bash
cd frontend
vercel --prod
```

---

## 🔧 Cấu hình sau khi deploy

### 1. Cập nhật CORS trong Backend
- [ ] Mở file `backend/server.js`
- [ ] Cập nhật CORS origin:
```javascript
app.use(cors({ 
  origin: "https://your-frontend-url.vercel.app", 
  credentials: true 
}));
```
- [ ] Hoặc cho phép nhiều origins:
```javascript
app.use(cors({ 
  origin: [
    "http://localhost:5173",
    "https://your-frontend-url.vercel.app"
  ], 
  credentials: true 
}));
```
- [ ] Commit và push để redeploy

### 2. Cập nhật API URL trong Frontend
- [ ] Tạo file `frontend/.env.production`:
```
VITE_API_URL=https://your-backend-url.vercel.app
```
- [ ] Đảm bảo code frontend sử dụng `import.meta.env.VITE_API_URL`

### 3. Seed Database (nếu cần)
- [ ] Chạy seed script local với MongoDB Atlas connection string:
```bash
cd backend
MONGO_URL="your-atlas-connection-string" npm run seed
```

---

## ✅ Kiểm tra sau khi deploy

### Backend
- [ ] Truy cập `https://your-backend.vercel.app` → Thấy "Employee Assessment API OK"
- [ ] Test API endpoint: `https://your-backend.vercel.app/api/auth/login`
- [ ] Kiểm tra logs trong Vercel Dashboard

### Frontend
- [ ] Truy cập `https://your-frontend.vercel.app`
- [ ] Kiểm tra login/register hoạt động
- [ ] Kiểm tra các chức năng chính
- [ ] Mở DevTools → Network → Kiểm tra API calls

---

## 🐛 Troubleshooting

### Lỗi thường gặp:

#### 1. CORS Error
- [ ] Kiểm tra CORS origin trong `backend/server.js`
- [ ] Đảm bảo frontend URL được thêm vào whitelist

#### 2. MongoDB Connection Failed
- [ ] Kiểm tra connection string đúng format
- [ ] Kiểm tra IP whitelist trong MongoDB Atlas
- [ ] Kiểm tra username/password đúng

#### 3. Environment Variables không hoạt động
- [ ] Kiểm tra tên biến đúng (VITE_ prefix cho frontend)
- [ ] Redeploy sau khi thêm env vars
- [ ] Kiểm tra trong Vercel Dashboard → Settings → Environment Variables

#### 4. Build Failed
- [ ] Kiểm tra logs trong Vercel Dashboard
- [ ] Đảm bảo `package.json` có đầy đủ dependencies
- [ ] Test build local: `npm run build`

#### 5. API 404 Not Found
- [ ] Kiểm tra `vercel.json` routes configuration
- [ ] Kiểm tra API URL trong frontend code

---

## 📝 Ghi chú quan trọng

- ⚠️ **Không commit file `.env`** vào Git
- 🔒 Sử dụng JWT_SECRET mạnh cho production
- 💾 Backup database thường xuyên
- 📊 Monitor logs trong Vercel Dashboard
- 🔄 Mỗi lần push code, Vercel sẽ tự động redeploy

---

## 🎯 Custom Domain (Tùy chọn)

- [ ] Mua domain từ Namecheap, GoDaddy, etc.
- [ ] Vào Vercel Dashboard → Settings → Domains
- [ ] Thêm custom domain
- [ ] Cập nhật DNS records theo hướng dẫn Vercel
- [ ] Đợi DNS propagation (5-48 giờ)

---

## ✨ Hoàn thành!

Sau khi hoàn thành tất cả các bước trên, ứng dụng của bạn đã sẵn sàng trên Vercel! 🎉

**URLs:**
- Frontend: `https://your-frontend.vercel.app`
- Backend: `https://your-backend.vercel.app`
