import type { Metadata } from 'next';
import BlogDetailClient from './BlogDetailClient';

interface Blog {
  id: number;
  title: string;
  author: string;
  content: string;
  createdAt?: string;
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const res = await fetch('http://localhost:8000/blogs', { cache: 'no-store' });
  const blogs = await res.json();
  const blogIndex = params.id && typeof params.id === 'string' ? parseInt(params.id) - 1 : -1;
  const blog = blogs && blogIndex >= 0 && blogIndex < blogs.length ? blogs[blogIndex] : null;
  
  if (blog) {
    const title = `${blog.title} | Hỏi Dân IT`;
    const description = blog.content?.slice(0, 150) || 'Xem chi tiết bài viết blog.';
    const imageUrl = `https://your-domain.com/blog-${blog.id}-image.jpg`; // Thay bằng URL ảnh thực
    
    return {
      title,
      description,
      
      // ========================================
      // OPEN GRAPH TAGS
      // ========================================
      openGraph: {
        title,
        description,
        url: `https://your-domain.com/blogs/${params.id}`,
        siteName: "Hỏi Dân IT",
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: blog.title,
          },
        ],
        locale: "vi_VN",
        type: "article",
        authors: [blog.author],
        publishedTime: blog.createdAt,
      },
      
      // ========================================
      // TWITTER CARD TAGS
      // ========================================
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [imageUrl],
        creator: "@hoidanit",
      },
    };
  }
  
  return {
    title: 'Blog Not Found | Hỏi Dân IT',
    description: 'Không tìm thấy blog.',
    openGraph: {
      title: 'Blog Not Found | Hỏi Dân IT',
      description: 'Không tìm thấy blog.',
      url: `https://your-domain.com/blogs/${params.id}`,
      siteName: "Hỏi Dân IT",
    },
    twitter: {
      card: "summary",
      title: 'Blog Not Found | Hỏi Dân IT',
      description: 'Không tìm thấy blog.',
    },
  };
}

export default async function BlogDetailPage({ params }: { params: { id: string } }) {
  const res = await fetch('http://localhost:8000/blogs', { cache: 'no-store' });
  const blogs: Blog[] = await res.json();
  const blogIndex = params.id && typeof params.id === 'string' ? parseInt(params.id) - 1 : -1;
  const blog = blogs && blogIndex >= 0 && blogIndex < blogs.length ? blogs[blogIndex] : null;
  return <BlogDetailClient blog={blog} blogIndex={blogIndex} />;
} 