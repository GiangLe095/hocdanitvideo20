import { MetadataRoute } from 'next';
import { siteConfig } from '../config/site';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const API_URL = "http://localhost:8000";
  
  // Get all blogs for sitemap
  let blogs = [];
  try {
    const res = await fetch(`${API_URL}/blogs`, { cache: 'no-store' });
    if (res.ok) {
      blogs = await res.json();
    }
  } catch (error) {
    console.error('Error fetching blogs for sitemap:', error);
  }

  // Base pages
  const basePages = [
    {
      url: siteConfig.domain,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${siteConfig.domain}/blogs`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${siteConfig.domain}/facebook`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${siteConfig.domain}/youtube`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${siteConfig.domain}/tiktok`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${siteConfig.domain}/link`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
  ];

  // Blog pages
  const blogPages = blogs.map((blog: any) => ({
    url: `${siteConfig.domain}/blogs/${blog.slug || blog.title.toLowerCase().replace(/\s+/g, '-')}-${blog.id}`,
    lastModified: new Date(blog.createdAt || new Date()),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [...basePages, ...blogPages];
} 