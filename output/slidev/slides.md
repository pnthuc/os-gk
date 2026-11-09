---
theme: default
favicon: /favicon.svg
layout: default
title: Hệ điều hành từ số 0
info: Ôn tập giữa kỳ CSC10007
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
---

<div class="deck-cover">
<div>
<p class="cover-id">CSC10007 – Ôn tập giữa kỳ</p>
<h1>Hệ điều hành</h1>
<p class="lead">Từ phần cứng đến tiến trình</p>
<p>Học từ số 0 với ví dụ từng bước và bài tập từ đề cũ</p>
</div>
<div class="cover-stack" aria-label="Ba lớp của hệ thống máy tính">
<div><b>Ứng dụng</b><small>Soạn thảo, chạy mã, đọc tập tin</small></div>
<span class="connector">↓ yêu cầu dịch vụ</span>
<div><b>Hệ điều hành</b><small>Quản lý và bảo vệ tài nguyên</small></div>
<span class="connector">↓ điều khiển thiết bị</span>
<div><b>Phần cứng</b><small>CPU, RAM, HDD và SSD</small></div>
</div>
</div>

---

<div class="track"><span>Cách dùng bộ slide</span><span>Chọn chương để bắt đầu</span></div>

# Mục lục

<div class="shortcuts">
<Link class="shortcut" to="3"><span>01</span><strong>Nền tảng</strong></Link>
<Link class="shortcut" to="9"><span>02</span><strong>Ngắt, bảo vệ và I/O</strong></Link>
<Link class="shortcut" to="16"><span>03</span><strong>HDD, SSD và lập lịch đĩa</strong></Link>
<Link class="shortcut" to="22"><span>04</span><strong>Tập tin, cấp phát và FAT</strong></Link>
<Link class="shortcut" to="34"><span>05</span><strong>Tiến trình và luồng</strong></Link>
<Link class="shortcut" to="41"><span>06</span><strong>Điều phối CPU</strong></Link>
<Link class="shortcut" to="51"><span>07</span><strong>Đồng bộ và bộ nhớ</strong></Link>
<Link class="shortcut" to="58"><span>08</span><strong>Luyện đề và tra cứu</strong></Link>
</div>

<div class="note">Nhấn phím → hoặc bấm Tiếp để hiện bước kế tiếp<br/>Đến câu tự luyện, thử giải trước khi bấm</div>

<p class="footnote">Phần bộ nhớ và deadlock là nội dung ôn thêm<br/>Đối chiếu phạm vi thi với thông báo của giảng viên</p>

---

<div class="track"><span>01 – Nền tảng</span><span>Ôn tập giữa kỳ</span></div>

# Máy tính chạy một chương trình như thế nào?

<div class="flow"><div><b>Ổ lưu trữ</b><small>Giữ tập tin chương trình</small></div><span>→</span><div><b>RAM</b><small>Giữ mã và dữ liệu đang dùng</small></div><span>→</span><div><b>CPU</b><small>Lấy lệnh, giải mã, thực thi</small></div></div>

Khi bạn mở trình soạn thảo, hệ điều hành chuẩn bị tiến trình<br/>CPU thực thi các lệnh cần thiết<br/>Nội dung đang soạn nằm trong RAM, còn thao tác lưu sẽ ghi nội dung ra ổ lưu trữ

<div class="note"><b>Register</b> là vùng lưu trữ nhỏ và nhanh nằm trong CPU<br/><b>Program counter (PC)</b> giúp CPU theo dõi địa chỉ lệnh</div>

---

<div class="track"><span>01 – Nền tảng</span><span>Ôn tập giữa kỳ</span></div>

# Hệ điều hành quản lý gì?

| Tài nguyên | Giao diện hoặc khái niệm OS cung cấp |
|---|---|
| Thời gian CPU | Tiến trình, luồng và lịch chạy |
| RAM | Không gian địa chỉ và cơ chế bảo vệ |
| Ổ lưu trữ | Tập tin, thư mục và đường dẫn |
| Thiết bị | I/O qua bộ điều khiển và driver |

<div class="note"><b>Kernel</b> là phần lõi có quyền chạy thao tác đặc quyền<br/>Ứng dụng yêu cầu dịch vụ qua system call</div>

---

<div class="track"><span>01 – Nền tảng</span><span>Ôn tập giữa kỳ</span></div>

# Cơ chế và chính sách

<div class="cols"><div><h2>Cơ chế</h2><p>Cho biết hệ thống thực hiện thao tác bằng cách nào</p><p>Context switch lưu trạng thái đang chạy và nạp trạng thái tiếp theo</p></div><div><h2>Chính sách</h2><p>Quyết định thao tác diễn ra khi nào và cho ai</p><p>Round Robin quyết định ai nhận time slice kế tiếp</p></div></div>

<div class="note">Cùng một cơ chế context switch có thể phục vụ nhiều thuật toán điều phối</div>

---

<div class="track"><span>01 – Nền tảng</span><span>Ôn tập giữa kỳ</span></div>

# Đa chương và chia sẻ thời gian

<div class="cols"><div><h2>Multiprogramming</h2><p>Khi A chờ đĩa, CPU có thể chạy B</p><p>Mục tiêu là giữ CPU bận khi có việc sẵn sàng</p></div><div><h2>Time-sharing</h2><p>Khi A dùng hết time slice, timer phát ngắt và kernel có thể chuyển CPU cho B</p><p>Mục tiêu là phản hồi nhanh khi nhiều việc cùng chạy</p></div></div>

<div v-click class="answer">Với batch jobs ít cần phản hồi ngay, kernel có thể chuyển sang job khác khi job đang chạy phải chờ I/O</div>

---

<div class="track"><span>01 – Nền tảng</span><span>Tra nhanh từ os_doc.pdf</span></div>

# Các cách tổ chức kernel

| Kiến trúc | Ý tưởng | Đánh đổi |
|---|---|---|
| Monolithic kernel | Nhiều dịch vụ chạy trong không gian kernel | Các dịch vụ gọi trực tiếp, lỗi có thể ảnh hưởng rộng |
| Layered | Mỗi tầng dùng giao diện của tầng thấp hơn | Phân tách trách nhiệm, khó chọn ranh giới tầng |
| Microkernel | Giữ cơ chế thiết yếu trong kernel, chuyển dịch vụ ra user space | Cô lập dịch vụ, có thể tăng chi phí IPC |
| Hybrid | Kết hợp đặc điểm từ nhiều mô hình | Phụ thuộc thiết kế cụ thể |

<div class="note">Khi so sánh, xác định dịch vụ chạy ở đâu và các thành phần giao tiếp thế nào</div>

<p class="footnote">Nguồn tham khảo – os_doc.pdf, trang 1, Tổng quan OS</p>

---

<div class="track"><span>01 – Nền tảng</span><span>Ôn tập giữa kỳ</span></div>

# Máy thật và máy ảo

| Máy thật | Máy ảo |
|---|---|
| OS điều khiển phần cứng vật lý qua driver | Guest OS dùng phần cứng ảo do hypervisor cung cấp |
| Đường truy cập thiết bị thường có ít lớp hơn | Nhiều OS có thể dùng chung máy chủ |
| Hiệu năng phụ thuộc phần cứng và driver | Hiệu năng phụ thuộc workload, hypervisor và khả năng hỗ trợ ảo hóa của phần cứng |

<div v-click class="answer">Ví dụ, bạn có thể thử một hệ điều hành trong máy ảo rồi khôi phục máy ảo về snapshot đã lưu</div>

---

<div class="track"><span>02 – Ngắt, bảo vệ và I/O</span><span>Ôn tập giữa kỳ</span></div>

# Ba tình huống CPU chuyển sang chạy mã kernel

| Sự kiện | Ai hoặc điều gì khởi phát? | Ví dụ |
|---|---|---|
| System call | Chương trình yêu cầu dịch vụ | Đọc tập tin |
| Exception | Phát sinh khi CPU thực thi một lệnh | Page fault, truy cập trái phép |
| Hardware interrupt | Thiết bị hoặc timer | Đĩa báo xong, hết time slice |

<div class="note">Sau khi xử lý sự kiện trong kernel mode, CPU có thể tiếp tục chạy chính tiến trình đang chạy trước đó</div>

---

<div class="track"><span>02 – Ngắt, bảo vệ và I/O</span><span>Ôn tập giữa kỳ</span></div>

# Vì sao timer quan trọng?

**Tình huống**<br/> A tính liên tục và không gọi I/O<br/>B đang đợi CPU để xử lý một lần gõ phím

<div class="step" v-click><b>01</b><span>Kernel đặt timer báo khi A dùng hết time slice</span></div>
<div class="step" v-click><b>02</b><span>Khi hết time slice, timer interrupt khiến CPU chạy mã xử lý của kernel</span></div>
<div class="step" v-click><b>03</b><span>Kernel có thể lưu trạng thái của A và chọn B trong ready queue</span></div>

<div class="answer" v-click>Timer giống đồng hồ báo thức của kernel<br/>Khi timer báo, kernel có thể lấy lại CPU dù A chưa tự nhường</div>

---

<div class="track"><span>02 – Ngắt, bảo vệ và I/O</span><span>Ôn tập giữa kỳ</span></div>

# Một lần đọc tập tin chưa có trong bộ đệm

<div class="flow"><div><b>Ứng dụng</b><small>Gọi dịch vụ đọc</small></div><span>→</span><div><b>Kernel</b><small>Kiểm tra, yêu cầu I/O</small></div><span>→</span><div><b>Thiết bị</b><small>Đọc dữ liệu</small></div></div>
<div class="flow" v-click><div><b>Ngắt</b><small>Thiết bị báo hoàn tất</small></div><span>→</span><div><b>Ready</b><small>Tiến trình hết chờ I/O</small></div><span>→</span><div><b>Running</b><small>Tiếp tục khi được cấp CPU</small></div></div>

<div class="note" v-click>Trong khoảng thiết bị làm việc, CPU có thể chạy một tiến trình khác</div>

---

<div class="track"><span>02 – Ngắt, bảo vệ và I/O</span><span>Ôn tập giữa kỳ</span></div>

# Polling và interrupt

**Câu hỏi**<br/> CPU biết card mạng có gói mới bằng cách nào?

| Polling | Interrupt |
|---|---|
| CPU chủ động kiểm tra trạng thái | Thiết bị báo sự kiện cho CPU |
| Có thể xử lý nhiều gói mỗi lần kiểm tra khi gói đến liên tục | CPU không phải kiểm tra liên tục khi ít có sự kiện |
| Chu kỳ kiểm tra ảnh hưởng độ trễ | Mỗi lần xử lý interrupt đều tốn thời gian CPU |

<div class="answer" v-click>Gói đến lác đác thì ưu tiên ngắt<br/>Khi gói đến dồn dập, polling theo lô có thể giảm số lần vào handler</div>

---

<div class="track"><span>02 – Ngắt, bảo vệ và I/O</span><span>Ôn tập giữa kỳ</span></div>

# PIO và DMA

**Câu hỏi**<br/> Ai thực hiện việc chuyển dữ liệu?

<div class="cols"><div><h2>PIO</h2><p>CPU đọc hoặc ghi thanh ghi thiết bị<br/>Thường ít bước thiết lập, phù hợp khi lượng dữ liệu nhỏ</p></div><div><h2>DMA</h2><p>CPU chuẩn bị lần truyền<br/>DMA controller chuyển dữ liệu giữa thiết bị và RAM<br/>Thường có lợi khi truyền khối lớn</p></div></div>

<div class="note" v-click>Polling hoặc interrupt cho biết trạng thái<br/>PIO hoặc DMA cho biết ai chuyển dữ liệu<br/>DMA có thể báo hoàn tất bằng ngắt</div>

---

<div class="track"><span>02 – Ngắt, bảo vệ và I/O</span><span>Ôn tập giữa kỳ</span></div>

# Bài tính ngưỡng PIO/DMA

Giả sử PIO tốn 150 chu kỳ CPU mỗi byte, DMA tốn cố định 4.400 chu kỳ CPU<br/>Cần truyền bao nhiêu byte để DMA dùng ít chu kỳ CPU hơn?

<div class="formula equation" v-click>150<var>N</var> &gt; 4.400 ⟹ <var>N</var> &gt; 4.400 ÷ 150</div>
<div class="answer" v-click><b>Kết quả</b> DMA có lợi từ 30 byte trong mô hình này</div>
<div class="note" v-click>Nếu đề dùng 100 + 50N cho PIO, PIO và DMA tốn cùng số chu kỳ CPU ở 86 byte<br/>Phải đọc kỹ chi phí tính theo byte hay theo cả gói</div>

---

<div class="track"><span>02 – Ngắt, bảo vệ và I/O</span><span>Ôn tập giữa kỳ</span></div>

# Tự kiểm tra – Bảo vệ vùng nhớ kernel

Ứng dụng ở user mode thử đọc một địa chỉ mà phần cứng đánh dấu chỉ cho kernel<br/>Điều gì xảy ra? Ứng dụng nên yêu cầu dịch vụ bằng cách nào?

<div class="answer" v-click>CPU phát exception khi kiểm tra quyền thất bại<br/>Ứng dụng dùng system call<br/>Kernel kiểm tra quyền và tham số trước khi thực hiện dịch vụ</div>

<div class="note" v-click>Khi khởi động, firmware hoặc bootloader chuyển quyền cho kernel<br/>Sau khi hệ thống khởi động, system call, exception và interrupt đều có thể khiến CPU chạy mã kernel</div>

---

<div class="track"><span>03 – HDD, SSD và lập lịch đĩa</span><span>Ôn tập giữa kỳ</span></div>

# Thời gian đọc HDD gồm những gì?

<div class="flow measure"><div><b>Seek</b><small>Dịch đầu đọc đến cylinder</small></div><span>+</span><div><b>Rotational latency</b><small>Đợi sector quay tới</small></div><span>+</span><div><b>Transfer</b><small>Truyền dữ liệu</small></div></div>

HDD 7.200 vòng/phút mất khoảng **8,33 ms** mỗi vòng<br/>Nếu các sector cần đọc có khả năng nằm ở mọi vị trí như nhau, thời gian chờ quay trung bình là nửa vòng, khoảng **4,17 ms**

<div class="note">Bài chỉ cho cylinder thường dùng tổng độ dài các chặng để đo chi phí dịch đầu đọc</div>

---

<div class="track"><span>03 – HDD, SSD và lập lịch đĩa</span><span>Tra nhanh từ os_doc.pdf</span></div>

# Đổi địa chỉ CHS sang LBA

<div class="read-lines">
<p>CHS = (C, H, S) là bộ ba cylinder, head và sector</p>
<p>C, H và LBA bắt đầu từ 0, riêng S bắt đầu từ 1</p>
</div>

<div class="formula">
<div class="equation"><b>LBA</b> = (C × N<sub>H</sub> + H) × N<sub>S</sub> + (S − 1)</div>
<div class="formula-legend">N<sub>H</sub> là số head, N<sub>S</sub> là số sector trên mỗi track</div>
</div>

<div class="step" v-click><b>01</b><div>Với CHS = (2, 1, 4), N<sub>H</sub> = 2 và N<sub>S</sub> = 18<div class="equation">LBA = (2 × 2 + 1) × 18 + (4 − 1) = <b>93</b></div></div></div>
<div class="answer" v-click>
<p><b>Đổi ngược từ LBA = 93</b></p>
<div class="equation-row">
<span>C = ⌊93 ÷ 36⌋ = <b>2</b></span>
<span>H = ⌊93 ÷ 18⌋ mod 2 = <b>1</b></span>
<span>S = (93 mod 18) + 1 = <b>4</b></span>
</div>
<div class="formula-legend">⌊x⌋ làm tròn xuống, mod lấy phần dư</div>
</div>

<p class="footnote">Nguồn tham khảo – os_doc.pdf, trang 2, Cấu trúc Disk</p>

---

<div class="track"><span>03 – HDD, SSD và lập lịch đĩa</span><span>Ôn tập giữa kỳ</span></div>

# FCFS, SSTF và họ SCAN

| Thuật toán | Cách chọn |
|---|---|
| FCFS | Phục vụ theo thứ tự đến |
| SSTF | Từ vị trí hiện tại, chọn yêu cầu gần nhất |
| SCAN | Quét đến biên rồi đổi chiều nếu còn yêu cầu |
| LOOK | Đảo chiều ở yêu cầu cuối theo hướng đang quét |
| C-SCAN / C-LOOK | Phục vụ theo một chiều, rồi quay về biên / yêu cầu ở đầu kia |

<div class="note">Trước khi tính, ghi vị trí đầu, khoảng số cylinder và hướng di chuyển<br/>Tính lại khoảng cách sau mỗi bước SSTF</div>

---

<div class="track"><span>03 – HDD, SSD và lập lịch đĩa</span><span>Ôn tập giữa kỳ</span></div>

# Một ví dụ SCAN &lt; FCFS &lt; SSTF

<div class="read-lines">
<p>Cylinder <b>0–9</b>, đầu đọc ở <b>5</b>, SCAN đi lên trước</p>
<p>Hàng đợi <b>[0, 4, 7, 9]</b></p>
<p>Dừng khi phục vụ hết yêu cầu</p>
</div>

<div class="step" v-click><b>01</b><span><b>SCAN</b> – 5 → 7 → 9 → 4 → 0<br/>Tổng 2 + 2 + 5 + 4 = <b>13</b></span></div>
<div class="step" v-click><b>02</b><span><b>FCFS</b> – 5 → 0 → 4 → 7 → 9<br/>Tổng 5 + 4 + 3 + 2 = <b>14</b></span></div>
<div class="step" v-click><b>03</b><span><b>SSTF</b> – 5 → 4 → 7 → 9 → 0<br/>Tổng 1 + 3 + 2 + 9 = <b>15</b></span></div>

<div class="answer" v-click>SSTF chọn 4 vì nó gần 5 nhất, nhưng để yêu cầu 0 lại đến cuối</div>

---

<div class="track"><span>03 – HDD, SSD và lập lịch đĩa</span><span>Ôn tập giữa kỳ</span></div>

# RAID và kiểm tra lỗi

| Tổ chức | Ý chính |
|---|---|
| RAID 0 | Dùng striping để chia dữ liệu qua nhiều đĩa, không có bản sao hay parity |
| RAID 1 | Duy trì bản sao trên đĩa khác |
| RAID 5 | Phân tán parity, chịu mất một đĩa trong mô hình thông thường |
| RAID 6 | Mỗi stripe có hai block parity, chịu được lỗi hai đĩa |

<div class="note"><b>Hamming</b><br/>Bit kiểm tra ở vị trí 1, 2, 4, 8… Cộng chỉ số của các nhóm kiểm tra sai để tìm vị trí một bit lỗi<br/>Ví dụ nhóm 2 và 4 sai thì lật bit 6</div>

---

<div class="track"><span>03 – HDD, SSD và lập lịch đĩa</span><span>Ôn tập giữa kỳ</span></div>

# SSD cập nhật dữ liệu như thế nào?

NAND đọc và ghi theo **page**, xóa theo **block** gồm nhiều page<br/>FTL ánh xạ địa chỉ logic sang page vật lý

<div class="flow"><div><b>Ghi page mới</b><small>Dùng vị trí còn trống</small></div><span>→</span><div><b>Đổi ánh xạ</b><small>Đánh dấu page cũ là invalid</small></div><span>→</span><div><b>Garbage collection</b><small>Chuyển các page còn hợp lệ sang chỗ khác rồi xóa block cũ</small></div></div>

<div class="note"><b>TRIM</b> báo cho SSD vùng dữ liệu nào không còn dùng<br/><b>Wear leveling</b> phân bổ lượt ghi và xóa để các block mòn đều hơn</div>

---

<div class="track"><span>04 – Tập tin, cấp phát và FAT</span><span>Ôn tập giữa kỳ</span></div>

# Từ tên tập tin đến khối dữ liệu

<div class="flow"><div><b>Đường dẫn</b><small>VD /TMC/ERROR.LOG</small></div><span>→</span><div><b>Mục thư mục</b><small>Tên, metadata hoặc tham chiếu</small></div><span>→</span><div><b>Khối dữ liệu</b><small>Nội dung đọc hoặc ghi</small></div></div>

- FAT lưu cluster đầu trong mục thư mục và lần tiếp bằng bảng FAT
- Unix thường dùng thư mục để ánh xạ tên sang inode<br/>Inode giữ metadata và ánh xạ block
- Mở tập tin trả về file descriptor hoặc handle để dùng cho các thao tác sau

---

<div class="track"><span>04 – Tập tin, cấp phát và FAT</span><span>Ôn tập giữa kỳ</span></div>

# File allocation và hai kiểu fragmentation

| Phương pháp | Cách tìm khối | Điểm cần nhớ |
|---|---|---|
| Contiguous | Khối đầu + độ lệch | Truy cập nhanh, cần chỗ liền nhau |
| Linked | Theo con trỏ đến block kế tiếp | Dùng được các block rời, nhưng phải lần chuỗi để đến block cần đọc |
| Indexed | Tra bảng địa chỉ các khối | Truy cập trực tiếp, cần thêm chỗ cho index |

<div class="note"><b>External fragmentation</b> xảy ra khi chỗ trống bị chia thành nhiều đoạn rời<br/><b>Internal fragmentation</b> là phần trống bên trong block đã cấp<br/>File 2.500 B dùng ba khối 1.024 B, dư 572 B</div>

---

<div class="track"><span>04 – Tập tin, cấp phát và FAT</span><span>Ôn tập giữa kỳ</span></div>

# Little-endian và đơn vị của FAT

| Dữ liệu trong ảnh hex | Đọc ra |
|---|---|
| <code>00 02</code> | Số little-endian 0x0200 = 512 |
| <code>39 30 00 00</code> | Số little-endian 0x3039 = 12.345 |
| <code>46 41 54</code> | Chuỗi ASCII FAT |

- **Sector** là đơn vị địa chỉ của volume trong bài<br/>**Cluster** gồm một hoặc nhiều sector
- **Offset** là vị trí tính bằng byte<br/>Với 512 B mỗi sector, sector 127 bắt đầu ở 127 × 512 = 0xFE00

---

<div class="track"><span>04 – Tập tin, cấp phát và FAT</span><span>Ôn tập giữa kỳ</span></div>

# Bố cục volume FAT16

<div class="flow memory-map compact"><div><b>Reserved</b><small>Boot sector và BPB</small></div><span>→</span><div><b>FAT1 / FAT2</b><small>Chuỗi cluster</small></div><span>→</span><div><b>RDET</b><small>Mục thư mục gốc</small></div><span>→</span><div><b>Data</b><small>Cluster 2, 3, …</small></div></div>

- BPB mô tả số byte mỗi sector, sector mỗi cluster, reserved, số FAT, độ dài FAT và số mục root
- FAT12/16 có vùng RDET cố định trong mô hình đề<br/>FAT32 lưu thư mục gốc trong chuỗi cluster ở vùng Data

<div class="note">Thư mục con của FAT16 cũng nằm ở Data<br/>Sửa mục thư mục con có thể làm Data đổi dù nội dung file giữ nguyên</div>

---

<div class="track"><span>04 – Tập tin, cấp phát và FAT</span><span>Ôn tập giữa kỳ</span></div>

# Tính sector từ BPB

Gọi BPS là số byte/sector, SPC là số sector/cluster, E là số mục root<br/>R là reserved, F là số bảng FAT, S là số sector mỗi FAT

<div class="formula equation"><b>RDETSize</b> = ⌈(32 × <var>E</var>) ÷ BPS⌉ sector</div>
<div class="formula equation"><b>FirstData</b> = <var>R</var> + <var>F</var> × <var>S</var> + RDETSize</div>
<div class="formula equation"><b>Sector(<var>c</var>)</b> = FirstData + (<var>c</var> − 2) × SPC</div>

<div class="note">RDETSize là số sector của RDET<br/>⌈x⌉ làm tròn lên để có đủ chỗ cho mọi entry<br/>Khi đếm cluster hoàn chỉnh còn lại, làm tròn xuống</div>

---

<div class="track"><span>04 – Tập tin, cấp phát và FAT</span><span>Tra nhanh từ os_doc.pdf</span></div>

# Sector của volume và của toàn đĩa

<div class="cols"><div><h2>Tính từ đầu volume</h2><p>Sector(c) = FirstData + (c − 2) × SPC</p><p>Dùng khi ảnh hex hoặc đề lấy boot sector của volume làm mốc 0</p></div><div><h2>Tính từ đầu đĩa</h2><p>LBA(c) = LBA bắt đầu volume + Sector(c)</p><p>Dùng khi đề hỏi vị trí tuyệt đối trên đĩa</p></div></div>

<div class="answer" v-click>Cluster 6 ở sector 112 của volume<br/>Nếu volume bắt đầu tại LBA 2.048 thì cluster 6 bắt đầu ở LBA <b>2.160</b> của toàn đĩa</div>

<div class="note">Offset 0x1C của BPB là trường Hidden Sectors<br/>Ưu tiên mốc đầu volume mà đề cung cấp, tránh cộng độ lệch hai lần</div>

<p class="footnote">Nguồn tham khảo – os_doc.pdf, trang 2, mục tính vị trí sector theo cluster</p>

---

<div class="track"><span>04 – Tập tin, cấp phát và FAT</span><span>Ôn tập giữa kỳ</span></div>

# Bài FAT 1 – Tìm RDET, Data và cluster 6

Đọc BPB được **512 B/sector**, **2 sector/cluster**, **8 reserved sectors**, **2 FAT × 32 sector**, **512 mục root**

<div class="step" v-click><b>01</b><span>RDET bắt đầu ở 8 + 2 × 32 = <b>72</b></span></div>
<div class="step" v-click><b>02</b><span>RDET chiếm 512 × 32 / 512 = <b>32 sector</b></span></div>
<div class="step" v-click><b>03</b><span>Data bắt đầu ở 72 + 32 = <b>104</b></span></div>
<div class="step" v-click><b>04</b><span>Cluster 6 bắt đầu ở 104 + (6 − 2) × 2 = <b>112</b></span></div>

<div class="answer" v-click>Sector 112 tương ứng offset 112 × 512 = <b>0xE000</b>, khớp ảnh hex bài 1</div>

---

<div class="track"><span>04 – Tập tin, cấp phát và FAT</span><span>Ôn tập giữa kỳ</span></div>

# Bài FAT 1 – Lần chuỗi WINHEX.CNT

Hai byte lưu số cluster đầu tiên trong entry là <code>15 00</code><br/>Mỗi entry FAT16 dài **2 byte**

<div class="step" v-click><b>01</b><span>Little-endian cho 0x0015 = <b>21</b></span></div>
<div class="step" v-click><b>02</b><span>Tại offset 2 × 21 trong FAT, bytes <code>16 00</code> chỉ cluster <b>22</b></span></div>
<div class="step" v-click><b>03</b><span>FAT[22] = FFFF, tức <b>cuối chuỗi</b></span></div>
<div class="answer" v-click><b>21 → 22 → EOC</b><br/>File 1.649 B vừa trong hai cluster, mỗi cluster 1.024 B</div>

---

<div class="track"><span>04 – Tập tin, cấp phát và FAT</span><span>Ôn tập giữa kỳ</span></div>

# Short File Name và Long File Name

<div class="cols"><div><h2>SFN – tên ngắn</h2><p>Mỗi entry dài 32 byte<br/>Tên 8.3 chiếm 11 byte, không ghi dấu chấm</p><p>Entry có thuộc tính, giờ/ngày, cluster đầu và kích thước file</p></div><div><h2>LFN – tên dài</h2><p>Mỗi entry chứa 13 đơn vị UTF-16LE<br/>Thuộc tính 0F<br/>Checksum dựa trên 11 byte SFN</p><p>Trên đĩa, các LFN đứng trước SFN theo thứ tự N đến 1</p></div></div>

<div class="note" v-click><code>HeDieuHanh.pdf</code> có 14 ký tự, cần LFN #2 (0x42), LFN #1 (0x01), rồi SFN<br/>Với alias <code>HEDIEU~1.PDF</code>, checksum là 0x51</div>

---

<div class="track"><span>04 – Tập tin, cấp phát và FAT</span><span>Ôn tập giữa kỳ</span></div>

# Mã hóa giờ, ngày và kích thước FAT

<div class="formula equation"><b>Ngày</b> = (năm − 1980) × 512 + tháng × 32 + ngày</div>
<div class="formula equation"><b>Giờ</b> = giờ × 2.048 + phút × 32 + ⌊giây ÷ 2⌋</div>

<div v-click class="step"><b>01</b><span>02/02/2020 ⟹ 0x5042 ⟹ <code>42 50</code></span></div>
<div v-click class="step"><b>02</b><span>01:23:45 ⟹ 0x0AF6 ⟹ <code>F6 0A</code><br/>Creation time có thêm một byte lưu phần thời gian dưới 2 giây, <code>64</code> bổ sung 1 giây</span></div>
<div v-click class="step"><b>03</b><span>12.345 B ⟹ 0x00003039 ⟹ <code>39 30 00 00</code></span></div>

<div class="footnote">Bản PDF có đầy đủ ba entry 32 byte của câu 3 đề 2022–2023</div>

---

<div class="track"><span>04 – Tập tin, cấp phát và FAT</span><span>Ôn tập giữa kỳ</span></div>

# Thao tác nào làm đổi vùng FAT?

Giả sử FAT16 có hai bảng đồng bộ<br/>Các thao tác cùng volume và thư mục đích còn chỗ

| Thao tác | Vùng phải đổi | Giải thích |
|---|---|---|
| Xóa file có cluster ở thư mục con | FAT1, FAT2, Data | Giải phóng chuỗi và đánh dấu entry |
| Move file giữa hai thư mục con | Data | Đổi entry, giữ chuỗi file |
| Move file từ thư mục con ra root | RDET, Data | Tạo entry root và đánh dấu entry cũ |
| Tạo hoặc chép file không rỗng vào root | Cả bốn vùng | Cấp cluster, tạo entry, ghi nội dung |

<div class="note">Nếu thư mục đích cần thêm cluster, FAT cũng đổi<br/>Khi xóa file, các byte nội dung file có thể vẫn nằm trên đĩa, nhưng entry của file trong thư mục con vẫn được sửa ở vùng Data</div>

---

<div class="track"><span>04 – Tập tin, cấp phát và FAT</span><span>Ôn tập giữa kỳ</span></div>

# Bài FAT 2 – Move và delete đổi sector nào?

Bài 2 có **FAT1 tại 1**, **FAT2 tại 41**, **RDET tại 81**<br/>Thư mục TMC ở cluster 9, bắt đầu tại **sector 127**

<div class="answer" v-click><b>Move TMC/ERROR.LOG ra root</b><br/>Sửa sector 127 và 81<br/>Chuỗi file 13 → 14 giữ nguyên</div>
<div class="answer" v-click><b>Delete TMC/WINHEX.CNT</b><br/>Sửa entry ở sector 127<br/>Xóa FAT[11] và FAT[12] ở sector 1 và 41<br/>RDET giữ nguyên trong mô hình bài</div>

<div class="footnote">Dựa trên FAT hw 1–2, trang 3–4<br/>Lời giải đầy đủ có trong tài liệu PDF</div>

---

<div class="track"><span>05 – Tiến trình và luồng</span><span>Ôn tập giữa kỳ</span></div>

# Tiến trình có những gì?

**Tiến trình** là một lần chạy của chương trình, có vùng nhớ, trạng thái CPU và tài nguyên riêng

| Vùng nhớ thường gặp | Dữ liệu |
|---|---|
| Text | Mã lệnh |
| Data / BSS | Biến toàn cục hoặc tĩnh |
| Heap | Dữ liệu cấp phát động |
| Stack | Stack frame của các lời gọi hàm và nhiều biến cục bộ |

<div class="note"><b>PCB</b> là cấu trúc kernel dùng để quản lý tiến trình, lưu PID, trạng thái và thông tin để scheduler quản lý tiến trình</div>

---

<div class="track"><span>05 – Tiến trình và luồng</span><span>Ôn tập giữa kỳ</span></div>

# Ready khác waiting ở điểm nào?

<div class="flow"><div><b>Ready</b><small>Có thể chạy, đợi CPU</small></div><span>→</span><div><b>Running</b><small>Đang dùng CPU</small></div><span>→</span><div><b>Waiting</b><small>Đợi sự kiện, ví dụ I/O</small></div></div>

<div class="step" v-click><b>01</b><span>Kernel lấy lại CPU ⟹ Running → Ready</span></div>
<div class="step" v-click><b>02</b><span>I/O hoàn tất ⟹ Waiting → Ready</span></div>
<div class="step" v-click><b>03</b><span>Được scheduler chọn ⟹ Ready → Running</span></div>

<div class="note" v-click>Context switch lưu trạng thái cũ và nạp trạng thái của tiến trình được chọn</div>

---

<div class="track"><span>05 – Tiến trình và luồng</span><span>Ôn tập giữa kỳ</span></div>

# fork(), exec() và wait()

| Lời gọi | Hành vi |
|---|---|
| fork() | Tạo tiến trình con<br/>Cha nhận PID con, con nhận 0 |
| exec…() | Nếu thành công, thay chương trình trong tiến trình hiện có |
| wait() / waitpid() | Chờ hoặc lấy thông tin kết thúc của tiến trình con |
| exit() / _exit() | Đều kết thúc tiến trình<br/>exit() của C có xử lý flush stdio |

<div class="note">Tiến trình cha và con cùng chạy tiếp từ lệnh sau fork<br/>Copy-on-write có thể trì hoãn sao chép page cho tới lúc ghi</div>

---

<div class="track"><span>05 – Tiến trình và luồng</span><span>Ôn tập giữa kỳ</span></div>

# Hai lần fork tạo bao nhiêu tiến trình?

<p><code>fork(); fork(); puts("bye");</code></p>
<ForkTree />
<div class="answer" v-click="2"><b>4 tiến trình tổng cộng</b> nếu mọi lời gọi fork thành công<br/>Có 3 tiến trình mới và 4 lần chạy puts</div>
<p class="footnote">Nhấn → để xem lần fork thứ nhất và thứ hai</p>

---

<div class="track"><span>05 – Tiến trình và luồng</span><span>Ôn tập giữa kỳ</span></div>

# Đếm printf và đếm chữ in ra

Trước hai lần fork có <code>printf("hello")</code><br/>Sau hai lần fork có <code>printf("bye")</code>

<div class="step" v-click><b>01</b><span>Lệnh printf đầu chạy <b>1 lần</b><br/>Lệnh printf sau chạy <b>4 lần</b></span></div>
<div class="step" v-click><b>02</b><span>Nếu stdout đã ghi hello ra trước fork, phần hello chỉ xuất hiện một lần</span></div>
<div class="step" v-click><b>03</b><span>Nếu hello còn trong bộ đệm và mỗi tiến trình thoát bình thường, trên hệ thống thường gặp có thể thấy <code>hellobye</code> bốn lần</span></div>

<div class="note">Khi làm đề, ghi giả thiết về bộ đệm stdout và việc fork thành công</div>

---

<div class="track"><span>05 – Tiến trình và luồng</span><span>Tra nhanh từ os_doc.pdf</span></div>

# Zombie và orphan khác nhau thế nào?

<div class="cols"><div><h2>Zombie – con đã kết thúc</h2><p>Kernel giữ thông tin kết thúc của tiến trình con để cha lấy sau</p><p>Cha gọi <code>wait()</code> hoặc <code>waitpid()</code> để lấy thông tin kết thúc</p></div><div><h2>Orphan – cha đã kết thúc</h2><p>Con vẫn có thể chạy</p><p>Kernel gán một tiến trình cha mới cho tiến trình con</p></div></div>

<div class="answer" v-click>Cha thoát trước, con vẫn chạy ⟹ orphan<br/>Con thoát trước, cha chưa gọi wait để lấy thông tin kết thúc ⟹ zombie trong mô hình Unix của bài</div>

<p class="footnote">Nguồn tham khảo – os_doc.pdf, trang 1, Process</p>

---

<div class="track"><span>05 – Tiến trình và luồng</span><span>Ôn tập giữa kỳ</span></div>

# Luồng và giao tiếp giữa tiến trình

<div class="cols"><div><h2>Luồng</h2><p>Các luồng cùng tiến trình chia sẻ code, heap và tài nguyên<br/>Mỗi luồng có stack, PC và thanh ghi riêng</p><p>Một lõi CPU có thể chạy xen kẽ nhiều thread<br/>Nhiều lõi có thể chạy song song</p></div><div><h2>IPC</h2><p><b>Shared memory</b> cho các tiến trình truy cập vùng nhớ chung và cần đồng bộ khi sửa</p><p><b>Message passing</b> dùng thao tác gửi và nhận</p></div></div>

<div class="note" v-click>Signal thông báo sự kiện cho tiến trình hoặc luồng<br/>Ngắt phần cứng được CPU và kernel xử lý</div>

---

<div class="track"><span>06 – Điều phối CPU</span><span>Ôn tập giữa kỳ</span></div>

# Scheduler chọn, dispatcher giao CPU

<div class="flow"><div><b>Ready queue</b><small>Tiến trình có thể chạy</small></div><span>→</span><div><b>Scheduler</b><small>Chọn tiến trình chạy tiếp</small></div><span>→</span><div><b>Dispatcher</b><small>Context switch và giao CPU</small></div></div>

- **Non-preemptive**<br/> tiến trình giữ CPU cho đến khi kết thúc burst hoặc tự chờ
- **Preemptive**<br/> OS có thể lấy lại CPU khi hết time slice hoặc khi có tiến trình thích hợp hơn

<div class="note">CPU burst là khoảng thực thi giữa hai lần chờ, hoặc đến lúc hoàn tất</div>

---

<div class="track"><span>06 – Điều phối CPU</span><span>Tra nhanh từ os_doc.pdf</span></div>

# Ba mức điều phối

| Mức | Quyết định |
|---|---|
| Long-term scheduler | Quyết định nhận job nào vào hệ thống để chạy |
| Medium-term scheduler | Tạm đưa tiến trình ra khỏi RAM và nạp lại khi phù hợp |
| Short-term scheduler | Chọn tiến trình từ ready queue để chạy |

<div class="note">Dispatcher giao CPU cho tiến trình mà short-term scheduler đã chọn</div>
<div class="answer" v-click>Vẽ Gantt với FCFS, SJF, SRTF hoặc RR là đang mô phỏng quyết định của short-term scheduler</div>

<p class="footnote">Nguồn tham khảo – os_doc.pdf, trang 1, Điều phối CPU</p>

---

<div class="track"><span>06 – Điều phối CPU</span><span>Ôn tập giữa kỳ</span></div>

# Đọc thời gian trên biểu đồ Gantt

| Ký hiệu | Ý nghĩa |
|---|---|
| A, B | Thời điểm đến, độ dài CPU burst |
| F, C | Mốc chạy lần đầu, mốc hoàn tất |
| R = F − A | Response time – từ lúc đến đến lần đầu được chạy |
| T = C − A | Turnaround time – từ lúc đến đến lúc hoàn tất |
| W = T − B | Waiting time – công thức này áp dụng khi chỉ có một CPU burst và không chờ I/O |

<div class="note">Nếu có I/O, W là tổng thời gian ở ready queue<br/>Khoảng chờ thiết bị không thuộc W</div>

---

<div class="track"><span>06 – Điều phối CPU</span><span>Ôn tập giữa kỳ</span></div>

# Cùng một đề, bốn thuật toán scheduling

Giả sử một CPU, mỗi tiến trình có một burst, bỏ qua chi phí context switch

| Tiến trình | A – Đến | B – CPU burst |
|---|---:|---:|
| P1 | 0 | 7 |
| P2 | 2 | 4 |
| P3 | 4 | 1 |
| P4 | 5 | 4 |

<div class="answer" v-click>Tại t = 0, chỉ P1 đã đến<br/>Chọn theo tập tiến trình đang ready tại từng mốc</div>

---

<div class="track"><span>06 – Điều phối CPU</span><span>Ôn tập giữa kỳ</span></div>

# FCFS và SJF trên cùng dữ kiện

<GanttLine label="FCFS – Thứ tự vào ready queue" :segments="[[1,0,7],[2,7,11],[3,11,12],[4,12,16]]" />
<div v-click><GanttLine label="SJF – Burst ngắn nhất đang ready, non-preemptive" :segments="[[1,0,7],[3,7,8],[2,8,12],[4,12,16]]" /></div>

<div class="answer" v-click>SJF vẫn chạy P1 từ 0 đến 7<br/>Khi đó P2, P3 và P4 đã đến<br/>P3 có burst ngắn nhất nên được chọn</div>

---

<div class="track"><span>06 – Điều phối CPU</span><span>Ôn tập giữa kỳ</span></div>

# SRTF chọn theo thời gian CPU còn lại

<GanttLine label="SRTF – Thời gian CPU còn lại ngắn nhất" :segments="[[1,0,2],[2,2,4],[3,4,5],[2,5,7],[4,7,11],[1,11,16]]" />

<div class="step" v-click><b>01</b><span>Tại t = 2, P1 còn 5 và P2 cần 4 ⟹ chọn P2</span></div>
<div class="step" v-click><b>02</b><span>Tại t = 4, P2 còn 2 và P3 cần 1 ⟹ chọn P3</span></div>
<div class="answer" v-click>P2 chạy ở 2–4 và 5–7<br/>A = 2, F = 2, C = 7, B = 4<br/>Do đó <b>R = 0, T = 5, W = 1</b></div>

---

<div class="track"><span>06 – Điều phối CPU</span><span>Ôn tập giữa kỳ</span></div>

# Round Robin chia lượt theo quantum

<GanttLine label="RR – Quantum = 2" :segments="[[1,0,2],[2,2,4],[1,4,6],[3,6,7],[2,7,9],[4,9,11],[1,11,13],[4,13,15],[1,15,16]]" />

- Tiến trình dùng hết quantum mà còn cần CPU về cuối ready queue
- Trong ví dụ này, nếu đến đúng lúc hết quantum, đưa tiến trình mới vào trước khi xếp lại tiến trình đang chạy
- Quantum quá nhỏ làm tăng số lần context switch

<div class="answer" v-click>Tại t = 4, P1 đã đợi từ t = 2 nên chạy trước P3 vừa tới</div>

---

<div class="track"><span>06 – Điều phối CPU</span><span>Ôn tập giữa kỳ</span></div>

# So sánh kết quả theo đúng tiêu chí

| Thuật toán | Waiting time TB | Turnaround time TB | Response time TB |
|---|---:|---:|---:|
| FCFS | 4,75 | 8,75 | 4,75 |
| SJF | 4 | 8 | 4 |
| SRTF | 3 | 7 | 0,5 |
| RR q = 2 | 5 | 9 | 1,5 |

<div class="note">RR thường giúp tác vụ tương tác sớm có lượt chạy<br/>SJF tối ưu turnaround trung bình trong mô hình các việc đến cùng lúc, biết burst và bỏ qua overhead<br/>Với dữ liệu cụ thể, hãy tính theo Gantt</div>

---

<div class="track"><span>06 – Điều phối CPU</span><span>Ôn tập giữa kỳ</span></div>

# Ưu tiên, nhiều hàng đợi và deadline

- **Priority** chọn mức ưu tiên cao nhất<br/>Aging tăng ưu tiên cho việc đã chờ lâu
- **Multilevel queue** dùng các hàng đợi khác nhau theo lớp công việc
- **MLFQ** cho phép đổi hàng đợi, chẳng hạn hạ mức sau khi dùng hết quantum
- **RMS** ưu tiên chu kỳ ngắn hơn trong mô hình định kỳ<br/>**EDF** chọn deadline tuyệt đối gần nhất

<div class="note">Trên nhiều CPU, load balancing chia tải giữa các lõi, còn CPU affinity giúp tận dụng dữ liệu đã có trong cache</div>

---

<div class="track"><span>06 – Điều phối CPU</span><span>Ôn tập giữa kỳ</span></div>

# Tự luyện – Tính R, T và W

P đến lúc **3**, chạy lần đầu lúc **7**, hoàn tất lúc **15** và dùng CPU tổng cộng **6** đơn vị<br/>Chỉ một burst, không chờ I/O

<div class="answer" v-click><b>R = 7 − 3 = 4</b><br/>Lấy mốc lần đầu P được chạy</div>
<div class="answer" v-click><b>T = 15 − 3 = 12</b><br/>Dùng mốc hoàn tất</div>
<div class="answer" v-click><b>W = 12 − 6 = 6</b><br/>Cộng cả thời gian chờ sau khi kernel lấy lại CPU</div>

---

<div class="track"><span>07 – Đồng bộ và bộ nhớ</span><span>Ôn tập giữa kỳ</span></div>

# Vì sao visitor++ có thể mất lượt tăng?

Hai luồng cùng tăng một biến đang bằng 0<br/>Mỗi lượt gồm đọc, cộng và ghi

<div class="step" v-click><b>01</b><span>A đọc 0<br/>B cũng đọc 0 trước khi A ghi</span></div>
<div class="step" v-click><b>02</b><span>A ghi 1<br/>B dùng giá trị đã đọc và cũng ghi 1</span></div>
<div class="answer" v-click><b>Kết quả là 1</b><br/>Với ba lượt, mô hình xen kẽ của đề cho 1, 2 hoặc 3<br/>Dùng mutex hoặc phép tăng atomic để mỗi lượt đóng góp 1</div>

<div class="footnote">Trong C/C++ thực, data race trên biến thường có thể gây hành vi không xác định</div>

---

<div class="track"><span>07 – Đồng bộ và bộ nhớ</span><span>Ôn tập giữa kỳ</span></div>

# Mutex, semaphore và critical section

- **Critical section** là đoạn code truy cập dữ liệu dùng chung cần được bảo vệ
- **Mutex** bảo đảm mỗi lúc một bên vào<br/>Với spinlock, thread lặp kiểm tra khóa<br/>Với blocking lock, thread nhường CPU khi phải chờ
- **Semaphore** dùng bộ đếm<br/>wait (down) lấy một lượt hoặc chờ nếu đã hết lượt<br/>signal (up) trả một lượt và có thể đánh thức thread đang chờ

<div class="note" v-click>Bộ đệm N ô dùng empty = N, full = 0 và mutex<br/>Producer chờ empty rồi lấy mutex<br/>Consumer chờ full rồi lấy mutex</div>

---

<div class="track"><span>07 – Đồng bộ và bộ nhớ</span><span>Ôn tập giữa kỳ</span></div>

# Deadlock và starvation

<div class="cols"><div><h2>Deadlock</h2><p>Một nhóm giữ tài nguyên và chờ lẫn nhau<br/>Không thành viên nào có thể tiến lên</p><p>Ví dụ mỗi triết gia giữ một nĩa và chờ nĩa còn lại theo vòng</p></div><div><h2>Starvation</h2><p>Một công việc chờ quá lâu, trong khi các công việc khác vẫn chạy được</p><p>Ví dụ ưu tiên thấp luôn bị việc ưu tiên cao vượt trước</p></div></div>

<div class="note">Bốn điều kiện của deadlock gồm mutual exclusion, hold and wait, no preemption và circular wait</div>

---

<div class="track"><span>07 – Đồng bộ và bộ nhớ</span><span>Ôn tập giữa kỳ</span></div>

# Dịch địa chỉ với paging

<div class="flow"><div><b>Địa chỉ ảo</b><small>Tách page và offset</small></div><span>→</span><div><b>Page table</b><small>Tra số frame tương ứng với page</small></div><span>→</span><div><b>Địa chỉ vật lý</b><small>Frame × page size + offset</small></div></div>

Page 1.024 B, địa chỉ ảo 2.500<br/>Page 2 ánh xạ vào frame 7

<div class="step" v-click><b>01</b><span><span class="equation">Page = ⌊2.500 ÷ 1.024⌋ = <b>2</b></span><br/><span class="equation">Offset = 2.500 − 2 × 1.024 = <b>452</b></span></span></div>
<div class="answer" v-click>Địa chỉ vật lý = 7 × 1.024 + 452 = <b>7.620</b></div>

<div class="footnote">TLB cache kết quả dịch<br/>TLB miss có thể chỉ cần tra page table</div>

---

<div class="track"><span>07 – Đồng bộ và bộ nhớ</span><span>Tra nhanh từ os_doc.pdf</span></div>

# Tính EAT với TLB

Effective Access Time (EAT) là thời gian truy cập trung bình, có tính cả TLB hit và miss trong bài này<br/>Giả sử page table một cấp và không có page fault<br/>
Tra TLB tốn 10 ns, mỗi lượt RAM tốn 100 ns, hit rate là 90%

<div class="step" v-click><b>01</b><span><b>Hit</b> – TLB + đọc dữ liệu = 10 + 100 = 110 ns</span></div>
<div class="step" v-click><b>02</b><span><b>Miss</b> – TLB + đọc page table entry + đọc dữ liệu = 10 + 100 + 100 = 210 ns</span></div>
<div class="answer" v-click><span class="equation">EAT = 0,9 × 110 + 0,1 × 210 = <b>120 ns</b></span><br/>Nếu đề có page fault hoặc page table nhiều cấp, phải xét thêm các đường truy cập tương ứng</div>

<p class="footnote">Nguồn tham khảo – os_doc.pdf, trang 2, Bộ nhớ</p>

---

<div class="track"><span>07 – Đồng bộ và bộ nhớ</span><span>Ôn tập giữa kỳ</span></div>

# Page fault và page replacement

Khi page hợp lệ chưa nằm trong RAM, kernel tìm frame, nạp page, cập nhật ánh xạ và thử lại lệnh<br/>Dirty page có thể cần ghi ra bộ lưu trữ trước khi bị thay

| Thuật toán | Page bị chọn để thay |
|---|---|
| FIFO | Vào RAM sớm nhất |
| LRU | Page lâu nhất chưa được truy cập |
| OPT | Lâu nhất mới dùng lại, hoặc không dùng nữa |
| Clock | Duyệt theo vòng, bỏ qua page có reference bit đang bật và xóa bit đó |

<div class="note">Thrashing xảy ra khi page fault xảy ra liên tục, khiến hệ thống mất nhiều thời gian nạp và thay page</div>

---

<div class="track"><span>07 – Đồng bộ và bộ nhớ</span><span>Ôn tập giữa kỳ</span></div>

# Tự luyện – FIFO và LRU có khác nhau?

Có 3 frame, ban đầu trống<br/>Chuỗi truy cập là **1, 2, 3, 1, 4, 1**

<div class="answer" v-click><b>FIFO có 5 fault</b><br/>Nạp 1, 2, 3 rồi truy cập 1 đang có sẵn<br/>Nạp 4 đẩy 1 vì 1 vào sớm nhất<br/>Lần cuối truy cập 1 lại gây page fault</div>
<div class="answer" v-click><b>LRU có 4 fault</b><br/>Khi nạp 4, đẩy 2 vì 1 vừa dùng<br/>Lần cuối truy cập 1, page này vẫn còn trong RAM</div>

---

<div class="track"><span>08 – Luyện đề và tra cứu</span><span>Ôn tập giữa kỳ</span></div>

# Trả lời câu so sánh trong ba bước

<div class="step"><b>01</b><span><b>Chọn đúng cặp</b><br/>Polling/interrupt nói về thông báo<br/>PIO/DMA nói về chuyển dữ liệu</span></div>
<div class="step"><b>02</b><span><b>Nêu điều kiện</b><br/>Ví dụ gói tin đến thưa, lượng dữ liệu ít hoặc tác vụ cần phản hồi sớm</span></div>
<div class="step"><b>03</b><span><b>Giải thích chi phí</b><br/>Ví dụ lượt kiểm tra rỗng, chi phí thiết lập, hoặc context switch</span></div>

<div class="answer" v-click>Mẫu trả lời đề 2025–2026<br/>Khi card mạng nhận nhiều gói liên tục, polling theo lô có thể giảm chi phí xử lý ngắt trên từng gói</div>

---

<div class="track"><span>08 – Luyện đề và tra cứu</span><span>Ôn tập giữa kỳ</span></div>

# Đề 22TN – Nhận diện lịch CPU từ một chuỗi

Cho ba việc cùng đến theo thứ tự 1, 2, 3<br/>CPU lần lượt chạy các tiến trình theo chuỗi **1, 2, 3, 2, 1, 3**<br/>Round Robin có thể tạo ra thứ tự này trong trường hợp nào?

<div class="answer" v-click>Với mỗi tiến trình một burst, RR thuần giữ thứ tự vòng 1, 2, 3 nếu cả ba đều còn việc ở vòng hai</div>
<div class="answer" v-click>Chuỗi này có thể xảy ra với Round Robin nếu P1 tạm chờ I/O<br/>Cho q = 2<br/>P1 chạy 0–1 rồi chờ đến t = 4<br/>P2 chạy 1–3, P3 chạy 3–5<br/>Sau đó P2, P1, P3 lần lượt hoàn tất</div>
<div class="note" v-click>Để suy ra thuật toán, cần biết CPU burst, thời điểm chờ I/O và quy tắc preemption</div>

---

<div class="track"><span>08 – Luyện đề và tra cứu</span><span>Ôn tập giữa kỳ</span></div>

# Đề 2022–2023 – Tính vùng hệ thống

<div class="read-lines">
<p>Vùng hệ thống gồm 8 sector đầu và hai bảng, mỗi bảng dài 8k sector</p>
<p>Đĩa có N sector, giả sử mỗi sector 512 B, mỗi entry 4 B và mỗi cluster 8 sector</p>
</div>

<div class="step" v-click><b>01</b><span>Đặt <span class="equation">M = ⌊(N − 8) ÷ 8⌋</span><br/>Số cluster dữ liệu là <span class="equation">M − 2k</span></span></div>
<div class="step" v-click><b>02</b><span>Mỗi bảng có 8k × 512 / 4 = 1.024k entry<br/>Cần 1.024k ≥ M − 2k</span></div>
<div class="step" v-click><b>03</b><span>Chọn <span class="equation">k = ⌈M ÷ 1.026⌉</span><br/>Vùng hệ thống chiếm <span class="equation">8 + 16k</span> sector</span></div>
<div class="answer" v-click>N = 20.123.456 cho k = 2.452<br/>Vùng hệ thống chiếm <b>39.240 sector</b></div>

---

<div class="track"><span>08 – Luyện đề và tra cứu</span><span>Ôn tập giữa kỳ</span></div>

# Tự kiểm tra trước khi mở đề

- Mô tả được đường đi từ một yêu cầu đọc file đến ngắt hoàn tất
- Tính được đường đi đầu đọc khi biết hướng SCAN và vị trí bắt đầu
- Đọc được BPB, tính FirstData và lần chuỗi FAT
- Vẽ được cây fork và phân biệt số lần gọi printf với số lần chữ xuất hiện
- Lập được biểu đồ Gantt, tính R, T, W và giải thích điều kiện của đáp án

---

<div class="track"><span>08 – Luyện đề và tra cứu</span><span>Ôn tập giữa kỳ</span></div>

# Bài giảng và lời giải chi tiết

**Phần lý thuyết**<br/> Bài giảng 1–7, slide SSD và bài giảng về bộ nhớ<br/>Giáo trình Operating System Concepts, ấn bản 10

**Phần bài tập**<br/> Hang out, FAT hw 1–2 và các đề 2022–2023, 2024–2025, 2025–2026<br/>Đề 2025–2026 trong thư mục là bản biên soạn lại theo trí nhớ sinh viên

<div class="note">Mở bản PDF để xem đủ lời giải 22 câu đề cũ, 14 bài tự luyện và từng byte của câu mã hóa entry FAT</div>

<StudyLinks />
