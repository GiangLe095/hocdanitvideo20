import { NextResponse } from 'next/server'

// ========================================
// IMPORTS & SHARED DATA
// ========================================
// Import shared data và types từ main blogs route
// Để đảm bảo tất cả routes sử dụng cùng một data source
import { blogs } from '../data'

// ========================================
// HTTP METHOD HANDLERS
// ========================================

// ========================================
// GET - Lấy blog theo ID
// ========================================
// Endpoint: GET /api/blogs/[id]
// Mục đích: Trả về thông tin chi tiết của một blog cụ thể
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const idNum = parseInt(id);
    const blog = blogs.find(blog => blog.id === idNum);
    if (!blog) {
      return NextResponse.json(
        { error: 'Blog not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(blog);
  } catch (error) {
    console.error('Error fetching blog:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// ========================================
// PUT - Cập nhật blog
// ========================================
// Endpoint: PUT /api/blogs/[id]
// Mục đích: Cập nhật thông tin của một blog cụ thể
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const idNum = parseInt(id);
    const body = await request.json();
    const blogIndex = blogs.findIndex(blog => blog.id === idNum);
    if (blogIndex === -1) {
      return NextResponse.json(
        { error: 'Blog not found' },
        { status: 404 }
      );
    }
    blogs[blogIndex] = {
      ...blogs[blogIndex],
      ...body,
      id: idNum
    };
    return NextResponse.json(blogs[blogIndex]);
  } catch (error) {
    console.error('Error updating blog:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// ========================================
// DELETE - Xóa blog
// ========================================
// Endpoint: DELETE /api/blogs/[id]
// Mục đích: Xóa một blog cụ thể khỏi danh sách
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const idNum = parseInt(id);
    const blogIndex = blogs.findIndex(blog => blog.id === idNum);
    if (blogIndex === -1) {
      return NextResponse.json(
        { error: 'Blog not found' },
        { status: 404 }
      );
    }
    const deletedBlog = blogs.splice(blogIndex, 1)[0];
    return NextResponse.json({ 
      message: 'Blog deleted successfully', 
      blog: deletedBlog 
    });
  } catch (error) {
    console.error('Error deleting blog:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 