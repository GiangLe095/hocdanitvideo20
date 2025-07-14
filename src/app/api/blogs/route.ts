import { NextRequest, NextResponse } from 'next/server'

// ========================================
// TYPE DEFINITIONS
// ========================================
// Interface định nghĩa cấu trúc dữ liệu Blog
export interface Blog {
  id: number        // ID duy nhất của blog
  title: string     // Tiêu đề blog
  author: string    // Tác giả
  content: string   // Nội dung blog
  createdAt?: string // Ngày tạo (optional)
}

// ========================================
// DATA STORAGE (IN-MEMORY)
// ========================================
// Lưu trữ dữ liệu blogs trong memory (trong thực tế sẽ là database)
// Export để có thể sử dụng trong các route khác
export let blogs: Blog[] = [
  {
    id: 1,
    title: "Getting Started with Next.js",
    author: "John Doe",
    content: "Next.js is a powerful React framework that makes building full-stack web applications simple and efficient. In this blog post, we'll explore the basics of Next.js and how to get started with your first project.\n\nNext.js provides features like:\n- Server-side rendering\n- Static site generation\n- API routes\n- File-based routing\n- Built-in CSS and Sass support\n\nTo get started, you can create a new Next.js project using:\n\n```bash\nnpx create-next-app@latest my-app\ncd my-app\nnpm run dev\n```\n\nThis will create a new Next.js project with all the necessary dependencies and configuration.",
    createdAt: "2024-01-15T10:00:00Z"
  },
  {
    id: 2,
    title: "Understanding React Hooks",
    author: "Jane Smith",
    content: "React Hooks are a fundamental concept in modern React development. They allow you to use state and other React features in functional components.\n\nKey hooks include:\n- useState: for managing component state\n- useEffect: for side effects\n- useContext: for consuming context\n- useReducer: for complex state logic\n\nHere's a simple example of using useState:\n\n```jsx\nimport { useState } from 'react'\n\nfunction Counter() {\n  const [count, setCount] = useState(0)\n  \n  return (\n    <div>\n      <p>Count: {count}</p>\n      <button onClick={() => setCount(count + 1)}>\n        Increment\n      </button>\n    </div>\n  )\n}\n```\n\nHooks make React components more readable and easier to test.",
    createdAt: "2024-01-20T14:30:00Z"
  },
  {
    id: 3,
    title: "CSS Grid vs Flexbox",
    author: "Mike Johnson",
    content: "CSS Grid and Flexbox are two powerful layout systems in CSS, each with their own strengths and use cases.\n\nFlexbox is great for:\n- One-dimensional layouts (rows or columns)\n- Aligning items within a container\n- Responsive navigation menus\n- Centering content\n\nCSS Grid is perfect for:\n- Two-dimensional layouts\n- Complex page layouts\n- Creating responsive grids\n- Overlapping elements\n\nHere's a comparison:\n\nFlexbox Example:\n```css\n.container {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n```\n\nGrid Example:\n```css\n.container {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 20px;\n}\n```\n\nChoose the right tool for your specific layout needs!",
    createdAt: "2024-01-25T09:15:00Z"
  }
]

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