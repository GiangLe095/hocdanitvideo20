import type { Metadata } from 'next';
import BlogDetailClient from './BlogDetailClient';
import { siteConfig } from '../../../config/site';

interface Blog {
  id: number;
  title: string;
  author: string;
  content: string;
  createdAt?: string;
}

export async function generateMetadata({ params }: { params: { slugAndId: string } }): Promise<Metadata> {
  const slugAndId = params.slugAndId;
  const id = slugAndId.split('-').pop();
  const API_URL = "http://localhost:8000";
  const res = await fetch(`${API_URL}/blogs/${id}`, { cache: 'no-store' });
  if (!res.ok) {
    return {
      title: `Blog Not Found | ${siteConfig.name}`,
      description: 'Không tìm thấy blog.',
      openGraph: {
        title: `Blog Not Found | ${siteConfig.name}`,
        description: 'Không tìm thấy blog.',
        url: siteConfig.getBlogUrl(slugAndId),
        siteName: siteConfig.name,
      },
      twitter: {
        card: "summary",
        title: `Blog Not Found | ${siteConfig.name}`,
        description: 'Không tìm thấy blog.',
      },
    };
  }
  const blog: Blog = await res.json();
  const title = `${blog.title} | ${siteConfig.name}`;
  const description = blog.content?.slice(0, 150) || 'Xem chi tiết bài viết blog.';
  const imageUrl = siteConfig.getBlogImageUrl(blog.id);
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: siteConfig.getBlogUrl(slugAndId),
      siteName: siteConfig.name,
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
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
      creator: siteConfig.social.twitter,
    },
  };
}

export default async function BlogDetailPage({ params }: { params: { slugAndId: string } }) {
  const slugAndId = params.slugAndId;
  const id = slugAndId.split('-').pop();
  const API_URL = "http://localhost:8000";
  const res = await fetch(`${API_URL}/blogs/${id}`, { cache: 'no-store' });
  const blog = await res.json();
  return <BlogDetailClient blog={blog} blogIndex={blog.id - 1} />;
} 