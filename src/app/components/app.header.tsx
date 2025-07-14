"use client";

// ========================================
// IMPORTS & DEPENDENCIES
// ========================================
import Link from "next/link"; // Next.js Link component cho navigation
import { usePathname } from "next/navigation"; // Hook để lấy current path

// ========================================
// HEADER COMPONENT
// ========================================
// Component header chứa navigation menu
// - Logo/Brand name
// - Navigation links
// - Active state cho current page
export default function AppHeader() {
  // ========================================
  // HOOKS & STATE
  // ========================================
  // Lấy current pathname để highlight active link
  const pathname = usePathname();

  // ========================================
  // NAVIGATION DATA
  // ========================================
  // Mảng chứa thông tin các navigation links
  const navItems = [
    { href: "/blogs", label: "Blogs" },
    { href: "/facebook", label: "Facebook" },
    { href: "/tiktok", label: "Tiktok" },
    { href: "/youtube", label: "Youtube" },
    { href: "/link", label: "Link" },
  ];

  // ========================================
  // RENDER NAVIGATION
  // ========================================
  return (
    <header className="custom-header">
      {/* ========================================
          HEADER LEFT - BRAND/LOGO
          ======================================== */}
      <div className="header-left">
        {/* Logo/Brand name với link về homepage */}
        <Link className="site-title" href="/">
          Hỏi Dân IT
        </Link>
      </div>

      {/* ========================================
          HEADER CENTER - NAVIGATION MENU
          ======================================== */}
      <nav className="header-center">
        {/* Render từng navigation link */}
        {navItems.map((item) => (
          <Link
            key={item.href}
            className={`nav-link ${pathname === item.href ? "active" : ""}`}
            href={item.href}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
} 