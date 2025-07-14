"use client";

// ========================================
// IMPORTS & DEPENDENCIES
// ========================================
import { useState } from "react"; // React hook để quản lý state
import useSWR, { mutate } from "swr"; // SWR cho data fetching với caching
import { useRouter } from "next/navigation"; // Next.js router để điều hướng
import { ToastContainer, toast } from "react-toastify"; // Toast notifications
import "react-toastify/dist/ReactToastify.css"; // CSS cho toast

// ========================================
// TYPE DEFINITIONS
// ========================================
// Định nghĩa kiểu dữ liệu Blog
interface Blog {
  id: number;        // ID duy nhất của blog
  title: string;     // Tiêu đề blog
  author: string;    // Tác giả
  content: string;   // Nội dung blog
}

// ========================================
// MAIN COMPONENT
// ========================================
export default function BlogsPage() {
  // ========================================
  // HOOKS & INITIALIZATION
  // ========================================
  const router = useRouter(); // Hook để điều hướng giữa các trang
  
  // ========================================
  // SWR DATA FETCHING
  // ========================================
  // Fetcher function cho SWR - chuyển đổi response thành JSON
  const fetcher = (url: string) => fetch(url).then(res => res.json());
  
  // SWR hook để fetch danh sách blogs từ API
  // - data: blogs - dữ liệu blogs
  // - error: lỗi nếu có
  // - isLoading: trạng thái đang tải
  const { data: blogs, error, isLoading } = useSWR<Blog[]>("http://localhost:8000/blogs", fetcher);
  
  // ========================================
  // STATE MANAGEMENT
  // ========================================
  // State điều khiển hiển thị modal thêm mới
  const [showModal, setShowModal] = useState(false);
  
  // State lưu thông tin blog mới đang nhập
  const [newBlog, setNewBlog] = useState({ title: "", author: "", content: "" });
  
  // State quản lý modal Edit và blog đang thao tác
  const [editBlog, setEditBlog] = useState<Blog | null>(null);
  const [editForm, setEditForm] = useState({ title: "", author: "", content: "" });
  
  // State quản lý trạng thái xóa (để disable button khi đang xóa)
  const [deletingId, setDeletingId] = useState<number | null>(null);

  // ========================================
  // EVENT HANDLERS - MODAL MANAGEMENT
  // ========================================
  // Hàm mở modal thêm mới
  const handleAddNew = () => setShowModal(true);
  
  // Hàm đóng modal và reset form về trạng thái ban đầu
  const handleClose = () => {
    setShowModal(false);
    setNewBlog({ title: "", author: "", content: "" });
  };
  
  // Hàm xử lý thay đổi input trong modal thêm mới
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewBlog({ ...newBlog, [e.target.name]: e.target.value });
  };

  // ========================================
  // EVENT HANDLERS - CRUD OPERATIONS
  // ========================================
  // CREATE: Hàm lưu blog mới vào database
  const handleSave = async () => {
    // Kiểm tra validation - title và author không được để trống
    if (newBlog.title.trim() && newBlog.author.trim()) {
      try {
        // Gửi POST request đến API để tạo blog mới
        const res = await fetch("http://localhost:8000/blogs", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: newBlog.title,
            author: newBlog.author,
            content: newBlog.content,
          }),
        });
        
        // Kiểm tra response
        if (!res.ok) throw new Error("Gửi dữ liệu thất bại");
        
        // Hiển thị thông báo thành công
        toast.success("Lưu thành công!", { toastId: "blog-toast-success" });
        
        // Đóng modal
        handleClose();
        
        // Gọi mutate để revalidate lại danh sách blogs (refresh data)
        mutate("http://localhost:8000/blogs");
      } catch (err) {
        // Hiển thị thông báo lỗi
        toast.error("Gửi dữ liệu thất bại!", { toastId: "blog-toast-error", position: "top-center" });
      }
    } else {
      // Hiển thị thông báo validation error
      toast.error("Vui lòng nhập đầy đủ Title và Author!", { toastId: "blog-toast-error", position: "top-center" });
    }
  };

  // READ: Hàm navigate đến trang chi tiết blog (sử dụng index thay vì ID)
  const handleView = (blog: Blog, index: number) => {
    // Navigate đến dynamic route với index + 1 (vì index bắt đầu từ 0)
    router.push(`/blogs/${index + 1}`);
  };

  // UPDATE: Hàm mở modal Edit
  const handleEdit = (blog: Blog) => {
    setEditBlog(blog);
    // Pre-fill form với dữ liệu hiện tại của blog
    setEditForm({ title: blog.title, author: blog.author, content: blog.content });
  };
  
  // Hàm đóng modal Edit
  const handleCloseEdit = () => {
    setEditBlog(null);
    setEditForm({ title: "", author: "", content: "" });
  };
  
  // Hàm xử lý thay đổi input trong modal Edit
  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };
  
  // Hàm lưu blog đã sửa
  const handleSaveEdit = async () => {
    if (!editBlog) return;
    
    // Kiểm tra validation
    if (editForm.title.trim() && editForm.author.trim()) {
      try {
        // Gửi PUT request đến API để cập nhật blog
        const res = await fetch(`http://localhost:8000/blogs/${editBlog.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editForm),
        });
        
        if (!res.ok) throw new Error("Cập nhật thất bại");
        
        toast.success("Cập nhật thành công!", { toastId: "blog-toast-edit-success" });
        handleCloseEdit();
        mutate("http://localhost:8000/blogs");
      } catch (err) {
        toast.error("Cập nhật thất bại!", { toastId: "blog-toast-edit-error", position: "top-center" });
      }
    } else {
      toast.error("Vui lòng nhập đầy đủ Title và Author!", { toastId: "blog-toast-edit-error", position: "top-center" });
    }
  };
  
  // DELETE: Hàm xác nhận và thực hiện xóa blog
  const handleDelete = (id: number) => {
    // Hiển thị confirm dialog
    if (window.confirm("Bạn có chắc chắn muốn xóa blog này?")) {
      setDeletingId(id); // Set trạng thái đang xóa
      
      // Gửi DELETE request đến API
      fetch(`http://localhost:8000/blogs/${id}`, { method: "DELETE" })
        .then(res => {
          if (!res.ok) throw new Error();
          toast.success("Xóa thành công!", { toastId: "blog-toast-delete-success" });
          mutate("http://localhost:8000/blogs");
        })
        .catch(() => {
          toast.error("Xóa thất bại!", { toastId: "blog-toast-delete-error", position: "top-center" });
        })
        .finally(() => setDeletingId(null)); // Reset trạng thái xóa
    }
  };

  // ========================================
  // RENDER UI
  // ========================================
  return (
    <div style={{ width: "90%", margin: "0 auto" }}>
      {/* ========================================
          HEADER SECTION - TITLE & ADD BUTTON
          ======================================== */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>Table Blogs</h2>
        <button
          style={{
            padding: "8px 16px",
            background: "#888",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            cursor: "pointer",
          }}
          onClick={handleAddNew}
        >
          Add New
        </button>
      </div>
      
      {/* ========================================
          MAIN CONTENT - BLOGS TABLE
          ======================================== */}
      {isLoading ? (
        // Loading state - hiển thị khi đang fetch data
        <div>Đang tải dữ liệu...</div>
      ) : error ? (
        // Error state - hiển thị khi có lỗi
        <div style={{ color: "red" }}>Không lấy được danh sách blogs</div>
      ) : (
        // Success state - hiển thị bảng blogs
        <table style={{ borderCollapse: "collapse", width: "100%", marginTop: 12 }}>
          {/* Table Header */}
          <thead>
            <tr>
              <th style={{ border: "1px solid #ccc", padding: 8 }}>No</th>
              <th style={{ border: "1px solid #ccc", padding: 8 }}>Title</th>
              <th style={{ border: "1px solid #ccc", padding: 8 }}>Author</th>
              <th style={{ border: "1px solid #ccc", padding: 8 }}>Action</th>
            </tr>
          </thead>
          
          {/* Table Body */}
          <tbody>
            {/* Duyệt qua mảng blogs và render từng dòng */}
            {blogs && blogs.map((blog, idx) => (
              <tr key={blog.id}>
                <td style={{ border: "1px solid #ccc", padding: 8 }}>{idx + 1}</td>
                <td style={{ border: "1px solid #ccc", padding: 8 }}>{blog.title}</td>
                <td style={{ border: "1px solid #ccc", padding: 8 }}>{blog.author}</td>
                <td style={{ border: "1px solid #ccc", padding: 8 }}>
                  {/* Action Buttons */}
                  <button 
                    style={{ background: "#2196f3", color: "#fff", border: "none", borderRadius: 4, marginRight: 4, padding: "4px 12px" }} 
                    onClick={() => handleView(blog, idx)}
                  >
                    View
                  </button>
                  <button 
                    style={{ background: "#ffc107", color: "#fff", border: "none", borderRadius: 4, marginRight: 4, padding: "4px 12px" }} 
                    onClick={() => handleEdit(blog)}
                  >
                    Edit
                  </button>
                  <button 
                    style={{ background: "#f44336", color: "#fff", border: "none", borderRadius: 4, padding: "4px 12px" }} 
                    onClick={() => handleDelete(blog.id)} 
                    disabled={deletingId === blog.id}
                  >
                    {deletingId === blog.id ? "Đang xóa..." : "Delete"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      
      {/* ========================================
          MODAL - ADD NEW BLOG
          ======================================== */}
      {showModal && (
        <div style={{
          position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
          background: "rgba(0,0,0,0.3)", display: "flex", alignItems: "center", justifyContent: "center"
        }}>
          <div style={{ background: "#fff", padding: 24, borderRadius: 8, minWidth: 320, maxWidth: 400, position: "relative" }}>
            {/* Modal Header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
              <h3 style={{ margin: 0 }}>Add New Blog</h3>
            </div>
            
            {/* Modal Form */}
            <div>
              {/* Title Input */}
              <input
                name="title"
                placeholder="Title"
                value={newBlog.title}
                onChange={handleChange}
                style={{ width: "100%", marginBottom: 8, padding: 6 }}
              />
              {/* Author Input */}
              <input
                name="author"
                placeholder="Author"
                value={newBlog.author}
                onChange={handleChange}
                style={{ width: "100%", marginBottom: 8, padding: 6 }}
              />
              {/* Content Input */}
              <textarea
                name="content"
                placeholder="Content"
                value={newBlog.content}
                onChange={handleChange}
                style={{ width: "100%", marginBottom: 8, padding: 6 }}
              />
            </div>
            
            {/* Modal Actions */}
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
              <button onClick={handleClose} style={{ padding: "6px 16px" }}>Cancel</button>
              <button onClick={handleSave} style={{ background: "#2196f3", color: "#fff", border: "none", borderRadius: 4, padding: "6px 16px" }}>Save</button>
            </div>
          </div>
        </div>
      )}
      
      {/* ========================================
          MODAL - EDIT BLOG
          ======================================== */}
      {editBlog && (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", background: "rgba(0,0,0,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ background: "#fff", padding: 24, borderRadius: 8, minWidth: 320, maxWidth: 400, position: "relative" }}>
            <h3 style={{ marginTop: 0 }}>Edit Blog</h3>
            
            {/* Edit Form */}
            <input 
              name="title" 
              placeholder="Title" 
              value={editForm.title} 
              onChange={handleEditChange} 
              style={{ width: "100%", marginBottom: 8, padding: 6 }} 
            />
            <input 
              name="author" 
              placeholder="Author" 
              value={editForm.author} 
              onChange={handleEditChange} 
              style={{ width: "100%", marginBottom: 8, padding: 6 }} 
            />
            <textarea 
              name="content" 
              placeholder="Content" 
              value={editForm.content} 
              onChange={handleEditChange} 
              style={{ width: "100%", marginBottom: 8, padding: 6 }} 
            />
            
            {/* Edit Actions */}
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
              <button onClick={handleCloseEdit} style={{ padding: "6px 16px" }}>Cancel</button>
              <button onClick={handleSaveEdit} style={{ background: "#2196f3", color: "#fff", border: "none", borderRadius: 4, padding: "6px 16px" }}>Save</button>
            </div>
          </div>
        </div>
      )}
      
      {/* ========================================
          TOAST CONTAINER - NOTIFICATIONS
          ======================================== */}
      <ToastContainer />
    </div>
  );
} 