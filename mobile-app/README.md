# 🐝 Beebuddy Mobile App

Beebuddy là một ứng dụng di động mạng xã hội (friendship platform) kết nối người dùng thông qua các sở thích chung, hoạt động cộng đồng và vị trí địa lý. Ứng dụng được xây dựng trên nền tảng **React Native / Expo** với giao diện tuỳ chỉnh cao cấp và trải nghiệm người dùng siêu mượt mà.

---

## 🛠 Tech Stack
- **Framework:** React Native / Expo (Sử dụng Expo Router cho kiến trúc điều hướng File-based routing).
- **Animations:** `react-native-reanimated` cho các vi tương tác (micro-interactions) và chuyển cảnh.
- **Gesture Handling:** `react-native` PanResponder & Gesture Handler.
- **Styling:** StyleSheet, Native SVG, MaskedView (cho Text Gradients).
- **Typography:** Expo Google Fonts (`AfacadFlux`, `Dongle`, `Inter`).

---

## 📂 Source Map (Cấu trúc thư mục)
Toàn bộ mã nguồn cốt lõi nằm trong thư mục `src/`:

```text
src/
├── app/                  # Lớp Routing (Định tuyến) sử dụng Expo Router
│   ├── _layout.tsx       # Root Layout (Chứa SafeAreaProvider, StatusBar tràn viền)
│   ├── index.tsx         # Splash Screen (Animation khởi động của ong và logo)
│   ├── (auth)/           # Màn hình chưa xác thực
│   │   └── login.tsx     # Màn hình SignIn / SignUp / Guest login
│   ├── (tabs)/           # Màn hình chính của Người dùng (Đã đăng nhập)
│   │   ├── _layout.tsx   # Tabs Layout (Tích hợp Custom TabBarMenu)
│   │   ├── home.tsx      # Màn hình trang chủ (Feed)
│   │   ├── discover.tsx  # Màn hình khám phá
│   │   ├── profile.tsx   # Màn hình cá nhân
│   │   └── ...           # Các màn hình cài đặt phụ (sub-settings)
│   └── (guest)/          # Màn hình chính cho Khách (Guest Mode)
│       └── ...
├── components/           # Lớp UI (Các thành phần giao diện tái sử dụng)
│   ├── TabBarMenu.tsx    # Thanh điều hướng Custom của User
│   ├── GuestTabBarMenu.tsx # Thanh điều hướng Custom của Guest
│   ├── AISup.tsx         # Chú ong trợ lý ảo nổi (Draggable Chat Head)
│   ├── CustomSwitch.tsx  # Nút bật/tắt custom morphing animation
│   └── ...
├── utils/                # Các hàm tiện ích
│   └── scaling.ts        # Thuật toán co giãn tự động (Global Responsive)
├── constants/            # Chứa các hằng số cấu hình (Theme, Colors)
└── hooks/                # Custom React Hooks
```

---

## 🗺 Kiến trúc Định tuyến (Routing Architecture)

Dự án sử dụng **Expo Router** để tổ chức cấu trúc màn hình thành 3 luồng chính:
1. **Luồng Khởi động (Splash):** Chạy tại `app/index.tsx`. Ở đây chứa chuỗi hoạt ảnh khởi động logo phức tạp trước khi chuyển hướng tự động sang Login.
2. **Luồng Xác thực (Auth Stack):** Nằm trong thư mục `(auth)`. Chứa màn hình Login đa năng có khả năng chuyển đổi mượt mà giữa Đăng nhập, Đăng ký và Quên mật khẩu mà không cần tải lại trang.
3. **Luồng Chính (Main Tabs):** Nằm trong thư mục `(tabs)` (và `(guest)`). Khi đăng nhập thành công, app sẽ sử dụng kiến trúc Tab Navigation (nhưng được ẩn UI Tab mặc định để thay bằng `TabBarMenu.tsx` custom toàn diện).
    - Mạng lưới cài đặt Profile được phân tầng sâu bên trong tab Profile: `profile` ➔ `profile-setting` ➔ (`language`, `theme`, `help-center`, `privacy-safety`...).

---

## 🎨 Kiến trúc Giao diện & UI/UX (Core UI Features)

### 1. Tràn Viền Tuyệt Đối (Edge-to-Edge Design)
- **Status Bar (Top):** Thanh trạng thái Android được cấu hình trong suốt (`translucent`, `backgroundColor="transparent"`), giúp màu nền của ứng dụng lan toả lên tận đỉnh màn hình, xoá bỏ hoàn toàn dải trắng tù túng.
- **Navigation Bar (Bottom):** Không sử dụng `<SafeAreaView>` để nhốt ứng dụng. Thay vào đó, hình nền TabBar được vẽ tràn đáy. Khoảng không an toàn `insets.bottom` chỉ được dùng để "đôn" (padding) các nút bấm lên, giúp bảo vệ nút khỏi khu vực bấm nhầm của hệ điều hành.

### 2. Tự Động Co Giãn Màn Hình (Global Responsive Scaling)
- Sử dụng hàm `rs()` (Responsive Size) từ `src/utils/scaling.ts`.
- Mọi giá trị cứng như width, height, fontSize, padding trên 36+ file `.tsx` đều được bọc bởi `rs()`. Nhờ đó, giao diện tự động phình to hoặc thu nhỏ theo tỷ lệ vàng (thiết kế gốc: 393x852) để vừa khít mọi loại kích thước máy Android/iOS.

### 3. Thanh Điều Hướng Nâng Cao (Custom TabBar)
- TabBar tuỳ chỉnh có tỷ lệ icon được tinh chỉnh cân bằng (26x26).
- Tích hợp "Vệt đen" (Active Pill) tự động ôm khít icon khi được chọn.
- Nút Action (+) khổng lồ phá cách ở trung tâm.
- Quản lý logic đường dẫn chặt chẽ qua hook `useRouter` và ngăn chặn đẩy trang trùng lặp qua `usePathname`.

### 4. Trợ Lý Ảo Nổi (Draggable AI Sup)
- Chú ong AI Sup (BeeBuddy) góc trái màn hình được biến thành một Chat Head lơ lửng nhờ `Animated.ValueXY` và `PanResponder`.
- Người dùng có thể kéo thả chú ong đi bất kỳ đâu trên màn hình. Hệ thống phân biệt thông minh giữa **cử chỉ lướt** (vuốt để di chuyển) và **cử chỉ chạm** (bấm để mở phòng chat).

### 5. Vi Tương Tác (Micro-Animations)
- Tận dụng sức mạnh của `react-native-reanimated`.
- **Morphing UI:** Layout biến đổi hình dạng mềm mại khi chuyển từ Login sang Signup.
- **Custom Toggle Switch:** Nút gạt bật tắt thay đổi màu sắc và toạ độ cực kỳ tự nhiên.
- **Text Gradients:** Kết hợp `<MaskedView>` và `<LinearGradient>` để tạo chữ có màu chuyển sắc đặc trưng của brand (#ffbb00 ➔ #ff7b00) tại các nút bấm và tiêu đề quan trọng.

---

## 🚀 Hướng Dẫn Cài Đặt (Installation & Run)

Môi trường yêu cầu: Node.js (>= 18), npm/yarn.

```bash
# 1. Cài đặt các gói thư viện
npm install

# 2. Khởi chạy ứng dụng (Mở menu Expo)
npx expo start

# 3. Phím tắt trong terminal:
# - Bấm 'a' để mở ứng dụng trên Android Emulator
# - Bấm 'i' để mở ứng dụng trên iOS Simulator
# - Bấm 'r' để tải lại giao diện (Reload)
```
