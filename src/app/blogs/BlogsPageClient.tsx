'use client'
import { useState } from "react";
import useSWR, { mutate } from "swr";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Định nghĩa kiểu dữ liệu Blog
interface Blog {
  id: number;
  title: string;
  author: string;
  content: string;
}

export default function BlogsPageClient() {
  // SWR fetch blogs
  const fetcher = (url: string) => fetch(url).then(res => res.json());
  const { data: blogs, error, isLoading } = useSWR<Blog[]>("http://localhost:8000/blogs", fetcher);
  // State điều khiển hiển thị modal
  const [showModal, setShowModal] = useState(false);
  // State lưu thông tin blog mới đang nhập
  const [newBlog, setNewBlog] = useState({ title: "", author: "", content: "" });
  // Thêm các state quản lý modal Edit và blog đang thao tác
  const [editBlog, setEditBlog] = useState<Blog | null>(null);
  const [editForm, setEditForm] = useState({ title: "", author: "", content: "" });
  const [deletingId, setDeletingId] = useState<number | null>(null);

  // Hàm mở modal
  const handleAddNew = () => setShowModal(true);
  // Hàm đóng modal và reset form
  const handleClose = () => {
    setShowModal(false);
    setNewBlog({ title: "", author: "", content: "" });
  };
  // Hàm xử lý thay đổi input trong modal
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewBlog({ ...newBlog, [e.target.name]: e.target.value });
  };
  // Hàm lưu blog mới vào bảng, kiểm tra hợp lệ và gửi về server
  const handleSave = async () => {
    if (newBlog.title.trim() && newBlog.author.trim()) {
      try {
        const res = await fetch("http://localhost:8000/blogs", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: newBlog.title,
            author: newBlog.author,
            content: newBlog.content,
          }),
        });
        if (!res.ok) throw new Error("Gửi dữ liệu thất bại");
        toast.success("Lưu thành công!", { toastId: "blog-toast-success" });
        handleClose();
        // Gọi mutate để revalidate lại danh sách blogs
        mutate("http://localhost:8000/blogs");
      } catch (err) {
        toast.error("Gửi dữ liệu thất bại!", { toastId: "blog-toast-error", position: "top-center" });
      }
    } else {
      toast.error("Vui lòng nhập đầy đủ Title và Author!", { toastId: "blog-toast-error", position: "top-center" });
    }
  };

  // Hàm navigate đến trang chi tiết blog (sử dụng index thay vì ID)
  const router = useRouter();
  const handleView = (blog: Blog, index: number) => {
    router.push(`/blogs/${index + 1}`);
  };

  // Hàm mở modal Edit
  const handleEdit = (blog: Blog) => {
    setEditBlog(blog);
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
    if (editForm.title.trim() && editForm.author.trim()) {
      try {
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
  // Hàm xác nhận xóa
  const handleDelete = (id: number, index: number) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa blog số ${index + 1} này?`)) {
      setDeletingId(id);
      fetch(`http://localhost:8000/blogs/${id}`, { method: "DELETE" })
        .then(res => {
          if (!res.ok) throw new Error();
          toast.success("Xóa thành công!", { toastId: "blog-toast-delete-success" });
          mutate("http://localhost:8000/blogs");
        })
        .catch(() => {
          toast.error("Xóa thất bại!", { toastId: "blog-toast-delete-error", position: "top-center" });
        })
        .finally(() => setDeletingId(null));
    }
  };

  return (
    <main style={{ width: "90%", margin: "0 auto" }}>
      {/* Tiêu đề bảng và nút Add New */}
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h1>Danh sách Blogs</h1>
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
          aria-label="Thêm blog mới"
        >
          Add New
        </button>
      </header>
      
      {/* Bảng hiển thị danh sách blogs */}
      {isLoading ? (
        <section aria-live="polite">
          <p>Đang tải dữ liệu...</p>
        </section>
      ) : error ? (
        <section aria-live="assertive">
          <p style={{ color: "red" }}>Không lấy được danh sách blogs</p>
        </section>
      ) : (
        <section>
          <table style={{ borderCollapse: "collapse", width: "100%", marginTop: 12 }} role="table" aria-label="Danh sách blogs">
            <thead>
              <tr>
                <th scope="col" style={{ border: "1px solid #ccc", padding: 8 }}>No</th>
                <th scope="col" style={{ border: "1px solid #ccc", padding: 8 }}>Title</th>
                <th scope="col" style={{ border: "1px solid #ccc", padding: 8 }}>Author</th>
                <th scope="col" style={{ border: "1px solid #ccc", padding: 8 }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {blogs && blogs.map((blog, idx) => (
                <tr key={blog.id}>
                  <td style={{ border: "1px solid #ccc", padding: 8 }}>{idx + 1}</td>
                  <td style={{ border: "1px solid #ccc", padding: 8 }}>
                    <strong>{blog.title}</strong>
                  </td>
                  <td style={{ border: "1px solid #ccc", padding: 8 }}>{blog.author}</td>
                  <td style={{ border: "1px solid #ccc", padding: 8 }}>
                    <button 
                      style={{ background: "#2196f3", color: "#fff", border: "none", borderRadius: 4, marginRight: 4, padding: "4px 12px" }} 
                      onClick={() => handleView(blog, idx)}
                      aria-label={`Xem chi tiết blog: ${blog.title}`}
                    >
                      View
                    </button>
                    <button 
                      style={{ background: "#ffc107", color: "#fff", border: "none", borderRadius: 4, marginRight: 4, padding: "4px 12px" }} 
                      onClick={() => handleEdit(blog)}
                      aria-label={`Chỉnh sửa blog: ${blog.title}`}
                    >
                      Edit
                    </button>
                    <button 
                      style={{ background: "#f44336", color: "#fff", border: "none", borderRadius: 4, padding: "4px 12px" }} 
                      onClick={() => handleDelete(blog.id, idx)} 
                      disabled={deletingId === blog.id}
                      aria-label={`Xóa blog: ${blog.title}`}
                    >
                      {deletingId === blog.id ? "Đang xóa..." : "Delete"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}
      
      {/* Modal nhập blog mới */}
      {showModal && (
        <div 
          style={{
            position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
            background: "rgba(0,0,0,0.3)", display: "flex", alignItems: "center", justifyContent: "center"
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div style={{ background: "#fff", padding: 24, borderRadius: 8, minWidth: 320, maxWidth: 400, position: "relative" }}>
            <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
              <h2 id="modal-title" style={{ margin: 0 }}>Add New Blog</h2>
            </header>
            <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
              <div>
                <label htmlFor="title" style={{ display: "block", marginBottom: "4px" }}>Title:</label>
                <input
                  id="title"
                  name="title"
                  placeholder="Title"
                  value={newBlog.title}
                  onChange={handleChange}
                  style={{ width: "100%", marginBottom: 8, padding: 6 }}
                  required
                  aria-required="true"
                />
                <label htmlFor="author" style={{ display: "block", marginBottom: "4px" }}>Author:</label>
                <input
                  id="author"
                  name="author"
                  placeholder="Author"
                  value={newBlog.author}
                  onChange={handleChange}
                  style={{ width: "100%", marginBottom: 8, padding: 6 }}
                  required
                  aria-required="true"
                />
                <label htmlFor="content" style={{ display: "block", marginBottom: "4px" }}>Content:</label>
                <textarea
                  id="content"
                  name="content"
                  placeholder="Content"
                  value={newBlog.content}
                  onChange={handleChange}
                  style={{ width: "100%", marginBottom: 8, padding: 6 }}
                  rows={4}
                />
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
                <button type="button" onClick={handleClose} style={{ padding: "6px 16px" }}>Cancel</button>
                <button type="submit" style={{ background: "#2196f3", color: "#fff", border: "none", borderRadius: 4, padding: "6px 16px" }}>Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {/* Modal sửa blog */}
      {editBlog && (
        <div 
          style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", background: "rgba(0,0,0,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="edit-modal-title"
        >
          <div style={{ background: "#fff", padding: 24, borderRadius: 8, minWidth: 320, maxWidth: 400, position: "relative" }}>
            <h2 id="edit-modal-title" style={{ marginTop: 0 }}>Edit Blog</h2>
            <form onSubmit={(e) => { e.preventDefault(); handleSaveEdit(); }}>
              <div>
                <label htmlFor="edit-title" style={{ display: "block", marginBottom: "4px" }}>Title:</label>
                <input 
                  id="edit-title"
                  name="title" 
                  placeholder="Title" 
                  value={editForm.title} 
                  onChange={handleEditChange} 
                  style={{ width: "100%", marginBottom: 8, padding: 6 }} 
                  required
                  aria-required="true"
                />
                <label htmlFor="edit-author" style={{ display: "block", marginBottom: "4px" }}>Author:</label>
                <input 
                  id="edit-author"
                  name="author" 
                  placeholder="Author" 
                  value={editForm.author} 
                  onChange={handleEditChange} 
                  style={{ width: "100%", marginBottom: 8, padding: 6 }} 
                  required
                  aria-required="true"
                />
                <label htmlFor="edit-content" style={{ display: "block", marginBottom: "4px" }}>Content:</label>
                <textarea 
                  id="edit-content"
                  name="content" 
                  placeholder="Content" 
                  value={editForm.content} 
                  onChange={handleEditChange} 
                  style={{ width: "100%", marginBottom: 8, padding: 6 }} 
                  rows={4}
                />
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
                <button type="button" onClick={handleCloseEdit} style={{ padding: "6px 16px" }}>Cancel</button>
                <button type="submit" style={{ background: "#2196f3", color: "#fff", border: "none", borderRadius: 4, padding: "6px 16px" }}>Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
      <ToastContainer />
    </main>
  );
} 