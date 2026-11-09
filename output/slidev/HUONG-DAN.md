# Mở bộ slide ôn giữa kỳ Hệ điều hành

Trên Windows, mở thư mục này trong File Explorer và bấm đúp vào **Mo-Slidev.cmd**. Bộ slide mở trong trình duyệt mặc định và chạy trên máy của bạn. Giữ cửa sổ dòng lệnh mở trong lúc học. Khi học xong, bấm Ctrl+C trong cửa sổ đó hoặc đóng cửa sổ.

- Bấm **Mục lục** ở chân slide để chọn chương.
- Bấm **Tiếp** hoặc phím mũi tên phải để hiện từng bước. Bấm **Trước** hoặc phím mũi tên trái để quay lại.
- Slide cuối có liên kết mở lời giải PDF đầy đủ
- Để hiện liên kết cheat sheet trong bản ở máy, đặt `os_doc.pdf` trong `public` và đặt `VITE_LOCAL_CHEAT_SHEET=1` trong `.env.local` trước khi dựng
- Bản dựng trong thư mục `dist` dùng Node.js có sẵn trên máy. Bạn có thể giữ nguyên cả thư mục và mở lại khi cần.

## Chỉnh sửa nguồn

`slides.md` chứa nội dung. `style.css`, `global-bottom.vue` và thư mục `components` điều khiển giao diện và các hình minh họa. Sau khi sửa, chạy `npm ci` rồi `npm run build` trong thư mục này để dựng lại bản dùng với Mo-Slidev.cmd. Có thể chạy `npm run dev` để xem trong lúc chỉnh.
