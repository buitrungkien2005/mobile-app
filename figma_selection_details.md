# Chi tiết thông số Figma Selection

Tài liệu này tổng hợp toàn bộ các thông số về thiết kế và hiệu ứng được trích xuất từ các vùng chọn (selection) của bạn trên Figma.

## 1. Fonts (Typography)
Sử dụng 2 font chữ chính trong thiết kế:

* **Dongle**:
  * Kích thước: `28px`, Style: `Bold` (Sử dụng cho tiêu đề lớn như *"Welcome back"*).
  * Kích thước: `16px`, Style: `Regular` (Sử dụng cho placeholder như *"name@company.com"*).
  * Kích thước: `14px`, Style: `Bold` (Sử dụng cho các nhãn input như *"Email"*, *"Password"*).
* **Afacad Flux**:
  * Kích thước: `16px`, Style: `Bold` (Dùng riêng cho các nút bấm như *"Sign in"*, *"Continue with Google"*, *"Continue with Apple"*).

---

## 2. Colors (Màu sắc)

### Màu đơn sắc (Solid)
* `#ffffff` (Trắng): Dùng làm nền, chữ hoặc icon trên các background tối màu.
* `#000000` (Đen): Dùng cho các icon và thành phần vector.
* `#ffbb00` (Vàng): Màu chủ đạo (Primary Color), được dùng trên nút *"Sign in"*, nền của một số frame và các vector nhấn.
* `#111827` (Đen/Xám rất đậm): Màu chữ cho nút bấm chính và biểu tượng Apple.
* `#374151` (Xám đậm): Màu chữ cho các nhãn (label) và text phụ.
* `#9ca3af` (Xám nhạt): Dùng cho các chữ placeholder mờ và biểu tượng.
* `#e5e7eb` (Xám viền): Dùng cho đường viền (stroke) của ô nhập liệu và các nút bấm.
* `#f9fafb` (Trắng xám): Màu nền (fill) cho các ô nhập liệu (inputs).
* `#4285f4` (Xanh dương): Đặc trưng dùng cho biểu tượng của Google.

### Màu Gradient
* `linear-gradient(110deg, #fff33b ... #e93e3a)`: Dải màu chạy dọc từ vàng sáng sang đỏ cam.
* `linear-gradient(180deg, #fecc07 ... #ec008c)`: Dải màu dọc từ cam chanh sang hồng đậm.
* `linear-gradient(138deg, #ffbb00 ... #ff7b00)`: Dải màu chéo từ vàng sang cam.

---

## 3. Styles & Effects (Kiểu dáng & Hiệu ứng)

### Đổ bóng (Shadows)
* **Drop Shadow (1)**: Trắng (`#ffffff`), `Opacity 5%`, Offset Y: `4`, Radius: `4`.
* **Drop Shadow (2)**: Trắng (`#ffffff`), `Opacity 20%`, Offset Y: `4`, Radius: `4`.
* **Inner Shadow**: Đen (`#000000`), `Opacity 10%`, Offset X: `-1`, Offset Y: `1`, Radius: `3.1`.

### Bo góc (Border Radius)
* `16px`: Mức bo góc tiêu chuẩn, được sử dụng cho toàn bộ các ô nhập liệu (inputs) và các nút nhấn (buttons).
* `24px`: Bo góc cho cả khối container form đăng nhập.

### Viền (Stroke) & Bố cục (Layout)
* Các đường viền có độ dày `1px`, được căn chỉnh nằm bên trong (`Inside`) và thường là màu xám nhạt (`#e5e7eb`).
* Thành phần được tổ chức cực kỳ gọn gàng với hệ thống **Auto Layout**:
  * Các khoảng cách nội bộ (item spacing) dao động mức: `2px`, `10px`, `12px`.
  * Lớp Padding bên trong các khối đa phần là `16px` ở mọi góc (trên/dưới/trái/phải).

---

## 4. Prototype & Animations
Các luồng Animation (Prototype Reactions) được cài đặt chuyển cảnh tự động như sau:

> [!NOTE]
> Cấu trúc cho thấy đây là một luồng Onboarding hoặc Splash Screen có hẹn giờ tự chuyển động (tính năng `After Delay`).

**Từ Frame "2. open" chuyển sang "3. open"**
* **Trigger:** After delay (Sau khi chờ) `800ms`.
* **Action:** Navigate To "3. open".
* **Transition:** Smart Animate (Easing: Ease Out, Thời gian: `800ms`).

**Từ Frame "4. open" chuyển sang "5. open"**
* **Trigger:** After delay `300ms`.
* **Action:** Navigate To "5. open".
* **Transition:** Smart Animate (Easing: Ease Out, Thời gian: `300ms`).

**Từ Frame "5. open" chuyển sang "6.open"**
* **Trigger:** After delay `600ms`.
* **Action:** Navigate To "6.open".
* **Transition:** Dissolve / Làm mờ (Easing: Quick, Thời gian: `620ms`).

**Từ Frame "6.open" chuyển đi**
* **Trigger:** After delay `800ms`.
* **Action:** Navigate To (một frame khác).
* **Transition:** Smart Animate (Thời gian: `600ms`).
  * **Easing:** Custom Cubic Bezier với tọa độ `(1, 0.007, 0, 1.002)` (tạo hiệu ứng nảy/đàn hồi nhẹ).
