// ========================================
// PAGE METADATA
// ========================================
export const metadata = {
  title: "Danh sách Blogs | Hỏi Dân IT",
  description: "Xem danh sách các blog mới nhất với hệ thống quản lý hiện đại. Tạo, chỉnh sửa và quản lý blog một cách dễ dàng.",
  
  // ========================================
  // OPEN GRAPH TAGS
  // ========================================
  openGraph: {
    title: "Danh sách Blogs | Hỏi Dân IT",
    description: "Xem danh sách các blog mới nhất với hệ thống quản lý hiện đại.",
    url: "https://your-domain.com/blogs",
    siteName: "Hỏi Dân IT",
    images: [
      {
        url: "https://your-domain.com/blogs-og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Danh sách Blogs - Hỏi Dân IT",
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
    title: "Danh sách Blogs | Hỏi Dân IT",
    description: "Xem danh sách các blog mới nhất với hệ thống quản lý hiện đại.",
    images: ["https://your-domain.com/blogs-twitter-image.jpg"],
    creator: "@hoidanit",
  },
};

import BlogsPageClient from './BlogsPageClient';

export default function BlogsPage() {
  return <BlogsPageClient />;
} 