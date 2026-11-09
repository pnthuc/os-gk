# ML tổng hợp

## Mở để học

Giải nén toàn bộ thư mục, rồi chạy `Mo-ML-tong-hop.cmd`. Máy cần Node.js. Bản trình chiếu đã được build sẵn, không cần `npm install` để xem. Giữ cửa sổ chạy mở trong lúc học.

- Phím phải hoặc **Tiếp** để hiện bước/đáp án tiếp theo.
- **Mục lục** để chọn một trong 14 chương.
- **P** để mở chế độ người trình bày và ghi chú.
- Bấm nút trong phần gradient descent để tính các bước học.
- Ngân hàng ôn tập có 72 câu, chọn chương rồi mở đáp án.
- `ML-tong-hop.pdf` là bản slide tĩnh để đọc/in, hiển thị đầy đủ các bước. Các thao tác tương tác nằm trong bản web.

## Sửa nội dung

Với Node.js 24, chạy `npm ci`, sau đó `npm run dev`. Nội dung ở `slides.md`, bố cục ở `style.css`, phần tương tác trong `components/`. Chạy `npm run build` để cập nhật `dist/`.

Sau khi build, chạy `npm run export` để tạo lại PDF. Trình xuất dùng Chrome trên Windows. Nếu Chrome nằm ở nơi khác, đặt biến môi trường `CHROME_PATH` trỏ tới tệp thực thi của trình duyệt. Bản PDF đã tạo sẵn có thể mở trực tiếp.

`public/tai-lieu-ML.pdf` là giáo trình 197 trang được người dùng cung cấp. Các ghi chú và `noi-dung-doi-chieu.json` dẫn đúng trang của giáo trình.

## Nguồn

- Nội dung: `Hoc_may_Tong_hop_chuyen_sau_3_bai_giang.pdf`.
- Cách tổ chức Slidev và phong cách trình bày tham khảo [pnthuc/os-gk](https://github.com/pnthuc/os-gk): bảng so sánh, ví dụ theo bước, đáp án bấm để hiện, mục lục và điều hướng.
- Dự án giữ phông Segoe UI, Cambria và bảng màu của bản tham khảo. Nội dung và thành phần tương tác dành cho học máy.

Không cần đưa tệp nguồn lên GitHub hoặc xuất bản công khai để xem tại máy.
