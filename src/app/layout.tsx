import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AppHeader from "./components/app.header";
import AppFooter from "./components/app.footer";

// ========================================
// FONT CONFIGURATION
// ========================================
// Cấu hình font Inter từ Google Fonts
// - subsets: ['latin'] - chỉ load font Latin
// - display: 'swap' - hiển thị font dự phòng trong khi load
const inter = Inter({ subsets: ["latin"], display: 'swap' });

// ========================================
// METADATA CONFIGURATION
// ========================================
// Metadata cho SEO và social media preview
export const metadata: Metadata = {
  title: "Hỏi Dân IT - Blog Management System",
  description: "Hệ thống quản lý blog hiện đại với Next.js, React và TypeScript. Tạo, chỉnh sửa và quản lý blog một cách dễ dàng.",
  
  // ========================================
  // OPEN GRAPH TAGS (Facebook, WhatsApp, Telegram, Discord)
  // ========================================
  openGraph: {
    title: "Hỏi Dân IT - Blog Management System",
    description: "Hệ thống quản lý blog hiện đại với Next.js, React và TypeScript. Tạo, chỉnh sửa và quản lý blog một cách dễ dàng.",
    url: "https://your-domain.com", // Thay bằng domain thực của bạn
    siteName: "Hỏi Dân IT",
    images: [
      {
        url: "https://your-domain.com/og-image.jpg", // Thay bằng URL ảnh thực
        width: 1200,
        height: 630,
        alt: "Hỏi Dân IT - Blog Management System",
      },
    ],
    locale: "vi_VN",
    type: "website",
  },
  
  // ========================================
  // TWITTER CARD TAGS
  // ========================================
  twitter: {
    card: "summary_large_image",
    title: "Hỏi Dân IT - Blog Management System",
    description: "Hệ thống quản lý blog hiện đại với Next.js, React và TypeScript.",
    images: ["https://your-domain.com/twitter-image.jpg"], // Thay bằng URL ảnh thực
    creator: "@hoidanit", // Thay bằng Twitter handle thực
  },
  
  // ========================================
  // ADDITIONAL SEO TAGS
  // ========================================
  keywords: ["blog", "management", "nextjs", "react", "typescript", "web development"],
  authors: [{ name: "Hỏi Dân IT" }],
  creator: "Hỏi Dân IT",
  publisher: "Hỏi Dân IT",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

// ========================================
// ROOT LAYOUT COMPONENT
// ========================================
// Layout gốc cho toàn bộ ứng dụng
// - Chứa header, footer và main content
// - Áp dụng font và CSS global
export default function RootLayout({
  children, // Nội dung chính của từng trang
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* ========================================
            HEADER SECTION
            ======================================== */}
        <AppHeader />
        
        {/* ========================================
            MAIN CONTENT SECTION
            ======================================== */}
        <div className="container">
          {children}
        </div>
        
        {/* ========================================
            FOOTER SECTION
            ======================================== */}
        <AppFooter />
      </body>
    </html>
  );
}
