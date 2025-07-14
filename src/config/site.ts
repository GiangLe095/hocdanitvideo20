// ========================================
// SITE CONFIGURATION
// ========================================
// Cấu hình domain và URL cho website
// Thay đổi các giá trị này khi deploy lên hosting thực

export const siteConfig = {
  // ========================================
  // DOMAIN CONFIGURATION
  // ========================================
  // Thay đổi domain này khi deploy
  domain: process.env.NEXT_PUBLIC_SITE_URL || "https://hocdanitvideo20.vercel.app",
  
  // ========================================
  // SOCIAL MEDIA CONFIGURATION
  // ========================================
  social: {
    twitter: "@hoidanit", // Thay bằng Twitter handle thực
    facebook: "hoidanit", // Thay bằng Facebook page thực
    linkedin: "hoidanit", // Thay bằng LinkedIn profile thực
  },
  
  // ========================================
  // SITE INFORMATION
  // ========================================
  name: "Hỏi Dân IT",
  description: "Hệ thống quản lý blog hiện đại với Next.js, React và TypeScript",
  keywords: ["blog", "management", "nextjs", "react", "typescript", "web development"],
  
  // ========================================
  // IMAGE URLS
  // ========================================
  // Các URL ảnh cho Open Graph và Twitter Card
  images: {
    // Ảnh chính cho trang chủ
    main: "/og-image.jpg",
    // Ảnh cho trang blogs
    blogs: "/blogs-og-image.jpg",
    // Ảnh cho từng blog (sẽ được tạo động)
    blog: (id: number) => `/blog-${id}-image.jpg`,
  },
  
  // ========================================
  // URL HELPERS
  // ========================================
  // Các hàm helper để tạo URL
  getUrl: (path: string = "") => `${siteConfig.domain}${path}`,
  getImageUrl: (imagePath: string) => `${siteConfig.domain}${imagePath}`,
  getBlogUrl: (id: string | number) => `${siteConfig.domain}/blogs/${id}`,
  getBlogImageUrl: (id: number) => siteConfig.getImageUrl(siteConfig.images.blog(id)),
};

// ========================================
// ENVIRONMENT CONFIGURATION
// ========================================
// Cấu hình cho các môi trường khác nhau
export const envConfig = {
  // Development
  development: {
    domain: "http://localhost:3001",
  },
  // Production
  production: {
    domain: "https://hocdanitvideo20.vercel.app", // Thay bằng domain thực
  },
};

// ========================================
// EXPORT DEFAULT
// ========================================
export default siteConfig; 