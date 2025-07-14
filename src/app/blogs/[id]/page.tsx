'use client'

import { useParams, useRouter } from 'next/navigation'
import useSWR from 'swr'
import { ArrowLeft } from 'lucide-react'

// Fetcher function for SWR
const fetcher = (url: string) => fetch(url).then(res => res.json())

// Blog interface
interface Blog {
  id: number
  title: string
  author: string
  content: string
  createdAt?: string
}

export default function BlogDetail() {
  const params = useParams()
  const router = useRouter()
  const { id } = params
  
  // Fetch all blogs first, then get the blog by index
  const { data: blogs, error: blogsError, isLoading: blogsLoading } = useSWR<Blog[]>(
    "http://localhost:8000/blogs",
    fetcher
  )
  
  // Get blog by index (id is actually the index + 1)
  const blogIndex = id && typeof id === 'string' ? parseInt(id) - 1 : -1
  const blog = blogs && blogIndex >= 0 && blogIndex < blogs.length ? blogs[blogIndex] : null
  const error = blogsError
  const isLoading = blogsLoading
  
  // Handle back navigation
  const handleBack = () => {
    router.push('/blogs')
  }
  
  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading blog details...</p>
        </div>
      </div>
    )
  }
  
  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Blog</h1>
          <p className="text-gray-600 mb-4">Could not load blog details. Please try again.</p>
          <button
            onClick={handleBack}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Blogs
          </button>
        </div>
      </div>
    )
  }
  
  // Blog not found
  if (!blog) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-400 text-6xl mb-4">📄</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Blog Not Found</h1>
          <p className="text-gray-600 mb-4">The blog you're looking for doesn't exist.</p>
          <button
            onClick={handleBack}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Blogs
          </button>
        </div>
      </div>
    )
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <button
            onClick={handleBack}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Blogs
          </button>
        </div>
      </div>
      
      {/* Blog Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <article className="bg-white rounded-lg shadow-sm border p-8">
          {/* Blog Header */}
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
          
          {/* Blog Content */}
          <div className="prose prose-lg max-w-none">
            <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {blog.content}
            </div>
          </div>
          
          {/* Blog Footer */}
          <footer className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500">
                Blog #{blogIndex + 1} (ID: {blog.id})
              </div>
              <button
                onClick={handleBack}
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Back to List
              </button>
            </div>
          </footer>
        </article>
      </div>
    </div>
  )
} 