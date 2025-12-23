# Hướng Dẫn Setup Blog System với Firebase & Cloudinary

## 📋 Tổng Quan

Hệ thống blog động với:

- **Firebase Firestore**: Lưu trữ bài viết
- **Cloudinary**: Upload và lưu trữ ảnh
- **Admin Panel**: Quản lý CRUD bài viết
- **Dynamic Routes**: Một trang blog hiển thị theo slug

---

## 🚀 Bước 1: Setup Firebase

### 1.1. Tạo Firebase Project

1. Truy cập: https://console.firebase.google.com/
2. Click "Add project" → Nhập tên project → Tạo project
3. Vào "Build" → "Firestore Database" → "Create database"
4. Chọn location (asia-southeast1) → Start in **production mode**

### 1.2. Tạo Firestore Collection

1. Trong Firestore, click "Start collection"
2. Collection ID: `blogPosts`
3. Thêm document đầu tiên (test):
   - Auto ID
   - Fields:
     - `title` (string): "Bài viết test"
     - `category` (string): "Tuyển dụng"
     - `description1` (string): "Nội dung test..."
     - `description2` (string): ""
     - `description3` (string): ""
     - `image1` (string): "https://via.placeholder.com/800x600"
     - `image2` (string): ""
     - `image3` (string): ""
     - `image4` (string): ""
     - `slug` (string): "bai-viet-test"
     - `createdAt` (timestamp): Now
     - `updatedAt` (timestamp): Now

### 1.3. Lấy Firebase Config

1. Vào Project Settings (⚙️ icon)
2. Scroll xuống "Your apps" → Click Web icon (</>)
3. Register app → Copy `firebaseConfig` object
4. Paste vào file `.env.local` (xem bước 3)

### 1.4. Setup Firestore Rules

Vào "Rules" tab, paste code này:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /blogPosts/{document=**} {
      allow read: if true;
      allow write: if true; // Sau này thêm authentication
    }
  }
}
```

Click "Publish"

---

## 🖼️ Bước 2: Setup Cloudinary

### 2.1. Tạo Cloudinary Account

1. Truy cập: https://cloudinary.com/users/register_free
2. Đăng ký tài khoản miễn phí

### 2.2. Lấy Credentials

1. Vào Dashboard
2. Copy:
   - Cloud Name
   - API Key
   - API Secret

### 2.3. Tạo Upload Preset

1. Vào Settings → Upload
2. Scroll xuống "Upload presets"
3. Click "Add upload preset"
4. Preset name: `cambiz_blog`
5. Signing Mode: **Unsigned**
6. Folder: `blog-posts`
7. Save

---

## ⚙️ Bước 3: Cấu Hình Environment Variables

Tạo file `.env.local` trong root project:

```env
# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_CLOUDINARY_API_KEY=123456789012345
CLOUDINARY_API_SECRET=your_api_secret
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=cambiz_blog
```

**Lưu ý**: Thay tất cả giá trị `your_...` bằng giá trị thực từ Firebase và Cloudinary!

---

## 📁 Cấu Trúc Files Đã Tạo

```
cambizco/
├── lib/
│   └── firebase.ts              # Firebase config
├── types/
│   └── blog.ts                  # TypeScript interfaces
├── app/
│   ├── admin/
│   │   └── blog/
│   │       └── page.tsx         # Trang admin quản lý blog
│   └── blog/
│       ├── page.tsx             # Danh sách blog (đã update)
│       └── [slug]/
│           └── page.tsx         # Trang blog động
└── ENV_TEMPLATE.txt             # Template env variables
```

---

## 🎯 Cách Sử Dụng

### Admin Panel

1. Truy cập: `http://localhost:3000/admin/blog`
2. Điền form:
   - Danh mục: "Tuyển dụng", "Dịch vụ", "Sự kiện"
   - Tiêu đề
   - 3 mô tả (description)
   - Upload 4 ảnh qua Cloudinary
3. Click "Tạo Mới"

### Blog List

- Truy cập: `http://localhost:3000/blog`
- Hiển thị tất cả bài viết từ Firebase
- Phân trang tự động

### Blog Detail

- URL: `http://localhost:3000/blog/[slug]`
- Ví dụ: `http://localhost:3000/blog/bai-viet-test`
- Hiển thị đầy đủ nội dung + 4 ảnh

---

## 🔧 Troubleshooting

### Lỗi: "Cannot find module 'firebase'"

```bash
npm install firebase next-cloudinary --legacy-peer-deps
```

### Lỗi: "Firebase not initialized"

- Kiểm tra file `.env.local` đã tạo chưa
- Restart dev server: `npm run dev`

### Lỗi: "Cloudinary upload failed"

- Kiểm tra Upload Preset đã set **Unsigned**
- Kiểm tra `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET` trong `.env.local`

### Blog posts không hiển thị

- Kiểm tra Firestore có collection `blogPosts` chưa
- Kiểm tra Firestore Rules cho phép read

---

## 📝 Notes

1. **Slug tự động**: Slug được tạo tự động từ title (bỏ dấu, lowercase, thay space bằng -)
2. **Ảnh không bắt buộc**: Chỉ image1 là quan trọng, các ảnh khác có thể để trống
3. **Mô tả không bắt buộc**: description2 và description3 có thể để trống
4. **Security**: Hiện tại chưa có authentication cho admin. Cần thêm Firebase Auth sau!

---

## 🎨 Tùy Chỉnh

### Thay đổi màu category

Sửa trong `app/blog/page.tsx`:

```tsx
const getCategoryColor = (category: string) => {
  const colors: { [key: string]: string } = {
    "Tuyển dụng": "bg-orange-500", // Đổi màu ở đây
    "Dịch vụ": "bg-blue-600",
    "Sự kiện": "bg-green-600",
    "Category mới": "bg-purple-600", // Thêm category mới
  };
  return colors[category] || "bg-gray-600";
};
```

### Thay đổi số bài viết mỗi trang

Sửa trong `app/blog/page.tsx`:

```tsx
const postsPerPage = 5; // Đổi số này
```

---

## ✅ Checklist Setup

- [ ] Tạo Firebase project
- [ ] Tạo Firestore database
- [ ] Tạo collection `blogPosts`
- [ ] Setup Firestore Rules
- [ ] Lấy Firebase config
- [ ] Tạo Cloudinary account
- [ ] Lấy Cloudinary credentials
- [ ] Tạo Upload Preset (unsigned)
- [ ] Tạo file `.env.local`
- [ ] Paste tất cả credentials vào `.env.local`
- [ ] Restart dev server
- [ ] Test tạo bài viết mới tại `/admin/blog`
- [ ] Test xem bài viết tại `/blog`
- [ ] Test xem chi tiết bài viết tại `/blog/[slug]`

---

## 🆘 Cần Hỗ Trợ?

Nếu gặp vấn đề, check:

1. Console browser (F12) xem có lỗi gì
2. Terminal xem có lỗi server-side
3. Firebase Console → Firestore → Xem data có đúng không
4. Cloudinary Console → Media Library → Xem ảnh đã upload chưa

Good luck! 🚀
