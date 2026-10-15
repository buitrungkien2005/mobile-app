# Danh Sách Các File Không Có Tác Dụng Trong Mã Nguồn (Tham Khảo Dọn Dẹp)

> [!NOTE]
> **LƯU Ý QUAN TRỌNG:**
> - Tài liệu này **CHỈ DÙNG ĐỂ LIỆT KÊ VÀ PHÂN LOẠI** phục vụ việc rà soát và dọn dẹp mã nguồn.
> - Tuyệt đối **KHÔNG TỰ ĐỘNG XÓA** bất kỳ file nào trong danh sách này nếu chưa có sự xác nhận của người quản trị dự án.
> - Toàn bộ các file trong danh sách này khi xóa đi sẽ **KHÔNG ẢNH HƯỞNG** đến tính năng, giao diện hoặc luồng chạy thực tế của ứng dụng BeeBuddy.

---

## Bảng Tổng Hợp Số Lượng File Dư Thừa

| Phân nhóm | Vị trí thư mục | Số lượng ước tính | Mô tả |
| :--- | :--- | :---: | :--- |
| **Nhóm 1** | Thư mục gốc (`/`) | ~28 files | Các script Python tự động hóa và ảnh test tạm thời. |
| **Nhóm 2** | `mobile-app/scratch/` & root `mobile-app/` | ~45 files | Thư mục scratch và file backup (`messages_backup.tsx`, `update_messages.js`...). |
| **Nhóm 3** | `mobile-app/src/` | ~11 files | Component, hooks và screen mẫu từ Expo Starter Template không sử dụng. |
| **Nhóm 4** | `mobile-app/assets/images/` | 183 files | Ảnh assets cũ, ảnh crop test, icon expo mẫu không còn được gọi trong code. |

---

## Nhóm 1: Các File Script & Ảnh Test Tại Thư Mục Gốc (`git_repo/`)
*Các script Python được tạo ra để đo đạc pixel, chạy regex sửa file tạm trước đây:*

1. `animate.py`
2. `animate2.py`
3. `animate3.py`
4. `animate_fix.py`
5. `animate_fix2.py`
6. `fix.py`
7. `fix_profile.py`
8. `fix_tabbar_width.py`
9. `home_script.py`
10. `icon_custom.py`
11. `icon_fix.py`
12. `icon_svg.py`
13. `icon_svg2.py`
14. `icon_svg3.py`
15. `revert.py`
16. `revert_size.py`
17. `revert_tabbar_sizes.py`
18. `update_ai_login.py`
19. `update_profile_bee.py`
20. `update_profile_tabbar.py`
21. `update_tabbar.py`
22. `update_tabbar_bg.py`
23. `update_tabbar_sizes.py`
24. `test_2.png`, `test_3.png`, `test_avatar0.png`, `test_avatar7.png` *(Ảnh crop test tạm thời)*
25. `fonts.json`, `figma_selection_details.md`, `skills-lock.json`

---

## Nhóm 2: Thư Mục `mobile-app/scratch/` & File Backup Tạm
*Thư mục scratch chứa toàn bộ mã script và ảnh chụp màn hình trong quá trình phát triển:*

### A. File Backup & Script trong `mobile-app/`:
1. `mobile-app/messages_backup.tsx` *(File backup cũ của màn hình Messages)*
2. `mobile-app/update_messages.js` *(Script Node.js can thiệp nội dung)*
3. `mobile-app/toggle_debug.png` *(Ảnh chụp debug)*
4. `mobile-app/scripts/reset-project.js` *(Script mẫu reset của template Expo)*

### B. Toàn bộ thư mục `mobile-app/scratch/`:
1. `mobile-app/scratch/add_bell_routing.py`
2. `mobile-app/scratch/add_modal.py`
3. `mobile-app/scratch/add_post3.py`
4. `mobile-app/scratch/apply_empty_state.py`
5. `mobile-app/scratch/apply_sticky.py`
6. `mobile-app/scratch/fix_closing_tags.py`
7. `mobile-app/scratch/fix_header.py`
8. `mobile-app/scratch/fix_header_edge.py`
9. `mobile-app/scratch/fix_icons_text.py`
10. `mobile-app/scratch/fix_modal_and_heart.py`
11. `mobile-app/scratch/fix_overlay.py`
12. `mobile-app/scratch/fix_post3.py`
13. `mobile-app/scratch/fix_post3_v2.py`
14. `mobile-app/scratch/fix_profile.py`
15. `mobile-app/scratch/fix_profile_setting.py`
16. `mobile-app/scratch/fix_up_post.py`
17. `mobile-app/scratch/increase_heart.py`
18. `mobile-app/scratch/inject_post3.py`
19. `mobile-app/scratch/inject_post3_real.py`
20. `mobile-app/scratch/remove_black_circle.py`
21. `mobile-app/scratch/repair_home.py`
22. `mobile-app/scratch/repair_home_final.py`
23. `mobile-app/scratch/repair_home_final_v2.py`
24. `mobile-app/scratch/replace_actions.py`
25. `mobile-app/scratch/resize_tabbar.py`
26. `mobile-app/scratch/restore_black_circle.py`
27. `mobile-app/scratch/revert_notifications.py`
28. `mobile-app/scratch/revert_profile_setting.py`
29. `mobile-app/scratch/revert_sticky.py`
30. `mobile-app/scratch/scale_styles.py`
31. `mobile-app/scratch/shrink_icons.py`
32. `mobile-app/scratch/sticky_layout.py`
33. `mobile-app/scratch/sync_header.py`
34. `mobile-app/scratch/sync_headers.py`
35. `mobile-app/scratch/update_buttons.py`
36. `mobile-app/scratch/update_comments.py`
37. `mobile-app/scratch/update_discover_header.py`
38. `mobile-app/scratch/update_filter_font.py`
39. `mobile-app/scratch/update_home.py`
40. `mobile-app/scratch/update_modal_save.py`
41. `mobile-app/scratch/update_notifications.py`
42. `mobile-app/scratch/update_profile.py`
43. `mobile-app/scratch/update_replies.py`
44. `mobile-app/scratch/update_tabbar.py`
45. `mobile-app/scratch/*.png` (`comment_thread.png`, `conversation_thread.png`, `header_and_mascot.png`, `header_search_friend_crop.png`, `home_reference.png`, `mascot_crop_profile.png`, `mascot_original_profile.png`, `mockup_mascot_zone.png`, `notifications.png`, `notifications_empty.png`, `replies_screenshot.png`, `screenshot_modal.png`, `scroll_body_post.png`, `up_post.png`)

---

## Nhóm 3: Components & Screens Boilerplate Không Sử Dụng Trong `mobile-app/src/`
*Các thành phần mẫu sinh ra tự động từ Expo Starter Tab template, ứng dụng BeeBuddy đã có bộ component tùy biến riêng:*

1. [`src/components/CustomButton.tsx`](mobile-app/src/components/CustomButton.tsx): *(0 lần sử dụng)*
2. [`src/components/CustomInput.tsx`](mobile-app/src/components/CustomInput.tsx): *(0 lần sử dụng)*
3. [`src/components/hint-row.tsx`](mobile-app/src/components/hint-row.tsx): *(0 lần sử dụng)*
4. [`src/components/animated-icon.tsx`](mobile-app/src/components/animated-icon.tsx): *(Component mẫu icon động)*
5. [`src/components/animated-icon.web.tsx`](mobile-app/src/components/animated-icon.web.tsx): *(Component mẫu web)*
6. [`src/components/animated-icon.module.css`](mobile-app/src/components/animated-icon.module.css): *(CSS đi kèm icon động mẫu)*
7. [`src/components/app-tabs.tsx`](mobile-app/src/components/app-tabs.tsx): *(Tab bar mặc định của expo, BeeBuddy dùng `TabBarMenu.tsx` và `GuestTabBarMenu.tsx`)*
8. [`src/components/app-tabs.web.tsx`](mobile-app/src/components/app-tabs.web.tsx): *(Tab bar web mẫu)*
9. [`src/hooks/use-color-scheme.web.ts`](mobile-app/src/hooks/use-color-scheme.web.ts): *(Hook web mẫu, 0 lần gọi)*
10. [`src/app/explore.tsx`](mobile-app/src/app/explore.tsx): *(Màn hình mẫu Explore từ starter app)*
11. Các component chỉ phục vụ duy nhất file `explore.tsx`:
    * [`src/components/external-link.tsx`](mobile-app/src/components/external-link.tsx)
    * [`src/components/ui/collapsible.tsx`](mobile-app/src/components/ui/collapsible.tsx)
    * [`src/components/web-badge.tsx`](mobile-app/src/components/web-badge.tsx)
    * [`src/components/themed-text.tsx`](mobile-app/src/components/themed-text.tsx)
    * [`src/components/themed-view.tsx`](mobile-app/src/components/themed-view.tsx)

---

## Nhóm 4: Danh Sách 183 File Ảnh Assets Không Sử Dụng Trong `mobile-app/assets/images/`
*Toàn bộ 183 file ảnh dưới đây đã được quét qua Static Code Analysis và xác nhận KHÔNG CÓ bất kỳ lời gọi import hoặc require nào trong mã nguồn:*

### A. Icon mặc định của Expo:
- `android-icon-background.png`
- `android-icon-foreground.png`
- `android-icon-monochrome.png`
- `favicon.png`
- `react-logo@2x.png`
- `react-logo@3x.png`
- `tabIcons/explore@2x.png`
- `tabIcons/explore@3x.png`
- `tabIcons/home@2x.png`
- `tabIcons/home@3x.png`

### B. Ảnh crop debug, zoom, và lát cắt kiểm thử (Slice Test):
- `btn_1.png`, `btn_1_zoom.png`, `btn_2.png`, `btn_2_zoom.png`, `btn_3.png`, `btn_3_zoom.png`
- `btn_exact_1.png`, `btn_exact_2.png`, `btn_exact_3.png`
- `real_btn_1.png`, `real_btn_2.png`, `real_btn_3.png`
- `buddy_btn_1.png`, `buddy_btn_2.png`, `buddy_btn_3.png`
- `exact_badge_1.png`, `exact_badge_2.png`, `exact_badge_3.png`, `exact_header_strip.png`
- `item_1_exact.png`, `item_1_exact_x4.png`, `item_2_exact.png`, `item_2_exact_x4.png`, `item_3_exact.png`, `item_3_exact_x4.png`
- `item_at_230.png`, `item_at_230_x4.png`, `item_at_280.png`, `item_at_280_x4.png`, `item_at_330.png`, `item_at_330_x4.png`
- `right_item_1.png`, `right_item_1_x4.png`, `right_item_2.png`, `right_item_2_x4.png`, `right_item_3.png`, `right_item_3_x4.png`
- `header_actions_exact.png`, `header_actions_slice.png`, `header_avatar_discover.png`
- `header_btn_left.png`, `header_btn_mid.png`, `header_btn_right.png`, `header_buttons_crop.png`, `header_buttons_zoom.png`
- `header_full.png`, `header_left.png`, `header_right.png`
- `mockup_avatar_34.png`, `mockup_avatar_zoom.png`, `mockup_bell_34.png`, `mockup_bell_zoom.png`
- `pw_header.png`, `pw_left.png`, `pw_left_x2.png`, `pw_right.png`, `pw_right_x2.png`, `pw_search_bar.png`, `pw_top_row.png`
- `sbc_header.png`, `search_buddy_avatar.png`, `search_buddy_avatar_circle.png`, `search_buddy_avatar_exact.png`, `search_buddy_bell.png`, `search_buddy_header_crop.png`
- `test_crop.png`, `test_header_crop.png`, `test_right_actions.png`, `three_buttons_area.png`, `three_buttons_centered.png`
- `coding_crop.png`, `hiking_crop.png`, `pet_crop.png`
- `community_logo_1.png`, `community_logo_1_x3.png`, `community_logo_2.png`, `community_logo_2_x3.png`
- `g1_slice_0.png` đến `g1_slice_7.png`
- `g1_event_1.png`, `g1_event_2.png`, `g1_facepile.png`, `g1_members_strip.png`, `g1_post1_image.png`, `g1_post1_mid.png`, `g1_post2_image.png`, `g1_post_1.png`, `g1_post_2.png`, `g1_post_lock.png`, `g1_rule_1.png`, `g1_rule_2.png`, `g1_rule_3.png`, `g1_rule_badge_1.png`, `g1_rule_badge_2.png`, `g1_rule_badge_3.png`, `g1_sec1_header.png`, `g1_sec2_about.png`, `g1_sec3_events.png`, `g1_sec4_posts.png`, `g1_sec5_members.png`, `g1_sec6_rules.png`
- `g2_facepile.png`, `g2_sec1_header.png`, `g2_sec2_about.png`, `g2_sec3_events.png`, `g2_sec4_posts.png`, `g2_sec5_members.png`, `g2_sec6_rules.png`
- `group1_community_avatar.png`, `group1_hero.png`, `group2_community_avatar.png`, `group2_hero.png`
- `rule1_icon_full.png`, `rule_circle_1.png`, `rule_circle_2.png`, `rule_circle_3.png`

### C. Ảnh phiên bản cũ đã được thay thế bằng asset chuẩn:
- `avatar_v2_0.png`, `avatar_v2_1.png`, `avatar_v2_2.png`, `avatar_v2_3.png`, `avatar_v2_4.png`, `avatar_v2_5.png`, `avatar_v2_6.png`, `avatar_v2_7.png` *(Đã thay bằng bộ `avatar_v3_*`)*
- `eye22.png`, `eye_close.png`, `eye_close_2.png`, `eye_closed_custom.png`, `eye_open.png`, `eye_open_2.png`, `eye_open_custom.png`
- `password_close.png`, `password_open.png`
- `checkcircle.png`, `component2.png`, `lock22.png`
- `speech_bubble.png`, `splash-icon.png`
- `splash_1.png`, `splash_2.png`, `splash_3.png`, `splash_4.png`, `splash_5.png`, `splash_6.png` *(Trong `index.tsx` sử dụng ảnh trực tiếp từ đường dẫn khác)*
- `Lớp_phủ_trên_profiel.png` *(Đã thay bằng `Lop_phu_tren_profiel.png` chuẩn tên không dấu)*
- `3_user_profile.png`, `AI_Login_Merged.png`, `Selected=Home.png`, `TabItem-Discover.png`, `TabItem-Messages.png`, `User_Icon.png`, `tabbar_profile.png`
- `base_bee.png`, `bee_ef.png`, `bee_glow.png`, `bee_idle_base.png`, `bee_idle_ef.png`, `bee_mascot.gif`, `bottom_bee.png`, `download_5.gif`, `extracted_buddy_avatar.png`, `discover-avatar.png`
- `buddy_header_avatar.png`, `buddy_header_bell.png`, `header_buddy_avatar_perfect.png`, `logo_profile.png`, `profile_overlay_thick.png`
