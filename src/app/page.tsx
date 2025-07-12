"use client";

// Import các thư viện cần thiết
import { useEffect, useState } from "react";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useSWR, { mutate } from "swr";

// Định nghĩa kiểu dữ liệu Blog
interface Blog {
  id: number;
  title: string;
  author: string;
  content: string;
}

export default function Home() {
  return (
    <div style={{ width: "90%", margin: "0 auto", textAlign: "center", marginTop: 48 }}>
      <h1>Welcome to Hỏi Dân IT!</h1>
      <p>Chào mừng bạn đến với trang chủ. Hãy chọn tab Blogs để quản lý bài viết.</p>
    </div>
  );
}
