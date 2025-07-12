"use client";
// Import Link để điều hướng nội bộ, usePathname để lấy đường dẫn hiện tại
import Link from "next/link";
import { usePathname } from "next/navigation";
import "../globals.css";

// Mảng các tab điều hướng
const navItems = [
  { label: "Blogs", path: "/blogs" },
  { label: "Facebook", path: "/facebook" },
  { label: "Tiktok", path: "/tiktok" },
  { label: "Youtube", path: "/youtube" },
  { label: "Link", path: "/link" },
];

export default function AppHeader() {
  // Lấy đường dẫn hiện tại để xác định tab nào đang active
  const pathname = usePathname();

  return (
    // Header chia 3 phần: trái (logo), giữa (tab), phải (logo phụ - đã bỏ)
    <header className="custom-header">
      <div className="header-left">
        {/* Logo, bấm vào sẽ về trang chủ */}
        <Link href="/" className="site-title">Hỏi Dân IT</Link>
      </div>
      <nav className="header-center">
        {/* Duyệt qua từng tab và render Link, tab nào trùng pathname sẽ active */}
        {navItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={`nav-link${pathname === item.path ? " active" : ""}`}
            scroll={false}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
} 