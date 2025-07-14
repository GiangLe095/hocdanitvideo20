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
// Metadata cho SEO và browser tab
export const metadata: Metadata = {
  title: "React-Bootstrap Demo",        // Tiêu đề trang web
  description: "Demo layout",           // Mô tả trang web
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
