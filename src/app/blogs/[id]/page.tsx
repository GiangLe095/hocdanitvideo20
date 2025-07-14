'use client'

// ========================================
// IMPORTS & DEPENDENCIES
// ========================================
import { useParams, useRouter } from 'next/navigation' // Next.js hooks cho routing
import useSWR from 'swr' // SWR cho data fetching với caching
import { ArrowLeft } from 'lucide-react' // Icon từ lucide-react

// ========================================
// UTILITY FUNCTIONS
// ========================================
// Fetcher function cho SWR - chuyển đổi response thành JSON
const fetcher = (url: string) => fetch(url).then(res => res.json())

// ========================================
// TYPE DEFINITIONS
// ========================================
// Interface định nghĩa cấu trúc dữ liệu Blog
interface Blog {
  id: number        // ID duy nhất của blog
  title: string     // Tiêu đề blog
  author: string    // Tác giả
  content: string   // Nội dung blog
  createdAt?: string // Ngày tạo (optional)
}

// ========================================
// MAIN COMPONENT - BLOG DETAIL PAGE
// ========================================
export default function BlogDetail() {
  // ========================================
  // HOOKS & PARAMETERS
  // ========================================
  const params = useParams() // Lấy parameters từ URL (id)
  const router = useRouter() // Hook để điều hướng
  const { id } = params // Destructure id từ params
  
  // ========================================
  // DATA FETCHING WITH SWR
  // ========================================
  // Fetch tất cả blogs trước, sau đó lấy blog theo index
  // - data: blogs - mảng tất cả blogs
  // - error: blogsError - lỗi nếu có
  // - isLoading: blogsLoading - trạng thái đang tải
  const { data: blogs, error: blogsError, isLoading: blogsLoading } = useSWR<Blog[]>(
    "http://localhost:8000/blogs", // API endpoint
    fetcher // Fetcher function
  )
  
  // ========================================
  // DATA PROCESSING
  // ========================================
  // Lấy blog theo index (id thực ra là index + 1)
  // - id từ URL là string, cần convert thành number
  // - Trừ 1 vì index bắt đầu từ 0, nhưng URL bắt đầu từ 1
  const blogIndex = id && typeof id === 'string' ? parseInt(id) - 1 : -1
  
  // Lấy blog từ mảng blogs theo index
  // - Kiểm tra blogs có tồn tại không
  // - Kiểm tra index có hợp lệ không (>= 0 và < length)
  const blog = blogs && blogIndex >= 0 && blogIndex < blogs.length ? blogs[blogIndex] : null
  
  // Map error và loading states
  const error = blogsError
  const isLoading = blogsLoading
  
  // ========================================
  // EVENT HANDLERS
  // ========================================
  // Hàm xử lý quay lại trang danh sách blogs
  const handleBack = () => {
    router.push('/blogs') // Navigate về trang /blogs
  }
  
  // ========================================
  // LOADING STATE
  // ========================================
  // Hiển thị loading spinner khi đang fetch data
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          {/* Loading spinner với animation */}
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading blog details...</p>
        </div>
      </div>
    )
  }
  
  // ========================================
  // ERROR STATE
  // ========================================
  // Hiển thị error message khi có lỗi xảy ra
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          {/* Error icon */}
          <div className="text-red-600 text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Blog</h1>
          <p className="text-gray-600 mb-4">Could not load blog details. Please try again.</p>
          {/* Back button để quay lại */}
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
  
  // ========================================
  // NOT FOUND STATE
  // ========================================
  // Hiển thị khi blog không tồn tại
  if (!blog) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          {/* Not found icon */}
          <div className="text-gray-400 text-6xl mb-4">📄</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Blog Not Found</h1>
          <p className="text-gray-600 mb-4">The blog you're looking for doesn't exist.</p>
          {/* Back button để quay lại */}
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
  
  // ========================================
  // SUCCESS STATE - RENDER BLOG DETAILS
  // ========================================
  return (
    <div className="min-h-screen bg-gray-50">
      {/* ========================================
          HEADER SECTION - BACK NAVIGATION
          ======================================== */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          {/* Back button với icon */}
          <button
            onClick={handleBack}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Blogs
          </button>
        </div>
      </div>
      
      {/* ========================================
          MAIN CONTENT - BLOG ARTICLE
          ======================================== */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <article className="bg-white rounded-lg shadow-sm border p-8">
          {/* ========================================
              BLOG HEADER - TITLE & AUTHOR INFO
              ======================================== */}
          <header className="mb-8">
            {/* Blog title */}
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {blog.title}
            </h1>
            
            {/* Author and date info */}
            <div className="flex items-center text-gray-600">
              <span className="font-medium">By: {blog.author}</span>
              {/* Hiển thị ngày tạo nếu có */}
              {blog.createdAt && (
                <>
                  <span className="mx-2">•</span>
                  <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                </>
              )}
            </div>
          </header>
          
          {/* ========================================
              BLOG CONTENT - MAIN TEXT
              ======================================== */}
          <div className="prose prose-lg max-w-none">
            {/* Blog content với whitespace preservation */}
            <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {blog.content}
            </div>
          </div>
          
          {/* ========================================
              BLOG FOOTER - METADATA & ACTIONS
              ======================================== */}
          <footer className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-between">
              {/* Blog metadata */}
              <div className="text-sm text-gray-500">
                Blog #{blogIndex + 1} (ID: {blog.id})
              </div>
              
              {/* Back to list button */}
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