# Toán 6 Vui — Kết nối tri thức với cuộc sống

Trang web học Toán 6 trực quan, sinh động, bám sát chương trình bộ sách **Kết nối tri thức với cuộc sống**, tối ưu cho iPad.

## Tính năng

- **9 chương học đầy đủ** (Số tự nhiên, Chia hết, Số nguyên, Hình phẳng thực tiễn, Đối xứng, Thống kê – Xác suất, Phân số, Số thập phân, Góc & Hai đường thẳng song song), mỗi chương có lý thuyết trực quan bằng hình vẽ SVG (trục số, đồng hồ, biểu đồ, hình học, phân số...) và ví dụ gắn với đời sống thực tế.
- **Luyện tập 3 mức độ** (Dễ / Trung bình / Khó) cho từng chương, có phản hồi đúng/sai tức thì kèm lời giải chi tiết.
- **Luyện thi Học sinh giỏi**: ngân hàng bài toán nâng cao riêng cho từng chương, cùng đề thi HSG tổng hợp 90 phút.
- **Đề thi thử có đếm giờ**: 6 đề (kiểm tra 15 phút, giữa kỳ, cuối kỳ, HSG) với đồng hồ đếm ngược, tự động nộp bài khi hết giờ, bảng câu hỏi để chuyển nhanh, xem lại chi tiết sau khi nộp.
- **Theo dõi tiến độ**: chuỗi ngày học liên tiếp, biểu đồ hoạt động 7 ngày, tiến độ theo từng chương, huy hiệu thành tích, lịch sử làm đề thi — lưu trên thiết bị (localStorage), không cần đăng nhập.
- **Giao diện tối ưu iPad**: cỡ chạm ≥44px, bố cục responsive cho cả chế độ dọc/ngang, không phụ thuộc hover, chạy hoàn toàn offline sau khi tải trang đầu tiên (không gọi API hay font ngoài).

## Cấu trúc dự án

```
index.html          Khung trang + điều hướng
css/style.css        Toàn bộ giao diện, responsive
js/data.js           Nội dung chương trình học + ngân hàng câu hỏi + đề thi
js/illustrations.js  Thư viện tạo hình minh họa SVG
js/progress.js        Lưu trữ tiến độ học tập (localStorage)
js/app.js             Điều hướng (router) + toàn bộ logic giao diện & bài kiểm tra
```

## Chạy thử cục bộ

Đây là trang tĩnh (HTML/CSS/JS thuần, không cần build). Chỉ cần chạy một máy chủ tĩnh bất kỳ, ví dụ:

```bash
python3 -m http.server 8080
# rồi mở http://localhost:8080
```

Có thể triển khai trực tiếp lên GitHub Pages, Netlify, Vercel… vì không có bước build nào.
