# Hệ thống Quản lý Đăng ký Tư vấn

## Tổng quan

Hệ thống này cho phép lưu trữ và quản lý các yêu cầu tư vấn từ khách hàng thông qua form "Đăng ký tư vấn" trên trang chủ.

## Cấu trúc

### 1. Type Definition

**File**: `types/consultation.ts`

```typescript
export interface Consultation {
  id?: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: number;
  status: "pending" | "contacted" | "completed";
}
```

### 2. API Route

**File**: `app/api/consultations/route.ts`

- **Endpoint**: `POST /api/consultations`
- **Chức năng**: Lưu dữ liệu đăng ký tư vấn vào Firebase Realtime Database
- **Validation**: Kiểm tra các trường bắt buộc (name, email, phone)
- **Response**: Trả về thông báo thành công hoặc lỗi

### 3. Frontend Form

**File**: `app/page.tsx`

- Form đã được cập nhật để gửi dữ liệu đến API
- Hiển thị trạng thái loading khi đang submit
- Hiển thị thông báo cảm ơn sau khi submit thành công
- Xử lý lỗi và hiển thị thông báo phù hợp

### 4. Admin Panel

**File**: `app/admin/consultations/page.tsx`

#### Tính năng:

1. **Thống kê tổng quan**

   - Tổng số đăng ký
   - Số đăng ký chờ xử lý
   - Số đăng ký đã liên hệ
   - Số đăng ký hoàn thành

2. **Tìm kiếm và lọc**

   - Tìm kiếm theo tên, email, số điện thoại
   - Lọc theo trạng thái (Tất cả, Chờ xử lý, Đã liên hệ, Hoàn thành)

3. **Quản lý đăng ký**

   - Xem danh sách đăng ký theo thời gian (mới nhất trước)
   - Cập nhật trạng thái trực tiếp từ dropdown
   - Xóa đăng ký (có xác nhận)
   - Hiển thị đầy đủ thông tin: thời gian, tên, email, phone, nội dung

4. **Navigation**
   - Nút chuyển đến trang Quản lý Blog
   - Nút Đăng xuất

## Cấu trúc dữ liệu Firebase

```
cambizco/
  └── consultations/
      ├── -NxxxxxxxxxxxxxxxxxX/
      │   ├── name: "Nguyễn Văn A"
      │   ├── email: "nguyenvana@example.com"
      │   ├── phone: "0123456789"
      │   ├── message: "Tôi muốn tư vấn về dịch vụ..."
      │   ├── createdAt: 1704672000000
      │   └── status: "pending"
      └── -NxxxxxxxxxxxxxxxxxY/
          └── ...
```

## Trạng thái (Status)

1. **pending** (Chờ xử lý)

   - Màu: Vàng
   - Mô tả: Đăng ký mới, chưa được xử lý

2. **contacted** (Đã liên hệ)

   - Màu: Xanh dương
   - Mô tả: Đã liên hệ với khách hàng

3. **completed** (Hoàn thành)
   - Màu: Xanh lá
   - Mô tả: Đã hoàn thành tư vấn

## Quy trình sử dụng

### Cho khách hàng:

1. Truy cập trang chủ
2. Cuộn xuống phần "Đăng ký tư vấn"
3. Điền thông tin: Tên, Email, Số điện thoại, Nội dung (tùy chọn)
4. Nhấn "Đăng ký miễn phí"
5. Nhận thông báo thành công

### Cho Admin:

1. Đăng nhập vào admin panel
2. Truy cập `/admin/consultations` hoặc nhấn nút "Quản lý Tư vấn"
3. Xem danh sách đăng ký mới
4. Lọc/tìm kiếm nếu cần
5. Cập nhật trạng thái khi xử lý:
   - Chuyển sang "Đã liên hệ" khi đã gọi điện/email
   - Chuyển sang "Hoàn thành" khi đã tư vấn xong
6. Xóa đăng ký nếu cần (spam, trùng lặp, etc.)

## Bảo mật

- Trang admin được bảo vệ bởi `ProtectedRoute`
- Yêu cầu đăng nhập để truy cập
- Sử dụng Firebase Authentication

## Tích hợp

- Tích hợp với Firebase Realtime Database
- Real-time updates: Dữ liệu tự động cập nhật khi có thay đổi
- Không cần refresh trang

## Lưu ý

- Form validation ở cả client và server
- Tất cả thời gian được lưu dưới dạng timestamp (milliseconds)
- Hiển thị thời gian theo định dạng Việt Nam
- Responsive design cho mobile và desktop
