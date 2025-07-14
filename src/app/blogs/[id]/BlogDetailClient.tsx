'use client'
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface Blog {
  id: number;
  title: string;
  author: string;
  content: string;
  createdAt?: string;
}

export default function BlogDetailClient({ blog, blogIndex }: { blog: Blog | null, blogIndex: number }) {
  if (!blog) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-400 text-6xl mb-4">📄</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Blog Not Found</h1>
          <p className="text-gray-600 mb-4">The blog you're looking for doesn't exist.</p>
          <Link
            href="/blogs"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Blogs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Link
            href="/blogs"
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Blogs
          </Link>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <article className="bg-white rounded-lg shadow-sm border p-8">
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {blog.title}
            </h1>
            <div className="flex items-center text-gray-600">
              <span className="font-medium">By: {blog.author}</span>
              {blog.createdAt && (
                <>
                  <span className="mx-2">•</span>
                  <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                </>
              )}
            </div>
          </header>
          <div className="prose prose-lg max-w-none">
            <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {blog.content}
            </div>
          </div>
          <footer className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500">
                Blog #{blogIndex + 1} (ID: {blog.id})
              </div>
              <Link
                href="/blogs"
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Back to List
              </Link>
            </div>
          </footer>
        </article>
      </div>
    </div>
  );
} 