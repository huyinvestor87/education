# Toán 6 Vui — Kết nối tri thức với cuộc sống

Trang web học Toán 6 trực quan, sinh động, bám sát chương trình bộ sách **Kết nối tri thức với cuộc sống**, tối ưu cho iPad.

## Tính năng

- **Bài giảng hoạt hình có thuyết minh**: mỗi chương là một "đoạn phim" gồm 3–4 cảnh SVG chuyển động (chia pizza, tàu ngầm nổi lên, kim đồng hồ mở góc, lát gạch sân…) với phụ đề và giọng đọc tiếng Việt (Web Speech API), có nút phát/tạm dừng, chuyển cảnh, tua lại — tổng cộng 34 cảnh, khoảng 5,5 phút.
- **9 chương học đầy đủ** (Số tự nhiên, Chia hết, Số nguyên, Hình phẳng thực tiễn, Đối xứng, Thống kê – Xác suất, Phân số, Số thập phân, Góc & Hai đường thẳng song song), mỗi chương có lý thuyết trực quan bằng hình vẽ SVG (trục số, đồng hồ, biểu đồ, hình học, phân số...) và ví dụ gắn với đời sống thực tế.
- **Luyện tập 3 mức độ** (Dễ / Trung bình / Khó) cho từng chương, có phản hồi đúng/sai tức thì kèm lời giải chi tiết.
- **Luyện thi Học sinh giỏi**: ngân hàng bài toán nâng cao riêng cho từng chương, cùng đề thi HSG tổng hợp 90 phút.
- **Đề thi thử có đếm giờ**: 6 đề (kiểm tra 15 phút, giữa kỳ, cuối kỳ, HSG) với đồng hồ đếm ngược, tự động nộp bài khi hết giờ, bảng câu hỏi để chuyển nhanh, xem lại chi tiết sau khi nộp.
- **Theo dõi tiến độ**: chuỗi ngày học liên tiếp, biểu đồ hoạt động 7 ngày, tiến độ theo từng chương, huy hiệu thành tích, lịch sử làm đề thi — lưu trên thiết bị (localStorage), không cần đăng nhập.
- **Giao diện tối ưu iPad**: cỡ chạm ≥44px, bố cục responsive cho cả chế độ dọc/ngang, không phụ thuộc hover, chạy hoàn toàn offline sau khi tải trang đầu tiên (không gọi API hay font ngoài).

## Trang web đang chạy

🌐 **https://huyinvestor87.github.io/education/**

Mỗi lần push lên nhánh chính, GitHub Actions (`.github/workflows/deploy.yml`) sẽ:

1. Sinh `BUILD_ID` = SHA commit + thời điểm build, thay vào placeholder `__BUILD_ID__`
   trong `index.html` và các câu lệnh `import` của JS → mọi tệp `.css`/`.js` đều có
   query string phiên bản mới, trình duyệt (kể cả iPad) không dùng lại bản cache cũ.
2. Đóng gói toàn bộ site và deploy lên GitHub Pages.

> Lưu ý cấu hình: Pages của repo đang dùng nguồn **GitHub Actions**. Job deploy cố ý
> không khai báo `environment: github-pages` vì environment này có quy tắc chỉ cho
> phép nhánh tên `main`, sẽ chặn deploy từ các nhánh khác ngay khi khởi động job.

## Cấu trúc dự án

```
index.html          Khung trang + điều hướng
css/style.css        Toàn bộ giao diện, responsive
js/data.js           Nội dung chương trình học + ngân hàng câu hỏi + đề thi
js/anim.js           Engine hoạt hình: trình phát cảnh, phụ đề, giọng đọc
js/lessons.js        Kịch bản các cảnh hoạt hình của 9 chương
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
