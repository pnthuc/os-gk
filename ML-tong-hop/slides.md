---
theme: default
title: ML tổng hợp
info: Tổng hợp gọn kiến thức từ ba bài giảng học máy
author: Tài liệu học tập cá nhân
favicon: /favicon.svg
aspectRatio: 16/9
canvasWidth: 1120
colorSchema: light
fonts:
  provider: none
  sans: Segoe UI
  serif: Cambria
  mono: Consolas
monaco: false
record: false
drawings:
  enabled: false
exportFilename: ML-tong-hop
---


<div class="deck-cover">
<div><p class="cover-id">Học máy – Ba bài giảng</p><h1>ML tổng hợp</h1><p class="lead">Lý thuyết gọn, ví dụ tính từng bước</p><p>Mô hình tuyến tính, mạng nơ-ron<br/>Transformer và phương pháp thực nghiệm</p></div>
<div class="cover-stack"><div><b>Chọn mô hình</b><small>Biểu diễn được quy luật cần học</small></div><span class="connector">Dữ liệu và hàm mất mát</span><div><b>Học tham số</b><small>Gradient, backprop và tối ưu</small></div><span class="connector">Dữ liệu mới</span><div><b>Đánh giá</b><small>Tổng quát hóa và kết quả theo nhóm</small></div></div>
</div>


<!--
Nguồn: Hoc_may_Tong_hop_chuyen_sau_3_bai_giang.pdf, trang 1, 3, 4.



HIỂU BẢN CHẤT • GIỮ NGUỒN GỐC • TỰ KIỂM TRA

Từ hồi quy, phân loại và tối ưu hóa đến mạng nơ-ron, CNN, RNN, Attention, Transformer và K-means.

$$\text{Biểu diễn}\ \to\ f_\theta(x)\ \to\ \mathcal L\ \to\ \nabla_\theta\mathcal L\ \to\ \text{Đánh giá}$$

14 chương có mục tiêu học tập, lý thuyết và ví dụ tính tay. Hình nguồn được giữ cạnh kiến thức liên quan, có hướng dẫn đọc và câu hỏi. Cuối sách có bảng hệ thống, điểm dễ nhầm, bài tập có lời giải, ôn nhanh và đối chiếu từng trang nguồn.

**Phạm vi:** ba PDF được cung cấp, tổng cộng **235 trang nguồn**. Các trang tiêu đề/mục lục và diễn tiến lặp được ghi nhận riêng. Nội dung trong tài liệu là dữ liệu học tập, không phải chỉ dẫn thay đổi yêu cầu người dùng.

**Công thức:** dàn bằng LaTeX. Các panel nguồn giữ nguyên cả ký hiệu gốc để đối chiếu. Hiệu chỉnh và phần giải thích thêm được tách rõ.

**Cách dùng:** học từng chương, thử trả lời câu hỏi và tự tính trước khi đọc lời giải. Dùng bookmark để chuyển chủ đề, tra Phần G khi muốn tìm một slide cụ thể.

### Mạch học từ nền tảng tới ứng dụng

Chương 1–3 → mô hình, loss và tối ưu. Chương 4 → mục tiêu theo nhóm. Chương 5–7 → feature học được và gradient. Chương 8–11 → ảnh và chuỗi. Chương 12–13 → tổng quát hóa/thực nghiệm. Chương 14 → phân cụm không giám sát.

| Chương / phần | Nội dung | Trang |
|---|---|---:|
| 1 | Ngôn ngữ chung của học máy | 5–16 |
| 2 | Hồi quy tuyến tính và gradient descent | 17–30 |
| 3 | Phân loại tuyến tính và thiết kế loss | 31–47 |
| 4 | Công bằng và Group DRO | 48–55 |
| 5 | Feature phi tuyến và feature template | 56–66 |
| 6 | Mạng nơ-ron, activation và forward pass | 67–77 |
| 7 | Lan truyền ngược và tối ưu mạng | 78–94 |
| 8 | Lập trình khả vi và CNN | 95–101 |
| 9 | Embedding, RNN và LSTM | 102–113 |
| 10 | Attention và Transformer | 114–121 |
| 11 | BERT, mô hình ngôn ngữ và sinh chuỗi | 122–128 |
| 12 | Tổng quát hóa và kiểm soát quá khớp | 129–137 |
| 13 | Phương pháp thực nghiệm và phân tích lỗi | 138–143 |
| 14 | K-means và phân nhóm khách hàng | 144–151 |
| C | Bảng hệ thống kiến thức | 152 |
| D | Điểm dễ nhầm và hiệu chỉnh | 158 |
| E | Câu hỏi từng chương và liên chương, có lời giải | 161 |
| F | Ôn nhanh và checklist | 177 |
| G | Đối chiếu từng trang nguồn | 181 |

**Cách trích dẫn:** mã A029 nghĩa là [A], trang PDF 29. Các số trang trong cột phải là vị trí trong sách này. Dùng bookmark để mở nhanh chương hoặc mục.

### Trục 1. Mô hình có thể biểu diễn điều gì?

Đường thẳng → feature phi tuyến cố định → mạng học biểu diễn → kiến trúc tận dụng cấu trúc ảnh hoặc chuỗi. Câu hỏi xuyên suốt là: quy luật có nằm trong lớp giả thuyết đã chọn không?

### Trục 2. “Tốt” là tốt theo tiêu chí nào?

Loss bình phương đo sai lệch số. Hinge/logistic/softmax đo lỗi phân loại theo những cách khác nhau. Group DRO đổi cách tổng hợp giữa các nhóm. Công bằng phân phối hỏi rộng hơn về lợi ích và gánh nặng.

### Trục 3. Làm sao tìm được tham số?

Gradient descent cần gradient. Quy tắc chuỗi và computation graph cho phép tính gradient qua nhiều phép hợp. CNN, RNN, Transformer dùng cùng nguyên tắc khả vi. K-means dùng tối ưu luân phiên thay cho backprop qua phép gán cụm rời rạc.

### Trục 4. Kết quả có dùng được trên dữ liệu mới?

Train loss thấp → chưa đủ. Cần kiểm soát quá khớp, chọn cấu hình bằng validation, giữ test để đánh giá cuối, phân tích lỗi theo lớp/nhóm. Nhánh này quay lại câu hỏi Group DRO: điểm trung bình tốt có thể che nhóm yếu.

| Kiến thức trước | Dùng để hiểu phần sau |
|---|---|
| Vector, tích vô hướng | Score, dense layer, embedding, attention |
| Đạo hàm và quy tắc chuỗi | Gradient hồi quy, backprop, RNN/LSTM |
| Feature và lớp giả thuyết | XOR, mạng sâu, sai số xấp xỉ |
| Softmax và cross-entropy | Attention, BERT, dự đoán token |
| Loss và tối ưu | Group DRO, regularization, K-means |

**Mục tiêu học chung:** tự giải thích một mô hình nhận gì, biến đổi thế nào, tối ưu gì, dùng giả định nào và được đánh giá trên dữ liệu nào.
-->


---

# Mục lục

<div class="shortcuts">
<Link class="shortcut" to="3"><span>01</span><strong>Nền tảng học máy</strong></Link>
<Link class="shortcut" to="8"><span>02</span><strong>Hồi quy và gradient descent</strong></Link>
<Link class="shortcut" to="18"><span>03</span><strong>Phân loại và loss</strong></Link>
<Link class="shortcut" to="28"><span>04</span><strong>Công bằng và Group DRO</strong></Link>
<Link class="shortcut" to="33"><span>05</span><strong>Feature phi tuyến</strong></Link>
<Link class="shortcut" to="40"><span>06</span><strong>Mạng nơ-ron và forward</strong></Link>
<Link class="shortcut" to="47"><span>07</span><strong>Backpropagation</strong></Link>
<Link class="shortcut" to="57"><span>08</span><strong>CNN</strong></Link>
<Link class="shortcut" to="62"><span>09</span><strong>Embedding, RNN và LSTM</strong></Link>
<Link class="shortcut" to="69"><span>10</span><strong>Attention và Transformer</strong></Link>
<Link class="shortcut" to="77"><span>11</span><strong>BERT và mô hình ngôn ngữ</strong></Link>
<Link class="shortcut" to="82"><span>12</span><strong>Tổng quát hóa</strong></Link>
<Link class="shortcut" to="88"><span>13</span><strong>Thực nghiệm và phân tích lỗi</strong></Link>
<Link class="shortcut" to="93"><span>14</span><strong>K-means và RFM</strong></Link>
</div>


<div class="note">Phím → hoặc Tiếp để hiện bước / đáp án. Nhấn P để mở ghi chú người trình bày</div>



<!--
Nguồn: Hoc_may_Tong_hop_chuyen_sau_3_bai_giang.pdf, trang 3.



### Mạch học từ nền tảng tới ứng dụng

Chương 1–3 → mô hình, loss và tối ưu. Chương 4 → mục tiêu theo nhóm. Chương 5–7 → feature học được và gradient. Chương 8–11 → ảnh và chuỗi. Chương 12–13 → tổng quát hóa/thực nghiệm. Chương 14 → phân cụm không giám sát.

| Chương / phần | Nội dung | Trang |
|---|---|---:|
| 1 | Ngôn ngữ chung của học máy | 5–16 |
| 2 | Hồi quy tuyến tính và gradient descent | 17–30 |
| 3 | Phân loại tuyến tính và thiết kế loss | 31–47 |
| 4 | Công bằng và Group DRO | 48–55 |
| 5 | Feature phi tuyến và feature template | 56–66 |
| 6 | Mạng nơ-ron, activation và forward pass | 67–77 |
| 7 | Lan truyền ngược và tối ưu mạng | 78–94 |
| 8 | Lập trình khả vi và CNN | 95–101 |
| 9 | Embedding, RNN và LSTM | 102–113 |
| 10 | Attention và Transformer | 114–121 |
| 11 | BERT, mô hình ngôn ngữ và sinh chuỗi | 122–128 |
| 12 | Tổng quát hóa và kiểm soát quá khớp | 129–137 |
| 13 | Phương pháp thực nghiệm và phân tích lỗi | 138–143 |
| 14 | K-means và phân nhóm khách hàng | 144–151 |
| C | Bảng hệ thống kiến thức | 152 |
| D | Điểm dễ nhầm và hiệu chỉnh | 158 |
| E | Câu hỏi từng chương và liên chương, có lời giải | 161 |
| F | Ôn nhanh và checklist | 177 |
| G | Đối chiếu từng trang nguồn | 181 |

**Cách trích dẫn:** mã A029 nghĩa là [A], trang PDF 29. Các số trang trong cột phải là vị trí trong sách này. Dùng bookmark để mở nhanh chương hoặc mục.
-->


---

<div class="track"><span>01 – Ngôn ngữ chung của học máy</span><span>ML tổng hợp</span></div>

# Học và suy diễn


<div class="flow"><div><b>Dữ liệu train</b><small>Cặp đầu vào và kết quả thật</small></div><span>→</span><div><b>Huấn luyện</b><small>Tìm tham số của mô hình</small></div><span>→</span><div><b>Suy diễn</b><small>Dự đoán cho đầu vào mới</small></div></div>

- **Mô hình** $f_\theta$: hàm tạo dự đoán
- **Tham số** $\theta$: trọng số, bias được học
- **Siêu tham số**: số lớp, tốc độ học, hệ số L2


<div class="note">Một lần suy diễn có thể nhanh dù cả đợt huấn luyện cần nhiều bước</div>



<!--
Nguồn: Hoc_may_Tong_hop_chuyen_sau_3_bai_giang.pdf, trang 5, 7, 8.



### Sau chương này, bạn cần làm được

- Phân biệt training và inference, nhãn lớp và số đo.
- Giải thích feature, score, loss, tham số và siêu tham số.
- Nhận diện ba quyết định: lớp mô hình, loss, tối ưu.

### Kiến thức tiên quyết

Số thực, vector và phép cộng/nhân cơ bản. Các ký hiệu cần dùng được giải thích trong chương.

### Câu hỏi dẫn đường

Một hệ thống học từ dữ liệu khác gì với việc chỉ chạy một hàm đã biết?

Cách học: đọc lý thuyết, tự tính lại ví dụ, rồi mở các panel nguồn ở ngay trong chương. Phần “đọc hình” phân biệt thông tin trực tiếp trên slide với diễn giải của bản tổng hợp. Câu hỏi cuối sách cho phép tự kiểm tra trước khi xem đáp án.

**Học máy** xây một quy tắc dự đoán từ dữ liệu rồi dùng quy tắc đó cho đầu vào mới. Ví dụ, từ các ngôi nhà đã biết giá, mô hình học quan hệ giữa diện tích, vị trí và giá bán để định giá một ngôi nhà chưa gặp.

**Huấn luyện (training)** là quá trình tìm tham số. **Suy diễn (inference)** là dùng tham số đã học để tính dự đoán. Huấn luyện có thể gồm rất nhiều lần cập nhật, còn một lượt suy diễn của mạng truyền thẳng đi qua một đồ thị tính toán đã xác định.

| Bài toán | Dạng đầu ra | Ví dụ trong slide |
|---|---|---|
| Phân loại nhị phân | $y\in\{-1,+1\}$ hoặc $\{0,1\}$ | Gian lận, bình luận độc hại, tín hiệu Higgs/nhiễu nền |
| Phân loại đa lớp | $y\in\{1,\ldots,K\}$ | Nhận dạng chữ số viết tay hoặc nhận diện người |
| Hồi quy | $y\in\mathbb R$ | Giá nhà, thời gian đến nơi, chỉ số tài sản từ ảnh vệ tinh |
| Dự đoán có cấu trúc | Câu, chuỗi nhãn, bản đồ vùng ảnh | Dịch máy, hội thoại, chú thích và phân vùng ảnh |

### Nhìn vào ý nghĩa đầu ra, không chỉ kiểu dữ liệu

Chữ số “7” là **nhãn lớp** nếu cần nhận dạng ảnh chữ số. Con số “7 phút” là **đại lượng hồi quy** nếu cần dự đoán thời gian. Mã hóa lớp bằng số không làm bài toán trở thành hồi quy.

**Mô hình phản xạ (reflex-based)** trong slide nhấn mạnh ánh xạ trực tiếp từ đầu vào sang dự đoán, khác với việc phải tìm kiếm nhiều chuỗi hành động. Đây là cách tổ chức suy diễn, không phải tên một thuật toán học duy nhất.

Ví dụ nhận diện các bạn trong lớp: “ảnh + tên” là dữ liệu có nhãn. Khi gặp lại một ảnh và gọi tên, ta đang suy diễn. Trong mô hình máy tính, ảnh cần được biểu diễn thành các con số trước khi tính điểm lớp.

### 1. Lớp giả thuyết: được phép chọn mô hình nào?

Lớp giả thuyết $\mathcal F$ là tập các hàm dự đoán có thể chọn. Nếu chỉ cho phép đường thẳng, thuật toán không thể tự tìm ra một đường cong tùy ý dù được huấn luyện rất lâu.

$$\mathcal F=\{x\mapsto b+wx:\ b,w\in\mathbb R\}.$$

### 2. Hàm mất mát: “tốt” được đo bằng gì?

Loss $\ell(\widehat y,y)$ so sánh dự đoán và kết quả thật. Với hồi quy, thường xét bình phương độ lệch. Với phân loại, cần loss phản ánh nhãn đúng, điểm số và mức tự tin.

$$J(\theta)=\frac1n\sum_{i=1}^n\ell(f_\theta(x_i),y_i)+\lambda R(\theta).$$

Ở đây $R$ là thành phần điều chuẩn. Đổi loss hoặc cách tổng hợp loss sẽ đổi mục tiêu học, ngay cả khi giữ nguyên cấu trúc mô hình. Group DRO là ví dụ quan trọng của việc đổi cách tổng hợp.

### 3. Thuật toán tối ưu: tìm tham số bằng cách nào?

Gradient descent cập nhật tham số theo gradient. K-means dùng hai bước tối ưu luân phiên. Thuật toán tốt đến đâu vẫn chịu giới hạn của lớp mô hình và tiêu chuẩn đánh giá đã chọn.

$$\theta^{(t+1)}=\theta^{(t)}-\eta\nabla_\theta J(\theta^{(t)}).$$

### Phân biệt tham số và siêu tham số

**Tham số** như $w,b$ được học từ tập train. **Siêu tham số** như số lớp, số nút ẩn, tốc độ học, kích thước batch và hệ số L2 do quy trình thực nghiệm lựa chọn. Tập validation giúp so sánh những lựa chọn này. Tập test được giữ để đánh giá cuối cùng.

Một lỗi thường gặp là cố tăng số vòng huấn luyện khi mô hình không có đủ khả năng biểu diễn. Hãy tách ba câu hỏi: mô hình có thể học được không, loss có đúng mục tiêu không, và tối ưu đã làm tốt chưa?
-->


---

<div class="track"><span>01 – Ngôn ngữ chung của học máy</span><span>ML tổng hợp</span></div>

# Loại bài toán dự đoán


| Đầu ra | Bài toán | Ví dụ |
|---|---|---|
| Hai nhãn | Phân loại nhị phân | Gian lận, bình luận độc hại |
| Một trong $K$ nhãn | Phân loại đa lớp | Chữ số 0–9 |
| Số thực | Hồi quy | Giá nhà, thời gian đến nơi |
| Chuỗi hoặc đối tượng phức tạp | Dự đoán có cấu trúc | Dịch, chú thích, phân vùng ảnh |


<div class="note">Mã lớp “7” là nhãn. “7 phút” là số đo có đơn vị</div>



<!--
Nguồn: Hoc_may_Tong_hop_chuyen_sau_3_bai_giang.pdf, trang 7, 10, 11, 13, 15.



**Học máy** xây một quy tắc dự đoán từ dữ liệu rồi dùng quy tắc đó cho đầu vào mới. Ví dụ, từ các ngôi nhà đã biết giá, mô hình học quan hệ giữa diện tích, vị trí và giá bán để định giá một ngôi nhà chưa gặp.

**Huấn luyện (training)** là quá trình tìm tham số. **Suy diễn (inference)** là dùng tham số đã học để tính dự đoán. Huấn luyện có thể gồm rất nhiều lần cập nhật, còn một lượt suy diễn của mạng truyền thẳng đi qua một đồ thị tính toán đã xác định.

| Bài toán | Dạng đầu ra | Ví dụ trong slide |
|---|---|---|
| Phân loại nhị phân | $y\in\{-1,+1\}$ hoặc $\{0,1\}$ | Gian lận, bình luận độc hại, tín hiệu Higgs/nhiễu nền |
| Phân loại đa lớp | $y\in\{1,\ldots,K\}$ | Nhận dạng chữ số viết tay hoặc nhận diện người |
| Hồi quy | $y\in\mathbb R$ | Giá nhà, thời gian đến nơi, chỉ số tài sản từ ảnh vệ tinh |
| Dự đoán có cấu trúc | Câu, chuỗi nhãn, bản đồ vùng ảnh | Dịch máy, hội thoại, chú thích và phân vùng ảnh |

### Nhìn vào ý nghĩa đầu ra, không chỉ kiểu dữ liệu

Chữ số “7” là **nhãn lớp** nếu cần nhận dạng ảnh chữ số. Con số “7 phút” là **đại lượng hồi quy** nếu cần dự đoán thời gian. Mã hóa lớp bằng số không làm bài toán trở thành hồi quy.

**Mô hình phản xạ (reflex-based)** trong slide nhấn mạnh ánh xạ trực tiếp từ đầu vào sang dự đoán, khác với việc phải tìm kiếm nhiều chuỗi hành động. Đây là cách tổ chức suy diễn, không phải tên một thuật toán học duy nhất.

Ví dụ nhận diện các bạn trong lớp: “ảnh + tên” là dữ liệu có nhãn. Khi gặp lại một ảnh và gọi tên, ta đang suy diễn. Trong mô hình máy tính, ảnh cần được biểu diễn thành các con số trước khi tính điểm lớp.

Panel A008 • Bản render nguyên trang từ [A], trang PDF 8. Nội dung trong panel là bản gốc.

Panel A010 • Bản render nguyên trang từ [A], trang PDF 10. Nội dung trong panel là bản gốc.

### Cách đọc và giải thích

A008 liệt kê nhị phân, đa lớp, số thực và đối tượng có cấu trúc. Hãy đọc cột dạng đầu ra trước, rồi nối sang ví dụ. A010 dùng màu/hình của các điểm để minh họa hai nhóm. Các nhãn dương/âm là mã lớp, không nhất thiết nói đến lợi ích hay chất lượng. [DIỄN GIẢI] Bộ dự đoán là hàm tổng quát, còn classifier là bộ dự đoán nhãn lớp.

**Tự kiểm tra (áp dụng cho các panel trên):** Nếu mã hóa “gian lận” bằng số một, bài toán có trở thành hồi quy không?

**Đáp án và ý nghĩa:** Không. Ý nghĩa đầu ra là một trong hai lớp, nên vẫn là phân loại. Một số biểu diễn nhãn không biến nhãn thành đại lượng liên tục.

Panel A011 • Bản render nguyên trang từ [A], trang PDF 11. Nội dung trong panel là bản gốc.

Panel A012 • Bản render nguyên trang từ [A], trang PDF 12. Nội dung trong panel là bản gốc.

### Cách đọc và giải thích

A011 giữ ba ứng dụng gốc: gian lận giao dịch, bình luận độc hại và tín hiệu Higgs/nhiễu nền. Mỗi ứng dụng có đầu vào khác nhau nhưng cùng dạng nhãn nhị phân. A012 mở rộng sang nhiều nhóm. A013 cho thấy cùng một chữ số có nhiều kiểu viết. [DIỄN GIẢI] Nhiệm vụ là giữ nhãn ổn định trước biến thiên nét viết, không ghi nhớ đúng một ảnh mẫu cho mỗi lớp. Panel còn lại của nhóm được phóng riêng ở trang kế tiếp.

**Tự kiểm tra (áp dụng cho các panel trên):** Vì sao ảnh chữ số ba và tám khác với bài dự đoán giá bằng số ba hoặc tám?

**Đáp án và ý nghĩa:** Ở nhận dạng chữ số, các số là tên lớp. Với giá, chúng là mức đo có thứ tự, khoảng cách và đơn vị của đại lượng mục tiêu.

Panel A014 • Bản render nguyên trang từ [A], trang PDF 14. Nội dung trong panel là bản gốc.

Panel A015 • Bản render nguyên trang từ [A], trang PDF 15. Nội dung trong panel là bản gốc.

### Cách đọc và giải thích

A014 vẽ các điểm dữ liệu và đường xu hướng. Sai lệch dọc giữa điểm và đường là điều cần đo trong hồi quy. A015 giữ ba ứng dụng: chỉ số tài sản từ ảnh vệ tinh, giá nhà, thời gian đến nơi. A016 đặt dự đoán nhãn cạnh dự đoán số để so sánh. [DIỄN GIẢI] Cả ảnh, văn bản và bảng số đều có thể là đầu vào hồi quy nếu đầu ra cần dự đoán là số thực. Panel còn lại của nhóm được phóng riêng ở trang kế tiếp.

Trong A014 có nhãn “classifier” cho hồi quy. Bản tổng hợp dùng “bộ dự đoán hồi quy” để thống nhất thuật ngữ.

**Tự kiểm tra (áp dụng cho các panel trên):** Các chấm nằm khác đường hồi quy có nhất thiết là nhãn phân loại sai không?

**Đáp án và ý nghĩa:** Không. Đó là các sai lệch định lượng giữa dự đoán và giá trị thật. Việc chấp nhận sai lệch bao nhiêu phụ thuộc loss và ứng dụng.

Panel A017 • Bản render nguyên trang từ [A], trang PDF 17. Nội dung trong panel là bản gốc.

Panel B002 • Bản render nguyên trang từ [B], trang PDF 2. Nội dung trong panel là bản gốc.

### Cách đọc và giải thích

A017 giữ bốn đầu ra phức tạp: bản dịch, câu hội thoại, mô tả ảnh và bản đồ vùng ảnh. Các phần đầu ra có quan hệ với nhau, chẳng hạn thứ tự từ hoặc các vùng lân cận. B002 đọc theo vòng: dữ liệu → mô hình → dự đoán → loss → gradient → cập nhật. Khi tham số đổi, lượt dự đoán kế tiếp dùng mô hình mới. [DIỄN GIẢI] Cùng vòng học có thể áp dụng nhiều kiến trúc nếu các phép tính liên quan cho phép tính gradient.

**Tự kiểm tra (áp dụng cho các panel trên):** Ở panel vòng học, backprop và cập nhật nằm ở cùng một bước không?

**Đáp án và ý nghĩa:** Không. Tính gradient cung cấp hướng/độ nhạy, còn optimizer dùng gradient để thay đổi tham số.
-->


---

<div class="track"><span>01 – Ngôn ngữ chung của học máy</span><span>ML tổng hợp</span></div>

# Ba quyết định thiết kế


| Quyết định | Câu hỏi | Ví dụ |
|---|---|---|
| Lớp giả thuyết $\mathcal F$ | Cho phép những hàm nào? | Đường thẳng hay mạng sâu |
| Loss $\ell$ | Đo dự đoán sai thế nào? | Bình phương, hinge, cross-entropy |
| Optimizer | Tìm tham số bằng cách nào? | Gradient descent, SGD |


$$
J(\theta)=\frac1n\sum_{i=1}^n\ell(f_\theta(x_i),y_i)+\lambda R(\theta)
$$



<!--
Nguồn: Hoc_may_Tong_hop_chuyen_sau_3_bai_giang.pdf, trang 8.



### 1. Lớp giả thuyết: được phép chọn mô hình nào?

Lớp giả thuyết $\mathcal F$ là tập các hàm dự đoán có thể chọn. Nếu chỉ cho phép đường thẳng, thuật toán không thể tự tìm ra một đường cong tùy ý dù được huấn luyện rất lâu.

$$\mathcal F=\{x\mapsto b+wx:\ b,w\in\mathbb R\}.$$

### 2. Hàm mất mát: “tốt” được đo bằng gì?

Loss $\ell(\widehat y,y)$ so sánh dự đoán và kết quả thật. Với hồi quy, thường xét bình phương độ lệch. Với phân loại, cần loss phản ánh nhãn đúng, điểm số và mức tự tin.

$$J(\theta)=\frac1n\sum_{i=1}^n\ell(f_\theta(x_i),y_i)+\lambda R(\theta).$$

Ở đây $R$ là thành phần điều chuẩn. Đổi loss hoặc cách tổng hợp loss sẽ đổi mục tiêu học, ngay cả khi giữ nguyên cấu trúc mô hình. Group DRO là ví dụ quan trọng của việc đổi cách tổng hợp.

### 3. Thuật toán tối ưu: tìm tham số bằng cách nào?

Gradient descent cập nhật tham số theo gradient. K-means dùng hai bước tối ưu luân phiên. Thuật toán tốt đến đâu vẫn chịu giới hạn của lớp mô hình và tiêu chuẩn đánh giá đã chọn.

$$\theta^{(t+1)}=\theta^{(t)}-\eta\nabla_\theta J(\theta^{(t)}).$$

### Phân biệt tham số và siêu tham số

**Tham số** như $w,b$ được học từ tập train. **Siêu tham số** như số lớp, số nút ẩn, tốc độ học, kích thước batch và hệ số L2 do quy trình thực nghiệm lựa chọn. Tập validation giúp so sánh những lựa chọn này. Tập test được giữ để đánh giá cuối cùng.

Một lỗi thường gặp là cố tăng số vòng huấn luyện khi mô hình không có đủ khả năng biểu diễn. Hãy tách ba câu hỏi: mô hình có thể học được không, loss có đúng mục tiêu không, và tối ưu đã làm tốt chưa?
-->


---

<div class="track"><span>01 – Ngôn ngữ chung của học máy</span><span>ML tổng hợp</span></div>

# Các ký hiệu dùng xuyên suốt


| Ký hiệu | Ý nghĩa |
|---|---|
| $x_i,y_i,\hat y_i$ | Đầu vào, giá trị thật, dự đoán |
| $\phi(x)\in\mathbb R^d$ | Vector đặc trưng |
| $w,b$ | Trọng số và bias |
| $\nabla_wJ,\eta,\lambda$ | Gradient, tốc độ học, hệ số điều chuẩn |


$$
w^\top\phi(x)=\sum_jw_j\phi_j(x)
$$



<div class="note">Tích vô hướng cho một số. Tích ngoài cho ma trận. Ký hiệu ⊙ là nhân từng phần tử</div>



<!--
Nguồn: Hoc_may_Tong_hop_chuyen_sau_3_bai_giang.pdf, trang 6.



| Ký hiệu | Ý nghĩa |
|---|---|
| $x_i, y_i$ | Đầu vào và nhãn/giá trị thật của mẫu thứ $i$ |
| $\widehat y_i=f_\theta(x_i)$ | Dự đoán của mô hình có tham số $\theta$ |
| $\phi(x)\in\mathbb R^d$ | Vector đặc trưng gồm $d$ số mô tả đầu vào |
| $w,b$ | Trọng số và hệ số chặn (bias) |
| $\ell_i, J$ | Loss một mẫu và hàm mục tiêu tổng hợp |
| $n,m,\eta,\lambda$ | Số mẫu, kích thước mini-batch, tốc độ học, hệ số điều chuẩn |
| $\nabla_w J$ | Vector đạo hàm riêng của $J$ theo các thành phần của $w$ |

### Tích vô hướng là tổng các đóng góp

$$w^\top\phi(x)=\sum_{j=1}^d w_j\phi_j(x).$$

Ví dụ, trọng số tương ứng với đặc trưng nào thì nhân với giá trị đặc trưng ấy rồi cộng lại. Trọng số dương làm điểm số tăng khi đặc trưng tăng, trọng số âm làm điểm số giảm, với các yếu tố khác giữ nguyên.

### Ba phép toán dễ nhầm

- $u^\top v$: tích vô hướng, đầu ra là một số.
- $uv^\top$: tích ngoài, đầu ra là một ma trận.
- $u\odot v$: nhân từng phần tử, hai vector phải có kích thước phù hợp.

$$\frac{\partial J}{\partial x}=\frac{\partial J}{\partial u}\frac{\partial u}{\partial x},\qquad
\nabla_w J=\begin{bmatrix}\partial J/\partial w_1\\\vdots\\\partial J/\partial w_d\end{bmatrix}.$$

**Đạo hàm** đo mức thay đổi tức thời. **Gradient** gom các đạo hàm khi có nhiều tham số. Ký hiệu $\top$ là chuyển vị: vector cột thành vector hàng và ngược lại.
-->


---

<div class="track"><span>01 – Ngôn ngữ chung của học máy</span><span>ML tổng hợp</span></div>

# Tự luyện – Tên lớp bằng số có phải hồi quy?



<div class="answer" v-click>Không. Cần xét ý nghĩa đầu ra: chọn lớp hay dự đoán đại lượng có khoảng cách và đơn vị.</div>



<div class="note">Thử trả lời trước khi bấm Tiếp</div>



<!--
Nguồn: Hoc_may_Tong_hop_chuyen_sau_3_bai_giang.pdf, trang 7, 161.



**Học máy** xây một quy tắc dự đoán từ dữ liệu rồi dùng quy tắc đó cho đầu vào mới. Ví dụ, từ các ngôi nhà đã biết giá, mô hình học quan hệ giữa diện tích, vị trí và giá bán để định giá một ngôi nhà chưa gặp.

**Huấn luyện (training)** là quá trình tìm tham số. **Suy diễn (inference)** là dùng tham số đã học để tính dự đoán. Huấn luyện có thể gồm rất nhiều lần cập nhật, còn một lượt suy diễn của mạng truyền thẳng đi qua một đồ thị tính toán đã xác định.

| Bài toán | Dạng đầu ra | Ví dụ trong slide |
|---|---|---|
| Phân loại nhị phân | $y\in\{-1,+1\}$ hoặc $\{0,1\}$ | Gian lận, bình luận độc hại, tín hiệu Higgs/nhiễu nền |
| Phân loại đa lớp | $y\in\{1,\ldots,K\}$ | Nhận dạng chữ số viết tay hoặc nhận diện người |
| Hồi quy | $y\in\mathbb R$ | Giá nhà, thời gian đến nơi, chỉ số tài sản từ ảnh vệ tinh |
| Dự đoán có cấu trúc | Câu, chuỗi nhãn, bản đồ vùng ảnh | Dịch máy, hội thoại, chú thích và phân vùng ảnh |

### Nhìn vào ý nghĩa đầu ra, không chỉ kiểu dữ liệu

Chữ số “7” là **nhãn lớp** nếu cần nhận dạng ảnh chữ số. Con số “7 phút” là **đại lượng hồi quy** nếu cần dự đoán thời gian. Mã hóa lớp bằng số không làm bài toán trở thành hồi quy.

**Mô hình phản xạ (reflex-based)** trong slide nhấn mạnh ánh xạ trực tiếp từ đầu vào sang dự đoán, khác với việc phải tìm kiếm nhiều chuỗi hành động. Đây là cách tổ chức suy diễn, không phải tên một thuật toán học duy nhất.

Ví dụ nhận diện các bạn trong lớp: “ảnh + tên” là dữ liệu có nhãn. Khi gặp lại một ảnh và gọi tên, ta đang suy diễn. Trong mô hình máy tính, ảnh cần được biểu diễn thành các con số trước khi tính điểm lớp.

**[CÂU HỎI BIÊN SOẠN]** Dựa trên nội dung chương. Hãy tự trả lời trước rồi mới xem phần giải thích dưới từng câu.

### 1.1 • Ghi nhớ

**Ba quyết định thiết kế là gì?**

Lớp giả thuyết chọn các hàm được phép, loss định nghĩa tốt/xấu, optimizer tìm tham số. Không thay một quyết định bằng tên của quyết định khác.

### 1.2 • Thông hiểu

**Vì sao tên lớp bằng số chưa làm bài toán thành hồi quy?**

Các số có thể chỉ là mã. Cần xét ý nghĩa: chọn lớp rời rạc hay đo đại lượng có khoảng cách và đơn vị.

### 1.3 • Vận dụng

**Phân loại ba tác vụ: gian lận, giá nhà, bản dịch.**

Gian lận là nhị phân, giá nhà là hồi quy, bản dịch là đầu ra chuỗi có cấu trúc. Cùng kiểu đầu vào không buộc cùng loại đầu ra.

### 1.4 • Phân tích

**Một mô hình đoán nhanh có chứng minh bước học ít tốn kém?**

Không. Inference và training khác nhau. Training có thể cần nhiều vòng tính gradient, còn inference chỉ chạy mô hình đã chốt.

### 1.5 • Đánh giá

**Muốn phân loại ảnh mới, cần chốt gì trước khi chọn mạng?**

Xác định nhãn, dữ liệu đại diện, cách chia/metric, rồi chọn lớp mô hình, loss và tối ưu phù hợp. Kiểm tra bằng dữ liệu mới.
-->


---

<div class="track"><span>02 – Hồi quy tuyến tính và gradient descent</span><span>ML tổng hợp</span></div>

# Hồi quy tuyến tính và bias



$$
\hat y=b+wx=w^\top\phi(x),\qquad \phi(x)=[1,x]^\top
$$


| Thành phần | Ý nghĩa |
|---|---|
| $b$ | Giá trị dự đoán khi đầu vào bằng không |
| $w$ | Mức thay đổi dự đoán khi đầu vào tăng một đơn vị |
| Feature hằng $1$ | Cho phép gộp bias vào trọng số |


<div class="note">Bỏ bias sẽ buộc đường đi qua gốc tọa độ</div>



<!--
Nguồn: Hoc_may_Tong_hop_chuyen_sau_3_bai_giang.pdf, trang 18, 24.



Với một đầu vào số, mô hình có dạng $\widehat y=b+wx$. **Bias** quyết định độ cao khi đầu vào bằng không, còn **độ dốc** quyết định dự đoán thay đổi bao nhiêu khi đầu vào tăng một đơn vị.

$$\phi(x)=\begin{bmatrix}1\\x\end{bmatrix},\quad
\theta=\begin{bmatrix}b\\w\end{bmatrix},\quad
f_\theta(x)=\theta^\top\phi(x)=b+wx.$$

Gắn thêm đặc trưng hằng bằng một cho phép gộp bias vào vector trọng số. Không có bias, đường bị buộc đi qua gốc tọa độ. Với nhiều đầu vào, đường thẳng được thay bằng một siêu phẳng.

$$f_w(x)=b+\sum_{j=1}^{d}w_jx_j.$$

### Ví dụ được dùng xuyên suốt

Ba điểm huấn luyện là $(1,1),(2,3),(4,3)$. Đường gần tối ưu trong slide là $f(x)=1+0.57x$. Với đầu vào mới $x=3$, ta tính $f(3)=2.71$. Đây là dự đoán nội suy vì đầu vào nằm giữa các giá trị đã quan sát.

**Chú ý về từ “tuyến tính”:** $b+wx$ là hàm affine theo đầu vào. Trong học máy, tên “mô hình tuyến tính” thường bao gồm bias. Khi dùng đặc trưng cố định, mô hình tuyến tính theo trọng số có thể tạo ra một đường cong theo đầu vào gốc.

Panel A024 • Bản render nguyên trang từ [A], trang PDF 24. Nội dung trong panel là bản gốc.

### Cách đọc và giải thích

Trục ngang là đầu vào, trục dọc là dự đoán. Đường đỏ có bias một và độ dốc 0,57. Đường tím có bias hai và độ dốc 0,2. Chúng giao nhau nhưng vẫn là hai hàm khác nhau trên cả miền. Lớp giả thuyết chứa cả hai và nhiều đường khác. [DIỄN GIẢI] Một giao điểm không đủ kết luận hai bộ trọng số tương đương.

**Tự kiểm tra (áp dụng cho các panel trên):** Tại đầu vào bằng không, hai đường cho kết quả nào?

**Đáp án và ý nghĩa:** Đường đỏ cho một, đường tím cho hai. Đây là cách đọc trực tiếp ý nghĩa hệ số chặn.
-->


---

<div class="track"><span>02 – Hồi quy tuyến tính và gradient descent</span><span>ML tổng hợp</span></div>

# Ví dụ ba điểm


| $x$ | 1 | 2 | 4 |
|---|---|---|---|
| $y$ | 1 | 3 | 3 |

Đường trong bài giảng: $f(x)=1+0.57x$

<div class="step" v-click><b>01</b><span>Đầu vào mới x = 3</span></div>

<div class="step" v-click><b>02</b><span>Thay vào mô hình: 1 + 0,57 × 3</span></div>


<div class="answer" v-click>Dự đoán bằng <b>2,71</b></div>



<!--
Nguồn: Hoc_may_Tong_hop_chuyen_sau_3_bai_giang.pdf, trang 18, 23.



Với một đầu vào số, mô hình có dạng $\widehat y=b+wx$. **Bias** quyết định độ cao khi đầu vào bằng không, còn **độ dốc** quyết định dự đoán thay đổi bao nhiêu khi đầu vào tăng một đơn vị.

$$\phi(x)=\begin{bmatrix}1\\x\end{bmatrix},\quad
\theta=\begin{bmatrix}b\\w\end{bmatrix},\quad
f_\theta(x)=\theta^\top\phi(x)=b+wx.$$

Gắn thêm đặc trưng hằng bằng một cho phép gộp bias vào vector trọng số. Không có bias, đường bị buộc đi qua gốc tọa độ. Với nhiều đầu vào, đường thẳng được thay bằng một siêu phẳng.

$$f_w(x)=b+\sum_{j=1}^{d}w_jx_j.$$

### Ví dụ được dùng xuyên suốt

Ba điểm huấn luyện là $(1,1),(2,3),(4,3)$. Đường gần tối ưu trong slide là $f(x)=1+0.57x$. Với đầu vào mới $x=3$, ta tính $f(3)=2.71$. Đây là dự đoán nội suy vì đầu vào nằm giữa các giá trị đã quan sát.

**Chú ý về từ “tuyến tính”:** $b+wx$ là hàm affine theo đầu vào. Trong học máy, tên “mô hình tuyến tính” thường bao gồm bias. Khi dùng đặc trưng cố định, mô hình tuyến tính theo trọng số có thể tạo ra một đường cong theo đầu vào gốc.

Panel A019 • Bản render nguyên trang từ [A], trang PDF 19. Nội dung trong panel là bản gốc.

Panel A022 • Bản render nguyên trang từ [A], trang PDF 22. Nội dung trong panel là bản gốc.

### Cách đọc và giải thích

A019 so sánh đường thẳng một biến với mặt phẳng hai biến. Các đoạn nối điểm tới mặt thể hiện sai lệch dự đoán. A022 giữ đúng dữ liệu (1,1), (2,3), (4,3), đường đỏ và truy vấn x bằng ba. Đọc bảng để phân biệt mẫu train với điểm truy vấn, rồi tính dự đoán từ phương trình đường. Các chấm là quan sát, không phải đường sinh dữ liệu đã được chứng minh.

**Tự kiểm tra (áp dụng cho các panel trên):** Đầu vào ba được trả thành bao nhiêu với đường đỏ trong slide?

**Đáp án và ý nghĩa:** Giá trị là 1 + 0,57 × 3 = 2,71. Không dùng tọa độ của một điểm train gần nhất thay cho phép tính của mô hình.
-->


---

<div class="track"><span>02 – Hồi quy tuyến tính và gradient descent</span><span>ML tổng hợp</span></div>

# Phần dư và MSE



$$
r_i=\hat y_i-y_i,\qquad \ell_i=r_i^2,\qquad J=\frac1n\sum_ir_i^2
$$


| Mẫu | Dự đoán | Phần dư | Loss |
|---|---:|---:|---:|
| $(1,1)$ | 1,57 | 0,57 | 0,3249 |
| $(2,3)$ | 2,14 | −0,86 | 0,7396 |
| $(4,3)$ | 3,28 | 0,28 | 0,0784 |


<div class="answer" v-click>MSE ≈ <b>0,38097</b>. Tổng phần dư gần không vì hai dấu có thể triệt tiêu</div>



<!--
Nguồn: Hoc_may_Tong_hop_chuyen_sau_3_bai_giang.pdf, trang 19, 25.



**Phần dư** là dự đoán trừ giá trị thật. Dấu dương cho biết dự đoán cao hơn thực tế, dấu âm cho biết dự đoán thấp hơn.

$$r_i=f_w(x_i)-y_i,\qquad \ell_i=r_i^2,\qquad
J(w)=\frac1n\sum_{i=1}^n r_i^2.$$

Với đường $f(x)=1+0.57x$, tính lần lượt:

| Mẫu | Dự đoán | Phần dư | Bình phương phần dư |
|---|---:|---:|---:|
| $(1,1)$ | $1.57$ | $0.57$ | $0.3249$ |
| $(2,3)$ | $2.14$ | $-0.86$ | $0.7396$ |
| $(4,3)$ | $3.28$ | $0.28$ | $0.0784$ |

$$J=\frac{0.3249+0.7396+0.0784}{3}\approx0.38097.$$

Cộng phần dư trực tiếp chỉ được $-0.01$, dễ gây hiểu lầm rằng sai số rất nhỏ vì hai dấu triệt tiêu nhau. Bình phương loại bỏ vấn đề này, đồng thời phạt sai số lớn mạnh hơn.

**Hệ quả:** loss bình phương mượt và dễ lấy đạo hàm, nhưng nhạy với ngoại lai. Giá trị loss có đơn vị là bình phương đơn vị của đầu ra. Căn bậc hai của MSE đưa về đơn vị gốc.

Panel A029 • Bản render nguyên trang từ [A], trang PDF 29. Nội dung trong panel là bản gốc.

Panel A031 • Bản render nguyên trang từ [A], trang PDF 31. Nội dung trong panel là bản gốc.

### Cách đọc và giải thích

A029 giữ bảng dự đoán và phần dư, cùng đoạn thẳng đứng từ mỗi điểm tới đường. Bình phương rồi lấy trung bình tạo MSE xấp xỉ 0,38097. Trong A031, trục ngang là chiều cao (cm), trục dọc là cân nặng (kg). Điểm ngoại lai phía trên trái trong hình phải kéo đường hồi quy lệch khỏi xu hướng của đa số điểm. Không diễn giải đường này như quan hệ nhân quả.

**Tự kiểm tra (áp dụng cho các panel trên):** Vì sao tổng phần dư gần không trong A029 chưa chứng tỏ mô hình rất chính xác?

**Đáp án và ý nghĩa:** Phần dư dương và âm có thể triệt tiêu. MSE không triệt tiêu dấu và phạt mạnh độ lệch lớn, cũng chính là lý do nhạy với ngoại lai.
-->


---

<div class="track"><span>02 – Hồi quy tuyến tính và gradient descent</span><span>ML tổng hợp</span></div>

# Bình phương sai số và ngoại lai


<figure><img src="/images/outlier.png" style="max-height:255px" alt="Chiều cao (cm) và cân nặng (kg), panel A031 trong PDF"/><figcaption>Chiều cao (cm) và cân nặng (kg), panel A031 trong PDF</figcaption></figure>

- Bình phương loại bỏ triệt tiêu dấu, phạt mạnh sai lệch lớn
- Điểm ngoại lai có thể kéo đường lệch khỏi xu hướng đa số


<!--
Nguồn: Hoc_may_Tong_hop_chuyen_sau_3_bai_giang.pdf, trang 19, 25.



**Phần dư** là dự đoán trừ giá trị thật. Dấu dương cho biết dự đoán cao hơn thực tế, dấu âm cho biết dự đoán thấp hơn.

$$r_i=f_w(x_i)-y_i,\qquad \ell_i=r_i^2,\qquad
J(w)=\frac1n\sum_{i=1}^n r_i^2.$$

Với đường $f(x)=1+0.57x$, tính lần lượt:

| Mẫu | Dự đoán | Phần dư | Bình phương phần dư |
|---|---:|---:|---:|
| $(1,1)$ | $1.57$ | $0.57$ | $0.3249$ |
| $(2,3)$ | $2.14$ | $-0.86$ | $0.7396$ |
| $(4,3)$ | $3.28$ | $0.28$ | $0.0784$ |

$$J=\frac{0.3249+0.7396+0.0784}{3}\approx0.38097.$$

Cộng phần dư trực tiếp chỉ được $-0.01$, dễ gây hiểu lầm rằng sai số rất nhỏ vì hai dấu triệt tiêu nhau. Bình phương loại bỏ vấn đề này, đồng thời phạt sai số lớn mạnh hơn.

**Hệ quả:** loss bình phương mượt và dễ lấy đạo hàm, nhưng nhạy với ngoại lai. Giá trị loss có đơn vị là bình phương đơn vị của đầu ra. Căn bậc hai của MSE đưa về đơn vị gốc.

Panel A029 • Bản render nguyên trang từ [A], trang PDF 29. Nội dung trong panel là bản gốc.

Panel A031 • Bản render nguyên trang từ [A], trang PDF 31. Nội dung trong panel là bản gốc.

### Cách đọc và giải thích

A029 giữ bảng dự đoán và phần dư, cùng đoạn thẳng đứng từ mỗi điểm tới đường. Bình phương rồi lấy trung bình tạo MSE xấp xỉ 0,38097. Trong A031, trục ngang là chiều cao (cm), trục dọc là cân nặng (kg). Điểm ngoại lai phía trên trái trong hình phải kéo đường hồi quy lệch khỏi xu hướng của đa số điểm. Không diễn giải đường này như quan hệ nhân quả.

**Tự kiểm tra (áp dụng cho các panel trên):** Vì sao tổng phần dư gần không trong A029 chưa chứng tỏ mô hình rất chính xác?

**Đáp án và ý nghĩa:** Phần dư dương và âm có thể triệt tiêu. MSE không triệt tiêu dấu và phạt mạnh độ lệch lớn, cũng chính là lý do nhạy với ngoại lai.
-->


---

<div class="track"><span>02 – Hồi quy tuyến tính và gradient descent</span><span>ML tổng hợp</span></div>

# Gradient của hồi quy



$$
\frac{\partial\ell_i}{\partial w_j}=2(\hat y_i-y_i)\phi_j(x_i)
$$



$$
\nabla_wJ=\frac2n\sum_i(w^\top\phi(x_i)-y_i)\phi(x_i)
$$



<div class="note">Gradient gom đạo hàm theo từng trọng số. MSE dùng trung bình nên phải chia số mẫu</div>



<!--
Nguồn: Hoc_may_Tong_hop_chuyen_sau_3_bai_giang.pdf, trang 20.



Đặt $s_i=w^\top\phi(x_i)$ và $r_i=s_i-y_i$. Loss là phép hợp của tích vô hướng, phép trừ và bình phương. Quy tắc chuỗi cho biết ảnh hưởng của từng trọng số đi qua các phép này.

$$\frac{\partial\ell_i}{\partial w_j}
=\frac{\partial\ell_i}{\partial r_i}
\frac{\partial r_i}{\partial s_i}
\frac{\partial s_i}{\partial w_j}
=2r_i\cdot1\cdot\phi_j(x_i).$$

Gom tất cả thành phần và lấy trung bình trên tập train:

$$\nabla_w J(w)=\frac2n\sum_{i=1}^n
\big(w^\top\phi(x_i)-y_i\big)\phi(x_i).$$

### Vì sao trừ gradient?

Với một dịch chuyển nhỏ $\Delta w$, xấp xỉ bậc nhất là:

$$J(w+\Delta w)\approx J(w)+\nabla J(w)^\top\Delta w.$$

Chọn $\Delta w=-\eta\nabla J(w)$ làm phần thay đổi xấp xỉ bằng $-\eta\|\nabla J(w)\|^2$, không dương. Điều này giải thích hướng đi xuống, với điều kiện bước học đủ nhỏ để xấp xỉ còn hữu ích.

$$w\leftarrow w-\eta\nabla_wJ(w).$$

**Tốc độ học** quá nhỏ làm tiến triển chậm. Quá lớn có thể gây dao động hoặc phân kỳ. Gradient bằng không là điều kiện dừng lý tưởng. Trong thực hành, thường dùng ngưỡng nhỏ, mức giảm loss, giới hạn vòng lặp hoặc validation.

Một số tài liệu định nghĩa loss có hệ số một phần hai. Khi đó hệ số 2 trong gradient biến mất. Cả hai quy ước đều hợp lệ, nhưng phải nhất quán giữa công thức loss, gradient và tốc độ học.
-->


---

<div class="track"><span>02 – Hồi quy tuyến tính và gradient descent</span><span>ML tổng hợp</span></div>

# Một bước gradient descent



$$
w^{(t+1)}=w^{(t)}-\eta\nabla J(w^{(t)})
$$


Khởi tạo $w=[0,0]^\top$, tốc độ học $\eta=0.1$

| Mẫu | Gradient loss từng mẫu |
|---|---|
| $(1,1)$ | $[-2,-2]$ |
| $(2,3)$ | $[-6,-12]$ |
| $(4,3)$ | $[-6,-24]$ |


<div class="answer" v-click>Gradient trung bình ≈ (−4,667, −12,667)<br/>Trọng số mới ≈ <b>(0,467, 1,267)</b></div>



<!--
Nguồn: Hoc_may_Tong_hop_chuyen_sau_3_bai_giang.pdf, trang 21, 27.



Dùng $\phi(x)=[1,x]^\top$, khởi tạo $w^{(0)}=[0,0]^\top$, và $\eta=0.1$. Tại khởi tạo, mọi dự đoán đều bằng không.

| Mẫu | Phần dư | Gradient loss một mẫu |
|---|---:|---|
| $(1,1)$ | $-1$ | $2(-1)[1,1]^\top=[-2,-2]^\top$ |
| $(2,3)$ | $-3$ | $2(-3)[1,2]^\top=[-6,-12]^\top$ |
| $(4,3)$ | $-3$ | $2(-3)[1,4]^\top=[-6,-24]^\top$ |

$$\nabla J(w^{(0)})=\frac13\begin{bmatrix}-14\\-38\end{bmatrix}
=\begin{bmatrix}-4.6667\\-12.6667\end{bmatrix}.$$

$$w^{(1)}=\begin{bmatrix}0\\0\end{bmatrix}
-0.1\begin{bmatrix}-4.6667\\-12.6667\end{bmatrix}
=\begin{bmatrix}0.4667\\1.2667\end{bmatrix}.$$

Đường mới dự đoán lần lượt $1.7333,3.0000,5.5333$. Phần dư là $0.7333,0,2.5333$, nên gradient mới xấp xỉ $[2.1778,7.2444]^\top$. Bước kế tiếp đưa trọng số về $[0.2489,0.5422]^\top$.

| Sau số bước | Bias | Độ dốc | Ý nghĩa |
|---:|---:|---:|---|
| 1 | $0.4667$ | $1.2667$ | Đường tăng quá dốc ở phía phải |
| 2 | $0.2489$ | $0.5422$ | Điều chỉnh trở lại |
| 50 | $0.906$ | $0.604$ | Gần nghiệm tối ưu |
| 200 | $0.9998$ | $0.5715$ | Gần $[1,4/7]^\top$ |

**Nghiệm chính xác** là $f(x)=1+(4/7)x$, có MSE $8/21\approx0.380952$. Không thể đưa loss về không bằng một đường thẳng vì ba điểm này không thẳng hàng.

Panel A036 • Bản render nguyên trang từ [A], trang PDF 36. Nội dung trong panel là bản gốc.

Panel A037 • Bản render nguyên trang từ [A], trang PDF 37. Nội dung trong panel là bản gốc.

### Cách đọc và giải thích

A036 bắt đầu ở vector trọng số không, cộng gradient ba mẫu rồi chia ba, cho gradient xấp xỉ (-4,667; -12,667). Với tốc độ học 0,1, trọng số sau bước đầu là (0,467; 1,267). A037 phân biệt gradient dùng ở bước, trọng số sau bước và TrainLoss trước bước. Đọc đúng tiêu đề cột để không so loss và tham số thuộc hai thời điểm khác nhau. Lời giải chi tiết được viết bằng LaTeX ở phần lý thuyết của chương.

**Tự kiểm tra (áp dụng cho các panel trên):** Tổng gradient (-14; -38) đã là gradient của MSE chưa?

**Đáp án và ý nghĩa:** Chưa, phải chia số mẫu bằng ba. Dùng tổng thay cho trung bình sẽ làm độ lớn cập nhật khác đi nếu không đổi tốc độ học.
-->


---

<div class="track"><span>02 – Hồi quy tuyến tính và gradient descent</span><span>ML tổng hợp</span></div>

# Tốc độ học và hội tụ


| Bước học | Hành vi có thể gặp |
|---|---|
| Quá nhỏ | Loss giảm chậm |
| Phù hợp | Tiến dần tới nghiệm |
| Quá lớn | Dao động mạnh hoặc phân kỳ |


$$
\nabla^2J=\frac2n\Phi^\top\Phi\succeq0
$$



<div class="note">Loss bình phương tuyến tính là hàm lồi khi feature cố định. Bước học vẫn phải phù hợp</div>



<!--
Nguồn: Hoc_may_Tong_hop_chuyen_sau_3_bai_giang.pdf, trang 22, 26, 28, 29.



Trong đồ thị dữ liệu, ta nhìn đường dự đoán thay đổi. Trong không gian tham số, mỗi vị trí là một cặp **bias và độ dốc**, được gắn với một giá trị loss.

**Đường mức** nối các tham số có cùng loss. Đi từ vùng loss cao đến vùng thấp tương ứng với cải thiện độ khớp. Hai cách nhìn mô tả cùng một quá trình: một bên là hành vi của hàm, một bên là vị trí của tham số.

### Vì sao ví dụ có thể dao động mà vẫn hội tụ?

Hai thành phần trọng số tác động lẫn nhau. Đổi độ dốc có thể khiến dự đoán ở đầu vào lớn thay đổi mạnh, nên bước tiếp theo sửa lại theo hướng ngược. Dao động giảm dần là có thể chấp nhận, còn biên độ tăng dần gợi ý bước học quá lớn.

Với ma trận thiết kế $\Phi$ có mỗi hàng là $\phi(x_i)^\top$:

$$J(w)=\frac1n\|\Phi w-y\|^2,\qquad
\nabla^2J=\frac2n\Phi^\top\Phi\succeq0.$$

Hessian nửa xác định dương cho biết loss bình phương tuyến tính là **hàm lồi**. Mọi cực tiểu địa phương đều là cực tiểu toàn cục. Nghiệm duy nhất cần thêm điều kiện các cột đặc trưng độc lập tuyến tính.

**Lưu ý:** chuẩn hóa thang đo đầu vào có thể làm bài toán tối ưu dễ hơn. Chuẩn hóa phải được fit trên train, sau đó áp dụng cùng phép biến đổi cho validation và test.

Panel A032 • Bản render nguyên trang từ [A], trang PDF 32. Nội dung trong panel là bản gốc.

Panel A034 • Bản render nguyên trang từ [A], trang PDF 34. Nội dung trong panel là bản gốc.

### Cách đọc và giải thích

A032 có hai trục là trọng số, không phải đầu vào và nhãn. Màu biểu thị mức TrainLoss, ngôi sao là nghiệm (bias một, độ dốc 4/7). A034 minh họa ý tưởng đi ngược gradient trên mặt hàm nhiều biến. Hãy phân biệt đồ thị loss theo tham số với đồ thị dự đoán theo dữ liệu. Gradient chỉ là hướng thay đổi cục bộ, độ dài bước còn do tốc độ học.

Mặt ở A034 là hình minh họa chung. Tính lồi của hồi quy bình phương phải suy từ công thức, không suy từ dáng hình minh họa này.

**Tự kiểm tra (áp dụng cho các panel trên):** Có thể đọc độ dốc của đường dự đoán trực tiếp từ độ dốc bề mặt loss không?

**Đáp án và ý nghĩa:** Không. Hai đồ thị có biến số và đại lượng trên trục khác nhau. Độ dốc đường dự đoán là một tham số, còn gradient loss là đạo hàm theo tham số.

Panel A038 • Bản render nguyên trang từ [A], trang PDF 38. Nội dung trong panel là bản gốc.

Panel A039 • Bản render nguyên trang từ [A], trang PDF 39. Nội dung trong panel là bản gốc.

### Cách đọc và giải thích

A038 là hình dung mặt loss theo hai tham số. A039 diễn tả đi ngược đạo hàm trong một chiều, rồi đổi hướng khi vượt qua vùng cực tiểu. A040 đặt đường dự đoán bên trái và vị trí tham số trên đường mức bên phải. Tệp PDF chỉ giữ một khung của minh họa quỹ đạo, không có toàn bộ hoạt ảnh. [DIỄN GIẢI] Dao động có thể giảm dần và hội tụ, cũng có thể tăng dần nếu bước học không phù hợp. Panel còn lại của nhóm được phóng riêng ở trang kế tiếp.

**Tự kiểm tra (áp dụng cho các panel trên):** Vì sao không thể từ khung t bằng không ở A040 kết luận thuật toán đã đi tới ngôi sao?

**Đáp án và ý nghĩa:** Khung đó hiển thị điểm khởi tạo, còn ngôi sao đánh dấu nghiệm đích. Cần các bước tính hoặc khung tiếp theo để mô tả chuyển động thực tế.

Panel A040 • Bản render nguyên trang từ [A], trang PDF 40. Nội dung trong panel là bản gốc.

### Cách đọc và giải thích

A040 đặt đường dự đoán bên trái và vị trí tham số trên đường mức bên phải. Tệp PDF chỉ giữ một khung của minh họa quỹ đạo, không có toàn bộ hoạt ảnh. [DIỄN GIẢI] Dao động có thể giảm dần và hội tụ, cũng có thể tăng dần nếu bước học không phù hợp.

**Tự kiểm tra (áp dụng cho các panel trên):** Vì sao không thể từ khung t bằng không ở A040 kết luận thuật toán đã đi tới ngôi sao?

**Đáp án và ý nghĩa:** Khung đó hiển thị điểm khởi tạo, còn ngôi sao đánh dấu nghiệm đích. Cần các bước tính hoặc khung tiếp theo để mô tả chuyển động thực tế.
-->


---

<div class="track"><span>02 – Hồi quy tuyến tính và gradient descent</span><span>ML tổng hợp</span></div>

# Thử từng bước học


<GradientDemo />


<!--
Nguồn: Hoc_may_Tong_hop_chuyen_sau_3_bai_giang.pdf, trang 21, 22, 27.

Biểu đồ tương tác tính lại MSE và gradient từ đúng ba điểm của bài giảng. Các giá trị hiển thị là phép tính, không phải dữ liệu thực nghiệm mới.

Dùng $\phi(x)=[1,x]^\top$, khởi tạo $w^{(0)}=[0,0]^\top$, và $\eta=0.1$. Tại khởi tạo, mọi dự đoán đều bằng không.

| Mẫu | Phần dư | Gradient loss một mẫu |
|---|---:|---|
| $(1,1)$ | $-1$ | $2(-1)[1,1]^\top=[-2,-2]^\top$ |
| $(2,3)$ | $-3$ | $2(-3)[1,2]^\top=[-6,-12]^\top$ |
| $(4,3)$ | $-3$ | $2(-3)[1,4]^\top=[-6,-24]^\top$ |

$$\nabla J(w^{(0)})=\frac13\begin{bmatrix}-14\\-38\end{bmatrix}
=\begin{bmatrix}-4.6667\\-12.6667\end{bmatrix}.$$

$$w^{(1)}=\begin{bmatrix}0\\0\end{bmatrix}
-0.1\begin{bmatrix}-4.6667\\-12.6667\end{bmatrix}
=\begin{bmatrix}0.4667\\1.2667\end{bmatrix}.$$

Đường mới dự đoán lần lượt $1.7333,3.0000,5.5333$. Phần dư là $0.7333,0,2.5333$, nên gradient mới xấp xỉ $[2.1778,7.2444]^\top$. Bước kế tiếp đưa trọng số về $[0.2489,0.5422]^\top$.

| Sau số bước | Bias | Độ dốc | Ý nghĩa |
|---:|---:|---:|---|
| 1 | $0.4667$ | $1.2667$ | Đường tăng quá dốc ở phía phải |
| 2 | $0.2489$ | $0.5422$ | Điều chỉnh trở lại |
| 50 | $0.906$ | $0.604$ | Gần nghiệm tối ưu |
| 200 | $0.9998$ | $0.5715$ | Gần $[1,4/7]^\top$ |

**Nghiệm chính xác** là $f(x)=1+(4/7)x$, có MSE $8/21\approx0.380952$. Không thể đưa loss về không bằng một đường thẳng vì ba điểm này không thẳng hàng.

Trong đồ thị dữ liệu, ta nhìn đường dự đoán thay đổi. Trong không gian tham số, mỗi vị trí là một cặp **bias và độ dốc**, được gắn với một giá trị loss.

**Đường mức** nối các tham số có cùng loss. Đi từ vùng loss cao đến vùng thấp tương ứng với cải thiện độ khớp. Hai cách nhìn mô tả cùng một quá trình: một bên là hành vi của hàm, một bên là vị trí của tham số.

### Vì sao ví dụ có thể dao động mà vẫn hội tụ?

Hai thành phần trọng số tác động lẫn nhau. Đổi độ dốc có thể khiến dự đoán ở đầu vào lớn thay đổi mạnh, nên bước tiếp theo sửa lại theo hướng ngược. Dao động giảm dần là có thể chấp nhận, còn biên độ tăng dần gợi ý bước học quá lớn.

Với ma trận thiết kế $\Phi$ có mỗi hàng là $\phi(x_i)^\top$:

$$J(w)=\frac1n\|\Phi w-y\|^2,\qquad
\nabla^2J=\frac2n\Phi^\top\Phi\succeq0.$$

Hessian nửa xác định dương cho biết loss bình phương tuyến tính là **hàm lồi**. Mọi cực tiểu địa phương đều là cực tiểu toàn cục. Nghiệm duy nhất cần thêm điều kiện các cột đặc trưng độc lập tuyến tính.

**Lưu ý:** chuẩn hóa thang đo đầu vào có thể làm bài toán tối ưu dễ hơn. Chuẩn hóa phải được fit trên train, sau đó áp dụng cùng phép biến đổi cho validation và test.

Panel A036 • Bản render nguyên trang từ [A], trang PDF 36. Nội dung trong panel là bản gốc.

Panel A037 • Bản render nguyên trang từ [A], trang PDF 37. Nội dung trong panel là bản gốc.

### Cách đọc và giải thích

A036 bắt đầu ở vector trọng số không, cộng gradient ba mẫu rồi chia ba, cho gradient xấp xỉ (-4,667; -12,667). Với tốc độ học 0,1, trọng số sau bước đầu là (0,467; 1,267). A037 phân biệt gradient dùng ở bước, trọng số sau bước và TrainLoss trước bước. Đọc đúng tiêu đề cột để không so loss và tham số thuộc hai thời điểm khác nhau. Lời giải chi tiết được viết bằng LaTeX ở phần lý thuyết của chương.

**Tự kiểm tra (áp dụng cho các panel trên):** Tổng gradient (-14; -38) đã là gradient của MSE chưa?

**Đáp án và ý nghĩa:** Chưa, phải chia số mẫu bằng ba. Dùng tổng thay cho trung bình sẽ làm độ lớn cập nhật khác đi nếu không đổi tốc độ học.
-->


---

<div class="track"><span>02 – Hồi quy tuyến tính và gradient descent</span><span>ML tổng hợp</span></div>

# Nghiệm của ví dụ ba điểm



$$
w^*=\begin{bmatrix}1\\4/7\end{bmatrix},\qquad f(x)=1+\frac47x,\qquad J_{\min}=\frac8{21}
$$


- Ba điểm không thẳng hàng nên MSE nhỏ nhất vẫn dương
- Dừng thực tế: gradient nhỏ, loss ít cải thiện hoặc hết số bước


<div class="note">Công thức gradient sẽ mất hệ số 2 nếu định nghĩa loss có thêm hệ số 1/2</div>



<!--
Nguồn: Hoc_may_Tong_hop_chuyen_sau_3_bai_giang.pdf, trang 20, 21, 22.



Đặt $s_i=w^\top\phi(x_i)$ và $r_i=s_i-y_i$. Loss là phép hợp của tích vô hướng, phép trừ và bình phương. Quy tắc chuỗi cho biết ảnh hưởng của từng trọng số đi qua các phép này.

$$\frac{\partial\ell_i}{\partial w_j}
=\frac{\partial\ell_i}{\partial r_i}
\frac{\partial r_i}{\partial s_i}
\frac{\partial s_i}{\partial w_j}
=2r_i\cdot1\cdot\phi_j(x_i).$$

Gom tất cả thành phần và lấy trung bình trên tập train:

$$\nabla_w J(w)=\frac2n\sum_{i=1}^n
\big(w^\top\phi(x_i)-y_i\big)\phi(x_i).$$

### Vì sao trừ gradient?

Với một dịch chuyển nhỏ $\Delta w$, xấp xỉ bậc nhất là:

$$J(w+\Delta w)\approx J(w)+\nabla J(w)^\top\Delta w.$$

Chọn $\Delta w=-\eta\nabla J(w)$ làm phần thay đổi xấp xỉ bằng $-\eta\|\nabla J(w)\|^2$, không dương. Điều này giải thích hướng đi xuống, với điều kiện bước học đủ nhỏ để xấp xỉ còn hữu ích.

$$w\leftarrow w-\eta\nabla_wJ(w).$$

**Tốc độ học** quá nhỏ làm tiến triển chậm. Quá lớn có thể gây dao động hoặc phân kỳ. Gradient bằng không là điều kiện dừng lý tưởng. Trong thực hành, thường dùng ngưỡng nhỏ, mức giảm loss, giới hạn vòng lặp hoặc validation.

Một số tài liệu định nghĩa loss có hệ số một phần hai. Khi đó hệ số 2 trong gradient biến mất. Cả hai quy ước đều hợp lệ, nhưng phải nhất quán giữa công thức loss, gradient và tốc độ học.

Dùng $\phi(x)=[1,x]^\top$, khởi tạo $w^{(0)}=[0,0]^\top$, và $\eta=0.1$. Tại khởi tạo, mọi dự đoán đều bằng không.

| Mẫu | Phần dư | Gradient loss một mẫu |
|---|---:|---|
| $(1,1)$ | $-1$ | $2(-1)[1,1]^\top=[-2,-2]^\top$ |
| $(2,3)$ | $-3$ | $2(-3)[1,2]^\top=[-6,-12]^\top$ |
| $(4,3)$ | $-3$ | $2(-3)[1,4]^\top=[-6,-24]^\top$ |

$$\nabla J(w^{(0)})=\frac13\begin{bmatrix}-14\\-38\end{bmatrix}
=\begin{bmatrix}-4.6667\\-12.6667\end{bmatrix}.$$

$$w^{(1)}=\begin{bmatrix}0\\0\end{bmatrix}
-0.1\begin{bmatrix}-4.6667\\-12.6667\end{bmatrix}
=\begin{bmatrix}0.4667\\1.2667\end{bmatrix}.$$

Đường mới dự đoán lần lượt $1.7333,3.0000,5.5333$. Phần dư là $0.7333,0,2.5333$, nên gradient mới xấp xỉ $[2.1778,7.2444]^\top$. Bước kế tiếp đưa trọng số về $[0.2489,0.5422]^\top$.

| Sau số bước | Bias | Độ dốc | Ý nghĩa |
|---:|---:|---:|---|
| 1 | $0.4667$ | $1.2667$ | Đường tăng quá dốc ở phía phải |
| 2 | $0.2489$ | $0.5422$ | Điều chỉnh trở lại |
| 50 | $0.906$ | $0.604$ | Gần nghiệm tối ưu |
| 200 | $0.9998$ | $0.5715$ | Gần $[1,4/7]^\top$ |

**Nghiệm chính xác** là $f(x)=1+(4/7)x$, có MSE $8/21\approx0.380952$. Không thể đưa loss về không bằng một đường thẳng vì ba điểm này không thẳng hàng.

Trong đồ thị dữ liệu, ta nhìn đường dự đoán thay đổi. Trong không gian tham số, mỗi vị trí là một cặp **bias và độ dốc**, được gắn với một giá trị loss.

**Đường mức** nối các tham số có cùng loss. Đi từ vùng loss cao đến vùng thấp tương ứng với cải thiện độ khớp. Hai cách nhìn mô tả cùng một quá trình: một bên là hành vi của hàm, một bên là vị trí của tham số.

### Vì sao ví dụ có thể dao động mà vẫn hội tụ?

Hai thành phần trọng số tác động lẫn nhau. Đổi độ dốc có thể khiến dự đoán ở đầu vào lớn thay đổi mạnh, nên bước tiếp theo sửa lại theo hướng ngược. Dao động giảm dần là có thể chấp nhận, còn biên độ tăng dần gợi ý bước học quá lớn.

Với ma trận thiết kế $\Phi$ có mỗi hàng là $\phi(x_i)^\top$:

$$J(w)=\frac1n\|\Phi w-y\|^2,\qquad
\nabla^2J=\frac2n\Phi^\top\Phi\succeq0.$$

Hessian nửa xác định dương cho biết loss bình phương tuyến tính là **hàm lồi**. Mọi cực tiểu địa phương đều là cực tiểu toàn cục. Nghiệm duy nhất cần thêm điều kiện các cột đặc trưng độc lập tuyến tính.

**Lưu ý:** chuẩn hóa thang đo đầu vào có thể làm bài toán tối ưu dễ hơn. Chuẩn hóa phải được fit trên train, sau đó áp dụng cùng phép biến đổi cho validation và test.
-->


---

<div class="track"><span>02 – Hồi quy tuyến tính và gradient descent</span><span>ML tổng hợp</span></div>

# Tự luyện – Gradient bằng không có nghĩa loss bằng không?



<div class="answer" v-click>Không. Mô hình có thể đã đạt nghiệm tốt nhất trong lớp nhưng vẫn còn sai số không thể khớp.</div>



<div class="note">Thử trả lời trước khi bấm Tiếp</div>



<!--
Nguồn: Hoc_may_Tong_hop_chuyen_sau_3_bai_giang.pdf, trang 21, 162.



Dùng $\phi(x)=[1,x]^\top$, khởi tạo $w^{(0)}=[0,0]^\top$, và $\eta=0.1$. Tại khởi tạo, mọi dự đoán đều bằng không.

| Mẫu | Phần dư | Gradient loss một mẫu |
|---|---:|---|
| $(1,1)$ | $-1$ | $2(-1)[1,1]^\top=[-2,-2]^\top$ |
| $(2,3)$ | $-3$ | $2(-3)[1,2]^\top=[-6,-12]^\top$ |
| $(4,3)$ | $-3$ | $2(-3)[1,4]^\top=[-6,-24]^\top$ |

$$\nabla J(w^{(0)})=\frac13\begin{bmatrix}-14\\-38\end{bmatrix}
=\begin{bmatrix}-4.6667\\-12.6667\end{bmatrix}.$$

$$w^{(1)}=\begin{bmatrix}0\\0\end{bmatrix}
-0.1\begin{bmatrix}-4.6667\\-12.6667\end{bmatrix}
=\begin{bmatrix}0.4667\\1.2667\end{bmatrix}.$$

Đường mới dự đoán lần lượt $1.7333,3.0000,5.5333$. Phần dư là $0.7333,0,2.5333$, nên gradient mới xấp xỉ $[2.1778,7.2444]^\top$. Bước kế tiếp đưa trọng số về $[0.2489,0.5422]^\top$.

| Sau số bước | Bias | Độ dốc | Ý nghĩa |
|---:|---:|---:|---|
| 1 | $0.4667$ | $1.2667$ | Đường tăng quá dốc ở phía phải |
| 2 | $0.2489$ | $0.5422$ | Điều chỉnh trở lại |
| 50 | $0.906$ | $0.604$ | Gần nghiệm tối ưu |
| 200 | $0.9998$ | $0.5715$ | Gần $[1,4/7]^\top$ |

**Nghiệm chính xác** là $f(x)=1+(4/7)x$, có MSE $8/21\approx0.380952$. Không thể đưa loss về không bằng một đường thẳng vì ba điểm này không thẳng hàng.

**[CÂU HỎI BIÊN SOẠN]** Dựa trên nội dung chương. Hãy tự trả lời trước rồi mới xem phần giải thích dưới từng câu.

### 2.1 • Ghi nhớ

**Phần dư và MSE là gì?**

Phần dư bằng dự đoán trừ nhãn. MSE là trung bình bình phương phần dư, không phải bình phương trung bình phần dư.

### 2.2 • Thông hiểu

**Vì sao MSE nhạy với ngoại lai?**

Sai lệch lớn bị bình phương nên đóng góp tăng nhanh. Gradient cũng tỷ lệ phần dư, kéo nghiệm theo các điểm lệch lớn.

### 2.3 • Vận dụng

**Từ trọng số không, dữ liệu (1,1),(2,3),(4,3), tốc độ học 0,1: bước đầu?**

Gradient là (−14/3;−38/3). Trừ 0,1 lần gradient cho trọng số (0,4667;1,2667). Cần chia ba vì dùng trung bình.

### 2.4 • Phân tích

**Gradient bằng không có luôn nghĩa là loss bằng không?**

Không. Ở nghiệm tốt nhất trong lớp, vẫn có thể còn sai số không thể khớp. Ví dụ ba điểm có MSE tối ưu 8/21.

### 2.5 • Đánh giá

**Đường thẳng train kém: nên tăng bước học hay thêm feature?**

Trước hết xem tối ưu đã hội tụ chưa và dữ liệu có cấu trúc cong không. Hội tụ tốt nhưng lớp không biểu diễn được thì chỉnh biểu diễn, không chỉ bước học.
-->


---

<div class="track"><span>03 – Phân loại tuyến tính và thiết kế loss</span><span>ML tổng hợp</span></div>

# Score, nhãn và ranh giới



$$
s(x)=w^\top x+b,\qquad \hat y=\operatorname{sign}(s(x))
$$


- Ranh giới nhị phân: $w^\top x+b=0$
- $w$ vuông góc với ranh giới và hướng về score tăng
- Đa lớp: chọn $\hat y=\arg\max_j s_j(x)$


<div class="note">Score có thể âm. Nó chưa phải xác suất</div>



<!--
Nguồn: Hoc_may_Tong_hop_chuyen_sau_3_bai_giang.pdf, trang 32, 40.



Với phân loại nhị phân, mô hình tính **điểm số** rồi đổi điểm số thành nhãn:

$$s(x)=w^\top x+b,\qquad
\widehat y=\begin{cases}+1,&s(x)\ge0,\\-1,&s(x)Panel A056 • Bản render nguyên trang từ [A], trang PDF 56. Nội dung trong panel là bản gốc.

Panel A058 • Bản render nguyên trang từ [A], trang PDF 58. Nội dung trong panel là bản gốc.

### Cách đọc và giải thích

A056 minh họa một điểm và đường phân cách của một lớp. Score là tích vô hướng cộng bias, còn khoảng cách có dấu cần chia cho chuẩn trọng số. A058 đặt siêu phẳng trong không gian ba chiều cạnh nhiều bộ chấm điểm lớp ảnh. Mỗi lớp có thể có score riêng; ranh giới giữa hai lớp xảy ra nơi hai score bằng nhau. Không suy từ một hình vẽ rằng mọi phương pháp đa lớp luôn có đúng một số đường cố định.

**Tự kiểm tra (áp dụng cho các panel trên):** Nhân cả trọng số và bias với hai có làm đổi ranh giới nhị phân không?

**Đáp án và ý nghĩa:** Không, nếu hệ số nhân dương. Score tăng gấp đôi nhưng khoảng cách sau chuẩn hóa không đổi.
-->


---

<div class="track"><span>03 – Phân loại tuyến tính và thiết kế loss</span><span>ML tổng hợp</span></div>

# Khoảng cách và functional margin



$$
m=y\,s(x),\qquad d_{\rm signed}=\frac{s(x)}{\|w\|}
$$


| Margin | Ý nghĩa |
|---|---|
| $m<0$ | Sai dấu |
| $0<m<1$ | Đúng dấu, chưa đạt biên hinge |
| $m\ge1$ | Hinge không còn phạt |


<div class="note">Nhân cả w và b với số dương giữ nguyên ranh giới nhưng đổi score và functional margin</div>



<!--
Nguồn: Hoc_may_Tong_hop_chuyen_sau_3_bai_giang.pdf, trang 33, 40, 43.



Với nhãn $y\in\{-1,+1\}$, đặt **functional margin** là $m=y\,s(x)$. Khi dự đoán đúng dấu, margin dương. Khi sai dấu, margin âm.

$$\ell_{01}=\mathbf1[\widehat y\ne y],\qquad
\ell_{\rm hinge}=\max(0,1-m).$$

| Margin | Tình huống | Hinge loss |
|---:|---|---:|
| $-2$ | Sai dấu và tự tin sai | $3$ |
| $0.3$ | Đúng dấu nhưng sát ranh giới | $0.7$ |
| $1$ | Vừa đạt ngưỡng margin | $0$ |
| $2$ | Đúng và vượt ngưỡng | $0$ |

Loss 0–1 khớp trực tiếp mục tiêu đếm lỗi, nhưng gần như không cung cấp gradient hữu ích. Hinge cho biết cả điểm đúng nhưng margin nhỏ vẫn cần được đẩy xa hơn.

$$\nabla_w\ell_{\rm hinge}=
\begin{cases}-y\phi(x),&m1,\end{cases}
\qquad
\frac{\partial\ell_{\rm hinge}}{\partial b}=
\begin{cases}-y,&m1.\end{cases}$$

Tại $m=1$, hàm có góc gãy. Ta dùng **subgradient**: một lựa chọn hợp lệ giữa hai nhánh đạo hàm, chẳng hạn không cập nhật ở điểm gãy.

### Margin không tự động là khoảng cách hình học

Khoảng cách có dấu đến siêu phẳng là $s(x)/\|w\|$. Nhân cả $w,b$ với một số dương giữ nguyên ranh giới nhưng làm score và functional margin tăng. Do đó, hinge thường được ghép với điều chuẩn để kiểm soát độ lớn trọng số.

Ở điểm score bằng không, cần chốt quy ước chọn lớp. Công thức đếm lỗi bằng nhãn dự đoán tránh sự mơ hồ của việc dùng bất đẳng thức nghiêm hoặc không nghiêm tại ranh giới.

Panel A056 • Bản render nguyên trang từ [A], trang PDF 56. Nội dung trong panel là bản gốc.

Panel A058 • Bản render nguyên trang từ [A], trang PDF 58. Nội dung trong panel là bản gốc.

### Cách đọc và giải thích

A056 minh họa một điểm và đường phân cách của một lớp. Score là tích vô hướng cộng bias, còn khoảng cách có dấu cần chia cho chuẩn trọng số. A058 đặt siêu phẳng trong không gian ba chiều cạnh nhiều bộ chấm điểm lớp ảnh. Mỗi lớp có thể có score riêng; ranh giới giữa hai lớp xảy ra nơi hai score bằng nhau. Không suy từ một hình vẽ rằng mọi phương pháp đa lớp luôn có đúng một số đường cố định.

**Tự kiểm tra (áp dụng cho các panel trên):** Nhân cả trọng số và bias với hai có làm đổi ranh giới nhị phân không?

**Đáp án và ý nghĩa:** Không, nếu hệ số nhân dương. Score tăng gấp đôi nhưng khoảng cách sau chuẩn hóa không đổi.

Panel A065 • Bản render nguyên trang từ [A], trang PDF 65. Nội dung trong panel là bản gốc.

Panel A066 • Bản render nguyên trang từ [A], trang PDF 66. Nội dung trong panel là bản gốc.

### Cách đọc và giải thích

A065 vẽ hàm đếm lỗi dạng bậc thang. Gần như mọi nơi, thay score một chút không đổi số lỗi, nên gradient không hữu ích cho việc học trực tiếp. A066 vẽ ranh giới trung tâm và hai đường biên margin; điểm đúng dấu nhưng nằm trong biên vẫn bị hinge phạt. Nhãn một và âm một là quy ước lớp, không phải khoảng cách Euclid một đơn vị.

Ở score bằng không cần chốt quy tắc nhãn. Dùng chỉ báo nhãn dự đoán khác nhãn thật sẽ tránh bất nhất giữa các dấu bất đẳng thức trong slide.

**Tự kiểm tra (áp dụng cho các panel trên):** Một điểm có margin 0,3 có loss 0–1 và hinge bằng bao nhiêu nếu được phân loại đúng?

**Đáp án và ý nghĩa:** Loss 0–1 bằng không, hinge bằng 0,7. Đoán đúng dấu và đạt margin đủ là hai yêu cầu khác nhau.
-->


---

<div class="track"><span>03 – Phân loại tuyến tính và thiết kế loss</span><span>ML tổng hợp</span></div>

# Loss 0–1 và hinge



$$
\ell_{01}=\mathbf1[\hat y\ne y],\qquad \ell_{\rm hinge}=\max(0,1-m)
$$


| Margin | Loss 0–1 | Hinge |
|---:|---:|---:|
| −2 | 1 | 3 |
| 0,3 | 0 | 0,7 |
| 2 | 0 | 0 |


<div class="note">0–1 khó học trực tiếp bằng gradient. Hinge còn phạt điểm đúng nhưng sát ranh giới</div>



<!--
Nguồn: Hoc_may_Tong_hop_chuyen_sau_3_bai_giang.pdf, trang 33, 43.



Với nhãn $y\in\{-1,+1\}$, đặt **functional margin** là $m=y\,s(x)$. Khi dự đoán đúng dấu, margin dương. Khi sai dấu, margin âm.

$$\ell_{01}=\mathbf1[\widehat y\ne y],\qquad
\ell_{\rm hinge}=\max(0,1-m).$$

| Margin | Tình huống | Hinge loss |
|---:|---|---:|
| $-2$ | Sai dấu và tự tin sai | $3$ |
| $0.3$ | Đúng dấu nhưng sát ranh giới | $0.7$ |
| $1$ | Vừa đạt ngưỡng margin | $0$ |
| $2$ | Đúng và vượt ngưỡng | $0$ |

Loss 0–1 khớp trực tiếp mục tiêu đếm lỗi, nhưng gần như không cung cấp gradient hữu ích. Hinge cho biết cả điểm đúng nhưng margin nhỏ vẫn cần được đẩy xa hơn.

$$\nabla_w\ell_{\rm hinge}=
\begin{cases}-y\phi(x),&m1,\end{cases}
\qquad
\frac{\partial\ell_{\rm hinge}}{\partial b}=
\begin{cases}-y,&m1.\end{cases}$$

Tại $m=1$, hàm có góc gãy. Ta dùng **subgradient**: một lựa chọn hợp lệ giữa hai nhánh đạo hàm, chẳng hạn không cập nhật ở điểm gãy.

### Margin không tự động là khoảng cách hình học

Khoảng cách có dấu đến siêu phẳng là $s(x)/\|w\|$. Nhân cả $w,b$ với một số dương giữ nguyên ranh giới nhưng làm score và functional margin tăng. Do đó, hinge thường được ghép với điều chuẩn để kiểm soát độ lớn trọng số.

Ở điểm score bằng không, cần chốt quy ước chọn lớp. Công thức đếm lỗi bằng nhãn dự đoán tránh sự mơ hồ của việc dùng bất đẳng thức nghiêm hoặc không nghiêm tại ranh giới.

Panel A065 • Bản render nguyên trang từ [A], trang PDF 65. Nội dung trong panel là bản gốc.

Panel A066 • Bản render nguyên trang từ [A], trang PDF 66. Nội dung trong panel là bản gốc.

### Cách đọc và giải thích

A065 vẽ hàm đếm lỗi dạng bậc thang. Gần như mọi nơi, thay score một chút không đổi số lỗi, nên gradient không hữu ích cho việc học trực tiếp. A066 vẽ ranh giới trung tâm và hai đường biên margin; điểm đúng dấu nhưng nằm trong biên vẫn bị hinge phạt. Nhãn một và âm một là quy ước lớp, không phải khoảng cách Euclid một đơn vị.

Ở score bằng không cần chốt quy tắc nhãn. Dùng chỉ báo nhãn dự đoán khác nhãn thật sẽ tránh bất nhất giữa các dấu bất đẳng thức trong slide.

**Tự kiểm tra (áp dụng cho các panel trên):** Một điểm có margin 0,3 có loss 0–1 và hinge bằng bao nhiêu nếu được phân loại đúng?

**Đáp án và ý nghĩa:** Loss 0–1 bằng không, hinge bằng 0,7. Đoán đúng dấu và đạt margin đủ là hai yêu cầu khác nhau.
-->


---

<div class="track"><span>03 – Phân loại tuyến tính và thiết kế loss</span><span>ML tổng hợp</span></div>

# Gradient hinge và L2



$$
\nabla_w\ell=\begin{cases}-y\phi(x),&m<1\\0,&m>1\end{cases}
$$



$$
J_{\rm reg}=\frac1n\sum_i\ell_i+\frac\lambda2\|w\|^2,\quad\nabla J_{\rm reg}=\nabla J+\lambda w
$$


- Tại $m=1$, dùng một subgradient hợp lệ
- L2 kiểm soát độ lớn trọng số, bias thường để ngoài phần phạt


<!--
Nguồn: Hoc_may_Tong_hop_chuyen_sau_3_bai_giang.pdf, trang 33, 34, 44.



Với nhãn $y\in\{-1,+1\}$, đặt **functional margin** là $m=y\,s(x)$. Khi dự đoán đúng dấu, margin dương. Khi sai dấu, margin âm.

$$\ell_{01}=\mathbf1[\widehat y\ne y],\qquad
\ell_{\rm hinge}=\max(0,1-m).$$

| Margin | Tình huống | Hinge loss |
|---:|---|---:|
| $-2$ | Sai dấu và tự tin sai | $3$ |
| $0.3$ | Đúng dấu nhưng sát ranh giới | $0.7$ |
| $1$ | Vừa đạt ngưỡng margin | $0$ |
| $2$ | Đúng và vượt ngưỡng | $0$ |

Loss 0–1 khớp trực tiếp mục tiêu đếm lỗi, nhưng gần như không cung cấp gradient hữu ích. Hinge cho biết cả điểm đúng nhưng margin nhỏ vẫn cần được đẩy xa hơn.

$$\nabla_w\ell_{\rm hinge}=
\begin{cases}-y\phi(x),&m1,\end{cases}
\qquad
\frac{\partial\ell_{\rm hinge}}{\partial b}=
\begin{cases}-y,&m1.\end{cases}$$

Tại $m=1$, hàm có góc gãy. Ta dùng **subgradient**: một lựa chọn hợp lệ giữa hai nhánh đạo hàm, chẳng hạn không cập nhật ở điểm gãy.

### Margin không tự động là khoảng cách hình học

Khoảng cách có dấu đến siêu phẳng là $s(x)/\|w\|$. Nhân cả $w,b$ với một số dương giữ nguyên ranh giới nhưng làm score và functional margin tăng. Do đó, hinge thường được ghép với điều chuẩn để kiểm soát độ lớn trọng số.

Ở điểm score bằng không, cần chốt quy ước chọn lớp. Công thức đếm lỗi bằng nhãn dự đoán tránh sự mơ hồ của việc dùng bất đẳng thức nghiêm hoặc không nghiêm tại ranh giới.

Logistic loss là một surrogate mượt cho phân loại nhị phân. Khi margin tăng, loss giảm liên tục, thay vì dừng hẳn sau ngưỡng như hinge.

$$\ell_{\rm logistic}(y,s)=\log(1+e^{-ys}),\qquad y\in\{-1,+1\}.$$

Nếu đổi nhãn sang $t=(y+1)/2\in\{0,1\}$ và đặt $p=\sigma(s)$, cùng loss đó được viết thành **binary cross-entropy**:

$$\sigma(s)=\frac1{1+e^{-s}},\qquad
\ell_{\rm BCE}=-t\log p-(1-t)\log(1-p).$$

Ví dụ, với nhãn thật bằng một, $p=0.9$ cho loss khoảng $0.1053$, còn $p=0.1$ cho loss khoảng $2.3026$. Mô hình bị phạt mạnh khi tự tin vào đáp án sai.

### Điều chuẩn L2 bổ sung sở thích về tham số

$$J_{\rm reg}(w)=\frac1n\sum_i\ell_i+\frac\lambda2\|w\|^2,
\qquad \nabla_wJ_{\rm reg}=\nabla_wJ+\lambda w.$$

L2 khuyến khích trọng số nhỏ, có thể giảm quá khớp. Hệ số $\lambda$ quá lớn làm mô hình kém linh hoạt và dễ thiếu khớp. Bias thường được để ngoài thành phần phạt, tùy quy ước đã chọn.

Panel A068 • Bản render nguyên trang từ [A], trang PDF 68. Nội dung trong panel là bản gốc.

Panel A069 • Bản render nguyên trang từ [A], trang PDF 69. Nội dung trong panel là bản gốc.

### Cách đọc và giải thích

A068 cho thấy hinge tuyến tính khi chưa đạt margin và phẳng khi đã đủ. A069 so sánh 0–1, hinge, logistic theo margin. Đọc miền âm là dự đoán sai dấu, miền dương là đúng dấu. Hinge ngừng phạt ở margin ít nhất một, logistic tiếp tục giảm dần và còn gradient ở margin hữu hạn. [DIỄN GIẢI] Các đường loss khác nhau có thể dẫn đến các bước học khác nhau dù dùng chung score.

**Tự kiểm tra (áp dụng cho các panel trên):** Vì sao điểm đúng với margin hai không còn đóng góp gradient hinge nhưng vẫn có gradient logistic?

**Đáp án và ý nghĩa:** Hinge đã ở miền phẳng, còn logistic giảm mượt trên toàn trục và chỉ tiến gần không khi margin tăng lớn.
-->


---

<div class="track"><span>03 – Phân loại tuyến tính và thiết kế loss</span><span>ML tổng hợp</span></div>

# Logistic và binary cross-entropy



$$
\ell_{\rm logistic}=\log(1+e^{-ys}),\qquad y\in\{-1,+1\}
$$



$$
p=\sigma(s),\qquad\ell_{\rm BCE}=-t\log p-(1-t)\log(1-p)
$$


Với $t=1$: xác suất 0,9 cho loss ≈ 0,1053<br/>
Xác suất 0,1 cho loss ≈ 2,3026


<div class="note">BCE dùng nhãn t ∈ {0,1}. Logistic dạng margin dùng nhãn ±1</div>



<!--
Nguồn: Hoc_may_Tong_hop_chuyen_sau_3_bai_giang.pdf, trang 34, 44.



Logistic loss là một surrogate mượt cho phân loại nhị phân. Khi margin tăng, loss giảm liên tục, thay vì dừng hẳn sau ngưỡng như hinge.

$$\ell_{\rm logistic}(y,s)=\log(1+e^{-ys}),\qquad y\in\{-1,+1\}.$$

Nếu đổi nhãn sang $t=(y+1)/2\in\{0,1\}$ và đặt $p=\sigma(s)$, cùng loss đó được viết thành **binary cross-entropy**:

$$\sigma(s)=\frac1{1+e^{-s}},\qquad
\ell_{\rm BCE}=-t\log p-(1-t)\log(1-p).$$

Ví dụ, với nhãn thật bằng một, $p=0.9$ cho loss khoảng $0.1053$, còn $p=0.1$ cho loss khoảng $2.3026$. Mô hình bị phạt mạnh khi tự tin vào đáp án sai.

### Điều chuẩn L2 bổ sung sở thích về tham số

$$J_{\rm reg}(w)=\frac1n\sum_i\ell_i+\frac\lambda2\|w\|^2,
\qquad \nabla_wJ_{\rm reg}=\nabla_wJ+\lambda w.$$

L2 khuyến khích trọng số nhỏ, có thể giảm quá khớp. Hệ số $\lambda$ quá lớn làm mô hình kém linh hoạt và dễ thiếu khớp. Bias thường được để ngoài thành phần phạt, tùy quy ước đã chọn.

Panel A068 • Bản render nguyên trang từ [A], trang PDF 68. Nội dung trong panel là bản gốc.

Panel A069 • Bản render nguyên trang từ [A], trang PDF 69. Nội dung trong panel là bản gốc.

### Cách đọc và giải thích

A068 cho thấy hinge tuyến tính khi chưa đạt margin và phẳng khi đã đủ. A069 so sánh 0–1, hinge, logistic theo margin. Đọc miền âm là dự đoán sai dấu, miền dương là đúng dấu. Hinge ngừng phạt ở margin ít nhất một, logistic tiếp tục giảm dần và còn gradient ở margin hữu hạn. [DIỄN GIẢI] Các đường loss khác nhau có thể dẫn đến các bước học khác nhau dù dùng chung score.

**Tự kiểm tra (áp dụng cho các panel trên):** Vì sao điểm đúng với margin hai không còn đóng góp gradient hinge nhưng vẫn có gradient logistic?

**Đáp án và ý nghĩa:** Hinge đã ở miền phẳng, còn logistic giảm mượt trên toàn trục và chỉ tiến gần không khi margin tăng lớn.
-->


---

<div class="track"><span>03 – Phân loại tuyến tính và thiết kế loss</span><span>ML tổng hợp</span></div>

# Softmax và cross-entropy đa lớp



$$
p_j=\frac{e^{s_j}}{\sum_ke^{s_k}},\quad\ell=-\log p_y,\quad\frac{\partial\ell}{\partial s_j}=p_j-\mathbf1[j=y]
$$


Score $[2,1,3]$, nhãn đúng là lớp 1

<div class="step" v-click><b>01</b><span>Softmax ≈ (0,2447, 0,0900, 0,6652)</span></div>


<div class="answer" v-click>Mô hình chọn lớp 3, cross-entropy ≈ <b>1,4076</b></div>



<div class="note">Trừ score lớn nhất trước khi lấy hàm mũ giúp tính ổn định</div>



<!--
Nguồn: Hoc_may_Tong_hop_chuyen_sau_3_bai_giang.pdf, trang 35.



Với một mẫu có nhãn đúng $y$, gọi $s_y$ là score lớp đúng và $s_j$ là score lớp khác. **Multiclass hinge** yêu cầu lớp đúng cao hơn từng lớp sai ít nhất một biên $\Delta>0$.

$$\ell_i=\sum_{j\ne y_i}\max(0,s_j-s_{y_i}+\Delta).$$

Ví dụ, score $[2,1,3]$, nhãn đúng là lớp 1 và $\Delta=1$. So với lớp 2, phần phạt bằng không. So với lớp 3, phần phạt bằng hai. Tổng loss bằng hai. Muốn giảm loss, ta có thể tăng score lớp đúng hoặc hạ score lớp 3.

$$\ell_i=\max(0,1-2+1)+\max(0,3-2+1)=2.$$

Một biến thể dùng giá trị lớn nhất thay vì tổng trên các lớp sai. Khi trình bày hoặc lập trình phải chỉ rõ biến thể. SVM có cả dạng nhị phân và đa lớp.

### Softmax biến logits thành phân phối lớp

$$p_j=\frac{e^{s_j}}{\sum_{k=1}^K e^{s_k}},\qquad
\ell_{\rm CE}=-\log p_y.$$

Với score $[2,1,3]$, xác suất xấp xỉ $[0.2447,0.0900,0.6652]$. Vì nhãn đúng là lớp 1, cross-entropy khoảng $1.4076$. Mô hình hiện chọn lớp 3, nên cần sửa điểm số.

$$\frac{\partial\ell_{\rm CE}}{\partial s_j}=p_j-\mathbf1[j=y].$$

Đạo hàm âm tại lớp đúng đẩy score ấy lên khi hạ gradient. Đạo hàm dương tại lớp sai đẩy score xuống. Để tính ổn định, có thể trừ cùng một hằng số, thường là score lớn nhất, trước khi lấy hàm mũ.

Hiệu chỉnh từ slide: biểu thức phạt phải tăng khi score lớp sai tăng. Vì vậy dấu đúng là “score sai trừ score đúng cộng biên”. Điều chuẩn thường áp dụng lên toàn bộ ma trận trọng số theo quy ước đã chọn.
-->


---

<div class="track"><span>03 – Phân loại tuyến tính và thiết kế loss</span><span>ML tổng hợp</span></div>

# Hinge SVM đa lớp



$$
\ell_i=\sum_{j\ne y_i}\max(0,s_j-s_{y_i}+\Delta)
$$


Score $[2,1,3]$, nhãn đúng lớp 1, biên $\Delta=1$

<div class="step" v-click><b>01</b><span>Lớp 2 góp max(0, 1 − 2 + 1) = 0</span></div>

<div class="step" v-click><b>02</b><span>Lớp 3 góp max(0, 3 − 2 + 1) = 2</span></div>


<div class="answer" v-click>Tổng loss bằng <b>2</b></div>



<div class="note">SVM có cả nhị phân và đa lớp. Có biến thể lấy max thay vì tổng</div>



<!--
Nguồn: Hoc_may_Tong_hop_chuyen_sau_3_bai_giang.pdf, trang 35.



Với một mẫu có nhãn đúng $y$, gọi $s_y$ là score lớp đúng và $s_j$ là score lớp khác. **Multiclass hinge** yêu cầu lớp đúng cao hơn từng lớp sai ít nhất một biên $\Delta>0$.

$$\ell_i=\sum_{j\ne y_i}\max(0,s_j-s_{y_i}+\Delta).$$

Ví dụ, score $[2,1,3]$, nhãn đúng là lớp 1 và $\Delta=1$. So với lớp 2, phần phạt bằng không. So với lớp 3, phần phạt bằng hai. Tổng loss bằng hai. Muốn giảm loss, ta có thể tăng score lớp đúng hoặc hạ score lớp 3.

$$\ell_i=\max(0,1-2+1)+\max(0,3-2+1)=2.$$

Một biến thể dùng giá trị lớn nhất thay vì tổng trên các lớp sai. Khi trình bày hoặc lập trình phải chỉ rõ biến thể. SVM có cả dạng nhị phân và đa lớp.

### Softmax biến logits thành phân phối lớp

$$p_j=\frac{e^{s_j}}{\sum_{k=1}^K e^{s_k}},\qquad
\ell_{\rm CE}=-\log p_y.$$

Với score $[2,1,3]$, xác suất xấp xỉ $[0.2447,0.0900,0.6652]$. Vì nhãn đúng là lớp 1, cross-entropy khoảng $1.4076$. Mô hình hiện chọn lớp 3, nên cần sửa điểm số.

$$\frac{\partial\ell_{\rm CE}}{\partial s_j}=p_j-\mathbf1[j=y].$$

Đạo hàm âm tại lớp đúng đẩy score ấy lên khi hạ gradient. Đạo hàm dương tại lớp sai đẩy score xuống. Để tính ổn định, có thể trừ cùng một hằng số, thường là score lớn nhất, trước khi lấy hàm mũ.

Hiệu chỉnh từ slide: biểu thức phạt phải tăng khi score lớp sai tăng. Vì vậy dấu đúng là “score sai trừ score đúng cộng biên”. Điều chuẩn thường áp dụng lên toàn bộ ma trận trọng số theo quy ước đã chọn.
-->


---

<div class="track"><span>03 – Phân loại tuyến tính và thiết kế loss</span><span>ML tổng hợp</span></div>

# Giới hạn của ranh giới tuyến tính


<figure><img src="/images/hard-boundaries.png" style="max-height:245px" alt="XOR, vành tròn và các vùng tách rời, panel A060"/><figcaption>XOR, vành tròn và các vùng tách rời, panel A060</figcaption></figure>


<div class="note">Cần đổi feature hoặc dùng biểu diễn phi tuyến khi một siêu phẳng trong đầu vào gốc không đủ</div>



<!--
Nguồn: Hoc_may_Tong_hop_chuyen_sau_3_bai_giang.pdf, trang 41, 42.



Panel A059 • Bản render nguyên trang từ [A], trang PDF 59. Nội dung trong panel là bản gốc.

Panel A060 • Bản render nguyên trang từ [A], trang PDF 60. Nội dung trong panel là bản gốc.

### Cách đọc và giải thích

A059 so sánh hai nhóm tách bằng đường thẳng với một nhóm bao quanh nhóm khác. A060 có ba cấu trúc khó: dạng XOR, một vành tròn và các vùng tách rời. Các màu biểu diễn lớp hoặc miền nhãn. [DIỄN GIẢI] Không có đường ranh giới thẳng đơn lẻ nào biểu diễn mọi miền này trong tọa độ đầu vào gốc. Thêm thời gian tối ưu không tự tạo thêm năng lực biểu diễn.

**Tự kiểm tra (áp dụng cho các panel trên):** Vấn đề của XOR ở đây thuộc loại mô hình hay chỉ thuộc tốc độ học?

**Đáp án và ý nghĩa:** Là giới hạn của lớp mô hình tuyến tính theo đầu vào gốc. Cần đổi feature hoặc kiến trúc, không chỉ chỉnh tốc độ học.

Panel A061 • Bản render nguyên trang từ [A], trang PDF 61. Nội dung trong panel là bản gốc.

Panel A062 • Bản render nguyên trang từ [A], trang PDF 62. Nội dung trong panel là bản gốc.

### Cách đọc và giải thích

A061 nâng dữ liệu lên đặc trưng bậc hai để dùng một mặt phẳng cắt không gian mới. A062 giữ hai sơ đồ mạng được slide gắn với Krizhevsky và He cùng vùng đánh dấu đầu phân loại tuyến tính. Đọc theo luồng từ ảnh qua các lớp biểu diễn tới score lớp. [DIỄN GIẢI] Đầu cuối tuyến tính không khiến toàn mạng tuyến tính theo ảnh, vì các lớp trước đã biến đổi phi tuyến.

**Tự kiểm tra (áp dụng cho các panel trên):** “Mạng có linear classifier ở cuối” có mâu thuẫn với việc nó phân loại ranh giới cong không?

**Đáp án và ý nghĩa:** Không. Ranh giới có thể tuyến tính theo feature học được nhưng cong theo đầu vào ban đầu.
-->


---

<div class="track"><span>03 – Phân loại tuyến tính và thiết kế loss</span><span>ML tổng hợp</span></div>

# Thiết kế loss và phần mở rộng theo góc


| Loss | Khi dự đoán đã tốt |
|---|---|
| Hinge | Gradient dừng khi đạt biên |
| Logistic | Loss tiếp tục giảm mượt |
| Ví dụ MERU / ARGENT trong nguồn | So sánh tín hiệu phạt ở các miền góc |


$$
\ell=[\operatorname{ext}(x,y)-\operatorname{aper}(x)]_+
$$



<div class="note">Hai slide nghiên cứu chỉ đủ minh họa hành vi loss. Chưa đủ định nghĩa để tái tạo phương pháp hoặc kết luận ưu thế</div>



<!--
Nguồn: Hoc_may_Tong_hop_chuyen_sau_3_bai_giang.pdf, trang 36, 45, 46.

Giữ trong ghi chú công thức nguồn AdaEnt = Huber(h(x,y) φ(x,y), β), h=1−exp(s)=1−exp(−dL). Không tự định nghĩa những ký hiệu mà nguồn không cung cấp đầy đủ.

Loss không chỉ là thước đo để báo cáo. Hình dạng của nó quyết định **ở vùng nào mô hình còn được cập nhật**, hướng gradient và mức phạt dành cho từng kiểu sai.

Ở hinge, khi margin đã đủ lớn thì gradient bằng không. Với logistic, gradient vẫn tồn tại ở margin hữu hạn nhưng nhỏ dần. Cùng một dữ liệu, hai loss có thể tạo ra quỹ đạo học khác nhau.

### Cách đọc hai hình mở rộng

Các vector có thể biểu diễn ảnh hoặc văn bản trong một không gian embedding. Góc và miền hình nón mô tả một quan hệ tương thích. Cần phân biệt **ranh giới hình học của quan hệ** với **cách loss phạt vi phạm quan hệ đó**.

Hai slide chỉ nêu ví dụ nghiên cứu, không đủ để suy ra toàn bộ phương pháp, điều kiện hoặc kết quả so sánh. Ở đây giữ hình và thông điệp về thiết kế loss. Tên MERU và ARGENT, cùng mốc hội nghị, được ghi theo tài liệu nguồn và không được kiểm chứng độc lập trong bản tổng hợp này.

Panel A073 • Bản render nguyên trang từ [A], trang PDF 73. Nội dung trong panel là bản gốc.

Panel A074 • Bản render nguyên trang từ [A], trang PDF 74. Nội dung trong panel là bản gốc.

### Cách đọc và giải thích

A073 giữ minh họa hình nón và vùng không phạt của slide MERU. A074 so sánh hai cặp có loss góc gốc bằng nhau nhưng thành phần được slide gọi AdaEnt cho mức phạt khác nhau. Trục tọa độ, góc và biên norm trong hình mô tả không gian biểu diễn, không phải đồ thị accuracy theo thời gian. Thông điệp đọc được là cách định nghĩa loss quyết định tín hiệu ở các vùng hình học khác nhau.

[CẦN XÁC MINH] Bản tổng hợp không đọc độc lập hai bài nghiên cứu liên kết. Tên hội nghị/mốc năm giữ theo slide. Những ký hiệu không được nguồn định nghĩa đủ không được tự gán ý nghĩa chi tiết.

**Tự kiểm tra (áp dụng cho các panel trên):** Từ hai hình có thể kết luận phương pháp nào tốt hơn trên mọi dữ liệu không?

**Đáp án và ý nghĩa:** Không. Hai panel minh họa cơ chế loss, không cung cấp đầy đủ thực nghiệm hoặc điều kiện để khẳng định ưu thế tổng quát.

**[TỪ TÀI LIỆU]** Hình MERU ghi một phép lấy phần dương của chênh lệch góc:

$$\ell=[\operatorname{ext}(x,y)-\operatorname{aper}(x)]_+,
\qquad [u]_+=\max(0,u).$$

**[DIỄN GIẢI]** Dạng này cùng ý tưởng với hinge: chênh lệch không dương thì phạt bằng không, chênh lệch dương thì phạt tăng. Tuy nhiên, không đồng nhất các góc này với margin của bộ phân loại Euclid nếu chưa có định nghĩa hình học tương ứng.

**[TỪ TÀI LIỆU]** Panel ARGENT ghi:

$$\mathcal L_{\rm AdaEnt}=\operatorname{Huber}(h(x,y)\,\phi(x,y),\beta),$$

$$h(x,y)=1-\exp(s(x,y))=1-\exp(-d_{\mathbb L}(x,y)).$$

Nguồn minh họa hai quan hệ: có cặp mà loss Ent bằng nhau nhưng AdaEnt khác nhau, và có vùng Ent bằng không trong khi AdaEnt vẫn dương. Đây là các quan hệ được in trong hình, không phải phép đo mới.

### Những gì có thể và chưa thể kết luận

**[DIỄN GIẢI]** Thay đổi loss có thể giữ thêm tín hiệu học trong những vùng mà loss cũ phẳng. **[CẦN XÁC MINH]** Slide không định nghĩa đầy đủ khoảng cách, miền hình học, các góc, tham số và quy ước Huber. Vì vậy không đủ dữ kiện để tính số hay tái hiện toàn bộ thuật toán.

**[BỔ SUNG]** Huber nói chung kết hợp miền phạt bậc hai gần không và miền tuyến tính xa không, nhưng có nhiều quy ước scale. Không tự chọn một quy ước rồi gán cho bài nghiên cứu.
-->


---

<div class="track"><span>03 – Phân loại tuyến tính và thiết kế loss</span><span>ML tổng hợp</span></div>

# Tự luyện – Đúng dấu đã hết hinge loss?



<div class="answer" v-click>Chỉ khi margin đạt ít nhất một. Với nhãn −1 và score −0,2, margin = 0,2 nên hinge = <b>0,8</b>.</div>



<div class="note">Thử trả lời trước khi bấm Tiếp</div>



<!--
Nguồn: Hoc_may_Tong_hop_chuyen_sau_3_bai_giang.pdf, trang 33, 163.



Với nhãn $y\in\{-1,+1\}$, đặt **functional margin** là $m=y\,s(x)$. Khi dự đoán đúng dấu, margin dương. Khi sai dấu, margin âm.

$$\ell_{01}=\mathbf1[\widehat y\ne y],\qquad
\ell_{\rm hinge}=\max(0,1-m).$$

| Margin | Tình huống | Hinge loss |
|---:|---|---:|
| $-2$ | Sai dấu và tự tin sai | $3$ |
| $0.3$ | Đúng dấu nhưng sát ranh giới | $0.7$ |
| $1$ | Vừa đạt ngưỡng margin | $0$ |
| $2$ | Đúng và vượt ngưỡng | $0$ |

Loss 0–1 khớp trực tiếp mục tiêu đếm lỗi, nhưng gần như không cung cấp gradient hữu ích. Hinge cho biết cả điểm đúng nhưng margin nhỏ vẫn cần được đẩy xa hơn.

$$\nabla_w\ell_{\rm hinge}=
\begin{cases}-y\phi(x),&m1,\end{cases}
\qquad
\frac{\partial\ell_{\rm hinge}}{\partial b}=
\begin{cases}-y,&m1.\end{cases}$$

Tại $m=1$, hàm có góc gãy. Ta dùng **subgradient**: một lựa chọn hợp lệ giữa hai nhánh đạo hàm, chẳng hạn không cập nhật ở điểm gãy.

### Margin không tự động là khoảng cách hình học

Khoảng cách có dấu đến siêu phẳng là $s(x)/\|w\|$. Nhân cả $w,b$ với một số dương giữ nguyên ranh giới nhưng làm score và functional margin tăng. Do đó, hinge thường được ghép với điều chuẩn để kiểm soát độ lớn trọng số.

Ở điểm score bằng không, cần chốt quy ước chọn lớp. Công thức đếm lỗi bằng nhãn dự đoán tránh sự mơ hồ của việc dùng bất đẳng thức nghiêm hoặc không nghiêm tại ranh giới.

**[CÂU HỎI BIÊN SOẠN]** Dựa trên nội dung chương. Hãy tự trả lời trước rồi mới xem phần giải thích dưới từng câu.

### 3.1 • Ghi nhớ

**Margin nhị phân là gì?**

Với nhãn âm/dương một, margin là nhãn nhân score. Margin dương là đúng dấu, nhưng hinge chỉ hết phạt khi đạt ít nhất một.

### 3.2 • Thông hiểu

**Vì sao cần L2 cùng hinge trên dữ liệu tách được?**

Tăng scale trọng số có thể tăng margin mà không đổi ranh giới. L2 kiểm soát độ lớn và tạo đánh đổi có ý nghĩa.

### 3.3 • Vận dụng

**Nhãn −1, score −0,2: margin và hinge?**

Margin bằng 0,2. Hinge là max(0;1−0,2)=0,8. Dự đoán đúng nhưng chưa đủ biên.

### 3.4 • Phân tích

**Score (2;1;3), nhãn lớp một, biên một: hinge tổng?**

Lớp hai góp max(0;1−2+1)=0, lớp ba góp max(0;3−2+1)=2. Tổng bằng hai.

### 3.5 • Đánh giá

**Hình loss mượt hơn có đủ chứng minh luôn cho accuracy cao hơn?**

Không. Độ mượt mô tả gradient, không thay thực nghiệm và điều kiện. Cần dữ liệu, cấu hình và đánh giá phù hợp.
-->


---

<div class="track"><span>04 – Công bằng và Group DRO</span><span>ML tổng hợp</span></div>

# Ba nguyên tắc công bằng phân phối


Giả định có **100 liều vaccine cho 1.000 người**

| Nguyên tắc | Cách ưu tiên trong ví dụ |
|---|---|
| Tối đa phúc lợi | Lợi ích tổng thể, hiệu quả phục vụ |
| Người bất lợi nhất | Người dễ chịu hậu quả nặng, khó tiếp cận |
| Tránh tăng bất công | Nhóm từng bị gạt khỏi cơ hội tiếp cận |


<div class="note">Accuracy chung không mô tả đầy đủ cách phân phối lợi ích và gánh nặng</div>



<!--
Nguồn: Hoc_may_Tong_hop_chuyen_sau_3_bai_giang.pdf, trang 49, 52.



Một thuật toán có thể cải thiện kết quả trung bình nhưng phân phối lợi ích và gánh nặng rất khác nhau giữa các nhóm. **Công bằng phân phối (distributive justice)** đặt câu hỏi ai được hưởng lợi, ai phải chờ và ai tiếp tục chịu bất lợi.

### Ví dụ 100 liều vaccine cho 1.000 người

Đây là ví dụ giả định trong bài giảng để so sánh nguyên tắc phân bổ, không phải hướng dẫn y tế.

| Nguyên tắc | Cách hiểu | Minh họa trong slide |
|---|---|---|
| Tối đa hóa phúc lợi | Tối đa lợi ích tổng thể trong điều kiện nguồn lực hữu hạn | Chọn địa điểm phục vụ hiệu quả, giảm thời gian và chi phí |
| Ưu tiên người bất lợi nhất | Tập trung vào người có nhu cầu hoặc mức rủi ro cao | Ưu tiên người dễ chịu hậu quả nặng hoặc khó tiếp cận |
| Tránh làm nặng thêm bất công | Không tiếp tục loại trừ nhóm từng chịu thiệt thòi | Bảo đảm cơ hội tiếp cận cho cộng đồng bị bỏ sót |

Vì số liều cố định, nếu mỗi người dùng một liều thì chỉ có thể phục vụ tối đa 100 người trong đợt này. “Tiêm được nhiều nhất” cần được hiểu cùng các ràng buộc chi phí, thời gian và khả năng tiếp cận, không tự giải quyết được câu hỏi ưu tiên.

**Bài học:** không chỉ xem một accuracy chung. Hãy xem lỗi theo nhóm và theo loại hậu quả. Group DRO ở trang sau cung cấp một mục tiêu toán học ưu tiên loss nhóm lớn nhất, nhưng không tự định nghĩa đầy đủ mọi khía cạnh công bằng.

Panel B005 • Bản render nguyên trang từ [B], trang PDF 5. Nội dung trong panel là bản gốc.

Panel C005 • Bản render nguyên trang từ [C], trang PDF 5. Nội dung trong panel là bản gốc.

### Cách đọc và giải thích

B005 giữ bảng hiệu năng theo các nhóm trong nghiên cứu Gender Shades mà slide dẫn. Hãy so sánh các cột nhóm trong cùng một hàng hệ thống trước khi nhìn giá trị chung. Các ảnh bên dưới minh họa nhóm trong nghiên cứu, không dùng để suy luận thuộc tính của người khác. C005 là tình huống giả định 100 liều cho 1.000 người, tạo câu hỏi chọn nguyên tắc ưu tiên khi nguồn lực hữu hạn.

**Tự kiểm tra (áp dụng cho các panel trên):** Một accuracy tổng thể cao đã xác nhận phân bổ lợi ích công bằng chưa?

**Đáp án và ý nghĩa:** Chưa. Cần xem sai số theo nhóm, hậu quả của lỗi và nguyên tắc phân bổ được lựa chọn. Các nguyên tắc công bằng có thể đặt trọng tâm khác nhau.
-->


---

<div class="track"><span>04 – Công bằng và Group DRO</span><span>ML tổng hợp</span></div>

# Chênh lệch hiệu năng theo nhóm


<figure><img src="/images/gender-shades.png" style="max-height:240px" alt="Bảng được dẫn trong ví dụ Gender Shades năm 2018, panel B005"/><figcaption>Bảng được dẫn trong ví dụ Gender Shades năm 2018, panel B005</figcaption></figure>

- So từng nhóm trong cùng một hệ thống trước khi xem trung bình
- Xem cả loại lỗi và hậu quả của lỗi


<div class="note">Số liệu được dẫn theo PDF. Không xem đây là thí nghiệm được chạy lại</div>



<!--
Nguồn: Hoc_may_Tong_hop_chuyen_sau_3_bai_giang.pdf, trang 49, 52.



Một thuật toán có thể cải thiện kết quả trung bình nhưng phân phối lợi ích và gánh nặng rất khác nhau giữa các nhóm. **Công bằng phân phối (distributive justice)** đặt câu hỏi ai được hưởng lợi, ai phải chờ và ai tiếp tục chịu bất lợi.

### Ví dụ 100 liều vaccine cho 1.000 người

Đây là ví dụ giả định trong bài giảng để so sánh nguyên tắc phân bổ, không phải hướng dẫn y tế.

| Nguyên tắc | Cách hiểu | Minh họa trong slide |
|---|---|---|
| Tối đa hóa phúc lợi | Tối đa lợi ích tổng thể trong điều kiện nguồn lực hữu hạn | Chọn địa điểm phục vụ hiệu quả, giảm thời gian và chi phí |
| Ưu tiên người bất lợi nhất | Tập trung vào người có nhu cầu hoặc mức rủi ro cao | Ưu tiên người dễ chịu hậu quả nặng hoặc khó tiếp cận |
| Tránh làm nặng thêm bất công | Không tiếp tục loại trừ nhóm từng chịu thiệt thòi | Bảo đảm cơ hội tiếp cận cho cộng đồng bị bỏ sót |

Vì số liều cố định, nếu mỗi người dùng một liều thì chỉ có thể phục vụ tối đa 100 người trong đợt này. “Tiêm được nhiều nhất” cần được hiểu cùng các ràng buộc chi phí, thời gian và khả năng tiếp cận, không tự giải quyết được câu hỏi ưu tiên.

**Bài học:** không chỉ xem một accuracy chung. Hãy xem lỗi theo nhóm và theo loại hậu quả. Group DRO ở trang sau cung cấp một mục tiêu toán học ưu tiên loss nhóm lớn nhất, nhưng không tự định nghĩa đầy đủ mọi khía cạnh công bằng.

Panel B005 • Bản render nguyên trang từ [B], trang PDF 5. Nội dung trong panel là bản gốc.

Panel C005 • Bản render nguyên trang từ [C], trang PDF 5. Nội dung trong panel là bản gốc.

### Cách đọc và giải thích

B005 giữ bảng hiệu năng theo các nhóm trong nghiên cứu Gender Shades mà slide dẫn. Hãy so sánh các cột nhóm trong cùng một hàng hệ thống trước khi nhìn giá trị chung. Các ảnh bên dưới minh họa nhóm trong nghiên cứu, không dùng để suy luận thuộc tính của người khác. C005 là tình huống giả định 100 liều cho 1.000 người, tạo câu hỏi chọn nguyên tắc ưu tiên khi nguồn lực hữu hạn.

**Tự kiểm tra (áp dụng cho các panel trên):** Một accuracy tổng thể cao đã xác nhận phân bổ lợi ích công bằng chưa?

**Đáp án và ý nghĩa:** Chưa. Cần xem sai số theo nhóm, hậu quả của lỗi và nguyên tắc phân bổ được lựa chọn. Các nguyên tắc công bằng có thể đặt trọng tâm khác nhau.
-->


---

<div class="track"><span>04 – Công bằng và Group DRO</span><span>ML tổng hợp</span></div>

# Group DRO trên hai nhóm


| Nhóm | Dữ liệu | Loss trung bình nhóm |
|---|---|---|
| A | $(1,4),(2,8)$ | $J_A=2.5(w-4)^2$ |
| B | $(5,5),(6,6),(7,7),(8,8)$ | $J_B=43.5(w-1)^2$ |

Mô hình $f_w(x)=wx$, giữ nguyên lớp đường qua gốc


$$
J_{\rm avg}=\sum_g\frac{n_g}{n}J_g,\qquad J_{\rm DRO}=\max_gJ_g
$$



<div class="answer" v-click>Tại w = 1: loss A = 22,5, loss B = 0<br/>Loss chung = 7,5, nhưng loss nhóm tệ nhất = 22,5</div>



<!--
Nguồn: Hoc_may_Tong_hop_chuyen_sau_3_bai_giang.pdf, trang 50, 53.



Dữ liệu của ví dụ gồm hai nhóm, với mô hình bị giới hạn là $f_w(x)=wx$, không có bias.

| Nhóm | Các cặp đầu vào, giá trị thật | Số mẫu |
|---|---|---:|
| A | $(1,4),(2,8)$ | 2 |
| B | $(5,5),(6,6),(7,7),(8,8)$ | 4 |

Nhóm A tuân theo độ dốc bốn, nhóm B tuân theo độ dốc một. Một đường duy nhất không thể khớp hoàn hảo cả hai nhóm.

$$J_A(w)=\frac{(w-4)^2+(2w-8)^2}{2}=2.5(w-4)^2.$$

$$J_B(w)=\frac{25+36+49+64}{4}(w-1)^2=43.5(w-1)^2.$$

Tại $w=1$, nhóm B hoàn toàn đúng, còn nhóm A có loss lớn:

$$J_A(1)=22.5,\quad J_B(1)=0,\quad
J_{\rm avg}(1)=\frac{2(22.5)+4(0)}6=7.5.$$

**Loss trung bình theo mẫu** gán trọng số nhóm theo tỷ lệ số mẫu. Nhóm ít mẫu có thể chịu lỗi lớn mà chỉ tác động tương đối ít đến giá trị trung bình.

$$J_{\rm avg}(w)=\sum_g\frac{n_g}{n}J_g(w),\qquad
J_{\rm DRO}(w)=\max_g J_g(w).$$

**Group Distributionally Robust Optimization** trong ví dụ tối thiểu hóa loss nhóm tệ nhất. Cách này đổi câu hỏi từ “trung bình tốt bao nhiêu?” sang “nhóm đang tệ nhất tốt được đến đâu?”.

Loss phải được tính trung bình trong từng nhóm trước khi lấy max. Nếu lấy tổng thô, nhóm đông mẫu có thể trông tệ hơn chỉ do có nhiều mẫu hơn. Group DRO cần định nghĩa nhóm và có dữ liệu đủ đại diện cho mỗi nhóm.

Panel B006 • Bản render nguyên trang từ [B], trang PDF 6. Nội dung trong panel là bản gốc.

Panel B007 • Bản render nguyên trang từ [B], trang PDF 7. Nội dung trong panel là bản gốc.

### Cách đọc và giải thích

B006 phân biệt hai nhóm: hai điểm A theo độ dốc bốn và bốn điểm B theo độ dốc một. B007 vẽ TrainLoss theo trọng số; trục ngang là tham số chứ không phải đầu vào. Tại trọng số một, nhóm B khớp hoàn hảo và loss trung bình bằng 7,5 dù nhóm A chịu lỗi lớn. [DIỄN GIẢI] Cả tỷ lệ số mẫu và độ lớn đầu vào ảnh hưởng đến đóng góp vào MSE.

**Tự kiểm tra (áp dụng cho các panel trên):** Vì sao nhóm B có ảnh hưởng mạnh trong mục tiêu trung bình của ví dụ?

**Đáp án và ý nghĩa:** B có nhiều mẫu hơn, đồng thời tổng bình phương đầu vào lớn hơn. Loss của nó tăng nhanh nếu độ dốc rời một.
-->


---

<div class="track"><span>04 – Công bằng và Group DRO</span><span>ML tổng hợp</span></div>

# ERM và tối ưu nhóm tệ nhất


| Mục tiêu | Nghiệm từ dữ liệu gốc | Đánh đổi |
|---|---|---|
| Trung bình theo mẫu | $w=194/179\approx1.0838$ | MSE chung thấp |
| Max theo nhóm | $w\approx1.5801$ | Loss hai nhóm ≈ 14,6395 |


$$
g^*=\arg\max_gJ_g(w),\qquad w\leftarrow w-\eta\nabla J_{g^*}(w)
$$



<div class="note">Nếu nhiều nhóm cùng đạt max, dùng subgradient. Group DRO đổi mục tiêu, không tự tăng khả năng biểu diễn</div>



<!--
Nguồn: Hoc_may_Tong_hop_chuyen_sau_3_bai_giang.pdf, trang 51, 54, 55.



Với loss trung bình, điều kiện đạo hàm bằng không cho:

$$w_{\rm ERM}=\frac{\sum_i x_iy_i}{\sum_i x_i^2}
=\frac{194}{179}\approx1.0838.$$

Với mục tiêu max, nghiệm nằm giữa hai độ dốc một và bốn, ở nơi hai loss nhóm bằng nhau:

$$2.5(4-w)^2=43.5(w-1)^2.$$

$$w_{\rm DRO}=\frac{4\sqrt{2.5}+\sqrt{43.5}}
{\sqrt{2.5}+\sqrt{43.5}}\approx1.5801.$$

Tại nghiệm DRO, mỗi nhóm có loss khoảng $14.6395$. ERM có loss trung bình nhỏ hơn, nhưng loss nhóm A khoảng $21.2606$. Đây là một đánh đổi giữa hiệu quả trung bình và bảo vệ nhóm tệ nhất.

### Một bước học tại trọng số bằng một

Nhóm A đang có loss lớn nhất. Gradient của nó là $J_A'(w)=5(w-4)$, nên tại $w=1$ gradient bằng $-15$.

$$w_{\rm new}=1-0.01(-15)=1.15.$$

Khi một nhóm đạt max duy nhất, dùng gradient nhóm đó. Khi nhiều nhóm cùng đạt max, dùng subgradient hợp lệ, chẳng hạn một tổ hợp lồi của các gradient nhóm. Mục tiêu max có thể có góc gãy.

**Hiệu chỉnh:** slide ghi ERM gần $1.09$. Từ bảng số liệu, giá trị chính xác là $194/179$, làm tròn hai chữ số là $1.08$. Đổi mục tiêu không làm mô hình $wx$ tự có thêm khả năng biểu diễn đường cong.

Panel B009 • Bản render nguyên trang từ [B], trang PDF 9. Nội dung trong panel là bản gốc.

Panel B010 • Bản render nguyên trang từ [B], trang PDF 10. Nội dung trong panel là bản gốc.

### Cách đọc và giải thích

B009 vẽ từng loss nhóm và bao trên của chúng. B010 thêm loss trung bình và hai đường dự đoán tương ứng. Tại nghiệm minimax giữa một và bốn, hai loss nhóm cân bằng nhau. Tại nghiệm ERM, loss trung bình thấp nhưng nhóm A vẫn có loss cao hơn. [DIỄN GIẢI] Đây là đánh đổi mục tiêu trong lớp đường qua gốc, không phải bằng chứng mọi bài toán công bằng đều giải bằng max loss.

Nguồn ghi ERM gần 1,09. Tính từ dữ kiện gốc cho 194/179 ≈ 1,0838, làm tròn hai chữ số là 1,08. Bản gốc vẫn được giữ nguyên để đối chiếu.

**Tự kiểm tra (áp dụng cho các panel trên):** Hai đường dự đoán trong B010 có khác lớp mô hình không?

**Đáp án và ý nghĩa:** Không. Chúng cùng dạng trọng số nhân đầu vào. Chúng chỉ được chọn bằng hai mục tiêu khác nhau.

### Ghi nhớ theo vai trò học thuật

| Mức | Nội dung | Cần hiểu hoặc làm được |
|---|---|---|
| A | Loss nhóm | Trung bình trong nhóm trước khi lấy max. |
| A | ERM / DRO | Trung bình theo mẫu khác ưu tiên nhóm tệ nhất. |
| B | Ba nguyên tắc công bằng | Phúc lợi, người bất lợi, tránh tái tạo bất công. |
| B | Giới hạn | Nhóm ít dữ liệu và lựa chọn nhóm ảnh hưởng kết quả. |

### So sánh và điểm dễ nhầm

| Mục tiêu | Câu hỏi |
|---|---|
| ERM | Trung bình mẫu tốt đến đâu? |
| Group DRO | Nhóm tệ nhất tốt đến đâu? |
| Công bằng phân phối | Ai hưởng lợi, ai chịu gánh nặng và vì sao? |

### Liên hệ với chương khác

Chương 12–13 yêu cầu xem lỗi theo nhóm/lớp, không chỉ điểm trung bình.

### Đối chiếu hình và ví dụ của chương

| Nguồn / mã panel | Nội dung | Vị trí | Trạng thái |
|---|---|---|---|
| B005, C005 | Dữ liệu hiệu năng theo nhóm và câu hỏi công bằng | Trang 52 | Đã giữ và giải thích |
| B006, B007 | Giữ dữ liệu Group DRO và đồ thị trung bình | Trang 53 | Đã giữ và giải thích |
| B009, B010 | Đường max nhóm và hai nghiệm tối ưu | Trang 54 | Đã giữ và giải thích |
-->


---

<div class="track"><span>04 – Công bằng và Group DRO</span><span>ML tổng hợp</span></div>

# Tự luyện – Một bước cập nhật nhóm A



<div class="answer" v-click>Tại w = 1: gradient A = 5(1 − 4) = −15<br/>Với η = 0,01, trọng số mới bằng <b>1,15</b>.</div>



<div class="note">Thử trả lời trước khi bấm Tiếp</div>



<!--
Nguồn: Hoc_may_Tong_hop_chuyen_sau_3_bai_giang.pdf, trang 51, 164.



Với loss trung bình, điều kiện đạo hàm bằng không cho:

$$w_{\rm ERM}=\frac{\sum_i x_iy_i}{\sum_i x_i^2}
=\frac{194}{179}\approx1.0838.$$

Với mục tiêu max, nghiệm nằm giữa hai độ dốc một và bốn, ở nơi hai loss nhóm bằng nhau:

$$2.5(4-w)^2=43.5(w-1)^2.$$

$$w_{\rm DRO}=\frac{4\sqrt{2.5}+\sqrt{43.5}}
{\sqrt{2.5}+\sqrt{43.5}}\approx1.5801.$$

Tại nghiệm DRO, mỗi nhóm có loss khoảng $14.6395$. ERM có loss trung bình nhỏ hơn, nhưng loss nhóm A khoảng $21.2606$. Đây là một đánh đổi giữa hiệu quả trung bình và bảo vệ nhóm tệ nhất.

### Một bước học tại trọng số bằng một

Nhóm A đang có loss lớn nhất. Gradient của nó là $J_A'(w)=5(w-4)$, nên tại $w=1$ gradient bằng $-15$.

$$w_{\rm new}=1-0.01(-15)=1.15.$$

Khi một nhóm đạt max duy nhất, dùng gradient nhóm đó. Khi nhiều nhóm cùng đạt max, dùng subgradient hợp lệ, chẳng hạn một tổ hợp lồi của các gradient nhóm. Mục tiêu max có thể có góc gãy.

**Hiệu chỉnh:** slide ghi ERM gần $1.09$. Từ bảng số liệu, giá trị chính xác là $194/179$, làm tròn hai chữ số là $1.08$. Đổi mục tiêu không làm mô hình $wx$ tự có thêm khả năng biểu diễn đường cong.

**[CÂU HỎI BIÊN SOẠN]** Dựa trên nội dung chương. Hãy tự trả lời trước rồi mới xem phần giải thích dưới từng câu.

### 4.1 • Ghi nhớ

**Group DRO tối ưu gì trong ví dụ?**

Tối thiểu hóa loss trung bình của nhóm có loss lớn nhất, thay vì trung bình theo mọi mẫu.

### 4.2 • Thông hiểu

**Vì sao không dùng tổng loss nhóm rồi lấy max?**

Nhóm lớn có thể trông tệ hơn chỉ vì nhiều mẫu. Trung bình trong nhóm phân biệt tỷ lệ mẫu với mức lỗi từng mẫu.

### 4.3 • Vận dụng

**Tại w=1, loss nhóm A/B và chung bằng bao nhiêu?**

A: (9+36)/2=22,5. B bằng không. Chung: (45+0)/6=7,5. Max nhóm bằng 22,5.

### 4.4 • Phân tích

**Nhóm tệ nhất tại w=1 được cập nhật ra sao với tốc độ 0,01?**

Gradient A bằng 5(1−4)=−15, nên w mới=1−0,01(−15)=1,15. Nhóm max có thể đổi sau các bước tiếp.

### 4.5 • Đánh giá

**Group DRO đã giải quyết mọi câu hỏi công bằng chưa?**

Chưa. Còn định nghĩa nhóm, chất lượng dữ liệu, loại hậu quả, quyền tiếp cận và nguyên tắc phân phối. Mục tiêu toán chỉ phản ánh một lựa chọn cụ thể.
-->


---

<div class="track"><span>05 – Feature phi tuyến và feature template</span><span>ML tổng hợp</span></div>

# Tuyến tính theo trọng số



$$
\phi(x)=[1,x,x^2]^\top,\qquad f_w(x)=w_0+w_1x+w_2x^2
$$


| Theo biến nào? | Tuyến tính? |
|---|---|
| Trọng số $w$, feature cố định | Có |
| Feature $\phi(x)$, trọng số cố định | Có |
| Đầu vào $x$ | Có thể phi tuyến |


<div class="note">Đổi biểu diễn có thể tạo đường cong mà score vẫn là tích vô hướng</div>



<!--
Nguồn: Hoc_may_Tong_hop_chuyen_sau_3_bai_giang.pdf, trang 57, 60.



Một đường thẳng theo đầu vào không thể vừa giảm bên trái vừa tăng bên phải để khớp dữ liệu hình chữ U. Ta có thể **biến đổi đầu vào trước**, rồi giữ phép tính dự đoán là tổng có trọng số.

$$\phi(x)=\begin{bmatrix}1\\x\\x^2\end{bmatrix},\qquad
f_w(x)=w_0+w_1x+w_2x^2.$$

Với $x=3$, đặc trưng là $[1,3,9]^\top$. Ví dụ của [B] dùng $w=[2,1,-0.2]^\top$, nên dự đoán bằng $2+3-1.8=3.2$. Ví dụ của [A] dùng bộ trọng số khác $[1,0,0.5]^\top$, nên được $5.5$. Hai kết quả khác nhau vì hai mô hình khác nhau.

### “Tuyến tính theo cái gì?”

Với $\phi$ cố định, score $w^\top\phi(x)$ tuyến tính theo $w$. Nhưng nó có thể phi tuyến theo $x$. Ví dụ $x^2$ tạo độ cong, còn $\cos(3x)$ tạo dao động.

Trong bài toán phân loại vòng tròn, đặc trưng $x_1^2+x_2^2$ giúp phân biệt điểm gần tâm và xa tâm. Ranh giới có thể là $x_1^2+x_2^2=c$, dù mô hình tuyến tính theo hệ số của đặc trưng đó.

**Giới hạn:** nhiều đặc trưng hơn có thể giảm thiếu khớp, nhưng cũng tăng nguy cơ học nhiễu. Việc chọn biểu diễn cần được kiểm tra bằng validation.

Panel B016 • Bản render nguyên trang từ [B], trang PDF 16. Nội dung trong panel là bản gốc.

Panel B017 • Bản render nguyên trang từ [B], trang PDF 17. Nội dung trong panel là bản gốc.

### Cách đọc và giải thích

B016 giữ các điểm A–G và các đường ứng viên để cho thấy một đường duy nhất không theo được hai chiều xu hướng. B017 thay feature từ hằng và x sang hằng, x và bình phương x. [DIỄN GIẢI] Đổi feature mở rộng lớp hàm theo đầu vào gốc. Đổi optimizer trên cùng bộ feature không tạo ra thành phần bình phương còn thiếu.

**Tự kiểm tra (áp dụng cho các panel trên):** Nếu dùng thêm đặc trưng bình phương thì mô hình có còn tuyến tính theo trọng số không?

**Đáp án và ý nghĩa:** Có, miễn feature đã cố định. Score vẫn là tổng các trọng số nhân feature.
-->


---

<div class="track"><span>05 – Feature phi tuyến và feature template</span><span>ML tổng hợp</span></div>

# Hai ví dụ bậc hai


Tại $x=3$, feature là $[1,3,9]$

| Bộ trọng số | Phép tính | Dự đoán |
|---|---|---:|
| $[1,0,0.5]$ | $1+0+0.5\times9$ | 5,5 |
| $[2,1,-0.2]$ | $2+3-0.2\times9$ | 3,2 |


<div class="note">Bộ thứ hai có hệ số bậc hai âm nên parabol mở xuống. Hình mở lên của slide gốc không khớp bộ trọng số đó</div>



<!--
Nguồn: Hoc_may_Tong_hop_chuyen_sau_3_bai_giang.pdf, trang 57, 61, 159.



Một đường thẳng theo đầu vào không thể vừa giảm bên trái vừa tăng bên phải để khớp dữ liệu hình chữ U. Ta có thể **biến đổi đầu vào trước**, rồi giữ phép tính dự đoán là tổng có trọng số.

$$\phi(x)=\begin{bmatrix}1\\x\\x^2\end{bmatrix},\qquad
f_w(x)=w_0+w_1x+w_2x^2.$$

Với $x=3$, đặc trưng là $[1,3,9]^\top$. Ví dụ của [B] dùng $w=[2,1,-0.2]^\top$, nên dự đoán bằng $2+3-1.8=3.2$. Ví dụ của [A] dùng bộ trọng số khác $[1,0,0.5]^\top$, nên được $5.5$. Hai kết quả khác nhau vì hai mô hình khác nhau.

### “Tuyến tính theo cái gì?”

Với $\phi$ cố định, score $w^\top\phi(x)$ tuyến tính theo $w$. Nhưng nó có thể phi tuyến theo $x$. Ví dụ $x^2$ tạo độ cong, còn $\cos(3x)$ tạo dao động.

Trong bài toán phân loại vòng tròn, đặc trưng $x_1^2+x_2^2$ giúp phân biệt điểm gần tâm và xa tâm. Ranh giới có thể là $x_1^2+x_2^2=c$, dù mô hình tuyến tính theo hệ số của đặc trưng đó.

**Giới hạn:** nhiều đặc trưng hơn có thể giảm thiếu khớp, nhưng cũng tăng nguy cơ học nhiễu. Việc chọn biểu diễn cần được kiểm tra bằng validation.

Panel A027 • Bản render nguyên trang từ [A], trang PDF 27. Nội dung trong panel là bản gốc.

Panel B018 • Bản render nguyên trang từ [B], trang PDF 18. Nội dung trong panel là bản gốc.

### Cách đọc và giải thích

A027 dùng trọng số (1; 0; 0,5), tại x bằng ba cho 5,5. B018 dùng (2; 1; -0,2), cùng đầu vào cho 3,2. Cần thay đúng từng bộ trọng số, không trộn kết quả giữa nguồn. Đọc hình và dấu hệ số bậc hai như một phép kiểm tra nhất quán.

Hiệu chỉnh minh bạch: giữ hình gốc B018, nhưng không dùng hình mở lên như đồ thị của công thức 2 + x − 0,2x².

**Tự kiểm tra (áp dụng cho các panel trên):** Công thức ở B018 mở parabol lên hay xuống, và phép tính tại ba có đúng không?

**Đáp án và ý nghĩa:** Hệ số bậc hai âm nên parabol mở xuống. Thay số vẫn đúng: 2 + 3 − 1,8 = 3,2. Hình nguồn lại mở lên, nên không khớp với chính bộ trọng số đó.

| Dễ nhầm | Cách phân biệt và tránh sai |
|---|---|
| Tuyến tính theo đầu vào / trọng số | Nêu rõ biến xét. Feature chứa bình phương vẫn tuyến tính theo trọng số cố định. |
| Score / xác suất | Score có thể âm và không có tổng bằng một. Sigmoid hoặc softmax mới tạo đầu ra dạng xác suất theo mô hình. |
| Functional margin / khoảng cách | Margin là nhãn nhân score. Khoảng cách tới siêu phẳng cần chuẩn hóa bởi chuẩn trọng số. |
| Loss từng mẫu / hàm mục tiêu | Hàm mục tiêu có thể trung bình, thêm L2 hoặc lấy max nhóm. Đạo hàm phải theo đúng phép tổng hợp. |
| Backprop / optimizer | Backprop tính gradient. Optimizer thay tham số bằng gradient theo quy tắc cập nhật. |
| Batch / epoch | Một batch là nhóm dùng trong một bước. Một epoch là lượt đi qua toàn bộ train. |
| Embedding / hidden state | Bảng tra ban đầu so với biểu diễn sau khi kết hợp ngữ cảnh. |
| Self-attention / collapse | Self-attention thường giữ chuỗi vị trí. Collapse thu chuỗi thành đại diện cho tác vụ. |
| RNN / regression | Recurrent nói tới hồi tiếp theo thời gian. Regression nói tới dự đoán đại lượng số. |
| BERT hỏi đáp / LM sinh | Chọn span trong đoạn khác chọn token mới theo từng bước. |

### Một lỗi biểu diễn thêm cần ghi nhớ

**[B], trang PDF 18:** số liệu và phép tính của ví dụ $2+x-0.2x^2$ là nhất quán tại đầu vào ba, nhưng đồ thị trong panel mở lên. Hệ số bậc hai âm phải mở xuống. Giữ hình để đối chiếu, không dùng hình như đồ thị đúng của chính công thức này.

**Cách tự kiểm tra:** trước khi tin một hình và công thức khớp nhau, thử xét dấu, đơn vị, kích thước và một điểm dễ tính. Đây là nhận định phương pháp bổ sung, không phải dữ kiện thực nghiệm từ slide.
-->


---

<div class="track"><span>05 – Feature phi tuyến và feature template</span><span>ML tổng hợp</span></div>

# Từng đoạn và đặc trưng tuần hoàn



$$
\phi_j(x)=\mathbf1[x\in I_j],\qquad f_w(x)=\sum_jw_j\phi_j(x)
$$


Ví dụ từng đoạn: $\phi(2.3)=[0,0,1,0,0]$, $w=[1,2,4,4,3]$<br/>
Dự đoán bằng **4**


$$
\phi(x)=[1,x,x^2,\cos(3x)]^\top
$$



<div class="note">Ví dụ tuần hoàn tại x = 2 cho khoảng 3,5602. Cosine dùng radian. Chu kỳ T thường mã hóa bằng sin(2πx/T), cos(2πx/T)</div>



<!--
Nguồn: Hoc_may_Tong_hop_chuyen_sau_3_bai_giang.pdf, trang 58, 62.



### Hằng từng đoạn: mỗi khoảng một giá trị

Chia miền đầu vào thành các khoảng $I_j$. Đặc trưng chỉ báo xác định đầu vào thuộc khoảng nào:

$$\phi_j(x)=\mathbf1[x\in I_j],\qquad
f_w(x)=\sum_j w_j\mathbf1[x\in I_j].$$

Nếu $x=2.3$ rơi vào khoảng thứ ba, $\phi(x)=[0,0,1,0,0]^\top$. Với $w=[1,2,4,4,3]^\top$, dự đoán bằng bốn. Mỗi trọng số là độ cao của một bậc. Cần quy định rõ điểm biên thuộc khoảng nào.

### Tuần hoàn: thêm đặc trưng dao động

$$\phi(x)=[1,x,x^2,\cos(3x)]^\top.$$

Với $x=2$, góc được tính theo radian và $\cos(6)\approx0.9602$. Nếu $w=[1,1,-0.1,1]^\top$, ta có:

$$f_w(2)=1+2-0.1(4)+\cos(6)\approx3.5602.$$

Với dữ liệu theo giờ hoặc mùa, thường chọn chu kỳ $T$ phù hợp qua các đặc trưng $\sin(2\pi x/T)$ và $\cos(2\pi x/T)$. Đây là giải thích bổ sung về cách mã hóa một chu kỳ có ý nghĩa với bài toán.

Panel B019 • Bản render nguyên trang từ [B], trang PDF 19. Nội dung trong panel là bản gốc.

Panel B020 • Bản render nguyên trang từ [B], trang PDF 20. Nội dung trong panel là bản gốc.

### Cách đọc và giải thích

B019 dùng indicator cho từng khoảng: đầu vào thuộc khoảng nào thì một feature tương ứng bật, dự đoán bằng độ cao trọng số của khoảng đó. B020 thêm cosine vào đa thức để mô tả dao động trên một xu hướng nền. Các đường nhiều màu minh họa các hàm có dạng khác nhau, không tự động cùng một bộ trọng số. Cần giữ quy ước radian khi thay số vào cosine.

**Tự kiểm tra (áp dụng cho các panel trên):** Với đầu vào 2,3 thuộc khoảng thứ ba và đầu vào hai ở ví dụ cosine, hai kết quả gốc là gì?

**Đáp án và ý nghĩa:** Ví dụ từng đoạn cho bốn. Ví dụ tuần hoàn cho khoảng 3,56 từ cosine của sáu radian.
-->


---

<div class="track"><span>05 – Feature phi tuyến và feature template</span><span>ML tổng hợp</span></div>

# Nâng chiều để tách cấu trúc vòng tròn


<figure><img src="/images/feature-space.png" style="max-height:290px" alt="Hai tọa độ gốc và chiều bán kính bình phương, panel B022"/><figcaption>Hai tọa độ gốc và chiều bán kính bình phương, panel B022</figcaption></figure>


<div class="note">Thêm x₁² + x₂² giúp mặt phẳng ở không gian feature tạo ranh giới tròn trong không gian gốc</div>



<!--
Nguồn: Hoc_may_Tong_hop_chuyen_sau_3_bai_giang.pdf, trang 63.



Panel B022 • Bản render nguyên trang từ [B], trang PDF 22. Nội dung trong panel là bản gốc.

### Cách đọc và giải thích

Trái là hai nhóm trong mặt phẳng với hai tọa độ. Phải thêm một chiều thể hiện tổng bình phương hai tọa độ, nên điểm xa tâm được nâng cao hơn. Một mặt phẳng ngang có thể tách mức bán kính khác nhau. [DIỄN GIẢI] Ranh giới đưa về mặt phẳng gốc là một đường tròn, dù mặt phân cách trong không gian feature là tuyến tính.

**Tự kiểm tra (áp dụng cho các panel trên):** Tại sao chiều mới có ích khi hai lớp lồng vào nhau?

**Đáp án và ý nghĩa:** Khoảng cách đến tâm chứa thông tin phân biệt mà một ngưỡng tuyến tính theo hai tọa độ riêng lẻ không thể tách bằng một đường thẳng.
-->


---

<div class="track"><span>05 – Feature phi tuyến và feature template</span><span>ML tổng hợp</span></div>

# Feature template và vector thưa


| Khái niệm | Ví dụ |
|---|---|
| Template | “Ba ký tự cuối bằng ___” |
| Feature cụ thể | `endsWith com`, `endsWith org` |
| Sparse vector | Chỉ lưu thành phần khác không |

Ví dụ: `{"endsWith com": 1}`<br/>
Các khóa không có trong mẫu được hiểu là **0**


<div class="note">Template tổ chức feature. Dữ liệu học trọng số. Mạng nơ-ron còn học cả biểu diễn trung gian</div>



<!--
Nguồn: Hoc_may_Tong_hop_chuyen_sau_3_bai_giang.pdf, trang 59, 64, 65.



**Đặc trưng cụ thể** là một phép đo như “có ký tự @”. **Feature template** là quy tắc sinh ra một họ đặc trưng, chẳng hạn “ba ký tự cuối bằng ___” có thể tạo các đặc trưng hậu tố com, org, net và nhiều hậu tố khác.

Ví dụ trong slide xét chuỗi `abc@gmail.com`, dùng các giá trị minh họa sau:

| Đặc trưng | Giá trị trong slide | Trọng số | Đóng góp |
|---|---:|---:|---:|
| Độ dài lớn hơn 10 | $1$ | $-1.2$ | $-1.2$ |
| Tỷ lệ chữ cái | $0.85$ | $0.6$ | $0.51$ |
| Chứa @ | $1$ | $3$ | $3$ |
| Kết thúc bằng com | $1$ | $2.2$ | $2.2$ |
| Kết thúc bằng org | $0$ | $1.4$ | $0$ |

$$s(x)=-1.2+0.51+3+2.2=4.51\quad\Rightarrow\quad\widehat y=+1.$$

**Giữ nguyên phép tính của slide**, nhưng cần lưu ý tỷ lệ chữ cái $0.85$ chỉ là số liệu minh họa. Nếu định nghĩa tỷ lệ là số ký tự alphabet chia tổng ký tự của đúng chuỗi trên, ta có $10/13\approx0.7692$, và score tương ứng khoảng $4.4615$. Nhãn dự đoán vẫn dương.

### Vì sao dùng vector thưa?

Trong hàng nghìn hậu tố, một chuỗi chỉ kích hoạt rất ít đặc trưng. Thay vì lưu mọi số không, có thể lưu từ điển như `{"endsWith com": 1}`. Các khóa không xuất hiện được hiểu là giá trị không. Tích vô hướng chỉ cần tính các đóng góp khác không.

**Handcrafted features** do người thiết kế quy tắc $\phi$. Dữ liệu học các trọng số $w$. Mạng nơ-ron tiến thêm một bước: các biến đổi tạo biểu diễn trung gian cũng có tham số được học.

Panel B025 • Bản render nguyên trang từ [B], trang PDF 25. Nội dung trong panel là bản gốc.

Panel B026 • Bản render nguyên trang từ [B], trang PDF 26. Nội dung trong panel là bản gốc.

### Cách đọc và giải thích

B025 giữ đủ tên feature, giá trị, trọng số và đóng góp cho chuỗi abc@gmail.com. Nhân đúng cặp rồi cộng cho score 4,51. B026 phân biệt một template hậu tố với từng feature com/org/net. [DIỄN GIẢI] Template tổ chức không gian feature, dữ liệu học trọng số, không phải template tự quyết định trọng số.

**Tự kiểm tra (áp dụng cho các panel trên):** Tỷ lệ chữ cái 0,85 trong bảng có phải phép đếm đúng ký tự của chuỗi đã ghi không?

**Đáp án và ý nghĩa:** Nếu định nghĩa là số chữ alphabet chia toàn bộ ký tự thì có 10/13, khoảng 0,7692. Phép tính score 4,51 đúng với giá trị minh họa 0,85 của bảng, còn dùng 10/13 cho khoảng 4,4615.

Panel B027 • Bản render nguyên trang từ [B], trang PDF 27. Nội dung trong panel là bản gốc.

Panel B028 • Bản render nguyên trang từ [B], trang PDF 28. Nội dung trong panel là bản gốc.

### Cách đọc và giải thích

B027 chỉ lưu hậu tố đang kích hoạt, các khóa vắng là số không. Điều này tiết kiệm lưu trữ khi không gian feature lớn nhưng mỗi mẫu có ít thành phần khác không. B028 tách bước tạo feature do người thiết kế và score có trọng số học được. [DIỄN GIẢI] Vector thưa là cách biểu diễn/lưu trữ, không tự là một phương pháp học mới hoặc một loại loss.

**Tự kiểm tra (áp dụng cho các panel trên):** Từ điển chỉ có khóa com có nghĩa mọi hậu tố khác bị xóa khỏi mô hình không?

**Đáp án và ý nghĩa:** Không. Với mẫu hiện tại, chúng có giá trị không. Không gian feature và trọng số có thể vẫn chứa những hậu tố đó.
-->


---

<div class="track"><span>05 – Feature phi tuyến và feature template</span><span>ML tổng hợp</span></div>

# Ví dụ email


| Feature | Giá trị trong nguồn | Trọng số |
|---|---:|---:|
| length > 10 | 1 | −1,2 |
| fracOfAlpha | 0,85 | 0,6 |
| contains @ | 1 | 3 |
| endsWith com | 1 | 2,2 |
| endsWith org | 0 | 1,4 |


<div class="answer" v-click>Score theo bảng = <b>4,51</b>, dự đoán nhãn dương</div>



<div class="note">Với đúng chuỗi abc@gmail.com, tỷ lệ chữ cái theo ký tự là 10/13. Dùng tỷ lệ này cho score ≈ 4,4615</div>



<!--
Nguồn: Hoc_may_Tong_hop_chuyen_sau_3_bai_giang.pdf, trang 59, 64.



**Đặc trưng cụ thể** là một phép đo như “có ký tự @”. **Feature template** là quy tắc sinh ra một họ đặc trưng, chẳng hạn “ba ký tự cuối bằng ___” có thể tạo các đặc trưng hậu tố com, org, net và nhiều hậu tố khác.

Ví dụ trong slide xét chuỗi `abc@gmail.com`, dùng các giá trị minh họa sau:

| Đặc trưng | Giá trị trong slide | Trọng số | Đóng góp |
|---|---:|---:|---:|
| Độ dài lớn hơn 10 | $1$ | $-1.2$ | $-1.2$ |
| Tỷ lệ chữ cái | $0.85$ | $0.6$ | $0.51$ |
| Chứa @ | $1$ | $3$ | $3$ |
| Kết thúc bằng com | $1$ | $2.2$ | $2.2$ |
| Kết thúc bằng org | $0$ | $1.4$ | $0$ |

$$s(x)=-1.2+0.51+3+2.2=4.51\quad\Rightarrow\quad\widehat y=+1.$$

**Giữ nguyên phép tính của slide**, nhưng cần lưu ý tỷ lệ chữ cái $0.85$ chỉ là số liệu minh họa. Nếu định nghĩa tỷ lệ là số ký tự alphabet chia tổng ký tự của đúng chuỗi trên, ta có $10/13\approx0.7692$, và score tương ứng khoảng $4.4615$. Nhãn dự đoán vẫn dương.

### Vì sao dùng vector thưa?

Trong hàng nghìn hậu tố, một chuỗi chỉ kích hoạt rất ít đặc trưng. Thay vì lưu mọi số không, có thể lưu từ điển như `{"endsWith com": 1}`. Các khóa không xuất hiện được hiểu là giá trị không. Tích vô hướng chỉ cần tính các đóng góp khác không.

**Handcrafted features** do người thiết kế quy tắc $\phi$. Dữ liệu học các trọng số $w$. Mạng nơ-ron tiến thêm một bước: các biến đổi tạo biểu diễn trung gian cũng có tham số được học.

Panel B025 • Bản render nguyên trang từ [B], trang PDF 25. Nội dung trong panel là bản gốc.

Panel B026 • Bản render nguyên trang từ [B], trang PDF 26. Nội dung trong panel là bản gốc.

### Cách đọc và giải thích

B025 giữ đủ tên feature, giá trị, trọng số và đóng góp cho chuỗi abc@gmail.com. Nhân đúng cặp rồi cộng cho score 4,51. B026 phân biệt một template hậu tố với từng feature com/org/net. [DIỄN GIẢI] Template tổ chức không gian feature, dữ liệu học trọng số, không phải template tự quyết định trọng số.

**Tự kiểm tra (áp dụng cho các panel trên):** Tỷ lệ chữ cái 0,85 trong bảng có phải phép đếm đúng ký tự của chuỗi đã ghi không?

**Đáp án và ý nghĩa:** Nếu định nghĩa là số chữ alphabet chia toàn bộ ký tự thì có 10/13, khoảng 0,7692. Phép tính score 4,51 đúng với giá trị minh họa 0,85 của bảng, còn dùng 10/13 cho khoảng 4,4615.
-->


---

<div class="track"><span>05 – Feature phi tuyến và feature template</span><span>ML tổng hợp</span></div>

# Tự luyện – Sparse có nghĩa là dữ liệu bị thiếu?



<div class="answer" v-click>Theo quy ước ví dụ, khóa vắng là số không. Giá trị chưa biết là một tình huống khác, cần quy tắc xử lý riêng.</div>



<div class="note">Thử trả lời trước khi bấm Tiếp</div>



<!--
Nguồn: Hoc_may_Tong_hop_chuyen_sau_3_bai_giang.pdf, trang 59, 165.



**Đặc trưng cụ thể** là một phép đo như “có ký tự @”. **Feature template** là quy tắc sinh ra một họ đặc trưng, chẳng hạn “ba ký tự cuối bằng ___” có thể tạo các đặc trưng hậu tố com, org, net và nhiều hậu tố khác.

Ví dụ trong slide xét chuỗi `abc@gmail.com`, dùng các giá trị minh họa sau:

| Đặc trưng | Giá trị trong slide | Trọng số | Đóng góp |
|---|---:|---:|---:|
| Độ dài lớn hơn 10 | $1$ | $-1.2$ | $-1.2$ |
| Tỷ lệ chữ cái | $0.85$ | $0.6$ | $0.51$ |
| Chứa @ | $1$ | $3$ | $3$ |
| Kết thúc bằng com | $1$ | $2.2$ | $2.2$ |
| Kết thúc bằng org | $0$ | $1.4$ | $0$ |

$$s(x)=-1.2+0.51+3+2.2=4.51\quad\Rightarrow\quad\widehat y=+1.$$

**Giữ nguyên phép tính của slide**, nhưng cần lưu ý tỷ lệ chữ cái $0.85$ chỉ là số liệu minh họa. Nếu định nghĩa tỷ lệ là số ký tự alphabet chia tổng ký tự của đúng chuỗi trên, ta có $10/13\approx0.7692$, và score tương ứng khoảng $4.4615$. Nhãn dự đoán vẫn dương.

### Vì sao dùng vector thưa?

Trong hàng nghìn hậu tố, một chuỗi chỉ kích hoạt rất ít đặc trưng. Thay vì lưu mọi số không, có thể lưu từ điển như `{"endsWith com": 1}`. Các khóa không xuất hiện được hiểu là giá trị không. Tích vô hướng chỉ cần tính các đóng góp khác không.

**Handcrafted features** do người thiết kế quy tắc $\phi$. Dữ liệu học các trọng số $w$. Mạng nơ-ron tiến thêm một bước: các biến đổi tạo biểu diễn trung gian cũng có tham số được học.

**[CÂU HỎI BIÊN SOẠN]** Dựa trên nội dung chương. Hãy tự trả lời trước rồi mới xem phần giải thích dưới từng câu.

### 5.1 • Ghi nhớ

**Feature template khác feature thế nào?**

Template là quy tắc sinh một họ feature, còn feature cụ thể là một điều kiện/phép đo và có giá trị cho từng đầu vào.

### 5.2 • Thông hiểu

**Vì sao mô hình chứa bình phương x vẫn được gọi tuyến tính?**

Với feature cố định, score là tổng trọng số nhân feature nên tuyến tính theo trọng số, dù cong theo đầu vào.

### 5.3 • Vận dụng

**Tính ví dụ w=(2;1;−0,2), feature tại x=3.**

Feature là (1;3;9), dự đoán 2+3−1,8=3,2. Dấu hệ số bậc hai cho parabol mở xuống.

### 5.4 • Phân tích

**Khóa vắng trong sparse vector có phải luôn là dữ liệu chưa biết?**

Không. Theo quy ước ví dụ, khóa vắng là giá trị không. Giá trị thiếu cần mã hóa/quy tắc xử lý riêng.

### 5.5 • Đánh giá

**Có nên thay ví dụ email bằng chuỗi dễ đếm hơn?**

Không nếu mục tiêu bảo toàn ví dụ. Giữ bảng gốc, giải score theo bảng và nêu riêng tỷ lệ đếm lại với định nghĩa rõ.
-->


---

<div class="track"><span>06 – Mạng nơ-ron, activation và forward pass</span><span>ML tổng hợp</span></div>

# XOR và hai nút ẩn


An toàn khi $|x_1-x_2|\ge1$, với $x_1,x_2\in\{0,2\}$

| Cặp vị trí | Nhãn |
|---|---|
| $(0,2),(2,0)$ | +1 |
| $(0,0),(2,2)$ | −1 |


$$
h_1=\mathbf1[x_1-x_2\ge1],\quad h_2=\mathbf1[x_2-x_1\ge1]
$$



<div class="note">Đầu ra an toàn nếu h₁ hoặc h₂ bật. Một đường thẳng đơn lẻ không tách được XOR</div>



<!--
Nguồn: Hoc_may_Tong_hop_chuyen_sau_3_bai_giang.pdf, trang 68, 72.



Ví dụ hai xe dùng hai tọa độ $x_1,x_2\in\{0,2\}$. Quy tắc giả định là an toàn khi $|x_1-x_2|\ge1$.

| Vị trí hai xe | Nhãn |
|---|---|
| $(0,2),(2,0)$ | $+1$: an toàn |
| $(0,0),(2,2)$ | $-1$: không an toàn |

Sau khi chia tọa độ cho hai, đây là XOR: hai bit khác nhau thì nhãn dương. Một đường thẳng không thể tách hai điểm dương ở hai góc đối diện khỏi hai điểm âm còn lại.

Hai nút ẩn có thể kiểm tra hai điều kiện con:

$$h_1=\mathbf1[x_1-x_2\ge1],\qquad
h_2=\mathbf1[x_2-x_1\ge1].$$

Đầu ra an toàn khi ít nhất một nút bằng một. Lớp ẩn đã chuyển một quan hệ khó thành hai phép kiểm tra đơn giản rồi kết hợp chúng.

### Nhiều lớp tuyến tính vẫn gộp thành một lớp

$$W_2(W_1x+b_1)+b_2=(W_2W_1)x+(W_2b_1+b_2).$$

Vì vậy, chỉ chồng các phép affine không tạo ra khả năng biểu diễn mới như XOR. Cần activation phi tuyến giữa các lớp. Hàm ngưỡng giúp hình dung logic, nhưng gradient bằng không gần như khắp nơi, nên khi học thường dùng các activation phù hợp hơn.

Panel B031 • Bản render nguyên trang từ [B], trang PDF 31. Nội dung trong panel là bản gốc.

Panel B032 • Bản render nguyên trang từ [B], trang PDF 32. Nội dung trong panel là bản gốc.

### Cách đọc và giải thích

B031 giữ bảng vị trí xe và nhãn theo quy tắc khoảng cách tuyệt đối. Hai điểm an toàn ở hai góc đối nhau. B032 dùng hai nút ẩn để kiểm tra hai chiều chênh lệch, rồi lấy quan hệ OR. Đọc mũi tên như luồng tính toán, không diễn giải thành chuyển động vật lý của xe. Đây là mô hình hình học giả định trong bài giảng.

**Tự kiểm tra (áp dụng cho các panel trên):** Với vị trí (0;2), nút ẩn nào bật? Với (2;2) thì sao?

**Đáp án và ý nghĩa:** Tại (0;2), nút kiểm tra x₂ − x₁ ít nhất một bật. Tại (2;2), cả hai hiệu đều bằng không nên hai nút không bật.
-->


---

<div class="track"><span>06 – Mạng nơ-ron, activation và forward pass</span><span>ML tổng hợp</span></div>

# Activation và đạo hàm


| Hàm | Công thức | Đạo hàm |
|---|---|---|
| Sigmoid | $\sigma(z)=1/(1+e^{-z})$ | $\sigma(z)(1-\sigma(z))$ |
| Tanh | $\tanh z$ | $1-\tanh^2z$ |
| ReLU | $\max(0,z)$ | $0$ miền âm, $1$ miền dương |
| Leaky ReLU | $\max(\alpha z,z)$ | $\alpha$ miền âm, $1$ miền dương |


<div class="note">Sigmoid/tanh dễ bão hòa. ReLU có thể chặn gradient ở miền âm. Tại điểm gãy cần quy ước</div>



<!--
Nguồn: Hoc_may_Tong_hop_chuyen_sau_3_bai_giang.pdf, trang 69, 73, 74.



| Hàm | Công thức | Đạo hàm |
|---|---|---|
| Sigmoid | $\sigma(z)=1/(1+e^{-z})$ | $\sigma(z)(1-\sigma(z))$ |
| Tanh | $\tanh z=(e^z-e^{-z})/(e^z+e^{-z})$ | $1-\tanh^2z$ |
| ReLU | $\max(0,z)$ | $0$ nếu $z0$ |
| Leaky ReLU | $\max(\alpha z,z)$, $00$ |

**Sigmoid** đưa số thực về khoảng từ không đến một, thường dùng cho xác suất đầu ra nhị phân. **Tanh** cho đầu ra từ âm một đến một và có tâm tại không. Hai hàm này bị bão hòa ở đầu vào có độ lớn lớn, khi đó đạo hàm rất nhỏ.

**ReLU** giữ phần dương và cho phần âm bằng không. Nó đơn giản, thường dùng ở lớp ẩn. **Leaky ReLU** giữ một độ dốc nhỏ ở phần âm, giúp giảm nguy cơ neuron không còn nhận được tín hiệu học.

### Đọc gradient qua activation

Tại đầu vào dương ba, ReLU cho đầu ra ba và truyền nguyên gradient cục bộ. Tại đầu vào âm một, đầu ra bằng không và gradient bị chặn với mẫu ấy. Tại không, ReLU không khả vi, thư viện thường chọn một quy ước, phổ biến là đạo hàm bằng không.

**Dying ReLU** nói đến tình huống một neuron liên tục ở miền âm trên dữ liệu liên quan và khó được cập nhật qua nhánh ReLU. Việc bị chặn ở một mẫu chưa đủ để kết luận neuron đã “chết”.

Chọn activation cho đầu ra phải khớp bài toán: hồi quy thường dùng đầu ra tuyến tính, nhị phân thường dùng sigmoid, đa lớp loại trừ nhau thường dùng softmax.

Panel B033 • Bản render nguyên trang từ [B], trang PDF 33. Nội dung trong panel là bản gốc.

Panel B034 • Bản render nguyên trang từ [B], trang PDF 34. Nội dung trong panel là bản gốc.

### Cách đọc và giải thích

B033 đặt hàm ngưỡng cạnh các lựa chọn phù hợp cho học bằng gradient. B034 có sigmoid bão hòa về không/một và tanh bão hòa về âm một/một. B035 đối chiếu ReLU với Leaky ReLU ở miền âm. Đọc trục ngang là giá trị trước activation, trục dọc là đầu ra. Độ dốc ở từng vùng quyết định gradient cục bộ truyền qua thế nào. Panel còn lại của nhóm được phóng riêng ở trang kế tiếp.

**Tự kiểm tra (áp dụng cho các panel trên):** Ở miền âm, vì sao hai đường trong B035 dẫn đến gradient khác nhau?

**Đáp án và ý nghĩa:** ReLU phẳng nên đạo hàm bằng không. Leaky ReLU giữ độ dốc nhỏ dương, nên còn một phần tín hiệu gradient. Tại điểm gãy cần quy ước.

Panel B035 • Bản render nguyên trang từ [B], trang PDF 35. Nội dung trong panel là bản gốc.

### Cách đọc và giải thích

B035 đối chiếu ReLU với Leaky ReLU ở miền âm. Đọc trục ngang là giá trị trước activation, trục dọc là đầu ra. Độ dốc ở từng vùng quyết định gradient cục bộ truyền qua thế nào.

**Tự kiểm tra (áp dụng cho các panel trên):** Ở miền âm, vì sao hai đường trong B035 dẫn đến gradient khác nhau?

**Đáp án và ý nghĩa:** ReLU phẳng nên đạo hàm bằng không. Leaky ReLU giữ độ dốc nhỏ dương, nên còn một phần tín hiệu gradient. Tại điểm gãy cần quy ước.
-->


---

<div class="track"><span>06 – Mạng nơ-ron, activation và forward pass</span><span>ML tổng hợp</span></div>

# Phi tuyến giữa các lớp



$$
W_2(W_1x+b_1)+b_2=(W_2W_1)x+(W_2b_1+b_2)
$$


- Nhiều lớp affine vẫn gộp thành một affine
- Activation phi tuyến làm lớp mô hình phong phú hơn
- Biểu diễn ẩn có thể học từ dữ liệu


<div class="note">Gợi ý lựa chọn: đầu ra hồi quy tuyến tính, nhị phân sigmoid, đa lớp loại trừ dùng softmax</div>



<!--
Nguồn: Hoc_may_Tong_hop_chuyen_sau_3_bai_giang.pdf, trang 68, 69, 70, 75.



Ví dụ hai xe dùng hai tọa độ $x_1,x_2\in\{0,2\}$. Quy tắc giả định là an toàn khi $|x_1-x_2|\ge1$.

| Vị trí hai xe | Nhãn |
|---|---|
| $(0,2),(2,0)$ | $+1$: an toàn |
| $(0,0),(2,2)$ | $-1$: không an toàn |

Sau khi chia tọa độ cho hai, đây là XOR: hai bit khác nhau thì nhãn dương. Một đường thẳng không thể tách hai điểm dương ở hai góc đối diện khỏi hai điểm âm còn lại.

Hai nút ẩn có thể kiểm tra hai điều kiện con:

$$h_1=\mathbf1[x_1-x_2\ge1],\qquad
h_2=\mathbf1[x_2-x_1\ge1].$$

Đầu ra an toàn khi ít nhất một nút bằng một. Lớp ẩn đã chuyển một quan hệ khó thành hai phép kiểm tra đơn giản rồi kết hợp chúng.

### Nhiều lớp tuyến tính vẫn gộp thành một lớp

$$W_2(W_1x+b_1)+b_2=(W_2W_1)x+(W_2b_1+b_2).$$

Vì vậy, chỉ chồng các phép affine không tạo ra khả năng biểu diễn mới như XOR. Cần activation phi tuyến giữa các lớp. Hàm ngưỡng giúp hình dung logic, nhưng gradient bằng không gần như khắp nơi, nên khi học thường dùng các activation phù hợp hơn.

| Hàm | Công thức | Đạo hàm |
|---|---|---|
| Sigmoid | $\sigma(z)=1/(1+e^{-z})$ | $\sigma(z)(1-\sigma(z))$ |
| Tanh | $\tanh z=(e^z-e^{-z})/(e^z+e^{-z})$ | $1-\tanh^2z$ |
| ReLU | $\max(0,z)$ | $0$ nếu $z0$ |
| Leaky ReLU | $\max(\alpha z,z)$, $00$ |

**Sigmoid** đưa số thực về khoảng từ không đến một, thường dùng cho xác suất đầu ra nhị phân. **Tanh** cho đầu ra từ âm một đến một và có tâm tại không. Hai hàm này bị bão hòa ở đầu vào có độ lớn lớn, khi đó đạo hàm rất nhỏ.

**ReLU** giữ phần dương và cho phần âm bằng không. Nó đơn giản, thường dùng ở lớp ẩn. **Leaky ReLU** giữ một độ dốc nhỏ ở phần âm, giúp giảm nguy cơ neuron không còn nhận được tín hiệu học.

### Đọc gradient qua activation

Tại đầu vào dương ba, ReLU cho đầu ra ba và truyền nguyên gradient cục bộ. Tại đầu vào âm một, đầu ra bằng không và gradient bị chặn với mẫu ấy. Tại không, ReLU không khả vi, thư viện thường chọn một quy ước, phổ biến là đạo hàm bằng không.

**Dying ReLU** nói đến tình huống một neuron liên tục ở miền âm trên dữ liệu liên quan và khó được cập nhật qua nhánh ReLU. Việc bị chặn ở một mẫu chưa đủ để kết luận neuron đã “chết”.

Chọn activation cho đầu ra phải khớp bài toán: hồi quy thường dùng đầu ra tuyến tính, nhị phân thường dùng sigmoid, đa lớp loại trừ nhau thường dùng softmax.

Mạng truyền thẳng là phép hợp của nhiều lớp biến đổi. Mỗi lớp tính tổ hợp affine rồi áp dụng activation.

$$a^{[0]}=x,\quad z^{[l]}=W^{[l]}a^{[l-1]}+b^{[l]},\quad
a^{[l]}=g^{[l]}(z^{[l]}).$$

Nếu lớp trước có $n_{l-1}$ nút và lớp hiện tại có $n_l$ nút:

| Đại lượng | Kích thước với một mẫu |
|---|---|
| $W^{[l]}$ | $n_l\times n_{l-1}$ |
| $b^{[l]},z^{[l]},a^{[l]}$ | $n_l\times1$ |
| Số tham số của lớp | $n_l(n_{l-1}+1)$ |

Ví dụ mạng có hai đầu vào, hai nút ẩn và một đầu ra có tổng chín tham số: bốn trọng số và hai bias lớp ẩn, hai trọng số và một bias đầu ra.

### Biểu diễn học được

Vector $a^{[l]}$ là biểu diễn trung gian. Với ảnh, một hình dung là pixel → cạnh → bộ phận → vật thể. Đây là cách giải thích trực giác, không phải mọi neuron đều có một ý nghĩa duy nhất có thể đặt tên.

Khi huấn luyện, gradient tác động lên trọng số của các lớp trước, nên mô hình đồng thời học **biểu diễn** và **quy tắc dự đoán**. Đây là khác biệt quan trọng so với việc chỉ học trọng số trên một bộ feature thủ công cố định.

Panel B038 • Bản render nguyên trang từ [B], trang PDF 38. Nội dung trong panel là bản gốc.

Panel B043 • Bản render nguyên trang từ [B], trang PDF 43. Nội dung trong panel là bản gốc.

### Cách đọc và giải thích

B038 vẽ hai đầu vào, hai nút ẩn và một đầu ra, mỗi cạnh là trọng số. B043 minh họa pixel → cạnh → bộ phận → vật thể. C012 mô tả một lớp như nhân ma trận, cộng bias rồi activation và ghép nhiều lớp. [DIỄN GIẢI] Tầng biểu diễn là cách hình dung hữu ích, không có nghĩa mọi nút luôn có một nhãn ngữ nghĩa duy nhất. Panel còn lại của nhóm được phóng riêng ở trang kế tiếp.

**Tự kiểm tra (áp dụng cho các panel trên):** Nếu bỏ toàn bộ phi tuyến ở giữa thì chồng nhiều lớp còn tạo được XOR không?

**Đáp án và ý nghĩa:** Không. Các phép affine liên tiếp gộp thành một phép affine. Số lớp tăng nhưng lớp hàm không vượt được hạn chế này.
-->


---

<div class="track"><span>06 – Mạng nơ-ron, activation và forward pass</span><span>ML tổng hợp</span></div>

# Forward theo lớp và kích thước



$$
a^{[0]}=x,\quad z^{[l]}=W^{[l]}a^{[l-1]}+b^{[l]},\quad a^{[l]}=g^{[l]}(z^{[l]})
$$


| Đại lượng | Kích thước một mẫu |
|---|---|
| $W^{[l]}$ | $n_l\times n_{l-1}$ |
| $b^{[l]},z^{[l]},a^{[l]}$ | $n_l\times1$ |
| Số tham số của lớp | $n_l(n_{l-1}+1)$ |


<!--
Nguồn: Hoc_may_Tong_hop_chuyen_sau_3_bai_giang.pdf, trang 70, 75, 76.



Mạng truyền thẳng là phép hợp của nhiều lớp biến đổi. Mỗi lớp tính tổ hợp affine rồi áp dụng activation.

$$a^{[0]}=x,\quad z^{[l]}=W^{[l]}a^{[l-1]}+b^{[l]},\quad
a^{[l]}=g^{[l]}(z^{[l]}).$$

Nếu lớp trước có $n_{l-1}$ nút và lớp hiện tại có $n_l$ nút:

| Đại lượng | Kích thước với một mẫu |
|---|---|
| $W^{[l]}$ | $n_l\times n_{l-1}$ |
| $b^{[l]},z^{[l]},a^{[l]}$ | $n_l\times1$ |
| Số tham số của lớp | $n_l(n_{l-1}+1)$ |

Ví dụ mạng có hai đầu vào, hai nút ẩn và một đầu ra có tổng chín tham số: bốn trọng số và hai bias lớp ẩn, hai trọng số và một bias đầu ra.

### Biểu diễn học được

Vector $a^{[l]}$ là biểu diễn trung gian. Với ảnh, một hình dung là pixel → cạnh → bộ phận → vật thể. Đây là cách giải thích trực giác, không phải mọi neuron đều có một ý nghĩa duy nhất có thể đặt tên.

Khi huấn luyện, gradient tác động lên trọng số của các lớp trước, nên mô hình đồng thời học **biểu diễn** và **quy tắc dự đoán**. Đây là khác biệt quan trọng so với việc chỉ học trọng số trên một bộ feature thủ công cố định.

Panel B038 • Bản render nguyên trang từ [B], trang PDF 38. Nội dung trong panel là bản gốc.

Panel B043 • Bản render nguyên trang từ [B], trang PDF 43. Nội dung trong panel là bản gốc.

### Cách đọc và giải thích

B038 vẽ hai đầu vào, hai nút ẩn và một đầu ra, mỗi cạnh là trọng số. B043 minh họa pixel → cạnh → bộ phận → vật thể. C012 mô tả một lớp như nhân ma trận, cộng bias rồi activation và ghép nhiều lớp. [DIỄN GIẢI] Tầng biểu diễn là cách hình dung hữu ích, không có nghĩa mọi nút luôn có một nhãn ngữ nghĩa duy nhất. Panel còn lại của nhóm được phóng riêng ở trang kế tiếp.

**Tự kiểm tra (áp dụng cho các panel trên):** Nếu bỏ toàn bộ phi tuyến ở giữa thì chồng nhiều lớp còn tạo được XOR không?

**Đáp án và ý nghĩa:** Không. Các phép affine liên tiếp gộp thành một phép affine. Số lớp tăng nhưng lớp hàm không vượt được hạn chế này.

Panel C012 • Bản render nguyên trang từ [C], trang PDF 12. Nội dung trong panel là bản gốc.

### Cách đọc và giải thích

C012 mô tả một lớp như nhân ma trận, cộng bias rồi activation và ghép nhiều lớp. [DIỄN GIẢI] Tầng biểu diễn là cách hình dung hữu ích, không có nghĩa mọi nút luôn có một nhãn ngữ nghĩa duy nhất.

**Tự kiểm tra (áp dụng cho các panel trên):** Nếu bỏ toàn bộ phi tuyến ở giữa thì chồng nhiều lớp còn tạo được XOR không?

**Đáp án và ý nghĩa:** Không. Các phép affine liên tiếp gộp thành một phép affine. Số lớp tăng nhưng lớp hàm không vượt được hạn chế này.
-->


---

<div class="track"><span>06 – Mạng nơ-ron, activation và forward pass</span><span>ML tổng hợp</span></div>

# Ví dụ forward: thiết lập



$$
x=\begin{bmatrix}1\\2\end{bmatrix},\quad W^{[1]}=\begin{bmatrix}1&1\\-1&1\end{bmatrix},\quad b^{[1]}=\begin{bmatrix}0\\-2\end{bmatrix}
$$



$$
W^{[2]}=[1,-1],\qquad b^{[2]}=-1
$$



<div class="note">Lớp ẩn ReLU, đầu ra sigmoid. Nhãn thật y = 1</div>



<!--
Nguồn: Hoc_may_Tong_hop_chuyen_sau_3_bai_giang.pdf, trang 71.



Cho một mẫu có $x=[1,2]^\top$, nhãn thật $y=1$. Lớp ẩn dùng ReLU, đầu ra dùng sigmoid.

$$W^{[1]}=\begin{bmatrix}1&1\\-1&1\end{bmatrix},\quad
b^{[1]}=\begin{bmatrix}0\\-2\end{bmatrix},\quad
W^{[2]}=\begin{bmatrix}1&-1\end{bmatrix},\quad b^{[2]}=-1.$$

### Bước 1. Tính lớp ẩn

$$z^{[1]}=\begin{bmatrix}1\cdot1+1\cdot2+0\\-1\cdot1+1\cdot2-2\end{bmatrix}
=\begin{bmatrix}3\\-1\end{bmatrix}.$$

$$a^{[1]}=\operatorname{ReLU}(z^{[1]})=\begin{bmatrix}3\\0\end{bmatrix}.$$

Nút thứ nhất hoạt động, nút thứ hai bị đưa về không vì giá trị trước activation âm.

### Bước 2. Tính đầu ra và loss

$$z^{[2]}=[1,-1]\begin{bmatrix}3\\0\end{bmatrix}-1=2.$$

$$\widehat y=\sigma(2)\approx0.880797,\qquad
\ell=-\log\widehat y\approx0.126928.$$

Với ngưỡng xác suất một phần hai, mô hình dự đoán lớp một. Tuy dự đoán đúng, BCE vẫn dương vì xác suất lớp đúng chưa bằng một.

Slide ở phần sau ghi bias lớp ẩn là vector không, nhưng vẫn giữ kết quả nút thứ hai bằng âm một. Để mọi phép tính khớp nhau, bản tổng hợp dùng bias [0, −2] như phần thiết lập ban đầu. Ảnh hưởng của hiệu chỉnh này được giữ xuyên suốt backprop và cập nhật.
-->


---

<div class="track"><span>06 – Mạng nơ-ron, activation và forward pass</span><span>ML tổng hợp</span></div>

# Ví dụ forward: kết quả



$$
z^{[1]}=[3,-1]^\top,\qquad a^{[1]}=[3,0]^\top
$$



$$
z^{[2]}=1\cdot3-1\cdot0-1=2
$$



$$
\hat y=\sigma(2)\approx0.8808,\qquad L=-\log\hat y\approx0.1269
$$



<div class="note">Dự đoán đúng lớp vẫn có BCE dương vì xác suất lớp đúng chưa bằng một</div>



<!--
Nguồn: Hoc_may_Tong_hop_chuyen_sau_3_bai_giang.pdf, trang 71.



Cho một mẫu có $x=[1,2]^\top$, nhãn thật $y=1$. Lớp ẩn dùng ReLU, đầu ra dùng sigmoid.

$$W^{[1]}=\begin{bmatrix}1&1\\-1&1\end{bmatrix},\quad
b^{[1]}=\begin{bmatrix}0\\-2\end{bmatrix},\quad
W^{[2]}=\begin{bmatrix}1&-1\end{bmatrix},\quad b^{[2]}=-1.$$

### Bước 1. Tính lớp ẩn

$$z^{[1]}=\begin{bmatrix}1\cdot1+1\cdot2+0\\-1\cdot1+1\cdot2-2\end{bmatrix}
=\begin{bmatrix}3\\-1\end{bmatrix}.$$

$$a^{[1]}=\operatorname{ReLU}(z^{[1]})=\begin{bmatrix}3\\0\end{bmatrix}.$$

Nút thứ nhất hoạt động, nút thứ hai bị đưa về không vì giá trị trước activation âm.

### Bước 2. Tính đầu ra và loss

$$z^{[2]}=[1,-1]\begin{bmatrix}3\\0\end{bmatrix}-1=2.$$

$$\widehat y=\sigma(2)\approx0.880797,\qquad
\ell=-\log\widehat y\approx0.126928.$$

Với ngưỡng xác suất một phần hai, mô hình dự đoán lớp một. Tuy dự đoán đúng, BCE vẫn dương vì xác suất lớp đúng chưa bằng một.

Slide ở phần sau ghi bias lớp ẩn là vector không, nhưng vẫn giữ kết quả nút thứ hai bằng âm một. Để mọi phép tính khớp nhau, bản tổng hợp dùng bias [0, −2] như phần thiết lập ban đầu. Ảnh hưởng của hiệu chỉnh này được giữ xuyên suốt backprop và cập nhật.
-->


---

<div class="track"><span>06 – Mạng nơ-ron, activation và forward pass</span><span>ML tổng hợp</span></div>

# Tự luyện – Một mẫu bị ReLU chặn là dying ReLU?



<div class="answer" v-click>Chưa đủ kết luận. Nút có thể nhận gradient ở mẫu khác. Cần xem nó có liên tục không hoạt động trên dữ liệu liên quan hay không.</div>



<div class="note">Thử trả lời trước khi bấm Tiếp</div>



<!--
Nguồn: Hoc_may_Tong_hop_chuyen_sau_3_bai_giang.pdf, trang 69, 166.



| Hàm | Công thức | Đạo hàm |
|---|---|---|
| Sigmoid | $\sigma(z)=1/(1+e^{-z})$ | $\sigma(z)(1-\sigma(z))$ |
| Tanh | $\tanh z=(e^z-e^{-z})/(e^z+e^{-z})$ | $1-\tanh^2z$ |
| ReLU | $\max(0,z)$ | $0$ nếu $z0$ |
| Leaky ReLU | $\max(\alpha z,z)$, $00$ |

**Sigmoid** đưa số thực về khoảng từ không đến một, thường dùng cho xác suất đầu ra nhị phân. **Tanh** cho đầu ra từ âm một đến một và có tâm tại không. Hai hàm này bị bão hòa ở đầu vào có độ lớn lớn, khi đó đạo hàm rất nhỏ.

**ReLU** giữ phần dương và cho phần âm bằng không. Nó đơn giản, thường dùng ở lớp ẩn. **Leaky ReLU** giữ một độ dốc nhỏ ở phần âm, giúp giảm nguy cơ neuron không còn nhận được tín hiệu học.

### Đọc gradient qua activation

Tại đầu vào dương ba, ReLU cho đầu ra ba và truyền nguyên gradient cục bộ. Tại đầu vào âm một, đầu ra bằng không và gradient bị chặn với mẫu ấy. Tại không, ReLU không khả vi, thư viện thường chọn một quy ước, phổ biến là đạo hàm bằng không.

**Dying ReLU** nói đến tình huống một neuron liên tục ở miền âm trên dữ liệu liên quan và khó được cập nhật qua nhánh ReLU. Việc bị chặn ở một mẫu chưa đủ để kết luận neuron đã “chết”.

Chọn activation cho đầu ra phải khớp bài toán: hồi quy thường dùng đầu ra tuyến tính, nhị phân thường dùng sigmoid, đa lớp loại trừ nhau thường dùng softmax.

**[CÂU HỎI BIÊN SOẠN]** Dựa trên nội dung chương. Hãy tự trả lời trước rồi mới xem phần giải thích dưới từng câu.

### 6.1 • Ghi nhớ

**Một lớp mạng truyền thẳng tính hai bước gì?**

Nhân ma trận cộng bias tạo tiền kích hoạt, rồi áp dụng activation. Đầu ra này làm đầu vào lớp tiếp.

### 6.2 • Thông hiểu

**Vì sao chồng affine không thay thế được phi tuyến?**

Phép hợp các affine vẫn là affine. Không tạo được lớp hàm cần để giải XOR theo đầu vào gốc.

### 6.3 • Vận dụng

**Trong ví dụ x=(1;2), bias (0;−2), lớp ẩn cho gì?**

Tiền kích hoạt là (3;−1), qua ReLU thành (3;0). Logit đầu ra là hai và sigmoid khoảng 0,8808.

### 6.4 • Phân tích

**Một nút ReLU bị chặn ở một mẫu đã là dying ReLU chưa?**

Chưa. Nó có thể nhận gradient ở mẫu khác. Cần xét tình trạng liên tục không hoạt động trên dữ liệu liên quan.

### 6.5 • Đánh giá

**Chọn sigmoid hay softmax cho phân loại nhiều lớp loại trừ nhau?**

Thường dùng softmax để tạo phân phối có tổng một trên các lớp loại trừ. Nhiều nhãn độc lập là một thiết lập khác, cần loss phù hợp.
-->


---

<div class="track"><span>07 – Lan truyền ngược và tối ưu mạng</span><span>ML tổng hợp</span></div>

# Quy tắc chuỗi trên đồ thị



$$
J=3(a+bc),\qquad a=5,\ b=3,\ c=2
$$


| Lượt xuôi | Giá trị |
|---|---:|
| $u=bc$ | 6 |
| $v=a+u$ | 11 |
| $J=3v$ | 33 |


<div class="answer" v-click>Lượt ngược: ∂J/∂a = <b>3</b>, ∂J/∂b = <b>6</b>, ∂J/∂c = <b>9</b></div>



<!--
Nguồn: Hoc_may_Tong_hop_chuyen_sau_3_bai_giang.pdf, trang 79, 84.



**Đồ thị tính toán** chia biểu thức lớn thành các phép toán nhỏ. Lượt xuôi tính và lưu giá trị. Lượt ngược tính ảnh hưởng của đầu ra cuối lên từng biến, theo thứ tự ngược của sự phụ thuộc.

Với $J=3(a+bc)$, đặt $u=bc$, $v=a+u$. Cho $a=5,b=3,c=2$, lượt xuôi là:

$$u=6,\qquad v=11,\qquad J=33.$$

Khởi tạo gradient đầu ra bằng một và đi ngược:

$$\frac{\partial J}{\partial J}=1,\quad
\frac{\partial J}{\partial v}=3,\quad
\frac{\partial J}{\partial a}=3,\quad
\frac{\partial J}{\partial u}=3.$$

$$\frac{\partial J}{\partial b}=\frac{\partial J}{\partial u}c=6,\qquad
\frac{\partial J}{\partial c}=\frac{\partial J}{\partial u}b=9.$$

### Một biến đi qua nhiều nhánh thì phải cộng

Xét $J=x^2+3x$. Biến đầu vào ảnh hưởng qua hai nhánh: nhánh bình phương và nhánh nhân ba.

$$\frac{dJ}{dx}=\underbrace{2x}_{\text{nhánh bình phương}}+
\underbrace{3}_{\text{nhánh nhân ba}}.$$

Tại $x=2$, ta có $J=10$ và gradient bằng bảy. Nếu chỉ giữ gradient của một nhánh, kết quả sẽ sai.

| Phép cục bộ | Gradient truyền về hai đầu vào |
|---|---|
| $u=a+b$ | Cùng nhận gradient phía sau |
| $u=a-b$ | Nhánh $a$ giữ dấu, nhánh $b$ đổi dấu |
| $u=ab$ | Nhánh $a$ nhân với $b$, nhánh $b$ nhân với $a$ |

**Backprop tính gradient. Gradient descent dùng gradient để cập nhật tham số.** Đây là hai thao tác khác nhau.

Panel B050 • Bản render nguyên trang từ [B], trang PDF 50. Nội dung trong panel là bản gốc.

Panel B056 • Bản render nguyên trang từ [B], trang PDF 56. Nội dung trong panel là bản gốc.

### Cách đọc và giải thích

B050 giữ trạng thái cuối lượt xuôi: tích sáu, tổng mười một, đầu ra ba mươi ba. B056 giữ gradient cuối lượt ngược. Đọc từ đầu ra về trái, nhân gradient phía sau với đạo hàm cục bộ của phép nhân/tổng. Các số giá trị và các số gradient có vai trò khác nhau, không được thay nhầm.

**Tự kiểm tra (áp dụng cho các panel trên):** Tại sao đạo hàm theo b bằng sáu còn theo c bằng chín?

**Đáp án và ý nghĩa:** Gradient tại tích bc là ba. Nhánh b nhân với giá trị c bằng hai, nhánh c nhân với b bằng ba, cho sáu và chín.
-->


---

<div class="track"><span>07 – Lan truyền ngược và tối ưu mạng</span><span>ML tổng hợp</span></div>

# Một biến đi qua nhiều nhánh



$$
J=x^2+3x,\qquad\frac{dJ}{dx}=2x+3
$$


<div class="step" v-click><b>01</b><span>Tại x = 2, nhánh bình phương đóng góp 4</span></div>

<div class="step" v-click><b>02</b><span>Nhánh nhân ba đóng góp 3</span></div>


<div class="answer" v-click>Cộng hai đóng góp: gradient bằng <b>7</b></div>



<div class="note">Nhân đạo hàm dọc đường phụ thuộc, cộng các đường ảnh hưởng khi gặp lại cùng một biến</div>



<!--
Nguồn: Hoc_may_Tong_hop_chuyen_sau_3_bai_giang.pdf, trang 79, 85.



**Đồ thị tính toán** chia biểu thức lớn thành các phép toán nhỏ. Lượt xuôi tính và lưu giá trị. Lượt ngược tính ảnh hưởng của đầu ra cuối lên từng biến, theo thứ tự ngược của sự phụ thuộc.

Với $J=3(a+bc)$, đặt $u=bc$, $v=a+u$. Cho $a=5,b=3,c=2$, lượt xuôi là:

$$u=6,\qquad v=11,\qquad J=33.$$

Khởi tạo gradient đầu ra bằng một và đi ngược:

$$\frac{\partial J}{\partial J}=1,\quad
\frac{\partial J}{\partial v}=3,\quad
\frac{\partial J}{\partial a}=3,\quad
\frac{\partial J}{\partial u}=3.$$

$$\frac{\partial J}{\partial b}=\frac{\partial J}{\partial u}c=6,\qquad
\frac{\partial J}{\partial c}=\frac{\partial J}{\partial u}b=9.$$

### Một biến đi qua nhiều nhánh thì phải cộng

Xét $J=x^2+3x$. Biến đầu vào ảnh hưởng qua hai nhánh: nhánh bình phương và nhánh nhân ba.

$$\frac{dJ}{dx}=\underbrace{2x}_{\text{nhánh bình phương}}+
\underbrace{3}_{\text{nhánh nhân ba}}.$$

Tại $x=2$, ta có $J=10$ và gradient bằng bảy. Nếu chỉ giữ gradient của một nhánh, kết quả sẽ sai.

| Phép cục bộ | Gradient truyền về hai đầu vào |
|---|---|
| $u=a+b$ | Cùng nhận gradient phía sau |
| $u=a-b$ | Nhánh $a$ giữ dấu, nhánh $b$ đổi dấu |
| $u=ab$ | Nhánh $a$ nhân với $b$, nhánh $b$ nhân với $a$ |

**Backprop tính gradient. Gradient descent dùng gradient để cập nhật tham số.** Đây là hai thao tác khác nhau.

Panel B060 • Bản render nguyên trang từ [B], trang PDF 60. Nội dung trong panel là bản gốc.

### Cách đọc và giải thích

Một đầu vào x bằng hai đi vào cả bình phương và nhân ba. Hai nhánh tạo giá trị bốn và sáu, cộng thành mười. Lượt ngược qua phép cộng đưa một gradient tới mỗi nhánh, sau đó hai đóng góp bốn và ba được cộng tại x. [DIỄN GIẢI] Cộng gradient tại nút dùng chung là hệ quả tổng quát của đạo hàm hàm nhiều biến, không phải ngoại lệ của ví dụ.

**Tự kiểm tra (áp dụng cho các panel trên):** Nếu một chương trình ghi đè gradient nhánh đầu bằng nhánh sau thì sai ở đâu?

**Đáp án và ý nghĩa:** Nó làm mất một đường ảnh hưởng. Đạo hàm đúng là tổng bảy, không chỉ ba hoặc bốn.
-->


---

<div class="track"><span>07 – Lan truyền ngược và tối ưu mạng</span><span>ML tổng hợp</span></div>

# Backprop loss bình phương



$$
w=[3,1]^\top,\quad\phi(x)=[1,2]^\top,\quad y=2
$$


<div class="step" v-click><b>01</b><span>Dự đoán = 5, phần dư = 3, loss = 9</span></div>

<div class="step" v-click><b>02</b><span>Gradient = 2 × 3 × (1,2) = (6,12)</span></div>

<div class="step" v-click><b>03</b><span>Với η = 0,05: trọng số mới = (2,7, 0,4)</span></div>


<div class="answer" v-click>Dự đoán mới = <b>3,5</b>, loss mới = <b>2,25</b></div>



<!--
Nguồn: Hoc_may_Tong_hop_chuyen_sau_3_bai_giang.pdf, trang 80, 86.



Giữ ví dụ gốc của [C]: $w=[3,1]^\top$, $\phi(x)=[1,2]^\top$, nhãn $y=2$. Đồ thị là:

$$w,\phi(x)\ \longrightarrow\ s=w^\top\phi(x)
\ \longrightarrow\ r=s-y\ \longrightarrow\ \ell=r^2.$$

### Lượt xuôi

$$s=3\cdot1+1\cdot2=5,\qquad r=5-2=3,\qquad\ell=9.$$

Ta cần lưu phần dư bằng ba và vector đặc trưng để tái sử dụng trong lượt ngược.

### Lượt ngược

$$\frac{\partial\ell}{\partial r}=2r=6,\qquad
\frac{\partial r}{\partial s}=1,\qquad
\nabla_ws=\phi(x)=\begin{bmatrix}1\\2\end{bmatrix}.$$

$$\nabla_w\ell=6\cdot1\cdot\begin{bmatrix}1\\2\end{bmatrix}
=\begin{bmatrix}6\\12\end{bmatrix}.$$

### Cập nhật với tốc độ học bằng 0,05

$$w_{\rm new}=\begin{bmatrix}3\\1\end{bmatrix}
-0.05\begin{bmatrix}6\\12\end{bmatrix}
=\begin{bmatrix}2.7\\0.4\end{bmatrix}.$$

$$\widehat y_{\rm new}=2.7+0.4(2)=3.5,\qquad
\ell_{\rm new}=(3.5-2)^2=2.25.$$

Loss giảm từ chín xuống còn $2.25$. Trọng số thứ hai thay đổi nhiều hơn vì đặc trưng tương ứng bằng hai, làm ảnh hưởng cục bộ của nó lên score lớn gấp đôi.

**Phân biệt:** đây là loss của một mẫu. Nếu có nhiều mẫu, ta lấy trung bình các gradient theo đúng định nghĩa hàm mục tiêu, không tự bỏ hệ số số mẫu.

Panel C051 • Bản render nguyên trang từ [C], trang PDF 51. Nội dung trong panel là bản gốc.

Panel C055 • Bản render nguyên trang từ [C], trang PDF 55. Nội dung trong panel là bản gốc.

### Cách đọc và giải thích

C051 chia dự đoán thành tích vô hướng, phần dư và bình phương. C055 giữ ví dụ trọng số (3;1), feature (1;2), nhãn hai. Lượt xuôi được dự đoán năm và loss chín, gradient là (6;12). Tốc độ học 0,05 cho trọng số (2,7;0,4), dự đoán 3,5 và loss 2,25. Phần lý thuyết đã viết từng phép biến đổi bằng LaTeX.

**Tự kiểm tra (áp dụng cho các panel trên):** Gradient của phần dư đối với score tại phép trừ là bao nhiêu, và vì sao?

**Đáp án và ý nghĩa:** Bằng một vì phần dư bằng score trừ nhãn, coi nhãn là hằng khi đạo hàm theo tham số mô hình.
-->


---

<div class="track"><span>07 – Lan truyền ngược và tối ưu mạng</span><span>ML tổng hợp</span></div>

# Mạng hai lớp: gradient đầu ra



$$
p=0.880797,\quad y=1,\quad a^{[1]}=[3,0]^\top
$$



$$
dZ^{[2]}=p-y\approx-0.119203
$$



$$
dW^{[2]}=dZ^{[2]}(a^{[1]})^\top\approx[-0.357609,0]
$$



$$
db^{[2]}\approx-0.119203
$$



<div class="note">Công thức p − y áp dụng cho sigmoid kết hợp BCE</div>



<!--
Nguồn: Hoc_may_Tong_hop_chuyen_sau_3_bai_giang.pdf, trang 81, 88.



Ta đã có $y=1$, $a^{[1]}=[3,0]^\top$, $z^{[2]}=2$ và $p=\widehat y\approx0.880797$. Ký hiệu $dZ$ dưới đây là gradient theo giá trị trước activation.

### Bước 1. Đi qua BCE và sigmoid

$$\frac{\partial\ell}{\partial p}=-\frac1p\approx-1.135335,\qquad
\frac{\partial p}{\partial z^{[2]}}=p(1-p)\approx0.104994.$$

$$dZ^{[2]}=\frac{\partial\ell}{\partial z^{[2]}}
=\frac{\partial\ell}{\partial p}\frac{\partial p}{\partial z^{[2]}}
=p-y\approx-0.119203.$$

Công thức gọn $p-y$ đúng với **sigmoid kết hợp binary cross-entropy**. Không áp dụng máy móc cho mọi loss và mọi activation.

### Bước 2. Gradient của trọng số và bias đầu ra

Vì $z^{[2]}=W^{[2]}a^{[1]}+b^{[2]}$:

$$dW^{[2]}=dZ^{[2]}(a^{[1]})^\top
\approx\begin{bmatrix}-0.357609&0\end{bmatrix}.$$

$$db^{[2]}=dZ^{[2]}\approx-0.119203.$$

Trọng số nối từ nút ẩn thứ hai có gradient bằng không vì đầu vào của nó bằng không trong mẫu này.

### Bước 3. Gradient quay về đầu ra lớp ẩn

$$dA^{[1]}=(W^{[2]})^\top dZ^{[2]}
=\begin{bmatrix}1\\-1\end{bmatrix}(-0.119203)
=\begin{bmatrix}-0.119203\\+0.119203\end{bmatrix}.$$

Một nhánh giữ dấu, nhánh kia đảo dấu vì trọng số nối ra là âm một. Gradient đo tác động lên loss, không phải nhãn dự đoán của từng nút ẩn.

Panel B065 • Bản render nguyên trang từ [B], trang PDF 65. Nội dung trong panel là bản gốc.

Panel B066 • Bản render nguyên trang từ [B], trang PDF 66. Nội dung trong panel là bản gốc.

### Cách đọc và giải thích

B065 nhân gradient logit khoảng −0,1192 với các đầu vào ẩn ba và không, cho gradient trọng số đầu ra (−0,3576;0). B066 truyền gradient về các nút ẩn qua trọng số một và âm một, nên hai đóng góp trái dấu. [DIỄN GIẢI] Đảo dấu do trọng số âm là bình thường, gradient không có nghĩa là xác suất hoặc nhãn.

**Tự kiểm tra (áp dụng cho các panel trên):** Vì sao trọng số đầu ra nối với nút ẩn thứ hai có gradient không ở mẫu này?

**Đáp án và ý nghĩa:** Đầu vào đi qua trọng số đó bằng không. Nó vẫn có thể được cập nhật ở một mẫu khác nếu activation tương ứng khác không.
-->


---

<div class="track"><span>07 – Lan truyền ngược và tối ưu mạng</span><span>ML tổng hợp</span></div>

# Mạng hai lớp: gradient lớp ẩn



$$
dA^{[1]}=(W^{[2]})^\top dZ^{[2]}\approx[-0.119203,+0.119203]^\top
$$



$$
dZ^{[1]}=dA^{[1]}\odot\operatorname{ReLU}^\prime(z^{[1]})\approx[-0.119203,0]^\top
$$



$$
dW^{[1]}\approx\begin{bmatrix}-0.119203&-0.238406\\0&0\end{bmatrix}
$$



<div class="note">Nhánh thứ hai bị chặn vì tiền kích hoạt bằng −1</div>



<!--
Nguồn: Hoc_may_Tong_hop_chuyen_sau_3_bai_giang.pdf, trang 82, 89.



### Bước 4. Đi ngược qua ReLU

$$dZ^{[1]}=dA^{[1]}\odot\operatorname{ReLU}'(z^{[1]})
=\begin{bmatrix}-0.119203\\+0.119203\end{bmatrix}
\odot\begin{bmatrix}1\\0\end{bmatrix}
=\begin{bmatrix}-0.119203\\0\end{bmatrix}.$$

Nút thứ hai có giá trị trước ReLU là âm một, nên gradient bị chặn với mẫu này.

$$dW^{[1]}=dZ^{[1]}x^\top
\approx\begin{bmatrix}-0.119203&-0.238406\\0&0\end{bmatrix},\quad
db^{[1]}\approx\begin{bmatrix}-0.119203\\0\end{bmatrix}.$$

### Bước 5. Cập nhật đồng thời, tốc độ học bằng 0,1

$$W^{[1]}_{\rm new}\approx\begin{bmatrix}1.011920&1.023841\\-1&1\end{bmatrix},\quad
b^{[1]}_{\rm new}\approx\begin{bmatrix}0.011920\\-2\end{bmatrix}.$$

$$W^{[2]}_{\rm new}\approx[1.035761,-1],\qquad
b^{[2]}_{\rm new}\approx-0.988080.$$

**Mọi gradient phải được tính từ cùng bộ tham số cũ**, rồi mới cập nhật. Nếu đổi một lớp trước khi tính gradient các lớp khác, ta không còn thực hiện đúng bước gradient descent đã suy ra.

### Kiểm tra bằng forward lần nữa

$$z^{[1]}_{\rm new}\approx[3.071522,-1]^\top,\qquad
z^{[2]}_{\rm new}\approx2.193282.$$

$$\widehat y_{\rm new}\approx0.899645,\qquad
\ell_{\rm new}\approx0.105755.$$

Xác suất lớp đúng tăng và loss giảm. Bias của nút thứ hai vẫn là âm hai vì gradient của nó bằng không. Điều này sửa chỗ không nhất quán giữa các bảng tham số trong slide.

Panel B067 • Bản render nguyên trang từ [B], trang PDF 67. Nội dung trong panel là bản gốc.

Panel B068 • Bản render nguyên trang từ [B], trang PDF 68. Nội dung trong panel là bản gốc.

### Cách đọc và giải thích

B067 nhân từng phần tử gradient activation với đạo hàm ReLU: nhánh có tiền kích hoạt âm một bị chặn. B068 lấy tích ngoài giữa gradient trước activation và vector đầu vào chuyển vị, tạo ma trận 2 × 2. Mỗi hàng ứng với một nút nhận, mỗi cột ứng với một đầu vào. Không nhầm phép nhân từng phần tử với nhân ma trận.

**Tự kiểm tra (áp dụng cho các panel trên):** Phần tử hàng một cột hai của gradient trọng số vì sao khoảng −0,2384?

**Đáp án và ý nghĩa:** Gradient tại nút thứ nhất khoảng −0,1192, đầu vào thứ hai bằng hai. Tích của chúng cho −0,2384.
-->


---

<div class="track"><span>07 – Lan truyền ngược và tối ưu mạng</span><span>ML tổng hợp</span></div>

# Cập nhật và forward lại



$$
W^{[1]}_{\rm new}\approx\begin{bmatrix}1.011920&1.023841\\-1&1\end{bmatrix},\quad b^{[1]}_{\rm new}\approx\begin{bmatrix}0.011920\\-2\end{bmatrix}
$$



$$
W^{[2]}_{\rm new}\approx[1.035761,-1],\quad b^{[2]}_{\rm new}\approx-0.988080
$$



<div class="answer" v-click>Sau một bước η = 0,1:<br/>Xác suất ≈ <b>0,8996</b>, BCE ≈ <b>0,1058</b></div>



<div class="note">Tính mọi gradient từ cùng bộ tham số cũ rồi mới cập nhật đồng thời</div>



<!--
Nguồn: Hoc_may_Tong_hop_chuyen_sau_3_bai_giang.pdf, trang 82, 87, 90.



### Bước 4. Đi ngược qua ReLU

$$dZ^{[1]}=dA^{[1]}\odot\operatorname{ReLU}'(z^{[1]})
=\begin{bmatrix}-0.119203\\+0.119203\end{bmatrix}
\odot\begin{bmatrix}1\\0\end{bmatrix}
=\begin{bmatrix}-0.119203\\0\end{bmatrix}.$$

Nút thứ hai có giá trị trước ReLU là âm một, nên gradient bị chặn với mẫu này.

$$dW^{[1]}=dZ^{[1]}x^\top
\approx\begin{bmatrix}-0.119203&-0.238406\\0&0\end{bmatrix},\quad
db^{[1]}\approx\begin{bmatrix}-0.119203\\0\end{bmatrix}.$$

### Bước 5. Cập nhật đồng thời, tốc độ học bằng 0,1

$$W^{[1]}_{\rm new}\approx\begin{bmatrix}1.011920&1.023841\\-1&1\end{bmatrix},\quad
b^{[1]}_{\rm new}\approx\begin{bmatrix}0.011920\\-2\end{bmatrix}.$$

$$W^{[2]}_{\rm new}\approx[1.035761,-1],\qquad
b^{[2]}_{\rm new}\approx-0.988080.$$

**Mọi gradient phải được tính từ cùng bộ tham số cũ**, rồi mới cập nhật. Nếu đổi một lớp trước khi tính gradient các lớp khác, ta không còn thực hiện đúng bước gradient descent đã suy ra.

### Kiểm tra bằng forward lần nữa

$$z^{[1]}_{\rm new}\approx[3.071522,-1]^\top,\qquad
z^{[2]}_{\rm new}\approx2.193282.$$

$$\widehat y_{\rm new}\approx0.899645,\qquad
\ell_{\rm new}\approx0.105755.$$

Xác suất lớp đúng tăng và loss giảm. Bias của nút thứ hai vẫn là âm hai vì gradient của nó bằng không. Điều này sửa chỗ không nhất quán giữa các bảng tham số trong slide.

Panel B062 • Bản render nguyên trang từ [B], trang PDF 62. Nội dung trong panel là bản gốc.

### Cách đọc và giải thích

Panel giữ nguyên dữ kiện, các trạng thái và sơ đồ của nguồn. Tuy nhiên, bias lớp ẩn trong panel được ghi bằng vector không, trong khi giá trị trước ReLU vẫn là (3;−1). Với ma trận và đầu vào đang dùng, kết quả đó chỉ phù hợp bias (0;−2), như thiết lập ban đầu B040. Bản tổng hợp giữ công khai cả bản gốc và bộ được chọn để tiếp tục tính.

Hiệu chỉnh dùng xuyên suốt lời giải: bias (0;−2). Không gán bộ đã hiệu chỉnh thành nguyên văn của panel B062.

**Tự kiểm tra (áp dụng cho các panel trên):** Nếu dùng đúng bias vector không ở panel này thì nút ẩn thứ hai và logit đầu ra là bao nhiêu?

**Đáp án và ý nghĩa:** Nút thứ hai có giá trị trước và sau ReLU bằng một. Với trọng số đầu ra (1;−1) và bias âm một, logit bằng một, không phải hai.

Panel B069 • Bản render nguyên trang từ [B], trang PDF 69. Nội dung trong panel là bản gốc.

Panel B070 • Bản render nguyên trang từ [B], trang PDF 70. Nội dung trong panel là bản gốc.

### Cách đọc và giải thích

B069 giữ bảng cập nhật của slide. B070 cho kết quả forward sau bước học: xác suất gần 0,8996 và BCE gần 0,1058. Cần tính mọi gradient với bộ tham số trước cập nhật, rồi đổi đồng thời. [DIỄN GIẢI] Loss giảm ở mẫu này chứng minh bước tính có tác dụng với mẫu đang xét, chưa chứng minh train cả tập hoặc test đều tốt hơn.

**Tự kiểm tra (áp dụng cho các panel trên):** Bias thứ hai của lớp ẩn phải giữ giá trị nào khi dùng bộ tham số nhất quán?

**Đáp án và ý nghĩa:** Nó giữ âm hai vì gradient bằng không. Bảng gốc B069 ghi không, nhưng lời giải dùng thiết lập từ B040 để khớp mọi giá trị forward.
-->


---

<div class="track"><span>07 – Lan truyền ngược và tối ưu mạng</span><span>ML tổng hợp</span></div>

# Cấu hình loss khác, gradient khác



$$
h=\sigma(V\phi(x)),\quad s=w^\top h,\quad L=(s-y)^2
$$



$$
\nabla_wL=2(s-y)h
$$



$$
\nabla_VL=[2(s-y)w\odot h\odot(1-h)]\phi(x)^\top
$$



<div class="note">Ví dụ này dùng sigmoid ẩn, đầu ra tuyến tính và loss bình phương. Giữ đúng cặp activation–loss</div>



<!--
Nguồn: Hoc_may_Tong_hop_chuyen_sau_3_bai_giang.pdf, trang 91, 92.



Panel C056 • Bản render nguyên trang từ [C], trang PDF 56. Nội dung trong panel là bản gốc.

### Cách đọc và giải thích

Đọc hàng trên từ feature tới sigmoid ẩn, score tuyến tính và loss bình phương. Hàng dưới đi từ loss về trọng số đầu ra rồi ma trận lớp ẩn. Đây là cấu hình khác ví dụ ReLU–sigmoid–BCE của B. Khi đổi loss và activation, các đạo hàm cục bộ thay đổi, dù nguyên tắc chuỗi không đổi.

**Tự kiểm tra (áp dụng cho các panel trên):** Có dùng ngay gradient đầu ra bằng xác suất trừ nhãn của ví dụ BCE cho cấu hình này được không?

**Đáp án và ý nghĩa:** Không. Ở đây score đầu ra tuyến tính và loss bình phương cho đạo hàm theo score bằng hai lần phần dư.

Giữ mô hình trong hình: $v=\phi(x)\in\mathbb R^d$, lớp ẩn có $k$ nút, $V\in\mathbb R^{k\times d}$, $w\in\mathbb R^k$. Nguồn viết mô hình không có bias tường minh:

$$z=Vv,\qquad h=\sigma(z),\qquad s=w^\top h,\qquad L=(s-y)^2.$$

### Đầu ra

$$\delta_s=\frac{\partial L}{\partial s}=2(s-y),\qquad
\nabla_wL=\delta_sh.$$

Vector hidden được coi là đầu vào của phép tích vô hướng ở bước này. Gradient theo $w$ có cùng kích thước $k$.

### Lớp ẩn

$$\delta_h=\delta_sw,\qquad
\delta_z=\delta_h\odot h\odot(1-h).$$

Thành phần cuối là đạo hàm sigmoid. Sau đó:

$$\nabla_VL=\delta_zv^\top
=\big[2(s-y)w\odot h\odot(1-h)\big]\phi(x)^\top.$$

Tích ngoài tạo ma trận $k\times d$, đúng kích thước của $V$. Nếu dùng minibatch thì lấy trung bình gradient các mẫu theo đúng hàm mục tiêu.

**So sánh với ví dụ [B]:** [C] có sigmoid ở lớp ẩn, đầu ra tuyến tính và loss bình phương. [B] có ReLU ở lớp ẩn, sigmoid đầu ra và BCE. Công thức $p-y$ là kết quả của một cặp activation–loss cụ thể, không phải mọi mạng.

**[BỔ SUNG]** Nếu thêm bias tường minh, gradient bias tại lớp bằng tổng gradient trước activation theo các mẫu. Nguồn đang xét không viết thành phần bias này.
-->


---

<div class="track"><span>07 – Lan truyền ngược và tối ưu mạng</span><span>ML tổng hợp</span></div>

# Mini-batch và một epoch



$$
dW^{[l]}=\frac1m dZ^{[l]}(A^{[l-1]})^\top,\qquad db^{[l]}=\frac1m\sum_i dZ^{[l]}_{:,i}
$$



$$
dZ^{[l-1]}=(W^{[l]})^\top dZ^{[l]}\odot g^{\prime[l-1]}(Z^{[l-1]})
$$


- Batch GD: toàn bộ train mỗi bước. SGD cơ bản: một mẫu
- Mini-batch: một nhóm mẫu mỗi bước
- Epoch: một lượt qua toàn bộ train, có thể gồm nhiều cập nhật


<!--
Nguồn: Hoc_may_Tong_hop_chuyen_sau_3_bai_giang.pdf, trang 83.



Với $m$ mẫu đặt theo cột, $A^{[0]}=X$. Lượt xuôi tính:

$$Z^{[l]}=W^{[l]}A^{[l-1]}+b^{[l]},\qquad
A^{[l]}=g^{[l]}(Z^{[l]}).$$

Bias được cộng vào từng cột. Với đầu ra sigmoid và BCE, dùng quy ước $dZ^{[L]}=A^{[L]}-Y$ chưa chia số mẫu. Hệ số trung bình được đưa vào gradient tham số:

$$dW^{[l]}=\frac1m dZ^{[l]}(A^{[l-1]})^\top,\qquad
db^{[l]}=\frac1m\sum_{i=1}^m dZ^{[l]}_{:,i}.$$

$$dZ^{[l-1]}=(W^{[l]})^\top dZ^{[l]}
\odot(g^{[l-1]})'(Z^{[l-1]}),\qquad l\ge2.$$

### Một vòng học

1. Lấy một mini-batch và tính forward.
2. Tính loss, lưu các giá trị trung gian cần thiết.
3. Backward để có gradient của mọi tham số.
4. Cập nhật tham số, rồi chuyển sang batch tiếp theo.

**Epoch** là một lượt đi qua toàn bộ tập train. Một epoch có thể gồm nhiều bước cập nhật. Batch gradient descent dùng toàn bộ train mỗi bước, SGD dạng cơ bản dùng một mẫu, mini-batch dùng một nhóm mẫu.

### Vì sao gradient đúng chưa đủ?

Mạng nơ-ron thường có mục tiêu **không lồi**. Gradient đúng không bảo đảm tìm được nghiệm tối ưu toàn cục. Khởi tạo ngẫu nhiên giúp phá đối xứng giữa các nút. Thang khởi tạo, activation và tốc độ học ảnh hưởng đến độ ổn định.

**Vanishing gradient** làm lớp xa loss nhận tín hiệu quá nhỏ. **Exploding gradient** làm độ lớn gradient tăng mạnh. Cần theo dõi loss và gradient. Không tự suy ra mô hình tổng quát hóa tốt chỉ vì train loss đã nhỏ.
-->


---

<div class="track"><span>07 – Lan truyền ngược và tối ưu mạng</span><span>ML tổng hợp</span></div>

# Khởi tạo và giới hạn tối ưu


| Vấn đề | Điều cần nhớ |
|---|---|
| Khởi tạo giống nhau | Nút có thể giữ đối xứng, khó học khác nhau |
| Gradient nhỏ dần | Lớp xa loss khó nhận tín hiệu |
| Gradient bùng nổ | Cập nhật có thể không ổn định |
| Mục tiêu không lồi | Gradient đúng chưa bảo đảm nghiệm toàn cục |


<div class="note">Backprop tính gradient. Optimizer dùng gradient. Generalization cần đánh giá riêng</div>



<!--
Nguồn: Hoc_may_Tong_hop_chuyen_sau_3_bai_giang.pdf, trang 83, 93, 94.



Với $m$ mẫu đặt theo cột, $A^{[0]}=X$. Lượt xuôi tính:

$$Z^{[l]}=W^{[l]}A^{[l-1]}+b^{[l]},\qquad
A^{[l]}=g^{[l]}(Z^{[l]}).$$

Bias được cộng vào từng cột. Với đầu ra sigmoid và BCE, dùng quy ước $dZ^{[L]}=A^{[L]}-Y$ chưa chia số mẫu. Hệ số trung bình được đưa vào gradient tham số:

$$dW^{[l]}=\frac1m dZ^{[l]}(A^{[l-1]})^\top,\qquad
db^{[l]}=\frac1m\sum_{i=1}^m dZ^{[l]}_{:,i}.$$

$$dZ^{[l-1]}=(W^{[l]})^\top dZ^{[l]}
\odot(g^{[l-1]})'(Z^{[l-1]}),\qquad l\ge2.$$

### Một vòng học

1. Lấy một mini-batch và tính forward.
2. Tính loss, lưu các giá trị trung gian cần thiết.
3. Backward để có gradient của mọi tham số.
4. Cập nhật tham số, rồi chuyển sang batch tiếp theo.

**Epoch** là một lượt đi qua toàn bộ tập train. Một epoch có thể gồm nhiều bước cập nhật. Batch gradient descent dùng toàn bộ train mỗi bước, SGD dạng cơ bản dùng một mẫu, mini-batch dùng một nhóm mẫu.

### Vì sao gradient đúng chưa đủ?

Mạng nơ-ron thường có mục tiêu **không lồi**. Gradient đúng không bảo đảm tìm được nghiệm tối ưu toàn cục. Khởi tạo ngẫu nhiên giúp phá đối xứng giữa các nút. Thang khởi tạo, activation và tốc độ học ảnh hưởng đến độ ổn định.

**Vanishing gradient** làm lớp xa loss nhận tín hiệu quá nhỏ. **Exploding gradient** làm độ lớn gradient tăng mạnh. Cần theo dõi loss và gradient. Không tự suy ra mô hình tổng quát hóa tốt chỉ vì train loss đã nhỏ.

Panel B072 • Bản render nguyên trang từ [B], trang PDF 72. Nội dung trong panel là bản gốc.

Panel C057 • Bản render nguyên trang từ [C], trang PDF 57. Nội dung trong panel là bản gốc.

### Cách đọc và giải thích

B072 tách forward, loss, backward và update trong vòng học. C057 đối chiếu tính gradient với việc tối ưu, và so sánh trường hợp lồi của mô hình tuyến tính feature cố định với mục tiêu thường không lồi của mạng. [DIỄN GIẢI] Gradient chính xác là điều kiện để thực hiện đúng bước học, không phải chứng nhận đã tới nghiệm tốt nhất hay đã tổng quát hóa tốt.

**Tự kiểm tra (áp dụng cho các panel trên):** Trong vòng học, giảm loss train và giảm lỗi test có phải cùng một mệnh đề?

**Đáp án và ý nghĩa:** Không. Mệnh đề đầu nói về dữ liệu dùng tối ưu. Mệnh đề sau cần đánh giá độc lập trên dữ liệu mới.

### Ghi nhớ theo vai trò học thuật

| Mức | Nội dung | Cần hiểu hoặc làm được |
|---|---|---|
| A | Quy tắc chuỗi | Nhân dọc đường phụ thuộc, cộng tại nhánh hợp. |
| A | Tính nhất quán | Dùng một bộ tham số cũ cho mọi gradient. |
| A | Cặp activation–loss | Gradient đầu ra phụ thuộc cấu hình. |
| B | Batch và epoch | Một lượt qua dữ liệu có thể có nhiều cập nhật. |
| B | Không lồi | Gradient đúng chưa bảo đảm nghiệm toàn cục. |

### So sánh và điểm dễ nhầm

| Cấu hình | Gradient đầu ra |
|---|---|
| Tuyến tính + bình phương | Hai lần phần dư |
| Sigmoid + BCE | Xác suất trừ nhãn 0/1 |

### Liên hệ với chương khác

Chương 8–11 thay các khối tính toán, vẫn dùng cùng nguyên tắc đạo hàm. Chương 12 kiểm tra điều tối ưu không bảo đảm: tổng quát hóa.

### Đối chiếu hình và ví dụ của chương

| Nguồn / mã panel | Nội dung | Vị trí | Trạng thái |
|---|---|---|---|
| B050, B056 | Đồ thị vô hướng: lượt xuôi và lượt ngược | Trang 84 | Đã giữ và giải thích |
| B060 | Biến dùng hai lần phải nhận tổng gradient | Trang 85 | Đã giữ và giải thích |
| C051, C055 | Đồ thị loss bình phương và kiểm tra cập nhật | Trang 86 | Đã giữ và giải thích |
| B062 | Giữ cả sơ đồ gốc có tham số chưa nhất quán | Trang 87 | Đã giữ và giải thích |
| B065, B066 | Gradient qua đầu ra và quay về lớp ẩn | Trang 88 | Đã giữ và giải thích |
| B067, B068 | ReLU chặn một nhánh và gradient ma trận | Trang 89 | Đã giữ và giải thích |
| B069, B070 | Cập nhật và tính lại để kiểm chứng | Trang 90 | Đã giữ và giải thích |
| C056 | Một mạng hai lớp khác: sigmoid ẩn, đầu ra tuyến tính | Trang 91 | Đã giữ và giải thích |
| B072, C057 | Vòng huấn luyện không bảo đảm nghiệm toàn cục | Trang 93 | Đã giữ và giải thích |
-->


---

<div class="track"><span>07 – Lan truyền ngược và tối ưu mạng</span><span>ML tổng hợp</span></div>

# Tự luyện – Bias trong ví dụ mạng phải dùng bộ nào?



<div class="answer" v-click>Dùng b¹ = <b>(0, −2)</b> để giữ z¹ = (3, −1). Một số bảng nguồn ghi vector không nhưng không khớp forward. PDF đã nêu hiệu chỉnh.</div>



<div class="note">Thử trả lời trước khi bấm Tiếp</div>



<!--
Nguồn: Hoc_may_Tong_hop_chuyen_sau_3_bai_giang.pdf, trang 71, 87, 90, 158.



Cho một mẫu có $x=[1,2]^\top$, nhãn thật $y=1$. Lớp ẩn dùng ReLU, đầu ra dùng sigmoid.

$$W^{[1]}=\begin{bmatrix}1&1\\-1&1\end{bmatrix},\quad
b^{[1]}=\begin{bmatrix}0\\-2\end{bmatrix},\quad
W^{[2]}=\begin{bmatrix}1&-1\end{bmatrix},\quad b^{[2]}=-1.$$

### Bước 1. Tính lớp ẩn

$$z^{[1]}=\begin{bmatrix}1\cdot1+1\cdot2+0\\-1\cdot1+1\cdot2-2\end{bmatrix}
=\begin{bmatrix}3\\-1\end{bmatrix}.$$

$$a^{[1]}=\operatorname{ReLU}(z^{[1]})=\begin{bmatrix}3\\0\end{bmatrix}.$$

Nút thứ nhất hoạt động, nút thứ hai bị đưa về không vì giá trị trước activation âm.

### Bước 2. Tính đầu ra và loss

$$z^{[2]}=[1,-1]\begin{bmatrix}3\\0\end{bmatrix}-1=2.$$

$$\widehat y=\sigma(2)\approx0.880797,\qquad
\ell=-\log\widehat y\approx0.126928.$$

Với ngưỡng xác suất một phần hai, mô hình dự đoán lớp một. Tuy dự đoán đúng, BCE vẫn dương vì xác suất lớp đúng chưa bằng một.

Slide ở phần sau ghi bias lớp ẩn là vector không, nhưng vẫn giữ kết quả nút thứ hai bằng âm một. Để mọi phép tính khớp nhau, bản tổng hợp dùng bias [0, −2] như phần thiết lập ban đầu. Ảnh hưởng của hiệu chỉnh này được giữ xuyên suốt backprop và cập nhật.

Panel B062 • Bản render nguyên trang từ [B], trang PDF 62. Nội dung trong panel là bản gốc.

### Cách đọc và giải thích

Panel giữ nguyên dữ kiện, các trạng thái và sơ đồ của nguồn. Tuy nhiên, bias lớp ẩn trong panel được ghi bằng vector không, trong khi giá trị trước ReLU vẫn là (3;−1). Với ma trận và đầu vào đang dùng, kết quả đó chỉ phù hợp bias (0;−2), như thiết lập ban đầu B040. Bản tổng hợp giữ công khai cả bản gốc và bộ được chọn để tiếp tục tính.

Hiệu chỉnh dùng xuyên suốt lời giải: bias (0;−2). Không gán bộ đã hiệu chỉnh thành nguyên văn của panel B062.

**Tự kiểm tra (áp dụng cho các panel trên):** Nếu dùng đúng bias vector không ở panel này thì nút ẩn thứ hai và logit đầu ra là bao nhiêu?

**Đáp án và ý nghĩa:** Nút thứ hai có giá trị trước và sau ReLU bằng một. Với trọng số đầu ra (1;−1) và bias âm một, logit bằng một, không phải hai.

Panel B069 • Bản render nguyên trang từ [B], trang PDF 69. Nội dung trong panel là bản gốc.

Panel B070 • Bản render nguyên trang từ [B], trang PDF 70. Nội dung trong panel là bản gốc.

### Cách đọc và giải thích

B069 giữ bảng cập nhật của slide. B070 cho kết quả forward sau bước học: xác suất gần 0,8996 và BCE gần 0,1058. Cần tính mọi gradient với bộ tham số trước cập nhật, rồi đổi đồng thời. [DIỄN GIẢI] Loss giảm ở mẫu này chứng minh bước tính có tác dụng với mẫu đang xét, chưa chứng minh train cả tập hoặc test đều tốt hơn.

**Tự kiểm tra (áp dụng cho các panel trên):** Bias thứ hai của lớp ẩn phải giữ giá trị nào khi dùng bộ tham số nhất quán?

**Đáp án và ý nghĩa:** Nó giữ âm hai vì gradient bằng không. Bảng gốc B069 ghi không, nhưng lời giải dùng thiết lập từ B040 để khớp mọi giá trị forward.

| Vị trí nguồn | Vấn đề | Cách trình bày trong bản tổng hợp |
|---|---|---|
| [A], trang 14 và 17 | Gọi đầu ra hồi quy/có cấu trúc là classifier | Dùng “bộ dự đoán”, phân biệt loại đầu ra |
| [A], trang 53–57 | Hình dung số đường theo số lớp, score gắn với khoảng cách | Viết ranh giới cặp lớp, khoảng cách chuẩn hóa theo chuẩn trọng số |
| [A], trang 65 | Không nhất quán quy ước ở score bằng không | Đếm lỗi bằng nhãn dự đoán, chốt quy tắc chọn lớp |
| [A], trang 70–71 | Cách nói SVM và dấu trong công thức đa lớp dễ gây nhầm | SVM có cả nhị phân và đa lớp, loss là phần dương của score sai trừ score đúng cộng biên |
| [B], trang 10 | ERM ghi gần 1,09 | Tính lại từ dữ liệu được $194/179\approx1.0838$ |
| [B], trang 24–25 | Tỷ lệ chữ cái 0,85 không khớp chuỗi nếu tính theo ký tự | Giữ phép tính minh họa, đồng thời nêu tỷ lệ $10/13$ với định nghĩa rõ |
| [B], trang 40 và 62–69 | Bias lớp ẩn không nhất quán giữa thiết lập và phần backprop | Dùng $b^{[1]}=[0,-2]^\top$ xuyên suốt, bảo toàn forward và backward |
| [C], trang 26 | Cách dịch recurrent dễ nhầm với regression | Giải thích là hồi tiếp theo thời gian |
| [C], trang 39 | Residual được mô tả như bảo đảm backprop | Diễn giải là hỗ trợ luồng gradient, không bảo đảm ổn định tuyệt đối |
| [C], trang 40 | Tên “Layer information”, thiếu scale và shift trong công thức rút gọn | Dùng Layer Normalization và công thức đầy đủ |
| [C], trang 43–44 | Sơ đồ minh họa BERT với 24 khối | Không suy rộng mọi BERT đều có 24 lớp |
| [C], trang 63 | Hạng sai số ước lượng gộp kết quả mô hình thực học | Ghi rõ có thể chứa ảnh hưởng của sai số tối ưu |

**Quy ước làm tròn:** giữ nhiều chữ số khi tính, chỉ làm tròn lúc trình bày. Các sai khác ở chữ số cuối không làm đổi ý nghĩa ví dụ. Hình gốc có thể giữ ký hiệu cũ, phần giải thích và công thức bên ngoài hình dùng quy ước đã thống nhất.
-->


---

<div class="track"><span>08 – Lập trình khả vi và CNN</span><span>ML tổng hợp</span></div>

# Lập trình khả vi và cấu trúc ảnh


Ảnh màu $540\times540\times3$ chứa **874.800 giá trị**

| Lớp | Số tham số trong ví dụ |
|---|---:|
| Dense tới 100 nút ẩn | 87.480.000 trọng số, chưa bias |
| Conv $3\times3$, 3 kênh vào, 16 kênh ra | 448, có bias |


<div class="note">Đây là so sánh cơ chế đếm tham số. Hai lớp không có chức năng hoàn toàn tương đương</div>



<!--
Nguồn: Hoc_may_Tong_hop_chuyen_sau_3_bai_giang.pdf, trang 96, 98.



**Lập trình khả vi (differentiable programming)** xây chương trình tính toán có các phép toán cho phép truyền gradient, rồi tối ưu các tham số bằng dữ liệu. Mạng truyền thẳng, CNN, RNN và Transformer có cấu trúc khác nhau nhưng cùng chia sẻ chu trình forward → loss → backward → update.

### Trải phẳng ảnh làm tăng tham số

Ảnh màu $540\times540$ với ba kênh có:

$$540\cdot540\cdot3=874\,800\ \text{giá trị}.$$

Nếu nối đầy đủ với 100 nút ẩn, chỉ riêng lớp đầu đã có $87\,480\,000$ trọng số, chưa kể bias. Trải phẳng không làm mất các pixel về mặt lưu trữ, nhưng kiến trúc dense không tự khai thác tính lân cận không gian và phải học lại mẫu tương tự ở nhiều vị trí.

### Hai ý tưởng của tích chập

**Kết nối cục bộ:** một đầu ra chỉ nhìn một vùng nhỏ của ảnh. **Chia sẻ trọng số:** cùng một bộ lọc trượt qua các vị trí. Nhờ vậy, bộ lọc phát hiện một kiểu cạnh có thể được dùng ở nhiều nơi.

Một lớp có bộ lọc $3\times3$, ba kênh vào và 16 kênh ra có $3\cdot3\cdot3\cdot16+16=448$ tham số, không phụ thuộc trực tiếp vào số vị trí ảnh. So sánh này minh họa cơ chế giảm tham số, không khẳng định hai lớp có chức năng tương đương hoàn toàn.

Panel C010 • Bản render nguyên trang từ [C], trang PDF 10. Nội dung trong panel là bản gốc.

Panel C013 • Bản render nguyên trang từ [C], trang PDF 13. Nội dung trong panel là bản gốc.

### Cách đọc và giải thích

C010 đặt một CNN cạnh BERT để giới thiệu nhiều kiểu chương trình khả vi. C013 giữ ảnh mèo/chó và phép đếm 540 × 540 × 3 = 874.800 giá trị. Kênh màu thứ ba giải thích hệ số ba. [DIỄN GIẢI] Trải phẳng không xóa các giá trị pixel, nhưng một lớp dense không tự áp đặt kết nối cục bộ hoặc chia sẻ bộ lọc như CNN.

**Tự kiểm tra (áp dụng cho các panel trên):** Vì sao không thể nói mỗi ảnh trong C013 chỉ có 540 × 540 phần tử mà vẫn khớp con số 874.800?

**Đáp án và ý nghĩa:** Con số trong slide dùng ảnh ba kênh. Ảnh một kênh có ít giá trị hơn, nên phải ghi rõ biểu diễn đang dùng.
-->


---

<div class="track"><span>08 – Lập trình khả vi và CNN</span><span>ML tổng hợp</span></div>

# CNN: cục bộ và chia sẻ trọng số


<figure><img src="/images/cnn.png" style="max-height:245px" alt="Các khối conv, ReLU, pooling và đầu phân loại, panel C015"/><figcaption>Các khối conv, ReLU, pooling và đầu phân loại, panel C015</figcaption></figure>

- **Cục bộ**: mỗi đầu ra nhìn một vùng nhỏ
- **Chia sẻ**: cùng bộ lọc trượt qua nhiều vị trí


<!--
Nguồn: Hoc_may_Tong_hop_chuyen_sau_3_bai_giang.pdf, trang 96, 99.



**Lập trình khả vi (differentiable programming)** xây chương trình tính toán có các phép toán cho phép truyền gradient, rồi tối ưu các tham số bằng dữ liệu. Mạng truyền thẳng, CNN, RNN và Transformer có cấu trúc khác nhau nhưng cùng chia sẻ chu trình forward → loss → backward → update.

### Trải phẳng ảnh làm tăng tham số

Ảnh màu $540\times540$ với ba kênh có:

$$540\cdot540\cdot3=874\,800\ \text{giá trị}.$$

Nếu nối đầy đủ với 100 nút ẩn, chỉ riêng lớp đầu đã có $87\,480\,000$ trọng số, chưa kể bias. Trải phẳng không làm mất các pixel về mặt lưu trữ, nhưng kiến trúc dense không tự khai thác tính lân cận không gian và phải học lại mẫu tương tự ở nhiều vị trí.

### Hai ý tưởng của tích chập

**Kết nối cục bộ:** một đầu ra chỉ nhìn một vùng nhỏ của ảnh. **Chia sẻ trọng số:** cùng một bộ lọc trượt qua các vị trí. Nhờ vậy, bộ lọc phát hiện một kiểu cạnh có thể được dùng ở nhiều nơi.

Một lớp có bộ lọc $3\times3$, ba kênh vào và 16 kênh ra có $3\cdot3\cdot3\cdot16+16=448$ tham số, không phụ thuộc trực tiếp vào số vị trí ảnh. So sánh này minh họa cơ chế giảm tham số, không khẳng định hai lớp có chức năng tương đương hoàn toàn.

Panel C015 • Bản render nguyên trang từ [C], trang PDF 15. Nội dung trong panel là bản gốc.

Panel C016 • Bản render nguyên trang từ [C], trang PDF 16. Nội dung trong panel là bản gốc.

### Cách đọc và giải thích

C015 đọc từ ảnh qua các khối conv/ReLU/pool tới đầu phân loại. Nhiều bản đồ đặc trưng là nhiều kênh, không phải nhiều ảnh độc lập để gán nhãn. C016 minh họa phản hồi lọc làm nổi bật cạnh/họa tiết. C018 giữ ma trận đầu vào, bộ lọc toàn một, kết quả 2 × 2 và pooling. Các phép nhân cộng được trình bày bằng LaTeX trong phần tính tay. Panel còn lại của nhóm được phóng riêng ở trang kế tiếp.

**Tự kiểm tra (áp dụng cho các panel trên):** Bộ lọc 2 × 2, stride một, không padding trên ảnh 3 × 3 tạo mấy vị trí, và pooling cuối giữ gì?

**Đáp án và ý nghĩa:** Có bốn vị trí, tạo các giá trị 4,2,2,1. Pooling cửa sổ 2 × 2 giữ giá trị lớn nhất là bốn.
-->


---

<div class="track"><span>08 – Lập trình khả vi và CNN</span><span>ML tổng hợp</span></div>

# Tích chập, ReLU và max pooling



$$
X=\begin{bmatrix}1&1&0\\1&1&0\\0&0&0\end{bmatrix},\quad K=\begin{bmatrix}1&1\\1&1\end{bmatrix}
$$



$$
Z=\begin{bmatrix}4&2\\2&1\end{bmatrix},\quad\operatorname{ReLU}(Z)=Z,\quad\operatorname{MaxPool}_{2\times2}(Z)=[4]
$$



<div class="note">Stride 1, không padding, không bias. Mỗi ô đầu ra là tổng nhân từng phần tử trong cửa sổ</div>



<!--
Nguồn: Hoc_may_Tong_hop_chuyen_sau_3_bai_giang.pdf, trang 97, 100.



Giữ nguyên ảnh và bộ lọc của slide. Dùng stride bằng một, không padding, không bias:

$$X=\begin{bmatrix}1&1&0\\1&1&0\\0&0&0\end{bmatrix},\qquad
K=\begin{bmatrix}1&1\\1&1\end{bmatrix}.$$

Tại góc trên trái, nhân từng phần tử rồi cộng được $1+1+1+1=4$. Trượt sang phải được $1+0+1+0=2$. Hai vị trí ở hàng dưới lần lượt được hai và một.

$$Z=\begin{bmatrix}4&2\\2&1\end{bmatrix},\quad
A=\operatorname{ReLU}(Z)=Z,\quad
\operatorname{MaxPool}_{2\times2}(A)=[4].$$

ReLU không đổi kết quả vì mọi phần tử đều dương. Max pooling giữ giá trị lớn nhất trong cửa sổ, làm đầu ra không gian nhỏ hơn.

### Stride, padding và kích thước

Với kích thước đầu vào $H$, bộ lọc $k$, padding $p$ và stride $s$ theo một chiều:

$$H_{\rm out}=\left\lfloor\frac{H+2p-k}{s}\right\rfloor+1.$$

Stride là bước trượt, padding là phần bổ sung quanh biên. Với ví dụ trên, đầu ra có kích thước hai. Các bộ lọc trong CNN được học từ dữ liệu, không nhất thiết toàn số một.

**Chính xác thuật ngữ:** nhiều thư viện thực hiện cross-correlation, không lật bộ lọc như định nghĩa convolution toán học. Ví dụ dùng bộ lọc đối xứng nên hai cách cho cùng kết quả. Pooling có điểm không khả vi hoặc đồng hạng, được xử lý bằng quy ước gradient thích hợp.

Panel C018 • Bản render nguyên trang từ [C], trang PDF 18. Nội dung trong panel là bản gốc.

### Cách đọc và giải thích

Nhiều bản đồ đặc trưng là nhiều kênh, không phải nhiều ảnh độc lập để gán nhãn. C018 giữ ma trận đầu vào, bộ lọc toàn một, kết quả 2 × 2 và pooling. Các phép nhân cộng được trình bày bằng LaTeX trong phần tính tay.

**Tự kiểm tra (áp dụng cho các panel trên):** Bộ lọc 2 × 2, stride một, không padding trên ảnh 3 × 3 tạo mấy vị trí, và pooling cuối giữ gì?

**Đáp án và ý nghĩa:** Có bốn vị trí, tạo các giá trị 4,2,2,1. Pooling cửa sổ 2 × 2 giữ giá trị lớn nhất là bốn.
-->


---

<div class="track"><span>08 – Lập trình khả vi và CNN</span><span>ML tổng hợp</span></div>

# Stride, padding và kích thước



$$
H_{\rm out}=\left\lfloor\frac{H+2p-k}{s}\right\rfloor+1
$$


| Ký hiệu | Ý nghĩa |
|---|---|
| $k$ | Kích thước kernel |
| $s$ | Bước trượt |
| $p$ | Padding ở mỗi phía |


<div class="note">Thư viện thường gọi cross-correlation là convolution. Bộ lọc đối xứng trong ví dụ cho cùng kết quả khi lật</div>



<!--
Nguồn: Hoc_may_Tong_hop_chuyen_sau_3_bai_giang.pdf, trang 97.



Giữ nguyên ảnh và bộ lọc của slide. Dùng stride bằng một, không padding, không bias:

$$X=\begin{bmatrix}1&1&0\\1&1&0\\0&0&0\end{bmatrix},\qquad
K=\begin{bmatrix}1&1\\1&1\end{bmatrix}.$$

Tại góc trên trái, nhân từng phần tử rồi cộng được $1+1+1+1=4$. Trượt sang phải được $1+0+1+0=2$. Hai vị trí ở hàng dưới lần lượt được hai và một.

$$Z=\begin{bmatrix}4&2\\2&1\end{bmatrix},\quad
A=\operatorname{ReLU}(Z)=Z,\quad
\operatorname{MaxPool}_{2\times2}(A)=[4].$$

ReLU không đổi kết quả vì mọi phần tử đều dương. Max pooling giữ giá trị lớn nhất trong cửa sổ, làm đầu ra không gian nhỏ hơn.

### Stride, padding và kích thước

Với kích thước đầu vào $H$, bộ lọc $k$, padding $p$ và stride $s$ theo một chiều:

$$H_{\rm out}=\left\lfloor\frac{H+2p-k}{s}\right\rfloor+1.$$

Stride là bước trượt, padding là phần bổ sung quanh biên. Với ví dụ trên, đầu ra có kích thước hai. Các bộ lọc trong CNN được học từ dữ liệu, không nhất thiết toàn số một.

**Chính xác thuật ngữ:** nhiều thư viện thực hiện cross-correlation, không lật bộ lọc như định nghĩa convolution toán học. Ví dụ dùng bộ lọc đối xứng nên hai cách cho cùng kết quả. Pooling có điểm không khả vi hoặc đồng hạng, được xử lý bằng quy ước gradient thích hợp.
-->


---

<div class="track"><span>08 – Lập trình khả vi và CNN</span><span>ML tổng hợp</span></div>

# Tự luyện – ReLU có đổi ma trận (4,2;2,1) không?



<div class="answer" v-click>Không vì mọi phần tử đều dương. Max pooling 2 × 2 sau đó giữ giá trị <b>4</b>.</div>



<div class="note">Thử trả lời trước khi bấm Tiếp</div>



<!--
Nguồn: Hoc_may_Tong_hop_chuyen_sau_3_bai_giang.pdf, trang 97, 168.



Giữ nguyên ảnh và bộ lọc của slide. Dùng stride bằng một, không padding, không bias:

$$X=\begin{bmatrix}1&1&0\\1&1&0\\0&0&0\end{bmatrix},\qquad
K=\begin{bmatrix}1&1\\1&1\end{bmatrix}.$$

Tại góc trên trái, nhân từng phần tử rồi cộng được $1+1+1+1=4$. Trượt sang phải được $1+0+1+0=2$. Hai vị trí ở hàng dưới lần lượt được hai và một.

$$Z=\begin{bmatrix}4&2\\2&1\end{bmatrix},\quad
A=\operatorname{ReLU}(Z)=Z,\quad
\operatorname{MaxPool}_{2\times2}(A)=[4].$$

ReLU không đổi kết quả vì mọi phần tử đều dương. Max pooling giữ giá trị lớn nhất trong cửa sổ, làm đầu ra không gian nhỏ hơn.

### Stride, padding và kích thước

Với kích thước đầu vào $H$, bộ lọc $k$, padding $p$ và stride $s$ theo một chiều:

$$H_{\rm out}=\left\lfloor\frac{H+2p-k}{s}\right\rfloor+1.$$

Stride là bước trượt, padding là phần bổ sung quanh biên. Với ví dụ trên, đầu ra có kích thước hai. Các bộ lọc trong CNN được học từ dữ liệu, không nhất thiết toàn số một.

**Chính xác thuật ngữ:** nhiều thư viện thực hiện cross-correlation, không lật bộ lọc như định nghĩa convolution toán học. Ví dụ dùng bộ lọc đối xứng nên hai cách cho cùng kết quả. Pooling có điểm không khả vi hoặc đồng hạng, được xử lý bằng quy ước gradient thích hợp.

**[CÂU HỎI BIÊN SOẠN]** Dựa trên nội dung chương. Hãy tự trả lời trước rồi mới xem phần giải thích dưới từng câu.

### 8.1 • Ghi nhớ

**Hai đặc điểm giúp CNN tận dụng cấu trúc ảnh?**

Kết nối cục bộ và chia sẻ trọng số của bộ lọc qua nhiều vị trí.

### 8.2 • Thông hiểu

**Trải phẳng có làm mất giá trị pixel không?**

Không về lưu trữ nếu chỉ đổi cách sắp xếp. Nhưng dense không tự áp đặt cấu trúc lân cận và chia sẻ tham số như CNN.

### 8.3 • Vận dụng

**Tính góc trên phải của tích chập ví dụ.**

Cửa sổ gồm 1,0,1,0. Nhân bộ lọc toàn một rồi cộng được hai. Kết quả toàn bản đồ là các hàng (4;2) và (2;1).

### 8.4 • Phân tích

**ReLU có đổi ma trận kết quả này không?**

Không, mọi phần tử đều dương. Max pooling sau đó mới thu bản đồ 2×2 thành giá trị bốn.

### 8.5 • Đánh giá

**So lớp dense 100 nút với conv 16 kernel có được gọi hoàn toàn tương đương?**

Không. Phép đếm tham số minh họa cơ chế tiết kiệm, không chứng minh hai lớp có cùng chức năng hoặc cùng khả năng học.
-->


---

<div class="track"><span>09 – Embedding, RNN và LSTM</span><span>ML tổng hợp</span></div>

# Embedding và biểu diễn theo ngữ cảnh



$$
E\in\mathbb R^{|V|\times d},\qquad e_t=E[\text{token}_t]
$$


- Token có thể là từ, mảnh từ hoặc ký tự
- Embedding tĩnh: cùng token nhận cùng vector ban đầu
- Hidden state: đã kết hợp thông tin ngữ cảnh


<div class="note">“Đường đông xe” và “cà phê nhiều đường” cần hai cách hiểu theo câu</div>



<!--
Nguồn: Hoc_may_Tong_hop_chuyen_sau_3_bai_giang.pdf, trang 103, 107, 108.



Máy cần biểu diễn văn bản thành số. **Token** là đơn vị sau bước tách văn bản, có thể là từ, mảnh từ hoặc ký tự. **Embedding** ánh xạ mỗi token thành một vector thực được học.

$$E\in\mathbb R^{|V|\times d},\qquad e_t=E[\text{token}_t].$$

Trong ví dụ “Tôi thích mèo”, slide minh họa:

$$e_{\text{Tôi}}=[0.4,-0.2,0.7,\ldots],\quad
e_{\text{thích}}=[0.1,0.8,-0.3,\ldots].$$

Các con số chỉ là minh họa. Không nên hiểu mỗi chiều bắt buộc tương ứng một thuộc tính dễ đặt tên. Ý nghĩa được mã hóa qua cả vector và cách mô hình sử dụng vector.

### Embedding tĩnh chưa phân biệt đủ nghĩa

“Con **đường** này đông xe” và “Ly cà phê này có nhiều **đường**” có cùng mặt chữ nhưng khác nghĩa. Một bảng tra tĩnh cho cùng token cùng vector ban đầu. Mô hình chuỗi tạo **biểu diễn theo ngữ cảnh**, kết hợp thông tin từ các token xung quanh.

### Ví dụ Tấm và Cám

Đoạn văn trong slide cho biết cha Tấm bệnh nặng rồi qua đời, sau đó Tấm sống cùng dì ghẻ là mẹ Cám. Hai câu hỏi có đáp án:

- Cha Tấm gặp chuyện gì trước khi qua đời? **Bệnh nặng**.
- Sau khi cha mất, Tấm sống chung với ai? **Dì ghẻ**.

Để trả lời, mô hình cần liên kết nhân vật, sự kiện và các cụm từ liên quan. Chỉ biết vector của từng từ riêng lẻ chưa đủ. RNN truyền thông tin tuần tự, còn Attention kết hợp thông tin giữa các vị trí theo trọng số phụ thuộc nội dung.

Embedding đầu vào, hidden state có ngữ cảnh và vector đại diện cả câu là ba khái niệm khác nhau. Một token có thể khởi đầu bằng cùng embedding nhưng nhận hidden state khác nhau trong các câu khác nhau.

Panel C023 • Bản render nguyên trang từ [C], trang PDF 23. Nội dung trong panel là bản gốc.

Panel C024 • Bản render nguyên trang từ [C], trang PDF 24. Nội dung trong panel là bản gốc.

### Cách đọc và giải thích

C023 cho ba vector minh họa của “Tôi”, “thích”, “mèo”. Dấu ba chấm là các chiều chưa hiển thị, không phải giá trị bằng không. C024 đặt ảnh đường giao thông cạnh đường trong đồ uống để cho thấy cùng mặt chữ khác nghĩa. C025 ánh xạ chuỗi embedding sang chuỗi vector có ngữ cảnh, chưa thu gọn cả câu thành một vector. Panel còn lại của nhóm được phóng riêng ở trang kế tiếp.

**Tự kiểm tra (áp dụng cho các panel trên):** Trong C025, số vector đầu ra có bắt buộc bằng một không?

**Đáp án và ý nghĩa:** Không. Sơ đồ cho một vector ngữ cảnh ở từng vị trí. Collapse là một bước khác khi tác vụ cần đại diện toàn chuỗi.

Panel C025 • Bản render nguyên trang từ [C], trang PDF 25. Nội dung trong panel là bản gốc.

### Cách đọc và giải thích

Dấu ba chấm là các chiều chưa hiển thị, không phải giá trị bằng không. C025 ánh xạ chuỗi embedding sang chuỗi vector có ngữ cảnh, chưa thu gọn cả câu thành một vector.

**Tự kiểm tra (áp dụng cho các panel trên):** Trong C025, số vector đầu ra có bắt buộc bằng một không?

**Đáp án và ý nghĩa:** Không. Sơ đồ cho một vector ngữ cảnh ở từng vị trí. Collapse là một bước khác khi tác vụ cần đại diện toàn chuỗi.
-->


---

<div class="track"><span>09 – Embedding, RNN và LSTM</span><span>ML tổng hợp</span></div>

# Ví dụ hỏi đáp Tấm Cám


Đoạn văn cho biết cha Tấm **bệnh nặng rồi qua đời**<br/>
Sau đó Tấm phải sống cùng **dì ghẻ là mẹ Cám**

| Câu hỏi gốc | Đáp án trong đoạn |
|---|---|
| Cha Tấm gặp chuyện gì trước khi qua đời? | Bệnh nặng |
| Sau khi cha mất, Tấm sống chung với ai? | Dì ghẻ |


<div class="note">Cần nối nhân vật, sự kiện và câu hỏi. Tra vector từng từ riêng lẻ chưa đủ</div>



<!--
Nguồn: Hoc_may_Tong_hop_chuyen_sau_3_bai_giang.pdf, trang 103, 106.



Máy cần biểu diễn văn bản thành số. **Token** là đơn vị sau bước tách văn bản, có thể là từ, mảnh từ hoặc ký tự. **Embedding** ánh xạ mỗi token thành một vector thực được học.

$$E\in\mathbb R^{|V|\times d},\qquad e_t=E[\text{token}_t].$$

Trong ví dụ “Tôi thích mèo”, slide minh họa:

$$e_{\text{Tôi}}=[0.4,-0.2,0.7,\ldots],\quad
e_{\text{thích}}=[0.1,0.8,-0.3,\ldots].$$

Các con số chỉ là minh họa. Không nên hiểu mỗi chiều bắt buộc tương ứng một thuộc tính dễ đặt tên. Ý nghĩa được mã hóa qua cả vector và cách mô hình sử dụng vector.

### Embedding tĩnh chưa phân biệt đủ nghĩa

“Con **đường** này đông xe” và “Ly cà phê này có nhiều **đường**” có cùng mặt chữ nhưng khác nghĩa. Một bảng tra tĩnh cho cùng token cùng vector ban đầu. Mô hình chuỗi tạo **biểu diễn theo ngữ cảnh**, kết hợp thông tin từ các token xung quanh.

### Ví dụ Tấm và Cám

Đoạn văn trong slide cho biết cha Tấm bệnh nặng rồi qua đời, sau đó Tấm sống cùng dì ghẻ là mẹ Cám. Hai câu hỏi có đáp án:

- Cha Tấm gặp chuyện gì trước khi qua đời? **Bệnh nặng**.
- Sau khi cha mất, Tấm sống chung với ai? **Dì ghẻ**.

Để trả lời, mô hình cần liên kết nhân vật, sự kiện và các cụm từ liên quan. Chỉ biết vector của từng từ riêng lẻ chưa đủ. RNN truyền thông tin tuần tự, còn Attention kết hợp thông tin giữa các vị trí theo trọng số phụ thuộc nội dung.

Embedding đầu vào, hidden state có ngữ cảnh và vector đại diện cả câu là ba khái niệm khác nhau. Một token có thể khởi đầu bằng cùng embedding nhưng nhận hidden state khác nhau trong các câu khác nhau.

Panel C022 • Bản render nguyên trang từ [C], trang PDF 22. Nội dung trong panel là bản gốc.

### Cách đọc và giải thích

Panel giữ nguyên đoạn văn và cả hai câu hỏi/đáp án. Để trả lời câu đầu, tìm quan hệ sự kiện trước khi cha qua đời và cụm “bệnh nặng”. Câu sau liên hệ việc cha mất với người Tấm sống chung, là “dì ghẻ”. [DIỄN GIẢI] Đây là ví dụ hiểu theo đoạn văn được cung cấp, không yêu cầu kiến thức ngoài về mọi dị bản truyện. Mối quan hệ giữa từ/cụm từ quan trọng hơn việc chỉ nhận ra từng từ riêng lẻ.

**Tự kiểm tra (áp dụng cho các panel trên):** Nếu chỉ biết embedding riêng của từ “cha” và “bệnh”, đã đủ xác định câu trả lời thuộc nhân vật nào chưa?

**Đáp án và ý nghĩa:** Chưa. Cần quan hệ ngữ cảnh giữa nhân vật, sự kiện và câu hỏi. Một phép tra từ đơn lẻ không mã hóa đầy đủ những quan hệ đó.
-->


---

<div class="track"><span>09 – Embedding, RNN và LSTM</span><span>ML tổng hợp</span></div>

# RNN và trạng thái tuần tự



$$
h_t=\tanh(W_hh_{t-1}+W_xe_t+b)
$$


<figure><img src="/images/rnn.png" style="max-height:215px" alt="Cùng cell và cùng trọng số lặp lại qua thời gian, panel C026"/><figcaption>Cùng cell và cùng trọng số lặp lại qua thời gian, panel C026</figcaption></figure>


<div class="note">Chiều dài chuỗi tăng số bước tính, không bắt buộc tăng số bộ trọng số</div>



<!--
Nguồn: Hoc_may_Tong_hop_chuyen_sau_3_bai_giang.pdf, trang 104, 109.



**Recurrent Neural Network** là mạng hồi tiếp xử lý chuỗi. Một trạng thái ẩn được cập nhật ở từng bước, dùng đầu vào hiện tại và trạng thái bước trước.

$$h_t=\tanh(W_hh_{t-1}+W_xe_t+b).$$

Trạng thái $h_t$ tóm tắt thông tin mà mạng giữ lại sau khi đọc token thứ $t$. Cùng các ma trận $W_h,W_x$ được dùng ở mọi bước. Số bộ tham số không tăng theo chiều dài chuỗi, dù số phép tính và số trạng thái cần xử lý tăng.

### Vì sao phụ thuộc xa khó học?

Trong câu “Con mèo mà tôi nhìn thấy ở công viên vào chiều hôm qua đang ngủ trên ghế”, chủ thể “con mèo” cách khá xa “đang ngủ”. RNN phải giữ thông tin qua nhiều lần cập nhật.

Khi backpropagation through time, gradient chứa tích của nhiều ma trận Jacobian. Nếu độ co rút lặp đi lặp lại, gradient có thể rất nhỏ. Nếu độ khuếch đại lặp lại, gradient có thể rất lớn.

$$\frac{\partial h_T}{\partial h_t}
=\frac{\partial h_T}{\partial h_{T-1}}\cdots
\frac{\partial h_{t+1}}{\partial h_t}.$$

RNN còn có phụ thuộc tuần tự: trạng thái bước sau cần bước trước. Điều này giới hạn khả năng song song hóa theo chiều thời gian so với self-attention khi xử lý một chuỗi đã có sẵn.

**Thuật ngữ:** “recurrent” nên hiểu là hồi tiếp/hồi quy theo cách gọi của slide, không đồng nghĩa với bài toán hồi quy dự đoán số thực.

Panel C026 • Bản render nguyên trang từ [C], trang PDF 26. Nội dung trong panel là bản gốc.

Panel C027 • Bản render nguyên trang từ [C], trang PDF 27. Nội dung trong panel là bản gốc.

### Cách đọc và giải thích

C026 có cạnh từ đầu vào xuống trạng thái và cạnh ngang giữa các trạng thái. C027 giải thích một bước bằng hai phép nhân ma trận, cộng bias và tanh. C028 nhấn mạnh đường gradient đi ngược từ bước muộn qua nhiều bước trước. [DIỄN GIẢI] Các cột thời gian không có một bộ trọng số độc lập riêng cho mỗi cột, vì cùng ma trận được dùng lại. Panel còn lại của nhóm được phóng riêng ở trang kế tiếp.

**Tự kiểm tra (áp dụng cho các panel trên):** Độ dài chuỗi tăng từ năm lên hai mươi có bắt buộc tăng số bộ trọng số RNN không?

**Đáp án và ý nghĩa:** Không. Tăng số lần dùng chung trọng số, số phép tính và trạng thái, còn số bộ trọng số của cùng cell không đổi.
-->


---

<div class="track"><span>09 – Embedding, RNN và LSTM</span><span>ML tổng hợp</span></div>

# Phụ thuộc dài và gradient



$$
\frac{\partial h_T}{\partial h_t}=\frac{\partial h_T}{\partial h_{T-1}}\cdots\frac{\partial h_{t+1}}{\partial h_t}
$$


- Nhiều phép co liên tiếp có thể làm gradient biến mất
- Nhiều phép khuếch đại có thể làm gradient bùng nổ
- Các bước RNN phụ thuộc tuần tự vào bước trước


<div class="note">Ví dụ câu dài: chủ thể “con mèo” cách xa “đang ngủ”</div>



<!--
Nguồn: Hoc_may_Tong_hop_chuyen_sau_3_bai_giang.pdf, trang 104, 110, 112.



**Recurrent Neural Network** là mạng hồi tiếp xử lý chuỗi. Một trạng thái ẩn được cập nhật ở từng bước, dùng đầu vào hiện tại và trạng thái bước trước.

$$h_t=\tanh(W_hh_{t-1}+W_xe_t+b).$$

Trạng thái $h_t$ tóm tắt thông tin mà mạng giữ lại sau khi đọc token thứ $t$. Cùng các ma trận $W_h,W_x$ được dùng ở mọi bước. Số bộ tham số không tăng theo chiều dài chuỗi, dù số phép tính và số trạng thái cần xử lý tăng.

### Vì sao phụ thuộc xa khó học?

Trong câu “Con mèo mà tôi nhìn thấy ở công viên vào chiều hôm qua đang ngủ trên ghế”, chủ thể “con mèo” cách khá xa “đang ngủ”. RNN phải giữ thông tin qua nhiều lần cập nhật.

Khi backpropagation through time, gradient chứa tích của nhiều ma trận Jacobian. Nếu độ co rút lặp đi lặp lại, gradient có thể rất nhỏ. Nếu độ khuếch đại lặp lại, gradient có thể rất lớn.

$$\frac{\partial h_T}{\partial h_t}
=\frac{\partial h_T}{\partial h_{T-1}}\cdots
\frac{\partial h_{t+1}}{\partial h_t}.$$

RNN còn có phụ thuộc tuần tự: trạng thái bước sau cần bước trước. Điều này giới hạn khả năng song song hóa theo chiều thời gian so với self-attention khi xử lý một chuỗi đã có sẵn.

**Thuật ngữ:** “recurrent” nên hiểu là hồi tiếp/hồi quy theo cách gọi của slide, không đồng nghĩa với bài toán hồi quy dự đoán số thực.

Panel C028 • Bản render nguyên trang từ [C], trang PDF 28. Nội dung trong panel là bản gốc.

### Cách đọc và giải thích

C028 nhấn mạnh đường gradient đi ngược từ bước muộn qua nhiều bước trước. [DIỄN GIẢI] Các cột thời gian không có một bộ trọng số độc lập riêng cho mỗi cột, vì cùng ma trận được dùng lại.

**Tự kiểm tra (áp dụng cho các panel trên):** Độ dài chuỗi tăng từ năm lên hai mươi có bắt buộc tăng số bộ trọng số RNN không?

**Đáp án và ý nghĩa:** Không. Tăng số lần dùng chung trọng số, số phép tính và trạng thái, còn số bộ trọng số của cùng cell không đổi.

Panel C034 • Bản render nguyên trang từ [C], trang PDF 34. Nội dung trong panel là bản gốc.

### Cách đọc và giải thích

C034 nêu câu có “con mèo” cách xa “đang ngủ”. [DIỄN GIẢI] Với RNN một chiều, trạng thái đầu không có thông tin các token phía sau; vì vậy ba cách collapse không tương đương về thông tin.

**Tự kiểm tra (áp dụng cho các panel trên):** Lấy trạng thái đầu của RNN một chiều có luôn đại diện toàn bộ câu như trạng thái cuối không?

**Đáp án và ý nghĩa:** Không. Nó mới nhận phần đầu. Trạng thái cuối nhận chuỗi trước đó nhưng có thể mất thông tin xa, còn trung bình có thể làm loãng tín hiệu quan trọng.
-->


---

<div class="track"><span>09 – Embedding, RNN và LSTM</span><span>ML tổng hợp</span></div>

# LSTM: đường nhớ và các cổng



$$
f_t=\sigma(W_f[h_{t-1};e_t]+b_f),\quad i_t=\sigma(W_i[h_{t-1};e_t]+b_i)
$$



$$
\tilde c_t=\tanh(W_c[h_{t-1};e_t]+b_c),\quad c_t=f_t\odot c_{t-1}+i_t\odot\tilde c_t
$$



$$
o_t=\sigma(W_o[h_{t-1};e_t]+b_o),\qquad h_t=o_t\odot\tanh(c_t)
$$



<div class="note">Forget giữ/bỏ ký ức cũ, input nhận thông tin mới, output điều khiển phần xuất ra. LSTM không bảo đảm loại bỏ mọi khó khăn chuỗi dài</div>



<!--
Nguồn: Hoc_may_Tong_hop_chuyen_sau_3_bai_giang.pdf, trang 105, 111.



**LSTM** bổ sung trạng thái ô nhớ $c_t$ và các cổng để điều tiết thông tin. Các cổng sigmoid cho giá trị từ không đến một, tương tự mức đóng/mở đối với từng chiều.

$$f_t=\sigma(W_f[h_{t-1};e_t]+b_f),\quad
i_t=\sigma(W_i[h_{t-1};e_t]+b_i).$$

$$\widetilde c_t=\tanh(W_c[h_{t-1};e_t]+b_c),\qquad
c_t=f_t\odot c_{t-1}+i_t\odot\widetilde c_t.$$

$$o_t=\sigma(W_o[h_{t-1};e_t]+b_o),\qquad h_t=o_t\odot\tanh(c_t).$$

Forget gate quyết định giữ bao nhiêu ký ức cũ. Input gate quyết định nhận bao nhiêu thông tin ứng viên. Output gate quyết định phần nào của ô nhớ được bộc lộ thành hidden state. Ký hiệu dấu chấm phẩy trong ngoặc vuông là phép nối vector.

### Collapse: từ nhiều vector thành một vector

Phân loại cảm xúc của cả câu cần một kết quả cuối. Có thể chọn hidden state đầu, hidden state cuối hoặc lấy trung bình:

$$c_{\rm avg}=\frac1T\sum_{t=1}^T h_t.$$

**Không phải lựa chọn nào cũng tương đương.** Với RNN một chiều, trạng thái đầu chưa nhìn các token phía sau. Trạng thái cuối đã tiếp nhận toàn chuỗi nhưng có thể thiên về thông tin gần cuối. Trung bình phân tán thông tin nhưng có thể làm loãng tín hiệu quan trọng. Padding cần được bỏ qua khi lấy trung bình.

LSTM giúp giảm khó khăn về phụ thuộc dài, nhưng không bảo đảm loại bỏ hoàn toàn vanishing gradient hoặc giải mọi bài toán chuỗi dài.

Panel C029 • Bản render nguyên trang từ [C], trang PDF 29. Nội dung trong panel là bản gốc.

Panel C031 • Bản render nguyên trang từ [C], trang PDF 31. Nội dung trong panel là bản gốc.

### Cách đọc và giải thích

C029 minh họa đường ô nhớ và các cổng điều tiết. C031 thu nhiều hidden state thành một đại diện cho phân loại cảm xúc, đưa ra lựa chọn first/last/average. C034 nêu câu có “con mèo” cách xa “đang ngủ”. [DIỄN GIẢI] Với RNN một chiều, trạng thái đầu không có thông tin các token phía sau; vì vậy ba cách collapse không tương đương về thông tin. Panel còn lại của nhóm được phóng riêng ở trang kế tiếp.

**Tự kiểm tra (áp dụng cho các panel trên):** Lấy trạng thái đầu của RNN một chiều có luôn đại diện toàn bộ câu như trạng thái cuối không?

**Đáp án và ý nghĩa:** Không. Nó mới nhận phần đầu. Trạng thái cuối nhận chuỗi trước đó nhưng có thể mất thông tin xa, còn trung bình có thể làm loãng tín hiệu quan trọng.
-->


---

<div class="track"><span>09 – Embedding, RNN và LSTM</span><span>ML tổng hợp</span></div>

# Collapse: chuỗi thành một đại diện


| Cách chọn | Thông tin và hạn chế |
|---|---|
| First | RNN một chiều chưa thấy phần sau |
| Last | Đã tiếp nhận cả chuỗi, có thể yếu với phụ thuộc xa |
| Average | Dùng nhiều vị trí, có thể loãng tín hiệu quan trọng |


$$
c_{\rm avg}=\frac1T\sum_{t=1}^Th_t
$$



<div class="note">Loại padding khỏi trung bình. Chọn cách collapse theo mô hình và tác vụ</div>



<!--
Nguồn: Hoc_may_Tong_hop_chuyen_sau_3_bai_giang.pdf, trang 105, 111.



**LSTM** bổ sung trạng thái ô nhớ $c_t$ và các cổng để điều tiết thông tin. Các cổng sigmoid cho giá trị từ không đến một, tương tự mức đóng/mở đối với từng chiều.

$$f_t=\sigma(W_f[h_{t-1};e_t]+b_f),\quad
i_t=\sigma(W_i[h_{t-1};e_t]+b_i).$$

$$\widetilde c_t=\tanh(W_c[h_{t-1};e_t]+b_c),\qquad
c_t=f_t\odot c_{t-1}+i_t\odot\widetilde c_t.$$

$$o_t=\sigma(W_o[h_{t-1};e_t]+b_o),\qquad h_t=o_t\odot\tanh(c_t).$$

Forget gate quyết định giữ bao nhiêu ký ức cũ. Input gate quyết định nhận bao nhiêu thông tin ứng viên. Output gate quyết định phần nào của ô nhớ được bộc lộ thành hidden state. Ký hiệu dấu chấm phẩy trong ngoặc vuông là phép nối vector.

### Collapse: từ nhiều vector thành một vector

Phân loại cảm xúc của cả câu cần một kết quả cuối. Có thể chọn hidden state đầu, hidden state cuối hoặc lấy trung bình:

$$c_{\rm avg}=\frac1T\sum_{t=1}^T h_t.$$

**Không phải lựa chọn nào cũng tương đương.** Với RNN một chiều, trạng thái đầu chưa nhìn các token phía sau. Trạng thái cuối đã tiếp nhận toàn chuỗi nhưng có thể thiên về thông tin gần cuối. Trung bình phân tán thông tin nhưng có thể làm loãng tín hiệu quan trọng. Padding cần được bỏ qua khi lấy trung bình.

LSTM giúp giảm khó khăn về phụ thuộc dài, nhưng không bảo đảm loại bỏ hoàn toàn vanishing gradient hoặc giải mọi bài toán chuỗi dài.

Panel C029 • Bản render nguyên trang từ [C], trang PDF 29. Nội dung trong panel là bản gốc.

Panel C031 • Bản render nguyên trang từ [C], trang PDF 31. Nội dung trong panel là bản gốc.

### Cách đọc và giải thích

C029 minh họa đường ô nhớ và các cổng điều tiết. C031 thu nhiều hidden state thành một đại diện cho phân loại cảm xúc, đưa ra lựa chọn first/last/average. C034 nêu câu có “con mèo” cách xa “đang ngủ”. [DIỄN GIẢI] Với RNN một chiều, trạng thái đầu không có thông tin các token phía sau; vì vậy ba cách collapse không tương đương về thông tin. Panel còn lại của nhóm được phóng riêng ở trang kế tiếp.

**Tự kiểm tra (áp dụng cho các panel trên):** Lấy trạng thái đầu của RNN một chiều có luôn đại diện toàn bộ câu như trạng thái cuối không?

**Đáp án và ý nghĩa:** Không. Nó mới nhận phần đầu. Trạng thái cuối nhận chuỗi trước đó nhưng có thể mất thông tin xa, còn trung bình có thể làm loãng tín hiệu quan trọng.
-->


---

<div class="track"><span>09 – Embedding, RNN và LSTM</span><span>ML tổng hợp</span></div>

# Tự luyện – Recurrent có cùng nghĩa với regression?



<div class="answer" v-click>Không. Recurrent nói về hồi tiếp theo thời gian. Regression nói về tác vụ dự đoán đại lượng số.</div>



<div class="note">Thử trả lời trước khi bấm Tiếp</div>



<!--
Nguồn: Hoc_may_Tong_hop_chuyen_sau_3_bai_giang.pdf, trang 104, 113, 169.



**Recurrent Neural Network** là mạng hồi tiếp xử lý chuỗi. Một trạng thái ẩn được cập nhật ở từng bước, dùng đầu vào hiện tại và trạng thái bước trước.

$$h_t=\tanh(W_hh_{t-1}+W_xe_t+b).$$

Trạng thái $h_t$ tóm tắt thông tin mà mạng giữ lại sau khi đọc token thứ $t$. Cùng các ma trận $W_h,W_x$ được dùng ở mọi bước. Số bộ tham số không tăng theo chiều dài chuỗi, dù số phép tính và số trạng thái cần xử lý tăng.

### Vì sao phụ thuộc xa khó học?

Trong câu “Con mèo mà tôi nhìn thấy ở công viên vào chiều hôm qua đang ngủ trên ghế”, chủ thể “con mèo” cách khá xa “đang ngủ”. RNN phải giữ thông tin qua nhiều lần cập nhật.

Khi backpropagation through time, gradient chứa tích của nhiều ma trận Jacobian. Nếu độ co rút lặp đi lặp lại, gradient có thể rất nhỏ. Nếu độ khuếch đại lặp lại, gradient có thể rất lớn.

$$\frac{\partial h_T}{\partial h_t}
=\frac{\partial h_T}{\partial h_{T-1}}\cdots
\frac{\partial h_{t+1}}{\partial h_t}.$$

RNN còn có phụ thuộc tuần tự: trạng thái bước sau cần bước trước. Điều này giới hạn khả năng song song hóa theo chiều thời gian so với self-attention khi xử lý một chuỗi đã có sẵn.

**Thuật ngữ:** “recurrent” nên hiểu là hồi tiếp/hồi quy theo cách gọi của slide, không đồng nghĩa với bài toán hồi quy dự đoán số thực.

### Ghi nhớ theo vai trò học thuật

| Mức | Nội dung | Cần hiểu hoặc làm được |
|---|---|---|
| A | Embedding / context | Bảng tra ban đầu khác hidden state theo câu. |
| A | RNN | Dùng chung trọng số và trạng thái tuần tự. |
| B | LSTM | Cell state và cổng điều khiển giữ/bổ sung/xuất thông tin. |
| B | Collapse | Chọn first/last/average theo thông tin và tác vụ. |

### So sánh và điểm dễ nhầm

| Từ dùng trong slide | Ý nghĩa |
|---|---|
| Recurrent | Hồi tiếp theo thời gian, không phải bài toán regression |
| Hidden state | Trạng thái có ngữ cảnh ở một bước |
| Cell state | Đường nhớ riêng của LSTM |

### Liên hệ với chương khác

Chương 10 dùng Attention để tạo đường kết hợp trực tiếp giữa các vị trí.

### Đối chiếu hình và ví dụ của chương

| Nguồn / mã panel | Nội dung | Vị trí | Trạng thái |
|---|---|---|---|
| C022 | Đoạn Tấm Cám: giữ đủ dữ kiện và câu hỏi | Trang 106 | Đã giữ và giải thích |
| C023, C024 | Embedding giữ tên token, ngữ cảnh phân biệt nghĩa (1) | Trang 107 | Đã giữ và giải thích |
| C025 | Embedding giữ tên token, ngữ cảnh phân biệt nghĩa (2) | Trang 108 | Đã giữ và giải thích |
| C026, C027 | RNN được trải theo thời gian (1) | Trang 109 | Đã giữ và giải thích |
| C028 | RNN được trải theo thời gian (2) | Trang 110 | Đã giữ và giải thích |
| C029, C031 | Ô nhớ LSTM, thu gọn chuỗi và phụ thuộc xa (1) | Trang 111 | Đã giữ và giải thích |
| C034 | Ô nhớ LSTM, thu gọn chuỗi và phụ thuộc xa (2) | Trang 112 | Đã giữ và giải thích |

**[CÂU HỎI BIÊN SOẠN]** Dựa trên nội dung chương. Hãy tự trả lời trước rồi mới xem phần giải thích dưới từng câu.

### 9.1 • Ghi nhớ

**Hidden state và cell state khác gì?**

Hidden state là biểu diễn truyền ra ở bước hiện tại. LSTM có thêm cell state làm đường nhớ được các cổng điều tiết.

### 9.2 • Thông hiểu

**Vì sao từ “đường” cần ngữ cảnh?**

Mặt chữ giống nhau nhưng quan hệ với xe/cà phê đổi nghĩa. Embedding tĩnh một token không tự phân biệt được hai ngữ cảnh này.

### 9.3 • Vận dụng

**Câu hỏi cha Tấm gặp chuyện gì lấy đáp án ở đâu?**

Từ đoạn văn gốc, liên kết “ông” với cha Tấm và sự kiện trước qua đời, chọn “bệnh nặng”. Không cần đưa thêm dị bản ngoài nguồn.

### 9.4 • Phân tích

**Gradient qua 19 lần co với hệ số 0,5 còn khoảng bao nhiêu?**

[BỔ SUNG] Hệ số là $0.5^{19}$, gần 1,9×10⁻⁶. Đây chỉ là minh họa tích co rút, không phải gradient đo được của RNN trong slide.

### 9.5 • Đánh giá

**Khi phân loại cảm xúc câu, average luôn tốt nhất không?**

Không. Nó dùng nhiều vị trí nhưng có thể loãng tín hiệu. Cần chọn collapse phù hợp cấu trúc mô hình, mask padding và kiểm chứng validation.
-->


---

<div class="track"><span>10 – Attention và Transformer</span><span>ML tổng hợp</span></div>

# Query, key và value


| Thành phần | Vai trò |
|---|---|
| Query | Điều đang cần tìm |
| Key | Thông tin dùng so độ liên quan |
| Value | Nội dung được kết hợp |


$$
s_j=q^\top k_j,\qquad\alpha_j=\frac{e^{s_j}}{\sum_ke^{s_k}},\qquad c=\sum_j\alpha_jv_j
$$



<!--
Nguồn: Hoc_may_Tong_hop_chuyen_sau_3_bai_giang.pdf, trang 115, 118.



Một **query** biểu diễn điều đang cần tìm. **Key** dùng để đánh giá độ liên quan. **Value** là nội dung được kết hợp. Ví dụ đơn giản trong slide dùng cùng vector đầu vào làm key và value, chưa thêm phép chiếu học được.

$$q=\begin{bmatrix}1\\0\end{bmatrix},\quad
x_1=\begin{bmatrix}0\\1\end{bmatrix},\quad
x_2=\begin{bmatrix}0\\0\end{bmatrix},\quad
x_3=\begin{bmatrix}0\\-1\end{bmatrix},\quad
x_4=\begin{bmatrix}2\\0\end{bmatrix}.$$

### Bước 1. Tính điểm tương thích

$$s_j=q^\top x_j\quad\Rightarrow\quad s=[0,0,0,2].$$

### Bước 2. Softmax các điểm số

$$\alpha_j=\frac{e^{s_j}}{\sum_k e^{s_k}},\qquad
\alpha\approx[0.0963,0.0963,0.0963,0.7112].$$

### Bước 3. Tổng có trọng số của value

$$c=\sum_{j=1}^4\alpha_jx_j
\approx\begin{bmatrix}1.4225\\0\end{bmatrix}.$$

Hai đóng góp ở chiều thứ hai từ $x_1$ và $x_3$ triệt tiêu nhau. Vector thứ tư được chú ý mạnh nhất vì có tích vô hướng lớn nhất với query.

**Chú ý:** ví dụ này dùng dot-product chưa chia tỷ lệ. Scaled dot-product attention của Transformer ở trang sau có thêm hệ số căn bậc hai của chiều key, nên trọng số có thể khác nếu áp dụng trực tiếp.

Panel C035 • Bản render nguyên trang từ [C], trang PDF 35. Nội dung trong panel là bản gốc.

Panel C037 • Bản render nguyên trang từ [C], trang PDF 37. Nội dung trong panel là bản gốc.

### Cách đọc và giải thích

C035 đặt phụ thuộc “con mèo” với “đang ngủ” cạnh sơ đồ chấm điểm từng vector. C037 dùng query (1;0), bốn vector gốc, score (0;0;0;2) và softmax gần (0,096;0,096;0,096;0,711). Thứ tự đọc là so query với key, chuẩn hóa score, rồi tổng value có trọng số. Lời giải trước đó tính vector kết quả gần (1,4225;0).

**Tự kiểm tra (áp dụng cho các panel trên):** Tại sao hai value có chiều thứ hai đối nhau không còn trong chiều thứ hai của kết quả?

**Đáp án và ý nghĩa:** Chúng nhận cùng trọng số và có giá trị một với âm một nên triệt tiêu. Trọng số lớn nhất vẫn thuộc vector thứ tư.
-->


---

<div class="track"><span>10 – Attention và Transformer</span><span>ML tổng hợp</span></div>

# Attention: ví dụ tính tay



$$
q=[1,0]^\top,\quad x_1=[0,1]^\top,\quad x_2=[0,0]^\top,\quad x_3=[0,-1]^\top,\quad x_4=[2,0]^\top
$$


<div class="step" v-click><b>01</b><span>Dot-product cho score (0,0,0,2)</span></div>

<div class="step" v-click><b>02</b><span>Softmax ≈ (0,0963, 0,0963, 0,0963, 0,7112)</span></div>


<div class="answer" v-click>Tổng có trọng số ≈ <b>(1,4225, 0)</b></div>



<div class="note">Ví dụ gốc dùng cùng vector làm key và value, chưa chia tỷ lệ căn bậc hai</div>



<!--
Nguồn: Hoc_may_Tong_hop_chuyen_sau_3_bai_giang.pdf, trang 115, 118.



Một **query** biểu diễn điều đang cần tìm. **Key** dùng để đánh giá độ liên quan. **Value** là nội dung được kết hợp. Ví dụ đơn giản trong slide dùng cùng vector đầu vào làm key và value, chưa thêm phép chiếu học được.

$$q=\begin{bmatrix}1\\0\end{bmatrix},\quad
x_1=\begin{bmatrix}0\\1\end{bmatrix},\quad
x_2=\begin{bmatrix}0\\0\end{bmatrix},\quad
x_3=\begin{bmatrix}0\\-1\end{bmatrix},\quad
x_4=\begin{bmatrix}2\\0\end{bmatrix}.$$

### Bước 1. Tính điểm tương thích

$$s_j=q^\top x_j\quad\Rightarrow\quad s=[0,0,0,2].$$

### Bước 2. Softmax các điểm số

$$\alpha_j=\frac{e^{s_j}}{\sum_k e^{s_k}},\qquad
\alpha\approx[0.0963,0.0963,0.0963,0.7112].$$

### Bước 3. Tổng có trọng số của value

$$c=\sum_{j=1}^4\alpha_jx_j
\approx\begin{bmatrix}1.4225\\0\end{bmatrix}.$$

Hai đóng góp ở chiều thứ hai từ $x_1$ và $x_3$ triệt tiêu nhau. Vector thứ tư được chú ý mạnh nhất vì có tích vô hướng lớn nhất với query.

**Chú ý:** ví dụ này dùng dot-product chưa chia tỷ lệ. Scaled dot-product attention của Transformer ở trang sau có thêm hệ số căn bậc hai của chiều key, nên trọng số có thể khác nếu áp dụng trực tiếp.

Panel C035 • Bản render nguyên trang từ [C], trang PDF 35. Nội dung trong panel là bản gốc.

Panel C037 • Bản render nguyên trang từ [C], trang PDF 37. Nội dung trong panel là bản gốc.

### Cách đọc và giải thích

C035 đặt phụ thuộc “con mèo” với “đang ngủ” cạnh sơ đồ chấm điểm từng vector. C037 dùng query (1;0), bốn vector gốc, score (0;0;0;2) và softmax gần (0,096;0,096;0,096;0,711). Thứ tự đọc là so query với key, chuẩn hóa score, rồi tổng value có trọng số. Lời giải trước đó tính vector kết quả gần (1,4225;0).

**Tự kiểm tra (áp dụng cho các panel trên):** Tại sao hai value có chiều thứ hai đối nhau không còn trong chiều thứ hai của kết quả?

**Đáp án và ý nghĩa:** Chúng nhận cùng trọng số và có giá trị một với âm một nên triệt tiêu. Trọng số lớn nhất vẫn thuộc vector thứ tư.
-->


---

<div class="track"><span>10 – Attention và Transformer</span><span>ML tổng hợp</span></div>

# Self-attention và Q–K–V



$$
Q=HW_Q,\qquad K=HW_K,\qquad V=HW_V
$$



$$
\operatorname{Attention}(Q,K,V)=\operatorname{softmax}\left(\frac{QK^\top}{\sqrt{d_k}}+M\right)V
$$


- Token đặt theo hàng: ma trận score có kích thước $T\times T$
- Softmax theo từng hàng, đầu ra vẫn là chuỗi vector


<!--
Nguồn: Hoc_may_Tong_hop_chuyen_sau_3_bai_giang.pdf, trang 116, 119.



**Self-attention** dùng cùng một chuỗi làm nguồn query, key và value. Mỗi vị trí đặt một câu hỏi riêng và nhận một vector kết hợp riêng. Vì vậy, đầu ra vẫn là một chuỗi vector có ngữ cảnh, chưa phải một vector duy nhất của cả câu.

Quy ước ở phần này đặt token theo **hàng**: $H\in\mathbb R^{T\times d}$. Các phép chiếu học được là:

$$Q=HW_Q,\qquad K=HW_K,\qquad V=HW_V.$$

$$\operatorname{Attention}(Q,K,V)
=\operatorname{softmax}\!\left(\frac{QK^\top}{\sqrt{d_k}}+M\right)V.$$

Ma trận $QK^\top$ có kích thước $T\times T$. Phần tử hàng $i$, cột $j$ đo mức tương thích giữa query vị trí $i$ và key vị trí $j$. Softmax thực hiện theo từng hàng.

### Các thành phần cần hiểu

- **Chia cho $\sqrt{d_k}$:** hạn chế độ lớn score tăng theo chiều vector, giúp softmax hoạt động ổn định hơn.
- **Mask $M$:** dùng giá trị âm vô cùng tại vị trí không được nhìn, như padding hoặc token tương lai trong causal attention.
- **Multi-head:** nhiều bộ chiếu học các quan hệ khác nhau, sau đó nối kết quả và chiếu về kích thước mong muốn.
- **Thông tin vị trí:** phải bổ sung vị trí hoặc cơ chế tương đương, vì self-attention thuần túy không tự biết thứ tự chỉ từ tập các vector nội dung.

**Cross-attention** lấy query từ một chuỗi và key/value từ chuỗi khác. Với attention đầy đủ, ma trận điểm số tăng theo bình phương chiều dài chuỗi. Có thể xử lý song song các vị trí khi huấn luyện, nhưng sinh tự hồi quy vẫn tạo token theo thứ tự.

Panel C038 • Bản render nguyên trang từ [C], trang PDF 38. Nội dung trong panel là bản gốc.

Panel C039 • Bản render nguyên trang từ [C], trang PDF 39. Nội dung trong panel là bản gốc.

### Cách đọc và giải thích

C038 áp dụng Attention với từng vị trí lần lượt làm query, tạo chuỗi đầu ra mới. C039 có đường tắt giữ x rồi cộng với nhánh f(x). Attention giúp trao đổi nội dung giữa token; residual giúp giữ luồng thông tin và cung cấp nhánh gradient đồng nhất. Đây là hai cơ chế khác nhau trong khối Transformer.

C039 dùng từ “đảm bảo”. Bản tổng hợp giải thích có giới hạn: hỗ trợ truyền gradient, không phải định lý ổn định cho mọi mạng.

**Tự kiểm tra (áp dụng cho các panel trên):** Residual có bảo đảm tuyệt đối gradient không bao giờ biến mất hoặc bùng nổ không?

**Đáp án và ý nghĩa:** Không. Nó tạo thêm đường truyền thuận lợi, nhưng hành vi toàn mạng còn phụ thuộc các phép biến đổi, scale, chuẩn hóa và cách tối ưu.
-->


---

<div class="track"><span>10 – Attention và Transformer</span><span>ML tổng hợp</span></div>

# Mask, vị trí và multi-head


| Cơ chế | Mục đích |
|---|---|
| Chia $\sqrt{d_k}$ | Giữ score ở thang phù hợp |
| Padding mask | Bỏ vị trí đệm |
| Causal mask | Không nhìn token tương lai |
| Thông tin vị trí | Cung cấp thứ tự token |
| Multi-head | Nhiều bộ chiếu học các quan hệ khác nhau |


<div class="note">Cross-attention lấy query và key/value từ các chuỗi khác nhau. Attention đầy đủ có ma trận score tăng theo T²</div>



<!--
Nguồn: Hoc_may_Tong_hop_chuyen_sau_3_bai_giang.pdf, trang 116.



**Self-attention** dùng cùng một chuỗi làm nguồn query, key và value. Mỗi vị trí đặt một câu hỏi riêng và nhận một vector kết hợp riêng. Vì vậy, đầu ra vẫn là một chuỗi vector có ngữ cảnh, chưa phải một vector duy nhất của cả câu.

Quy ước ở phần này đặt token theo **hàng**: $H\in\mathbb R^{T\times d}$. Các phép chiếu học được là:

$$Q=HW_Q,\qquad K=HW_K,\qquad V=HW_V.$$

$$\operatorname{Attention}(Q,K,V)
=\operatorname{softmax}\!\left(\frac{QK^\top}{\sqrt{d_k}}+M\right)V.$$

Ma trận $QK^\top$ có kích thước $T\times T$. Phần tử hàng $i$, cột $j$ đo mức tương thích giữa query vị trí $i$ và key vị trí $j$. Softmax thực hiện theo từng hàng.

### Các thành phần cần hiểu

- **Chia cho $\sqrt{d_k}$:** hạn chế độ lớn score tăng theo chiều vector, giúp softmax hoạt động ổn định hơn.
- **Mask $M$:** dùng giá trị âm vô cùng tại vị trí không được nhìn, như padding hoặc token tương lai trong causal attention.
- **Multi-head:** nhiều bộ chiếu học các quan hệ khác nhau, sau đó nối kết quả và chiếu về kích thước mong muốn.
- **Thông tin vị trí:** phải bổ sung vị trí hoặc cơ chế tương đương, vì self-attention thuần túy không tự biết thứ tự chỉ từ tập các vector nội dung.

**Cross-attention** lấy query từ một chuỗi và key/value từ chuỗi khác. Với attention đầy đủ, ma trận điểm số tăng theo bình phương chiều dài chuỗi. Có thể xử lý song song các vị trí khi huấn luyện, nhưng sinh tự hồi quy vẫn tạo token theo thứ tự.
-->


---

<div class="track"><span>10 – Attention và Transformer</span><span>ML tổng hợp</span></div>

# Residual connection



$$
y=x+f(x),\qquad\frac{\partial y}{\partial x}=I+\frac{\partial f(x)}{\partial x}
$$


<figure><img src="/images/residual.png" style="max-height:180px" alt="Đường tắt và nhánh xử lý, panel C039"/><figcaption>Đường tắt và nhánh xử lý, panel C039</figcaption></figure>


<div class="note">Tạo đường truyền thông tin và gradient trực tiếp. Hai nhánh phải có kích thước phù hợp. Nó hỗ trợ, không bảo đảm tuyệt đối ổn định gradient</div>



<!--
Nguồn: Hoc_may_Tong_hop_chuyen_sau_3_bai_giang.pdf, trang 117, 119.



### Residual connection: thêm đường truyền trực tiếp

Thay vì chỉ xuất $f(x)$, khối residual xuất $x+f(x)$. Hai nhánh cần cùng kích thước hoặc phải có phép chiếu để cộng được.

$$y=x+f(x),\qquad
\frac{\partial y}{\partial x}=I+\frac{\partial f(x)}{\partial x}.$$

Thành phần đồng nhất tạo một đường truyền trực tiếp cho thông tin và gradient. Nó hỗ trợ tối ưu mạng sâu, nhưng không bảo đảm mọi gradient luôn ổn định trong mọi kiến trúc.

### Layer normalization: chuẩn hóa trong một token

Với vector token có $d$ chiều:

$$\mu=\frac1d\sum_jx_j,\quad
\sigma^2=\frac1d\sum_j(x_j-\mu)^2,\quad
\operatorname{LN}(x)_j=\gamma_j\frac{x_j-\mu}{\sqrt{\sigma^2+\epsilon}}+\beta_j.$$

Ví dụ $x=[100,200,300]$, bỏ qua epsilon rất nhỏ và dùng scale bằng một, shift bằng không, đầu ra xấp xỉ $[-1.2247,0,1.2247]$. LayerNorm còn có scale $\gamma$ và shift $\beta$ học được. Nó khác việc chuẩn hóa dữ liệu train và khác batch normalization.

### Ghép thành Transformer block

Một cách sắp xếp post-norm tương ứng với minh họa trong slide là:

$$U=\operatorname{LN}(H+\operatorname{Attention}(H)),\qquad
H'=\operatorname{LN}(U+\operatorname{FFN}(U)).$$

FFN là mạng truyền thẳng áp dụng riêng tại mỗi vị trí, dùng chung tham số. Attention trao đổi thông tin giữa token, FFN biến đổi biểu diễn của từng token. Có biến thể pre-norm đặt chuẩn hóa trước các nhánh con.

**Hiệu chỉnh thuật ngữ:** tiêu đề “Layer information” trong slide được hiểu là **Layer Normalization** dựa trên công thức và phần giải thích đi kèm.

Panel C038 • Bản render nguyên trang từ [C], trang PDF 38. Nội dung trong panel là bản gốc.

Panel C039 • Bản render nguyên trang từ [C], trang PDF 39. Nội dung trong panel là bản gốc.

### Cách đọc và giải thích

C038 áp dụng Attention với từng vị trí lần lượt làm query, tạo chuỗi đầu ra mới. C039 có đường tắt giữ x rồi cộng với nhánh f(x). Attention giúp trao đổi nội dung giữa token; residual giúp giữ luồng thông tin và cung cấp nhánh gradient đồng nhất. Đây là hai cơ chế khác nhau trong khối Transformer.

C039 dùng từ “đảm bảo”. Bản tổng hợp giải thích có giới hạn: hỗ trợ truyền gradient, không phải định lý ổn định cho mọi mạng.

**Tự kiểm tra (áp dụng cho các panel trên):** Residual có bảo đảm tuyệt đối gradient không bao giờ biến mất hoặc bùng nổ không?

**Đáp án và ý nghĩa:** Không. Nó tạo thêm đường truyền thuận lợi, nhưng hành vi toàn mạng còn phụ thuộc các phép biến đổi, scale, chuẩn hóa và cách tối ưu.
-->


---

<div class="track"><span>10 – Attention và Transformer</span><span>ML tổng hợp</span></div>

# Layer normalization



$$
\mu=\frac1d\sum_jx_j,\quad\sigma^2=\frac1d\sum_j(x_j-\mu)^2
$$



$$
\operatorname{LN}(x)_j=\gamma_j\frac{x_j-\mu}{\sqrt{\sigma^2+\epsilon}}+\beta_j
$$


Ví dụ: $[100,200,300]$ thành khoảng $[-1.2247,0,1.2247]$<br/>
Giả sử scale = 1, shift = 0, epsilon rất nhỏ


<div class="note">Chuẩn hóa các chiều trong một token. Khác chuẩn hóa dữ liệu train và batch normalization</div>



<!--
Nguồn: Hoc_may_Tong_hop_chuyen_sau_3_bai_giang.pdf, trang 117, 120.



### Residual connection: thêm đường truyền trực tiếp

Thay vì chỉ xuất $f(x)$, khối residual xuất $x+f(x)$. Hai nhánh cần cùng kích thước hoặc phải có phép chiếu để cộng được.

$$y=x+f(x),\qquad
\frac{\partial y}{\partial x}=I+\frac{\partial f(x)}{\partial x}.$$

Thành phần đồng nhất tạo một đường truyền trực tiếp cho thông tin và gradient. Nó hỗ trợ tối ưu mạng sâu, nhưng không bảo đảm mọi gradient luôn ổn định trong mọi kiến trúc.

### Layer normalization: chuẩn hóa trong một token

Với vector token có $d$ chiều:

$$\mu=\frac1d\sum_jx_j,\quad
\sigma^2=\frac1d\sum_j(x_j-\mu)^2,\quad
\operatorname{LN}(x)_j=\gamma_j\frac{x_j-\mu}{\sqrt{\sigma^2+\epsilon}}+\beta_j.$$

Ví dụ $x=[100,200,300]$, bỏ qua epsilon rất nhỏ và dùng scale bằng một, shift bằng không, đầu ra xấp xỉ $[-1.2247,0,1.2247]$. LayerNorm còn có scale $\gamma$ và shift $\beta$ học được. Nó khác việc chuẩn hóa dữ liệu train và khác batch normalization.

### Ghép thành Transformer block

Một cách sắp xếp post-norm tương ứng với minh họa trong slide là:

$$U=\operatorname{LN}(H+\operatorname{Attention}(H)),\qquad
H'=\operatorname{LN}(U+\operatorname{FFN}(U)).$$

FFN là mạng truyền thẳng áp dụng riêng tại mỗi vị trí, dùng chung tham số. Attention trao đổi thông tin giữa token, FFN biến đổi biểu diễn của từng token. Có biến thể pre-norm đặt chuẩn hóa trước các nhánh con.

**Hiệu chỉnh thuật ngữ:** tiêu đề “Layer information” trong slide được hiểu là **Layer Normalization** dựa trên công thức và phần giải thích đi kèm.

Panel C040 • Bản render nguyên trang từ [C], trang PDF 40. Nội dung trong panel là bản gốc.

Panel C041 • Bản render nguyên trang từ [C], trang PDF 41. Nội dung trong panel là bản gốc.

### Cách đọc và giải thích

C040 chuẩn hóa vector ví dụ (100;200;300) về gần (−1,225;0;1,225), rồi mô tả AddNorm. C041 ghép attention và feedforward với AddNorm. Đọc bên trong ra ngoài để hiểu thứ tự phép hợp. [DIỄN GIẢI] LayerNorm chuẩn hóa theo các chiều trong một token, còn FFN dùng cùng trọng số để biến đổi từng vị trí.

Tên “Layer information” được sửa thành Layer Normalization dựa trên công thức. Công thức đầy đủ của phần diễn giải có thêm scale và shift học được.

**Tự kiểm tra (áp dụng cho các panel trên):** Nếu tất cả chiều của một token có cùng giá trị, vì sao cần epsilon ở mẫu số LayerNorm?

**Đáp án và ý nghĩa:** Phương sai khi đó bằng không. Epsilon giúp tránh phép chia không xác định, trước khi áp dụng scale/shift học được.
-->


---

<div class="track"><span>10 – Attention và Transformer</span><span>ML tổng hợp</span></div>

# Một khối Transformer



$$
U=\operatorname{LN}(H+\operatorname{Attention}(H))
$$



$$
H^\prime=\operatorname{LN}(U+\operatorname{FFN}(U))
$$


| Khối | Vai trò |
|---|---|
| Attention | Kết hợp giữa các vị trí |
| FFN | Biến đổi từng vị trí, dùng chung trọng số |
| Residual + LayerNorm | Hỗ trợ luồng thông tin và thang giá trị |


<div class="note">Đây là cách sắp post-norm. Pre-norm đặt chuẩn hóa trước nhánh con</div>



<!--
Nguồn: Hoc_may_Tong_hop_chuyen_sau_3_bai_giang.pdf, trang 117, 120, 121.



### Residual connection: thêm đường truyền trực tiếp

Thay vì chỉ xuất $f(x)$, khối residual xuất $x+f(x)$. Hai nhánh cần cùng kích thước hoặc phải có phép chiếu để cộng được.

$$y=x+f(x),\qquad
\frac{\partial y}{\partial x}=I+\frac{\partial f(x)}{\partial x}.$$

Thành phần đồng nhất tạo một đường truyền trực tiếp cho thông tin và gradient. Nó hỗ trợ tối ưu mạng sâu, nhưng không bảo đảm mọi gradient luôn ổn định trong mọi kiến trúc.

### Layer normalization: chuẩn hóa trong một token

Với vector token có $d$ chiều:

$$\mu=\frac1d\sum_jx_j,\quad
\sigma^2=\frac1d\sum_j(x_j-\mu)^2,\quad
\operatorname{LN}(x)_j=\gamma_j\frac{x_j-\mu}{\sqrt{\sigma^2+\epsilon}}+\beta_j.$$

Ví dụ $x=[100,200,300]$, bỏ qua epsilon rất nhỏ và dùng scale bằng một, shift bằng không, đầu ra xấp xỉ $[-1.2247,0,1.2247]$. LayerNorm còn có scale $\gamma$ và shift $\beta$ học được. Nó khác việc chuẩn hóa dữ liệu train và khác batch normalization.

### Ghép thành Transformer block

Một cách sắp xếp post-norm tương ứng với minh họa trong slide là:

$$U=\operatorname{LN}(H+\operatorname{Attention}(H)),\qquad
H'=\operatorname{LN}(U+\operatorname{FFN}(U)).$$

FFN là mạng truyền thẳng áp dụng riêng tại mỗi vị trí, dùng chung tham số. Attention trao đổi thông tin giữa token, FFN biến đổi biểu diễn của từng token. Có biến thể pre-norm đặt chuẩn hóa trước các nhánh con.

**Hiệu chỉnh thuật ngữ:** tiêu đề “Layer information” trong slide được hiểu là **Layer Normalization** dựa trên công thức và phần giải thích đi kèm.

Panel C040 • Bản render nguyên trang từ [C], trang PDF 40. Nội dung trong panel là bản gốc.

Panel C041 • Bản render nguyên trang từ [C], trang PDF 41. Nội dung trong panel là bản gốc.

### Cách đọc và giải thích

C040 chuẩn hóa vector ví dụ (100;200;300) về gần (−1,225;0;1,225), rồi mô tả AddNorm. C041 ghép attention và feedforward với AddNorm. Đọc bên trong ra ngoài để hiểu thứ tự phép hợp. [DIỄN GIẢI] LayerNorm chuẩn hóa theo các chiều trong một token, còn FFN dùng cùng trọng số để biến đổi từng vị trí.

Tên “Layer information” được sửa thành Layer Normalization dựa trên công thức. Công thức đầy đủ của phần diễn giải có thêm scale và shift học được.

**Tự kiểm tra (áp dụng cho các panel trên):** Nếu tất cả chiều của một token có cùng giá trị, vì sao cần epsilon ở mẫu số LayerNorm?

**Đáp án và ý nghĩa:** Phương sai khi đó bằng không. Epsilon giúp tránh phép chia không xác định, trước khi áp dụng scale/shift học được.

### Ghi nhớ theo vai trò học thuật

| Mức | Nội dung | Cần hiểu hoặc làm được |
|---|---|---|
| A | Attention | Score → softmax → tổng value. |
| A | Self-attention | Mỗi vị trí có một vector đầu ra. |
| B | Mask / vị trí | Ngăn nhìn chỗ không hợp lệ và bổ sung thứ tự. |
| B | Residual / LayerNorm / FFN | Ba vai trò khác nhau, không thay thế nhau. |

### So sánh và điểm dễ nhầm

| Cơ chế | Đối tượng biến đổi |
|---|---|
| Attention | Quan hệ giữa vị trí |
| FFN | Biểu diễn ở từng vị trí |
| LayerNorm | Thang giá trị theo chiều feature của token |

### Liên hệ với chương khác

Chương 11 đặt các khối này vào BERT hỏi đáp và mô hình sinh tự hồi quy.

### Đối chiếu hình và ví dụ của chương

| Nguồn / mã panel | Nội dung | Vị trí | Trạng thái |
|---|---|---|---|
| C035, C037 | Attention từ trực giác tới số cụ thể | Trang 118 | Đã giữ và giải thích |
| C038, C039 | Self-attention và nhánh residual | Trang 119 | Đã giữ và giải thích |
| C040, C041 | Chuẩn hóa và khối Transformer | Trang 120 | Đã giữ và giải thích |
-->


---

<div class="track"><span>10 – Attention và Transformer</span><span>ML tổng hợp</span></div>

# Tự luyện – Self-attention tự thu cả câu thành một vector?



<div class="answer" v-click>Không. Thường có một vector ngữ cảnh tại mỗi vị trí. Tác vụ phân loại cả câu cần cách lấy đại diện phù hợp.</div>



<div class="note">Thử trả lời trước khi bấm Tiếp</div>



<!--
Nguồn: Hoc_may_Tong_hop_chuyen_sau_3_bai_giang.pdf, trang 116, 170.



**Self-attention** dùng cùng một chuỗi làm nguồn query, key và value. Mỗi vị trí đặt một câu hỏi riêng và nhận một vector kết hợp riêng. Vì vậy, đầu ra vẫn là một chuỗi vector có ngữ cảnh, chưa phải một vector duy nhất của cả câu.

Quy ước ở phần này đặt token theo **hàng**: $H\in\mathbb R^{T\times d}$. Các phép chiếu học được là:

$$Q=HW_Q,\qquad K=HW_K,\qquad V=HW_V.$$

$$\operatorname{Attention}(Q,K,V)
=\operatorname{softmax}\!\left(\frac{QK^\top}{\sqrt{d_k}}+M\right)V.$$

Ma trận $QK^\top$ có kích thước $T\times T$. Phần tử hàng $i$, cột $j$ đo mức tương thích giữa query vị trí $i$ và key vị trí $j$. Softmax thực hiện theo từng hàng.

### Các thành phần cần hiểu

- **Chia cho $\sqrt{d_k}$:** hạn chế độ lớn score tăng theo chiều vector, giúp softmax hoạt động ổn định hơn.
- **Mask $M$:** dùng giá trị âm vô cùng tại vị trí không được nhìn, như padding hoặc token tương lai trong causal attention.
- **Multi-head:** nhiều bộ chiếu học các quan hệ khác nhau, sau đó nối kết quả và chiếu về kích thước mong muốn.
- **Thông tin vị trí:** phải bổ sung vị trí hoặc cơ chế tương đương, vì self-attention thuần túy không tự biết thứ tự chỉ từ tập các vector nội dung.

**Cross-attention** lấy query từ một chuỗi và key/value từ chuỗi khác. Với attention đầy đủ, ma trận điểm số tăng theo bình phương chiều dài chuỗi. Có thể xử lý song song các vị trí khi huấn luyện, nhưng sinh tự hồi quy vẫn tạo token theo thứ tự.

**[CÂU HỎI BIÊN SOẠN]** Dựa trên nội dung chương. Hãy tự trả lời trước rồi mới xem phần giải thích dưới từng câu.

### 10.1 • Ghi nhớ

**Query, key, value có vai trò nào?**

Query là nhu cầu truy vấn, key dùng so độ liên quan, value là nội dung được tổng hợp theo trọng số.

### 10.2 • Thông hiểu

**Attention và FFN khác gì trong Transformer?**

Attention kết hợp giữa vị trí, FFN biến đổi riêng từng vị trí bằng cùng tham số. Residual/LayerNorm hỗ trợ luồng và thang giá trị.

### 10.3 • Vận dụng

**Score (0;0;0;2) cho trọng số lớn nhất bao nhiêu?**

Vector thứ tư nhận $e^2/(3+e^2)$, xấp xỉ 0,7112. Ba vector còn lại nhận khoảng 0,0963 mỗi vector.

### 10.4 • Phân tích

**Tại sao thêm mask tương lai khi dự đoán token sau?**

Để mô hình không dùng đáp án tương lai trong tiền tố lúc huấn luyện. Không mask sẽ làm sai thiết lập dự đoán có điều kiện trước đó.

### 10.5 • Đánh giá

**Self-attention có sẵn thứ tự từ chỉ vì đầu vào là một chuỗi không?**

Chưa đủ. Cần thông tin vị trí hoặc cơ chế tương đương. Phép attention thuần trên các vector nội dung không tự xác định thứ tự mong muốn.
-->


---

<div class="track"><span>11 – BERT, mô hình ngôn ngữ và sinh chuỗi</span><span>ML tổng hợp</span></div>

# BERT và hỏi đáp theo đoạn


<figure><img src="/images/bert.png" style="max-height:270px" alt="Câu hỏi và đoạn văn đi vào BERT, hai đầu Start/End chọn span, panel C044"/><figcaption>Câu hỏi và đoạn văn đi vào BERT, hai đầu Start/End chọn span, panel C044</figcaption></figure>


<div class="note">Ví dụ chọn cụm “bệnh nặng”. Con số 24 khối trong nguồn là một cấu hình, không áp dụng cho mọi BERT</div>



<!--
Nguồn: Hoc_may_Tong_hop_chuyen_sau_3_bai_giang.pdf, trang 123, 125.



**BERT** dùng các khối Transformer encoder để tạo biểu diễn theo ngữ cảnh. Trong cách dùng hai chiều thông thường, một token có thể kết hợp thông tin từ các vị trí trước và sau trong chuỗi đầu vào, với các vị trí hợp lệ theo attention mask.

### Đọc hình hỏi đáp

Đầu vào thường ghép câu hỏi và đoạn văn cùng các token đặc biệt. Sau nhiều lớp, mỗi token có vector chứa ngữ cảnh của câu hỏi và đoạn văn. Hai bộ phân loại chấm điểm token có khả năng là **đầu** và **cuối** câu trả lời.

$$p_i^{\rm start}=\operatorname{softmax}_i(w_s^\top h_i),\qquad
p_i^{\rm end}=\operatorname{softmax}_i(w_e^\top h_i).$$

Với câu hỏi về cha Tấm, cặp vị trí có thể bao quanh cụm “bệnh nặng”. Đây là **extractive question answering**: chọn một đoạn trong văn bản, khác với tự sinh ra câu trả lời token từng bước.

### Hai điểm không nên học máy móc từ hình

Hình nguồn minh họa một cấu hình BERT có 24 khối. Không phải mọi biến thể BERT đều có cùng số lớp. Chọn cặp start/end cũng phải bảo đảm đáp án nằm trong đoạn văn và vị trí cuối không trước vị trí đầu.

BERT là ví dụ về biểu diễn ngôn ngữ có ngữ cảnh. Transformer là kiến trúc rộng hơn và còn có cấu hình decoder để sinh tự hồi quy hoặc encoder–decoder cho ánh xạ giữa hai chuỗi.

Panel C044 • Bản render nguyên trang từ [C], trang PDF 44. Nội dung trong panel là bản gốc.

### Cách đọc và giải thích

C044 giữ sơ đồ câu hỏi/đoạn văn đi qua embedding, Transformer và hai đầu Start/End. Các đầu chọn token đầu và cuối của câu trả lời trong đoạn, ví dụ cụm “bệnh nặng”. Đọc riêng hai phân phối vị trí, không xem đó là hai token mới được mô hình tự sinh. Biểu diễn token được làm giàu qua nhiều khối.

Số 24 trong hình là cấu hình minh họa, không phải mọi biến thể BERT đều có 24 khối.

**Tự kiểm tra (áp dụng cho các panel trên):** Hai chỉ số Start và End phải thỏa điều kiện gì để thành span hợp lệ?

**Đáp án và ý nghĩa:** Phải nằm trong phần văn bản được cho phép và vị trí cuối không trước vị trí đầu. Các ràng buộc khác phụ thuộc quy trình giải mã.
-->


---

<div class="track"><span>11 – BERT, mô hình ngôn ngữ và sinh chuỗi</span><span>ML tổng hợp</span></div>

# Chọn span và sinh token


| Cách dùng | Đầu ra trực tiếp |
|---|---|
| BERT extractive QA | Vị trí đầu/cuối trong đoạn |
| LM tự hồi quy | Phân phối token kế tiếp |


$$
p_i^{\rm start}=\operatorname{softmax}_i(w_s^\top h_i),\quad p_i^{\rm end}=\operatorname{softmax}_i(w_e^\top h_i)
$$



<div class="note">Span phải thuộc phần văn bản hợp lệ, vị trí cuối không trước vị trí đầu</div>



<!--
Nguồn: Hoc_may_Tong_hop_chuyen_sau_3_bai_giang.pdf, trang 123, 125.



**BERT** dùng các khối Transformer encoder để tạo biểu diễn theo ngữ cảnh. Trong cách dùng hai chiều thông thường, một token có thể kết hợp thông tin từ các vị trí trước và sau trong chuỗi đầu vào, với các vị trí hợp lệ theo attention mask.

### Đọc hình hỏi đáp

Đầu vào thường ghép câu hỏi và đoạn văn cùng các token đặc biệt. Sau nhiều lớp, mỗi token có vector chứa ngữ cảnh của câu hỏi và đoạn văn. Hai bộ phân loại chấm điểm token có khả năng là **đầu** và **cuối** câu trả lời.

$$p_i^{\rm start}=\operatorname{softmax}_i(w_s^\top h_i),\qquad
p_i^{\rm end}=\operatorname{softmax}_i(w_e^\top h_i).$$

Với câu hỏi về cha Tấm, cặp vị trí có thể bao quanh cụm “bệnh nặng”. Đây là **extractive question answering**: chọn một đoạn trong văn bản, khác với tự sinh ra câu trả lời token từng bước.

### Hai điểm không nên học máy móc từ hình

Hình nguồn minh họa một cấu hình BERT có 24 khối. Không phải mọi biến thể BERT đều có cùng số lớp. Chọn cặp start/end cũng phải bảo đảm đáp án nằm trong đoạn văn và vị trí cuối không trước vị trí đầu.

BERT là ví dụ về biểu diễn ngôn ngữ có ngữ cảnh. Transformer là kiến trúc rộng hơn và còn có cấu hình decoder để sinh tự hồi quy hoặc encoder–decoder cho ánh xạ giữa hai chuỗi.

Panel C044 • Bản render nguyên trang từ [C], trang PDF 44. Nội dung trong panel là bản gốc.

### Cách đọc và giải thích

C044 giữ sơ đồ câu hỏi/đoạn văn đi qua embedding, Transformer và hai đầu Start/End. Các đầu chọn token đầu và cuối của câu trả lời trong đoạn, ví dụ cụm “bệnh nặng”. Đọc riêng hai phân phối vị trí, không xem đó là hai token mới được mô hình tự sinh. Biểu diễn token được làm giàu qua nhiều khối.

Số 24 trong hình là cấu hình minh họa, không phải mọi biến thể BERT đều có 24 khối.

**Tự kiểm tra (áp dụng cho các panel trên):** Hai chỉ số Start và End phải thỏa điều kiện gì để thành span hợp lệ?

**Đáp án và ý nghĩa:** Phải nằm trong phần văn bản được cho phép và vị trí cuối không trước vị trí đầu. Các ràng buộc khác phụ thuộc quy trình giải mã.
-->


---

<div class="track"><span>11 – BERT, mô hình ngôn ngữ và sinh chuỗi</span><span>ML tổng hợp</span></div>

# Mô hình ngôn ngữ tự hồi quy



$$
s_v=h^\top u_v+b_v,\qquad p(x_t=v\mid x_{<t})=\operatorname{softmax}(s)_v
$$



$$
p(x_{1:T})=\prod_{t=1}^Tp(x_t\mid x_{<t})
$$



$$
\mathcal L=-\sum_t\log p(x_t\mid x_{<t})
$$



<div class="note">Sinh token, ghép vào tiền tố, rồi lặp tới token kết thúc hoặc giới hạn độ dài</div>



<!--
Nguồn: Hoc_may_Tong_hop_chuyen_sau_3_bai_giang.pdf, trang 124, 126.



Mô hình ngôn ngữ tự hồi quy dự đoán token kế tiếp từ các token trước đó. Một vector ngữ cảnh được chuyển thành logits trên toàn bộ từ vựng rồi qua softmax.

$$s_v=h^\top u_v+b_v,\qquad
p(x_t=v\mid x_{“Collapse” hữu ích khi cần một vector cho cả câu, nhưng không phải mọi mô hình ngôn ngữ đều phải lấy trung bình cả chuỗi. Decoder tự hồi quy thường dùng hidden state ở vị trí cần dự đoán, với cơ chế che tương lai phù hợp.

Panel C045 • Bản render nguyên trang từ [C], trang PDF 45. Nội dung trong panel là bản gốc.

Panel C046 • Bản render nguyên trang từ [C], trang PDF 46. Nội dung trong panel là bản gốc.

### Cách đọc và giải thích

C045 đối chiếu tra embedding token→vector và chấm điểm ứng viên vector→token, dùng tiền tố “Tôi thích nuôi”. C046 lặp dự đoán token tiếp theo để sinh chuỗi. C047 giữ ví dụ “Chiếc xe màu đỏ” → “The red car”. [DIỄN GIẢI] Score ứng viên cần được chuyển thành phân phối để học/xử lý lựa chọn, và chuỗi nguồn phải được cung cấp dưới một cơ chế có điều kiện phù hợp. Panel còn lại của nhóm được phóng riêng ở trang kế tiếp.

**Tự kiểm tra (áp dụng cho các panel trên):** Vì sao sinh một token có xác suất cao nhất mỗi lần chưa bảo đảm cả câu có xác suất lớn nhất?

**Đáp án và ý nghĩa:** Greedy chỉ chọn tốt nhất cục bộ. Một lựa chọn sớm thay đổi phân phối các bước sau, nên chuỗi kết quả không nhất thiết là tối ưu toàn cục.
-->


---

<div class="track"><span>11 – BERT, mô hình ngôn ngữ và sinh chuỗi</span><span>ML tổng hợp</span></div>

# Huấn luyện, giải mã và seq2seq


- **Teacher forcing**: dùng token thật trước đó trong lúc train
- **Greedy**: chọn token xác suất lớn nhất mỗi bước
- **Sampling**: lấy mẫu từ phân phối, có thể tạo nhiều đầu ra
- **Seq2seq**: đầu ra còn phụ thuộc chuỗi nguồn


$$
p(y_{1:T}\mid x)=\prod_t p(y_t\mid y_{<t},x)
$$



<div class="note">Ví dụ gốc: “Chiếc xe màu đỏ” thành “The red car”. Greedy tối ưu cục bộ, chưa bảo đảm câu tốt nhất</div>



<!--
Nguồn: Hoc_may_Tong_hop_chuyen_sau_3_bai_giang.pdf, trang 124, 126, 127.



Mô hình ngôn ngữ tự hồi quy dự đoán token kế tiếp từ các token trước đó. Một vector ngữ cảnh được chuyển thành logits trên toàn bộ từ vựng rồi qua softmax.

$$s_v=h^\top u_v+b_v,\qquad
p(x_t=v\mid x_{“Collapse” hữu ích khi cần một vector cho cả câu, nhưng không phải mọi mô hình ngôn ngữ đều phải lấy trung bình cả chuỗi. Decoder tự hồi quy thường dùng hidden state ở vị trí cần dự đoán, với cơ chế che tương lai phù hợp.

Panel C045 • Bản render nguyên trang từ [C], trang PDF 45. Nội dung trong panel là bản gốc.

Panel C046 • Bản render nguyên trang từ [C], trang PDF 46. Nội dung trong panel là bản gốc.

### Cách đọc và giải thích

C045 đối chiếu tra embedding token→vector và chấm điểm ứng viên vector→token, dùng tiền tố “Tôi thích nuôi”. C046 lặp dự đoán token tiếp theo để sinh chuỗi. C047 giữ ví dụ “Chiếc xe màu đỏ” → “The red car”. [DIỄN GIẢI] Score ứng viên cần được chuyển thành phân phối để học/xử lý lựa chọn, và chuỗi nguồn phải được cung cấp dưới một cơ chế có điều kiện phù hợp. Panel còn lại của nhóm được phóng riêng ở trang kế tiếp.

**Tự kiểm tra (áp dụng cho các panel trên):** Vì sao sinh một token có xác suất cao nhất mỗi lần chưa bảo đảm cả câu có xác suất lớn nhất?

**Đáp án và ý nghĩa:** Greedy chỉ chọn tốt nhất cục bộ. Một lựa chọn sớm thay đổi phân phối các bước sau, nên chuỗi kết quả không nhất thiết là tối ưu toàn cục.

Panel C047 • Bản render nguyên trang từ [C], trang PDF 47. Nội dung trong panel là bản gốc.

### Cách đọc và giải thích

C047 giữ ví dụ “Chiếc xe màu đỏ” → “The red car”. [DIỄN GIẢI] Score ứng viên cần được chuyển thành phân phối để học/xử lý lựa chọn, và chuỗi nguồn phải được cung cấp dưới một cơ chế có điều kiện phù hợp.

**Tự kiểm tra (áp dụng cho các panel trên):** Vì sao sinh một token có xác suất cao nhất mỗi lần chưa bảo đảm cả câu có xác suất lớn nhất?

**Đáp án và ý nghĩa:** Greedy chỉ chọn tốt nhất cục bộ. Một lựa chọn sớm thay đổi phân phối các bước sau, nên chuỗi kết quả không nhất thiết là tối ưu toàn cục.
-->


---

<div class="track"><span>11 – BERT, mô hình ngôn ngữ và sinh chuỗi</span><span>ML tổng hợp</span></div>

# Tự luyện – Khi sinh câu, mô hình có biết token thật phía sau?



<div class="answer" v-click>Không trong thiết lập tự hồi quy. Causal mask ngăn nhìn tương lai khi học, và lúc sinh tiền tố chứa các token đã chọn.</div>



<div class="note">Thử trả lời trước khi bấm Tiếp</div>



<!--
Nguồn: Hoc_may_Tong_hop_chuyen_sau_3_bai_giang.pdf, trang 124, 171.



Mô hình ngôn ngữ tự hồi quy dự đoán token kế tiếp từ các token trước đó. Một vector ngữ cảnh được chuyển thành logits trên toàn bộ từ vựng rồi qua softmax.

$$s_v=h^\top u_v+b_v,\qquad
p(x_t=v\mid x_{“Collapse” hữu ích khi cần một vector cho cả câu, nhưng không phải mọi mô hình ngôn ngữ đều phải lấy trung bình cả chuỗi. Decoder tự hồi quy thường dùng hidden state ở vị trí cần dự đoán, với cơ chế che tương lai phù hợp.

**[CÂU HỎI BIÊN SOẠN]** Dựa trên nội dung chương. Hãy tự trả lời trước rồi mới xem phần giải thích dưới từng câu.

### 11.1 • Ghi nhớ

**Đầu Start/End của BERT QA xuất gì?**

Điểm/xác suất theo vị trí bắt đầu và kết thúc span trong đoạn văn, không phải hai token mới tự sinh.

### 11.2 • Thông hiểu

**Teacher forcing khác lúc sinh thế nào?**

Train thường dùng token thật ở tiền tố. Lúc sinh, tiền tố chứa token mô hình đã chọn, nên một sai lựa chọn có thể ảnh hưởng các bước sau.

### 11.3 • Vận dụng

**Sau tiền tố “Tôi thích nuôi”, sinh “mèo” rồi làm gì?**

Ghép token vừa chọn vào tiền tố, tính lại hoặc tiếp tục trạng thái thích hợp để dự đoán token sau. Lặp đến điều kiện dừng.

### 11.4 • Phân tích

**Mọi BERT đều có đúng 24 khối như hình?**

Không. Hình minh họa một cấu hình, không định nghĩa số lớp chung của mọi biến thể BERT.

### 11.5 • Đánh giá

**Dịch “Chiếc xe màu đỏ” có thể chỉ dùng phân phối vô điều kiện của câu tiếng Anh không?**

Chưa phản ánh bài toán dịch. Đầu ra phải có điều kiện theo nguồn tiếng Việt, ngoài tiền tố đích đã sinh.
-->


---

<div class="track"><span>12 – Tổng quát hóa và kiểm soát quá khớp</span><span>ML tổng hợp</span></div>

# Thiếu khớp và quá khớp


| Hiện tượng | Điều cần kiểm tra |
|---|---|
| Underfitting | Train và validation đều kém |
| Overfitting | Train cải thiện, validation không tương ứng |
| Khác phân phối | Dữ liệu triển khai khác dữ liệu học/đánh giá |


<div class="note">Train loss thấp chỉ xác nhận độ khớp dữ liệu đã học. Mục tiêu là dự đoán trên phân phối cần sử dụng</div>



<!--
Nguồn: Hoc_may_Tong_hop_chuyen_sau_3_bai_giang.pdf, trang 130, 133.



**Tổng quát hóa (generalization)** là khả năng hoạt động tốt trên dữ liệu mới từ phân phối mục tiêu. Train loss nhỏ cho biết mô hình khớp dữ liệu đã dùng học, chưa chứng minh nó học đúng quy luật cần sử dụng.

### Thiếu khớp và quá khớp

**Underfitting** xảy ra khi mô hình hoặc quá trình học chưa nắm được cấu trúc quan trọng. Train và validation thường đều kém. **Overfitting** xảy ra khi mô hình bám các đặc điểm riêng hoặc nhiễu của train, trong khi validation/test không cải thiện tương ứng.

Ví dụ nhãn ngẫu nhiên trong slide, dẫn theo Zhang và cộng sự, cho thấy mạng có thể khớp dữ liệu train ngay cả khi nhãn bị xáo. Thông điệp là **khả năng ghi nhớ và khả năng tổng quát hóa không đồng nhất**, không phải mọi mạng lớn đều không tổng quát hóa.

Ngoài quá khớp, dữ liệu triển khai khác phân phối train cũng gây lỗi. Cần đánh giá theo loại trường hợp và theo nhóm người dùng, kết nối với câu hỏi công bằng và Group DRO ở phần trước.

Panel C059 • Bản render nguyên trang từ [C], trang PDF 59. Nội dung trong panel là bản gốc.

Panel C060 • Bản render nguyên trang từ [C], trang PDF 60. Nội dung trong panel là bản gốc.

### Cách đọc và giải thích

C059 nhấn mạnh mục tiêu là hiệu năng trên phân phối cần dùng. C060 giữ hai ví dụ quá khớp: ranh giới uốn lượn theo điểm phân loại và đường hồi quy chạy sát từng quan sát. Các hình minh họa cấu trúc mô hình, không cung cấp điểm test cụ thể cho phép tính một khoảng cách tổng quát hóa.

**Tự kiểm tra (áp dụng cho các panel trên):** Chỉ nhìn hình đường cong đi sát train có thể kết luận mô hình chắc chắn tốt hơn trên test không?

**Đáp án và ý nghĩa:** Không. Cần dữ liệu giữ riêng. Độ khớp train tăng có thể đến từ học quy luật hoặc bám nhiễu.
-->


---

<div class="track"><span>12 – Tổng quát hóa và kiểm soát quá khớp</span><span>ML tổng hợp</span></div>

# Nhãn ngẫu nhiên và khả năng ghi nhớ


<figure><img src="/images/random-labels.png" style="max-height:260px" alt="Trái: loss theo bước học. Phải: lỗi test theo tỷ lệ nhãn hỏng, panel C061"/><figcaption>Trái: loss theo bước học. Phải: lỗi test theo tỷ lệ nhãn hỏng, panel C061</figcaption></figure>


<div class="note">Mạng có thể khớp train khi nhãn bị xáo. Điều đó chưa chứng minh tổng quát hóa tốt. Số liệu được thuật lại theo nguồn</div>



<!--
Nguồn: Hoc_may_Tong_hop_chuyen_sau_3_bai_giang.pdf, trang 130, 134.



**Tổng quát hóa (generalization)** là khả năng hoạt động tốt trên dữ liệu mới từ phân phối mục tiêu. Train loss nhỏ cho biết mô hình khớp dữ liệu đã dùng học, chưa chứng minh nó học đúng quy luật cần sử dụng.

### Thiếu khớp và quá khớp

**Underfitting** xảy ra khi mô hình hoặc quá trình học chưa nắm được cấu trúc quan trọng. Train và validation thường đều kém. **Overfitting** xảy ra khi mô hình bám các đặc điểm riêng hoặc nhiễu của train, trong khi validation/test không cải thiện tương ứng.

Ví dụ nhãn ngẫu nhiên trong slide, dẫn theo Zhang và cộng sự, cho thấy mạng có thể khớp dữ liệu train ngay cả khi nhãn bị xáo. Thông điệp là **khả năng ghi nhớ và khả năng tổng quát hóa không đồng nhất**, không phải mọi mạng lớn đều không tổng quát hóa.

Ngoài quá khớp, dữ liệu triển khai khác phân phối train cũng gây lỗi. Cần đánh giá theo loại trường hợp và theo nhóm người dùng, kết nối với câu hỏi công bằng và Group DRO ở phần trước.

Panel C061 • Bản render nguyên trang từ [C], trang PDF 61. Nội dung trong panel là bản gốc.

### Cách đọc và giải thích

Đồ thị trái có trục ngang số nghìn bước, trục dọc average loss, so nhiều kiểu can thiệp nhãn/pixel. Đồ thị phải có trục ngang tỷ lệ làm hỏng nhãn, trục dọc lỗi test cho các mô hình được nêu. [DIỄN GIẢI] Học khớp train ngay cả khi nhãn không còn mang quy luật dự đoán cho thấy khả năng ghi nhớ không đồng nhất tổng quát hóa. Không đọc “test error” thành “test accuracy”.

Kết quả được dẫn theo slide Zhang và cộng sự. Bản tổng hợp không chạy lại thí nghiệm hoặc đọc độc lập bài gốc.

**Tự kiểm tra (áp dụng cho các panel trên):** Đường lỗi test tăng khi tỷ lệ nhãn ngẫu nhiên tăng có nghĩa điều gì?

**Đáp án và ý nghĩa:** Khả năng dự đoán đúng trên test giảm theo thiết lập can thiệp được vẽ. Không tự suy cỡ ảnh hưởng chính xác hoặc mọi mô hình khác khi hình không cung cấp dữ liệu tương ứng.
-->


---

<div class="track"><span>12 – Tổng quát hóa và kiểm soát quá khớp</span><span>ML tổng hợp</span></div>

# Phân rã sai số



$$
g=\arg\min_{f\in\mathcal F}\operatorname{Err}(f)
$$



$$
\operatorname{Err}(\hat f)-\operatorname{Err}(f^*)=E_{\rm est}+E_{\rm app}
$$



$$
E_{\rm est}=\operatorname{Err}(\hat f)-\operatorname{Err}(g),\quad E_{\rm app}=\operatorname{Err}(g)-\operatorname{Err}(f^*)
$$



<div class="note">Lớp phong phú có thể giảm sai số xấp xỉ. Hạng mô hình thực học còn có thể chứa ảnh hưởng sai số tối ưu</div>



<!--
Nguồn: Hoc_may_Tong_hop_chuyen_sau_3_bai_giang.pdf, trang 131, 135.



Đặt $\operatorname{Err}(f)$ là rủi ro kỳ vọng trên phân phối cần dự đoán. Phân biệt ba mô hình:

- $f^*$: mô hình tốt nhất trong không gian dự đoán rộng đang xét.
- $g$: mô hình tốt nhất trong lớp giả thuyết đã chọn $\mathcal F$.
- $\widehat f$: mô hình thực tế học được từ dữ liệu hữu hạn.

$$g=\operatorname*{arg\,min}_{f\in\mathcal F}\operatorname{Err}(f).$$

Bằng cách cộng rồi trừ cùng một đại lượng, ta có:

$$\operatorname{Err}(\widehat f)-\operatorname{Err}(f^*)=E_{\rm est}+E_{\rm app}.$$

$$E_{\rm est}=\operatorname{Err}(\widehat f)-\operatorname{Err}(g),\qquad
E_{\rm app}=\operatorname{Err}(g)-\operatorname{Err}(f^*).$$

### Sai số xấp xỉ

Đây là giới hạn của lớp mô hình. Nếu quy luật là parabol mà chỉ cho phép đường thẳng, ngay cả mô hình tốt nhất trong lớp vẫn không khớp được quy luật. Thêm feature bình phương hoặc đổi kiến trúc có thể giảm thành phần này.

### Sai số ước lượng trong cách diễn giải của slide

Với dữ liệu hữu hạn, mô hình học được có thể khác mô hình tốt nhất của lớp xét trên phân phối thật. Lớp càng phong phú càng có nhiều cơ hội khớp cả nhiễu. Thêm dữ liệu hoặc điều chuẩn có thể hỗ trợ kiểm soát.

**Một điểm cần làm rõ:** nếu tối ưu chưa giải tốt bài toán trên tập train, phần sai lệch của mô hình học được còn chứa ảnh hưởng của **sai số tối ưu**. Đẳng thức trên vẫn đúng, nhưng gọi toàn bộ hạng đầu là sai số ước lượng là cách diễn giải gộp, chưa tách riêng tối ưu hóa.

Đây không phải công thức bias–variance cộng nhiễu quen thuộc của hồi quy bình phương. Hai cách phân tích có liên quan về trực giác nhưng dùng các đại lượng và giả thiết khác nhau.

Panel C062 • Bản render nguyên trang từ [C], trang PDF 62. Nội dung trong panel là bản gốc.

Panel C063 • Bản render nguyên trang từ [C], trang PDF 63. Nội dung trong panel là bản gốc.

### Cách đọc và giải thích

C062 đặt mô hình lý tưởng trong không gian rộng, mô hình tốt nhất của lớp F và mô hình thực học. C063 cộng trừ rủi ro của mô hình tốt nhất trong F để phân rã chênh lệch. Đây là sơ đồ khái niệm về tập hàm và rủi ro, không phải biểu diễn khoảng cách Euclid giữa các vector tham số. Lớp lớn có thể giảm giới hạn xấp xỉ nhưng tăng khó khăn ước lượng.

**Tự kiểm tra (áp dụng cho các panel trên):** Nếu optimizer chưa tìm tốt nghiệm train, có nên gọi mọi chênh lệch tới mô hình tốt nhất trong lớp là thuần sai số ước lượng không?

**Đáp án và ý nghĩa:** Không hoàn toàn. Hạng chênh lệch của mô hình thực học còn có thể chứa ảnh hưởng sai số tối ưu. Đẳng thức cộng trừ vẫn đúng nhưng cách gán tên cần nói rõ.
-->


---

<div class="track"><span>12 – Tổng quát hóa và kiểm soát quá khớp</span><span>ML tổng hợp</span></div>

# L2 và mức độ khớp



$$
w\leftarrow(1-\eta\lambda)w-\eta\nabla J_{\rm train}(w)
$$


| Điều chỉnh | Tác dụng có thể có |
|---|---|
| Ít feature / ít khả năng biểu diễn | Giảm quá khớp, có thể tăng thiếu khớp |
| L2 lớn hơn | Hạn chế trọng số lớn |
| Ít bước học | Hạn chế tiếp tục khớp nhiễu |


<div class="note">Chọn mức điều chuẩn bằng validation. Với optimizer thích nghi, không tự đồng nhất mọi L2 với mọi weight decay</div>



<!--
Nguồn: Hoc_may_Tong_hop_chuyen_sau_3_bai_giang.pdf, trang 132, 136.



Có ba đòn bẩy được nhấn mạnh trong slide: giới hạn số đặc trưng hoặc khả năng biểu diễn, phạt độ lớn trọng số, và giới hạn quá trình huấn luyện.

### L2 tạo lực kéo trọng số về không

$$J_{\rm reg}(w)=J_{\rm train}(w)+\frac\lambda2\|w\|^2.$$

$$w\leftarrow w-\eta(\nabla J_{\rm train}(w)+\lambda w)
=(1-\eta\lambda)w-\eta\nabla J_{\rm train}(w).$$

Trong gradient descent thông thường, ta thấy thành phần co trọng số. Với optimizer thích nghi, không nên tự đồng nhất mọi dạng L2 với mọi cách triển khai weight decay. Hệ số phạt cần được chọn qua validation.

### Early stopping chọn thời điểm dừng bằng dữ liệu giữ lại

1. Huấn luyện và đánh giá validation định kỳ.
2. Khi validation tốt hơn, lưu checkpoint tốt nhất.
3. Nếu không cải thiện trong số lần đánh giá quy định bởi **patience**, dừng.
4. Khôi phục checkpoint tốt nhất để sử dụng.

Train loss có thể tiếp tục giảm trong khi validation loss tăng. Mốc cuối cùng không nhất thiết là mốc tốt nhất. Patience giúp tránh dừng chỉ vì một dao động ngắn.

### Ví dụ lựa chọn checkpoint

| Epoch | Train loss | Validation loss | Xử lý |
|---:|---:|---:|---|
| 10 | $0.30$ | $0.36$ | Lưu |
| 20 | $0.20$ | $0.29$ | Cập nhật checkpoint tốt nhất |
| 30 | $0.14$ | $0.32$ | Chưa thay checkpoint |
| 40 | $0.10$ | $0.37$ | Dừng nếu đã hết patience |

Đây là số liệu minh họa bổ sung. Chọn epoch 20 theo validation dù epoch 40 khớp train hơn. Không dùng test để chọn epoch hoặc chọn hệ số L2.

Panel C064 • Bản render nguyên trang từ [C], trang PDF 64. Nội dung trong panel là bản gốc.

Panel C066 • Bản render nguyên trang từ [C], trang PDF 66. Nội dung trong panel là bản gốc.

### Cách đọc và giải thích

C064 nêu ba cơ chế kiểm soát: chiều feature, L2 và số bước huấn luyện. C066 vẽ train loss tiếp tục giảm trong khi validation đạt đáy rồi tăng. Vạch và mũi tên nhắc chọn checkpoint tốt nhất theo validation, không theo train. Đây là hình minh họa, không có đủ bảng số để đọc ra một epoch tối ưu chính xác.

**Tự kiểm tra (áp dụng cho các panel trên):** Tại sao dừng muộn hơn chưa chắc chọn được mô hình tốt hơn?

**Đáp án và ý nghĩa:** Tối ưu train có thể tiếp tục khớp nhiễu. Cần lưu checkpoint và giữ mốc validation tốt nhất, với patience để xử lý dao động ngắn.
-->


---

<div class="track"><span>12 – Tổng quát hóa và kiểm soát quá khớp</span><span>ML tổng hợp</span></div>

# Early stopping


| Epoch | Train loss | Validation loss |
|---:|---:|---:|
| 10 | 0,30 | 0,36 |
| 20 | 0,20 | **0,29** |
| 30 | 0,14 | 0,32 |
| 40 | 0,10 | 0,37 |


<div class="answer" v-click>Giữ checkpoint epoch <b>20</b>, dù epoch 40 khớp train hơn</div>



<div class="note">Lưu mốc tốt nhất, dừng sau patience không cải thiện, rồi khôi phục mốc tốt nhất. Bảng là ví dụ minh họa</div>



<!--
Nguồn: Hoc_may_Tong_hop_chuyen_sau_3_bai_giang.pdf, trang 132, 136.



Có ba đòn bẩy được nhấn mạnh trong slide: giới hạn số đặc trưng hoặc khả năng biểu diễn, phạt độ lớn trọng số, và giới hạn quá trình huấn luyện.

### L2 tạo lực kéo trọng số về không

$$J_{\rm reg}(w)=J_{\rm train}(w)+\frac\lambda2\|w\|^2.$$

$$w\leftarrow w-\eta(\nabla J_{\rm train}(w)+\lambda w)
=(1-\eta\lambda)w-\eta\nabla J_{\rm train}(w).$$

Trong gradient descent thông thường, ta thấy thành phần co trọng số. Với optimizer thích nghi, không nên tự đồng nhất mọi dạng L2 với mọi cách triển khai weight decay. Hệ số phạt cần được chọn qua validation.

### Early stopping chọn thời điểm dừng bằng dữ liệu giữ lại

1. Huấn luyện và đánh giá validation định kỳ.
2. Khi validation tốt hơn, lưu checkpoint tốt nhất.
3. Nếu không cải thiện trong số lần đánh giá quy định bởi **patience**, dừng.
4. Khôi phục checkpoint tốt nhất để sử dụng.

Train loss có thể tiếp tục giảm trong khi validation loss tăng. Mốc cuối cùng không nhất thiết là mốc tốt nhất. Patience giúp tránh dừng chỉ vì một dao động ngắn.

### Ví dụ lựa chọn checkpoint

| Epoch | Train loss | Validation loss | Xử lý |
|---:|---:|---:|---|
| 10 | $0.30$ | $0.36$ | Lưu |
| 20 | $0.20$ | $0.29$ | Cập nhật checkpoint tốt nhất |
| 30 | $0.14$ | $0.32$ | Chưa thay checkpoint |
| 40 | $0.10$ | $0.37$ | Dừng nếu đã hết patience |

Đây là số liệu minh họa bổ sung. Chọn epoch 20 theo validation dù epoch 40 khớp train hơn. Không dùng test để chọn epoch hoặc chọn hệ số L2.

Panel C064 • Bản render nguyên trang từ [C], trang PDF 64. Nội dung trong panel là bản gốc.

Panel C066 • Bản render nguyên trang từ [C], trang PDF 66. Nội dung trong panel là bản gốc.

### Cách đọc và giải thích

C064 nêu ba cơ chế kiểm soát: chiều feature, L2 và số bước huấn luyện. C066 vẽ train loss tiếp tục giảm trong khi validation đạt đáy rồi tăng. Vạch và mũi tên nhắc chọn checkpoint tốt nhất theo validation, không theo train. Đây là hình minh họa, không có đủ bảng số để đọc ra một epoch tối ưu chính xác.

**Tự kiểm tra (áp dụng cho các panel trên):** Tại sao dừng muộn hơn chưa chắc chọn được mô hình tốt hơn?

**Đáp án và ý nghĩa:** Tối ưu train có thể tiếp tục khớp nhiễu. Cần lưu checkpoint và giữ mốc validation tốt nhất, với patience để xử lý dao động ngắn.
-->


---

<div class="track"><span>12 – Tổng quát hóa và kiểm soát quá khớp</span><span>ML tổng hợp</span></div>

# Tự luyện – Mạng lớn có luôn quá khớp?



<div class="answer" v-click>Không. Cần xem dữ liệu, cách học, điều chuẩn và đánh giá. Thí nghiệm nhãn ngẫu nhiên chỉ cho thấy train loss thấp chưa đủ chứng minh generalization.</div>



<div class="note">Thử trả lời trước khi bấm Tiếp</div>



<!--
Nguồn: Hoc_may_Tong_hop_chuyen_sau_3_bai_giang.pdf, trang 130, 172.



**Tổng quát hóa (generalization)** là khả năng hoạt động tốt trên dữ liệu mới từ phân phối mục tiêu. Train loss nhỏ cho biết mô hình khớp dữ liệu đã dùng học, chưa chứng minh nó học đúng quy luật cần sử dụng.

### Thiếu khớp và quá khớp

**Underfitting** xảy ra khi mô hình hoặc quá trình học chưa nắm được cấu trúc quan trọng. Train và validation thường đều kém. **Overfitting** xảy ra khi mô hình bám các đặc điểm riêng hoặc nhiễu của train, trong khi validation/test không cải thiện tương ứng.

Ví dụ nhãn ngẫu nhiên trong slide, dẫn theo Zhang và cộng sự, cho thấy mạng có thể khớp dữ liệu train ngay cả khi nhãn bị xáo. Thông điệp là **khả năng ghi nhớ và khả năng tổng quát hóa không đồng nhất**, không phải mọi mạng lớn đều không tổng quát hóa.

Ngoài quá khớp, dữ liệu triển khai khác phân phối train cũng gây lỗi. Cần đánh giá theo loại trường hợp và theo nhóm người dùng, kết nối với câu hỏi công bằng và Group DRO ở phần trước.

**[CÂU HỎI BIÊN SOẠN]** Dựa trên nội dung chương. Hãy tự trả lời trước rồi mới xem phần giải thích dưới từng câu.

### 12.1 • Ghi nhớ

**Sai số xấp xỉ do đâu?**

Do lớp giả thuyết không chứa quy tắc tốt nhất trong không gian dự đoán rộng đang xét, ngay cả khi chọn tốt nhất trong lớp.

### 12.2 • Thông hiểu

**Nhãn ngẫu nhiên chứng minh điểm gì?**

Mô hình có thể khớp train mà không học tín hiệu tổng quát hóa hữu ích. Không suy rằng mọi mạng lớn luôn dự đoán kém.

### 12.3 • Vận dụng

**Train loss giảm, validation thấp nhất ở epoch 20 rồi tăng: chọn mốc?**

Giữ checkpoint tốt nhất theo validation, chẳng hạn epoch 20 trong bảng minh họa, không mặc định lấy mốc cuối.

### 12.4 • Phân tích

**Tăng L2 mãi có luôn tốt?**

Không. L2 lớn hạn chế trọng số nhưng có thể làm mô hình không khớp quy luật quan trọng. Cần chọn hệ số trên validation.

### 12.5 • Đánh giá

**Chênh lệch tới mô hình tốt nhất trong lớp có luôn thuần do ít dữ liệu?**

Không nếu tối ưu chưa tốt. Cần phân biệt ảnh hưởng ước lượng và sai số tối ưu, đồng thời nêu quy ước phân rã đang dùng.
-->


---

<div class="track"><span>13 – Phương pháp thực nghiệm và phân tích lỗi</span><span>ML tổng hợp</span></div>

# Train, validation và test


| Tập | Vai trò |
|---|---|
| Train | Học trọng số, fit các phép biến đổi |
| Validation | Chọn cấu hình và checkpoint |
| Test | Đánh giá cuối sau khi chốt quy trình |


<div class="note">Dữ liệu cùng người hoặc theo thời gian cần cách chia phản ánh tình huống triển khai</div>



<!--
Nguồn: Hoc_may_Tong_hop_chuyen_sau_3_bai_giang.pdf, trang 139, 141.



| Tập dữ liệu | Dùng cho việc gì? | Không nên dùng để |
|---|---|---|
| Train | Học trọng số, fit chuẩn hóa và tiền xử lý | Khẳng định hiệu năng cuối trên dữ liệu mới |
| Validation | Chọn mô hình, siêu tham số, checkpoint | Học lặp mà vẫn coi điểm là đánh giá độc lập cuối |
| Test | Đánh giá sau khi chốt quy trình | Chọn kiến trúc hoặc điều chỉnh siêu tham số |

### K-fold cross-validation

Chia **dữ liệu phát triển** thành $K$ phần. Mỗi lượt dùng một phần làm validation, các phần còn lại làm train. Huấn luyện lại từ đầu cho mỗi lượt rồi tổng hợp điểm.

$$\overline S=\frac1K\sum_{k=1}^KS_k.$$

Với năm fold, mỗi mẫu làm validation một lần. Nếu có bước chuẩn hóa, chọn đặc trưng hoặc điền dữ liệu thiếu, phải fit riêng trên train của mỗi fold. Không fit trên toàn bộ dữ liệu trước rồi mới chia fold, vì sẽ rò rỉ thông tin.

### Chu trình phát triển có thể lặp lại

**Baseline → train → validation → phân tích lỗi → thay đổi một yếu tố có mục đích.** Sau khi chốt cấu hình, có thể huấn luyện mô hình cuối trên dữ liệu phát triển theo quy trình đã định rồi đánh giá test.

Khi có nhiều mẫu của cùng một người hoặc dữ liệu theo thời gian, cách chia cần phản ánh tình huống triển khai. Chia ngẫu nhiên tùy tiện có thể làm thông tin liên quan xuất hiện ở cả train lẫn test.

### Nên ghi gì để kết quả dễ kiểm tra?

Ghi cách chia dữ liệu, tiền xử lý, mô hình, cấu hình đã chọn, seed khi cần, metric và kết quả theo nhóm. Nếu so sánh mô hình, dùng cùng quy trình đánh giá. Các điểm cross-validation nên kèm mức biến thiên khi phù hợp, không chỉ một con số trung bình.

Panel C069 • Bản render nguyên trang từ [C], trang PDF 69. Nội dung trong panel là bản gốc.

Panel C070 • Bản render nguyên trang từ [C], trang PDF 70. Nội dung trong panel là bản gốc.

### Cách đọc và giải thích

C069 gom train/validation thành dữ liệu phát triển và tách test cho bước cuối. C070 có năm lượt, mỗi lượt một fold tím làm validation, các fold xám làm train. Trước mỗi lượt, học lại mô hình và fit lại tiền xử lý trên các fold train. Không để thống kê của fold validation đi vào việc chuẩn hóa hay chọn feature.

**Tự kiểm tra (áp dụng cho các panel trên):** Trong cross-validation, test có phải lần lượt trở thành fold tím không?

**Đáp án và ý nghĩa:** Không. Test vẫn giữ riêng. Các fold được tạo trong dữ liệu phát triển để lựa chọn cấu hình.
-->


---

<div class="track"><span>13 – Phương pháp thực nghiệm và phân tích lỗi</span><span>ML tổng hợp</span></div>

# K-fold cross-validation


- Chia dữ liệu phát triển thành $K$ fold
- Mỗi lượt: một fold validation, $K-1$ fold train
- Huấn luyện lại và fit tiền xử lý trong train của lượt đó


$$
\bar S=\frac1K\sum_{k=1}^KS_k
$$



<div class="note">Test giữ riêng. Tổng hợp cả mức trung bình và biến thiên khi phù hợp</div>



<!--
Nguồn: Hoc_may_Tong_hop_chuyen_sau_3_bai_giang.pdf, trang 139, 141.



| Tập dữ liệu | Dùng cho việc gì? | Không nên dùng để |
|---|---|---|
| Train | Học trọng số, fit chuẩn hóa và tiền xử lý | Khẳng định hiệu năng cuối trên dữ liệu mới |
| Validation | Chọn mô hình, siêu tham số, checkpoint | Học lặp mà vẫn coi điểm là đánh giá độc lập cuối |
| Test | Đánh giá sau khi chốt quy trình | Chọn kiến trúc hoặc điều chỉnh siêu tham số |

### K-fold cross-validation

Chia **dữ liệu phát triển** thành $K$ phần. Mỗi lượt dùng một phần làm validation, các phần còn lại làm train. Huấn luyện lại từ đầu cho mỗi lượt rồi tổng hợp điểm.

$$\overline S=\frac1K\sum_{k=1}^KS_k.$$

Với năm fold, mỗi mẫu làm validation một lần. Nếu có bước chuẩn hóa, chọn đặc trưng hoặc điền dữ liệu thiếu, phải fit riêng trên train của mỗi fold. Không fit trên toàn bộ dữ liệu trước rồi mới chia fold, vì sẽ rò rỉ thông tin.

### Chu trình phát triển có thể lặp lại

**Baseline → train → validation → phân tích lỗi → thay đổi một yếu tố có mục đích.** Sau khi chốt cấu hình, có thể huấn luyện mô hình cuối trên dữ liệu phát triển theo quy trình đã định rồi đánh giá test.

Khi có nhiều mẫu của cùng một người hoặc dữ liệu theo thời gian, cách chia cần phản ánh tình huống triển khai. Chia ngẫu nhiên tùy tiện có thể làm thông tin liên quan xuất hiện ở cả train lẫn test.

### Nên ghi gì để kết quả dễ kiểm tra?

Ghi cách chia dữ liệu, tiền xử lý, mô hình, cấu hình đã chọn, seed khi cần, metric và kết quả theo nhóm. Nếu so sánh mô hình, dùng cùng quy trình đánh giá. Các điểm cross-validation nên kèm mức biến thiên khi phù hợp, không chỉ một con số trung bình.

Panel C069 • Bản render nguyên trang từ [C], trang PDF 69. Nội dung trong panel là bản gốc.

Panel C070 • Bản render nguyên trang từ [C], trang PDF 70. Nội dung trong panel là bản gốc.

### Cách đọc và giải thích

C069 gom train/validation thành dữ liệu phát triển và tách test cho bước cuối. C070 có năm lượt, mỗi lượt một fold tím làm validation, các fold xám làm train. Trước mỗi lượt, học lại mô hình và fit lại tiền xử lý trên các fold train. Không để thống kê của fold validation đi vào việc chuẩn hóa hay chọn feature.

**Tự kiểm tra (áp dụng cho các panel trên):** Trong cross-validation, test có phải lần lượt trở thành fold tím không?

**Đáp án và ý nghĩa:** Không. Test vẫn giữ riêng. Các fold được tạo trong dữ liệu phát triển để lựa chọn cấu hình.
-->


---

<div class="track"><span>13 – Phương pháp thực nghiệm và phân tích lỗi</span><span>ML tổng hợp</span></div>

# Chu trình phát triển và rò rỉ dữ liệu


<div class="flow"><div><b>Baseline</b><small>Train và validation</small></div><span>→</span><div><b>Phân tích lỗi</b><small>Thử thay đổi có mục đích</small></div><span>→</span><div><b>Chốt mô hình</b><small>Train cuối, đánh giá test</small></div></div>

- Không fit chuẩn hóa cả bộ trước khi chia fold
- Không liên tục chọn cấu hình theo cùng test
- Ghi cách chia, tiền xử lý, cấu hình, seed và metric


<!--
Nguồn: Hoc_may_Tong_hop_chuyen_sau_3_bai_giang.pdf, trang 139, 142, 160.



| Tập dữ liệu | Dùng cho việc gì? | Không nên dùng để |
|---|---|---|
| Train | Học trọng số, fit chuẩn hóa và tiền xử lý | Khẳng định hiệu năng cuối trên dữ liệu mới |
| Validation | Chọn mô hình, siêu tham số, checkpoint | Học lặp mà vẫn coi điểm là đánh giá độc lập cuối |
| Test | Đánh giá sau khi chốt quy trình | Chọn kiến trúc hoặc điều chỉnh siêu tham số |

### K-fold cross-validation

Chia **dữ liệu phát triển** thành $K$ phần. Mỗi lượt dùng một phần làm validation, các phần còn lại làm train. Huấn luyện lại từ đầu cho mỗi lượt rồi tổng hợp điểm.

$$\overline S=\frac1K\sum_{k=1}^KS_k.$$

Với năm fold, mỗi mẫu làm validation một lần. Nếu có bước chuẩn hóa, chọn đặc trưng hoặc điền dữ liệu thiếu, phải fit riêng trên train của mỗi fold. Không fit trên toàn bộ dữ liệu trước rồi mới chia fold, vì sẽ rò rỉ thông tin.

### Chu trình phát triển có thể lặp lại

**Baseline → train → validation → phân tích lỗi → thay đổi một yếu tố có mục đích.** Sau khi chốt cấu hình, có thể huấn luyện mô hình cuối trên dữ liệu phát triển theo quy trình đã định rồi đánh giá test.

Khi có nhiều mẫu của cùng một người hoặc dữ liệu theo thời gian, cách chia cần phản ánh tình huống triển khai. Chia ngẫu nhiên tùy tiện có thể làm thông tin liên quan xuất hiện ở cả train lẫn test.

### Nên ghi gì để kết quả dễ kiểm tra?

Ghi cách chia dữ liệu, tiền xử lý, mô hình, cấu hình đã chọn, seed khi cần, metric và kết quả theo nhóm. Nếu so sánh mô hình, dùng cùng quy trình đánh giá. Các điểm cross-validation nên kèm mức biến thiên khi phù hợp, không chỉ một con số trung bình.

Panel C071 • Bản render nguyên trang từ [C], trang PDF 71. Nội dung trong panel là bản gốc.

Panel C072 • Bản render nguyên trang từ [C], trang PDF 72. Nội dung trong panel là bản gốc.

### Cách đọc và giải thích

C071 vẽ vòng baseline→train→validation→phân tích lỗi→thay đổi rồi lặp. C072 báo cáo accuracy 96,89%, chữ số ba đúng 79/91. Trong ma trận, hàng là nhãn thật, cột là dự đoán; đường chéo là đúng. Các ô ngoài chéo cho thấy kiểu nhầm mà một accuracy tổng thể không biểu thị đầy đủ. Chữ số ba có recall xấp xỉ 86,81%.

Đây là số liệu báo cáo trong nguồn, không phải thí nghiệm được chạy lại. Dữ liệu trên hình không cung cấp toàn bộ cấu hình SVM để tái tạo chính xác.

**Tự kiểm tra (áp dụng cho các panel trên):** Muốn tính precision lớp ba, chỉ tổng hàng ba đã đủ chưa?

**Đáp án và ý nghĩa:** Chưa. Precision cần tổng số mẫu được dự đoán là ba, tức tổng cột ba. Recall dùng tổng số mẫu thật thuộc lớp ba.

| Suy luận dễ mắc | Vì sao chưa đúng? | Cách kiểm tra |
|---|---|---|
| Train loss thấp nên test tốt | Mạng có thể ghi nhớ, dữ liệu mới có thể khác phân phối. | Dùng test giữ riêng sau lựa chọn cấu hình. |
| Loss giảm nên nghiệm toàn cục | Mạng và K-means có thể mắc nghiệm cục bộ hoặc cấu hình kém. | Xét cấu trúc tối ưu, nhiều khởi tạo khi phù hợp. |
| Nhiều feature luôn tốt | Có thể tăng sai số ước lượng và quá khớp. | So validation, điều chuẩn và lượng dữ liệu. |
| Accuracy cao nên mọi lớp/nhóm đều tốt | Trung bình che nhóm ít mẫu hoặc loại nhầm quan trọng. | Confusion matrix và metric theo nhóm. |
| Chọn checkpoint bằng test | Test đã tham gia quá trình chọn nên mất vai trò đánh giá cuối độc lập. | Dùng validation/CV cho lựa chọn. |
| Chuẩn hóa cả bộ rồi chia fold là vô hại | Thống kê validation đã lọt vào tiền xử lý. | Fit phép biến đổi trong train của từng fold. |
| K lớn hơn có loss thấp hơn nên tốt hơn | Thêm tâm có thể giảm loss ngay cả khi không hữu ích. | Đánh giá độ gọn, ổn định và mục tiêu sử dụng. |
| Nhìn hai cụm trên PCA là thấy mọi khoảng cách gốc | Chiếu hai chiều có thể mất thông tin. | Xem đặc trưng gốc, tâm và phân bố cụm. |

### Phân biệt lỗi nguồn và phần giải thích bổ sung

Những thay đổi ký hiệu, bias hoặc dấu được đối chiếu với nguồn ở D1/D2. Các quy tắc thực nghiệm và giới hạn trên là phần giải thích phương pháp dựa trên nội dung nguồn hoặc bổ sung đã nêu trong các chương. Không được tự quy mọi lỗi mô hình cho một nguyên nhân chỉ từ một biểu đồ.
-->


---

<div class="track"><span>13 – Phương pháp thực nghiệm và phân tích lỗi</span><span>ML tổng hợp</span></div>

# Confusion matrix và metric theo lớp


| Đại lượng | Mẫu số |
|---|---|
| Recall lớp $k$ | Mọi mẫu thật của lớp $k$ |
| Precision lớp $k$ | Mọi mẫu được dự đoán là lớp $k$ |
| Accuracy | Mọi mẫu test |

Ví dụ Digits trong PDF: accuracy **96,89%**<br/>
Chữ số 3 đúng **79/91**, nhầm 12 mẫu sang 5, 7 hoặc 8


<div class="answer" v-click>Recall lớp 3 = 79/91 ≈ <b>86,81%</b>, thấp hơn con số tổng thể</div>



<!--
Nguồn: Hoc_may_Tong_hop_chuyen_sau_3_bai_giang.pdf, trang 140, 142.



Trong ví dụ phân loại chữ số viết tay bằng SVM trên Digits, slide báo cáo accuracy test **96,89%**. Đây là kết quả của tài liệu nguồn, bản tổng hợp không chạy lại thí nghiệm.

### Đọc từng hàng

Đường chéo chính là số mẫu dự đoán đúng. Các ô ngoài đường chéo là những cặp nhãn bị nhầm. Hàng chữ số 3 có 91 mẫu, đúng 79 mẫu, 12 mẫu còn lại bị nhầm thành 5, 7 hoặc 8.

$$\operatorname{Recall}_{3}=\frac{79}{91}\approx86.81\%.$$

Tỷ lệ này thấp hơn accuracy tổng thể nên một con số chung chưa mô tả đầy đủ điểm yếu. Muốn tính **precision** cho lớp 3 cần tổng số mẫu được dự đoán là 3, tức tổng cột tương ứng, không chỉ tổng hàng.

$$\operatorname{Accuracy}=\frac{\text{số mẫu đúng}}{\text{tổng số mẫu}},\qquad
\operatorname{Precision}_k=\frac{TP_k}{TP_k+FP_k}.$$

**Bước tiếp theo của phân tích lỗi** là xem các ảnh nhầm, kiểm tra nét chữ, tiền xử lý và mức cân bằng dữ liệu. Nhìn theo lớp tương tự nhìn theo nhóm trong Group DRO: trung bình tốt có thể che một phân nhóm hoạt động kém.

Panel C071 • Bản render nguyên trang từ [C], trang PDF 71. Nội dung trong panel là bản gốc.

Panel C072 • Bản render nguyên trang từ [C], trang PDF 72. Nội dung trong panel là bản gốc.

### Cách đọc và giải thích

C071 vẽ vòng baseline→train→validation→phân tích lỗi→thay đổi rồi lặp. C072 báo cáo accuracy 96,89%, chữ số ba đúng 79/91. Trong ma trận, hàng là nhãn thật, cột là dự đoán; đường chéo là đúng. Các ô ngoài chéo cho thấy kiểu nhầm mà một accuracy tổng thể không biểu thị đầy đủ. Chữ số ba có recall xấp xỉ 86,81%.

Đây là số liệu báo cáo trong nguồn, không phải thí nghiệm được chạy lại. Dữ liệu trên hình không cung cấp toàn bộ cấu hình SVM để tái tạo chính xác.

**Tự kiểm tra (áp dụng cho các panel trên):** Muốn tính precision lớp ba, chỉ tổng hàng ba đã đủ chưa?

**Đáp án và ý nghĩa:** Chưa. Precision cần tổng số mẫu được dự đoán là ba, tức tổng cột ba. Recall dùng tổng số mẫu thật thuộc lớp ba.
-->


---

<div class="track"><span>13 – Phương pháp thực nghiệm và phân tích lỗi</span><span>ML tổng hợp</span></div>

# Tự luyện – Tính precision lớp 3 bằng tổng hàng 3?



<div class="answer" v-click>Không. Hàng là nhãn thật, cột là nhãn dự đoán trong ma trận này. Precision cần tổng cột 3, recall cần tổng hàng 3.</div>



<div class="note">Thử trả lời trước khi bấm Tiếp</div>



<!--
Nguồn: Hoc_may_Tong_hop_chuyen_sau_3_bai_giang.pdf, trang 140, 173.



Trong ví dụ phân loại chữ số viết tay bằng SVM trên Digits, slide báo cáo accuracy test **96,89%**. Đây là kết quả của tài liệu nguồn, bản tổng hợp không chạy lại thí nghiệm.

### Đọc từng hàng

Đường chéo chính là số mẫu dự đoán đúng. Các ô ngoài đường chéo là những cặp nhãn bị nhầm. Hàng chữ số 3 có 91 mẫu, đúng 79 mẫu, 12 mẫu còn lại bị nhầm thành 5, 7 hoặc 8.

$$\operatorname{Recall}_{3}=\frac{79}{91}\approx86.81\%.$$

Tỷ lệ này thấp hơn accuracy tổng thể nên một con số chung chưa mô tả đầy đủ điểm yếu. Muốn tính **precision** cho lớp 3 cần tổng số mẫu được dự đoán là 3, tức tổng cột tương ứng, không chỉ tổng hàng.

$$\operatorname{Accuracy}=\frac{\text{số mẫu đúng}}{\text{tổng số mẫu}},\qquad
\operatorname{Precision}_k=\frac{TP_k}{TP_k+FP_k}.$$

**Bước tiếp theo của phân tích lỗi** là xem các ảnh nhầm, kiểm tra nét chữ, tiền xử lý và mức cân bằng dữ liệu. Nhìn theo lớp tương tự nhìn theo nhóm trong Group DRO: trung bình tốt có thể che một phân nhóm hoạt động kém.

**[CÂU HỎI BIÊN SOẠN]** Dựa trên nội dung chương. Hãy tự trả lời trước rồi mới xem phần giải thích dưới từng câu.

### 13.1 • Ghi nhớ

**Test dùng lúc nào?**

Sau khi chốt cấu hình và quy trình phát triển, để đánh giá cuối trên dữ liệu chưa tham gia lựa chọn.

### 13.2 • Thông hiểu

**Vì sao fit chuẩn hóa trong từng fold?**

Thống kê phải chỉ học từ phần train của lượt đó. Dùng toàn bộ dữ liệu làm thông tin validation rò vào quy trình.

### 13.3 • Vận dụng

**Chữ số ba đúng 79/91, recall là gì?**

79 chia 91 ≈ 0,8681, tức 86,81%. Đây là recall lớp ba, không phải precision hay accuracy tổng.

### 13.4 • Phân tích

**Accuracy 96,89% có cho biết lớp ba tốt như lớp khác không?**

Không. Cần xem hàng/cột nhầm lẫn. Chính ví dụ cho recall lớp ba thấp hơn con số tổng thể.

### 13.5 • Đánh giá

**Có nên liên tục thử cấu hình rồi chọn theo cùng test?**

Không. Test đã trở thành công cụ lựa chọn và điểm báo cáo bị thiên lệch. Dùng validation/CV, giữ test cho đánh giá cuối.
-->


---

<div class="track"><span>14 – K-means và phân nhóm khách hàng</span><span>ML tổng hợp</span></div>

# Phân cụm không giám sát


| Phân loại | K-means |
|---|---|
| Có nhãn $y_i$ khi học | Chỉ có vector đặc trưng |
| Học quy tắc dự đoán nhãn | Tìm phép gán và tâm cụm |
| Nhãn có ý nghĩa đã định | Chỉ số cụm có thể hoán vị |


$$
J(z,\mu)=\sum_i\|\phi(x_i)-\mu_{z_i}\|^2
$$



<div class="note">Một cụm không tự động là một lớp có ý nghĩa ngữ nghĩa</div>



<!--
Nguồn: Hoc_may_Tong_hop_chuyen_sau_3_bai_giang.pdf, trang 145.



K-means là phương pháp **phân cụm không giám sát**. Dữ liệu chỉ có vector đặc trưng $v_i=\phi(x_i)$, không cần nhãn lớp. Thuật toán tìm $K$ tâm $\mu_k$ và gán cụm $z_i$ để các điểm gần tâm cụm của mình.

$$J(z,\mu)=\sum_{i=1}^{n}\|v_i-\mu_{z_i}\|^2,\qquad
\min_{z,\mu}J(z,\mu).$$

### Bước 1. Giữ tâm cố định, gán điểm về tâm gần nhất

$$z_i\leftarrow\operatorname*{arg\,min}_{k\in\{1,\ldots,K\}}
\|v_i-\mu_k\|^2.$$

Mỗi điểm chọn một tâm làm khoảng cách bình phương nhỏ nhất. Khi đồng hạng cần có quy tắc chọn nhất quán.

### Bước 2. Giữ phép gán cố định, cập nhật tâm bằng trung bình

$$\mu_k\leftarrow\frac1{|C_k|}\sum_{i\in C_k}v_i,\qquad
C_k=\{i:z_i=k\}.$$

Sau đó lặp lại hai bước. Có thể dừng khi phép gán không đổi, tâm dịch chuyển rất ít, loss cải thiện không đáng kể hoặc đạt số vòng tối đa.

### Những điểm cần phân biệt với phân loại

Trong phân loại, nhãn như “mèo” hay “chó” đã có ý nghĩa từ dữ liệu train. Trong K-means, chỉ số cụm 1 hay 2 có thể hoán đổi mà nghiệm vẫn tương đương. Một cụm không tự động là một lớp có ý nghĩa ngữ nghĩa.

Nếu một cụm không có điểm nào, phép chia cho số điểm không thực hiện được. Cần quy tắc xử lý, như giữ tâm cũ hoặc khởi tạo lại. Thuật toán nhạy với thang đo vì mục tiêu dựa trên khoảng cách Euclid.
-->


---

<div class="track"><span>14 – K-means và phân nhóm khách hàng</span><span>ML tổng hợp</span></div>

# Hai bước của K-means



$$
z_i\leftarrow\arg\min_k\|\phi(x_i)-\mu_k\|^2
$$



$$
\mu_k\leftarrow\frac1{|C_k|}\sum_{i\in C_k}\phi(x_i)
$$


- Giữ tâm để gán về cụm gần nhất
- Giữ phép gán để cập nhật tâm bằng trung bình


<div class="note">Cụm rỗng cần quy tắc riêng. Dừng khi gán/tâm ổn định hoặc đạt tiêu chí đã chọn</div>



<!--
Nguồn: Hoc_may_Tong_hop_chuyen_sau_3_bai_giang.pdf, trang 145, 146.



K-means là phương pháp **phân cụm không giám sát**. Dữ liệu chỉ có vector đặc trưng $v_i=\phi(x_i)$, không cần nhãn lớp. Thuật toán tìm $K$ tâm $\mu_k$ và gán cụm $z_i$ để các điểm gần tâm cụm của mình.

$$J(z,\mu)=\sum_{i=1}^{n}\|v_i-\mu_{z_i}\|^2,\qquad
\min_{z,\mu}J(z,\mu).$$

### Bước 1. Giữ tâm cố định, gán điểm về tâm gần nhất

$$z_i\leftarrow\operatorname*{arg\,min}_{k\in\{1,\ldots,K\}}
\|v_i-\mu_k\|^2.$$

Mỗi điểm chọn một tâm làm khoảng cách bình phương nhỏ nhất. Khi đồng hạng cần có quy tắc chọn nhất quán.

### Bước 2. Giữ phép gán cố định, cập nhật tâm bằng trung bình

$$\mu_k\leftarrow\frac1{|C_k|}\sum_{i\in C_k}v_i,\qquad
C_k=\{i:z_i=k\}.$$

Sau đó lặp lại hai bước. Có thể dừng khi phép gán không đổi, tâm dịch chuyển rất ít, loss cải thiện không đáng kể hoặc đạt số vòng tối đa.

### Những điểm cần phân biệt với phân loại

Trong phân loại, nhãn như “mèo” hay “chó” đã có ý nghĩa từ dữ liệu train. Trong K-means, chỉ số cụm 1 hay 2 có thể hoán đổi mà nghiệm vẫn tương đương. Một cụm không tự động là một lớp có ý nghĩa ngữ nghĩa.

Nếu một cụm không có điểm nào, phép chia cho số điểm không thực hiện được. Cần quy tắc xử lý, như giữ tâm cũ hoặc khởi tạo lại. Thuật toán nhạy với thang đo vì mục tiêu dựa trên khoảng cách Euclid.

Giữ ví dụ một chiều với bốn điểm $\{0,2,10,12\}$, hai tâm ban đầu $\mu_1=0,\mu_2=10$.

### Vòng đầu tiên

Điểm không và hai gần tâm thứ nhất. Điểm mười và mười hai gần tâm thứ hai. Loss với tâm ban đầu và phép gán này là:

$$J=0^2+2^2+0^2+2^2=8.$$

Cập nhật tâm bằng trung bình:

$$\mu_1=\frac{0+2}{2}=1,\qquad
\mu_2=\frac{10+12}{2}=11.$$

$$J_{\rm new}=(0-1)^2+(2-1)^2+(10-11)^2+(12-11)^2=4.$$

Gán lại không đổi, nên ví dụ đã ổn định. Tâm cụm không cần trùng một điểm dữ liệu.

### Vì sao trung bình là nghiệm tối ưu của một cụm?

Giữ các thành viên cụm cố định và lấy đạo hàm theo tâm:

$$\nabla_{\mu_k}\sum_{i\in C_k}\|v_i-\mu_k\|^2
=2\sum_{i\in C_k}(\mu_k-v_i)=0.$$

Giải ra đúng công thức trung bình. Với cụm không rỗng, đây là cực tiểu duy nhất của bài toán con bậc hai.

### Vì sao toàn bộ mục tiêu không tăng?

$$J(z^{t+1},\mu^{t+1})\le J(z^{t+1},\mu^t)\le J(z^t,\mu^t).$$

Bước gán chọn tâm tốt nhất cho từng điểm, bước cập nhật chọn tâm tốt nhất cho từng cụm. Tuy nhiên, bài toán chung không lồi theo cả phép gán và tâm. Loss giảm không bảo đảm nghiệm toàn cục. Nên chạy nhiều khởi tạo. K-means++ hỗ trợ chọn tâm ban đầu nhưng không bảo đảm tìm nghiệm tốt nhất.
-->


---

<div class="track"><span>14 – K-means và phân nhóm khách hàng</span><span>ML tổng hợp</span></div>

# Ví dụ bốn điểm


Dữ liệu: **0, 2, 10, 12**, tâm ban đầu **0 và 10**

<div class="step" v-click><b>01</b><span>Gán cụm: {0,2} và {10,12}, loss = 8</span></div>

<div class="step" v-click><b>02</b><span>Cập nhật tâm: 1 và 11</span></div>


<div class="answer" v-click>Loss mới = <b>4</b>. Gán lại không đổi</div>



<div class="note">Tâm không cần trùng một điểm dữ liệu</div>



<!--
Nguồn: Hoc_may_Tong_hop_chuyen_sau_3_bai_giang.pdf, trang 146, 148.



Giữ ví dụ một chiều với bốn điểm $\{0,2,10,12\}$, hai tâm ban đầu $\mu_1=0,\mu_2=10$.

### Vòng đầu tiên

Điểm không và hai gần tâm thứ nhất. Điểm mười và mười hai gần tâm thứ hai. Loss với tâm ban đầu và phép gán này là:

$$J=0^2+2^2+0^2+2^2=8.$$

Cập nhật tâm bằng trung bình:

$$\mu_1=\frac{0+2}{2}=1,\qquad
\mu_2=\frac{10+12}{2}=11.$$

$$J_{\rm new}=(0-1)^2+(2-1)^2+(10-11)^2+(12-11)^2=4.$$

Gán lại không đổi, nên ví dụ đã ổn định. Tâm cụm không cần trùng một điểm dữ liệu.

### Vì sao trung bình là nghiệm tối ưu của một cụm?

Giữ các thành viên cụm cố định và lấy đạo hàm theo tâm:

$$\nabla_{\mu_k}\sum_{i\in C_k}\|v_i-\mu_k\|^2
=2\sum_{i\in C_k}(\mu_k-v_i)=0.$$

Giải ra đúng công thức trung bình. Với cụm không rỗng, đây là cực tiểu duy nhất của bài toán con bậc hai.

### Vì sao toàn bộ mục tiêu không tăng?

$$J(z^{t+1},\mu^{t+1})\le J(z^{t+1},\mu^t)\le J(z^t,\mu^t).$$

Bước gán chọn tâm tốt nhất cho từng điểm, bước cập nhật chọn tâm tốt nhất cho từng cụm. Tuy nhiên, bài toán chung không lồi theo cả phép gán và tâm. Loss giảm không bảo đảm nghiệm toàn cục. Nên chạy nhiều khởi tạo. K-means++ hỗ trợ chọn tâm ban đầu nhưng không bảo đảm tìm nghiệm tốt nhất.

Panel C077 • Bản render nguyên trang từ [C], trang PDF 77. Nội dung trong panel là bản gốc.

Panel C080 • Bản render nguyên trang từ [C], trang PDF 80. Nội dung trong panel là bản gốc.

### Cách đọc và giải thích

C077 giữ bốn điểm 0,2,10,12 và tâm ban đầu 0,10. Sau gán, tâm mới là 1,11. C080 nhấn mạnh loss giảm không chứng minh nghiệm toàn cục. C081 nối biểu diễn, chuẩn hóa, số cụm, khởi tạo và mục tiêu. [DIỄN GIẢI] Tâm là trung bình nên không cần là một quan sát gốc, còn chỉ số cụm chỉ là tên có thể hoán vị. Panel còn lại của nhóm được phóng riêng ở trang kế tiếp.

**Tự kiểm tra (áp dụng cho các panel trên):** Tổng khoảng cách bình phương thay từ bao nhiêu xuống bao nhiêu sau cập nhật trong ví dụ?

**Đáp án và ý nghĩa:** Với phép gán đã nêu, từ tám xuống bốn. Gán lại không đổi, nhưng một ví dụ hội tụ không chứng minh mọi khởi tạo đều tốt.
-->


---

<div class="track"><span>14 – K-means và phân nhóm khách hàng</span><span>ML tổng hợp</span></div>

# Loss không tăng và giới hạn nghiệm



$$
J(z^{t+1},\mu^{t+1})\le J(z^{t+1},\mu^t)\le J(z^t,\mu^t)
$$


- Hai bước đều giải tốt nhất bài toán con khi giữ phần còn lại cố định
- Nghiệm chung có thể phụ thuộc khởi tạo
- Chạy nhiều lần, so loss với cùng $K$
- K-means++ hỗ trợ khởi tạo, chưa bảo đảm nghiệm toàn cục


<div class="note">Thêm cụm thường giảm loss. Chọn K chỉ theo loss nhỏ nhất có thể dẫn tới mỗi điểm một cụm</div>



<!--
Nguồn: Hoc_may_Tong_hop_chuyen_sau_3_bai_giang.pdf, trang 146, 148, 149.



Giữ ví dụ một chiều với bốn điểm $\{0,2,10,12\}$, hai tâm ban đầu $\mu_1=0,\mu_2=10$.

### Vòng đầu tiên

Điểm không và hai gần tâm thứ nhất. Điểm mười và mười hai gần tâm thứ hai. Loss với tâm ban đầu và phép gán này là:

$$J=0^2+2^2+0^2+2^2=8.$$

Cập nhật tâm bằng trung bình:

$$\mu_1=\frac{0+2}{2}=1,\qquad
\mu_2=\frac{10+12}{2}=11.$$

$$J_{\rm new}=(0-1)^2+(2-1)^2+(10-11)^2+(12-11)^2=4.$$

Gán lại không đổi, nên ví dụ đã ổn định. Tâm cụm không cần trùng một điểm dữ liệu.

### Vì sao trung bình là nghiệm tối ưu của một cụm?

Giữ các thành viên cụm cố định và lấy đạo hàm theo tâm:

$$\nabla_{\mu_k}\sum_{i\in C_k}\|v_i-\mu_k\|^2
=2\sum_{i\in C_k}(\mu_k-v_i)=0.$$

Giải ra đúng công thức trung bình. Với cụm không rỗng, đây là cực tiểu duy nhất của bài toán con bậc hai.

### Vì sao toàn bộ mục tiêu không tăng?

$$J(z^{t+1},\mu^{t+1})\le J(z^{t+1},\mu^t)\le J(z^t,\mu^t).$$

Bước gán chọn tâm tốt nhất cho từng điểm, bước cập nhật chọn tâm tốt nhất cho từng cụm. Tuy nhiên, bài toán chung không lồi theo cả phép gán và tâm. Loss giảm không bảo đảm nghiệm toàn cục. Nên chạy nhiều khởi tạo. K-means++ hỗ trợ chọn tâm ban đầu nhưng không bảo đảm tìm nghiệm tốt nhất.

Panel C077 • Bản render nguyên trang từ [C], trang PDF 77. Nội dung trong panel là bản gốc.

Panel C080 • Bản render nguyên trang từ [C], trang PDF 80. Nội dung trong panel là bản gốc.

### Cách đọc và giải thích

C077 giữ bốn điểm 0,2,10,12 và tâm ban đầu 0,10. Sau gán, tâm mới là 1,11. C080 nhấn mạnh loss giảm không chứng minh nghiệm toàn cục. C081 nối biểu diễn, chuẩn hóa, số cụm, khởi tạo và mục tiêu. [DIỄN GIẢI] Tâm là trung bình nên không cần là một quan sát gốc, còn chỉ số cụm chỉ là tên có thể hoán vị. Panel còn lại của nhóm được phóng riêng ở trang kế tiếp.

**Tự kiểm tra (áp dụng cho các panel trên):** Tổng khoảng cách bình phương thay từ bao nhiêu xuống bao nhiêu sau cập nhật trong ví dụ?

**Đáp án và ý nghĩa:** Với phép gán đã nêu, từ tám xuống bốn. Gán lại không đổi, nhưng một ví dụ hội tụ không chứng minh mọi khởi tạo đều tốt.

Panel C081 • Bản render nguyên trang từ [C], trang PDF 81. Nội dung trong panel là bản gốc.

### Cách đọc và giải thích

Sau gán, tâm mới là 1,11. C081 nối biểu diễn, chuẩn hóa, số cụm, khởi tạo và mục tiêu. [DIỄN GIẢI] Tâm là trung bình nên không cần là một quan sát gốc, còn chỉ số cụm chỉ là tên có thể hoán vị.

**Tự kiểm tra (áp dụng cho các panel trên):** Tổng khoảng cách bình phương thay từ bao nhiêu xuống bao nhiêu sau cập nhật trong ví dụ?

**Đáp án và ý nghĩa:** Với phép gán đã nêu, từ tám xuống bốn. Gán lại không đổi, nhưng một ví dụ hội tụ không chứng minh mọi khởi tạo đều tốt.
-->


---

<div class="track"><span>14 – K-means và phân nhóm khách hàng</span><span>ML tổng hợp</span></div>

# RFM và hình chiếu PCA


<figure><img src="/images/rfm.png" style="max-height:255px" alt="PCA hai chiều của các cụm hành vi, panel C083"/><figcaption>PCA hai chiều của các cụm hành vi, panel C083</figcaption></figure>

**R**: thời gian từ lần mua gần nhất. **F**: tần suất. **M**: chi tiêu


<div class="note">Chuẩn hóa thang đo phù hợp. Trục PCA khác đặc trưng RFM gốc. Tên cụm cần dựa vào thống kê và mục đích sử dụng</div>



<!--
Nguồn: Hoc_may_Tong_hop_chuyen_sau_3_bai_giang.pdf, trang 147, 150.



### Vì sao không chọn số cụm chỉ bằng loss nhỏ nhất?

Cho thêm tâm thường làm loss tối ưu giảm hoặc giữ nguyên. Nếu mỗi điểm có một tâm, loss có thể bằng không nhưng phân cụm không còn hữu ích cho mục tiêu tóm tắt dữ liệu. Cần cân bằng độ gọn, khả năng giải thích và mục đích sử dụng.

Đặc trưng có thang đo lớn có thể chi phối khoảng cách. Ví dụ tiền chi tiêu hàng triệu và tần suất mua vài lần không nên được ghép thô mà không xem xét chuẩn hóa hoặc biến đổi phù hợp.

### Ví dụ phân nhóm khách hàng trong slide

Slide mô tả nghiên cứu dữ liệu hơn 189.000 bản ghi giao dịch của một tiệm bánh tại Brazil, dùng RFM và $K=4$. Các thông tin này được dẫn lại theo slide, không phải kiểm chứng độc lập bài nghiên cứu.

- **Recency:** số ngày từ lần mua gần nhất. Thường giá trị nhỏ nghĩa là mới mua.
- **Frequency:** tần suất mua.
- **Monetary:** mức chi tiêu.

Các cụm được slide diễn giải là: ít mua và lâu chưa quay lại, mới mua nhưng tần suất thấp, mua thường xuyên và chi tiêu cao, từng mua nhiều nhưng gần đây giảm hoạt động. Đây là **diễn giải sau khi phân cụm**, không phải nhãn mà K-means được cho trước.

Tên cụm chỉ có ý nghĩa sau khi xem tâm cụm và phân bố RFM. Số thứ tự cụm có thể thay đổi giữa các lần chạy.

Panel C083 • Bản render nguyên trang từ [C], trang PDF 83. Nội dung trong panel là bản gốc.

### Cách đọc và giải thích

Mỗi chấm là một quan sát khách hàng theo cách biểu diễn của nghiên cứu được slide dẫn, màu là chỉ số cụm. Trục là các thành phần chính PCA, không trực tiếp là số tiền hay số ngày. Chú thích dưới hình gán ý nghĩa hành vi cho bốn cụm dựa trên phân tích RFM. [DIỄN GIẢI] Hình chiếu hai chiều có thể mất cấu trúc so với không gian gốc, nên không tự coi khoảng cách trên hình là toàn bộ khoảng cách dùng phân cụm.

Thông tin hơn 189.000 giao dịch, tiệm bánh Brazil, K=4 và tên nghiên cứu được giữ theo C082. Không xem đây là kết quả được kiểm chứng độc lập trong bản tổng hợp.

**Tự kiểm tra (áp dụng cho các panel trên):** Màu cụm số hai có tự mang ý nghĩa khách hàng tốt trong mọi lần chạy K-means không?

**Đáp án và ý nghĩa:** Không. Số thứ tự có thể đổi. Cần xem tâm cụm, thống kê RFM và mục tiêu sử dụng trước khi đặt tên hành vi.
-->


---

<div class="track"><span>14 – K-means và phân nhóm khách hàng</span><span>ML tổng hợp</span></div>

# Tự luyện – Màu số 2 luôn là khách hàng mua nhiều?



<div class="answer" v-click>Không. Chỉ số cụm có thể hoán vị giữa lần chạy. Phải xem tâm, phân bố RFM và mục tiêu trước khi đặt tên.</div>



<div class="note">Thử trả lời trước khi bấm Tiếp</div>



<!--
Nguồn: Hoc_may_Tong_hop_chuyen_sau_3_bai_giang.pdf, trang 147, 150, 174.



### Vì sao không chọn số cụm chỉ bằng loss nhỏ nhất?

Cho thêm tâm thường làm loss tối ưu giảm hoặc giữ nguyên. Nếu mỗi điểm có một tâm, loss có thể bằng không nhưng phân cụm không còn hữu ích cho mục tiêu tóm tắt dữ liệu. Cần cân bằng độ gọn, khả năng giải thích và mục đích sử dụng.

Đặc trưng có thang đo lớn có thể chi phối khoảng cách. Ví dụ tiền chi tiêu hàng triệu và tần suất mua vài lần không nên được ghép thô mà không xem xét chuẩn hóa hoặc biến đổi phù hợp.

### Ví dụ phân nhóm khách hàng trong slide

Slide mô tả nghiên cứu dữ liệu hơn 189.000 bản ghi giao dịch của một tiệm bánh tại Brazil, dùng RFM và $K=4$. Các thông tin này được dẫn lại theo slide, không phải kiểm chứng độc lập bài nghiên cứu.

- **Recency:** số ngày từ lần mua gần nhất. Thường giá trị nhỏ nghĩa là mới mua.
- **Frequency:** tần suất mua.
- **Monetary:** mức chi tiêu.

Các cụm được slide diễn giải là: ít mua và lâu chưa quay lại, mới mua nhưng tần suất thấp, mua thường xuyên và chi tiêu cao, từng mua nhiều nhưng gần đây giảm hoạt động. Đây là **diễn giải sau khi phân cụm**, không phải nhãn mà K-means được cho trước.

Tên cụm chỉ có ý nghĩa sau khi xem tâm cụm và phân bố RFM. Số thứ tự cụm có thể thay đổi giữa các lần chạy.

Panel C083 • Bản render nguyên trang từ [C], trang PDF 83. Nội dung trong panel là bản gốc.

### Cách đọc và giải thích

Mỗi chấm là một quan sát khách hàng theo cách biểu diễn của nghiên cứu được slide dẫn, màu là chỉ số cụm. Trục là các thành phần chính PCA, không trực tiếp là số tiền hay số ngày. Chú thích dưới hình gán ý nghĩa hành vi cho bốn cụm dựa trên phân tích RFM. [DIỄN GIẢI] Hình chiếu hai chiều có thể mất cấu trúc so với không gian gốc, nên không tự coi khoảng cách trên hình là toàn bộ khoảng cách dùng phân cụm.

Thông tin hơn 189.000 giao dịch, tiệm bánh Brazil, K=4 và tên nghiên cứu được giữ theo C082. Không xem đây là kết quả được kiểm chứng độc lập trong bản tổng hợp.

**Tự kiểm tra (áp dụng cho các panel trên):** Màu cụm số hai có tự mang ý nghĩa khách hàng tốt trong mọi lần chạy K-means không?

**Đáp án và ý nghĩa:** Không. Số thứ tự có thể đổi. Cần xem tâm cụm, thống kê RFM và mục tiêu sử dụng trước khi đặt tên hành vi.

**[CÂU HỎI BIÊN SOẠN]** Dựa trên nội dung chương. Hãy tự trả lời trước rồi mới xem phần giải thích dưới từng câu.

### 14.1 • Ghi nhớ

**K-means lặp hai bước gì?**

Giữ tâm để gán mỗi điểm về tâm gần nhất, rồi giữ phép gán để cập nhật tâm bằng trung bình.

### 14.2 • Thông hiểu

**Vì sao tâm là trung bình?**

Đạo hàm tổng bình phương khoảng cách trong một cụm bằng hai lần tổng tâm trừ điểm. Cho bằng không giải ra trung bình.

### 14.3 • Vận dụng

**Dữ liệu 0,2,10,12, tâm 0 và 10: bước đầu?**

Gán (0,2) và (10,12). Tâm mới một và mười một. Loss từ tám giảm xuống bốn, phép gán sau đó không đổi.

### 14.4 • Phân tích

**Vì sao không chọn K chỉ theo loss nhỏ nhất?**

Thêm tâm thường giảm loss. Nếu mỗi điểm có một tâm thì loss có thể bằng không nhưng không còn tóm tắt có ích.

### 14.5 • Đánh giá

**Các màu PCA có đủ để đặt chiến lược chăm sóc khách hàng?**

Chưa. Cần thống kê RFM của cụm, ý nghĩa kinh doanh, độ ổn định và kiểm tra trong không gian đặc trưng, không chỉ hình chiếu.
-->


---

# Các điểm dễ nhầm


| Cặp | Phân biệt ngắn |
|---|---|
| Model / optimizer | Hàm dự đoán / cách tìm tham số |
| Score / xác suất | Điểm thô / phân phối sau biến đổi |
| Backprop / update | Tính gradient / thay tham số |
| Feature / template | Phép đo cụ thể / họ quy tắc |
| Attention / collapse | Kết hợp vị trí / thu thành đại diện |
| Loss giảm / test tốt | Tối ưu dữ liệu học / đánh giá dữ liệu mới |


<!--
Nguồn: Hoc_may_Tong_hop_chuyen_sau_3_bai_giang.pdf, trang 158, 159, 160.



| Vị trí nguồn | Vấn đề | Cách trình bày trong bản tổng hợp |
|---|---|---|
| [A], trang 14 và 17 | Gọi đầu ra hồi quy/có cấu trúc là classifier | Dùng “bộ dự đoán”, phân biệt loại đầu ra |
| [A], trang 53–57 | Hình dung số đường theo số lớp, score gắn với khoảng cách | Viết ranh giới cặp lớp, khoảng cách chuẩn hóa theo chuẩn trọng số |
| [A], trang 65 | Không nhất quán quy ước ở score bằng không | Đếm lỗi bằng nhãn dự đoán, chốt quy tắc chọn lớp |
| [A], trang 70–71 | Cách nói SVM và dấu trong công thức đa lớp dễ gây nhầm | SVM có cả nhị phân và đa lớp, loss là phần dương của score sai trừ score đúng cộng biên |
| [B], trang 10 | ERM ghi gần 1,09 | Tính lại từ dữ liệu được $194/179\approx1.0838$ |
| [B], trang 24–25 | Tỷ lệ chữ cái 0,85 không khớp chuỗi nếu tính theo ký tự | Giữ phép tính minh họa, đồng thời nêu tỷ lệ $10/13$ với định nghĩa rõ |
| [B], trang 40 và 62–69 | Bias lớp ẩn không nhất quán giữa thiết lập và phần backprop | Dùng $b^{[1]}=[0,-2]^\top$ xuyên suốt, bảo toàn forward và backward |
| [C], trang 26 | Cách dịch recurrent dễ nhầm với regression | Giải thích là hồi tiếp theo thời gian |
| [C], trang 39 | Residual được mô tả như bảo đảm backprop | Diễn giải là hỗ trợ luồng gradient, không bảo đảm ổn định tuyệt đối |
| [C], trang 40 | Tên “Layer information”, thiếu scale và shift trong công thức rút gọn | Dùng Layer Normalization và công thức đầy đủ |
| [C], trang 43–44 | Sơ đồ minh họa BERT với 24 khối | Không suy rộng mọi BERT đều có 24 lớp |
| [C], trang 63 | Hạng sai số ước lượng gộp kết quả mô hình thực học | Ghi rõ có thể chứa ảnh hưởng của sai số tối ưu |

**Quy ước làm tròn:** giữ nhiều chữ số khi tính, chỉ làm tròn lúc trình bày. Các sai khác ở chữ số cuối không làm đổi ý nghĩa ví dụ. Hình gốc có thể giữ ký hiệu cũ, phần giải thích và công thức bên ngoài hình dùng quy ước đã thống nhất.

| Dễ nhầm | Cách phân biệt và tránh sai |
|---|---|
| Tuyến tính theo đầu vào / trọng số | Nêu rõ biến xét. Feature chứa bình phương vẫn tuyến tính theo trọng số cố định. |
| Score / xác suất | Score có thể âm và không có tổng bằng một. Sigmoid hoặc softmax mới tạo đầu ra dạng xác suất theo mô hình. |
| Functional margin / khoảng cách | Margin là nhãn nhân score. Khoảng cách tới siêu phẳng cần chuẩn hóa bởi chuẩn trọng số. |
| Loss từng mẫu / hàm mục tiêu | Hàm mục tiêu có thể trung bình, thêm L2 hoặc lấy max nhóm. Đạo hàm phải theo đúng phép tổng hợp. |
| Backprop / optimizer | Backprop tính gradient. Optimizer thay tham số bằng gradient theo quy tắc cập nhật. |
| Batch / epoch | Một batch là nhóm dùng trong một bước. Một epoch là lượt đi qua toàn bộ train. |
| Embedding / hidden state | Bảng tra ban đầu so với biểu diễn sau khi kết hợp ngữ cảnh. |
| Self-attention / collapse | Self-attention thường giữ chuỗi vị trí. Collapse thu chuỗi thành đại diện cho tác vụ. |
| RNN / regression | Recurrent nói tới hồi tiếp theo thời gian. Regression nói tới dự đoán đại lượng số. |
| BERT hỏi đáp / LM sinh | Chọn span trong đoạn khác chọn token mới theo từng bước. |

### Một lỗi biểu diễn thêm cần ghi nhớ

**[B], trang PDF 18:** số liệu và phép tính của ví dụ $2+x-0.2x^2$ là nhất quán tại đầu vào ba, nhưng đồ thị trong panel mở lên. Hệ số bậc hai âm phải mở xuống. Giữ hình để đối chiếu, không dùng hình như đồ thị đúng của chính công thức này.

**Cách tự kiểm tra:** trước khi tin một hình và công thức khớp nhau, thử xét dấu, đơn vị, kích thước và một điểm dễ tính. Đây là nhận định phương pháp bổ sung, không phải dữ kiện thực nghiệm từ slide.

| Suy luận dễ mắc | Vì sao chưa đúng? | Cách kiểm tra |
|---|---|---|
| Train loss thấp nên test tốt | Mạng có thể ghi nhớ, dữ liệu mới có thể khác phân phối. | Dùng test giữ riêng sau lựa chọn cấu hình. |
| Loss giảm nên nghiệm toàn cục | Mạng và K-means có thể mắc nghiệm cục bộ hoặc cấu hình kém. | Xét cấu trúc tối ưu, nhiều khởi tạo khi phù hợp. |
| Nhiều feature luôn tốt | Có thể tăng sai số ước lượng và quá khớp. | So validation, điều chuẩn và lượng dữ liệu. |
| Accuracy cao nên mọi lớp/nhóm đều tốt | Trung bình che nhóm ít mẫu hoặc loại nhầm quan trọng. | Confusion matrix và metric theo nhóm. |
| Chọn checkpoint bằng test | Test đã tham gia quá trình chọn nên mất vai trò đánh giá cuối độc lập. | Dùng validation/CV cho lựa chọn. |
| Chuẩn hóa cả bộ rồi chia fold là vô hại | Thống kê validation đã lọt vào tiền xử lý. | Fit phép biến đổi trong train của từng fold. |
| K lớn hơn có loss thấp hơn nên tốt hơn | Thêm tâm có thể giảm loss ngay cả khi không hữu ích. | Đánh giá độ gọn, ổn định và mục tiêu sử dụng. |
| Nhìn hai cụm trên PCA là thấy mọi khoảng cách gốc | Chiếu hai chiều có thể mất thông tin. | Xem đặc trưng gốc, tâm và phân bố cụm. |

### Phân biệt lỗi nguồn và phần giải thích bổ sung

Những thay đổi ký hiệu, bias hoặc dấu được đối chiếu với nguồn ở D1/D2. Các quy tắc thực nghiệm và giới hạn trên là phần giải thích phương pháp dựa trên nội dung nguồn hoặc bổ sung đã nêu trong các chương. Không được tự quy mọi lỗi mô hình cho một nguyên nhân chỉ từ một biểu đồ.
-->


---

# Các hiệu chỉnh cần giữ đúng


| Ví dụ trong nguồn | Kết quả nhất quán dùng trong bộ slide |
|---|---|
| Group DRO | ERM ≈ 1,0838, không làm tròn thành 1,09 |
| Parabol $2+x-0.2x^2$ | Mở xuống, dù hình nguồn mở lên |
| Email | 0,85 là giá trị minh họa, phép đếm ký tự cho 10/13 |
| Forward/backprop hai lớp | Bias lớp ẩn (0, −2) |
| Multiclass hinge | Score sai − score đúng + biên |
| LayerNorm | Tên đúng, có scale/shift học được |


<!--
Nguồn: Hoc_may_Tong_hop_chuyen_sau_3_bai_giang.pdf, trang 158, 159.



| Vị trí nguồn | Vấn đề | Cách trình bày trong bản tổng hợp |
|---|---|---|
| [A], trang 14 và 17 | Gọi đầu ra hồi quy/có cấu trúc là classifier | Dùng “bộ dự đoán”, phân biệt loại đầu ra |
| [A], trang 53–57 | Hình dung số đường theo số lớp, score gắn với khoảng cách | Viết ranh giới cặp lớp, khoảng cách chuẩn hóa theo chuẩn trọng số |
| [A], trang 65 | Không nhất quán quy ước ở score bằng không | Đếm lỗi bằng nhãn dự đoán, chốt quy tắc chọn lớp |
| [A], trang 70–71 | Cách nói SVM và dấu trong công thức đa lớp dễ gây nhầm | SVM có cả nhị phân và đa lớp, loss là phần dương của score sai trừ score đúng cộng biên |
| [B], trang 10 | ERM ghi gần 1,09 | Tính lại từ dữ liệu được $194/179\approx1.0838$ |
| [B], trang 24–25 | Tỷ lệ chữ cái 0,85 không khớp chuỗi nếu tính theo ký tự | Giữ phép tính minh họa, đồng thời nêu tỷ lệ $10/13$ với định nghĩa rõ |
| [B], trang 40 và 62–69 | Bias lớp ẩn không nhất quán giữa thiết lập và phần backprop | Dùng $b^{[1]}=[0,-2]^\top$ xuyên suốt, bảo toàn forward và backward |
| [C], trang 26 | Cách dịch recurrent dễ nhầm với regression | Giải thích là hồi tiếp theo thời gian |
| [C], trang 39 | Residual được mô tả như bảo đảm backprop | Diễn giải là hỗ trợ luồng gradient, không bảo đảm ổn định tuyệt đối |
| [C], trang 40 | Tên “Layer information”, thiếu scale và shift trong công thức rút gọn | Dùng Layer Normalization và công thức đầy đủ |
| [C], trang 43–44 | Sơ đồ minh họa BERT với 24 khối | Không suy rộng mọi BERT đều có 24 lớp |
| [C], trang 63 | Hạng sai số ước lượng gộp kết quả mô hình thực học | Ghi rõ có thể chứa ảnh hưởng của sai số tối ưu |

**Quy ước làm tròn:** giữ nhiều chữ số khi tính, chỉ làm tròn lúc trình bày. Các sai khác ở chữ số cuối không làm đổi ý nghĩa ví dụ. Hình gốc có thể giữ ký hiệu cũ, phần giải thích và công thức bên ngoài hình dùng quy ước đã thống nhất.

| Dễ nhầm | Cách phân biệt và tránh sai |
|---|---|
| Tuyến tính theo đầu vào / trọng số | Nêu rõ biến xét. Feature chứa bình phương vẫn tuyến tính theo trọng số cố định. |
| Score / xác suất | Score có thể âm và không có tổng bằng một. Sigmoid hoặc softmax mới tạo đầu ra dạng xác suất theo mô hình. |
| Functional margin / khoảng cách | Margin là nhãn nhân score. Khoảng cách tới siêu phẳng cần chuẩn hóa bởi chuẩn trọng số. |
| Loss từng mẫu / hàm mục tiêu | Hàm mục tiêu có thể trung bình, thêm L2 hoặc lấy max nhóm. Đạo hàm phải theo đúng phép tổng hợp. |
| Backprop / optimizer | Backprop tính gradient. Optimizer thay tham số bằng gradient theo quy tắc cập nhật. |
| Batch / epoch | Một batch là nhóm dùng trong một bước. Một epoch là lượt đi qua toàn bộ train. |
| Embedding / hidden state | Bảng tra ban đầu so với biểu diễn sau khi kết hợp ngữ cảnh. |
| Self-attention / collapse | Self-attention thường giữ chuỗi vị trí. Collapse thu chuỗi thành đại diện cho tác vụ. |
| RNN / regression | Recurrent nói tới hồi tiếp theo thời gian. Regression nói tới dự đoán đại lượng số. |
| BERT hỏi đáp / LM sinh | Chọn span trong đoạn khác chọn token mới theo từng bước. |

### Một lỗi biểu diễn thêm cần ghi nhớ

**[B], trang PDF 18:** số liệu và phép tính của ví dụ $2+x-0.2x^2$ là nhất quán tại đầu vào ba, nhưng đồ thị trong panel mở lên. Hệ số bậc hai âm phải mở xuống. Giữ hình để đối chiếu, không dùng hình như đồ thị đúng của chính công thức này.

**Cách tự kiểm tra:** trước khi tin một hình và công thức khớp nhau, thử xét dấu, đơn vị, kích thước và một điểm dễ tính. Đây là nhận định phương pháp bổ sung, không phải dữ kiện thực nghiệm từ slide.
-->


---

# Tự kiểm tra theo 14 chương


<QuestionBank />


<!--
Nguồn: Hoc_may_Tong_hop_chuyen_sau_3_bai_giang.pdf, trang 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176.

Ngân hàng có 70 câu theo chương và hai bài liên chương. Nội dung lấy từ Phần E của PDF. Các câu tự luyện trong deck chỉ chọn một phần để trình bày ngắn.

**[CÂU HỎI BIÊN SOẠN]** Dựa trên nội dung chương. Hãy tự trả lời trước rồi mới xem phần giải thích dưới từng câu.

### 1.1 • Ghi nhớ

**Ba quyết định thiết kế là gì?**

Lớp giả thuyết chọn các hàm được phép, loss định nghĩa tốt/xấu, optimizer tìm tham số. Không thay một quyết định bằng tên của quyết định khác.

### 1.2 • Thông hiểu

**Vì sao tên lớp bằng số chưa làm bài toán thành hồi quy?**

Các số có thể chỉ là mã. Cần xét ý nghĩa: chọn lớp rời rạc hay đo đại lượng có khoảng cách và đơn vị.

### 1.3 • Vận dụng

**Phân loại ba tác vụ: gian lận, giá nhà, bản dịch.**

Gian lận là nhị phân, giá nhà là hồi quy, bản dịch là đầu ra chuỗi có cấu trúc. Cùng kiểu đầu vào không buộc cùng loại đầu ra.

### 1.4 • Phân tích

**Một mô hình đoán nhanh có chứng minh bước học ít tốn kém?**

Không. Inference và training khác nhau. Training có thể cần nhiều vòng tính gradient, còn inference chỉ chạy mô hình đã chốt.

### 1.5 • Đánh giá

**Muốn phân loại ảnh mới, cần chốt gì trước khi chọn mạng?**

Xác định nhãn, dữ liệu đại diện, cách chia/metric, rồi chọn lớp mô hình, loss và tối ưu phù hợp. Kiểm tra bằng dữ liệu mới.

**[CÂU HỎI BIÊN SOẠN]** Dựa trên nội dung chương. Hãy tự trả lời trước rồi mới xem phần giải thích dưới từng câu.

### 2.1 • Ghi nhớ

**Phần dư và MSE là gì?**

Phần dư bằng dự đoán trừ nhãn. MSE là trung bình bình phương phần dư, không phải bình phương trung bình phần dư.

### 2.2 • Thông hiểu

**Vì sao MSE nhạy với ngoại lai?**

Sai lệch lớn bị bình phương nên đóng góp tăng nhanh. Gradient cũng tỷ lệ phần dư, kéo nghiệm theo các điểm lệch lớn.

### 2.3 • Vận dụng

**Từ trọng số không, dữ liệu (1,1),(2,3),(4,3), tốc độ học 0,1: bước đầu?**

Gradient là (−14/3;−38/3). Trừ 0,1 lần gradient cho trọng số (0,4667;1,2667). Cần chia ba vì dùng trung bình.

### 2.4 • Phân tích

**Gradient bằng không có luôn nghĩa là loss bằng không?**

Không. Ở nghiệm tốt nhất trong lớp, vẫn có thể còn sai số không thể khớp. Ví dụ ba điểm có MSE tối ưu 8/21.

### 2.5 • Đánh giá

**Đường thẳng train kém: nên tăng bước học hay thêm feature?**

Trước hết xem tối ưu đã hội tụ chưa và dữ liệu có cấu trúc cong không. Hội tụ tốt nhưng lớp không biểu diễn được thì chỉnh biểu diễn, không chỉ bước học.

**[CÂU HỎI BIÊN SOẠN]** Dựa trên nội dung chương. Hãy tự trả lời trước rồi mới xem phần giải thích dưới từng câu.

### 3.1 • Ghi nhớ

**Margin nhị phân là gì?**

Với nhãn âm/dương một, margin là nhãn nhân score. Margin dương là đúng dấu, nhưng hinge chỉ hết phạt khi đạt ít nhất một.

### 3.2 • Thông hiểu

**Vì sao cần L2 cùng hinge trên dữ liệu tách được?**

Tăng scale trọng số có thể tăng margin mà không đổi ranh giới. L2 kiểm soát độ lớn và tạo đánh đổi có ý nghĩa.

### 3.3 • Vận dụng

**Nhãn −1, score −0,2: margin và hinge?**

Margin bằng 0,2. Hinge là max(0;1−0,2)=0,8. Dự đoán đúng nhưng chưa đủ biên.

### 3.4 • Phân tích

**Score (2;1;3), nhãn lớp một, biên một: hinge tổng?**

Lớp hai góp max(0;1−2+1)=0, lớp ba góp max(0;3−2+1)=2. Tổng bằng hai.

### 3.5 • Đánh giá

**Hình loss mượt hơn có đủ chứng minh luôn cho accuracy cao hơn?**

Không. Độ mượt mô tả gradient, không thay thực nghiệm và điều kiện. Cần dữ liệu, cấu hình và đánh giá phù hợp.

**[CÂU HỎI BIÊN SOẠN]** Dựa trên nội dung chương. Hãy tự trả lời trước rồi mới xem phần giải thích dưới từng câu.

### 4.1 • Ghi nhớ

**Group DRO tối ưu gì trong ví dụ?**

Tối thiểu hóa loss trung bình của nhóm có loss lớn nhất, thay vì trung bình theo mọi mẫu.

### 4.2 • Thông hiểu

**Vì sao không dùng tổng loss nhóm rồi lấy max?**

Nhóm lớn có thể trông tệ hơn chỉ vì nhiều mẫu. Trung bình trong nhóm phân biệt tỷ lệ mẫu với mức lỗi từng mẫu.

### 4.3 • Vận dụng

**Tại w=1, loss nhóm A/B và chung bằng bao nhiêu?**

A: (9+36)/2=22,5. B bằng không. Chung: (45+0)/6=7,5. Max nhóm bằng 22,5.

### 4.4 • Phân tích

**Nhóm tệ nhất tại w=1 được cập nhật ra sao với tốc độ 0,01?**

Gradient A bằng 5(1−4)=−15, nên w mới=1−0,01(−15)=1,15. Nhóm max có thể đổi sau các bước tiếp.

### 4.5 • Đánh giá

**Group DRO đã giải quyết mọi câu hỏi công bằng chưa?**

Chưa. Còn định nghĩa nhóm, chất lượng dữ liệu, loại hậu quả, quyền tiếp cận và nguyên tắc phân phối. Mục tiêu toán chỉ phản ánh một lựa chọn cụ thể.

**[CÂU HỎI BIÊN SOẠN]** Dựa trên nội dung chương. Hãy tự trả lời trước rồi mới xem phần giải thích dưới từng câu.

### 5.1 • Ghi nhớ

**Feature template khác feature thế nào?**

Template là quy tắc sinh một họ feature, còn feature cụ thể là một điều kiện/phép đo và có giá trị cho từng đầu vào.

### 5.2 • Thông hiểu

**Vì sao mô hình chứa bình phương x vẫn được gọi tuyến tính?**

Với feature cố định, score là tổng trọng số nhân feature nên tuyến tính theo trọng số, dù cong theo đầu vào.

### 5.3 • Vận dụng

**Tính ví dụ w=(2;1;−0,2), feature tại x=3.**

Feature là (1;3;9), dự đoán 2+3−1,8=3,2. Dấu hệ số bậc hai cho parabol mở xuống.

### 5.4 • Phân tích

**Khóa vắng trong sparse vector có phải luôn là dữ liệu chưa biết?**

Không. Theo quy ước ví dụ, khóa vắng là giá trị không. Giá trị thiếu cần mã hóa/quy tắc xử lý riêng.

### 5.5 • Đánh giá

**Có nên thay ví dụ email bằng chuỗi dễ đếm hơn?**

Không nếu mục tiêu bảo toàn ví dụ. Giữ bảng gốc, giải score theo bảng và nêu riêng tỷ lệ đếm lại với định nghĩa rõ.

**[CÂU HỎI BIÊN SOẠN]** Dựa trên nội dung chương. Hãy tự trả lời trước rồi mới xem phần giải thích dưới từng câu.

### 6.1 • Ghi nhớ

**Một lớp mạng truyền thẳng tính hai bước gì?**

Nhân ma trận cộng bias tạo tiền kích hoạt, rồi áp dụng activation. Đầu ra này làm đầu vào lớp tiếp.

### 6.2 • Thông hiểu

**Vì sao chồng affine không thay thế được phi tuyến?**

Phép hợp các affine vẫn là affine. Không tạo được lớp hàm cần để giải XOR theo đầu vào gốc.

### 6.3 • Vận dụng

**Trong ví dụ x=(1;2), bias (0;−2), lớp ẩn cho gì?**

Tiền kích hoạt là (3;−1), qua ReLU thành (3;0). Logit đầu ra là hai và sigmoid khoảng 0,8808.

### 6.4 • Phân tích

**Một nút ReLU bị chặn ở một mẫu đã là dying ReLU chưa?**

Chưa. Nó có thể nhận gradient ở mẫu khác. Cần xét tình trạng liên tục không hoạt động trên dữ liệu liên quan.

### 6.5 • Đánh giá

**Chọn sigmoid hay softmax cho phân loại nhiều lớp loại trừ nhau?**

Thường dùng softmax để tạo phân phối có tổng một trên các lớp loại trừ. Nhiều nhãn độc lập là một thiết lập khác, cần loss phù hợp.

**[CÂU HỎI BIÊN SOẠN]** Dựa trên nội dung chương. Hãy tự trả lời trước rồi mới xem phần giải thích dưới từng câu.

### 7.1 • Ghi nhớ

**Nguyên tắc gradient trên nhiều nhánh là gì?**

Nhân với đạo hàm cục bộ dọc từng đường và cộng các đóng góp khi một biến ảnh hưởng qua nhiều nhánh.

### 7.2 • Thông hiểu

**Vì sao cần lưu forward và chưa cập nhật giữa backward?**

Đạo hàm cục bộ dùng giá trị forward của cùng bộ tham số. Cập nhật giữa chừng làm các gradient không còn thuộc cùng hàm tại một điểm.

### 7.3 • Vận dụng

**Với J=x²+3x, tại x=2, gradient?**

Hai nhánh góp 2x=4 và ba, tổng bằng bảy. Giá trị J bằng mười là đại lượng khác gradient.

### 7.4 • Phân tích

**Tại sao đầu ra bình phương–tuyến tính không dùng p−y?**

Đạo hàm theo score bằng hai lần phần dư. p−y là rút gọn của sigmoid kết hợp BCE với nhãn 0/1.

### 7.5 • Đánh giá

**Kiểm chứng một bước học đúng nên làm gì?**

Kiểm tra kích thước, các đạo hàm và dấu, tính lại forward bằng tham số mới. Loss giảm ở mẫu chỉ là bằng chứng cục bộ, chưa chứng minh test cải thiện.

**[CÂU HỎI BIÊN SOẠN]** Dựa trên nội dung chương. Hãy tự trả lời trước rồi mới xem phần giải thích dưới từng câu.

### 8.1 • Ghi nhớ

**Hai đặc điểm giúp CNN tận dụng cấu trúc ảnh?**

Kết nối cục bộ và chia sẻ trọng số của bộ lọc qua nhiều vị trí.

### 8.2 • Thông hiểu

**Trải phẳng có làm mất giá trị pixel không?**

Không về lưu trữ nếu chỉ đổi cách sắp xếp. Nhưng dense không tự áp đặt cấu trúc lân cận và chia sẻ tham số như CNN.

### 8.3 • Vận dụng

**Tính góc trên phải của tích chập ví dụ.**

Cửa sổ gồm 1,0,1,0. Nhân bộ lọc toàn một rồi cộng được hai. Kết quả toàn bản đồ là các hàng (4;2) và (2;1).

### 8.4 • Phân tích

**ReLU có đổi ma trận kết quả này không?**

Không, mọi phần tử đều dương. Max pooling sau đó mới thu bản đồ 2×2 thành giá trị bốn.

### 8.5 • Đánh giá

**So lớp dense 100 nút với conv 16 kernel có được gọi hoàn toàn tương đương?**

Không. Phép đếm tham số minh họa cơ chế tiết kiệm, không chứng minh hai lớp có cùng chức năng hoặc cùng khả năng học.

**[CÂU HỎI BIÊN SOẠN]** Dựa trên nội dung chương. Hãy tự trả lời trước rồi mới xem phần giải thích dưới từng câu.

### 9.1 • Ghi nhớ

**Hidden state và cell state khác gì?**

Hidden state là biểu diễn truyền ra ở bước hiện tại. LSTM có thêm cell state làm đường nhớ được các cổng điều tiết.

### 9.2 • Thông hiểu

**Vì sao từ “đường” cần ngữ cảnh?**

Mặt chữ giống nhau nhưng quan hệ với xe/cà phê đổi nghĩa. Embedding tĩnh một token không tự phân biệt được hai ngữ cảnh này.

### 9.3 • Vận dụng

**Câu hỏi cha Tấm gặp chuyện gì lấy đáp án ở đâu?**

Từ đoạn văn gốc, liên kết “ông” với cha Tấm và sự kiện trước qua đời, chọn “bệnh nặng”. Không cần đưa thêm dị bản ngoài nguồn.

### 9.4 • Phân tích

**Gradient qua 19 lần co với hệ số 0,5 còn khoảng bao nhiêu?**

[BỔ SUNG] Hệ số là $0.5^{19}$, gần 1,9×10⁻⁶. Đây chỉ là minh họa tích co rút, không phải gradient đo được của RNN trong slide.

### 9.5 • Đánh giá

**Khi phân loại cảm xúc câu, average luôn tốt nhất không?**

Không. Nó dùng nhiều vị trí nhưng có thể loãng tín hiệu. Cần chọn collapse phù hợp cấu trúc mô hình, mask padding và kiểm chứng validation.

**[CÂU HỎI BIÊN SOẠN]** Dựa trên nội dung chương. Hãy tự trả lời trước rồi mới xem phần giải thích dưới từng câu.

### 10.1 • Ghi nhớ

**Query, key, value có vai trò nào?**

Query là nhu cầu truy vấn, key dùng so độ liên quan, value là nội dung được tổng hợp theo trọng số.

### 10.2 • Thông hiểu

**Attention và FFN khác gì trong Transformer?**

Attention kết hợp giữa vị trí, FFN biến đổi riêng từng vị trí bằng cùng tham số. Residual/LayerNorm hỗ trợ luồng và thang giá trị.

### 10.3 • Vận dụng

**Score (0;0;0;2) cho trọng số lớn nhất bao nhiêu?**

Vector thứ tư nhận $e^2/(3+e^2)$, xấp xỉ 0,7112. Ba vector còn lại nhận khoảng 0,0963 mỗi vector.

### 10.4 • Phân tích

**Tại sao thêm mask tương lai khi dự đoán token sau?**

Để mô hình không dùng đáp án tương lai trong tiền tố lúc huấn luyện. Không mask sẽ làm sai thiết lập dự đoán có điều kiện trước đó.

### 10.5 • Đánh giá

**Self-attention có sẵn thứ tự từ chỉ vì đầu vào là một chuỗi không?**

Chưa đủ. Cần thông tin vị trí hoặc cơ chế tương đương. Phép attention thuần trên các vector nội dung không tự xác định thứ tự mong muốn.

**[CÂU HỎI BIÊN SOẠN]** Dựa trên nội dung chương. Hãy tự trả lời trước rồi mới xem phần giải thích dưới từng câu.

### 11.1 • Ghi nhớ

**Đầu Start/End của BERT QA xuất gì?**

Điểm/xác suất theo vị trí bắt đầu và kết thúc span trong đoạn văn, không phải hai token mới tự sinh.

### 11.2 • Thông hiểu

**Teacher forcing khác lúc sinh thế nào?**

Train thường dùng token thật ở tiền tố. Lúc sinh, tiền tố chứa token mô hình đã chọn, nên một sai lựa chọn có thể ảnh hưởng các bước sau.

### 11.3 • Vận dụng

**Sau tiền tố “Tôi thích nuôi”, sinh “mèo” rồi làm gì?**

Ghép token vừa chọn vào tiền tố, tính lại hoặc tiếp tục trạng thái thích hợp để dự đoán token sau. Lặp đến điều kiện dừng.

### 11.4 • Phân tích

**Mọi BERT đều có đúng 24 khối như hình?**

Không. Hình minh họa một cấu hình, không định nghĩa số lớp chung của mọi biến thể BERT.

### 11.5 • Đánh giá

**Dịch “Chiếc xe màu đỏ” có thể chỉ dùng phân phối vô điều kiện của câu tiếng Anh không?**

Chưa phản ánh bài toán dịch. Đầu ra phải có điều kiện theo nguồn tiếng Việt, ngoài tiền tố đích đã sinh.

**[CÂU HỎI BIÊN SOẠN]** Dựa trên nội dung chương. Hãy tự trả lời trước rồi mới xem phần giải thích dưới từng câu.

### 12.1 • Ghi nhớ

**Sai số xấp xỉ do đâu?**

Do lớp giả thuyết không chứa quy tắc tốt nhất trong không gian dự đoán rộng đang xét, ngay cả khi chọn tốt nhất trong lớp.

### 12.2 • Thông hiểu

**Nhãn ngẫu nhiên chứng minh điểm gì?**

Mô hình có thể khớp train mà không học tín hiệu tổng quát hóa hữu ích. Không suy rằng mọi mạng lớn luôn dự đoán kém.

### 12.3 • Vận dụng

**Train loss giảm, validation thấp nhất ở epoch 20 rồi tăng: chọn mốc?**

Giữ checkpoint tốt nhất theo validation, chẳng hạn epoch 20 trong bảng minh họa, không mặc định lấy mốc cuối.

### 12.4 • Phân tích

**Tăng L2 mãi có luôn tốt?**

Không. L2 lớn hạn chế trọng số nhưng có thể làm mô hình không khớp quy luật quan trọng. Cần chọn hệ số trên validation.

### 12.5 • Đánh giá

**Chênh lệch tới mô hình tốt nhất trong lớp có luôn thuần do ít dữ liệu?**

Không nếu tối ưu chưa tốt. Cần phân biệt ảnh hưởng ước lượng và sai số tối ưu, đồng thời nêu quy ước phân rã đang dùng.

**[CÂU HỎI BIÊN SOẠN]** Dựa trên nội dung chương. Hãy tự trả lời trước rồi mới xem phần giải thích dưới từng câu.

### 13.1 • Ghi nhớ

**Test dùng lúc nào?**

Sau khi chốt cấu hình và quy trình phát triển, để đánh giá cuối trên dữ liệu chưa tham gia lựa chọn.

### 13.2 • Thông hiểu

**Vì sao fit chuẩn hóa trong từng fold?**

Thống kê phải chỉ học từ phần train của lượt đó. Dùng toàn bộ dữ liệu làm thông tin validation rò vào quy trình.

### 13.3 • Vận dụng

**Chữ số ba đúng 79/91, recall là gì?**

79 chia 91 ≈ 0,8681, tức 86,81%. Đây là recall lớp ba, không phải precision hay accuracy tổng.

### 13.4 • Phân tích

**Accuracy 96,89% có cho biết lớp ba tốt như lớp khác không?**

Không. Cần xem hàng/cột nhầm lẫn. Chính ví dụ cho recall lớp ba thấp hơn con số tổng thể.

### 13.5 • Đánh giá

**Có nên liên tục thử cấu hình rồi chọn theo cùng test?**

Không. Test đã trở thành công cụ lựa chọn và điểm báo cáo bị thiên lệch. Dùng validation/CV, giữ test cho đánh giá cuối.

**[CÂU HỎI BIÊN SOẠN]** Dựa trên nội dung chương. Hãy tự trả lời trước rồi mới xem phần giải thích dưới từng câu.

### 14.1 • Ghi nhớ

**K-means lặp hai bước gì?**

Giữ tâm để gán mỗi điểm về tâm gần nhất, rồi giữ phép gán để cập nhật tâm bằng trung bình.

### 14.2 • Thông hiểu

**Vì sao tâm là trung bình?**

Đạo hàm tổng bình phương khoảng cách trong một cụm bằng hai lần tổng tâm trừ điểm. Cho bằng không giải ra trung bình.

### 14.3 • Vận dụng

**Dữ liệu 0,2,10,12, tâm 0 và 10: bước đầu?**

Gán (0,2) và (10,12). Tâm mới một và mười một. Loss từ tám giảm xuống bốn, phép gán sau đó không đổi.

### 14.4 • Phân tích

**Vì sao không chọn K chỉ theo loss nhỏ nhất?**

Thêm tâm thường giảm loss. Nếu mỗi điểm có một tâm thì loss có thể bằng không nhưng không còn tóm tắt có ích.

### 14.5 • Đánh giá

**Các màu PCA có đủ để đặt chiến lược chăm sóc khách hàng?**

Chưa. Cần thống kê RFM của cụm, ý nghĩa kinh doanh, độ ổn định và kiểm tra trong không gian đặc trưng, không chỉ hình chiếu.

### Tình huống

**[VÍ DỤ BỔ SUNG]** Một hệ thống phân loại có accuracy tổng thể cao nhưng nhóm ít mẫu chịu lỗi lớn. Nhóm phát triển đề xuất tăng số lớp mạng, dùng Group DRO và chọn cấu hình bằng test. Hãy phân tích ba đề xuất.

### Hướng giải

Tách ba câu hỏi: **khả năng biểu diễn**, **mục tiêu tối ưu**, **quy trình đánh giá**. Không gán một giải pháp cho mọi loại lỗi.

### Lời giải

1. **Tăng độ sâu:** có thể giúp nếu mô hình thiếu khả năng biểu diễn, nhưng chưa chứng minh giảm chênh lệch nhóm. Cũng có thể tăng quá khớp khi nhóm ít dữ liệu.
2. **Group DRO:** trực tiếp đổi mục tiêu sang loss nhóm tệ nhất. Cần định nghĩa nhóm và đủ dữ liệu để ước lượng loss đáng tin, không tự bảo đảm mọi nguyên tắc công bằng.
3. **Chọn bằng test:** làm sai vai trò test. Chọn cấu hình và checkpoint trên validation/CV, đánh giá test khi đã chốt. Nên báo cả metric chung và từng nhóm.

### Kế hoạch có thể kiểm tra

Lập baseline, phân tích loại lỗi theo nhóm, thử thay đổi có mục tiêu, giữ quy trình chia dữ liệu nhất quán. Nếu cùng một người có nhiều mẫu, chia theo người khi cần để tránh thông tin liên quan lọt hai phía. Sau đó so validation theo cả trung bình lẫn nhóm, chốt và đánh giá test.

### Kết luận cần nhớ

Kiến trúc, hàm mục tiêu và đánh giá là ba đòn bẩy riêng. Một thay đổi tốt trên train hoặc trên một metric chưa chứng minh tốt trong mọi nhóm và mọi bối cảnh sử dụng.

### Tình huống

**[VÍ DỤ BỔ SUNG]** Một mô hình phân loại cảm xúc lấy embedding tĩnh, qua RNN một chiều, chọn hidden state đầu tiên và train tới khi loss rất nhỏ. Với câu dài, kết quả trên dữ liệu mới kém. Có thể kết luận “embedding không học được ý nghĩa” không?

### Lời giải phân tích

**Chưa đủ căn cứ.** Cần tách các nguyên nhân có thể kiểm chứng:

- **Collapse:** hidden state đầu tiên của RNN một chiều chưa thấy token phía sau, nên đầu phân loại có thể bỏ phần lớn câu dù cell được trải qua nhiều bước.
- **Phụ thuộc dài:** khi dùng trạng thái cuối, Simple RNN vẫn có thể gặp gradient nhỏ hoặc lớn qua nhiều bước. LSTM hoặc attention là các cách tổ chức thông tin khác cần đánh giá.
- **Quá khớp:** train loss thấp không chứng minh generalization. Cần theo dõi validation, điều chuẩn và checkpoint.
- **Khác phân phối/tiền xử lý:** kiểm tra chiều dài câu, token lạ và mask padding giữa train với dữ liệu sử dụng.

### Một chuỗi thay đổi có mục đích

Kiểm tra luồng thông tin của collapse trước. So last/average hoặc một đại diện phù hợp trên validation, giữ phần khác cố định khi có thể. Sau đó thử cấu trúc xử lý phụ thuộc dài nếu lỗi còn liên quan. Mỗi bước cần được giải thích bằng giả thuyết và metric.

### Liên hệ Transformer

Self-attention tạo vector có ngữ cảnh ở mỗi vị trí, nhưng vẫn cần chọn cách đại diện cả câu nếu tác vụ là phân loại câu. Không nhầm self-attention với phép tự thu gọn chuỗi.
-->


---

# Bảng tra công thức


| Chủ đề | Công thức cốt lõi |
|---|---|
| Gradient descent | $\theta\leftarrow\theta-\eta\nabla J$ |
| L2 | $J+\frac\lambda2\|w\|^2$ |
| Hinge | $\max(0,1-ys)$ |
| BCE + sigmoid | $dZ=p-y$ |
| Softmax + CE | $\partial L/\partial s_j=p_j-\mathbf1[j=y]$ |
| K-means | $\sum_i\|\phi(x_i)-\mu_{z_i}\|^2$ |


<div class="note">Kiểm tra quy ước loss, nhãn, số mẫu và kích thước trước khi thay công thức</div>



<!--
Nguồn: Hoc_may_Tong_hop_chuyen_sau_3_bai_giang.pdf, trang 177, 178, 179.



### Hồi quy và tối ưu

$$f_w(x)=w^\top\phi(x),\qquad J=\frac1n\sum_i(f_w(x_i)-y_i)^2.$$

$$\nabla_wJ=\frac2n\sum_i(f_w(x_i)-y_i)\phi(x_i),\qquad
w\leftarrow w-\eta\nabla_wJ.$$

Điều kiện: feature cố định khi đạo hàm theo trọng số, định nghĩa loss không có hệ số một phần hai. Bias có thể gộp bằng feature hằng.

### Phân loại

$$m=y(w^\top\phi(x)+b),\quad \ell_{\rm hinge}=\max(0,1-m).$$

$$\ell_{\rm logistic}=\log(1+e^{-ys}),\quad y\in\{-1,+1\}.$$

$$p=\sigma(s),\quad\ell_{\rm BCE}=-t\log p-(1-t)\log(1-p),\quad t\in\{0,1\}.$$

$$p_j=\frac{e^{s_j}}{\sum_ke^{s_k}},\quad\ell_{\rm CE}=-\log p_y.$$

### Điều chuẩn và nhóm

$$J_{\rm reg}=J+\frac\lambda2\|w\|^2,\quad\nabla J_{\rm reg}=\nabla J+\lambda w.$$

$$J_g=\frac1{n_g}\sum_{i:g_i=g}\ell_i,\qquad\min_w\max_gJ_g(w).$$

Nhớ phân biệt trung bình trong nhóm, trung bình theo mẫu và max nhóm. Hệ số L2, phạm vi phạt bias và cách làm tròn phải nhất quán với bài đang giải.

### Một mẫu

$$z^{[l]}=W^{[l]}a^{[l-1]}+b^{[l]},\qquad a^{[l]}=g^{[l]}(z^{[l]}).$$

Với sigmoid đầu ra và BCE: $dZ^{[L]}=A^{[L]}-Y$. Với đầu ra tuyến tính và bình phương không hệ số một phần hai: đạo hàm score bằng hai lần phần dư.

### Batch đặt mẫu theo cột

$$dW^{[l]}=\frac1m dZ^{[l]}(A^{[l-1]})^\top,\qquad
db^{[l]}=\frac1m\sum_{i=1}^mdZ^{[l]}_{:,i}.$$

$$dZ^{[l-1]}=(W^{[l]})^\top dZ^{[l]}\odot g'^{[l-1]}(Z^{[l-1]}).$$

Quy ước trên để hệ số trung bình ở gradient tham số. Không chia thêm một lần trong gradient đã được trung bình sẵn.

### Activation

$$\sigma'(z)=\sigma(z)(1-\sigma(z)),\quad
\tanh'(z)=1-\tanh^2z.$$

ReLU có đạo hàm không ở miền âm, một ở miền dương, có quy ước tại không. Leaky ReLU giữ độ dốc nhỏ ở miền âm.

### CNN

$$H_{\rm out}=\left\lfloor\frac{H+2p-k}{s}\right\rfloor+1.$$

Nêu rõ padding, stride, kernel và số kênh. Nhớ rằng phép toán thư viện thường gọi convolution có thể là cross-correlation.

### RNN và mô hình ngôn ngữ

$$h_t=\tanh(W_hh_{t-1}+W_xe_t+b).$$

$$p(x_{1:T})=\prod_{t=1}^T p(x_t\mid x_{<t}),\quad
\mathcal L=-\sum_t\log p(x_t\mid x_{<t}).$$

### Attention đặt token theo hàng

$$Q=HW_Q,\quad K=HW_K,\quad V=HW_V.$$

$$\operatorname{Attention}(Q,K,V)=\operatorname{softmax}\left(\frac{QK^\top}{\sqrt{d_k}}+M\right)V.$$

Softmax theo hàng, mask đúng vị trí, thêm thông tin vị trí. Ví dụ số gốc của slide dùng dot-product chưa chia tỷ lệ, nên không tự áp công thức scaled rồi mong có cùng trọng số.

### K-means

$$J=\sum_i\|\phi(x_i)-\mu_{z_i}\|^2,\quad
z_i\leftarrow\operatorname*{arg\,min}_k\|\phi(x_i)-\mu_k\|^2.$$

$$\mu_k\leftarrow\frac1{|C_k|}\sum_{i\in C_k}\phi(x_i).$$

Cụm rỗng cần xử lý riêng. Loss không tăng sau hai bước, nhưng không bảo đảm nghiệm toàn cục. So sánh loss các khởi tạo cùng số cụm, không chọn số cụm chỉ bằng loss nhỏ nhất.
-->


---

# Tài liệu và lời giải đầy đủ


**14 chương kiến thức** trong bộ slide<br/>
Ví dụ số, công thức và các điều kiện quan trọng

**72 câu ôn tập** trong ngân hàng tương tác<br/>
Đáp án, bài liên chương và checklist tự đánh giá

<StudyLinks />


<div class="note">Mở PDF theo số trang để xem lại hình nguồn, lời giải dài và bảng đối chiếu 235 trang bài giảng</div>



<!--
Nguồn: Hoc_may_Tong_hop_chuyen_sau_3_bai_giang.pdf, trang 1, 2, 180, 181, 197.

Cách tổ chức và phong cách Slidev tham khảo https://github.com/pnthuc/os-gk. Nội dung học máy lấy từ PDF người dùng cung cấp. Không có nội dung Hệ điều hành được chuyển sang deck ML.

HIỂU BẢN CHẤT • GIỮ NGUỒN GỐC • TỰ KIỂM TRA

Từ hồi quy, phân loại và tối ưu hóa đến mạng nơ-ron, CNN, RNN, Attention, Transformer và K-means.

$$\text{Biểu diễn}\ \to\ f_\theta(x)\ \to\ \mathcal L\ \to\ \nabla_\theta\mathcal L\ \to\ \text{Đánh giá}$$

14 chương có mục tiêu học tập, lý thuyết và ví dụ tính tay. Hình nguồn được giữ cạnh kiến thức liên quan, có hướng dẫn đọc và câu hỏi. Cuối sách có bảng hệ thống, điểm dễ nhầm, bài tập có lời giải, ôn nhanh và đối chiếu từng trang nguồn.

**Phạm vi:** ba PDF được cung cấp, tổng cộng **235 trang nguồn**. Các trang tiêu đề/mục lục và diễn tiến lặp được ghi nhận riêng. Nội dung trong tài liệu là dữ liệu học tập, không phải chỉ dẫn thay đổi yêu cầu người dùng.

**Công thức:** dàn bằng LaTeX. Các panel nguồn giữ nguyên cả ký hiệu gốc để đối chiếu. Hiệu chỉnh và phần giải thích thêm được tách rõ.

**Cách dùng:** học từng chương, thử trả lời câu hỏi và tự tính trước khi đọc lời giải. Dùng bookmark để chuyển chủ đề, tra Phần G khi muốn tìm một slide cụ thể.

| Mã và tài liệu | Số trang PDF | Nội dung chính | Vai trò |
|---|---:|---|---|
| **[A] Phân loại và hồi quy tuyến tính** | 75 | Tổng quan, hồi quy, gradient descent, phân loại, loss, SVM, minh họa loss theo góc | Nền tảng mô hình, mục tiêu và tối ưu |
| **[B] lecture2(slide)** | 75 | Group DRO, feature phi tuyến/template, mạng nơ-ron và backprop | Mở rộng mục tiêu và học biểu diễn |
| **[C] Diffirentiable_Programming&Machine_Learning_3** | 85 | Công bằng, CNN, ngôn ngữ, Transformer, tổng quát hóa, thực nghiệm, K-means | Kiến trúc chuyên biệt và phương pháp đánh giá |

### Phạm vi đã đọc

Đã chuyển ba nguồn sang Markdown và xem các bản render của toàn bộ 235 trang để nhận diện cả công thức, hình vector, ảnh và ví dụ. Không có tệp bị khóa hoặc trang hoàn toàn không truy cập được. Một số nhãn nhỏ và các công thức nghiên cứu mở rộng cần thận trọng, được nêu tại vị trí tương ứng.

**Số trang trong sách này** là thứ tự trang của bản tổng hợp. **Trang PDF nguồn** là thứ tự tính từ một trong từng tệp gốc, không mặc định là số in ở góc slide. Ví dụ, [B] có nhiều trang trình chiếu in cùng số 48, 50 hoặc 53.

### Phần có căn cứ và phần giải thích

- **[TỪ TÀI LIỆU]**: dữ kiện, hình, kết quả được nguồn cung cấp.
- **[DIỄN GIẢI]**: lời giải thích và phép suy ra từ dữ kiện đó.
- **[BỔ SUNG]**: công thức nền, ví dụ hay câu hỏi mới để hỗ trợ học.
- **[CẦN XÁC MINH]**: nguồn không đủ thông tin để kết luận.

Phần lý thuyết kết hợp nội dung nguồn và diễn giải, có dẫn phạm vi nguồn trên đầu mỗi mục. Panel giữ nguyên nội dung gốc. Các nghiên cứu và thí nghiệm được thuật lại theo slide, không được coi là đã kiểm chứng độc lập hay chạy lại.

### Tôi đã hiểu chắc khi có thể…

- Tự chọn loại bài toán từ ý nghĩa đầu ra và giải thích vì sao.
- Viết đúng feature, kích thước trọng số, bias và dự đoán.
- Tính loss và gradient, giải thích dấu của cập nhật.
- Nêu điều kiện công thức và chỉ ra khi không được dùng.
- Tự đọc trục, chú giải, các bước và giới hạn kết luận của một hình gốc.
- Giải lại ví dụ mà không nhìn lời giải, kiểm tra bằng thay số.
- Phân biệt giới hạn biểu diễn, khó khăn tối ưu và lỗi tổng quát hóa.
- Thiết kế cách chọn cấu hình có validation và test giữ riêng.
- Chỉ ra dữ kiện từ nguồn, diễn giải thêm và phần chưa xác minh.

### Những mốc số nên tự kiểm lại

| Ví dụ | Kết quả cần tái tính |
|---|---|
| Ba điểm hồi quy | Nghiệm (1;4/7), MSE 8/21 |
| Group DRO | ERM 194/179 ≈ 1,0838; minimax ≈ 1,5801 |
| Hai feature bậc hai | Bộ [A] cho 5,5; bộ [B] cho 3,2 ở x=3 |
| Email theo bảng gốc | Score 4,51 với tỷ lệ minh họa 0,85 |
| Mạng ReLU–sigmoid | Xác suất 0,8808 → 0,8996 sau một bước |
| Hồi quy một mẫu [C] | Loss 9 → 2,25 |
| Attention gốc | Trọng số thứ tư ≈ 0,7112 |
| Digits | Recall chữ số ba 79/91 ≈ 86,81% |
| K-means bốn điểm | Tâm 1 và 11, loss 8 → 4 |

Đây là các mốc của ví dụ cụ thể, không phải hằng số hoặc kết quả chung cho mọi mô hình. Không học thuộc số mà bỏ qua điều kiện sinh ra số.

**Nguồn [A]: Phân loại và hồi quy tuyến tính.pdf**. Mã panel gắn với thứ tự trang PDF. “Không nhúng riêng” không được hiểu là đã giữ ảnh gốc tại dòng đó; các panel minh họa và ví dụ liên quan nằm trong chương được dẫn. Ba PDF nguyên bản cũng được đính kèm bên trong tệp này để đối chiếu.

| Trang nguồn | Nội dung nhận diện | Vị trí sách | Trạng thái xử lý |
|---|---|---|---|
| A001 | Học máy | 5 | Tiêu đề/mục lục/chuyển mục, đã kiểm kê |
| A002 | Hồi quy tuyến tính | 5 | Tiêu đề/mục lục/chuyển mục, đã kiểm kê |
| A003 | 1. Tổng quan học máy (Machine Learning overview) | 5 | Tiêu đề/mục lục/chuyển mục, đã kiểm kê |
| A004 | 1. Tổng quan học máy (Machine Learning overview) | 5 | Tiêu đề/mục lục/chuyển mục, đã kiểm kê |
| A005 | Nhìn quy trình học trước khi chọn thuật toán | 9 | Giữ nguyên panel nguồn và giải thích |
| A006 | Nhìn quy trình học trước khi chọn thuật toán | 9 | Giữ nguyên panel nguồn và giải thích |
| A007 | 1. Tổng quan học máy (Machine Learning overview) | 5 | Tiêu đề/mục lục/chuyển mục, đã kiểm kê |
| A008 | Loại đầu ra quyết định loại bài toán | 10 | Giữ nguyên panel nguồn và giải thích |
| A009 | 1. Tổng quan học máy (Machine Learning overview) | 5 | Tiêu đề/mục lục/chuyển mục, đã kiểm kê |
| A010 | Loại đầu ra quyết định loại bài toán | 10 | Giữ nguyên panel nguồn và giải thích |
| A011 | Nhị phân, đa lớp và nhận dạng chữ số (1) | 11 | Giữ nguyên panel nguồn và giải thích |
| A012 | Nhị phân, đa lớp và nhận dạng chữ số (1) | 11 | Giữ nguyên panel nguồn và giải thích |
| A013 | Nhị phân, đa lớp và nhận dạng chữ số (2) | 12 | Giữ nguyên panel nguồn và giải thích |
| A014 | Hồi quy và các ví dụ đầu ra số (1) | 13 | Giữ nguyên panel nguồn và giải thích |
| A015 | Hồi quy và các ví dụ đầu ra số (1) | 13 | Giữ nguyên panel nguồn và giải thích |

### Ba tài liệu gốc

- **[A] Phân loại và hồi quy tuyến tính.pdf**, 75 trang PDF.
- **[B] lecture2(slide).pdf**, 75 trang PDF.
- **[C] Diffirentiable_Programming&Machine_Learning_3.pdf**, 85 trang PDF.

### Bảo toàn và tra cứu

Tài liệu có **122 panel nguyên trang nguồn** được đặt trong các chương, không dồn toàn bộ hình xuống một phụ lục. Nhiều panel giữ cả hình ghép, nhãn vector, bảng và công thức. Các diễn tiến trình chiếu lặp được hợp nhất, còn bảng Phần G cho biết trang nào được nhúng và trang nào được diễn giải/hợp nhất.

Để giữ khả năng đối chiếu mọi chi tiết, **ba tệp PDF gốc được đính kèm trong chính tệp PDF tổng hợp này**. Có thể tìm chúng ở bảng Attachments/Tệp đính kèm của trình đọc hỗ trợ tính năng này. Bản gốc đính kèm không thay thế phần giải thích và bảng đối chiếu.

### Những giới hạn cần giữ đúng

Số liệu Gender Shades, kết quả SVM Digits và nghiên cứu RFM được thuật lại theo slide. Không tuyên bố đã chạy lại hay xác minh độc lập. Những liên kết nghiên cứu trong slide không tự trở thành nguồn đã đọc. Công thức nghiên cứu theo góc ở [A] trang 73–74 chưa có đủ định nghĩa để tái tạo toàn bộ phương pháp.

Một số hình có chữ nhỏ được giữ độ phân giải để có thể phóng khi đọc. Các công thức cần học được viết lại bằng LaTeX ở phần lý thuyết. Lỗi/khác biệt ở nguồn được giữ bản gốc và nêu riêng cách hiệu chỉnh, không sửa âm thầm.

Đã kiểm kê 235 trang nguồn và đối chiếu vị trí trong sách. Đây là tuyên bố về phạm vi xử lý có bảng kiểm, không phải bảo chứng mọi nguồn gốc đều đúng hoặc mọi nghiên cứu đã được kiểm chứng độc lập.
-->
