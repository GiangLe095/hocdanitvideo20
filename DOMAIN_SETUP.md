# 🌐 Hướng dẫn cấu hình Domain

## 📋 Tổng quan

Để cập nhật domain thực cho website, bạn cần thay đổi các giá trị trong file `src/config/site.ts`.

## 🔧 Cách cập nhật Domain

### 1. **Mở file `src/config/site.ts`**

```tsx
export const siteConfig = {
  // Thay đổi domain này khi deploy
  domain: process.env.NEXT_PUBLIC_SITE_URL || "https://hocdanitvideo20.vercel.app",
  // ...
};
```

### 2. **Các domain bạn có thể sử dụng:**

#### 🚀 **Vercel (Khuyến nghị - Miễn phí)**
```tsx
domain: "https://hocdanitvideo20.vercel.app"
```

#### 🌐 **Netlify (Miễn phí)**
```tsx
domain: "https://your-project-name.netlify.app"
```

#### 📚 **GitHub Pages**
```tsx
domain: "https://giangle095.github.io/hocdanitvideo20"
```

#### 🏠 **Domain tùy chỉnh (nếu có)**
```tsx
domain: "https://yourdomain.com"
```

## 🛠️ Cách deploy lên Vercel (Khuyến nghị)

### Bước 1: Tạo tài khoản Vercel
1. Truy cập: https://vercel.com
2. Đăng ký bằng GitHub account
3. Import project từ GitHub

### Bước 2: Deploy
1. Vercel sẽ tự động detect Next.js project
2. Click "Deploy"
3. Sau khi deploy xong, bạn sẽ có URL như: `https://hocdanitvideo20.vercel.app`

### Bước 3: Cập nhật domain trong code
```tsx
// Trong src/config/site.ts
domain: "https://hocdanitvideo20.vercel.app",
```

## 🔄 Cách deploy lên Netlify

### Bước 1: Tạo tài khoản Netlify
1. Truy cập: https://netlify.com
2. Đăng ký bằng GitHub account
3. Import project từ GitHub

### Bước 2: Cấu hình build
- **Build command**: `npm run build`
- **Publish directory**: `.next`
- **Node version**: 18 (hoặc cao hơn)

### Bước 3: Deploy
1. Click "Deploy site"
2. Sau khi deploy xong, bạn sẽ có URL như: `https://your-project-name.netlify.app`

## 📱 Cách deploy lên GitHub Pages

### Bước 1: Cấu hình Next.js
Thêm vào `next.config.ts`:
```ts
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  }
};
```

### Bước 2: Cập nhật package.json
```json
{
  "scripts": {
    "export": "next build && next export",
    "deploy": "npm run export && touch out/.nojekyll"
  }
}
```

### Bước 3: Deploy
1. Chạy: `npm run deploy`
2. Push thư mục `out/` lên GitHub
3. Cấu hình GitHub Pages trong repository settings

## 🔧 Cấu hình Environment Variables

### Tạo file `.env.local`:
```bash
# Domain chính
NEXT_PUBLIC_SITE_URL=https://your-domain.com

# API URL
NEXT_PUBLIC_API_URL=http://localhost:8000

# Social Media
NEXT_PUBLIC_TWITTER_HANDLE=@yourhandle
NEXT_PUBLIC_FACEBOOK_PAGE=yourpage
NEXT_PUBLIC_LINKEDIN_PROFILE=yourprofile
```

### Cập nhật `src/config/site.ts`:
```tsx
export const siteConfig = {
  domain: process.env.NEXT_PUBLIC_SITE_URL || "https://hocdanitvideo20.vercel.app",
  social: {
    twitter: process.env.NEXT_PUBLIC_TWITTER_HANDLE || "@hoidanit",
    facebook: process.env.NEXT_PUBLIC_FACEBOOK_PAGE || "hoidanit",
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN_PROFILE || "hoidanit",
  },
  // ...
};
```

## 🧪 Test sau khi cập nhật

### 1. **Test local:**
```bash
npm run dev
# Truy cập: http://localhost:3001
```

### 2. **Test production:**
- Deploy lên hosting
- Truy cập domain thực
- Test Open Graph với Facebook Debugger

### 3. **Test Open Graph:**
- Facebook: https://developers.facebook.com/tools/debug/
- Twitter: https://cards-dev.twitter.com/validator
- LinkedIn: https://www.linkedin.com/post-inspector/

## 📁 Cấu trúc file ảnh

Sau khi deploy, tạo các ảnh Open Graph:

```
public/
├── og-image.jpg          # Ảnh chính (1200x630px)
├── blogs-og-image.jpg    # Ảnh trang blogs (1200x630px)
├── blog-1-image.jpg      # Ảnh blog ID 1 (1200x630px)
├── blog-2-image.jpg      # Ảnh blog ID 2 (1200x630px)
└── ...
```

## 🚀 Lưu ý quan trọng

1. **HTTPS bắt buộc**: Tất cả URL phải dùng HTTPS
2. **Ảnh công khai**: URL ảnh phải có thể truy cập từ internet
3. **Cache**: Các nền tảng cache metadata, có thể mất vài phút để cập nhật
4. **Test kỹ**: Test trên nhiều nền tảng khác nhau
5. **Backup**: Luôn backup code trước khi deploy

## 🎯 Checklist hoàn thành

- [ ] Chọn hosting (Vercel/Netlify/GitHub Pages)
- [ ] Deploy project
- [ ] Cập nhật domain trong `src/config/site.ts`
- [ ] Tạo ảnh Open Graph
- [ ] Test Open Graph trên các nền tảng
- [ ] Cập nhật social media handles
- [ ] Test toàn bộ website

## 📞 Hỗ trợ

Nếu gặp vấn đề:
1. Kiểm tra console errors
2. Xem logs deployment
3. Test từng bước một
4. Tham khảo documentation của hosting provider 