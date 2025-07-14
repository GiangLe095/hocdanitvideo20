import { NextRequest, NextResponse } from 'next/server'

// Import shared data and types from the main blogs route
import { blogs, Blog } from '../route'

// GET handler for single blog by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)
    
    // Find blog by ID
    const blog = blogs.find(blog => blog.id === id)
    
    if (!blog) {
      return NextResponse.json(
        { error: 'Blog not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(blog)
  } catch (error) {
    console.error('Error fetching blog:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT handler for updating a blog
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)
    const body = await request.json()
    
    // Find blog index
    const blogIndex = blogs.findIndex(blog => blog.id === id)
    
    if (blogIndex === -1) {
      return NextResponse.json(
        { error: 'Blog not found' },
        { status: 404 }
      )
    }
    
    // Update blog
    blogs[blogIndex] = {
      ...blogs[blogIndex],
      ...body,
      id // Ensure ID doesn't change
    }
    
    return NextResponse.json(blogs[blogIndex])
  } catch (error) {
    console.error('Error updating blog:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE handler for deleting a blog
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)
    
    // Find blog index
    const blogIndex = blogs.findIndex(blog => blog.id === id)
    
    if (blogIndex === -1) {
      return NextResponse.json(
        { error: 'Blog not found' },
        { status: 404 }
      )
    }
    
    // Remove blog from array
    const deletedBlog = blogs.splice(blogIndex, 1)[0]
    
    return NextResponse.json({ message: 'Blog deleted successfully', blog: deletedBlog })
  } catch (error) {
    console.error('Error deleting blog:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 