import { NextRequest, NextResponse } from 'next/server'

// ========================================
// IMPORTS & SHARED DATA
// ========================================
// Import shared data và types từ main blogs route
// Để đảm bảo tất cả routes sử dụng cùng một data source
import { blogs, Blog } from '../route'

// ========================================
// HTTP METHOD HANDLERS
// ========================================

// ========================================
// GET - Lấy blog theo ID
// ========================================
// Endpoint: GET /api/blogs/[id]
// Mục đích: Trả về thông tin chi tiết của một blog cụ thể
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Convert id từ string sang number
    const id = parseInt(params.id)
    
    // Tìm blog trong mảng blogs theo ID
    const blog = blogs.find(blog => blog.id === id)
    
    // ========================================
    // NOT FOUND HANDLING
    // ========================================
    // Nếu không tìm thấy blog với ID này
    if (!blog) {
      return NextResponse.json(
        { error: 'Blog not found' },
        { status: 404 } // Not Found
      )
    }
    
    // Trả về blog dưới dạng JSON
    return NextResponse.json(blog)
  } catch (error) {
    // Log lỗi để debug
    console.error('Error fetching blog:', error)
    
    // Trả về error response với status 500
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// ========================================
// PUT - Cập nhật blog
// ========================================
// Endpoint: PUT /api/blogs/[id]
// Mục đích: Cập nhật thông tin của một blog cụ thể
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Convert id từ string sang number
    const id = parseInt(params.id)
    
    // Parse JSON body từ request
    const body = await request.json()
    
    // ========================================
    // FIND BLOG INDEX
    // ========================================
    // Tìm index của blog trong mảng (để update)
    const blogIndex = blogs.findIndex(blog => blog.id === id)
    
    // ========================================
    // NOT FOUND HANDLING
    // ========================================
    // Nếu không tìm thấy blog với ID này
    if (blogIndex === -1) {
      return NextResponse.json(
        { error: 'Blog not found' },
        { status: 404 } // Not Found
      )
    }
    
    // ========================================
    // UPDATE BLOG
    // ========================================
    // Cập nhật blog với dữ liệu mới
    // Spread operator để merge dữ liệu cũ và mới
    blogs[blogIndex] = {
      ...blogs[blogIndex], // Giữ lại dữ liệu cũ
      ...body,             // Ghi đè với dữ liệu mới
      id                   // Đảm bảo ID không bị thay đổi
    }
    
    // Trả về blog đã được cập nhật
    return NextResponse.json(blogs[blogIndex])
  } catch (error) {
    // Log lỗi để debug
    console.error('Error updating blog:', error)
    
    // Trả về error response với status 500
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// ========================================
// DELETE - Xóa blog
// ========================================
// Endpoint: DELETE /api/blogs/[id]
// Mục đích: Xóa một blog cụ thể khỏi danh sách
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Convert id từ string sang number
    const id = parseInt(params.id)
    
    // ========================================
    // FIND BLOG INDEX
    // ========================================
    // Tìm index của blog trong mảng (để xóa)
    const blogIndex = blogs.findIndex(blog => blog.id === id)
    
    // ========================================
    // NOT FOUND HANDLING
    // ========================================
    // Nếu không tìm thấy blog với ID này
    if (blogIndex === -1) {
      return NextResponse.json(
        { error: 'Blog not found' },
        { status: 404 } // Not Found
      )
    }
    
    // ========================================
    // DELETE BLOG
    // ========================================
    // Xóa blog khỏi mảng và lưu lại blog đã xóa
    const deletedBlog = blogs.splice(blogIndex, 1)[0]
    
    // Trả về thông báo thành công và thông tin blog đã xóa
    return NextResponse.json({ 
      message: 'Blog deleted successfully', 
      blog: deletedBlog 
    })
  } catch (error) {
    // Log lỗi để debug
    console.error('Error deleting blog:', error)
    
    // Trả về error response với status 500
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 