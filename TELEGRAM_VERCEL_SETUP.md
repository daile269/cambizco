# Hướng dẫn cấu hình Telegram trên Vercel

## Vấn đề

Telegram notification hoạt động tốt trên local nhưng không gửi tin nhắn khi deploy lên Vercel.

## Nguyên nhân

Environment variables (`TELEGRAM_BOT_TOKEN` và `TELEGRAM_CHAT_ID`) chưa được cấu hình trên Vercel.

## Giải pháp

### Bước 1: Lấy thông tin Telegram Bot

#### 1.1. Lấy Bot Token

1. Mở Telegram, tìm kiếm `@BotFather`
2. Gửi lệnh `/newbot` hoặc `/mybots` (nếu đã có bot)
3. Copy **Bot Token** (dạng: `1234567890:ABCdefGHIjklMNOpqrsTUVwxyz`)

#### 1.2. Lấy Chat ID của Group

1. Thêm bot vào group Telegram của bạn
2. Gửi một tin nhắn bất kỳ trong group
3. Mở trình duyệt, truy cập:

   ```
   https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates
   ```

   (Thay `<YOUR_BOT_TOKEN>` bằng token ở bước 1.1)

4. Tìm trong JSON response phần `"chat":{"id":-1234567890,...}`
5. Copy số **Chat ID** (thường là số âm cho group, ví dụ: `-1001234567890`)

### Bước 2: Cấu hình trên Vercel

1. Đăng nhập vào [Vercel Dashboard](https://vercel.com/dashboard)
2. Chọn project của bạn (cambizco)
3. Vào **Settings** → **Environment Variables**
4. Thêm 2 biến sau:

   | Name                 | Value                     | Environment                      |
   | -------------------- | ------------------------- | -------------------------------- |
   | `TELEGRAM_BOT_TOKEN` | `1234567890:ABCdefGHI...` | Production, Preview, Development |
   | `TELEGRAM_CHAT_ID`   | `-1001234567890`          | Production, Preview, Development |

5. Click **Save**

### Bước 3: Redeploy

**QUAN TRỌNG**: Environment variables chỉ được load khi deploy mới.

Có 2 cách:

#### Cách 1: Redeploy từ Dashboard

1. Vào tab **Deployments**
2. Click vào deployment mới nhất
3. Click nút **⋯** (3 chấm) → **Redeploy**

#### Cách 2: Push code mới

```bash
git add .
git commit -m "Add Telegram logging"
git push
```

### Bước 4: Kiểm tra Logs

1. Vào **Vercel Dashboard** → Project → **Logs**
2. Gửi một form tư vấn trên website
3. Xem logs, bạn sẽ thấy một trong các message sau:

   ✅ **Thành công:**

   ```
   📤 Sending Telegram notification...
   ✅ Telegram notification sent successfully
   ```

   ❌ **Chưa cấu hình:**

   ```
   ⚠️ Telegram not configured: {
     hasBotToken: false,
     hasChatId: false,
     env: 'production'
   }
   ```

   ❌ **Lỗi API:**

   ```
   ❌ Telegram API error: { ... }
   ```

## Troubleshooting

### Vẫn không nhận được tin nhắn?

1. **Kiểm tra Bot có trong group không:**

   - Vào group, xem danh sách thành viên
   - Bot phải có mặt trong danh sách

2. **Kiểm tra Bot có quyền gửi tin nhắn:**

   - Vào group settings
   - Đảm bảo bot không bị restrict

3. **Test trực tiếp Telegram API:**

   ```bash
   curl -X POST "https://api.telegram.org/bot<YOUR_BOT_TOKEN>/sendMessage" \
     -H "Content-Type: application/json" \
     -d '{
       "chat_id": "<YOUR_CHAT_ID>",
       "text": "Test message"
     }'
   ```

4. **Kiểm tra Environment Variables đã được set:**
   - Vào Vercel Dashboard → Settings → Environment Variables
   - Xác nhận cả 2 biến đều có giá trị
   - Xác nhận đã chọn đúng environment (Production)

## Lưu ý

- File `.env` trên local **KHÔNG** được deploy lên Vercel
- Phải cấu hình riêng trên Vercel Dashboard
- Sau khi thêm/sửa env vars, **BẮT BUỘC** phải redeploy
- Logs có thể delay vài giây, hãy đợi và refresh
