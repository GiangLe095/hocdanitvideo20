# 🖼️ Hướng dẫn tạo Open Graph Images

## 📋 Tổng quan

Open Graph Images là ảnh hiển thị khi bạn chia sẻ link trên các nền tảng mạng xã hội như:
- Facebook
- Twitter
- WhatsApp
- Telegram
- Discord
- LinkedIn
- Và nhiều nền tảng khác

## 🎯 Kích thước chuẩn

- **Facebook, LinkedIn, Twitter**: 1200 x 630 pixels
- **Instagram**: 1080 x 1080 pixels (hình vuông)
- **Tỷ lệ khuyến nghị**: 1.91:1

## 🛠️ Cách tạo ảnh Open Graph

### Phương pháp 1: Sử dụng template HTML

1. **Mở file `public/og-image-template.html`** trong trình duyệt
2. **Chụp màn hình** hoặc sử dụng extension để chụp
3. **Cắt ảnh** về kích thước 1200x630px
4. **Lưu ảnh** vào thư mục `public/`

### Phương pháp 2: Sử dụng công cụ online

- **Canva**: https://canva.com (có template sẵn)
- **Figma**: https://figma.com
- **Pablo by Buffer**: https://pablo.buffer.com
- **OpenGraph.xyz**: https://www.opengraph.xyz

### Phương pháp 3: Sử dụng Next.js API Route

Tạo file `app/api/og/route.tsx` để tạo ảnh động:

```tsx
import { ImageResponse } from 'next/og';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title') || 'Default Title';
  
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
        }}
      >
        <h1 style={{ fontSize: 64, textAlign: 'center' }}>{title}</h1>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
```

## 📁 Cấu trúc file ảnh

```
public/
├── og-image.jpg          # Ảnh chính cho trang chủ
├── blogs-og-image.jpg    # Ảnh cho trang blogs
├── blog-1-image.jpg      # Ảnh cho blog ID 1
├── blog-2-image.jpg      # Ảnh cho blog ID 2
└── ...
```

## 🔧 Cập nhật URL trong code

Thay thế `https://your-domain.com` bằng domain thực của bạn:

```tsx
// Trong layout.tsx
openGraph: {
  url: "https://your-actual-domain.com",
  images: [
    {
      url: "https://your-actual-domain.com/og-image.jpg",
      // ...
    },
  ],
}
```

## 🧪 Test Open Graph

### 1. Facebook Debugger
- Truy cập: https://developers.facebook.com/tools/debug/
- Nhập URL và click "Debug"
- Xem preview và refresh cache

### 2. Twitter Card Validator
- Truy cập: https://cards-dev.twitter.com/validator
- Nhập URL và xem preview

### 3. LinkedIn Post Inspector
- Truy cập: https://www.linkedin.com/post-inspector/
- Nhập URL và xem preview

### 4. WhatsApp/Telegram
- Gửi link trong chat
- Xem preview hiển thị

## 📱 Các thẻ Open Graph quan trọng

```html
<!-- Cơ bản -->
<meta property="og:title" content="Tiêu đề trang" />
<meta property="og:description" content="Mô tả trang" />
<meta property="og:image" content="URL ảnh" />
<meta property="og:url" content="URL trang" />
<meta property="og:type" content="website" />

<!-- Nâng cao -->
<meta property="og:site_name" content="Tên website" />
<meta property="og:locale" content="vi_VN" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content="Mô tả ảnh" />

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Tiêu đề" />
<meta name="twitter:description" content="Mô tả" />
<meta name="twitter:image" content="URL ảnh" />
<meta name="twitter:creator" content="@username" />
```

## 🚀 Lưu ý quan trọng

1. **Ảnh phải công khai**: URL ảnh phải có thể truy cập từ internet
2. **Kích thước tối thiểu**: 200x200px, khuyến nghị 1200x630px
3. **Format hỗ trợ**: JPG, PNG, GIF, WebP
4. **Cache**: Các nền tảng cache ảnh, có thể mất vài phút để cập nhật
5. **HTTPS**: Sử dụng HTTPS cho tất cả URL
6. **Alt text**: Luôn có alt text cho ảnh

## 🎨 Tips thiết kế

- **Màu sắc tương phản**: Đảm bảo text dễ đọc
- **Typography**: Sử dụng font rõ ràng, kích thước phù hợp
- **Branding**: Thêm logo, màu sắc thương hiệu
- **Call-to-action**: Có thể thêm button hoặc text kêu gọi
- **Responsive**: Test trên nhiều kích thước màn hình

## 📊 Monitoring

Theo dõi hiệu quả Open Graph:
- Facebook Insights
- Twitter Analytics
- Google Analytics (social traffic)
- LinkedIn Analytics 