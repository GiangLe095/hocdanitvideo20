import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AppHeader from "./components/app.header";
import AppFooter from "./components/app.footer";
import { siteConfig } from "../config/site";

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
  title: `${siteConfig.name} - Blog Management System`,
  description: siteConfig.description,
  
  // ========================================
  // OPEN GRAPH TAGS (Facebook, WhatsApp, Telegram, Discord)
  // ========================================
  openGraph: {
    title: `${siteConfig.name} - Blog Management System`,
    description: siteConfig.description,
    url: siteConfig.domain,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.getImageUrl(siteConfig.images.main),
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} - Blog Management System`,
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
    title: `${siteConfig.name} - Blog Management System`,
    description: siteConfig.description,
    images: [siteConfig.getImageUrl(siteConfig.images.main)],
    creator: siteConfig.social.twitter,
  },
  
  // ========================================
  // ADDITIONAL SEO TAGS
  // ========================================
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
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
