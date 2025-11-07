# Employee Assessment System

Hệ thống đánh giá nhân viên với backend Express + MongoDB và frontend React + Vite.

## 🚀 Quick Start

### Local Development

**Backend:**
```bash
cd backend
npm install
npm run dev
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

## 📦 Deploy lên Vercel

Xem hướng dẫn chi tiết trong file: **[VERCEL_DEPLOYMENT_CHECKLIST.md](./VERCEL_DEPLOYMENT_CHECKLIST.md)**

### Tóm tắt nhanh:

1. **Tạo MongoDB Atlas** (miễn phí)
2. **Deploy Backend** trên Vercel với root directory `backend`
3. **Deploy Frontend** trên Vercel với root directory `frontend`
4. **Cấu hình Environment Variables** trên Vercel Dashboard

## 🔧 Tech Stack

- **Backend:** Node.js, Express, MongoDB, JWT
- **Frontend:** React, Vite, React Router
- **Deployment:** Vercel

## 📝 Environment Variables

### Backend (.env)
```
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=4000
CORS_ORIGIN=https://your-frontend-url.vercel.app
```

### Frontend (.env)
```
VITE_API_URL=https://your-backend-url.vercel.app
```

## 📚 Documentation

- [Vercel Deployment Checklist](./VERCEL_DEPLOYMENT_CHECKLIST.md)
- [Backend API Documentation](./backend/README.md) _(nếu có)_
- [Frontend Documentation](./frontend/README.md) _(nếu có)_
