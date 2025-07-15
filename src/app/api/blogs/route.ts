import { NextRequest, NextResponse } from 'next/server'
import { blogs, Blog } from './data'

// ========================================
// HTTP METHOD HANDLERS
// ========================================

// ========================================
// GET - Lấy tất cả blogs
// ========================================
// Endpoint: GET /api/blogs
// Mục đích: Trả về danh sách tất cả blogs
export async function GET() {
  try {
    // Trả về tất cả blogs dưới dạng JSON
    return NextResponse.json(blogs)
  } catch (error) {
    // Log lỗi để debug
    console.error('Error fetching blogs:', error)
    
    // Trả về error response với status 500
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// ========================================
// POST - Tạo blog mới
// ========================================
// Endpoint: POST /api/blogs
// Mục đích: Tạo một blog mới và thêm vào danh sách
export async function POST(request: NextRequest) {
  try {
    // Parse JSON body từ request
    const body = await request.json()
    
    // ========================================
    // VALIDATION - Kiểm tra dữ liệu đầu vào
    // ========================================
    // Kiểm tra title và author có tồn tại và không rỗng
    if (!body.title || !body.author) {
      return NextResponse.json(
        { error: 'Title and author are required' },
        { status: 400 } // Bad Request
      )
    }
    
    // ========================================
    // CREATE NEW BLOG
    // ========================================
    // Tạo blog mới với auto-increment ID
    const newBlog: Blog = {
      id: Math.max(...blogs.map(blog => blog.id), 0) + 1, // Tự động tăng ID
      title: body.title,
      author: body.author,
      content: body.content || '', // Nếu không có content thì để rỗng
      createdAt: new Date().toISOString() // Thêm timestamp hiện tại
    }
    
    // Thêm blog mới vào mảng blogs
    blogs.push(newBlog)
    
    // Trả về blog mới với status 201 (Created)
    return NextResponse.json(newBlog, { status: 201 })
  } catch (error) {
    // Log lỗi để debug
    console.error('Error creating blog:', error)
    
    // Trả về error response với status 500
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 