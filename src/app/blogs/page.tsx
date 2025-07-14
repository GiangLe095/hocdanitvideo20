import { siteConfig } from "../../config/site";

// ========================================
// PAGE METADATA
// ========================================
export const metadata = {
  title: `Danh sách Blogs | ${siteConfig.name}`,
  description: `Xem danh sách các blog mới nhất với hệ thống quản lý hiện đại. Tạo, chỉnh sửa và quản lý blog một cách dễ dàng.`,
  
  // ========================================
  // OPEN GRAPH TAGS
  // ========================================
  openGraph: {
    title: `Danh sách Blogs | ${siteConfig.name}`,
    description: `Xem danh sách các blog mới nhất với hệ thống quản lý hiện đại.`,
    url: siteConfig.getUrl("/blogs"),
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.getImageUrl(siteConfig.images.blogs),
        width: 1200,
        height: 630,
        alt: `Danh sách Blogs - ${siteConfig.name}`,
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
    title: `Danh sách Blogs | ${siteConfig.name}`,
    description: `Xem danh sách các blog mới nhất với hệ thống quản lý hiện đại.`,
    images: [siteConfig.getImageUrl(siteConfig.images.blogs)],
    creator: siteConfig.social.twitter,
  },
};

import BlogsPageClient from './BlogsPageClient';

export default function BlogsPage() {
  return <BlogsPageClient />;
} 